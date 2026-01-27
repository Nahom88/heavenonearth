"""
Heaven on Earth CMS Backend - Security Module

Handles JWT token generation, password hashing, and authentication utilities.
All security-sensitive operations are centralized here.
"""

from datetime import datetime, timedelta, timezone
from typing import Optional, Union

from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

from app.config import settings


# Password hashing context using bcrypt
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=settings.password_hash_rounds,
)


class TokenData(BaseModel):
    """Data extracted from JWT token."""
    sub: str  # Subject (admin email or ID)
    exp: datetime
    type: str  # "access" or "refresh"
    jti: Optional[str] = None  # JWT ID for token invalidation


class TokenPair(BaseModel):
    """Access and refresh token pair."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int  # Seconds until access token expires


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password.
    
    Args:
        plain_password: The plain text password to verify
        hashed_password: The hashed password to compare against
        
    Returns:
        True if password matches, False otherwise
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Hash a password using bcrypt.
    
    Args:
        password: Plain text password to hash
        
    Returns:
        Hashed password string
    """
    return pwd_context.hash(password)


def create_access_token(
    subject: Union[str, int],
    expires_delta: Optional[timedelta] = None,
    additional_claims: Optional[dict] = None,
) -> str:
    """
    Create a JWT access token.
    
    Args:
        subject: The subject of the token (usually user ID or email)
        expires_delta: Optional custom expiration time
        additional_claims: Additional claims to include in the token
        
    Returns:
        Encoded JWT token string
    """
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.jwt_access_token_expire_minutes
        )
    
    to_encode = {
        "sub": str(subject),
        "exp": expire,
        "type": "access",
        "iat": datetime.now(timezone.utc),
    }
    
    if additional_claims:
        to_encode.update(additional_claims)
    
    encoded_jwt = jwt.encode(
        to_encode,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )
    
    return encoded_jwt


def create_refresh_token(
    subject: Union[str, int],
    expires_delta: Optional[timedelta] = None,
) -> str:
    """
    Create a JWT refresh token.
    
    Refresh tokens have longer expiration and are used to obtain new access tokens.
    
    Args:
        subject: The subject of the token (usually user ID or email)
        expires_delta: Optional custom expiration time
        
    Returns:
        Encoded JWT refresh token string
    """
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            days=settings.jwt_refresh_token_expire_days
        )
    
    # Generate a unique JWT ID for potential token invalidation
    import uuid
    jti = str(uuid.uuid4())
    
    to_encode = {
        "sub": str(subject),
        "exp": expire,
        "type": "refresh",
        "iat": datetime.now(timezone.utc),
        "jti": jti,
    }
    
    encoded_jwt = jwt.encode(
        to_encode,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )
    
    return encoded_jwt


def create_token_pair(subject: Union[str, int]) -> TokenPair:
    """
    Create both access and refresh tokens.
    
    Args:
        subject: The subject of the tokens (usually user ID or email)
        
    Returns:
        TokenPair containing both tokens
    """
    access_token = create_access_token(subject)
    refresh_token = create_refresh_token(subject)
    
    return TokenPair(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.jwt_access_token_expire_minutes * 60,
    )


def decode_token(token: str) -> Optional[TokenData]:
    """
    Decode and validate a JWT token.
    
    Args:
        token: The JWT token string to decode
        
    Returns:
        TokenData if valid, None if invalid or expired
    """
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm],
        )
        
        return TokenData(
            sub=payload.get("sub"),
            exp=datetime.fromtimestamp(payload.get("exp"), tz=timezone.utc),
            type=payload.get("type", "access"),
            jti=payload.get("jti"),
        )
    except JWTError:
        return None


def verify_token(token: str, token_type: str = "access") -> Optional[TokenData]:
    """
    Verify a JWT token and check its type.
    
    Args:
        token: The JWT token string to verify
        token_type: Expected token type ("access" or "refresh")
        
    Returns:
        TokenData if valid and correct type, None otherwise
    """
    token_data = decode_token(token)
    
    if token_data is None:
        return None
    
    if token_data.type != token_type:
        return None
    
    if token_data.exp < datetime.now(timezone.utc):
        return None
    
    return token_data


def generate_invite_token(email: str, expires_hours: int = 48) -> str:
    """
    Generate a token for admin invitation.
    
    Args:
        email: Email address of the invited admin
        expires_hours: Hours until the invite expires
        
    Returns:
        Encoded invite token
    """
    expire = datetime.now(timezone.utc) + timedelta(hours=expires_hours)
    
    to_encode = {
        "sub": email,
        "exp": expire,
        "type": "invite",
        "iat": datetime.now(timezone.utc),
    }
    
    return jwt.encode(
        to_encode,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )


def verify_invite_token(token: str) -> Optional[str]:
    """
    Verify an admin invitation token.
    
    Args:
        token: The invite token to verify
        
    Returns:
        Email address if valid, None otherwise
    """
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm],
        )
        
        if payload.get("type") != "invite":
            return None
        
        return payload.get("sub")
    except JWTError:
        return None
