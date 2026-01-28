import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from api._lib.models import Board
from api._lib.db import DATABASE_URL

async def update_boards():
    engine = create_async_engine(DATABASE_URL)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as db:
        # 1. Update blog and research to PUBLIC as per previous requirement
        result = await db.execute(select(Board).where(Board.slug.in_(['blog', 'research', 'CL_Project_QnA'])))
        boards = result.scalars().all()
        
        for b in boards:
            print(f"Updating {b.slug}: {b.access_level} -> PUBLIC")
            b.access_level = "PUBLIC"
        
        await db.commit()
    
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(update_boards())
