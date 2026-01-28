
import asyncio
import os
import sys
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

sys.path.append(os.getcwd())
from api._lib.models import Post
from api._lib.ai import generate_summary
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")
engine = create_async_engine(DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://"))
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def force_summarize():
    async with SessionLocal() as db:
        # Get latest post
        result = await db.execute(select(Post).order_by(Post.id.desc()).limit(1))
        post = result.scalars().first()
        
        if not post:
            print("No posts found.")
            return

        print(f"Post #{post.id}: {post.title}")
        print("Generating summary...")
        
        # Force regen even if exists
        summary = generate_summary(f"Title: {post.title}\n\nContent: {post.content}")
        
        if summary:
            print(f"Summary generated: {summary[:50]}...")
            post.summary = summary
            db.add(post)
            await db.commit()
            print("✅ Database updated.")
        else:
            print("❌ Failed to generate summary.")

if __name__ == "__main__":
    asyncio.run(force_summarize())
