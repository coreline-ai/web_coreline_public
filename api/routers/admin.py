from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from api._lib.db import get_db
from api._lib.models import User
from api._lib.auth import admin_required
from api._lib.schemas import ResponseModel
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# --- Schemas ---

class UserAdminUpdate(BaseModel):
    is_admin: Optional[bool] = None
    is_banned: Optional[bool] = None

# --- Endpoints ---

@router.get("/api/admin/users")
async def list_users(
    page: int = 1, 
    limit: int = 20, 
    db: AsyncSession = Depends(get_db), 
    admin: User = Depends(admin_required)
):
    offset = (page - 1) * limit
    
    # List users
    result = await db.execute(select(User).order_by(User.created_at.desc()).offset(offset).limit(limit))
    users = result.scalars().all()
    
    # Total count
    count_result = await db.execute(select(func.count(User.id)))
    total_items = count_result.scalar()
    total_pages = (total_items + limit - 1) // limit
    
    return ResponseModel.success_res({
        "items": users,
        "pagination": {
            "current_page": page,
            "total_pages": total_pages,
            "total_items": total_items
        }
    })

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

from api._lib.models import AuditLog

@router.get("/api/admin/audit-logs")
async def get_audit_logs(
    page: int = 1, 
    limit: int = 20,
    user_id: Optional[str] = None,
    action: Optional[str] = None,
    db: AsyncSession = Depends(get_db), 
    admin: User = Depends(admin_required)
):
    offset = (page - 1) * limit
    
    query = select(AuditLog).order_by(AuditLog.created_at.desc())
    count_query = select(func.count(AuditLog.id))
    
    if user_id:
        query = query.where(AuditLog.user_id == user_id)
        count_query = count_query.where(AuditLog.user_id == user_id)
    
    if action:
        query = query.where(AuditLog.action == action)
        count_query = count_query.where(AuditLog.action == action)
        
    query = query.offset(offset).limit(limit)
    
    result = await db.execute(query)
    logs = result.scalars().all()
    
    # Needs to join with User to get nickname if we want to display it?
    # For now, let's just return logs. Frontend can perhaps fetch user details or we can join.
    # Let's verify if we need User info. Usually yes.
    # But AuditLog has user_id, which might be None (anonymous).
    
    count_result = await db.execute(count_query)
    total_items = count_result.scalar()
    total_pages = (total_items + limit - 1) // limit if total_items else 0
    
    return ResponseModel.success_res({
        "items": logs,
        "pagination": {
            "current_page": page,
            "total_pages": total_pages,
            "total_items": total_items
        }
    })
