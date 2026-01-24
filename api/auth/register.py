from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api._lib.db import get_db
from api._lib.models import User
from api._lib.auth import get_password_hash, create_access_token
from api._lib.schemas import ResponseModel
from pydantic import BaseModel, EmailStr

router = APIRouter()

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    nickname: str
    password: str

@router.post("/api/py-auth/register")
async def register(req: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check if first user (make admin)
    result = await db.execute(select(User))
    first_user = result.scalars().first() is None
    
    # Check existing
    result = await db.execute(select(User).where((User.email == req.email) | (User.username == req.username) | (User.nickname == req.nickname)))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="User with this email, username or nickname already exists")
    
    new_user = User(
        username=req.username,
        email=req.email,
        nickname=req.nickname,
        password=get_password_hash(req.password),
        is_admin=first_user
    )
    
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    access_token, jti, expire = create_access_token(data={"sub": str(new_user.id)})
    
    from fastapi.responses import JSONResponse
    return JSONResponse(
        status_code=201,
        content={
            "success": True,
            "data": {
                "access_token": access_token,
                "token_type": "Bearer",
                "user": {
                    "id": str(new_user.id),
                    "nickname": new_user.nickname,
                    "is_admin": new_user.is_admin
                }
            },
            "error": None
        }
    )

# Removed Vercel entry point from sub-module to avoid routing confusion
# All requests should flow through api/index.py
