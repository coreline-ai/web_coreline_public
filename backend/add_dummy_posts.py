import sys
import os
import asyncio
import random
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api._lib.db import get_db, engine
from api._lib.models import User, Board, BoardCategory, Post

async def add_dummy_posts():
    async with AsyncSession(engine, expire_on_commit=False) as session:
        print("🔍 Fetching boards and categories...")
        
        # Get Admin User for author
        result = await session.execute(select(User).where(User.username == "admin"))
        admin = result.scalars().first()
        if not admin:
            print("❌ Admin user not found. Run create_admin.py first.")
            return

        # Get Boards
        result = await session.execute(select(Board))
        boards = result.scalars().all()
        
        total_created = 0
        
        for board in boards:
            print(f"📌 Processing Board: {board.name} ({board.slug})")
            
            # Get Categories for this board
            cat_result = await session.execute(select(BoardCategory).where(BoardCategory.board_id == board.id))
            categories = cat_result.scalars().all()
            
            for category in categories:
                print(f"  📂 Category: {category.name}")
                
                # Check existing count to avoid over-seeding if run multiple times?
                # User asked to "add", so we just add 5 more even if some exist.
                
                for i in range(1, 6):
                    title = f"[{category.name}] {board.name} 더미 게시글 {i}"
                    content = f"""# {title}

이것은 **{board.name}** 게시판의 **{category.name}** 카테고리에 생성된 테스트용 더미 게시글입니다.

## 테스트 내용 {i}
- 생성 시간: {datetime.utcnow()}
- 작성자: {admin.nickname}
- 랜덤 데이터: {random.randint(100, 999)}

이 게시글은 시스템 검증 및 UI 테스트를 위해 자동 생성되었습니다."""
                    
                    post = Post(
                        title=title,
                        content=content,
                        user_id=admin.id,
                        board_id=board.id,
                        category_id=category.id,
                        is_notice=False,
                        view_count=random.randint(0, 100),
                        created_at=datetime.utcnow() - timedelta(days=random.randint(0, 30), hours=random.randint(0, 23)),
                         # Randomize creation time for realistic sorting
                    )
                    session.add(post)
                    total_created += 1
            
            await session.commit()
            
        print(f"\n✅ Created {total_created} dummy posts across all categories.")

if __name__ == "__main__":
    asyncio.run(add_dummy_posts())
