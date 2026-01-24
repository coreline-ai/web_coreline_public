from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api._lib.db import get_db
from api._lib.models import User
from api._lib.auth import verify_password, create_access_token
from api._lib.schemas import ResponseModel
from pydantic import BaseModel

router = APIRouter()

class TokenRequest(BaseModel):
    username_or_email: str
    password: str

@router.post("/api/auth/token")
async def login(req: TokenRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where((User.email == req.username_or_email) | (User.username == req.username_or_email)))
    user = result.scalars().first()
    
    if not user or not verify_password(req.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    if user.is_banned:
        raise HTTPException(status_code=403, detail="Your account is banned")
    
    # Update login stats
    user.login_count += 1
    from datetime import datetime
    user.last_login_at = datetime.utcnow()
    await db.commit()
    
    access_token, jti, expire = create_access_token(data={"sub": str(user.id)})
    
    return ResponseModel.success_res({
        "access_token": access_token,
        "token_type": "Bearer",
        "user": {
            "id": str(user.id),
            "nickname": user.nickname,
            "is_admin": user.is_admin
        }
    })

# Removed Vercel entry point from sub-module to avoid routing confusion
# All requests should flow through api/index.py
