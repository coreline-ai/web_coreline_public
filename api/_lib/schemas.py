from pydantic import BaseModel, ConfigDict
from typing import TypeVar, Generic, Optional, Any, List
from datetime import datetime
from uuid import UUID

T = TypeVar("T")

class ResponseModel(BaseModel):
    data: Optional[Any] = None
    error: Optional[str] = None
    success: bool = True

    @classmethod
    def success_res(cls, data: Any):
        return {"data": data, "success": True, "error": None}

    @classmethod
    def error_res(cls, message: str):
        return {"error": message, "success": False, "data": None}

# Explicit DTO Schemas
class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    username: str
    nickname: str
    email: str
    is_admin: bool
    is_banned: bool

class BoardSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    slug: str
    description: Optional[str]
    access_level: str

class CategorySchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    board_id: int
    name: str

class PostSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    content: str
    user_id: UUID
    board_id: int
    category_id: int
    file_url: Optional[str]
    is_notice: bool
    view_count: int
    created_at: datetime

class BoardDetailSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    board: BoardSchema
    categories: List[CategorySchema]
    notices: List[PostSchema]
    posts: List[PostSchema]
    pagination: dict
