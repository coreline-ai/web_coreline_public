import sys
import os
import asyncio
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api._lib.db import get_db, engine
from api._lib.models import User
from api._lib.auth import pwd_context

async def fix_passwords():
    async with AsyncSession(engine) as session:
        print("🔍 Checking users...")
        
        # 1. Fix Admin
        result = await session.execute(select(User).where(User.username == "admin"))
        admin = result.scalars().first()
        if admin:
            print(f"👤 Found admin. Updating password...")
            admin.password = pwd_context.hash("admin1234")
            session.add(admin)
        else:
             print("⚠️ Admin not found.")

        # 2. Fix Test User
        result = await session.execute(select(User).where(User.username == "testuser"))
        user = result.scalars().first()
        if user:
            print(f"👤 Found testuser. Updating password...")
            user.password = pwd_context.hash("test1234")
            session.add(user)
        else:
            print("⚠️ Testuser not found.")
            
        await session.commit()
        print("✅ Passwords updated to Argon2 hashes.")

if __name__ == "__main__":
    asyncio.run(fix_passwords())
