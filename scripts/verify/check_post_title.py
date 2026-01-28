"""
Script to check title of Post ID 10
Usage: python scripts/check_post_title.py
"""

import asyncio
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

NEON_URL = os.environ.get("NEON_DATABASE_URL")
if NEON_URL:
    os.environ["DATABASE_URL"] = NEON_URL

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

async def check_title():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL is not set")
        return

    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
        
    if "?" in database_url:
        base_url, params = database_url.split("?", 1)
        param_list = params.split("&")
        filtered_params = [p for p in param_list if not p.startswith("sslmode=") and not p.startswith("channel_binding=")]
        database_url = base_url + ("?" + "&".join(filtered_params) if filtered_params else "")

    engine = create_async_engine(database_url, echo=False, connect_args={"ssl": True}) # Assuming Prod

    try:
        async with engine.begin() as conn:
            result = await conn.execute(text("SELECT title FROM posts WHERE id = 10"))
            row = result.fetchone()
            if row:
                print(f"TITLE: {row[0]}")
            else:
                print("❌ Post ID 10 not found.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(check_title())
