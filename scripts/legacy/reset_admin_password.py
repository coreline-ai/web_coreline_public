import asyncio
import sys
import os

# Ensure we can import api
sys.path.append(os.getcwd())

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from api._lib.auth import get_password_hash

DATABASE_URL = "postgresql+asyncpg://hwanchoi@localhost/spectrum"

async def reset_admin():
    print("Connecting to database...")
    engine = create_async_engine(DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as session:
        print("Checking for user 'admin'...")
        result = await session.execute(text("SELECT id, username, email, password FROM users WHERE username = 'admin';"))
        user = result.fetchone()
        
        if not user:
            print("User 'admin' not found! Please check your database.")
            return

        print(f"Found user: {user.username} (Email: {user.email})")
        
        # Explicitly set password to 'admin1234' for clear testing
        password = "admin1234"
        hashed = get_password_hash(password)
        
        await session.execute(text("UPDATE users SET password = :hp WHERE username = 'admin'"), {"hp": hashed})
        await session.commit()
        print(f"Successfully reset 'admin' password to: {password}")

if __name__ == "__main__":
    asyncio.run(reset_admin())
