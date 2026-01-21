from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from ..database import get_session
from ..models import Notification, User
from ..schemas import NotificationRead
from ..dependencies import get_current_user

router = APIRouter()

@router.get("/notifications", response_model=List[NotificationRead])
def get_notifications(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
    unread_only: bool = True
):
    query = select(Notification).where(Notification.user_id == current_user.id)
    if unread_only:
        query = query.where(Notification.is_read == False)
    
    query = query.order_by(Notification.created_at.desc())
    notifications = session.exec(query).all()
    return notifications

@router.post("/notifications/{notification_id}/read")
def mark_notification_read(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    notification = session.get(Notification, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    if notification.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    notification.is_read = True
    session.add(notification)
    session.commit()
    return {"ok": True}
