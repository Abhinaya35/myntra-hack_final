from typing import Optional
from pydantic import BaseModel, Field
from app.utils.helpers import PyObjectId

class UserBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    role: str = "customer"

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None

class UserResponse(UserBase):
    id: PyObjectId = Field(alias="_id")

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "_id": "60c72b2f9b1d8e1f5c6b4568",
                "name": "Jane Doe",
                "email": "jane@example.com",
                "phone": "+919876543210",
                "role": "customer"
            }
        }
    }
