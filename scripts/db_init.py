import asyncio
from api._lib.db import engine, Base
from api._lib.models import User, Board, BoardCategory, Post

async def init_db():
    print("Initializing database...")
    async with engine.begin() as conn:
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)
    
    print("Database initialized successfully.")

if __name__ == "__main__":
    asyncio.run(init_db())
