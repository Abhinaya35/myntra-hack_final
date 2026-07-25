from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

class ShoppingHubDB(BaseModel):
    id: str = Field(alias="_id", description="Unique string identifier for the shopping hub (e.g. 'hyd')")
    name: str = Field(description="Visual name of the regional fashion destination")
    state: str = Field(description="State administrative region hosting the hub")
    region: str = Field(description="Broader geographic region (e.g., 'South India')")
    description: str = Field(description="A descriptive narrative explaining regional significance")
    banner_image: Optional[str] = Field(default=None, description="URL pointing to banner graphic")
    cover_image: Optional[str] = Field(default=None, description="URL pointing to cover layout design")
    latitude: float = Field(description="Hub center coordinate latitude")
    longitude: float = Field(description="Hub center coordinate longitude")
    featured: bool = Field(default=False, description="Flag designating featured hub status")
    store_count: int = Field(default=0, description="Cached number of active trusted stores currently onboarded in this city")
    categories: List[str] = Field(default=[], description="Broad clothing/fashion categories handled in this hub")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Seeding log timestamp record")

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "_id": "hyd",
                "name": "Hyderabad",
                "state": "Telangana",
                "region": "South India",
                "description": "One of India's largest fashion destinations famous for wedding wear, ethnic collections and family shopping.",
                "latitude": 17.385044,
                "longitude": 78.486671,
                "featured": True,
                "store_count": 5,
                "categories": ["Wedding Wear", "Ethnic Wear", "Sarees", "Kids Fashion", "Accessories"]
            }
        }
    }
