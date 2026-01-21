from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api._lib.db import get_db
from api._lib.models import Notification, User
from api._lib.auth import get_current_user
from api._lib.schemas import ResponseModel

router = APIRouter()

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
