import asyncio
from api._lib.db import AsyncSessionLocal
from api._lib.models import Board, BoardCategory

async def seed_data():
    async with AsyncSessionLocal() as db:
        # Create News Board
        news_board = Board(
            name="AI 뉴스",
            slug="news",
            description="전 세계 AI 생태계의 최신 돌파구, 출시 소식 및 트렌드를 가장 빠르게 확인하세요.",
            access_level="PUBLIC"
        )
        db.add(news_board)
        await db.flush()
        
        # Add Categories for News
        categories = ["공지사항", "리뷰", "튜토리얼", "시장동향", "일반"]
        for cat_name in categories:
            db.add(BoardCategory(board_id=news_board.id, name=cat_name))
            
        # Create Research Board
        research_board = Board(
            name="연구 데이터",
            slug="research",
            description="심층적인 AI 연구 결과와 데이터 셋을 공유합니다.",
            access_level="PUBLIC"
        )
        db.add(research_board)
        await db.flush()
        
        for cat_name in ["논문리뷰", "데이터셋", "방법론"]:
            db.add(BoardCategory(board_id=research_board.id, name=cat_name))
            
        await db.commit()
        print("Seed data created successfully.")

if __name__ == "__main__":
    asyncio.run(seed_data())
