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


# SSL configuration for production
connect_args = {}
if os.getenv("ENVIRONMENT") == "production":
    connect_args["ssl"] = "require"

engine = create_async_engine(DATABASE_URL, connect_args=connect_args, echo=os.getenv("ENVIRONMENT") != "production") if DATABASE_URL else None
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False) if engine else None

Base = declarative_base()

async def get_db():
    if not AsyncSessionLocal:
        raise Exception("DATABASE_URL is not set.")
    async with AsyncSessionLocal() as session:
        yield session
