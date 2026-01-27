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

class AdminPostUpdate(BaseModel):
    id: int
    content: str

@router.post("/api/admin/force-update-post")
async def force_update_post(req: AdminPostUpdate, db: AsyncSession = Depends(get_db)):
    """Temporary endpoint to force update ANY post in Production DB"""
    result = await db.execute(select(Post).where(Post.id == req.id))
    post = result.scalars().first()
    
    if not post:
        return JSONResponse(status_code=404, content={"error": f"Post {req.id} not found"})
        
    post.content = req.content
    post.updated_at = func.now() # Ensure updated_at changes
    await db.commit()
    
    return {"success": True, "message": f"Post {req.id} successfully updated."}
