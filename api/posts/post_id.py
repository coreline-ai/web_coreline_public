from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from api._lib.db import get_db
from api._lib.models import Post, User, Board, BoardCategory, PostLike
from api._lib.auth import get_current_user, get_current_user_optional
from api._lib.schemas import ResponseModel
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

@router.get("/api/posts/{post_id}")
async def get_post_detail(post_id: int, db: AsyncSession = Depends(get_db), current_user: Optional[User] = Depends(get_current_user_optional)):
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Increment view count
    post.view_count += 1
    await db.commit()
    await db.refresh(post)
    
    # Fetch author
    author_result = await db.execute(select(User).where(User.id == post.user_id))
    author = author_result.scalars().first()
    
    # Fetch board
    board_result = await db.execute(select(Board).where(Board.id == post.board_id))
    board = board_result.scalars().first()
    
    # Fetch category
    category_result = await db.execute(select(BoardCategory).where(BoardCategory.id == post.category_id))
    category = category_result.scalars().first()
    
    # Get like count
    like_count_result = await db.execute(
        select(func.count(PostLike.post_id)).where(PostLike.post_id == post.id)
    )
    like_count = like_count_result.scalar() or 0
    
    # Check if current user liked this post
    liked = False
    if current_user:
        liked_result = await db.execute(
            select(PostLike).where(PostLike.post_id == post.id, PostLike.user_id == current_user.id)
        )
        liked = liked_result.scalars().first() is not None
    
    response_data = {
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "is_notice": post.is_notice,
        "author": {
            "id": str(author.id),
            "nickname": author.nickname
        } if author else None,
        "board": {
            "id": board.id,
            "slug": board.slug,
            "name": board.name
        } if board else None,
        "category": {
            "id": category.id,
            "name": category.name
        } if category else None,
        "file_url": post.file_url,
        "created_at": post.created_at.isoformat() if post.created_at else None,
        "updated_at": post.updated_at.isoformat() if post.updated_at else None,
        "view_count": post.view_count,
        "like_count": like_count
    }
    
    # Only include 'liked' field for authenticated users
    if current_user:
        response_data["liked"] = liked
    
    return JSONResponse(content={"success": True, "data": response_data, "error": None})

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category_id: Optional[int] = None

@router.patch("/api/posts/{post_id}")
async def update_post(post_id: int, req: PostUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check ownership or admin
    if post.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")
    
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
async def delete_post(post_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check ownership or admin
    if post.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")
    
    await db.delete(post)
    await db.commit()
    return ResponseModel.success_res({"message": "Post deleted"})

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
