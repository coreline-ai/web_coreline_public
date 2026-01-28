import asyncio
import uuid
import httpx
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

DATABASE_URL = "postgresql+asyncpg://hwanchoi@localhost/spectrum"

async def main():
    engine = create_async_engine(DATABASE_URL)
    
    # 1. Create Admin User for API
    admin_email = f"admin_init_{uuid.uuid4().hex[:8]}@test.com"
    admin_pass = "password123"
    
    async with httpx.AsyncClient() as client:
        base_url = "http://localhost:8000"
        
        # Register
        print(f"1. Registering: {admin_email}")
        await client.post(f"{base_url}/api/auth/register", json={
            "email": admin_email,
            "username": f"admin_{uuid.uuid4().hex[:8]}",
            "password": admin_pass,
            "nickname": f"AdminInit_{uuid.uuid4().hex[:8]}"
        })
        
        # Promote
        async with engine.begin() as conn:
            print("2. Promoting to Admin...")
            await conn.execute(text("UPDATE users SET is_admin = TRUE WHERE email = :email"), {"email": admin_email})
        
        # Login
        print("3. Logging in...")
        resp = await client.post(f"{base_url}/api/auth/token", json={
            "username_or_email": admin_email,
            "password": admin_pass
        })
        token = resp.json().get("data", {}).get("access_token")
        
        if not token:
            print("Login failed")
            return

        headers = {"Authorization": f"Bearer {token}"}
        
        # Check if Board exists
        slug = "CL_Project_QnA"
        print(f"4. Checking board: {slug}...")
        
        # Create
        payload = {
            "name": "Project Q&A",
            "slug": slug,
            "description": "Project inquires and questions.",
            "access_level": "AUTHENTICATED", # Authorized only
            "categories": ["General", "Bug", "Feature Request"]
        }
        
        resp = await client.post(f"{base_url}/api/boards", json=payload, headers=headers)
        if resp.status_code == 201:
            print("   Created 'CL_Project_QnA' successfully.")
        elif resp.status_code == 400 and "already exists" in resp.text:
            print("   Board already exists (OK).")
        else:
            print(f"   Create failed: {resp.text}")
            
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(main())
