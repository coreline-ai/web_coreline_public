from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from api._lib.db import get_db
from api._lib.models import Post, PostLike, User, Notification
from api._lib.auth import get_current_user
from api._lib.schemas import ResponseModel

router = APIRouter()

@router.post("/api/posts/{post_id}/like")
async def toggle_like(post_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
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

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
