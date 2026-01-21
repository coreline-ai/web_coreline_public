from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
# Removed ResponseModel import as it causes serialization issues
import traceback
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import routers
from .auth.token import router as auth_token_router
from .auth.register import router as auth_register_router
from .boards.index import router as boards_router
from .boards.slug import router as board_detail_router
from .posts.index import router as posts_router
from .posts.post_id import router as post_detail_router
from .posts.post_id_comments import router as comments_router
from .posts.post_id_like import router as like_router
from .comments.comment_id import router as comment_delete_router
from .notifications.index import router as notifications_router
from .notifications.notification_id_read import router as notification_read_router
from .files.signed_url import router as files_router
from .admin.users.index import router as admin_users_router
from .admin.users.user_id import router as admin_user_edit_router

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    logger.error(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc), "success": False}
    )

# Include all routers
app.include_router(auth_token_router)
app.include_router(auth_register_router)
app.include_router(boards_router)
app.include_router(board_detail_router)
app.include_router(posts_router)
app.include_router(post_detail_router)
app.include_router(comments_router)
app.include_router(like_router)
app.include_router(comment_delete_router)
app.include_router(notifications_router)
app.include_router(notification_read_router)
app.include_router(files_router)
app.include_router(admin_users_router)
app.include_router(admin_user_edit_router)

@app.get("/api")
async def root():
    return {"data": {"message": "Spectrum API is running"}, "success": True}
