import sys
import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from api._lib.models import Board
from api._lib.db import get_db

# Mocking env since we are in script
import os
from dotenv import load_dotenv

load_dotenv()

async def list_boards():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("DATABASE_URL not found")
        return

    # Convert postgresql:// to postgresql+asyncpg:// if needed
    if db_url.startswith("postgresql://"):
        db_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)

    engine = create_async_engine(db_url)
    async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

    async with async_session() as session:
        result = await session.execute(select(Board))
        boards = result.scalars().all()
        
        print(f"{'ID':<5} {'Slug':<20} {'Name':<20} {'Access Level':<15}")
        print("-" * 60)
        for b in boards:
            print(f"{b.id:<5} {b.slug:<20} {b.name:<20} {b.access_level:<15}")

if __name__ == "__main__":
    asyncio.run(list_boards())
