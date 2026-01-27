from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from api._lib.db import get_db
from api._lib.models import Board, User, BoardCategory, Post, PostLike
from api._lib.auth import get_current_user, admin_required, get_current_user_optional
from api._lib.access_control import check_board_access
from api._lib.schemas import ResponseModel
from api._lib.limiter import limiter
from pydantic import BaseModel
from typing import List, Optional, Any
import json

router = APIRouter()

# --- Schemas ---

class BoardCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    access_level: str = "PUBLIC"
    categories: List[str] = []

class BoardUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    access_level: Optional[str] = None

class CategoryCreate(BaseModel):
    name: str

class CategoryUpdate(BaseModel):
    name: Optional[str] = None

# --- Helper ---
async def serialize_post(post: Post, db: AsyncSession, categories_map: dict, users_cache: dict) -> dict:
    # Helper to serialize post for list view (reusing logic from api/boards/slug.py)
    # We need to fetch author if not in cache
    author_id = post.user_id
    if author_id not in users_cache:
        res = await db.execute(select(User).where(User.id == author_id))
        users_cache[author_id] = res.scalars().first()
    author = users_cache.get(author_id)
    
    category = categories_map.get(post.category_id)
    
    # Get like count
    # Note: Optimization - doing this per post in loop is distinct N+1 but for 20 posts it's acceptable for now 
    # to match original logic.
    like_res = await db.execute(select(func.count(PostLike.post_id)).where(PostLike.post_id == post.id))
    like_count = like_res.scalar() or 0
    
    return {
        "id": post.id,
        "title": post.title,
        "is_notice": post.is_notice,
        "author": {"id": str(author.id), "nickname": author.nickname} if author else None,
        "category": {"id": category.id, "name": category.name} if category else None,
        "created_at": post.created_at.isoformat() if post.created_at else None,
        "updated_at": post.updated_at.isoformat() if post.updated_at else None,
        "view_count": post.view_count,
        "like_count": like_count
    }

# --- Endpoints ---

@router.get("/api/boards")
async def get_boards(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user_optional)
):
    result = await db.execute(select(Board).order_by(Board.id.desc()))
    boards = result.scalars().all()
    
    # Filter boards based on access level
    filtered_boards = []
    for b in boards:
        if b.access_level == "PUBLIC":
            filtered_boards.append(b)
        elif b.access_level == "AUTHENTICATED":
            if current_user:
                filtered_boards.append(b)
        elif b.access_level == "ADMIN":
            if current_user and current_user.is_admin:
                filtered_boards.append(b)
                
    return JSONResponse(content={
        "success": True,
        "data": [
            {
                "id": b.id, "name": b.name, "slug": b.slug, 
                "description": b.description, "access_level": b.access_level
            } for b in filtered_boards
        ],
        "error": None
    })

@router.post("/api/boards")
@limiter.limit("5/minute")
async def create_board(request: Request, req: BoardCreate, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
    # Check existing
    result = await db.execute(select(Board).where((Board.name == req.name) | (Board.slug == req.slug)))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Board with this name or slug already exists")
    
    new_board = Board(
        name=req.name,
        slug=req.slug,
        description=req.description,
        access_level=req.access_level
    )
    db.add(new_board)
    await db.flush() # Get ID before commit (to add categories)
    
    # Add Categories
    if req.categories:
        for cat_name in req.categories:
            if cat_name.strip():
                new_cat = BoardCategory(board_id=new_board.id, name=cat_name.strip())
                db.add(new_cat)
    
    await db.commit()
    await db.refresh(new_board)
    
    new_board_dict = {
        "id": new_board.id, "name": new_board.name, "slug": new_board.slug, 
        "description": new_board.description, "access_level": new_board.access_level
    }
    return JSONResponse(
        status_code=201, # Created
        content={
            "success": True,
            "data": new_board_dict,
            "error": None
        }
    )

@router.get("/api/boards/{slug}")
async def get_board_detail_and_posts(
    slug: str, 
    page: int = 1, 
    category_id: Optional[int] = None, 
    keyword: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user_optional)
):
    # Get Board
    result = await db.execute(select(Board).where(Board.slug == slug))
    board = result.scalars().first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")

    # Check Access Level (AWAITED centralized helper)
    await check_board_access(board, current_user, action="view")
    
    # Get Categories
    cat_result = await db.execute(select(BoardCategory).where(BoardCategory.board_id == board.id))
    categories = cat_result.scalars().all()
    
    # Get Notices with Author and Category
    notice_stmt = select(Post, User, BoardCategory)\
        .select_from(Post)\
        .join(User, Post.user_id == User.id)\
        .join(BoardCategory, Post.category_id == BoardCategory.id)\
        .where(Post.board_id == board.id, Post.is_notice == True)\
        .order_by(Post.created_at.desc())
        
    notice_result = await db.execute(notice_stmt)
    notice_rows = notice_result.all()
    
    # Get Posts with Pagination and Relations
    limit = 20
    offset = (page - 1) * limit
    
    query = select(Post, User, BoardCategory)\
        .select_from(Post)\
        .join(User, Post.user_id == User.id)\
        .join(BoardCategory, Post.category_id == BoardCategory.id)\
        .where(Post.board_id == board.id, Post.is_notice == False)
        
    if category_id:
        query = query.where(Post.category_id == category_id)
    if keyword:
        query = query.where(Post.title.ilike(f"%{keyword}%") | Post.content.ilike(f"%{keyword}%"))
    
    query = query.order_by(Post.created_at.desc()).offset(offset).limit(limit)
    posts_result = await db.execute(query)
    posts_rows = posts_result.all()
    
    # Get Total Count
    count_query = select(func.count(Post.id)).where(Post.board_id == board.id, Post.is_notice == False)
    if category_id:
        count_query = count_query.where(Post.category_id == category_id)
    if keyword:
        count_query = count_query.where(Post.title.ilike(f"%{keyword}%") | Post.content.ilike(f"%{keyword}%"))
    
    total_count_result = await db.execute(count_query)
    total_items = total_count_result.scalar()
    total_pages = (total_items + limit - 1) // limit if total_items else 0

    board_data = {
        "id": board.id,
        "name": board.name,
        "slug": board.slug,
        "description": board.description,
        "access_level": board.access_level
    }
    categories_data = [{"id": c.id, "name": c.name} for c in categories]
    
    # Batch Fetch Like Counts (Fix N+1)
    all_post_ids = [row[0].id for row in notice_rows + posts_rows]
    likes_map = {}
    if all_post_ids:
        likes_stmt = select(PostLike.post_id, func.count(PostLike.post_id))\
            .where(PostLike.post_id.in_(all_post_ids))\
            .group_by(PostLike.post_id)
        likes_res = await db.execute(likes_stmt)
        likes_map = {post_id: count for post_id, count in likes_res.all()}

    def format_post_row(row):
        post, author, category = row
        like_count = likes_map.get(post.id, 0)
        
        return {
            "id": post.id,
            "title": post.title,
            "is_notice": post.is_notice,
            "author": {"id": str(author.id), "nickname": author.nickname} if author else {"id": "", "nickname": "Unknown"},
            "category": {"id": category.id, "name": category.name} if category else None,
            "created_at": post.created_at.isoformat() if post.created_at else None,
            "updated_at": post.updated_at.isoformat() if post.updated_at else None,
            "view_count": post.view_count,
            "like_count": like_count
        }

    notices_data = [format_post_row(row) for row in notice_rows]
    posts_data = [format_post_row(row) for row in posts_rows]
    
    return JSONResponse(
        content={
            "success": True,
            "data": {
                "board": board_data,
                "categories": categories_data,
                "notices": notices_data,
                "posts": posts_data,
                "pagination": {
                    "current_page": page,
                    "total_pages": total_pages,
                    "total_items": total_items
                }
            },
            "error": None
        }
    )

@router.put("/api/boards/{slug}")
@limiter.limit("10/minute")
async def update_board(request: Request, slug: str, req: BoardUpdate, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
    result = await db.execute(select(Board).where(Board.slug == slug))
    board = result.scalars().first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    if req.name is not None:
        board.name = req.name
    if req.description is not None:
        board.description = req.description
    if req.access_level is not None:
        board.access_level = req.access_level
    
    await db.commit()
    await db.refresh(board)
    
    return JSONResponse(content={
        "success": True,
        "data": {"id": board.id, "name": board.name, "slug": board.slug, "description": board.description, "access_level": board.access_level},
        "error": None
    })

@router.delete("/api/boards/{slug}")
@limiter.limit("10/minute")
async def delete_board(request: Request, slug: str, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
    result = await db.execute(select(Board).where(Board.slug == slug))
    board = result.scalars().first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    await db.delete(board)
    await db.commit()
    
    return JSONResponse(content={"success": True, "data": {"message": "Board deleted"}, "error": None})

# --- Category CRUD ---

@router.get("/api/boards/{slug}/categories")
async def get_board_categories(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Board).where(Board.slug == slug))
    board = result.scalars().first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    cat_result = await db.execute(select(BoardCategory).where(BoardCategory.board_id == board.id))
    categories = cat_result.scalars().all()
    
    return JSONResponse(content={
        "success": True,
        "data": [{"id": c.id, "name": c.name, "board_id": c.board_id} for c in categories],
        "error": None
    })

@router.post("/api/boards/{slug}/categories")
@limiter.limit("20/minute")
async def create_category(request: Request, slug: str, req: CategoryCreate, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
    result = await db.execute(select(Board).where(Board.slug == slug))
    board = result.scalars().first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    new_cat = BoardCategory(name=req.name, board_id=board.id)
    db.add(new_cat)
    await db.commit()
    await db.refresh(new_cat)
    
    return JSONResponse(
        status_code=201, # Created
        content={
            "success": True,
            "data": {"id": new_cat.id, "name": new_cat.name, "board_id": new_cat.board_id},
            "error": None
        }
    )

@router.put("/api/boards/{slug}/categories/{category_id}")
@limiter.limit("20/minute")
async def update_category(request: Request, slug: str, category_id: int, req: CategoryUpdate, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
    result = await db.execute(select(Board).where(Board.slug == slug))
    board = result.scalars().first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    cat_result = await db.execute(select(BoardCategory).where(BoardCategory.id == category_id, BoardCategory.board_id == board.id))
    category = cat_result.scalars().first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    if req.name is not None:
        category.name = req.name
    
    await db.commit()
    await db.refresh(category)
    
    return JSONResponse(content={
        "success": True,
        "data": {"id": category.id, "name": category.name, "board_id": category.board_id},
        "error": None
    })

@router.delete("/api/boards/{slug}/categories/{category_id}")
@limiter.limit("20/minute")
async def delete_category(request: Request, slug: str, category_id: int, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
    result = await db.execute(select(Board).where(Board.slug == slug))
    board = result.scalars().first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    cat_result = await db.execute(select(BoardCategory).where(BoardCategory.id == category_id, BoardCategory.board_id == board.id))
    category = cat_result.scalars().first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    await db.delete(category)
    await db.commit()
    
    return JSONResponse(content={"success": True, "data": {"message": "Category deleted"}, "error": None})
