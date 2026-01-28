import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from api._lib.models import Board
from api._lib.db import DATABASE_URL

async def check_boards():
    engine = create_async_engine(DATABASE_URL)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Board))
        boards = result.scalars().all()
        print("\n--- Current Boards and Access Levels ---")
        for b in boards:
            print(f"ID: {b.id} | Slug: {b.slug} | Access: {b.access_level} | Name: {b.name}")
        print("----------------------------------------\n")
    
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(check_boards())
