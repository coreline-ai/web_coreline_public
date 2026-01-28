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
from api._lib.limiter import limiter

# Import routers (Absolute imports)
from api.auth.token import router as auth_token_router
from api.auth.register import router as auth_register_router
from api.auth.logout import router as auth_logout_router
from api.auth.refresh import router as auth_refresh_router
from api.routers.boards import router as boards_router
from api.routers.posts import router as posts_router
from api.routers.admin import router as admin_router
from api.comments.comment_id import router as comment_delete_router
from api.notifications.index import router as notifications_router
from api.notifications.notification_id_read import router as notification_read_router
from api.files.signed_url import router as files_router

app = FastAPI()
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
app.include_router(comment_delete_router)
app.include_router(notifications_router)
app.include_router(notification_read_router)
app.include_router(files_router)

@app.get("/api/health")
async def health():
    return {"status": "ok", "message": "Backend API is fully operational", "success": True}

@app.get("/api")
async def root():
    return {"data": {"message": "Spectrum API is running"}, "success": True}
