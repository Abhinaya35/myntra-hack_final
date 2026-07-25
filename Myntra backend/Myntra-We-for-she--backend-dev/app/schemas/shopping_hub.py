from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

class ShoppingHubBase(BaseModel):
    name: str = Field(description="Visual name of the regional fashion destination")
    state: str = Field(description="State administrative region hosting the hub")
    description: str = Field(description="A descriptive narrative explaining regional significance")
    banner_image: Optional[str] = Field(default=None, description="URL pointing to banner graphic")
    cover_image: Optional[str] = Field(default=None, description="URL pointing to cover layout design")
    latitude: float = Field(description="Hub center coordinate latitude")
    longitude: float = Field(description="Hub center coordinate longitude")
    featured: bool = Field(default=False, description="Flag designating featured hub status")
    store_count: int = Field(default=0, description="Cached number of active trusted stores currently onboarded in this city")
    categories: List[str] = Field(default=[], description="Broad clothing/fashion categories handled in this hub")

class ShoppingHubCardResponse(ShoppingHubBase):
    id: str = Field(validation_alias="_id", description="Unique string identifier for the shopping hub (e.g. 'hyd')")

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "id": "hyd",
                "name": "Hyderabad",
                "state": "Telangana",
                "description": "One of India's largest fashion destinations famous for wedding wear, ethnic collections and family shopping.",
                "banner_image": "https://example.com/banners/hubs-hyd.png",
                "cover_image": "https://example.com/covers/hubs-hyd-cover.png",
                "latitude": 17.385044,
                "longitude": 78.486671,
                "featured": True,
                "store_count": 5,
                "categories": ["Wedding Wear", "Ethnic Wear", "Sarees"]
            }
        }
    }

class ShoppingHubDetailsResponse(ShoppingHubCardResponse):
    created_at: datetime = Field(description="Creation metadata timestamp")

class ShoppingHubSearchResponse(ShoppingHubCardResponse):
    relevance_score: Optional[float] = Field(default=None, description="Relevance ranking match score calculated dynamically")
