from datetime import datetime, timezone
from fastapi import APIRouter
from pydantic import BaseModel
from app.core.config import settings
from app.core.logging import logger


router = APIRouter()


class HealthCheckResponse(BaseModel):
    status: str
    app_name: str
    version: str
    environment: str
    timestamp: str
    cors_allowed_origins: list[str]


@router.get(
    "/health",
    response_model=HealthCheckResponse,
    summary="Health Check Endpoint",
    description="Returns the operational status, version, timestamp, and environment metadata of Project Enigma backend."
)
async def get_health() -> HealthCheckResponse:
    logger.debug("Health check requested")
    
    origins = settings.CORS_ORIGINS if isinstance(settings.CORS_ORIGINS, list) else [str(settings.CORS_ORIGINS)]
    
    return HealthCheckResponse(
        status="ok",
        app_name=settings.PROJECT_NAME,
        version=settings.VERSION,
        environment="development" if settings.DEBUG else "production",
        timestamp=datetime.now(timezone.utc).isoformat(),
        cors_allowed_origins=origins
    )
