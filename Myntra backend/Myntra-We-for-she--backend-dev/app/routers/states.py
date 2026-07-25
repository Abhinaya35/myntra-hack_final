from fastapi import APIRouter, status
from typing import List
from app.schemas.state import StateCardResponse
from app.services.shopping_hub_service import ShoppingHubService

router = APIRouter(prefix="/states", tags=["states"])

@router.get("", response_model=List[StateCardResponse], status_code=status.HTTP_200_OK)
async def get_states():
    """
    Retrieve all available states that contain Shopping Hubs.
    Used by the frontend to populate the first screen in the location-disabled exploration flow.
    """
    return await ShoppingHubService.get_all_states()
