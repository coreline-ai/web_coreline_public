
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

async def check_and_summarize():
    async with SessionLocal() as db:
        # Check Post 206
        p206 = await db.execute(select(Post).where(Post.id == 206))
        post_206 = p206.scalars().first()
        if post_206:
            print(f"🧐 Post #206: {post_206.title}")
            print(f"   Category ID: {post_206.category_id}")
            print(f"   Summary: {post_206.summary[:50] if post_206.summary else 'None'}...")
        else:
            print("⚠️ Post #206 not found (maybe ID changed?)")

        # Summarize Top 10 latest posts
        print("\n🚀 Summarizing Top 10 Latest Posts...")
        result = await db.execute(select(Post).order_by(Post.id.desc()).limit(10))
        posts = result.scalars().all()
        
        for post in posts:
            if post.summary and len(post.summary) > 10:
                print(f"✅ #{post.id} already has summary. Skipping.")
                continue

            print(f"📝 Summarizing #{post.id}: {post.title[:30]}...")
            summary = generate_summary(f"Title: {post.title}\n\nContent: {post.content}")
            
            if summary:
                post.summary = summary
                db.add(post)
                await db.commit()
                print(f"   Saved.")
            else:
                print(f"   ❌ Failed.")

if __name__ == "__main__":
    asyncio.run(check_and_summarize())
