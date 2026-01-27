"""
Script to seed a Markdown Style Test post from example_style.md
Usage: python scripts/seed_markdown_test.py
"""

import asyncio
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

# Read the markdown file
try:
    with open("example_style.md", "r", encoding="utf-8") as f:
        MARKDOWN_CONTENT = f.read()
except FileNotFoundError:
    print("❌ example_style.md not found.")
    sys.exit(1)

async def seed_markdown_post():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        # Default to local dev DB if not set
        # Try to read from .env if possible or assume default local postgres string if we knew it
        # But commonly we just use the loaded env.
        # Let's try to assume the user runs this with export $(cat .env...) or similar active env
        # Or just error out if not found.
        pass

    # If running nicely in the environment where uvicorn is running, DATABASE_URL might be set or in .env
    # Let's try to load .env manually if needed, but usually we run with `export...`
    
    if not database_url:
        print("❌ DATABASE_URL is not set. Please run with environment variables.")
        return

    # SSL handling (standard boilerplate)
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    if "?" in database_url:
        base_url, params = database_url.split("?", 1)
        param_list = params.split("&")
        filtered_params = [p for p in param_list if not p.startswith("sslmode=") and not p.startswith("channel_binding=")]
        database_url = base_url + ("?" + "&".join(filtered_params) if filtered_params else "")
    
    print(f"🔗 Connecting to database...")
    
    use_ssl = True
    if "localhost" in database_url or "127.0.0.1" in database_url:
        use_ssl = False
        print("⚠️  Localhost detected, disabling SSL")
    
    engine = create_async_engine(database_url, echo=False, connect_args={"ssl": use_ssl})
    
    try:
        async with engine.begin() as conn:
            # 1. Get Blog Board ID
            result = await conn.execute(text("SELECT id FROM boards WHERE slug = 'blog'"))
            board_row = result.fetchone()
            
            if not board_row:
                print("❌ 'blog' board not found.")
                return
            board_id = board_row[0]

            # 2. Get User
            result = await conn.execute(text("SELECT id FROM users LIMIT 1"))
            user_row = result.fetchone()
            if not user_row:
                print("❌ No users found.")
                return
            user_id = user_row[0]

            # 3. Get or Create 'Guide' Category
            cat_name = "Guide"
            result = await conn.execute(text("SELECT id FROM board_categories WHERE board_id = :board_id AND name = :name"), 
                                      {"board_id": board_id, "name": cat_name})
            cat_row = result.fetchone()
            if cat_row:
                cat_id = cat_row[0]
            else:
                result = await conn.execute(text("INSERT INTO board_categories (board_id, name) VALUES (:board_id, :name) RETURNING id"), 
                                          {"board_id": board_id, "name": cat_name})
                cat_id = result.fetchone()[0]

            # 4. Insert Post
            title = "Markdown Style Guide Preview"
            
            # Check if exists to avoid duplicates or just update
            result = await conn.execute(text("SELECT id FROM posts WHERE title = :title"), {"title": title})
            existing = result.fetchone()
            
            if existing:
                post_id = existing[0]
                await conn.execute(text("UPDATE posts SET content = :content WHERE id = :id"), 
                                 {"content": MARKDOWN_CONTENT, "id": post_id})
                print(f"✅ Updated existing post {post_id}")
            else:
                result = await conn.execute(text("""
                    INSERT INTO posts (title, content, user_id, board_id, category_id, is_notice, view_count) 
                    VALUES (:title, :content, :user_id, :board_id, :category_id, FALSE, 0)
                    RETURNING id
                """), {
                    "title": title,
                    "content": MARKDOWN_CONTENT,
                    "user_id": user_id,
                    "board_id": board_id,
                    "category_id": cat_id
                })
                post_id = result.fetchone()[0]
                print(f"✅ Created new post {post_id}")

    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(seed_markdown_post())
