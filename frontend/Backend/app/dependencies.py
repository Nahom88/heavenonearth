"""
Heaven on Earth CMS Backend - Dependencies Module

FastAPI dependencies for authentication, database access, and common utilities.
"""

from typing import Annotated, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.admin import Admin
from app.security import verify_token, TokenData
from app.crud.admin import get_admin_by_email, get_admin_by_id


# OAuth2 scheme for token extraction from Authorization header
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login",
    auto_error=True,
)

# Optional OAuth2 scheme (doesn't raise error if token is missing)
oauth2_scheme_optional = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login",
    auto_error=False,
)


async def get_current_admin(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> Admin:
    """
    Dependency to get the currently authenticated admin.
    
    Extracts and validates the JWT token from the Authorization header,
    then retrieves the corresponding admin from the database.
    
    Raises:
        HTTPException: If token is invalid or admin not found
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Verify the token
    token_data = verify_token(token, token_type="access")
    if token_data is None:
        raise credentials_exception
    
    # Get admin from database
    admin = await get_admin_by_email(db, email=token_data.sub)
    if admin is None:
        raise credentials_exception
    
    # Check if admin is active
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is deactivated",
        )
    
    return admin


async def get_current_active_admin(
    current_admin: Annotated[Admin, Depends(get_current_admin)],
) -> Admin:
    """
    Dependency to ensure the current admin is active.
    
    This is a convenience wrapper around get_current_admin that
    explicitly checks for active status.
    """
    if not current_admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive admin account",
        )
    return current_admin


async def get_current_superadmin(
    current_admin: Annotated[Admin, Depends(get_current_active_admin)],
) -> Admin:
    """
    Dependency to ensure the current admin is a superadmin.
    
    Superadmins have elevated privileges like inviting other admins.
    """
    if not current_admin.is_superadmin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Superadmin privileges required",
        )
    return current_admin


async def get_optional_current_admin(
    token: Annotated[Optional[str], Depends(oauth2_scheme_optional)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> Optional[Admin]:
    """
    Dependency to optionally get the current admin.
    
    Returns None if no token is provided or token is invalid.
    Useful for endpoints that behave differently for authenticated users.
    """
    if not token:
        return None
    
    token_data = verify_token(token, token_type="access")
    if token_data is None:
        return None
    
    admin = await get_admin_by_email(db, email=token_data.sub)
    if admin is None or not admin.is_active:
        return None
    
    return admin


# Type aliases for cleaner dependency injection
CurrentAdmin = Annotated[Admin, Depends(get_current_admin)]
ActiveAdmin = Annotated[Admin, Depends(get_current_active_admin)]
SuperAdmin = Annotated[Admin, Depends(get_current_superadmin)]
OptionalAdmin = Annotated[Optional[Admin], Depends(get_optional_current_admin)]
DBSession = Annotated[AsyncSession, Depends(get_db)]
