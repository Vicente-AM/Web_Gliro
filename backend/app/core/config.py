import os
from typing import List


class Settings:
    PROJECT_NAME: str = "Gliro API"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./gliro.db")
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*",
    ]


settings = Settings()
