from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..database import get_session
from ..models import Like, Post, User
from ..schemas import LikeToggle
from ..dependencies import get_current_user

router = APIRouter()

@router.post("/posts/{post_id}/like", response_model=LikeToggle)
def toggle_like(
    post_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check if already liked
    existing_like = session.exec(
        select(Like).where(Like.user_id == current_user.id, Like.post_id == post_id)
    ).first()
    
    liked = False
    if existing_like:
        session.delete(existing_like)
        liked = False
    else:
        new_like = Like(user_id=current_user.id, post_id=post_id)
        session.add(new_like)
        liked = True
    
    session.commit()
    
    # Recalculate like count for the post not just +1/-1 to be safe, or just return current count
    # Ideally efficient:
    like_count = session.exec(
        select(Like).where(Like.post_id == post_id)
    ).all()
    count = len(like_count)
    
    return LikeToggle(post_id=post_id, liked=liked, like_count=count)
