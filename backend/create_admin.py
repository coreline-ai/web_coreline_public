import sys
import os
import asyncio
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
from datetime import datetime

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api._lib.db import get_db, engine
from api._lib.models import User
from api._lib.auth import pwd_context

async def create_admin():
    async with AsyncSession(engine) as session:
        print("🔍 Checking for admin user...")
        
        # Check if admin exists
        result = await session.execute(select(User).where(User.username == "admin"))
        admin = result.scalars().first()
        
        hashed_pw = pwd_context.hash("admin1234")
        
        if admin:
            print(f"👤 Found admin (ID: {admin.id}). Updating credentials and privileges...")
            admin.password = hashed_pw
            admin.is_admin = True
            admin.is_banned = False
            session.add(admin)
        else:
            print("⚠️ Admin not found. Creating new admin user...")
            admin = User(
                id=uuid4(),
                username="admin",
                email="admin@coreline.ai",
                nickname="관리자",
                password=hashed_pw,
                is_admin=True,
                is_banned=False,
                created_at=datetime.utcnow()
            )
            session.add(admin)

        # Check for testuser as well
        result = await session.execute(select(User).where(User.username == "testuser"))
        testuser = result.scalars().first()
        
        test_pw = pwd_context.hash("test1234")
        
        if testuser:
             print(f"👤 Found testuser (ID: {testuser.id}). Updating credentials...")
             testuser.password = test_pw
             session.add(testuser)
        else:
            print("Creating testuser...")
            testuser = User(
                id=uuid4(),
                username="testuser",
                email="test@coreline.ai",
                nickname="테스터",
                password=test_pw,
                is_admin=False,
                is_banned=False,
                created_at=datetime.utcnow()
            )
            session.add(testuser)

        await session.commit()
        print("✅ Admin and TestUser ensure complete.")
        print("  Admin: admin / admin1234")
        print("  User:  testuser / test1234")

if __name__ == "__main__":
    asyncio.run(create_admin())
