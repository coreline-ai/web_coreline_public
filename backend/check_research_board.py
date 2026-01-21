import os
import sys
from sqlmodel import Session, select
from api.models import Board, Category
from api.database import engine

# Add current directory to path
sys.path.append(os.getcwd())

def check_research_board():
    print("--- Checking Research Board ---")
    
    with Session(engine) as session:
        # Search for board with slug 'research'
        statement = select(Board).where(Board.slug == "research")
        board = session.exec(statement).first()
        
        if not board:
            print("❌ Board 'research' NOT FOUND.")
            # list all boards
            all_boards = session.exec(select(Board)).all()
            print("Available boards:", [b.slug for b in all_boards])
            return

        print(f"✅ Board 'research' found. ID: {board.id}, Name: {board.name}")
        
        # Check categories
        cat_stmt = select(Category).where(Category.board_id == board.id)
        categories = session.exec(cat_stmt).all()
        
        if not categories:
            print("❌ No categories found for 'research' board.")
        else:
            print(f"✅ Found {len(categories)} categories:")
            for c in categories:
                print(f" - {c.name} (ID: {c.id})")

if __name__ == "__main__":
    check_research_board()
