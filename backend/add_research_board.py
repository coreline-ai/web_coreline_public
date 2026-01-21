import os
import sys
from datetime import datetime
from sqlmodel import Session, select
from api.models import Board, Category, AccessLevel
from api.database import engine

# Add current directory to path
sys.path.append(os.getcwd())

def add_research_board():
    print("--- Adding Research Board ---")
    
    with Session(engine) as session:
        # Check if already exists
        statement = select(Board).where(Board.slug == "research")
        existing = session.exec(statement).first()
        
        if existing:
            print("✅ Board 'research' already exists. Skipping.")
            return

        print("Creating 'research' board...")
        board = Board(
            name="연구/개발",
            slug="research",
            description="Coreline의 연구 및 기술 개발",
            access_level=AccessLevel.PUBLIC,
            created_at=datetime.utcnow()
        )
        session.add(board)
        session.commit()
        session.refresh(board)
        print(f"✅ Board created with ID: {board.id}")
        
        # Categories
        cat_names = ["AI 연구", "의료 영상", "기술 자료"]
        for name in cat_names:
            cat = Category(name=name, board_id=board.id)
            session.add(cat)
            session.commit()
            print(f"  + Category '{name}' created.")

if __name__ == "__main__":
    add_research_board()
