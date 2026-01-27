"""
Heaven on Earth CMS Backend - Auth Endpoints

Handles admin login, token refresh, and logout.
"""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.admin import get_admin_by_email, update_admin_login
from app.database import get_db
from app.schemas.admin import Token, TokenRefresh
from app.security import verify_password, create_token_pair, verify_token


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=Token)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    """
    Authenticate an admin and return a JWT token pair.
    
    Uses standard OAuth2 password flow.
    """
    # Get admin by email
    admin = await get_admin_by_email(db, email=form_data.username)
    
    # Verify admin exists and password is correct
    if not admin or not verify_password(form_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if admin is active
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is deactivated",
        )
    
    # Update last login time
    await update_admin_login(db, admin=admin)
    
    # Create token pair
    return create_token_pair(subject=admin.email)


@router.post("/refresh", response_model=Token)
async def refresh_token(
    refresh_data: TokenRefresh,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    """
    Refresh an access token using a valid refresh token.
    """
    # Verify refresh token
    token_data = verify_token(refresh_data.refresh_token, token_type="refresh")
    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )
    
    # Get admin by email from token subject
    admin = await get_admin_by_email(db, email=token_data.sub)
    if not admin or not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin not found or inactive",
        )
    
    # Create new token pair
    return create_token_pair(subject=admin.email)


@router.post("/logout")
async def logout():
    """
    Logout the current admin.
    
    Note: Since JWT is stateless, client-side logout involves
    deleting the token. Server-side logout can be implemented
    using a token blacklist if needed.
    """
    return {"message": "Successfully logged out"}
