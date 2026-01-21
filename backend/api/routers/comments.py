from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List
from ..database import get_session
from ..models import Comment, Post, User, Notification
from ..schemas import CommentCreate, CommentRead
from ..dependencies import get_current_user

router = APIRouter()

@router.get("/posts/{post_id}/comments", response_model=List[CommentRead])
def read_comments(
    post_id: int,
    session: Session = Depends(get_session),
    skip: int = 0,
    limit: int = 100
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    comments = session.exec(
        select(Comment)
        .where(Comment.post_id == post_id)
        .order_by(Comment.created_at.asc())
        .offset(skip)
        .limit(limit)
    ).all()
    return comments

@router.post("/posts/{post_id}/comments", response_model=CommentRead)
def create_comment(
    post_id: int,
    comment: CommentCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db_comment = Comment.model_validate(comment, update={"user_id": current_user.id, "post_id": post_id})
    session.add(db_comment)
    session.commit()
    session.refresh(db_comment)

    # Trigger Notification if not self-comment
    if post.user_id != current_user.id:
        notification = Notification(
            user_id=post.user_id,
            actor_id=current_user.id,
            post_id=post_id,
            comment_id=db_comment.id,
            type="COMMENT"
        )
        session.add(notification)
        session.commit()

    return db_comment

@router.delete("/comments/{comment_id}")
def delete_comment(
    comment_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    comment = session.get(Comment, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    if comment.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough privileges")
    
    session.delete(comment)
    session.commit()
    return {"ok": True}
