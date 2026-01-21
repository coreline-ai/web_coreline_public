from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from datetime import timedelta
from ..database import get_session
from ..models import User
from ..schemas import UserCreate, UserLogin, Token, UserRead
from ..utils import verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, session: Session = Depends(get_session)):
    # Check if user exists
    statement = select(User).where(
        (User.email == user_in.email) | (User.username == user_in.username) | (User.nickname == user_in.nickname)
    )
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email, username, or nickname already registered")

    # Check if this is the first user (assign admin)
    count_statement = select(User)
    user_count = len(session.exec(count_statement).all())
    is_admin = (user_count == 0)

    # Create user
    db_user = User(
        username=user_in.username,
        email=user_in.email,
        nickname=user_in.nickname,
        password=get_password_hash(user_in.password),
        is_admin=is_admin,
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    # Create Token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(db_user.username), "id": str(db_user.id), "is_admin": is_admin},
        expires_delta=access_token_expires
    )
    
    return Token(access_token=access_token, token_type="bearer", user=UserRead.model_validate(db_user))

@router.post("/token", response_model=Token)
def login_for_access_token(user_in: UserLogin, session: Session = Depends(get_session)):
    statement = select(User).where(
        (User.username == user_in.username_or_email) | (User.email == user_in.username_or_email)
    )
    user = session.exec(statement).first()
    
    if not user or not user.password or not verify_password(user_in.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if user.is_banned:
         raise HTTPException(status_code=403, detail="User is banned")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "id": str(user.id), "is_admin": user.is_admin},
        expires_delta=access_token_expires
    )
    
    return Token(access_token=access_token, token_type="bearer", user=UserRead.model_validate(user))
