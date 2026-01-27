"""
Heaven on Earth CMS Backend - Database Module

Handles async database connection using SQLAlchemy 2.0 with asyncpg.
"""

from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import NullPool

from app.config import settings


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""
    pass


# Create async engine optimized for PgBouncer (Transaction Mode)
# We use NullPool and statement_cache_size=0 to avoid prepared statement issues
engine = create_async_engine(
    settings.database_url,
    poolclass=NullPool,
    echo=settings.debug,  # Log SQL queries in debug mode
    connect_args={
        "statement_cache_size": 0
    }
)

# Create async session factory
async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency that provides a database session.
    """
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db() -> None:
    """
    Initialize database tables.
    """
    async with engine.begin() as conn:
        # Import all models to ensure they're registered with Base
        from app.models import (  # noqa: F401
            admin,
            event,
            ministry,
            gallery,
            prayer,
            testimonial,
            partnership,
        )
        # Only for development - use Alembic in production
        if settings.is_development:
            await conn.run_sync(Base.metadata.create_all)


async def close_db() -> None:
    """
    Close database connections.
    """
    await engine.dispose()
