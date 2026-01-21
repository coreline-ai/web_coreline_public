import os
import sys
from sqlmodel import Session, select, create_engine
from dotenv import load_dotenv

# Add current directory to path so we can import api modules
sys.path.append(os.getcwd())

from api.models import User
from api.database import engine

def debug_users():
    print("--- Debugging User Registration ---")
    
    with Session(engine) as session:
        # 1. List all existing users
        users = session.exec(select(User)).all()
        print(f"Total Users found: {len(users)}")
        for i, user in enumerate(users):
            print(f"[{i+1}] Username: {user.username}, Email: {user.email}, Nickname: {user.nickname}")

        print("\n--- Testing Collision Logic ---")
        
        # Define the user data we want to test (Simulating a signup attempt)
        # You can change these values to what you are trying to use
        test_username = "testuser"
        test_email = "test@example.com"
        test_nickname = "Tester"
        
        print(f"Attempting to check collision for: Username={test_username}, Email={test_email}, Nickname={test_nickname}")

        # Check collisions individually
        username_collision = session.exec(select(User).where(User.username == test_username)).first()
        email_collision = session.exec(select(User).where(User.email == test_email)).first()
        nickname_collision = session.exec(select(User).where(User.nickname == test_nickname)).first()

        conflicts = []
        if username_collision:
            conflicts.append(f"Username '{test_username}' is taken by user ID {username_collision.id}")
        if email_collision:
            conflicts.append(f"Email '{test_email}' is taken by user ID {email_collision.id}")
        if nickname_collision:
            conflicts.append(f"Nickname '{test_nickname}' is taken by user ID {nickname_collision.id}")

        if conflicts:
            print("\n❌ REGISTRATION WOULD FAIL. Reasons:")
            for c in conflicts:
                print(f" - {c}")
        else:
            print("\n✅ No collisions found. This user data should be registerable.")

if __name__ == "__main__":
    debug_users()
