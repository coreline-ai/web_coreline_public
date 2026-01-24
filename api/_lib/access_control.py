"""
Security utilities for access control
"""
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api._lib.models import Post, Board, User
from typing import Optional


async def check_board_access(
    board: Board, 
    current_user: Optional[User], 
    action: str = "access"
) -> None:
    """
    Check if user has access to the board based on access_level.
    Raises HTTPException if access denied.
    
    Args:
        board: The board to check access for
        current_user: The current user (None if not authenticated)
        action: Description of action for error message (e.g., "read", "write", "comment")
    """
    if board.access_level == 'ADMIN':
        if not current_user or not current_user.is_admin:
            raise HTTPException(
                status_code=403, 
                detail=f"This board is restricted to administrators. Cannot {action}."
            )
    elif board.access_level == 'AUTHENTICATED':
        if not current_user:
            raise HTTPException(
                status_code=401, 
                detail=f"Login required to {action} this board."
            )
    # PUBLIC boards allow all access


async def get_post_with_board_access_check(
    post_id: int, 
    db: AsyncSession, 
    current_user: Optional[User],
    action: str = "access"
) -> Post:
    """
    Get a post and verify the user has access to its board.
    Returns the post if access is granted.
    
    Args:
        post_id: The post ID to fetch
        db: Database session
        current_user: The current user (None if not authenticated)
        action: Description of action for error message
    
    Returns:
        Post object if found and access granted
        
    Raises:
        HTTPException 404 if post not found
        HTTPException 401/403 if access denied
    """
    post_result = await db.execute(select(Post).where(Post.id == post_id))
    post = post_result.scalars().first()
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Fetch board and check access
    board_result = await db.execute(select(Board).where(Board.id == post.board_id))
    board = board_result.scalars().first()
    
    if board:
        await check_board_access(board, current_user, action)
    
    return post
