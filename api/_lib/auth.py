import os
import uuid as uuid_lib
from datetime import datetime, timedelta
from typing import Optional, Tuple
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete
from .db import get_db
from .models import User, TokenBlacklist

from .config import settings

# Configuration
SECRET_KEY = settings.jwt_secret

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Short-lived access token
REFRESH_TOKEN_EXPIRE_DAYS = 7     # Long-lived refresh token

# Switch to argon2 (modern, no 72 byte limit, no bcrypt incompatibility issues)
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> Tuple[str, str, datetime]:
    """
    Create an access token.
    Returns: (encoded_jwt, jti, expire_datetime)
    """
    to_encode = data.copy()
    jti = str(uuid_lib.uuid4())
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({
        "exp": expire,
        "jti": jti,
        "type": "access"
    })
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt, jti, expire

def create_refresh_token(data: dict, expires_delta: Optional[timedelta] = None) -> Tuple[str, str, datetime]:
    """
    Create a refresh token.
    Returns: (encoded_jwt, jti, expire_datetime)
    """
    to_encode = data.copy()
    jti = str(uuid_lib.uuid4())
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    
    to_encode.update({
        "exp": expire,
        "jti": jti,
        "type": "refresh"
    })
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt, jti, expire


async def is_token_blacklisted(jti: str, db: AsyncSession) -> bool:
    """Check if a token's JTI is in the blacklist."""
    result = await db.execute(
        select(TokenBlacklist).where(TokenBlacklist.jti == jti)
    )
    return result.scalars().first() is not None


async def revoke_token(
    jti: str, 
    user_id, 
    expires_at: datetime, 
    reason: str, 
    db: AsyncSession
) -> None:
    """Add a token to the blacklist."""
    blacklist_entry = TokenBlacklist(
        jti=jti,
        user_id=user_id,
        expires_at=expires_at,
        reason=reason
    )
    db.add(blacklist_entry)
    await db.commit()


async def cleanup_expired_blacklist(db: AsyncSession) -> int:
    """Remove expired entries from the blacklist to keep the table small."""
    result = await db.execute(
        delete(TokenBlacklist).where(TokenBlacklist.expires_at < datetime.utcnow())
    )
    await db.commit()
    return result.rowcount


async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        jti: str = payload.get("jti")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # Check if token is blacklisted (only if JTI exists - backward compatibility)
    if jti:
        if await is_token_blacklisted(jti, db):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been revoked",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if user is None:
        raise credentials_exception
    if user.is_banned:
        raise HTTPException(status_code=403, detail="Your account is banned")
    return user

async def admin_required(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return current_user

# Optional auth - returns None if not authenticated, no exception
oauth2_scheme_optional = OAuth2PasswordBearer(tokenUrl="api/auth/token", auto_error=False)

async def get_current_user_optional(token: Optional[str] = Depends(oauth2_scheme_optional), db: AsyncSession = Depends(get_db)) -> Optional[User]:
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        jti: str = payload.get("jti")
        if user_id is None:
            return None
        
        # Check blacklist for optional auth too
        if jti and await is_token_blacklisted(jti, db):
            return None
            
    except JWTError:
        return None
    
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if user is None or user.is_banned:
        return None
    return user
