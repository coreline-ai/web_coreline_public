from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api._lib.db import get_db
from api._lib.models import Board, User
from api._lib.auth import get_current_user, admin_required
from api._lib.schemas import ResponseModel
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class BoardCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    access_level: str = "PUBLIC"

@router.get("/api/boards")
async def get_boards(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Board))
    boards = result.scalars().all()
    return JSONResponse(content={
        "success": True,
        "data": [
            {
                "id": b.id, "name": b.name, "slug": b.slug, 
                "description": b.description, "access_level": b.access_level
            } for b in boards
        ],
        "error": None
    })

@router.post("/api/boards")
async def create_board(req: BoardCreate, db: AsyncSession = Depends(get_db), admin: User = Depends(admin_required)):
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

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
