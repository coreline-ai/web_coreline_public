
import asyncio
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Override DATABASE_URL with Neon URL if available
NEON_URL = os.environ.get("NEON_DATABASE_URL")
if NEON_URL:
    os.environ["DATABASE_URL"] = NEON_URL
    print(f"✅ Using NEON_DATABASE_URL")

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

async def create_post_likes_table():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL is not set")
        return False
    
    # Handle SSL for asyncpg
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
            # Create post_likes table
            await conn.execute(text("""
                CREATE TABLE IF NOT EXISTS post_likes (
                    user_id UUID NOT NULL REFERENCES users(id),
                    post_id INTEGER NOT NULL REFERENCES posts(id),
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (user_id, post_id)
                )
            """))
            print("✅ Created table: post_likes (if it didn't exist)")
            
    except Exception as e:
        print(f"❌ Error creating table: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(create_post_likes_table())
