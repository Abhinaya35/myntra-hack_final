from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.utils.helpers import PyObjectId

class UserDB(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name: str
    email: str
    phone: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[str] = Field(default=None, alias="dateOfBirth")
    role: str = "customer"  # customer, retailer, admin
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "name": "Jane Doe",
                "email": "jane@example.com",
                "phone": "+919876543210",
                "role": "customer"
            }
        }
    }
