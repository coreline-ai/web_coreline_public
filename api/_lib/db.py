import os
from dotenv import load_dotenv

# Load .env file from root if it exists
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
if os.path.exists(env_path):
    load_dotenv(env_path)

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# Database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

# For Vercel Serverless, we might need to handle connection pooling carefully
# or use a direct connection if it's a short-lived function.
# Here we use async engine for performance.
if DATABASE_URL:
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
    elif DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    # Remove sslmode and channel_binding from URL (asyncpg uses different SSL handling)
    if "?" in DATABASE_URL:
        base_url, params = DATABASE_URL.split("?", 1)
        param_list = params.split("&")
        # Filter out problematic params for asyncpg
        filtered_params = [p for p in param_list if not p.startswith("sslmode=") and not p.startswith("channel_binding=")]
        DATABASE_URL = base_url + ("?" + "&".join(filtered_params) if filtered_params else "")


# SSL configuration - Enable for cloud databases (Neon, Supabase, etc.)
connect_args = {}
# Enable SSL if URL contains cloud database indicators or if explicitly set
if DATABASE_URL and ("neon.tech" in DATABASE_URL or "supabase" in DATABASE_URL or os.getenv("ENVIRONMENT") == "production"):
    connect_args["ssl"] = True

engine = create_async_engine(
    DATABASE_URL, 
    connect_args=connect_args, 
    echo=os.getenv("ENVIRONMENT") != "production",
    pool_pre_ping=True,   # Check if connection is alive before using (Critical for Serverless)
    pool_recycle=300,     # Recycle connections every 5 minutes
    pool_size=5,          # Keep up to 5 connections open
    max_overflow=10       # Allow bursting up to 10 extra connections
) if DATABASE_URL else None
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False) if engine else None

Base = declarative_base()

async def get_db():
    if not AsyncSessionLocal:
        raise Exception("DATABASE_URL is not set.")
    async with AsyncSessionLocal() as session:
        yield session

