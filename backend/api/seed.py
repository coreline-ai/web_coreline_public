"""
Seed script to populate database with initial test data.
Run: python3 -m api.seed
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from datetime import datetime
from uuid import uuid4
import bcrypt
from sqlmodel import Session, select
from api.database import engine
from api.models import User, Board, Category, Post, AccessLevel

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def seed_database():
    with Session(engine) as session:
        # Check if data already exists
        existing_user = session.exec(select(User)).first()
        if existing_user:
            print("⚠️  Database already has data. Skipping seed.")
            return
        
        print("🌱 Seeding database...")
        
        # 1. Create Admin User
        admin = User(
            id=uuid4(),
            username="admin",
            email="admin@coreline.ai",
            nickname="관리자",
            password=hash_password("admin1234"),
            is_admin=True,
            is_banned=False,
            created_at=datetime.utcnow()
        )
        session.add(admin)
        session.commit()
        session.refresh(admin)
        print(f"✅ Created admin user: {admin.username}")
        
        # 2. Create Test User
        test_user = User(
            id=uuid4(),
            username="testuser",
            email="test@coreline.ai",
            nickname="테스터",
            password=hash_password("test1234"),
            is_admin=False,
            is_banned=False,
            created_at=datetime.utcnow()
        )
        session.add(test_user)
        session.commit()
        session.refresh(test_user)
        print(f"✅ Created test user: {test_user.username}")
        
        # 3. Create Boards
        boards_data = [
            {"name": "뉴스", "slug": "news", "description": "AI 및 기술 관련 뉴스", "access_level": AccessLevel.PUBLIC},
            {"name": "자유게시판", "slug": "free", "description": "자유롭게 소통하는 공간", "access_level": AccessLevel.AUTHENTICATED},
            {"name": "공지사항", "slug": "notice", "description": "중요 공지사항", "access_level": AccessLevel.PUBLIC},
            {"name": "연구/개발", "slug": "research", "description": "Coreline의 연구 및 기술 개발", "access_level": AccessLevel.PUBLIC},
        ]
        
        created_boards = {}
        for board_data in boards_data:
            board = Board(
                name=board_data["name"],
                slug=board_data["slug"],
                description=board_data["description"],
                access_level=board_data["access_level"],
                created_at=datetime.utcnow()
            )
            session.add(board)
            session.commit()
            session.refresh(board)
            created_boards[board.slug] = board
            print(f"✅ Created board: {board.name} (/{board.slug})")
        
        # 4. Create Categories for each board
        categories_data = {
            "news": ["AI 뉴스", "기술 동향", "산업 소식"],
            "free": ["일반", "질문", "정보공유"],
            "notice": ["공지", "업데이트", "이벤트"],
            "research": ["AI 연구", "의료 영상", "기술 자료"],
        }
        
        created_categories = {}
        for slug, cat_names in categories_data.items():
            board = created_boards[slug]
            created_categories[slug] = []
            for cat_name in cat_names:
                category = Category(
                    name=cat_name,
                    board_id=board.id
                )
                session.add(category)
                session.commit()
                session.refresh(category)
                created_categories[slug].append(category)
                print(f"  📁 Created category: {cat_name} in {board.name}")
        
        # 5. Create Sample Posts
        posts_data = [
            # News board posts
            {
                "board": "news",
                "category_idx": 0,
                "title": "GPT-5 출시 임박, AI 업계 지각변동 예고",
                "content": """# GPT-5 출시 소식

OpenAI가 차세대 AI 모델인 GPT-5의 출시를 앞두고 있습니다.

## 주요 특징
- 더욱 향상된 추론 능력
- 멀티모달 기능 강화
- 실시간 학습 지원

업계에서는 이번 발표가 AI 시장에 큰 영향을 미칠 것으로 전망하고 있습니다.""",
                "is_notice": False,
                "author": admin
            },
            {
                "board": "news",
                "category_idx": 1,
                "title": "2024년 AI 기술 트렌드 분석",
                "content": """# 2024년 AI 기술 트렌드

올해 주목해야 할 AI 기술 트렌드를 정리했습니다.

## 1. 생성형 AI의 진화
- 이미지, 영상, 음악 생성 기술의 고도화

## 2. AI 에이전트
- 자율적으로 작업을 수행하는 AI 시스템

## 3. 엣지 AI
- 로컬 디바이스에서의 AI 처리 확대""",
                "is_notice": False,
                "author": admin
            },
            {
                "board": "news",
                "category_idx": 2,
                "title": "글로벌 기업들의 AI 투자 확대",
                "content": """# AI 투자 동향

주요 글로벌 기업들이 AI 분야에 대규모 투자를 진행하고 있습니다.

- **Microsoft**: OpenAI에 100억 달러 추가 투자
- **Google**: Gemini 개발에 집중 투자
- **Amazon**: AWS AI 서비스 확장

국내 기업들도 AI 투자를 늘리고 있어 시장 경쟁이 치열해지고 있습니다.""",
                "is_notice": False,
                "author": admin
            },
            # Notice board
            {
                "board": "notice",
                "category_idx": 0,
                "title": "[공지] Coreline AI Studio 오픈 안내",
                "content": """# Coreline AI Engineering Studio 오픈

안녕하세요, Coreline입니다.

AI Engineering Studio가 정식 오픈하였습니다.

## 제공 서비스
- AI 솔루션 개발
- 웹/앱 개발
- 기술 컨설팅

많은 관심 부탁드립니다. 감사합니다.""",
                "is_notice": True,
                "author": admin
            },
            # Free board
            {
                "board": "free",
                "category_idx": 1,
                "title": "AI 개발 입문자 질문입니다",
                "content": """안녕하세요, AI 개발을 시작하려는 초보자입니다.

Python을 어느 정도 배운 상태인데, AI/ML을 시작하려면 어떤 순서로 공부하면 좋을까요?

추천 강의나 책이 있다면 알려주세요!""",
                "is_notice": False,
                "author": test_user
            },
        ]
        
        for post_data in posts_data:
            board = created_boards[post_data["board"]]
            category = created_categories[post_data["board"]][post_data["category_idx"]]
            
            post = Post(
                title=post_data["title"],
                content=post_data["content"],
                is_notice=post_data["is_notice"],
                view_count=0,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
                user_id=post_data["author"].id,
                board_id=board.id,
                category_id=category.id
            )
            session.add(post)
            session.commit()
            print(f"  📝 Created post: {post.title[:30]}...")
        
        print("\n🎉 Database seeding completed!")
        print("\n📋 Test Accounts:")
        print("  Admin: admin / admin1234")
        print("  User:  testuser / test1234")

if __name__ == "__main__":
    seed_database()
