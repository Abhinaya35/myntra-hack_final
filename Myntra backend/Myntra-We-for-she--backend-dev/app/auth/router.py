import logging
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends, status
from pymongo.errors import DuplicateKeyError
from app.auth.schemas import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
    UserProfileResponse,
    UserRegisterResponse
)
from app.auth.models import UserDB
from app.auth.security import hash_password, verify_password, create_access_token
from app.auth.dependencies import get_current_user
from database.database import get_database

logger = logging.getLogger("uvicorn.error")

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post(
    "/register", 
    response_model=UserRegisterResponse, 
    status_code=status.HTTP_201_CREATED, 
    summary="Register user", 
    description="Creates a new customer or retailer account. Email addresses must be unique."
)
async def register_user(payload: UserRegisterRequest):
    """
    Registers a new account. Hashes passwords using Blowfish-based Bcrypt.
    """
    logger.info("[Auth] Registration Request")
    db = get_database()
    
    # 1. Duplicate email verification
    existing = await db["users"].find_one({"email": payload.email})
    if existing:
         logger.warning(f"[Auth] Account creation failed: Email '{payload.email}' already exists.")
         raise HTTPException(
             status_code=status.HTTP_409_CONFLICT,
             detail="Email already registered"
         )
         
    # 2. Hash security password
    hashed_pw = hash_password(payload.password)
    
    # 3. Setup database record
    user_record = UserDB(
        name=payload.name,
        email=payload.email,
        password_hash=hashed_pw,
        role="customer",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    doc = user_record.model_dump(by_alias=True, exclude_none=False)
    if "_id" in doc and doc["_id"] is None:
        del doc["_id"]
        
    try:
        res = await db["users"].insert_one(doc)
        logger.info("[Auth] User Registered")
        
        saved_id = str(res.inserted_id)
        
        # Build lightweight profile info matching outer schemas.py Response models (id and camelCase fields)
        user_profile = UserProfileResponse(
            id=saved_id,
            name=payload.name,
            email=payload.email,
            role="customer",
            createdAt=user_record.created_at
        )
        
        return UserRegisterResponse(
            message="User registered successfully",
            user=user_profile
        )
    except DuplicateKeyError:
         logger.warning(f"[Auth] Concurrent registration hit unique index lock on email '{payload.email}'")
         raise HTTPException(
             status_code=status.HTTP_409_CONFLICT,
             detail="Email already registered"
         )
    except Exception as e:
         logger.error(f"[Auth] Database insert failed: {str(e)}")
         raise HTTPException(
             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
             detail="Internal Server Error during registration"
         )

@router.post(
    "/login", 
    response_model=TokenResponse, 
    status_code=status.HTTP_200_OK, 
    summary="Authenticate user", 
    description=(
        "Validates login credentials and issues a JWT access token.\n\n"
        "### Swagger Authentication Workflow Instructions:\n"
        "1. Submit credentials using this endpoint (**POST /auth/login**).\n"
        "2. Copy the returned value of `access_token` from the response body.\n"
        "3. Click the **Authorize** lock button at the top right of this Swagger page.\n"
        "4. Paste your copied token directly into the **Value** field and click Authorize.\n"
        "5. You can now execute and test all protected endpoints directly from Swagger UI."
    )
)
async def login_user(payload: UserLoginRequest):
    """
    Authenticates user, verifying hashed credentials and outputting a JWT.
    """
    logger.info("[Auth] Login Attempt")
    db = get_database()
    
    # 1. Fetch user by email
    user = await db["users"].find_one({"email": payload.email})
    if not user:
        logger.warning(f"[Auth] Login failed: Email '{payload.email}' not found.")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
        
    # 2. Check hashed password match
    if not verify_password(payload.password, user["password_hash"]):
        logger.warning(f"[Auth] Invalid Password for '{payload.email}'")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
        
    # 3. Create claims payload
    claims = {
        "sub": str(user["_id"]),
        "email": user["email"],
        "role": user.get("role", "customer")
    }
    
    # 4. Generate JWT payload token
    token, expires_in = create_access_token(claims)
    logger.info("[Auth] Login Successful")
    
    # Build lightweight profile info matching outer schemas.py Response models (id and camelCase fields)
    user_profile = UserProfileResponse(
        id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        role=user.get("role", "customer"),
        createdAt=user.get("created_at") or user.get("createdAt") or datetime.utcnow()
    )
    
    return TokenResponse(
        message="Login successful",
        access_token=token,
        token_type="Bearer",
        expires_in=expires_in,
        user=user_profile
    )

@router.get(
    "/me", 
    response_model=UserProfileResponse, 
    status_code=status.HTTP_200_OK, 
    summary="Get user profile", 
    description="Resolves and returns profile details for the currently authenticated User."
)
async def resolve_me(current_user: dict = Depends(get_current_user)):
    """
    Resolves currently authenticated scope token profile.
    """
    return UserProfileResponse(
        id=str(current_user["_id"]),
        name=current_user["name"],
        email=current_user["email"],
        role=current_user.get("role", "customer"),
        createdAt=current_user.get("created_at") or current_user.get("createdAt") or datetime.utcnow()
    )
