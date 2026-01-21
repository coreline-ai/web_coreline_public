from sqlmodel import create_engine, SQLModel, Session
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Get DB URL from env
DATABASE_URL = os.environ.get("DATABASE_URL")

# Handle potential "postgres://" vs "postgresql://" issue (SQLAlchemy needs postgresql://)
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    # In production, use Alembic. For dev/prototype, this is okay.
    SQLModel.metadata.create_all(engine)
