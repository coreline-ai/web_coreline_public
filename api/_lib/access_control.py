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
    Special Rule: blog and research boards are ALWAYS PUBLIC for viewing/reading.
    """
    # 1. Special Case: Officialboards allow guest reading
    if board.slug in ['blog', 'research'] and action in ["view", "read"]:
        return

    # 2. Standard Access Level Checks
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


async def check_board_write_access(
    board: Board, 
    current_user: Optional[User]
) -> None:
    """
    Check if user has permission to write/modify content on the board.
    Special Rule: blog and research boards are ADMIN-ONLY for writing.
    Other boards follow access_level or standard authentication.
    """
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required to perform this action")

    # 1. Check Special Official Boards (blog, research) - STRICT ADMIN ONLY
    if board.slug in ['blog', 'research']:
        if not current_user.is_admin:
            raise HTTPException(
                status_code=403, 
                detail="Only administrators can post or modify content on the official blog/research boards."
            )
        return

    # 2. Check Standard ADMIN boards
    if board.access_level == 'ADMIN':
        if not current_user.is_admin:
            raise HTTPException(status_code=403, detail="Admin privileges required for this board")
        return

    # 3. PUBLIC or AUTHENTICATED boards allow any authenticated user to write
    return


async def get_post_with_board_access_check(
    post_id: int, 
    db: AsyncSession, 
    current_user: Optional[User],
    action: str = "access"
) -> Post:
    """
    Get a post and verify the user has access to its board.
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
