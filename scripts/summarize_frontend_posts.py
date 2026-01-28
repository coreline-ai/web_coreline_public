
import asyncio
import os
import sys
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

sys.path.append(os.getcwd())
from api._lib.models import Post, Board
from api._lib.ai import generate_summary
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")
engine = create_async_engine(DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://"))
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def summarize_board_posts(db, board_slug, limit=8):
    print(f"\n🔍 Processing Board: '{board_slug}' (Top {limit})")
    
    # 1. Get Board ID
    result = await db.execute(select(Board).where(Board.slug == board_slug))
    board = result.scalars().first()
    
    if not board:
        print(f"   ⚠️ Board '{board_slug}' not found.")
        return

    # 2. Get Top N Posts
    result = await db.execute(
        select(Post)
        .where(Post.board_id == board.id)
        .order_by(Post.id.desc())
        .limit(limit)
    )
    posts = result.scalars().all()
    
    if not posts:
        print("   ⚠️ No posts found.")
        return

    print(f"   Found {len(posts)} posts.")

    # 3. Summarize
    for post in posts:
        if post.summary and len(post.summary) > 10:
            print(f"   ✅ #{post.id} already has summary.")
            continue

        print(f"   📝 Summarizing #{post.id}: {post.title[:30]}...")
        summary = generate_summary(f"Title: {post.title}\n\nContent: {post.content}")
        
        if summary:
            post.summary = summary
            db.add(post)
            await db.commit()
            print(f"      Saved.")
        else:
            print(f"      ❌ Failed.")

async def main():
    async with SessionLocal() as db:
        await summarize_board_posts(db, 'blog', 8)
        await summarize_board_posts(db, 'research', 8)

if __name__ == "__main__":
    asyncio.run(main())
