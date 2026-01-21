from fastapi import APIRouter, Depends, HTTPException, status, Query, Response
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from sqlalchemy.orm import selectinload
from api._lib.db import get_db
from api._lib.models import Board, Post, BoardCategory, User, PostLike
from api._lib.auth import get_current_user, admin_required
from api._lib.schemas import ResponseModel, BoardDetailSchema
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# Helper function to serialize post with author/category/like_count
async def serialize_post(post: Post, db: AsyncSession, categories_map: dict, users_cache: dict) -> dict:
    # Get author from cache or fetch
    if post.user_id not in users_cache:
        user_result = await db.execute(select(User).where(User.id == post.user_id))
        user = user_result.scalars().first()
        users_cache[post.user_id] = user
    author = users_cache.get(post.user_id)
    
    # Get category from map
    category = categories_map.get(post.category_id)
    
    # Get like count
    like_count_result = await db.execute(
        select(func.count(PostLike.post_id)).where(PostLike.post_id == post.id)
    )
    like_count = like_count_result.scalar() or 0
    
    return {
        "id": post.id,
        "title": post.title,
        "content": post.content, # Added content field
        "is_notice": post.is_notice,
        "author": {
            "id": str(author.id) if author else None,
            "nickname": author.nickname if author else "Unknown"
        } if author else None,
        "category": {
            "id": category.id,
            "name": category.name
        } if category else None,
        "view_count": post.view_count,
        "like_count": like_count,
        "created_at": post.created_at.isoformat() if post.created_at else None
    }

@router.get("/api/boards/{slug}")
async def get_board_detail(
    slug: str, 
    page: int = 1, 
    category_id: Optional[int] = None, 
    keyword: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    # Get Board
    result = await db.execute(select(Board).where(Board.slug == slug))
    board = result.scalars().first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    # Get Categories and build map
    cat_result = await db.execute(select(BoardCategory).where(BoardCategory.board_id == board.id))
    categories = cat_result.scalars().all()
    categories_map = {c.id: c for c in categories}
    
    # Get Notices
    notice_result = await db.execute(
        select(Post).where(Post.board_id == board.id, Post.is_notice == True).order_by(Post.created_at.desc())
    )
    notices = notice_result.scalars().all()
    
    # Get Posts with Pagination
    limit = 20
    offset = (page - 1) * limit
    
    query = select(Post).where(Post.board_id == board.id, Post.is_notice == False)
    if category_id:
        query = query.where(Post.category_id == category_id)
    if keyword:
        query = query.where(Post.title.ilike(f"%{keyword}%") | Post.content.ilike(f"%{keyword}%"))
    
    query = query.order_by(Post.created_at.desc()).offset(offset).limit(limit)
    posts_result = await db.execute(query)
    posts = posts_result.scalars().all()
    
    # Get Total Count
    count_query = select(func.count(Post.id)).where(Post.board_id == board.id, Post.is_notice == False)
    if category_id:
        count_query = count_query.where(Post.category_id == category_id)
    if keyword:
        count_query = count_query.where(Post.title.ilike(f"%{keyword}%") | Post.content.ilike(f"%{keyword}%"))
    
    total_count_result = await db.execute(count_query)
    total_items = total_count_result.scalar()
    total_pages = (total_items + limit - 1) // limit if total_items else 0

    # Build response with author/category objects
    users_cache = {}
    
    board_data = {
        "id": board.id,
        "name": board.name,
        "slug": board.slug,
        "description": board.description,
        "access_level": board.access_level
    }
    categories_data = [{"id": c.id, "name": c.name} for c in categories]
    
    # Serialize notices with author/category
    notices_data = []
    for n in notices:
        notices_data.append(await serialize_post(n, db, categories_map, users_cache))
    
    # Serialize posts with author/category
    posts_data = []
    for p in posts:
        posts_data.append(await serialize_post(p, db, categories_map, users_cache))
    
    import json
    return Response(
        content=json.dumps({
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
        }),
        media_type="application/json"
    )

# --- Board Update/Delete ---
class BoardUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    access_level: Optional[str] = None

@router.put("/api/boards/{slug}")
async def update_board(slug: str, req: BoardUpdate, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
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
async def delete_board(slug: str, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
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

class CategoryCreate(BaseModel):
    name: str

@router.post("/api/boards/{slug}/categories")
async def create_category(slug: str, req: CategoryCreate, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
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

class CategoryUpdate(BaseModel):
    name: Optional[str] = None

@router.put("/api/boards/{slug}/categories/{category_id}")
async def update_category(slug: str, category_id: int, req: CategoryUpdate, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
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
async def delete_category(slug: str, category_id: int, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
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

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
