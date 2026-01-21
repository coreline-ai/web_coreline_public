from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from pydantic import BaseModel
from uuid import UUID
from ..database import get_session
from ..models import User
from ..dependencies import get_current_admin_user

router = APIRouter(prefix="/api/admin", tags=["admin"])

class UserUpdateAdmin(BaseModel):
    is_banned: bool

@router.patch("/users/{user_id}")
def update_user_status(
    user_id: UUID, 
    update: UserUpdateAdmin,
    admin: User = Depends(get_current_admin_user),
    session: Session = Depends(get_session)
):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Prevent banning oneself
    if user.id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot ban yourself")

    user.is_banned = update.is_banned
    session.add(user)
    session.commit()
    session.refresh(user)
    return {"id": str(user.id), "username": user.username, "is_banned": user.is_banned}
