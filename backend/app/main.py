"""
Heaven on Earth CMS Backend - Main Application Entry Point

Initializes FastAPI application, configures middleware, and registers routers.
"""

from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.api.v1.endpoints import (
    auth,
    admins,
    events,
    ministries,
    gallery,
    prayers,
    testimonials,
    partnerships,
)
from app.config import settings
from app.database import init_db, close_db, get_db
from app.crud.admin import create_initial_admin
from app.schemas.common import HealthResponse


# Rate limiting configuration
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for application startup and shutdown.
    """
    # Startup: Initialize database and create initial admin
    await init_db()
    
    # Create initial admin from env if none exists
    async for db in get_db():
        await create_initial_admin(db)
        break # Only need one session
        
    yield
    
    # Shutdown: Close database connections
    await close_db()


# Initialize FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="CMS Backend for Heaven on Earth Kingdom Family Ministries",
    lifespan=lifespan,
    docs_url="/docs" if not settings.is_production else None,
    redoc_url="/redoc" if not settings.is_production else None,
)

# Configure rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS
origins = settings.allowed_origins_list
# Ensure common variations are included
if "http://localhost:8080" in origins and "http://127.0.0.1:8080" not in origins:
    origins.append("http://127.0.0.1:8080")

print(f"DEBUG: Allowed CORS origins: {origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


# Root endpoint / Health check
@app.get("/", response_model=HealthResponse, tags=["System"])
async def health_check():
    """
    Health check endpoint to verify the service is running.
    """
    return HealthResponse(
        status="healthy",
        version=settings.app_version,
        environment=settings.environment,
        timestamp=datetime.now(timezone.utc),
    )


# Register API v1 routers
api_v1_prefix = "/api/v1"

app.include_router(auth.router, prefix=api_v1_prefix)
app.include_router(admins.router, prefix=api_v1_prefix)
app.include_router(events.router, prefix=api_v1_prefix)
app.include_router(ministries.router, prefix=api_v1_prefix)
app.include_router(gallery.router, prefix=api_v1_prefix)
app.include_router(prayers.router, prefix=api_v1_prefix)
app.include_router(testimonials.router, prefix=api_v1_prefix)
app.include_router(partnerships.router, prefix=api_v1_prefix)


# Global exception handler for unexpected errors
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    Catch-all exception handler to ensure consistent error responses.
    """
    # Log the exception here in a real application
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred. Please try again later.",
            "detail": str(exc) if settings.debug else None
        },
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )
