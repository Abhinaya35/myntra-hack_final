import logging
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException, status
from database.database import get_database

logger = logging.getLogger("uvicorn.error")

class ProfileService:
  @staticmethod
  async def get_profile(user_doc: dict) -> dict:
    """
    Parses a user database document and returns profile fields in the format required by the API.
    """
    gender = user_doc.get("gender")
    
    # Check both case formats since field has been aliased
    dob = user_doc.get("dateOfBirth") or user_doc.get("date_of_birth")

    return {
      "full_name": user_doc.get("name") or "",
      "email": user_doc.get("email") or "",
      "gender": gender or None,
      "date_of_birth": dob or None
    }

  @staticmethod
  async def update_profile(user_id: ObjectId, full_name: str, email: str, gender: str = None, date_of_birth: str = None) -> dict:
    """
    Validates and updates user profile data, keeping phone read-only and checking for email collision.
    """
    db = get_database()

    # 1. Verify email uniqueness if being updated
    existing = await db["users"].find_one({
      "email": email.strip().lower(),
      "_id": {"$ne": user_id}
    })
    
    if existing:
      logger.warning(f"[Profile] Update failed: Email '{email}' is already registered by another account.")
      raise HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail="Email already registered by another user"
      )

    # 2. Re-verify user exists
    user_doc = await db["users"].find_one({"_id": user_id})
    if not user_doc:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User account not found"
      )

    # 3. Perform update in MongoDB
    now = datetime.utcnow()
    update_data = {
      "name": full_name.strip(),
      "email": email.strip().lower(),
      "gender": gender or None,
      "dateOfBirth": date_of_birth or None,  # Dump matching alias format in UserDB
      "updatedAt": now,
      "updated_at": now
    }

    await db["users"].update_one(
      {"_id": user_id},
      {"$set": update_data}
    )

    logger.info(f"[Profile] User profile {user_id} updated successfully")

    # 4. Fetch and return fresh updated profile
    updated_doc = await db["users"].find_one({"_id": user_id})
    return await ProfileService.get_profile(updated_doc)
