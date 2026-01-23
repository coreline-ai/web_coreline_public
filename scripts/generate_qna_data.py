import os
import sys
import random
from datetime import datetime, timedelta

def load_env_vars():
    env_vars = {}
    try:
        # Load .env from project root (one level up)
        with open('.env') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    k, v = line.strip().split('=', 1)
                    env_vars[k] = v
    except Exception as e:
        print(f"Warning: Could not load .env: {e}")
    return env_vars

def generate_data():
    print("--- Generating Dummy Data for Project QnA Board ---")
    
    # Ensure script is run from project root or handles path correctly
    # We'll assume run from root like `python scripts/generate_qna_data.py`
    
    env = load_env_vars()
    db_url = env.get("DATABASE_URL", "")
    
    if not db_url:
        print("❌ DATABASE_URL not found in .env")
        return

    print(f"Connecting to DB...")
    
    try:
        from sqlalchemy import create_engine, text
    except ImportError:
        print("❌ SQLAlchemy not installed.")
        return
    
    try:
        engine = create_engine(db_url)
        with engine.connect() as conn:
            # 1. Get Board ID
            print("Finding 'CL_Project_QnA' board...")
            board_res = conn.execute(text("SELECT id FROM boards WHERE slug = 'CL_Project_QnA'")).fetchone()
            
            if not board_res:
                print("❌ Board 'CL_Project_QnA' not found. Please create it first.")
                return
            
            board_id = board_res[0]
            print(f"✅ Found Board ID: {board_id}")

            # 2. Get Categories
            print("Fetching categories...")
            cat_rows = conn.execute(text("SELECT id, name FROM board_categories WHERE board_id = :bid"), {"bid": board_id}).fetchall()
            
            if not cat_rows:
                print("❌ No categories found for this board.")
                return
            
            categories = [row[0] for row in cat_rows] # List of IDs
            print(f"✅ Found {len(categories)} categories")

            # 3. Get or Create Dummy User
            print("Finding a user to author posts...")
            user_res = conn.execute(text("SELECT id FROM users LIMIT 1")).fetchone()
            
            if not user_res:
                print("❌ No users found. Please register at least one user.")
                return
                
            user_id = user_res[0]
            print(f"✅ Using User ID: {user_id}")

            # 4. Generate 50 Posts
            print("Generating 50 posts...")
            
            titles = [
                "프로젝트 견적 문의드립니다.",
                "기술 지원 요청: API 연동 오류",
                "설치 과정에서 문제가 발생했습니다.",
                "기능 개선 제안합니다.",
                "라이선스 관련 질문입니다.",
                "데이터 마이그레이션 가이드가 있나요?",
                "서버 요구사항 문의",
                "보안 관련 체크리스트 요청",
                "커스터마이징 비용 견적 부탁드립니다.",
                "긴급: 서비스 접속 장애 제보"
            ]
            
            contents = [
                "안녕하세요, 현재 진행 중인 프로젝트에 Coreline 솔루션을 도입하고자 합니다. 자세한 견적서를 받아볼 수 있을까요?",
                "API 연동 중 401 에러가 지속적으로 발생합니다. 토큰 발급 절차를 다시 확인해 주실 수 있나요?",
                "매뉴얼대로 설치를 진행했으나, DB 연결 단계에서 타임아웃이 발생합니다. 로그 첨부합니다.",
                "현재 대시보드 UI에서 필터링 기능이 조금 더 세분화되었으면 좋겠습니다.",
                "엔터프라이즈 라이선스와 스탠다드 라이선스의 기능 차이를 명확히 알고 싶습니다.",
                "기존 시스템의 데이터를 이관하려고 하는데, 지원되는 포맷이 무엇인지 궁금합니다.",
                "권장 하드웨어 사양이 어떻게 되는지 확인 부탁드립니다.",
                "보안 감사를 앞두고 있습니다. 보안 관련 인증서나 체크리스트를 제공해 주실 수 있나요?",
                "기본 기능 외에 추가적인 모듈 개발이 가능한지, 가능하다면 비용 산정 기준이 궁금합니다.",
                "현재 접속이 간헐적으로 끊기는 현상이 있습니다. 확인 부탁드립니다."
            ]

            insert_sql = text("""
                INSERT INTO posts (title, content, user_id, board_id, category_id, is_notice, view_count, created_at, updated_at)
                VALUES (:title, :content, :uid, :bid, :cid, :notice, :views, :created_at, :updated_at)
            """)

            for i in range(50):
                title = f"{random.choice(titles)} ({i+1})"
                content = random.choice(contents)
                cat_id = random.choice(categories)
                view_count = random.randint(0, 100)
                is_notice = False
                
                # Random time in past 30 days
                days_ago = random.randint(0, 30)
                created_at = datetime.utcnow() - timedelta(days=days_ago, hours=random.randint(0, 23))
                
                conn.execute(insert_sql, {
                    "title": title,
                    "content": content,
                    "uid": user_id,
                    "bid": board_id,
                    "cid": cat_id,
                    "notice": is_notice,
                    "views": view_count,
                    "created_at": created_at,
                    "updated_at": created_at
                })
            
            conn.commit()
            print("✅ Successfully inserted 50 dummy posts.")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    generate_data()
