import logging
from fastapi import APIRouter, Depends, status
from bson import ObjectId
from app.auth.dependencies import get_current_user
from app.schemas.profile import ProfileResponse, ProfileUpdateRequest
from app.services.profile_service import ProfileService

logger = logging.getLogger("uvicorn.error")

router = APIRouter(prefix="/profile", tags=["profile"])

@router.get(
  "", 
  response_model=ProfileResponse, 
  status_code=status.HTTP_200_OK, 
  summary="Get current user profile", 
  description="Resolves JWT token to fetch the authenticated user's profile info."
)
async def get_user_profile(current_user: dict = Depends(get_current_user)):
  """
  Retrieves profile information from the authenticated user's current session.
  """
  logger.info(f"[Profile] GET request for user: {current_user.get('_id')}")
  profile = await ProfileService.get_profile(current_user)
  return profile

@router.put(
  "", 
  response_model=ProfileResponse, 
  status_code=status.HTTP_200_OK, 
  summary="Update current user profile", 
  description="Updates editable profile details (Full Name, email, gender, date_of_birth)."
)
async def update_user_profile(
  payload: ProfileUpdateRequest, 
  current_user: dict = Depends(get_current_user)
):
  """
  Modifies profile attributes for the active authenticated user session.
  """
  user_id = current_user.get("_id")
  if isinstance(user_id, str):
    user_id = ObjectId(user_id)
    
  logger.info(f"[Profile] PUT request to update profile for user: {user_id}")
  
  updated_profile = await ProfileService.update_profile(
    user_id=user_id,
    full_name=payload.full_name,
    email=payload.email,
    gender=payload.gender,
    date_of_birth=payload.date_of_birth
  )
  return updated_profile
