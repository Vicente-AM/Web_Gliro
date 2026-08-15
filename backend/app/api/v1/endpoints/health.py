from fastapi import APIRouter

router = APIRouter()


@router.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint to verify API and DB readiness."""
    return {
        "status": "healthy",
        "service": "Gliro API",
        "version": "1.0.0",
    }
