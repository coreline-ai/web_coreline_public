from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select, func
from typing import List, Optional
from ..database import get_session
from ..models import Board, Category, Post, AccessLevel, User
from ..schemas import BoardRead, BoardCreate, BoardDetail, CategoryRead, PostList, UserRead
from ..dependencies import get_current_user, get_current_admin_user

router = APIRouter(prefix="/api/boards", tags=["boards"])

@router.get("/", response_model=List[BoardRead])
def list_boards(session: Session = Depends(get_session)):
    # In future, filter by user access level
    boards = session.exec(select(Board)).all()
    return boards

@router.post("/", response_model=BoardRead)
def create_board(board_in: BoardCreate, admin: User = Depends(get_current_admin_user), session: Session = Depends(get_session)):
    board = Board.model_validate(board_in)
    session.add(board)
    session.commit()
    session.refresh(board)
    return board

@router.get("/{slug}", response_model=BoardDetail)
def get_board_detail(
    slug: str, 
    page: int = 1, 
    category_id: Optional[int] = None,
    keyword: Optional[str] = None,
    session: Session = Depends(get_session)
):
    board = session.exec(select(Board).where(Board.slug == slug)).first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")

    # Categories
    categories = session.exec(select(Category).where(Category.board_id == board.id)).all()

    # Notices (Always fetch all notices for this board)
    notices_query = select(Post).where(Post.board_id == board.id, Post.is_notice == True).order_by(Post.created_at.desc())
    notices = session.exec(notices_query).all()

    # Posts (Pagination)
    posts_query = select(Post).where(Post.board_id == board.id, Post.is_notice == False)
    
    if category_id:
        posts_query = posts_query.where(Post.category_id == category_id)
    
    if keyword:
        posts_query = posts_query.where(Post.title.contains(keyword) | Post.content.contains(keyword))
    
    # Count total for pagination
    total_items = session.exec(select(func.count()).select_from(posts_query.subquery())).one()
    
    # Apply limit/offset
    limit = 20
    offset = (page - 1) * limit
    posts_query = posts_query.order_by(Post.created_at.desc()).offset(offset).limit(limit)
    posts = session.exec(posts_query).all()
    
    total_pages = (total_items + limit - 1) // limit

    return BoardDetail(
        board=board,
        categories=categories,
        notices=[PostList(
            id=p.id, title=p.title, is_notice=p.is_notice, 
            category=CategoryRead.model_validate(p.category), 
            author=UserRead.model_validate(p.author), 
            created_at=p.created_at, view_count=p.view_count, like_count=0
        ) for p in notices],
        posts=[PostList(
            id=p.id, title=p.title, is_notice=p.is_notice, 
            category=CategoryRead.model_validate(p.category), 
            author=UserRead.model_validate(p.author), 
            created_at=p.created_at, view_count=p.view_count, like_count=0
        ) for p in posts],
        pagination={"current_page": page, "total_pages": total_pages, "total_items": total_items}
    )

@router.get("/{slug}/categories", response_model=List[CategoryRead])
def get_board_categories(slug: str, session: Session = Depends(get_session)):
    board = session.exec(select(Board).where(Board.slug == slug)).first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    categories = session.exec(select(Category).where(Category.board_id == board.id)).all()
    return categories

@router.post("/{slug}/categories", response_model=CategoryRead)
def create_category(slug: str, category_in: CategoryRead, admin: User = Depends(get_current_admin_user), session: Session = Depends(get_session)):
    # Note: CategoryRead has ID, but here likely we want a CategoryCreate schema without ID
    # Simplifying for now, assuming name is passed.
    board = session.exec(select(Board).where(Board.slug == slug)).first()
    if not board:
         raise HTTPException(status_code=404, detail="Board not found")
    
    category = Category(name=category_in.name, board_id=board.id)
    session.add(category)
    session.commit()
    session.refresh(category)
    return category
