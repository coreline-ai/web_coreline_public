from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt, JWTError
from api._lib.db import get_db
from api._lib.auth import (
    get_current_user, 
    revoke_token, 
    SECRET_KEY, 
    ALGORITHM
)
from api._lib.models import User
from api._lib.schemas import ResponseModel
from datetime import datetime

router = APIRouter()

@router.post("/api/py-auth/logout")
async def logout(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    로그아웃 - 현재 토큰을 블랙리스트에 추가하여 무효화합니다.
    """
    # Extract token from Authorization header
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    token = auth_header.split(" ")[1]
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        jti = payload.get("jti")
        exp = payload.get("exp")
        
        if not jti:
            # Old token without JTI - can't blacklist, but logout succeeds
            return ResponseModel.success_res({"message": "Logged out successfully"})
        
        # Convert exp timestamp to datetime
        expires_at = datetime.utcfromtimestamp(exp)
        
        # Add token to blacklist
        await revoke_token(
            jti=jti,
            user_id=current_user.id,
            expires_at=expires_at,
            reason="LOGOUT",
            db=db
        )
        
        return ResponseModel.success_res({"message": "Logged out successfully"})
        
    except JWTError as e:
        raise HTTPException(status_code=401, detail="Invalid token")

# Removed Vercel entry point from sub-module to avoid routing confusion
# All requests should flow through api/index.py
