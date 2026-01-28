
import asyncio
import os
import sys
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Add root to python path
sys.path.append(os.getcwd())

from api._lib.models import Post
from api._lib.ai import generate_summary
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    print("❌ DATABASE_URL not found")
    sys.exit(1)

# Async DB setup
engine = create_async_engine(DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://"))
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def backfill_summaries():
    print("🔄 Starting Summary Backfill...")
    async with SessionLocal() as db:
        # Fetch posts with Title/Content but NO summary
        result = await db.execute(select(Post).where(Post.summary == None).order_by(Post.id.desc()))
        posts = result.scalars().all()
        
        print(f"found {len(posts)} posts to summarize.")
        
        for post in posts:
            print(f"📝 Summarizing Post #{post.id}: {post.title}...")
            
            summary = generate_summary(f"Title: {post.title}\n\nContent: {post.content}")
            
            if summary:
                post.summary = summary
                db.add(post)
                await db.commit()
                print(f"✅ Saved summary for #{post.id}")
            else:
                print(f"⚠️ Failed to summarize #{post.id}")
                
            # Rate limit friendly pause
            await asyncio.sleep(1)

    print("🎉 Backfill Complete!")

if __name__ == "__main__":
    asyncio.run(backfill_summaries())
