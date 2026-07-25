from typing import List, Optional
from pydantic import BaseModel, Field
from app.utils.helpers import PyObjectId

class StoreCardResponse(BaseModel):
    """
    Customer-facing response schema for rendering store cards.
    Excludes internal fields like google_rating and review_count, and general hub associations.
    """
    id: PyObjectId = Field(
        alias="_id",
        description="The unique MongoDB ObjectId identifier of the store"
    )
    name: str = Field(
        description="The commercial brand name of the regional retailer"
    )
    city: str = Field(
        description="City where the store outlet is located"
    )
    state: str = Field(
        description="State administrative region of the store location"
    )
    logo_image: Optional[str] = Field(
        default=None,
        description="Public URL pointing to the logo image of the store"
    )
    trust_score: float = Field(
        description="Calculated regional trust and validation score"
    )
    categories: List[str] = Field(
        description="Fashion category tags handled by the store (e.g. Sarees, Ethnic Wear)"
    )
    specialties: List[str] = Field(
        description="A list of specialty tags or signature styles of the store"
    )
    years_in_business: int = Field(
        description="Number of years the store has been active, demonstrating regional trust legacy"
    )
    is_verified: bool = Field(
        default=False,
        description="Indicates whether the store has been verified under Myntra's regional retailer onboarding program"
    )

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "_id": "60c72b2f9b1d8e1f5c6b4567",
                "name": "South India Shopping Mall",
                "city": "Hyderabad",
                "state": "Telangana",
                "logo_image": "https://dummyimage.com/150x150/000/fff&text=South%20India%20Shopping%20Mall",
                "trust_score": 9.5,
                "categories": ["Sarees", "Lehengas", "Ethnic Wear"],
                "specialties": ["Kanchipuram Silk", "Wedding Collection"],
                "years_in_business": 18,
                "is_verified": True
            }
        }
    }

class NearbyStoreResponse(StoreCardResponse):
    """
    Geographically discovered store card schema extending StoreCardResponse with distance in kilometers.
    Excludes internal fields like google_rating and review_count.
    """
    distance_km: float = Field(
        description="Calculated distance in kilometers from the customer's queried coordinates to the store"
    )
    latitude: float = Field(
        description="Geographic latitude coordinate mapping"
    )
    longitude: float = Field(
        description="Geographic longitude coordinate mapping"
    )

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "_id": "60c72b2f9b1d8e1f5c6b4567",
                "name": "South India Shopping Mall",
                "city": "Hyderabad",
                "state": "Telangana",
                "logo_image": "https://dummyimage.com/150x150/000/fff&text=South%20India%20Shopping%20Mall",
                "trust_score": 9.5,
                "categories": ["Sarees", "Lehengas", "Ethnic Wear"],
                "specialties": ["Kanchipuram Silk", "Wedding Collection"],
                "years_in_business": 18,
                "is_verified": True,
                "distance_km": 1.25,
                "latitude": 17.385044,
                "longitude": 78.486671
            }
        }
    }

class StoreDetailsResponse(StoreCardResponse):
    """
    Full profile response schema for a single trusted store.
    Includes location coordinates and address details. Excludes internal scoring parameters.
    """
    banner_image: Optional[str] = Field(
        default=None,
        description="Public URL pointing to the promotional banner of the store"
    )
    description: Optional[str] = Field(
        default=None,
        description="Detailed background narrative, heritage, and brand specialties"
    )
    address: str = Field(
        description="Physical street address details of the store outlet"
    )
    latitude: float = Field(
        description="Geographic latitude coordinate mapping"
    )
    longitude: float = Field(
        description="Geographic longitude coordinate mapping"
    )
    delivery_available: bool = Field(
        default=True,
        description="Indicates whether the store offers delivery service"
    )
    delivery_radius_km: float = Field(
        default=15.0,
        description="Delivery radius threshold in kilometers"
    )
    supported_states: List[str] = Field(
        default_factory=list,
        description="List of states supported by the store for delivery"
    )
    supported_cities: List[str] = Field(
        default_factory=list,
        description="List of cities supported by the store for delivery"
    )

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "_id": "60c72b2f9b1d8e1f5c6b4567",
                "name": "South India Shopping Mall",
                "city": "Hyderabad",
                "state": "Telangana",
                "logo_image": "https://dummyimage.com/150x150/000/fff&text=South%20India%20Shopping%20Mall",
                "banner_image": "https://example.com/banners/sism-hyd.png",
                "trust_score": 9.5,
                "categories": ["Sarees", "Lehengas", "Ethnic Wear"],
                "specialties": ["Kanchipuram Silk", "Wedding Collection"],
                "years_in_business": 18,
                "is_verified": True,
                "description": "South India Shopping Mall offers an unmatched range of silk sarees, designer lehengas, and ethnic fashion.",
                "address": "Kothapet Cross Roads, Hyderabad, Telangana 500035",
                "latitude": 17.385044,
                "longitude": 78.486671
            }
        }
    }

# Backward compatibility mappings for other files/routers if needed
StoreResponse = StoreCardResponse
StoreNearbyResponse = NearbyStoreResponse

class StoreCollectionResponse(BaseModel):
    collection_name: str = Field(description="Name of the dynamically generated shopping collection")
    product_count: int = Field(description="Total number of products in this collection")
    cover_image: Optional[str] = Field(None, description="Image URL of the first available product in this collection")
    description: str = Field(description="Dynamic description of this shopping collection")

class UserDeliveryAddressRequest(BaseModel):
    state: str = Field(..., description="Customer's state administrative region")
    city: str = Field(..., description="Customer's city")
    latitude: Optional[float] = Field(None, description="Customer's latitude coordinate for geographic checks")
    longitude: Optional[float] = Field(None, description="Customer's longitude coordinate for geographic checks")

class DeliveryAvailabilityResponse(BaseModel):
    deliverable: bool = Field(..., description="Indicates whether the store can deliver to this address")
    reason: Optional[str] = Field(None, description="The reason for non-deliverability if applicable")
