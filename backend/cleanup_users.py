import os
import sys
from sqlmodel import Session, select, delete
from api.models import User
from api.database import engine

# Add current directory to path
sys.path.append(os.getcwd())

def clean_users():
    print("--- Cleaning up Test Users ---")
    
    targets = ["job", "Job", "career", "recruit", "직업", "testuser", "BrowserUser", "testuser_random"]
    # Keeping 'admin' only, or maybe keeping 'testuser'? 
    # User complained about collision, so let's delete potential collision sources.
    # But let's be careful not to delete 'admin' unless asked.
    
    # Actually, I'll delete the ones I just created + BrowserUser.
    # I will NOT delete 'testuser' yet unless user asks, as it is in seed.py.
    
    target_usernames = ["job", "Job", "career", "recruit", "직업", "BrowserUser", "user_"] # user_ prefix for random ones
    
    with Session(engine) as session:
        # Generic delete for specific list
        statement = select(User).where(
            (User.username.in_(["job", "Job", "career", "recruit", "직업", "BrowserUser"])) |
            (User.username.like("user_%"))
        )
        users = session.exec(statement).all()
        
        if not users:
            print("No test users found to clean.")
        
        for user in users:
            print(f"Deleting user: {user.username} (ID: {user.id})")
            session.delete(user)
            
        session.commit()
        print("✅ Cleanup complete.")
        
        # Show remaining users
        remaining = session.exec(select(User)).all()
        print(f"\nRemaining Users ({len(remaining)}):")
        for u in remaining:
            print(f" - {u.username} / {u.email} / {u.nickname}")

if __name__ == "__main__":
    clean_users()
