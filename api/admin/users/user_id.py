from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api._lib.db import get_db
from api._lib.models import User
from api._lib.auth import admin_required
from api._lib.schemas import ResponseModel
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class UserAdminUpdate(BaseModel):
    is_admin: Optional[bool] = None
    is_banned: Optional[bool] = None

@router.patch("/api/admin/users/{user_id}")
async def update_user_status(
    user_id: str, 
    req: UserAdminUpdate, 
    db: AsyncSession = Depends(get_db), 
    admin: User = Depends(admin_required)
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if req.is_admin is not None:
        user.is_admin = req.is_admin
    if req.is_banned is not None:
        user.is_banned = req.is_banned
        
    await db.commit()
    await db.refresh(user)
    return ResponseModel.success_res(user)

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
