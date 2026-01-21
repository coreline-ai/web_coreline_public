import os
import sys
from sqlmodel import Session, select
from api.models import User
from api.database import engine

def test_case_sensitivity():
    print("--- Testing Case Frequency ---")
    
    # We know 'testuser' exists (lowercase)
    # Let's try 'TestUser' (CamelCase)
    target_username = "TestUser"
    target_email = "Test@Example.com" # 'test@coreline.ai' exists
    
    print(f"Existing User in DB: 'testuser'")
    print(f"Testing collision against: '{target_username}'")
    
    with Session(engine) as session:
        # Check Username
        stmt_user = select(User).where(User.username == target_username)
        match_user = session.exec(stmt_user).first()
        
        if match_user:
            print(f"❌ COLLISION FOUND for '{target_username}': Case INSENSITIVE (or exact match if seeded that way).")
        else:
            print(f"✅ NO collision for '{target_username}': Case SENSITIVE.")
            
        # Check Email (test@coreline.ai exists)
        target_email = "TEST@coreline.ai"
        stmt_email = select(User).where(User.email == target_email)
        match_email = session.exec(stmt_email).first()
        
        if match_email:
             print(f"❌ COLLISION FOUND for '{target_email}': Case INSENSITIVE.")
        else:
             print(f"✅ NO collision for '{target_email}': Case SENSITIVE.")

if __name__ == "__main__":
    test_case_sensitivity()
