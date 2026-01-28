from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime
from jose import jwt, JWTError
from api._lib.db import get_db
from api._lib.models import User
from api._lib.auth import (
    create_access_token, 
    create_refresh_token, 
    is_token_blacklisted, 
    revoke_token,
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from api._lib.schemas import ResponseModel
from pydantic import BaseModel

router = APIRouter()

class RefreshRequest(BaseModel):
    refresh_token: str

@router.post("/api/py-auth/refresh")
async def refresh_token_endpoint(req: RefreshRequest, db: AsyncSession = Depends(get_db)):
    """
    Refresh Access Token using Refresh Token.
    Implements Refresh Token Rotation:
    - Verifies old refresh token
    - Blacklists old refresh token (prevent reuse)
    - Issues NEW pair (Access + Refresh)
    """
    try:
        payload = jwt.decode(req.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        jti: str = payload.get("jti")
        token_type: str = payload.get("type", "access")  # Legacy support or check
        
        if user_id is None or jti is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
            
        if token_type != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
            
        # Check blacklist (Reuse Detection)
        if await is_token_blacklisted(jti, db):
            # Security Alert: Reuse Attempted!
            # Could trigger alert here. For now, just deny.
            raise HTTPException(status_code=401, detail="Token revoked")
            
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
        
    # Verify User still exists and active
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user or user.is_banned:
        raise HTTPException(status_code=401, detail="User not found or banned")
        
    # Rotate Token: Blacklist the used refresh token
    # Calculate remaining life of old token for blacklist expiry, or just use default long expiry
    # Ideally blacklist expiry = token expiry.
    exp_timestamp = payload.get("exp")
    expires_at = datetime.fromtimestamp(exp_timestamp)
    
    await revoke_token(
        jti=jti,
        user_id=user_id,
        expires_at=expires_at,
        reason="Refresh Rotation",
        db=db
    )
    
    # Issue NEW pair
    new_access_token, _, _ = create_access_token(data={"sub": str(user.id)})
    new_refresh_token, _, _ = create_refresh_token(data={"sub": str(user.id)})
    
    return ResponseModel.success_res({
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "Bearer"
    })
