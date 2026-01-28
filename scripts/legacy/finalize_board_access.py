import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from api._lib.models import Board
from api._lib.db import DATABASE_URL

async def revert_qna_access():
    engine = create_async_engine(DATABASE_URL)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as db:
        # All three special boards should be PUBLIC in DB to show up in lists
        # Specific content/write restrictions are handled in access_control.py
        result = await db.execute(select(Board).where(Board.slug.in_(['CL_Project_QnA', 'blog', 'research'])))
        boards = result.scalars().all()
        for b in boards:
            print(f"Setting {b.slug} to PUBLIC: {b.access_level} -> PUBLIC")
            b.access_level = "PUBLIC"
            
        await db.commit()
    
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(revert_qna_access())
