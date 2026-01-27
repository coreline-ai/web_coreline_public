"""
Script to seed QnA posts.
Usage: python scripts/seed_qna_posts.py
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
import uuid

QNA_POSTS = [
    {
        "title": "데이터 마이그레이션 가이드가 있나요?",
        "content": "<p>현재 타사 DB를 사용 중인데 코어라인 솔루션으로 데이터를 이전하려고 합니다. 데이터 매핑 가이드나 마이그레이션 도구를 지원해주시는지 궁금합니다.</p>",
        "category": "QnA"
    },
    {
        "title": "헬스케어 AI 솔루션 도입 예상 비용 문의",
        "content": "<p>병원 내 영상 의학과 PACS 시스템에 연동할 AI 분석 모듈 도입을 검토 중입니다. 서버 구축형(On-premise) 기준으로 대략적인 견적 범위를 알고 싶습니다.</p>",
        "category": "견적"
    },
    {
        "title": "PoC 진행 기간이 보통 얼마나 걸리나요?",
        "content": "<p>계약 전 기술 검증(PoC)을 진행하고 싶은데, 통상적으로 소요되는 기간과 필요한 리소스(저희 쪽에서 줘야 할 데이터 등)가 궁금합니다.</p>",
        "category": "일정관련"
    },
    {
        "title": "On-premise 설치 지원 여부",
        "content": "<p>보안상의 이유로 클라우드가 아닌 사내 폐쇄망 환경에 설치해야 합니다. 인터넷 연결이 없는 상태에서도 라이선스 인증 및 사용이 가능한가요?</p>",
        "category": "QnA"
    },
    {
        "title": "SaaS 구독형 라이선스 가격 정책 문의",
        "content": "<p>초기 구축 비용 부담을 줄이기 위해 월/연 단위 구독 모델을 찾고 있습니다. 사용자 수(Seat) 기준인지, 사용량(API Call) 기준인지 과금 정책을 알려주세요.</p>",
        "category": "견적"
    },
    {
        "title": "3월 프로젝트 착수 가능 여부 확인",
        "content": "<p>내년 3월 초에 차세대 시스템 구축 프로젝트 킥오프 예정입니다. 현재 개발팀 리소스 일정상 3월 투입이 가능한지 확인 부탁드립니다.</p>",
        "category": "일정관련"
    },
    {
        "title": "API 연동 문서 제공 받을 수 있나요?",
        "content": "<p>저희 사내 포털 시스템과 연동하기 위해 REST API 명세서가 필요합니다. Swagger나 Redoc 같은 문서가 제공되는지, 테스트 환경(Sandbox)이 있는지 궁금합니다.</p>",
        "category": "QnA"
    },
    {
        "title": "대용량 트래픽 처리를 위한 서버 증설 견적",
        "content": "<p>하루 평균 10만 건 이상의 이미지를 처리해야 할 것으로 예상됩니다. 이를 소화하기 위한 GPU 서버 스펙 추천과 추가 라이선스 비용 견적을 요청드립니다.</p>",
        "category": "견적"
    },
    {
        "title": "유지보수 계약 갱신 시점 문의",
        "content": "<p>기존 프로젝트의 무상 유지보수 기간이 곧 만료됩니다. 유상 전환 시 계약 갱신은 언제부터 논의해야 하는지, 요율은 어떻게 되는지 문의드립니다.</p>",
        "category": "일정관련"
    },
    {
        "title": "기술 지원 응답 시간 SLA 기준이 궁금합니다.",
        "content": "<p>장애 발생 시 대응 프로세스가 궁금합니다. Critical/Major/Minor 등급별 응답 시간과 조치 완료 목표 시간(SLA)이 계약서에 명시되나요?</p>",
        "category": "QnA"
    }
]

async def seed_qna_posts():
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
            # 1. Get QnA Board ID
            result = await conn.execute(text("SELECT id FROM boards WHERE slug = 'CL_Project_QnA'"))
            board_row = result.fetchone()
            
            if not board_row:
                print("❌ 'CL_Project_QnA' board not found. Please run migration script first.")
                # Fallback create
                result = await conn.execute(text("""
                    INSERT INTO boards (name, slug, description, access_level)
                    VALUES ('프로젝트 기술지원 QnA', 'CL_Project_QnA', '코어라인 프로젝트 진행 관련 문답 고객 게시판', 'PUBLIC')
                    RETURNING id
                """))
                board_id = result.fetchone()[0]
                print(f"   Created Board 'CL_Project_QnA' (ID: {board_id})")
            else:
                board_id = board_row[0]
                print(f"✅ Found Board 'CL_Project_QnA' (ID: {board_id})")

            # 2. Get User ID (Admin or any user)
            result = await conn.execute(text("SELECT id FROM users ORDER BY is_admin DESC, created_at ASC LIMIT 1"))
            user_row = result.fetchone()
            
            if not user_row:
                print("❌ No users found. Please create an admin user first.")
                return

            user_id = user_row[0]
            print(f"✅ Found User for Author (ID: {user_id})")

            # 3. Insert Posts
            print(f"📦 Inserting {len(QNA_POSTS)} QnA posts...")
            
            for post in QNA_POSTS:
                # Find or Create Category
                cat_name = post["category"]
                result = await conn.execute(text("SELECT id FROM board_categories WHERE board_id = :board_id AND name = :name"), {"board_id": board_id, "name": cat_name})
                cat_row = result.fetchone()
                
                if cat_row:
                    cat_id = cat_row[0]
                else:
                    # Create Category
                    result = await conn.execute(text("""
                        INSERT INTO board_categories (board_id, name) VALUES (:board_id, :name) RETURNING id
                    """), {"board_id": board_id, "name": cat_name})
                    cat_id = result.fetchone()[0]
                    print(f"   Created Category '{cat_name}'")

                # Insert Post
                await conn.execute(text("""
                    INSERT INTO posts (title, content, user_id, board_id, category_id, is_notice, view_count)
                    VALUES (:title, :content, :user_id, :board_id, :category_id, FALSE, :view_count)
                """), {
                    "title": post["title"],
                    "content": post["content"],
                    "user_id": user_id,
                    "board_id": board_id,
                    "category_id": cat_id,
                    "view_count": 0 # Initial view count
                })
                print(f"   ✅ Added post: {post['title']}")

    except Exception as e:
        print(f"❌ Error seeding data: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(seed_qna_posts())
