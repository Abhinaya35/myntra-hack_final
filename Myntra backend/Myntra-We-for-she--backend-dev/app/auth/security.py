import logging
from datetime import datetime, timedelta, timezone
from typing import Optional, Tuple
import bcrypt
import jwt
from app.config import settings

logger = logging.getLogger("uvicorn.error")

# Fallback defaults if not set in settings
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = getattr(settings, "ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = getattr(settings, "ACCESS_TOKEN_EXPIRE_MINUTES", 30)

def hash_password(password: str) -> str:
    """
    Hashes a plain text password using Bcrypt with auto-generated salt.
    """
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a plain text password against a Bcrypt hashed password.
    """
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"), 
            hashed_password.encode("utf-8")
        )
    except Exception as e:
        logger.error(f"[Auth] Password verification check failed: {str(e)}")
        return False

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> Tuple[str, int]:
    """
    Generates a signed JWT Access Token.
    Returns:
        (token_string, expires_in_seconds)
    """
    to_encode = data.copy()
    
    # Calculate expirations
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
        expires_seconds = int(expires_delta.total_seconds())
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        expires_seconds = ACCESS_TOKEN_EXPIRE_MINUTES * 60
        
    to_encode.update({
        "exp": expire,
        "iat": datetime.now(timezone.utc)
    })
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    logger.info("[JWT] Token Generated")
    return encoded_jwt, expires_seconds

def decode_access_token(token: str) -> Optional[dict]:
    """
    Decodes and validates a JWT token signature and expiration.
    Returns payload dict if valid, or None if invalid/expired.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        logger.info("[JWT] Token Verified")
        return payload
    except jwt.ExpiredSignatureError:
        logger.warning("[JWT] Token Verification Failed: Expired token")
        return None
    except jwt.PyJWTError as e:
        logger.warning(f"[JWT] Token Verification Failed: {str(e)}")
        return None
