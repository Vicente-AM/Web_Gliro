from fastapi import APIRouter
from app.api.v1.endpoints import contact, content, health

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(contact.router, tags=["Contact & Leads"])
api_router.include_router(content.router, tags=["Content"])
