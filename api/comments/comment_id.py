from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api._lib.db import get_db
from api._lib.models import Comment, User
from api._lib.auth import get_current_user
from api._lib.schemas import ResponseModel

router = APIRouter()

@router.delete("/api/comments/{comment_id}")
async def delete_comment(comment_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Comment).where(Comment.id == comment_id))
    comment = result.scalars().first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    # Ownership or Admin check
    if comment.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    await db.delete(comment)
    await db.commit()
    return ResponseModel.success_res({"message": "Comment deleted"})

# Vercel entry point
from fastapi import FastAPI
app = FastAPI()
app.include_router(router)
