from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from api._lib.db import get_db
from api._lib.models import Post, Board, BoardCategory, User, Comment, Notification, PostLike
from api._lib.auth import get_current_user, get_current_user_optional
from api._lib.access_control import check_board_access, check_board_write_access
from api._lib.schemas import ResponseModel
from api._lib.limiter import limiter
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()

# --- Schemas ---

class PostCreate(BaseModel):
    title: str
    content: str
    board_slug: str 
    category_id: int
    is_notice: bool = False
    file_url: Optional[str] = None

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category_id: Optional[int] = None
    
class CommentCreate(BaseModel):
    content: str

# --- Endpoints ---

@router.post("/api/posts")
@limiter.limit("5/minute")
async def create_post(request: Request, req: PostCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Lookup Board by Slug
    board_result = await db.execute(select(Board).where(Board.slug == req.board_slug))
    board = board_result.scalars().first()
    if not board:
        raise HTTPException(status_code=404, detail=f"Board not found (slug: {req.board_slug})")

    # Validate category belongs to board
    cat_result = await db.execute(
        select(BoardCategory).where(BoardCategory.id == req.category_id, BoardCategory.board_id == board.id)
    )
    if not cat_result.scalars().first():
        raise HTTPException(status_code=400, detail="Invalid category for this board")
    
    # Only admin can set is_notice = True
    notice_val = req.is_notice if current_user.is_admin else False

    # Check Board Write Access (Centralized helper handles blog/research/ADMIN special rules)
    await check_board_write_access(board, current_user)
    
    new_post = Post(
        title=req.title,
        content=req.content,
        user_id=current_user.id,
        board_id=board.id,
        category_id=req.category_id,
        is_notice=notice_val,
        file_url=req.file_url
    )
    
    db.add(new_post)
    await db.commit()
    await db.refresh(new_post)
    
    return JSONResponse(
        status_code=201,
        content={
            "success": True, 
            "data": {
                "id": new_post.id,
                "title": new_post.title,
                "content": new_post.content,
                "user_id": str(new_post.user_id),
                "board_id": new_post.board_id,
                "category_id": new_post.category_id,
                "is_notice": new_post.is_notice,
                "file_url": new_post.file_url,
                "created_at": new_post.created_at.isoformat() if new_post.created_at else None,
                "view_count": new_post.view_count
            },
            "error": None
        }
    )

from api._lib.auth import get_current_user_optional

@router.get("/api/posts/{post_id}")
async def get_post_detail(post_id: int, db: AsyncSession = Depends(get_db), current_user: Optional[User] = Depends(get_current_user_optional)):

    # Optimized Query: Fetch Post, Relations, Like Count, and Like Status in ONE query.
    
    # 1. Like Count Subquery
    like_count_sub = select(func.count(PostLike.post_id)).where(PostLike.post_id == Post.id).scalar_subquery()
    
    # 2. Is Liked Expression
    from sqlalchemy import case, literal, exists
    is_liked_expr = literal(False)
    if current_user:
        # checking if a record exists in PostLike for this user and post
        is_liked_sub = select(1).where(
            PostLike.post_id == Post.id, 
            PostLike.user_id == current_user.id
        ).exists()
        is_liked_expr = case((is_liked_sub, True), else_=False)
    
    # 3. Main Query
    query = select(Post, Board, User, BoardCategory, like_count_sub, is_liked_expr)\
        .join(Board, Post.board_id == Board.id)\
        .join(User, Post.user_id == User.id)\
        .join(BoardCategory, Post.category_id == BoardCategory.id)\
        .where(Post.id == post_id)
        
    result = await db.execute(query)
    row = result.first()
    
    if not row:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post, board, author, category, like_count, liked = row
    
    # Check Access Level
    await check_board_access(board, current_user, action="read")
    
    response_data = {
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "is_notice": post.is_notice,
        "author": {
            "id": str(author.id),
            "nickname": author.nickname
        },
        "board": {
            "id": board.id,
            "slug": board.slug,
            "name": board.name,
            "access_level": board.access_level
        },
        "category": {
            "id": category.id,
            "name": category.name
        },
        "file_url": post.file_url,
        "created_at": post.created_at.isoformat() if post.created_at else None,
        "updated_at": post.updated_at.isoformat() if post.updated_at else None,
        "view_count": post.view_count,
        "like_count": like_count
    }
    
    if current_user:
        response_data["liked"] = liked
    
    return JSONResponse(content={"success": True, "data": response_data, "error": None})

@router.patch("/api/posts/{post_id}")
@limiter.limit("10/minute")
async def update_post(request: Request, post_id: int, req: PostUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check ownership or admin
    if post.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")

    # Fetch board to check access level
    board_res = await db.execute(select(Board).where(Board.id == post.board_id))
    board = board_res.scalars().first()

    # Check Board Write Access (Centralized helper)
    await check_board_write_access(board, current_user)
    
    if req.title is not None:
        post.title = req.title
    if req.content is not None:
        post.content = req.content
    if req.category_id is not None:
        # Validate category
        cat_result = await db.execute(select(BoardCategory).where(BoardCategory.id == req.category_id, BoardCategory.board_id == post.board_id))
        if not cat_result.scalars().first():
            raise HTTPException(status_code=400, detail="Invalid category for this board")
        post.category_id = req.category_id
        
    await db.commit()
    await db.refresh(post)
    return ResponseModel.success_res(post)

@router.delete("/api/posts/{post_id}")
@limiter.limit("10/minute")
async def delete_post(request: Request, post_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check ownership or admin
    if post.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")

    # Fetch board to check access level
    board_res = await db.execute(select(Board).where(Board.id == post.board_id))
    board = board_res.scalars().first()

    # Check Board Write Access (Centralized helper)
    await check_board_write_access(board, current_user)
    
    await db.delete(post)
    await db.commit()
    return ResponseModel.success_res({"message": "Post deleted"})

@router.get("/api/posts/{post_id}/comments")
async def get_comments(post_id: int, db: AsyncSession = Depends(get_db)):
    stmt = select(Comment, User).join(User, Comment.user_id == User.id).where(Comment.post_id == post_id).order_by(Comment.created_at.asc())
    result = await db.execute(stmt)
    rows = result.all()
    
    comments_data = []
    for comment, user in rows:
        comments_data.append({
            "id": comment.id,
            "content": comment.content,
            "created_at": comment.created_at.isoformat() if comment.created_at else None,
            "user_id": str(comment.user_id),
            "post_id": comment.post_id,
            "author": {
                "id": str(user.id),
                "nickname": user.nickname
            }
        })
        
    return ResponseModel.success_res(comments_data)

@router.post("/api/posts/{post_id}/comments")
@limiter.limit("10/minute")
async def create_comment(request: Request, post_id: int, req: CommentCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Verify post exists
    post_result = await db.execute(select(Post).where(Post.id == post_id))
    post = post_result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    new_comment = Comment(
        content=req.content,
        user_id=current_user.id,
        post_id=post_id
    )
    db.add(new_comment)
    await db.flush() # Get ID
    
    # Create notification for post owner (if not the same person)
    if post.user_id != current_user.id:
        notif = Notification(
            user_id=post.user_id,
            post_id=post_id,
            comment_id=new_comment.id,
            type="COMMENT",
            actor_user_id=current_user.id
        )
        db.add(notif)
    
    await db.commit()
    await db.refresh(new_comment)

    return JSONResponse(
        status_code=201, # Created
        content={
            "success": True, 
            "data": {
                "id": new_comment.id,
                "content": new_comment.content,
                "created_at": new_comment.created_at.isoformat() if new_comment.created_at else None,
                "user_id": str(new_comment.user_id),
                "post_id": new_comment.post_id
            },
            "error": None
        }
    )

@router.post("/api/posts/{post_id}/like")
@limiter.limit("30/minute")
async def toggle_like(request: Request, post_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Verify post exists
    post_result = await db.execute(select(Post).where(Post.id == post_id))
    post = post_result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check if liked
    like_result = await db.execute(select(PostLike).where(PostLike.post_id == post_id, PostLike.user_id == current_user.id))
    existing_like = like_result.scalars().first()
    
    if existing_like:
        # Unlike
        await db.delete(existing_like)
        liked = False
    else:
        # Like
        new_like = PostLike(user_id=current_user.id, post_id=post_id)
        db.add(new_like)
        liked = True
        
        # Create notification (if not owner)
        if post.user_id != current_user.id:
            notif = Notification(
                user_id=post.user_id,
                post_id=post_id,
                type="LIKE",
                actor_user_id=current_user.id
            )
            db.add(notif)
            
    await db.commit()
    
    # Get total count
    count_result = await db.execute(select(func.count(PostLike.post_id)).where(PostLike.post_id == post_id))
    count = count_result.scalar()
    
    return ResponseModel.success_res({
        "liked": liked,
        "like_count": count
    })

@router.post("/api/posts/{post_id}/view")
@limiter.limit("60/minute")
async def increment_view_count(request: Request, post_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post.view_count += 1
    await db.commit()
    
    return ResponseModel.success_res({"view_count": post.view_count})

@router.get("/api/admin/fix-post-9")
async def fix_post_9_prod(db: AsyncSession = Depends(get_db)):
    """Temporary endpoint to force update Post 9 in Production DB"""
    result = await db.execute(select(Post).where(Post.id == 9))
    post = result.scalars().first()
    
    if not post:
        return JSONResponse(status_code=404, content={"error": "Post 9 not found"})
        
    post.content = """
# Multimodal RAG: 차세대 검색 증강 생성의 혁신

**텍스트를 넘어 이미지와 비디오까지 이해하는 RAG 시스템 구축 가이드**

---

## 1. Multimodal RAG란 무엇인가?

기존의 **RAG (Retrieval-Augmented Generation)** 시스템은 텍스트 데이터만을 검색하여 LLM에 제공하는 방식이었습니다. 하지만 현실 세계의 정보는 텍스트뿐만 아니라 차트, 그래프, 사진, 도표 등 시각적 정보에 많이 담겨 있습니다.

**Multimodal RAG**는 이러한 한계를 극복하기 위해 등장했습니다. 텍스트 쿼리에 대해 관련성 있는 텍스트뿐만 아니라 **이미지 임베딩(Image Embeddings)**을 통해 시각적 정보를 함께 검색하고, **LMM (Large Multimodal Model)**을 통해 이를 종합적으로 해석하여 답변을 생성합니다.

### 핵심 차이점

| 구분 | 기존 RAG (Text-only) | Multimodal RAG |
| :--- | :--- | :--- |
| **입력 데이터** | 텍스트 (PDF, Docx 등에서 추출한 텍스트) | 텍스트 + 이미지 (차트, 슬라이드, 사진) |
| **검색 방식** | Dense Vector Search (Text Embedding) | CLIP, SigLIP 등을 활용한 **Cross-modal Search** |
| **생성 모델** | LLM (GPT-4, Llama 3) | **LMM (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro)** |
| **활용 사례** | 문서 요약, 법전 검색 | 기술 도면 분석, 금융 리포트 차트 해석, 의료 영상 진단 보조 |

---

## 2. 아키텍처 및 파이프라인

Multimodal RAG를 구현하기 위한 파이프라인은 크게 두 가지 접근 방식으로 나뉩니다.

### Option A: 텍스트와 이미지를 분리하여 처리
1. **문서 파싱:** PDF에서 텍스트와 이미지를 분리 추출합니다 (예: `Unstructured` 라이브러리 활용).
2. **개별 인덱싱:**
   - 텍스트 청크 -> Text Vector Store
   - 이미지 -> Image Vector Store (또는 이미지 요약 텍스트 생성 후 Text Store 저장)
3. **검색 및 생성:** 사용자 질문에 대해 두 저장소를 모두 검색한 뒤, LMM에 컨텍스트로 함께 주입합니다.

### Option B: Joint Embedding (CLIP 등 활용)
1. **공통만 공간 투영:** 텍스트와 이미지를 동일한 벡터 공간(Shared Vector Space)에 임베딩합니다.
2. **유사도 검색:** "2024년 매출 차트 보여줘"라는 텍스트 쿼리로 관련 이미지를 직접 검색합니다.
3. **LMM 전달:** 검색된 원본 이미지를 LMM에 입력으로 전달하여 답변을 생성합니다.

---

## 3. 핵심 기술 요소

### 3.1. Document Parsing & Chunking
복잡한 레이아웃을 가진 논문이나 보고서를 정확히 파싱하는 것이 성능의 50%를 결정합니다.
*   **추천 도구:** `LlamaParse`, `Unstructured.io`, `Azure Document Intelligence`
*   단순 OCR을 넘어 표 구조와 캡션을 보존하는 것이 중요합니다.

### 3.2. Multimodal Embedding Models
텍스트와 이미지를 연결해줄 임베딩 모델이 필요합니다.
*   **OpenAI CLIP:** 가장 널리 쓰이는 베이스라인.
*   **Google SigLIP:** CLIP보다 더 정교한 이미지-텍스트 정렬 성능 제공.
*   **Nomic Embed / Cohere Multilingual:** 텍스트 검색 성능 보완.

### 3.3. Serving LMMs
검색된 결과를 해석할 강력한 모델이 필요합니다.
*   **GPT-4o:** 현재 가장 압도적인 이미지 해석 능력과 속도를 보유.
*   **Claude 3.5 Sonnet:** 복잡한 차트 해석과 뉘앙스 파악에 강점.
*   **Gemini 1.5 Pro:** 긴 컨텍스트 윈도우(Video RAG에 유리)와 멀티모달 네이티브.

---

## 4. 구현 예시 (Python & LangChain)

```python
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
import base64

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# 1. 이미지 로드 및 인코딩
image_data = encode_image("./financial_chart.png")

# 2. LMM 초기화 (Gemini 1.5 Pro)
llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro-latest")

# 3. 프롬프트 구성 (텍스트 + 이미지)
message = HumanMessage(
    content=[
        {"type": "text", "text": "다음 차트를 분석해서 2024년 3분기 매출 성장률을 계산해줘."},
        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_data}"}},
    ]
)

# 4. 실행
response = llm.invoke([message])
print(response.content)
```

---

## 5. 결론 및 전망

Multimodal RAG는 단순한 정보 검색을 넘어 **"지식의 시각적 이해"** 단계로 나아가고 있습니다. 기업 내부의 수많은 보고서, 매뉴얼, 설계도면이 이제야 비로소 AI에 의해 검색되고 활용될 수 있게 되었습니다.

앞으로는 **Video RAG** (영상 내 특정 구간 검색 및 요약)와 **Audio RAG**까지 결합된 **Omni-modal System**이 표준이 될 것입니다. Coreline Engineering Studio는 이러한 최신 기술 트렌드를 선도하며 실제 비즈니스 가치를 창출하는 데 집중하고 있습니다.
"""
    await db.commit()
    
    return {"success": True, "message": "Post 9 updated to Markdown via temporary admin route."}
