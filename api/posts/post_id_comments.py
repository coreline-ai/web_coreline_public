from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api._lib.db import get_db
from api._lib.models import Comment, Post, User, Notification
from api._lib.auth import get_current_user
from api._lib.schemas import ResponseModel
from pydantic import BaseModel
from typing import List

router = APIRouter()

class CommentCreate(BaseModel):
    content: str

@router.get("/api/posts/{post_id}/comments")
async def get_comments(post_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Comment).where(Comment.post_id == post_id).order_by(Comment.created_at.asc()))
    comments = result.scalars().all()
    return ResponseModel.success_res(comments)

@router.post("/api/posts/{post_id}/comments")
async def create_comment(post_id: int, req: CommentCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
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
    from fastapi.responses import JSONResponse
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

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
