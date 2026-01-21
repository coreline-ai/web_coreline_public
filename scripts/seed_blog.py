import asyncio
import random
from sqlalchemy.future import select
from api._lib.db import AsyncSessionLocal
from api._lib.models import Board, BoardCategory, Post, User

async def seed_blog_data():
    async with AsyncSessionLocal() as db:
        print("Starting blog seeding...")
        
        # 1. Ensure Blog Board
        result = await db.execute(select(Board).where(Board.slug == "blog"))
        blog_board = result.scalars().first()
        
        if not blog_board:
            print("Creating 'blog' board...")
            blog_board = Board(
                name="기술 블로그",
                slug="blog",
                description="Coreline 엔지니어링 팀이 공유하는 기술적 도전과 해결 과정",
                access_level="PUBLIC"
            )
            db.add(blog_board)
            await db.flush()
        else:
            print(f"Board 'blog' already exists with ID {blog_board.id}")

        # 2. Ensure Categories
        categories = ["프론트엔드", "백엔드", "인프라", "DevOps", "AI/ML"]
        category_objs = []
        for cat_name in categories:
            res = await db.execute(select(BoardCategory).where(
                (BoardCategory.board_id == blog_board.id) & 
                (BoardCategory.name == cat_name)
            ))
            cat = res.scalars().first()
            if not cat:
                cat = BoardCategory(board_id=blog_board.id, name=cat_name)
                db.add(cat)
                await db.flush()
            category_objs.append(cat)
            
        # 3. Get User (Author)
        user_res = await db.execute(select(User))
        user = user_res.scalars().first()
        if not user:
            print("No users found! Cannot create posts without an author.")
            return

        # 4. Create Dummy Posts
        titles = [
            "Next.js 15: 부분 사전 렌더링(PPR) 마스터하기",
            "벡터 데이터베이스를 10억 개의 임베딩으로 확장한 방법",
            "Zustand vs Jotai: 적합한 상태 관리자 선택하기",
            "API 디자인의 재고: LLM 시대의 GraphQL",
            "쿠버네티스 클러스터 비용 최적화 가이드",
            "React Server Components 동작 원리 심층 분석",
            "Rust로 다시 쓰는 고성능 백엔드 서비스",
            "AI 모델 서빙을 위한 GPU 인프라 구축기"
        ]
        
        existing_posts_res = await db.execute(select(Post).where(Post.board_id == blog_board.id))
        existing_count = len(existing_posts_res.scalars().all())
        
        if existing_count < len(titles):
            print(f"Creating {len(titles) - existing_count} posts...")
            for i, title in enumerate(titles):
                if i < existing_count: continue # Skip if we seemingly have enough, simplistic check
                
                cat = random.choice(category_objs)
                new_post = Post(
                    title=title,
                    content=f"이것은 '{title}'에 대한 더미 본문 내용입니다. 기술적인 깊이가 있는 글을 상상해 보세요.\n\n## 개요\n...내용...\n\n## 결론\n...",
                    user_id=user.id,
                    board_id=blog_board.id,
                    category_id=cat.id,
                    is_notice=False,
                    view_count=random.randint(100, 5000)
                )
                db.add(new_post)
        else:
            print("Posts already exist.")

        await db.commit()
        print("Blog seeding completed successfully.")

if __name__ == "__main__":
    asyncio.run(seed_blog_data())
