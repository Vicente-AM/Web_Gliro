from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text, inspect
from app.core.config import settings
from app.core.database import Base, engine
from app.api.v1.api import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite tables on startup
    Base.metadata.create_all(bind=engine)
    
    # Safe schema migration for SQLite
    try:
        with engine.connect() as conn:
            inspector = inspect(conn)
            if "leads" in inspector.get_table_names():
                existing_columns = [col["name"] for col in inspector.get_columns("leads")]
                if "company" not in existing_columns:
                    conn.execute(text("ALTER TABLE leads ADD COLUMN company VARCHAR(160)"))
                if "interest" not in existing_columns:
                    conn.execute(text("ALTER TABLE leads ADD COLUMN interest VARCHAR(255)"))
                if "origin" not in existing_columns:
                    conn.execute(text("ALTER TABLE leads ADD COLUMN origin VARCHAR(50) DEFAULT 'web'"))
                conn.commit()
    except Exception as exc:
        print(f"[DB INIT NOTICE] Migration check: {exc}")

    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan,
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "docs": f"{settings.API_V1_STR}/docs",
        "status": "online",
    }
