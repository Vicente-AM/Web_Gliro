from fastapi import APIRouter
from app.api.v1.endpoints import contact, content, health, chat

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(contact.router, tags=["Contact & Leads"])
api_router.include_router(content.router, tags=["Content"])
api_router.include_router(chat.router, tags=["Chatbot"])
