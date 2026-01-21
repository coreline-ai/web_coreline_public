from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, boards, posts, comments, likes, files, notifications, admin
from .database import create_db_and_tables

app = FastAPI(
    title="Spectrum API",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)

# CORS setup
origins = [
    "http://localhost:3000",
    "https://coreline.vercel.app", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(auth.router)
app.include_router(boards.router)
app.include_router(posts.router)
app.include_router(comments.router, prefix="/api")
app.include_router(likes.router, prefix="/api")
app.include_router(files.router, prefix="/api")
app.include_router(notifications.router, prefix="/api")
app.include_router(admin.router) # admin router already has prefix

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Spectrum Backend is running"}
