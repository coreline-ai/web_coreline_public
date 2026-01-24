from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api._lib.db import get_db
from api._lib.models import Notification, User, Post
from api._lib.auth import get_current_user
from api._lib.schemas import ResponseModel
from typing import List

router = APIRouter()

@router.get("/api/notifications")
async def get_unread_notifications(limit: int = 10, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Clamp limit to prevent DoS
    if limit > 100:
        limit = 100
    
    # Fetch only unread notifications for current user
    result = await db.execute(
        select(Notification)
        .where(Notification.user_id == current_user.id, Notification.is_read == False)
        .order_by(Notification.created_at.desc())
        .limit(limit)
    )
    notifications = result.scalars().all()
    
    # Build response with actor/post objects
    notifications_data = []
    for n in notifications:
        # Fetch actor
        actor = None
        if n.actor_user_id:
            actor_result = await db.execute(select(User).where(User.id == n.actor_user_id))
            actor_user = actor_result.scalars().first()
            if actor_user:
                actor = {"id": str(actor_user.id), "nickname": actor_user.nickname}
        
        # Fetch post
        if n.post_id:
            # Join Post and Board to get slug
            stmt = select(Post, Board).join(Board, Post.board_id == Board.id).where(Post.id == n.post_id)
            post_result = await db.execute(stmt)
            row = post_result.first()
            if row:
                post_obj, board_obj = row
                post = {
                    "id": post_obj.id, 
                    "title": post_obj.title,
                    "slug": board_obj.slug,
                    "board_id": board_obj.id
                }
        
        notifications_data.append({
            "id": n.id,
            "type": n.type,
            "actor": actor,
            "post": post,
            "comment_id": n.comment_id,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat() if n.created_at else None
        })
    
    return JSONResponse(content={"success": True, "data": notifications_data, "error": None})

@router.post("/api/notifications/{notification_id}/read")
async def mark_as_read(notification_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Notification).where(Notification.id == notification_id))
    notif = result.scalars().first()
    
    if not notif or notif.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Notification not found")
        
    notif.is_read = True
    await db.commit()
    await db.refresh(notif)
    return ResponseModel.success_res(notif)

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
