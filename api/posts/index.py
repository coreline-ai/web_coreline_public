from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api._lib.db import get_db
from api._lib.models import Post, Board, BoardCategory, User
from api._lib.auth import get_current_user
from api._lib.schemas import ResponseModel
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class PostCreate(BaseModel):
    title: str
    content: str
    board_slug: str # Changed from board_id
    category_id: int
    is_notice: bool = False
    file_url: Optional[str] = None

@router.post("/api/posts")
async def create_post(req: PostCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Lookup Board by Slug
    board_result = await db.execute(select(Board).where(Board.slug == req.board_slug))
    board = board_result.scalars().first()
    if not board:
        raise HTTPException(status_code=404, detail=f"Board not found (slug: {req.board_slug})")

    # Validate category belongs to board
    cat_result = await db.execute(
        select(BoardCategory).where(BoardCategory.id == req.category_id, BoardCategory.board_id == board.id)
    )
    if not cat_result.scalars().first():
        raise HTTPException(status_code=400, detail="Invalid category for this board")
    
    # Only admin can set is_notice = True
    notice_val = req.is_notice if current_user.is_admin else False
    
    new_post = Post(
        title=req.title,
        content=req.content,
        user_id=current_user.id,
        board_id=board.id,
        category_id=req.category_id,
        is_notice=notice_val,
        file_url=req.file_url
    )
    
    db.add(new_post)
    await db.commit()
    await db.refresh(new_post)
    
    # Return 201 Created
    from fastapi.responses import JSONResponse
    return JSONResponse(
        status_code=201,
        content={
            "success": True, 
            "data": {
                "id": new_post.id,
                "title": new_post.title,
                "content": new_post.content,
                "user_id": str(new_post.user_id),
                "board_id": new_post.board_id,
                "category_id": new_post.category_id,
                "is_notice": new_post.is_notice,
                "file_url": new_post.file_url,
                "created_at": new_post.created_at.isoformat() if new_post.created_at else None,
                "view_count": new_post.view_count
            },
            "error": None
        }
    )

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
