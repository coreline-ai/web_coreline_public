import asyncio
from api._lib.db import engine, Base
from api._lib.models import AuditLog

async def init_db():
    async with engine.begin() as conn:
        print("Creating new tables...")
        # This will create tables that don't exist yet (checkfirst=True by default)
        await conn.run_sync(Base.metadata.create_all)
        print("Tables created!")

if __name__ == "__main__":
    asyncio.run(init_db())
