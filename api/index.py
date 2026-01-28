from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import traceback
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

import sys
# Add parent directory to sys.path for absolute imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Rate Limiting
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from ._lib.limiter import limiter

# Import routers (Relative imports to avoid path issues)
from .auth.token import router as auth_token_router
from .auth.register import router as auth_register_router
from .auth.logout import router as auth_logout_router
from .auth.refresh import router as auth_refresh_router
from .routers.boards import router as boards_router
from .routers.posts import router as posts_router
from .routers.admin import router as admin_router
from .routers.comments import router as comments_router
from .routers.notifications import router as notifications_router
from .routers.files import router as files_router

from contextlib import asynccontextmanager
import subprocess

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run migrations on startup to ensure production DB is in sync
    # This handles cases where build-time migrations fail due to missing env vars
    if os.getenv("ENVIRONMENT") == "production":
        logger.info("🚀 Running production migrations...")
        try:
            # Run alembic upgrade head
            # We use absolute path to alembic if possible, but 'python3 -m alembic' is safer
            result = subprocess.run(
                [sys.executable, "-m", "alembic", "upgrade", "head"],
                capture_output=True,
                text=True,
                cwd=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            )
            if result.returncode == 0:
                logger.info("✅ Migrations applied successfully.")
            else:
                logger.error(f"❌ Migration failed: {result.stderr}")
        except Exception as e:
            logger.error(f"❌ Error during runtime migration: {e}")
    
    yield
    # Cleanup (not needed for now)

app = FastAPI(lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Enable CORS - Use environment variable in production
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    logger.error(traceback.format_exc())
    
    # In production, mask the error detail
    is_prod = os.getenv("ENVIRONMENT") == "production"
    error_detail = "Internal Server Error" if is_prod else str(exc)
    
    return JSONResponse(
        status_code=500,
        content={"detail": error_detail, "success": False}
    )

# Include all routers
app.include_router(auth_token_router)
app.include_router(auth_register_router)
app.include_router(auth_logout_router)
app.include_router(auth_refresh_router)
app.include_router(boards_router)
app.include_router(posts_router)
app.include_router(admin_router)
app.include_router(comments_router)
app.include_router(notifications_router)
app.include_router(files_router)

@app.get("/api/health")
async def health():
    return {"status": "ok", "message": "Backend API is fully operational", "success": True}

@app.get("/api")
async def root():
    return {"data": {"message": "Spectrum API is running"}, "success": True}
