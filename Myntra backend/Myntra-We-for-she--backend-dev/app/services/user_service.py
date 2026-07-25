from datetime import datetime
from typing import List, Dict, Any
from bson import ObjectId

class UserService:
    @staticmethod
    async def get_dummy_user() -> Dict[str, Any]:
        return {
            "_id": ObjectId("60c72b2f9b1d8e1f5c6b4568"),
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "+919876543210",
            "role": "customer",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

    @staticmethod
    async def get_all_dummy_users() -> List[Dict[str, Any]]:
        return [await UserService.get_dummy_user()]
