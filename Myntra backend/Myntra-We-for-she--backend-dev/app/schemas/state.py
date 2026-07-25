from pydantic import BaseModel, Field

class StateCardResponse(BaseModel):
    """
    Lightweight state representation used by the frontend to populate
    the initial Fashion Destination selection directory hierarchy.
    """
    id: str = Field(
        description="Lowercase, hyphenated string identifier of the state (e.g. 'telangana')"
    )
    name: str = Field(
        description="Proper capitalized title of the state (e.g. 'Telangana')"
    )
    image: str = Field(
        description="Scenic, curation-themed display image URL visual mapping for the state card"
    )
    shopping_hub_count: int = Field(
        description="Number of verified active regional Fashion Destination Hubs hosted inside this state"
    )

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "id": "telangana",
                "name": "Telangana",
                "image": "https://example.com/states/telangana.png",
                "shopping_hub_count": 3
            }
        }
    }
