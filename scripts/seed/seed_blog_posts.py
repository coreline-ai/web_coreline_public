"""
Script to seed technical blog posts.
Usage: python scripts/seed_blog_posts.py
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

BLOG_POSTS = [
    {
        "title": "AI 모델 최적화: 양자화(Quantization) 기법의 실제",
        "content": "<p>딥러닝 모델의 크기가 커짐에 따라 추론 속도와 메모리 효율성을 개선하기 위한 양자화 기법이 필수적이 되고 있습니다. 본 글에서는 PyTorch와 ONNX Runtime을 활용한 동적/정적 양자화 적용 방법과 성능 벤치마킹 결과를 공유합니다. 특히 Edge Device 배포 시 고려해야 할 점들을 중점적으로 다룹니다.</p><p>양자화는 모델의 파라미터를 FP32에서 INT8 등으로 줄여 연산량을 감소시키지만, 정확도 손실이 발생할 수 있습니다. 이를 최소화하기 위해 QAT(Quantization Aware Training)를 적용하는 과정도 함께 살펴봅니다.</p>",
        "category": "Technology"
    },
    {
        "title": "Next.js 14와 React Server Component 활용 사례",
        "content": "<p>Next.js 14 App Router의 도입으로 프론트엔드 아키텍처에 큰 변화가 생겼습니다. 서버 컴포넌트(Server Components)를 활용하여 번들 사이즈를 줄이고, 초기 로딩 속도(FCP)를 획기적으로 개선한 코어라인의 실제 도입 사례를 소개합니다.</p><p>기존 클라이언트 사이드 데이터 페칭(CSR)을 서버 사이드로 옮기면서 발생한 워터폴 문제 해결법과, Streaming SSR을 통한 UX 개선 경험을 나눕니다.</p>",
        "category": "Technology"
    },
    {
        "title": "FastAPI를 이용한 고성능 MSA 구축기",
        "content": "<p>Python의 비동기 웹 프레임워크인 FastAPI는 높은 성능과 개발 편의성을 제공합니다. 우리는 기존 모놀리식 구조를 FastAPI 기반의 마이크로서비스 아키텍처(MSA)로 전환하며, gRPC 통신과 Event-Driven 설계를 도입했습니다.</p><p>이 과정에서 겪은 데이터 일관성 문제(Saga Pattern)와 트랜잭션 관리, 그리고 서비스 디스커버리 구축 노하우를 상세히 정리했습니다.</p>",
        "category": "Technology"
    },
    {
        "title": "Vector DB(Pinecone)를 활용한 RAG 파이프라인 설계",
        "content": "<p>LLM의 환각(Hallucination) 현상을 줄이고 최신 정보를 반영하기 위해 RAG(Retrieval-Augmented Generation) 시스템을 구축했습니다. Pinecone 벡터 데이터베이스를 활용한 효율적인 문서 임베딩 저장 및 검색 전략을 소개합니다.</p><p>LangChain을 이용한 체인 구성부터, 하이브리드 검색(Hybrid Search)을 통한 검색 정확도 향상 기법까지 실무적인 팁들을 포함하고 있습니다.</p>",
        "category": "Technology"
    },
    {
        "title": "Kubernetes 기반의 ML 모델 배포 전략 (MLOps)",
        "content": "<p>개발된 ML 모델을 안정적으로 운영하기 위해 Kubernetes(K8s) 환경에서의 배포 파이프라인을 구축했습니다. ArgoCD를 활용한 GitOps 방식의 배포 자동화(CI/CD)와 Kserve를 이용한 모델 서빙 아키텍처를 설명합니다.</p><p>또한, 모델의 리소스 사용량을 모니터링하고 Auto-scaling을 적용하여 트래픽 변화에 유연하게 대응하는 인프라 구축 과정을 다룹니다.</p>",
        "category": "Technology"
    },
    {
        "title": "대규모 트래픽 처리를 위한 Kafka 도입과 운영 노하우",
        "content": "<p>실시간으로 쏟아지는 로그 데이터와 이벤트 처리를 위해 Apache Kafka를 메시지 브로커로 도입했습니다. 파티션 전략 수립부터 컨슈머 그룹(Consumer Group) 관리를 통한 처리량 증대 방법을 공유합니다.</p><p>특히 데이터 무결성을 보장하기 위한 Exactly-Once Semantics 설정과, Kafka Lag 모니터링을 통한 장애 예방 사례를 중점적으로 이야기합니다.</p>",
        "category": "Technology"
    },
    {
        "title": "모던 프론트엔드 상태 관리: Zustand vs Recoil",
        "content": "<p>복잡해지는 클라이언트 상태 관리를 위해 Redux를 대체할 경량화 라이브러리를 검토했습니다. Zustand와 Recoil의 장단점을 비교 분석하고, 우리 팀이 Zustand를 최종 선택하게 된 이유와 마이그레이션 과정을 소개합니다.</p><p>불필요한 리렌더링을 방지하기 위한 Selector 활용법과 미들웨어를 통한 상태 영속성(Persistence) 처리 방법도 함께 알아봅니다.</p>",
        "category": "Technology"
    },
    {
        "title": "LLM 파인튜닝(Fine-tuning)을 통한 도메인 특화 모델 만들기",
        "content": "<p>오픈소스 LLM(Llama 3, Mistral)을 활용하여 특정 도메인(의료, 법률 등)에 특화된 모델을 만드는 파인튜닝 과정을 소개합니다. LoRA(Low-Rank Adaptation) 기법을 사용하여 적은 리소스로 효율적인 학습을 진행한 실험 결과를 공유합니다.</p><p>데이터셋 전처리 방법부터 학습 하이퍼파라미터 튜닝, 그리고 최종 모델의 정량적/정성적 평가 방법론을 상세히 다룹니다.</p>",
        "category": "Technology"
    }
]

async def seed_blog_posts():
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
            # 1. Get Blog Board ID
            result = await conn.execute(text("SELECT id FROM boards WHERE slug = 'blog'"))
            board_row = result.fetchone()
            
            if not board_row:
                print("❌ 'blog' board not found. Please run migration script first.")
                return

            board_id = board_row[0]
            print(f"✅ Found Board 'blog' (ID: {board_id})")

            # 2. Get User ID (Admin or any user)
            result = await conn.execute(text("SELECT id FROM users ORDER BY is_admin DESC, created_at ASC LIMIT 1"))
            user_row = result.fetchone()
            
            if not user_row:
                print("❌ No users found. Please create an admin user first.")
                return

            user_id = user_row[0]
            print(f"✅ Found User for Author (ID: {user_id})")

            # 3. Insert Posts
            print(f"📦 Inserting {len(BLOG_POSTS)} blog posts...")
            
            for post in BLOG_POSTS:
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
    asyncio.run(seed_blog_posts())
