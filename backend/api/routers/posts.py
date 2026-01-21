from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from ..database import get_session
from ..models import Post, Board, Category, User, Like
from ..schemas import PostCreate, PostRead
from ..dependencies import get_current_user, get_current_admin_user, get_current_user_optional

router = APIRouter(prefix="/api/posts", tags=["posts"])

@router.post("/", response_model=PostRead, status_code=status.HTTP_201_CREATED)
def create_post(
    post_in: PostCreate, 
    user: User = Depends(get_current_user), 
    session: Session = Depends(get_session)
):
    # Verify board and category
    category = session.get(Category, post_in.category_id)
    if not category:
        raise HTTPException(status_code=400, detail="Invalid category_id")
    
    if category.board_id != post_in.board_id:
         raise HTTPException(status_code=400, detail="Category does not belong to the board")

    # Check admin for notice
    if post_in.is_notice and not user.is_admin:
        raise HTTPException(status_code=403, detail="Only admins can create notices")

    post = Post(
        title=post_in.title,
        content=post_in.content,
        board_id=post_in.board_id,
        category_id=post_in.category_id,
        is_notice=post_in.is_notice,
        file_url=post_in.file_url,
        user_id=user.id
    )
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@router.get("/{post_id}", response_model=PostRead)


@router.get("/{post_id}", response_model=PostRead)
def get_post(
    post_id: int, 
    session: Session = Depends(get_session),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Increase view count
    post.view_count += 1
    session.add(post)
    session.commit()
    session.refresh(post)
    
    # Like info
    like_count = session.exec(select(Like).where(Like.post_id == post_id)).all()
    count = len(like_count)
    
    liked = False
    if current_user:
        user_like = session.exec(
            select(Like).where(Like.user_id == current_user.id, Like.post_id == post_id)
        ).first()
        if user_like:
            liked = True

    # Construct response manually to include extra fields
    # PostRead expects Pydantic model. We can return the SQLModel object mixed with dict, 
    # but since PostRead has extra fields (liked, like_count) not in Post table,
    # we need to ensure Pydantic can gather them.
    # The easiest way is to convert post to dict and update it.
    post_dict = post.model_dump()
    # Relations need to be handled. model_dump might not include relations unless configured?
    # Actually PostRead expects `author`, `board`, `category`. 
    # Returning the `post` object (SQLModel) usually populates relations automatically in valid pydantic V2 if data is loaded.
    # But we need to define `liked` and `like_count`.
    # Let's try creating a PostRead directly.
    
    return PostRead(
        **post_dict,
        author=post.author,
        board=post.board,
        category=post.category,
        liked=liked,
        like_count=count,
        created_at=post.created_at,
        updated_at=post.updated_at
    )
