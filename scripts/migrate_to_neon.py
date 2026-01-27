"""
Script to migrate database schema to Neon and optionally seed initial data.
Usage: python scripts/migrate_to_neon.py --create-tables --create-admin
"""

import asyncio
import argparse
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Override DATABASE_URL with Neon URL
NEON_URL = os.environ.get("NEON_DATABASE_URL")
if NEON_URL:
    os.environ["DATABASE_URL"] = NEON_URL
    print(f"✅ Using NEON_DATABASE_URL")

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from argon2 import PasswordHasher
import uuid


async def create_tables():
    """Create all tables in the database using raw SQL."""
    
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL is not set")
        return False
    
    # Convert to async URL and handle SSL
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    # Remove sslmode and channel_binding from URL (asyncpg uses different SSL handling)
    if "?" in database_url:
        base_url, params = database_url.split("?", 1)
        param_list = params.split("&")
        # Filter out problematic params
        filtered_params = [p for p in param_list if not p.startswith("sslmode=") and not p.startswith("channel_binding=")]
        if filtered_params:
            database_url = base_url + "?" + "&".join(filtered_params)
        else:
            database_url = base_url
    
    print(f"🔗 Connecting to: {database_url[:50]}...")
    
    engine = create_async_engine(database_url, echo=False, connect_args={"ssl": True})
    
    # SQL statements to create tables
    create_statements = [
        """
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            "emailVerified" TIMESTAMP WITH TIME ZONE,
            image VARCHAR(255),
            username VARCHAR(80) UNIQUE NOT NULL,
            password VARCHAR(200),
            nickname VARCHAR(80) UNIQUE NOT NULL,
            is_admin BOOLEAN NOT NULL DEFAULT FALSE,
            is_banned BOOLEAN NOT NULL DEFAULT FALSE,
            login_count INTEGER NOT NULL DEFAULT 0,
            last_login_at TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS boards (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) UNIQUE NOT NULL,
            slug VARCHAR(50) UNIQUE NOT NULL,
            description TEXT,
            access_level VARCHAR(20) NOT NULL DEFAULT 'PUBLIC',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS board_categories (
            id SERIAL PRIMARY KEY,
            board_id INTEGER NOT NULL REFERENCES boards(id),
            name VARCHAR(50) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(120) NOT NULL,
            content TEXT NOT NULL,
            user_id UUID NOT NULL REFERENCES users(id),
            board_id INTEGER NOT NULL REFERENCES boards(id),
            category_id INTEGER NOT NULL REFERENCES board_categories(id),
            file_url VARCHAR(300),
            is_notice BOOLEAN NOT NULL DEFAULT FALSE,
            view_count INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            user_id UUID NOT NULL REFERENCES users(id),
            post_id INTEGER NOT NULL REFERENCES posts(id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS post_likes (
            user_id UUID NOT NULL REFERENCES users(id),
            post_id INTEGER NOT NULL REFERENCES posts(id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, post_id)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS notifications (
            id SERIAL PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES users(id),
            post_id INTEGER NOT NULL REFERENCES posts(id),
            comment_id INTEGER REFERENCES comments(id),
            type VARCHAR(50) NOT NULL,
            actor_user_id UUID REFERENCES users(id),
            is_read BOOLEAN NOT NULL DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS audit_logs (
            id SERIAL PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            action VARCHAR(50) NOT NULL,
            target_id VARCHAR(100),
            target_type VARCHAR(50),
            ip_address VARCHAR(50),
            details TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS token_blacklist (
            id SERIAL PRIMARY KEY,
            jti VARCHAR(36) UNIQUE NOT NULL,
            user_id UUID NOT NULL REFERENCES users(id),
            expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
            revoked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            reason VARCHAR(50)
        )
        """
    ]
    
    async with engine.begin() as conn:
        for i, stmt in enumerate(create_statements, 1):
            try:
                await conn.execute(text(stmt))
                table_name = stmt.split("IF NOT EXISTS")[1].split("(")[0].strip()
                print(f"  ✅ Created table: {table_name}")
            except Exception as e:
                print(f"  ❌ Error creating table {i}: {e}")
    
    await engine.dispose()
    print("\n✅ All tables created!")
    return True


async def create_admin_user():
    """Create default admin user."""
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL is not set")
        return False
    
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    # Remove sslmode and channel_binding from URL
    if "?" in database_url:
        base_url, params = database_url.split("?", 1)
        param_list = params.split("&")
        filtered_params = [p for p in param_list if not p.startswith("sslmode=") and not p.startswith("channel_binding=")]
        database_url = base_url + ("?" + "&".join(filtered_params) if filtered_params else "")
    
    engine = create_async_engine(database_url, echo=False, connect_args={"ssl": True})
    
    # Hash password using argon2
    ph = PasswordHasher()
    hashed_password = ph.hash("admin1234")
    admin_id = str(uuid.uuid4())
    
    insert_sql = text("""
        INSERT INTO users (id, name, email, username, password, nickname, is_admin, is_banned, login_count)
        VALUES (:id, :name, :email, :username, :password, :nickname, TRUE, FALSE, 0)
        ON CONFLICT (email) DO NOTHING
    """)
    
    async with engine.begin() as conn:
        await conn.execute(insert_sql, {
            "id": admin_id,
            "name": "관리자",
            "email": "admin@coreline.com",
            "username": "admin",
            "password": hashed_password,
            "nickname": "관리자"
        })
        print("✅ Admin user created (admin / admin1234)")
    
    await engine.dispose()
    return True


async def create_default_boards():
    """Create default boards and categories."""
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL is not set")
        return False
    
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    # Remove sslmode and channel_binding from URL
    if "?" in database_url:
        base_url, params = database_url.split("?", 1)
        param_list = params.split("&")
        filtered_params = [p for p in param_list if not p.startswith("sslmode=") and not p.startswith("channel_binding=")]
        database_url = base_url + ("?" + "&".join(filtered_params) if filtered_params else "")
    
    engine = create_async_engine(database_url, echo=False, connect_args={"ssl": True})
    
    boards_data = [
        {"name": "블로그", "slug": "blog", "description": "코어라인 공식 블로그", "access_level": "PUBLIC"},
        {"name": "연구 노트", "slug": "research", "description": "연구 및 기술 노트", "access_level": "PUBLIC"},
        {"name": "프로젝트 기술지원 QnA", "slug": "CL_Project_QnA", "description": "코어라인 프로젝트 진행 관련 문답 고객 게시판", "access_level": "PUBLIC"},
    ]
    
    categories_data = {
        "blog": ["공지사항", "기술", "뉴스"],
        "research": ["AI/ML", "웹개발", "논문리뷰"],
        "CL_Project_QnA": ["QnA", "견적", "일정관련"],
    }
    
    async with engine.begin() as conn:
        for board in boards_data:
            try:
                result = await conn.execute(text("""
                    INSERT INTO boards (name, slug, description, access_level)
                    VALUES (:name, :slug, :description, :access_level)
                    ON CONFLICT (slug) DO NOTHING
                    RETURNING id
                """), board)
                row = result.fetchone()
                if row:
                    board_id = row[0]
                    print(f"  ✅ Created board: {board['name']} (id={board_id})")
                    
                    # Create categories for this board
                    for cat_name in categories_data.get(board["slug"], []):
                        await conn.execute(text("""
                            INSERT INTO board_categories (board_id, name)
                            VALUES (:board_id, :name)
                        """), {"board_id": board_id, "name": cat_name})
                        print(f"      ✅ Created category: {cat_name}")
                else:
                    print(f"  ⚠️ Board already exists: {board['name']}")
            except Exception as e:
                print(f"  ❌ Error creating board {board['name']}: {e}")
    
    await engine.dispose()
    print("\n✅ Default boards and categories created!")
    return True


async def main():
    parser = argparse.ArgumentParser(description="Migrate database to Neon")
    parser.add_argument("--create-tables", action="store_true", help="Create all tables")
    parser.add_argument("--create-admin", action="store_true", help="Create admin user")
    parser.add_argument("--create-boards", action="store_true", help="Create default boards")
    parser.add_argument("--all", action="store_true", help="Run all migrations")
    
    args = parser.parse_args()
    
    if args.all:
        args.create_tables = True
        args.create_admin = True
        args.create_boards = True
    
    if not any([args.create_tables, args.create_admin, args.create_boards]):
        parser.print_help()
        return
    
    print("🚀 Database Migration Script\n")
    
    if args.create_tables:
        print("📦 Creating tables...")
        await create_tables()
        print()
    
    if args.create_admin:
        print("👤 Creating admin user...")
        await create_admin_user()
        print()
    
    if args.create_boards:
        print("📋 Creating default boards...")
        await create_default_boards()
        print()
    
    print("🎉 Migration complete!")


if __name__ == "__main__":
    asyncio.run(main())
