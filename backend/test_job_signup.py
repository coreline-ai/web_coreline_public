import os
import sys
from sqlmodel import Session, select
from api.models import User
from api.database import engine
from api.utils import get_password_hash

# Add current directory to path
sys.path.append(os.getcwd())

def test_job_signup():
    print("--- Testing 'Job' related inputs ---")
    
    test_cases = [
        {"username": "job", "email": "job@test.com", "nickname": "Job"},
        {"username": "Job", "email": "Job@test.com", "nickname": "job"},
        {"username": "career", "email": "career@test.com", "nickname": "Career"},
        {"username": "recruit", "email": "recruit@test.com", "nickname": "Recruiter"},
        {"username": "직업", "email": "job_kr@test.com", "nickname": "직업데이터"}, # Korean "Job"
    ]
    
    with Session(engine) as session:
        for case in test_cases:
            print(f"\nTesting: {case}")
            
            # Check for existing
            statement = select(User).where(
                (User.email == case["email"]) | 
                (User.username == case["username"]) | 
                (User.nickname == case["nickname"])
            )
            existing = session.exec(statement).first()
            if existing:
                print(f"❌ COLLISION DETECTED for {case['username']}:")
                print(f"   Existing User: {existing.username}, {existing.email}, {existing.nickname}")
            else:
                print(f"✅ Pre-check Passed for {case['username']}. Attempting insert...")
                try:
                    user = User(
                        username=case["username"],
                        email=case["email"],
                        nickname=case["nickname"],
                        password=get_password_hash("password123"),
                        is_admin=False
                    )
                    session.add(user)
                    session.commit()
                    session.refresh(user)
                    print(f"✅ SUCCESS: Registered user {user.username} (ID: {user.id})")
                except Exception as e:
                    print(f"❌ INSERT FAILED for {case['username']}: {e}")
                    session.rollback()

if __name__ == "__main__":
    test_job_signup()
