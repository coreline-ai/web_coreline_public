from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from api._lib.db import get_db
from api._lib.models import User
from api._lib.auth import admin_required
from api._lib.schemas import ResponseModel

router = APIRouter()

@router.get("/api/admin/users")
async def list_users(
    page: int = 1, 
    limit: int = 20, 
    db: AsyncSession = Depends(get_db), 
    admin: User = Depends(admin_required)
):
    offset = (page - 1) * limit
    
    # List users
    result = await db.execute(select(User).order_by(User.created_at.desc()).offset(offset).limit(limit))
    users = result.scalars().all()
    
    # Total count
    count_result = await db.execute(select(func.count(User.id)))
    total_items = count_result.scalar()
    total_pages = (total_items + limit - 1) // limit
    
    return ResponseModel.success_res({
        "items": users,
        "pagination": {
            "current_page": page,
            "total_pages": total_pages,
            "total_items": total_items
        }
    })

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
