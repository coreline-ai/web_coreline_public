import os
import sys
import uuid
from sqlmodel import Session, select
from datetime import timedelta

# Add current directory to path
sys.path.append(os.getcwd())

from api.models import User
from api.database import engine
from api.utils import get_password_hash

def test_registration():
    print("--- Testing Real Registration Logic ---")
    
    # Generate random unique data to ensure NO collision
    random_id = str(uuid.uuid4())[:8]
    test_username = f"user_{random_id}"
    test_email = f"user_{random_id}@example.com"
    test_nickname = f"nick_{random_id}"
    test_password = "password123"
    
    print(f"Generated Test Data:\n Username: {test_username}\n Email: {test_email}\n Nickname: {test_nickname}")
    
    with Session(engine) as session:
        # 1. Simulate the check in api/routers/auth.py
        statement = select(User).where(
            (User.email == test_email) | (User.username == test_username) | (User.nickname == test_nickname)
        )
        existing_user = session.exec(statement).first()
        
        if existing_user:
            print("❌ PRE-CHECK FAILED: Logic thinks this random data already exists!")
            print(f"Existing user found: {existing_user}")
            return

        print("✅ Pre-check passed: No collision detected.")

        # 2. Simulate the insertion
        try:
            print("Attempting to insert new user...")
            db_user = User(
                username=test_username,
                email=test_email,
                nickname=test_nickname,
                password=get_password_hash(test_password),
                is_admin=False,
            )
            session.add(db_user)
            session.commit()
            session.refresh(db_user)
            print(f"✅ REGISTRATION SUCCESSFUL! Created User ID: {db_user.id}")
            
            # verify it's really there
            verify = session.get(User, db_user.id)
            if verify:
                print("✅ Verified user exists in DB.")
            else:
                print("❌ User lost after commit?")
                
        except Exception as e:
            print(f"❌ REGISTRATION EXCEPTION: {e}")
            session.rollback()

if __name__ == "__main__":
    test_registration()
