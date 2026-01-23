import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

# Hardcoded from .env for simplicity in this script
DATABASE_URL = "postgresql+asyncpg://hwanchoi@localhost/spectrum"

async def main():
    engine = create_async_engine(DATABASE_URL)
    async with engine.begin() as conn:
        print("Connected. Updating user...")
        result = await conn.execute(text("UPDATE users SET is_admin = true WHERE email = 'admin_test_888@example.com'"))
        print(f"Update executed. Rows matched: {result.rowcount}")
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(main())
