"""
Script to create the missing token_blacklist table.
Usage: python scripts/fix_token_blacklist.py
"""

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


async def create_token_blacklist_table():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL is not set")
        return False
    
    # Handle SSL for asyncpg
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    # Remove sslmode query params locally for consistent handling
    if "?" in database_url:
        base_url, params = database_url.split("?", 1)
        param_list = params.split("&")
        filtered_params = [p for p in param_list if not p.startswith("sslmode=") and not p.startswith("channel_binding=")]
        database_url = base_url + ("?" + "&".join(filtered_params) if filtered_params else "")
    
    print(f"🔗 Connecting to database...")
    
    # Determine if we should use SSL
    # If connection is to localhost, disable SSL
    use_ssl = True
    if "localhost" in database_url or "127.0.0.1" in database_url:
        use_ssl = False
        print("⚠️  Localhost detected, disabling SSL")
    
    engine = create_async_engine(database_url, echo=False, connect_args={"ssl": use_ssl})
    
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS token_blacklist (
        id SERIAL PRIMARY KEY,
        jti VARCHAR(36) UNIQUE NOT NULL,
        user_id UUID NOT NULL REFERENCES users(id),
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        revoked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        reason VARCHAR(50)
    )
    """
    
    create_index_sql = """
    CREATE INDEX IF NOT EXISTS ix_token_blacklist_jti ON token_blacklist (jti)
    """
    
    try:
        async with engine.begin() as conn:
            await conn.execute(text(create_table_sql))
            print("✅ Created 'token_blacklist' table.")
            await conn.execute(text(create_index_sql))
            print("✅ Created index for 'token_blacklist'.")
    except Exception as e:
        print(f"❌ Error creating table: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(create_token_blacklist_table())
