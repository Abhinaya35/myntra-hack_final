from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.utils.helpers import PyObjectId

class StoreDB(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    shopping_hub_id: Optional[str] = Field(default=None, description="String ID of the associated Shopping Hub")
    name: str
    city: str
    state: str
    latitude: float
    longitude: float
    address: str
    description: Optional[str] = None
    categories: List[str]
    banner_image: Optional[str] = None
    google_rating: float
    review_count: int
    trust_score: float
    years_in_business: int
    is_verified: bool = False
    delivery_available: bool = True
    delivery_radius_km: float = 15.0
    supported_states: List[str] = Field(default_factory=list)
    supported_cities: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "name": "South India Shopping Mall",
                "city": "Hyderabad",
                "state": "Telangana",
                "latitude": 17.385044,
                "longitude": 78.486671,
                "address": "Kothapet Cross Roads, Hyderabad, Telangana 500035",
                "google_rating": 4.2,
                "review_count": 8900,
                "trust_score": 9.5,
                "years_in_business": 18,
                "categories": ["Sarees", "Lehengas", "Ethnic Wear"],
                "banner_image": "https://example.com/banners/sism-hyd.png",
                "description": "South India Shopping Mall offers an unmatched range of silk sarees, designer lehengas, and ethnic fashion.",
                "is_verified": True
            }
        }
    }
