import sys
import os
import asyncio
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

# Add project root to path
# We are in tests/, so project root is one level up (..)
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api._lib.db import get_db, engine
from api._lib.models import User
from api._lib.auth import verify_password, pwd_context

async def verify_login():
    async with AsyncSession(engine) as session:
        print("🔍 Login Verification Test")
        
        username = "admin"
        password = "admin1234"
        
        print(f"👉 Attempting login for: {username}")
        
        # 1. Check User Existence
        result = await session.execute(select(User).where((User.email == username) | (User.username == username)))
        user = result.scalars().first()
        
        if not user:
            print("❌ User not found in DB!")
            return

        print(f"✅ User found: {user.username} (ID: {user.id})")
        print(f"   Stored Hash: {user.password}")
        
        # 2. Check Password
        is_valid = verify_password(password, user.password)
        if is_valid:
            print("✅ Password verified successfully!")
        else:
            print("❌ Password verification FAILED.")
            print(f"   Input Password: {password}")
            
            # Debug: Try hashing input and comparing visually
            new_hash = pwd_context.hash(password)
            print(f"   New Hash of '{password}': {new_hash}")
            
            # Check if schemes match
            if user.password.startswith("$argon2"):
                print("   Stored hash identified as Argon2.")
            elif user.password.startswith("$2b$"):
                 print("   Stored hash identified as Bcrypt.")
            else:
                 print("   Stored hash format unknown.")

if __name__ == "__main__":
    asyncio.run(verify_login())
