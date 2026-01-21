import os
import sys

def load_env_vars():
    env_vars = {}
    try:
        with open('.env') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    k, v = line.strip().split('=', 1)
                    env_vars[k] = v
    except:
        pass
    return env_vars

def fix_db():
    print("--- Fixing Database (Adding Research Board) ---")
    env = load_env_vars()
    db_url = env.get("DATABASE_URL", "")
    
    if not db_url:
        print("❌ DATABASE_URL not found in .env")
        return

    print(f"Connecting to: {db_url}")
    
    # Try importing sqlalchemy
    try:
        from sqlalchemy import create_engine, text
    except ImportError:
        print("❌ SQLAlchemy not installed. Please install it or run in venv.")
        return
    
    try:
        engine = create_engine(db_url)
        with engine.connect() as conn:
            # Check if board exists
            print("Checking existence of 'research' board...")
            check_sql = text("SELECT id FROM boards WHERE slug = 'research'")
            result = conn.execute(check_sql).fetchone()
            
            board_id = None
            if result:
                board_id = result[0]
                print(f"✅ Board 'research' already exists (ID: {board_id}). Checking categories...")
            else:
                print("Creating 'research' board...")
                insert_sql = text("""
                    INSERT INTO boards (name, slug, description, access_level, created_at, updated_at)
                    VALUES (:name, :slug, :desc, :level, NOW(), NOW())
                    RETURNING id
                """)
                result = conn.execute(insert_sql, {
                    "name": "연구/개발",
                    "slug": "research",
                    "desc": "Coreline의 연구 및 기술 개발",
                    "level": "PUBLIC"
                })
                board_id = result.fetchone()[0]
                conn.commit()
                print(f"✅ Created board 'research' with ID: {board_id}")

            # Categories
            cats = ["AI 연구", "의료 영상", "기술 자료"]
            for cat_name in cats:
                check_cat = text("SELECT id FROM board_categories WHERE board_id = :bid AND name = :name")
                existing = conn.execute(check_cat, {"bid": board_id, "name": cat_name}).fetchone()
                
                if not existing:
                    print(f"  + Creating category '{cat_name}'")
                    insert_cat = text("""
                        INSERT INTO board_categories (board_id, name, created_at, updated_at)
                        VALUES (:bid, :name, NOW(), NOW())
                    """)
                    conn.execute(insert_cat, {"bid": board_id, "name": cat_name})
                    conn.commit()
                else:
                    print(f"  - Category '{cat_name}' exists.")
                    
            print("✅ Database fix complete.")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    fix_db()
