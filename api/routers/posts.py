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

from api._lib.ai import generate_summary

# ... imports ...

@router.post("/api/posts")
@limiter.limit("5/minute")
async def create_post(request: Request, req: PostCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # ... (Board/Category validation logic remains same) ...
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

    # Check Board Write Access
    await check_board_write_access(board, current_user)
    
    # [AI] Generate Summary
    # Combine title and content for better context
    ai_summary = generate_summary(f"Title: {req.title}\n\nContent: {req.content}")

    new_post = Post(
        title=req.title,
        content=req.content,
        summary=ai_summary,  # Save summary
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
                "summary": new_post.summary, # Return summary
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

# ...

@router.get("/api/posts/{post_id}")
async def get_post_detail(post_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user_optional)):
    # Fetch Post with related data
    stmt = select(Post, User, BoardCategory, Board)\
        .join(User, Post.user_id == User.id)\
        .join(BoardCategory, Post.category_id == BoardCategory.id)\
        .join(Board, Post.board_id == Board.id)\
        .where(Post.id == post_id)
        
    result = await db.execute(stmt)
    row = result.first()
    
    if not row:
        raise HTTPException(status_code=404, detail="Post not found")
        
    post, author, category, board = row

    # Check Read Access
    await check_board_access(board, current_user, action="read")
    
    # Get Like Count & User Like Status
    like_count_res = await db.execute(select(func.count(PostLike.post_id)).where(PostLike.post_id == post.id))
    like_count = like_count_res.scalar() or 0
    
    auth_liked = False
    if current_user:
        liked_res = await db.execute(select(PostLike).where(PostLike.post_id == post.id, PostLike.user_id == current_user.id))
        auth_liked = bool(liked_res.scalars().first())

    return JSONResponse(content={
        "success": True,
        "data": {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "summary": post.summary,
            "user_id": str(post.user_id),
            "board_id": post.board_id,
            "category_id": post.category_id,
            "is_notice": post.is_notice,
            "file_url": post.file_url,
            "created_at": post.created_at.isoformat() if post.created_at else None,
            "updated_at": post.updated_at.isoformat() if post.updated_at else None,
            "view_count": post.view_count,
            "like_count": like_count,
            "liked": auth_liked,
            "author": {
                "id": str(author.id), 
                "nickname": author.nickname,
                "email": author.email
            },
            "category": {
                "id": category.id, 
                "name": category.name
            },
            "board": {
                "id": board.id,
                "slug": board.slug,
                "name": board.name
            }
        },
        "error": None
    })

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

    # Check Board Write Access
    await check_board_write_access(board, current_user)
    
    needs_summary_update = False
    if req.title is not None:
        post.title = req.title
        needs_summary_update = True
    if req.content is not None:
        post.content = req.content
        needs_summary_update = True
    if req.category_id is not None:
        # Validate category
        cat_result = await db.execute(select(BoardCategory).where(BoardCategory.id == req.category_id, BoardCategory.board_id == post.board_id))
        if not cat_result.scalars().first():
            raise HTTPException(status_code=400, detail="Invalid category for this board")
        post.category_id = req.category_id
        
    # [AI] Regenerate Summary if content changed
    if needs_summary_update:
        post.summary = generate_summary(f"Title: {post.title}\n\nContent: {post.content}")

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
    
    # Delete dependencies first (Manual Cascade)
    # 1. Likes
    await db.execute(select(PostLike).where(PostLike.post_id == post_id).execution_options(synchronize_session=False))
    # It seems sqlalchemy delete needs 'delete' statement not select
    from sqlalchemy import delete
    await db.execute(delete(PostLike).where(PostLike.post_id == post_id))
    
    # 2. Notifications
    await db.execute(delete(Notification).where(Notification.post_id == post_id))
    
    # 3. Comments (and their notifications? Notification has comment_id, handled by post_id delete mostly? 
    # Notification has post_id, so deleting by post_id handles most. 
    # Any notification unrelated to post but related to comment? No, Notification model has post_id nullable=False usually?
    # Let's check model: post_id is nullable=False. So deleting by post_id is safe.)
    
    await db.execute(delete(Comment).where(Comment.post_id == post_id))
    
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
    content: Optional[str] = None
    title: Optional[str] = None

@router.post("/api/admin/force-update-post")
async def force_update_post(req: AdminPostUpdate, db: AsyncSession = Depends(get_db)):
    """Temporary endpoint to force update ANY post (Title/Content) in Production DB"""
    result = await db.execute(select(Post).where(Post.id == req.id))
    post = result.scalars().first()
    
    if not post:
        return JSONResponse(status_code=404, content={"error": f"Post {req.id} not found"})
        
    if req.content:
        post.content = req.content
    if req.title:
        post.title = req.title
        
    post.updated_at = func.now() 
    await db.commit()
    
    return {"success": True, "message": f"Post {req.id} updated (Title: {bool(req.title)}, Content: {bool(req.content)})"}
