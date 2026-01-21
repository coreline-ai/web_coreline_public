from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime

# --- Auth Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str
    user: "UserRead"

class TokenData(BaseModel):
    username: Optional[str] = None

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    nickname: str
    password: str

class UserLogin(BaseModel):
    username_or_email: str
    password: str

class UserRead(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    nickname: str
    is_admin: bool
    is_banned: bool
    model_config = ConfigDict(from_attributes=True)

# Forward reference for Token
Token.model_rebuild()

# --- Board Schemas ---
class CategoryRead(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)

class BoardRead(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str] = None
    access_level: str
    model_config = ConfigDict(from_attributes=True) 

class BoardCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    access_level: str = "PUBLIC"

# --- Post Schemas ---
class PostCreate(BaseModel):
    title: str
    content: str
    board_id: int
    category_id: int
    is_notice: bool = False
    file_url: Optional[str] = None

class PostRead(BaseModel):
    id: int
    title: str
    content: str
    is_notice: bool
    view_count: int
    file_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    author: UserRead
    board: BoardRead
    category: CategoryRead
    liked: Optional[bool] = False
    like_count: int = 0
    model_config = ConfigDict(from_attributes=True)

class PostList(BaseModel):
    id: int
    title: str
    is_notice: bool
    category: CategoryRead
    author: UserRead
    created_at: datetime
    view_count: int
    like_count: int = 0 # Future implementation
    model_config = ConfigDict(from_attributes=True)

class BoardDetail(BaseModel):
    board: BoardRead
    categories: list[CategoryRead]
    notices: list[PostList]
    posts: list[PostList]
    pagination: dict

# --- Comment Schemas ---
class CommentCreate(BaseModel):
    content: str
    post_id: int

class CommentRead(BaseModel):
    id: int
    content: str
    created_at: datetime
    author: UserRead
    post_id: int
    model_config = ConfigDict(from_attributes=True)

# --- Like Schemas ---
class LikeToggle(BaseModel):
    post_id: int
    liked: bool # True if liked, False if unliked
    like_count: int

# --- Notification Schemas ---
class NotificationRead(BaseModel):
    id: int
    user_id: UUID
    actor: UserRead
    type: str
    is_read: bool
    created_at: datetime
    post_id: Optional[int] = None
    comment_id: Optional[int] = None
    model_config = ConfigDict(from_attributes=True)
    # We might want to include partial post title etc. for UI, but let's start simple
