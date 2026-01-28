import asyncio
import uuid
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text, select, insert
from datetime import datetime

# Database Connection
DATABASE_URL = "postgresql+asyncpg://hwanchoi@localhost/spectrum"

async def main():
    engine = create_async_engine(DATABASE_URL)
    
    async with engine.begin() as conn:
        print("1. Setting up test data...")
        
        # 1. Create Test Users
        user_a_id = uuid.uuid4()
        user_b_id = uuid.uuid4()
        
        await conn.execute(text("""
            INSERT INTO users (id, email, username, nickname, "emailVerified", is_admin, is_banned, login_count) 
            VALUES (:id, :email, :username, :nickname, :now, FALSE, FALSE, 0)
            ON CONFLICT (email) DO NOTHING
        """), [{"id": user_a_id, "email": "user_a@test.com", "username": "usera", "nickname": "UserA", "now": datetime.now()},
               {"id": user_b_id, "email": "user_b@test.com", "username": "userb", "nickname": "UserB", "now": datetime.now()}])
        
        # Get actual IDs (in case they already existed and UUIDs differed)
        user_a_id = (await conn.execute(text("SELECT id FROM users WHERE email='user_a@test.com'"))).scalar()
        user_b_id = (await conn.execute(text("SELECT id FROM users WHERE email='user_b@test.com'"))).scalar()
        
        print(f"   User A: {user_a_id}")
        print(f"   User B: {user_b_id}")

        # 2. Create Test Board & Category
        await conn.execute(text("""
            INSERT INTO boards (name, slug, access_level) 
            VALUES ('Notify Test Board', 'notify-test', 'PUBLIC')
            ON CONFLICT (slug) DO NOTHING
        """))
        board_id = (await conn.execute(text("SELECT id FROM boards WHERE slug='notify-test'"))).scalar()
        
        await conn.execute(text("""
            INSERT INTO board_categories (board_id, name) 
            VALUES (:board_id, 'General')
            ON CONFLICT DO NOTHING
        """), {"board_id": board_id})
        category_id = (await conn.execute(text("SELECT id FROM board_categories WHERE board_id=:board_id LIMIT 1"), {"board_id": board_id})).scalar()

        # 3. User B creates a Post
        print("2. User B creates a post...")
        post_id = (await conn.execute(text("""
            INSERT INTO posts (title, content, user_id, board_id, category_id, is_notice, view_count, created_at, updated_at)
            VALUES ('Test Post for Notifications', 'Content content', :user_id, :board_id, :cat_id, FALSE, 0, NOW(), NOW())
            RETURNING id
        """), {"user_id": user_b_id, "board_id": board_id, "cat_id": category_id})).scalar()
        print(f"   Post ID: {post_id}")

        # 4. User A Likes the Post -> Should trigger Notification?
        # Logic is usually in API: create_like -> create_notification using logic inside the route.
        # Since we are essentially testing the *System* logic, we should probably call the API logic if possible, 
        # BUT the user asked for a "validation script". 
        # If I just insert into DB, I'm testing nothing but my own insert script.
        # I need to verify if the APPLICATION LOGIC creates the notification.
        # However, calling FastAPI endpoints from a script is an integration test.
        # Let's try to invoke the notification creation logic or simulates the API call via 'httpx'.
        
        # Testing via HTTP Request to running server (Integration Test) is best.
        # It tests the full stack: API Route -> DB -> Notification Creation.
        pass

    await engine.dispose()
    
    # Part 2: Integration Test against the running server
    import httpx
    
    # We need tokens. This is hard without full auth flow.
    # ALTERNATIVE: We can temporarily implement a 'test_trigger' or just look at the code.
    # OR, we check if I can generate valid tokens. I have JWT_SECRET in .env?
    # Checking .env for JWT_SECRET...
    
    print("\n--- Switching to API Integration Test ---")
    # For now, let's just attempt to verify via 'httpx' if we can mocking the auth headers or if we have to use the DB to generate them.
    # Actually, the user wants "verification code".
    # Relying on the running server is risky if I can't auth easily.
    # BUT, I saw 'api/routers/posts.py' has the logic.
    # Creating a script that imports `create_like` and `create_comment` logic directly might be cleaner but requires mocking FastAPI Depends.
    
    # Let's stick to HTTPX if I can make tokens.
    # Can I forge a token? 
    # I saw `api/_lib/auth.py`? No, I haven't seen it yet.
    # I will assume I can't easily forge tokens without `jose` library or similar.
    
    # Let's look at `api/routers/posts.py` again? No, I can't view files.
    # "Don't use browser tool" implies using `run_command` with a script.
    
    # Let's try to use the `admin_test_888` credential since it's in the DB.
    # Or just use the script to INSERT the 'Like' and manually assert the notification logic? 
    # No, that modifies DB but doesn't test the 'Trigger'.
    # I MUST hit the API endpoint to test the trigger.
    
    # Okay, I will try to login via API first in the script.
    async with httpx.AsyncClient() as client:
        # 1. Login as User A (Actor)
        # Note: I created User A without password hash. I can't login.
        # I need to CREATE a user via API first? Or update their password hash to something known?
        # That's complicated.
        
        # Plan B: Direct Unit Test of the Logic function?
        # Too many dependencies.
        
        # Plan C: I will create a temporary endpoint in `api/index.py` that triggers the notification logic for testing?
        # No, editing code just for test is bad.
        
        # Plan D: Using the test script to:
        # 1. Create users with known passwords (via API Register if possible, or manual Hash insert).
        # 2. Login to get Token.
        # 3. Hit endpoints.
        
        # Let's try Registering via API in the script.
        base_url = "http://localhost:8000"
        
        # Register User A
        email_a = f"usera_{uuid.uuid4()}@test.com"
        await client.post(f"{base_url}/api/auth/register", json={
            "email": email_a,
            "username": f"user_a_{uuid.uuid4().hex[:8]}",
            "password": "password123",
            "nickname": f"NickA_{uuid.uuid4().hex[:8]}"
        })
        
        # Login User A
        resp_a = await client.post(f"{base_url}/api/auth/token", json={
            "username_or_email": email_a,
            "password": "password123"
        }) 
        
        if resp_a.status_code != 200:
            print(f"Failed to login User A: {resp_a.text}")
            return

        # Response wrapper: API returns { "success": True, "data": { "access_token": ... } }
        token_a = resp_a.json()["data"]["access_token"]
        headers_a = {"Authorization": f"Bearer {token_a}"}
        
        # Register User B
        email_b = f"userb_{uuid.uuid4()}@test.com"
        await client.post(f"{base_url}/api/auth/register", json={
            "email": email_b,
            "username": f"user_b_{uuid.uuid4().hex[:8]}",
            "password": "password123",
            "nickname": f"NickB_{uuid.uuid4().hex[:8]}"
        })
        
        resp_b = await client.post(f"{base_url}/api/auth/token", json={
            "username_or_email": email_b,
            "password": "password123"
        })
        token_b = resp_b.json()["data"]["access_token"]
        headers_b = {"Authorization": f"Bearer {token_b}"}
        
        print("Users registered and logged in.")
        
        # User B creates Board (if needed) & Post
        # User B needs to find a board. Ensure 'notify-test' exists via DB first (done above).
        
        # User B creates Post
        print("User B creating post...")
        post_resp = await client.post(f"{base_url}/api/posts", json={
            "title": "Notify Me",
            "content": "Please like this",
            "board_slug": "notify-test",
            "category_id": category_id
        }, headers=headers_b)
        
        if post_resp.status_code not in [200, 201]:
            print(f"Failed to create post: {post_resp.text}")
            return
            
        post_data = post_resp.json()["data"]
        post_real_id = post_data["id"]
        
        # User A Likes the Post
        print(f"User A liking post {post_real_id}...")
        like_resp = await client.post(f"{base_url}/api/posts/{post_real_id}/like", headers=headers_a)
        print(f"Like response: {like_resp.status_code}")
        
        # Check Notifications for User B
        print("Checking User B notifications...")
        notif_resp = await client.get(f"{base_url}/api/notifications", headers=headers_b)

        if notif_resp.status_code != 200:
             print(f"Failed to fetch notifications: {notif_resp.text}")
             return

        notifs_data = notif_resp.json()["data"]
        print(f"Notifications found: {len(notifs_data)}")
        
        found = False
        for n in notifs_data:
            # We look for a LIKE notification on this post
            # n['post'] is { id: ..., title: ... } or None
            if n.get("post") and n["post"]["id"] == post_real_id and n["type"] == "LIKE":
                print("SUCCESS: Notification found!")
                found = True
                break
        
        if not found:
            print("FAILURE: Notification not found in list.")
            print(f"List: {notifs_data}")

if __name__ == "__main__":
    asyncio.run(main())
