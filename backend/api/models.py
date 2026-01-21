from datetime import datetime
from typing import Optional, List
from uuid import UUID, uuid4
from sqlmodel import Field, SQLModel, Relationship
from enum import Enum

class AccessLevel(str, Enum):
    PUBLIC = "PUBLIC"
    AUTHENTICATED = "AUTHENTICATED"
    ADMIN = "ADMIN"

# --- Users ---
class User(SQLModel, table=True):
    __tablename__ = "users" # NextAuth default might be different, but we map manually
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    nickname: str = Field(unique=True, index=True)
    password: Optional[str] = None # Hashed
    is_admin: bool = Field(default=False)
    is_banned: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    posts: List["Post"] = Relationship(back_populates="author")
    comments: List["Comment"] = Relationship(back_populates="author")
    likes: List["Like"] = Relationship(back_populates="user")

# --- Boards ---
class Board(SQLModel, table=True):
    __tablename__ = "boards"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)
    slug: str = Field(unique=True, index=True)
    description: Optional[str] = None
    access_level: AccessLevel = Field(default=AccessLevel.PUBLIC)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    categories: List["Category"] = Relationship(back_populates="board")
    posts: List["Post"] = Relationship(back_populates="board")

# --- Categories ---
class Category(SQLModel, table=True):
    __tablename__ = "board_categories"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    board_id: int = Field(foreign_key="boards.id")
    
    board: Board = Relationship(back_populates="categories")
    posts: List["Post"] = Relationship(back_populates="category")

# --- Posts ---
class Post(SQLModel, table=True):
    __tablename__ = "posts"
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    content: str
    is_notice: bool = Field(default=False)
    view_count: int = Field(default=0)
    file_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user_id: UUID = Field(foreign_key="users.id")
    board_id: int = Field(foreign_key="boards.id")
    category_id: int = Field(foreign_key="board_categories.id")

    author: User = Relationship(back_populates="posts")
    board: Board = Relationship(back_populates="posts")
    category: Category = Relationship(back_populates="posts")
    comments: List["Comment"] = Relationship(back_populates="post")
    likes: List["Like"] = Relationship(back_populates="post")

# --- Comments ---
class Comment(SQLModel, table=True):
    __tablename__ = "comments"
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user_id: UUID = Field(foreign_key="users.id")
    post_id: int = Field(foreign_key="posts.id")

    author: User = Relationship(back_populates="comments")
    post: Post = Relationship(back_populates="comments")

# --- Likes ---
class Like(SQLModel, table=True):
    __tablename__ = "likes"
    user_id: UUID = Field(foreign_key="users.id", primary_key=True)
    post_id: int = Field(foreign_key="posts.id", primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # We can add relationships if needed, but for simple counting/checking, foreign keys are enough.
    # To be safe and consistent with other models:
    user: User = Relationship(back_populates="likes")
    post: Post = Relationship(back_populates="likes")

# --- Notifications ---
class Notification(SQLModel, table=True):
    __tablename__ = "notifications"
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id") # Recipient
    actor_id: UUID = Field(foreign_key="users.id") # Who triggered it
    post_id: Optional[int] = Field(foreign_key="posts.id", default=None)
    comment_id: Optional[int] = Field(foreign_key="comments.id", default=None)
    
    type: str # "COMMENT", "REPLY", "LIKE" ...
    is_read: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: User = Relationship(sa_relationship_kwargs={"primaryjoin": "Notification.user_id==User.id", "lazy": "joined"})
    actor: User = Relationship(sa_relationship_kwargs={"primaryjoin": "Notification.actor_id==User.id", "lazy": "joined"})
    post: Optional[Post] = Relationship() 

