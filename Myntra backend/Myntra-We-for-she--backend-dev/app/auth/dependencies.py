from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer
from bson import ObjectId
from app.auth.security import decode_access_token
from database.database import get_database
from typing import Optional

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> Optional[str]:
        auth = request.headers.get("Authorization")
        if not auth:
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            return None
            
        try:
            res = await super().__call__(request)
            if res:
                return res.credentials
        except HTTPException as e:
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=e.detail,
                    headers={"WWW-Authenticate": "Bearer"},
                )
            return None
        return None

# oauth2_scheme is exposed under the same name so route and get_current_user dependencies are unchanged
oauth2_scheme = JWTBearer()

async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """
    Dependency to resolve, parse, and validate the currently authenticated user from a JWT bearer token.
    Throws HTTP 401 on expired/malformed tokens / non-ObjectId subjects, and HTTP 404 if the user is missing in MongoDB.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    if token is None:
        raise credentials_exception

    # 1. Decode sub claims from JWT payload
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
        
    user_id_str = payload.get("sub")
    if not user_id_str or not ObjectId.is_valid(user_id_str):
        # We raise a credentials exception instead of continuing to query with invalid ID format
        raise credentials_exception
        
    # 2. Extract database user instance
    db = get_database()
    user_id_obj = ObjectId(user_id_str)
        
    user_doc = await db["users"].find_one({"_id": user_id_obj})
    if user_doc is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
        
    return user_doc
