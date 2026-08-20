import os
from typing import List
from dotenv import load_dotenv

# Load .env if present
load_dotenv()


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
        "https://gliro.cl",
        "*",
    ]

    # SMTP Configuration
    SMTP_HOST: str = os.getenv("SMTP_HOST", "")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    SMTP_TLS: bool = os.getenv("SMTP_TLS", "true").lower() in ("true", "1", "yes")
    SMTP_SSL: bool = os.getenv("SMTP_SSL", "false").lower() in ("true", "1", "yes")
    
    # Email routing
    NOTIFICATION_EMAIL_TO: str = os.getenv("NOTIFICATION_EMAIL_TO", "v.amigo@gliro.cl")
    SMTP_FROM_EMAIL: str = os.getenv("SMTP_FROM_EMAIL", "v.amigo@gliro.cl")
    SMTP_FROM_NAME: str = os.getenv("SMTP_FROM_NAME", "Gliro Notificaciones")


settings = Settings()
