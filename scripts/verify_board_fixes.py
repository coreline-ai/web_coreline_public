import asyncio
import uuid
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from datetime import datetime
import httpx

# Database Connection
DATABASE_URL = "postgresql+asyncpg://hwanchoi@localhost/spectrum"

async def main():
    engine = create_async_engine(DATABASE_URL)
    
    # 1. Setup: Ensure an Admin User exists with known password
    admin_email = f"admin_fix_{uuid.uuid4().hex[:8]}@test.com"
    admin_pass = "password123"
    
    async with httpx.AsyncClient() as client:
        base_url = "http://localhost:8000"
        
        # 1. Register User (to get properly hashed password)
        print(f"1. Registering User: {admin_email}")
        reg_resp = await client.post(f"{base_url}/api/auth/register", json={
            "email": admin_email,
            "username": f"admin_{uuid.uuid4().hex[:8]}",
            "password": admin_pass,
            "nickname": f"AdminFix_{uuid.uuid4().hex[:8]}"
        })
        
        if reg_resp.status_code != 201 and reg_resp.status_code != 200:
             print(f"Registration Failed: {reg_resp.text}")
             return
        
        # 2. Promote to Admin via DB
        async with engine.begin() as conn:
            print(f"2. Promoting {admin_email} to Admin...")
            await conn.execute(text("UPDATE users SET is_admin = TRUE WHERE email = :email"), {"email": admin_email})
    
        # 3. Login
        print("3. Logging in as Admin...")
        resp = await client.post(f"{base_url}/api/auth/token", json={
            "username_or_email": admin_email,
            "password": admin_pass
        })
        
        if resp.status_code != 200:
            print(f"Login Failed: {resp.text}")
            return
            
        token = resp.json()["data"]["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        # Create Board with Categories
        print("3. Creating Board with Categories...")
        slug = f"fix-test-{uuid.uuid4().hex[:8]}"
        board_payload = {
            "name": f"Fix Test Board {uuid.uuid4().hex[:4]}",
            "slug": slug,
            "description": "Testing fixes",
            "access_level": "PUBLIC",
            "categories": ["Category A", "Category B", "Category C"]
        }
        
        resp = await client.post(f"{base_url}/api/boards", json=board_payload, headers=headers)
        if resp.status_code != 201:
            print(f"Create Board Failed: {resp.text}")
            return
        
        board_id = resp.json()["data"]["id"]
        print(f"   Board Created: {board_id}")
        
        # Verify Categories
        print("4. Verifying Categories...")
        cat_resp = await client.get(f"{base_url}/api/boards/{slug}/categories")
        cats = cat_resp.json()["data"]
        cat_names = sorted([c["name"] for c in cats])
        print(f"   Categories found: {cat_names}")
        
        expected = ["Category A", "Category B", "Category C"]
        if cat_names != expected:
            print(f"FAILURE: Categories mismatch. Expected {expected}, got {cat_names}")
            return
        else:
            print("SUCCESS: Categories match.")
            
        # Update Board
        print("5. Updating Board...")
        update_payload = {
            "name": f"Updated Name {uuid.uuid4().hex[:4]}",
            "description": "Updated Description"
        }
        resp = await client.put(f"{base_url}/api/boards/{slug}", json=update_payload, headers=headers)
        
        if resp.status_code != 200:
             print(f"Update Board Failed: {resp.text}")
             return
             
        updated_data = resp.json()["data"]
        print(f"   Updated Name: {updated_data['name']}")
        
        if updated_data["name"] == update_payload["name"] and updated_data["description"] == "Updated Description":
            print("SUCCESS: Board Updated.")
        else:
            print("FAILURE: Update mismatch.")
            
        # Cleanup
        print("6. Cleaning up...")
        await client.delete(f"{base_url}/api/boards/{slug}", headers=headers)
        print("   Board Deleted.")

if __name__ == "__main__":
    asyncio.run(main())
