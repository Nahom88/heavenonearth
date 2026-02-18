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

# Optional OAuth2 scheme that doesn't raise error if token is missing
oauth2_scheme_optional = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login",
    auto_error=False,
)


async def get_current_admin(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> Admin:
    """Retrieve the currently authenticated admin from the JWT token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token_data = verify_token(token, token_type="access")
    if token_data is None:
        raise credentials_exception
    
    admin = await get_admin_by_email(db, email=token_data.sub)
    if admin is None:
        raise credentials_exception
    
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is deactivated",
        )
    
    return admin


async def get_current_active_admin(
    current_admin: Annotated[Admin, Depends(get_current_admin)],
) -> Admin:
    """Ensure the current admin is active."""
    if not current_admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive admin account",
        )
    return current_admin


async def get_current_superadmin(
    current_admin: Annotated[Admin, Depends(get_current_active_admin)],
) -> Admin:
    """Ensure the current admin has superadmin privileges."""
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
    """Optionally get the current admin if a valid token is provided."""
    if not token:
        return None
    
    token_data = verify_token(token, token_type="access")
    if not token_data:
        return None
    
    admin = await get_admin_by_email(db, email=token_data.sub)
    return admin if admin and admin.is_active else None


# Type aliases for dependency injection
CurrentAdmin = Annotated[Admin, Depends(get_current_admin)]
ActiveAdmin = Annotated[Admin, Depends(get_current_active_admin)]
SuperAdmin = Annotated[Admin, Depends(get_current_superadmin)]
OptionalAdmin = Annotated[Optional[Admin], Depends(get_optional_current_admin)]
DBSession = Annotated[AsyncSession, Depends(get_db)]
