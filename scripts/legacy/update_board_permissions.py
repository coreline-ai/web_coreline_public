import asyncio
from sqlalchemy import select, update
from api._lib.db import AsyncSessionLocal
from api._lib.models import Board

async def update_permissions():
    async with AsyncSessionLocal() as db:
        # Boards to update
        target_slugs = ['blog', 'research']
        
        print(f"Checking boards: {target_slugs}...")
        
        # Verify they exist
        result = await db.execute(select(Board).where(Board.slug.in_(target_slugs)))
        boards = result.scalars().all()
        
        for board in boards:
            print(f"Found board: {board.name} ({board.slug}) - Current Access Level: {board.access_level}")
            
            if board.access_level != 'ADMIN':
                print(f"Updating {board.slug} to ADMIN...")
                board.access_level = 'ADMIN'
            else:
                print(f"{board.slug} is already ADMIN.")
        
        if not boards:
            print("No target boards found!")
            return

        await db.commit()
        print("Update complete!")

if __name__ == "__main__":
    asyncio.run(update_permissions())
