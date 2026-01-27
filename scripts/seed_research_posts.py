"""
Script to seed AI research posts.
Usage: python scripts/seed_research_posts.py
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

RESEARCH_POSTS = [
    {
        "title": "Multimodal RAG: 이미지와 텍스트를 결합한 차세대 검색 증강 생성",
        "content": "<p>텍스트 기반의 RAG를 넘어, 이미지와 차트, 도표까지 이해하는 Multimodal RAG에 대한 연구가 활발합니다. CLIP 모델을 활용한 멀티모달 임베딩 구축 전략과, VLM(Vision Language Model)을 Retriever로 활용하는 최신 논문들을 리뷰합니다.</p><p>특히 의료 영상이나 도면과 같은 특수 데이터셋에서의 검색 정확도를 높이기 위한 Fine-Grained Retrieval 기법을 중점적으로 분석했습니다.</p>",
        "category": "AI/ML"
    },
    {
        "title": "Transformer 모델의 Attention 메커니즘 최적화 연구 (Linear Attention)",
        "content": "<p>Transformer의 Self-Attention은 시퀀스 길이에 대해 제곱(O(n^2))의 복잡도를 가집니다. 이를 선형 복잡도(O(n))로 줄이기 위한 FlashAttention, Hyena Hierarchy, RWKV 등의 최신 아키텍처를 비교 분석합니다.</p><p>Long Context 처리가 필수적인 LLM 시대에 메모리 효율성을 극대화하기 위한 연구 흐름을 정리했습니다.</p>",
        "category": "AI/ML"
    },
    {
        "title": "Graph Neural Networks(GNN)을 이용한 지식 그래프(Knowledge Graph) 구축",
        "content": "<p>비정형 텍스트 데이터에서 엔티티 간의 관계를 추출하여 지식 그래프를 구축하는 파이프라인을 연구했습니다. GAT(Graph Attention Network)를 활용하여 노드 간의 중요도를 학습하고, 이를 LLM의 프롬프트로 주입하여 추론 능력을 향상시키는 GraphRAG 방법론을 제안합니다.</p>",
        "category": "AI/ML"
    },
    {
        "title": "Self-Supervised Learning: 비지도 학습을 통한 Vision 모델 성능 향상",
        "content": "<p>라벨링된 데이터가 부족한 환경에서 MAE(Masked Autoencoders)와 DINOv2와 같은 자기지도학습(SSL) 기법이 어떻게 Vision 모델의 Representation 능력을 향상시키는지 살펴봅니다.</p><p>Downstream Task(분류, 객체 탐지)에서의 전이 학습(Transfer Learning) 성능 평가 결과를 공유합니다.</p>",
        "category": "AI/ML"
    },
    {
        "title": "NeRF(Neural Radiance Fields)와 3D 생성형 AI의 발전 동향",
        "content": "<p>2D 이미지 몇 장으로 고해상도 3D 장면을 복원하는 NeRF 기술이 Gaussian Splatting으로 진화하며 실시간 렌더링이 가능해졌습니다. 이에 더해 텍스트 프롬프트로부터 3D 에셋을 생성하는 DreamFusion 등의 최신 생성형 AI 모델들을 리뷰합니다.</p>",
        "category": "AI/ML"
    },
    {
        "title": "RLHF(Reinforcement Learning from Human Feedback)의 한계와 대안",
        "content": "<p>ChatGPT의 핵심 기술인 RLHF는 인간의 피드백을 반영하지만, 보상 모델(Reward Model)의 편향성과 복잡한 학습 과정이 문제입니다. 이를 해결하기 위한 DPO(Direct Preference Optimization)와 같은 새로운 정렬(Alignment) 알고리즘을 분석하고 실험해봅니다.</p>",
        "category": "AI/ML"
    },
    {
        "title": "Explainable AI (XAI): 딥러닝 모델의 의사결정 과정 시각화",
        "content": "<p>AI 모델의 신뢰성을 높이기 위해 SHAP, LIME, Grad-CAM 등의 설명 가능한 AI 기법을 실제 의료 진단 모델에 적용해보았습니다. 모델이 왜 그런 판단을 내렸는지 시각화하고, 이를 통해 모델의 편향을 발견하고 개선한 사례를 소개합니다.</p>",
        "category": "AI/ML"
    },
    {
        "title": "Diffusion Model vs GAN: 생성 모델의 비교와 미래 전망",
        "content": "<p>이미지 생성 분야를 평정한 Diffusion Model(Stable Diffusion)과 전통적인 강자 GAN의 장단점을 심층 비교합니다. 추론 속도, 다양성, 학습 안정성 측면에서 두 모델을 분석하고, Consistency Model과 같은 최신 가속화 연구 동향을 다룹니다.</p>",
        "category": "AI/ML"
    }
]

async def seed_research_posts():
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
            # 1. Get Research Board ID
            result = await conn.execute(text("SELECT id FROM boards WHERE slug = 'research'"))
            board_row = result.fetchone()
            
            if not board_row:
                print("❌ 'research' board not found. Please run migration script first.")
                # Fallback create if not exists
                result = await conn.execute(text("""
                    INSERT INTO boards (name, slug, description, access_level)
                    VALUES ('연구 노트', 'research', '연구 및 기술 노트', 'PUBLIC')
                    RETURNING id
                """))
                board_id = result.fetchone()[0]
                print(f"   Created Board 'research' (ID: {board_id})")
            else:
                board_id = board_row[0]
                print(f"✅ Found Board 'research' (ID: {board_id})")

            # 2. Get User ID (Admin or any user)
            result = await conn.execute(text("SELECT id FROM users ORDER BY is_admin DESC, created_at ASC LIMIT 1"))
            user_row = result.fetchone()
            
            if not user_row:
                print("❌ No users found. Please create an admin user first.")
                return

            user_id = user_row[0]
            print(f"✅ Found User for Author (ID: {user_id})")

            # 3. Insert Posts
            print(f"📦 Inserting {len(RESEARCH_POSTS)} research posts...")
            
            for post in RESEARCH_POSTS:
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
    asyncio.run(seed_research_posts())
