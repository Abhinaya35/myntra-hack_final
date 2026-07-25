from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.utils.helpers import PyObjectId

class AddressDB(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: Optional[PyObjectId] = Field(default=None, alias="userId")
    
    # Structured delivery address fields
    house_number: str = Field(default="")
    street: str = Field(default="")
    landmark: str = Field(default="")
    city: str
    state: str
    pincode: str = Field(default="")
    country: str = Field(default="India")
    
    # Address Management Metadata
    label: Optional[str] = Field(default="Home")
    is_default: bool = Field(default=False, alias="isDefault")
    
    # Formatted address & coordinates
    formatted_address: str
    normalized_key: Optional[str] = Field(default=None, alias="normalizedKey", description="Lowercase space-collapsed pipe-separated normalized unique key")
    coordinate_cache_key: Optional[str] = Field(default=None, alias="coordinateCacheKey", description="Formatted unique key for coordinates index")
    latitude: float
    longitude: float
    display_name: str
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow, alias="createdAt")
    updated_at: datetime = Field(default_factory=datetime.utcnow, alias="updatedAt")

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "_id": "60c72b2f9b1d8e1f5c6b4568",
                "userId": "60c72b2f9b1d8e1f5c6b4569",
                "house_number": "3-5-68/3",
                "street": "XYZ Colony",
                "landmark": "Near Bus Stand",
                "city": "Sangareddy",
                "state": "Telangana",
                "pincode": "502001",
                "country": "India",
                "formatted_address": "3-5-68/3, XYZ Colony, Near Bus Stand, Sangareddy, Telangana, 502001, India",
                "latitude": 17.6252,
                "longitude": 78.0934,
                "display_name": "Sangareddy, Telangana, India",
                "createdAt": "2026-07-22T12:00:00Z",
                "updatedAt": "2026-07-22T12:00:00Z"
            }
        }
    }
