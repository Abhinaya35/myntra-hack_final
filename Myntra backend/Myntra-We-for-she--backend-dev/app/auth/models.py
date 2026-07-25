from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.utils.helpers import PyObjectId

class UserDB(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name: str = Field(..., description="User's full name")
    email: str = Field(..., description="User's unique email address")
    password_hash: str = Field(..., description="Bcrypt security hashed password")
    role: str = Field(default="customer", description="User access privilege level (e.g. customer, retailer, admin)")
    created_at: datetime = Field(default_factory=datetime.utcnow, alias="createdAt")
    updated_at: datetime = Field(default_factory=datetime.utcnow, alias="updatedAt")

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "_id": "60c72b2f9b1d8e1f5c6b4568",
                "name": "Jane Doe",
                "email": "jane@example.com",
                "password_hash": "$2b$12$Z/H7n1yG...",
                "role": "customer",
                "createdAt": "2026-07-22T13:00:00Z",
                "updatedAt": "2026-07-22T13:00:00Z"
            }
        }
    }
