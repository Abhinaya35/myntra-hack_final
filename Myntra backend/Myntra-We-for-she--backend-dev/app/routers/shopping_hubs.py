from fastapi import APIRouter, Query, HTTPException, status
from typing import List, Optional
from app.schemas.shopping_hub import (
    ShoppingHubCardResponse,
    ShoppingHubDetailsResponse,
    ShoppingHubSearchResponse
)
from app.schemas.store import StoreCardResponse
from app.services.shopping_hub_service import ShoppingHubService

router = APIRouter(prefix="/shopping-hubs", tags=["shopping-hubs"])

@router.get("", response_model=List[ShoppingHubCardResponse], status_code=status.HTTP_200_OK)
async def get_shopping_hubs(
    state: Optional[str] = Query(
        None,
        description="Filter hubs within a specific state administrative area. Example: 'Telangana'"
    ),
    featured: Optional[bool] = Query(
        None,
        description="Filter by featured hubs status"
    ),
    search: Optional[str] = Query(
        None,
        description="Perform case-insensitive partial substring search across name, state, description, and categories"
    )
):
    """
    Retrieve list of curated regional fashion destinations (Shopping Hubs).
    Supports filtering by state and featured status, or searching using partial substring matches.
    """
    if search:
        return await ShoppingHubService.search_hubs(query=search, state=state)
    return await ShoppingHubService.get_featured_hubs(state=state, featured=featured)

@router.get("/search", response_model=List[ShoppingHubSearchResponse], status_code=status.HTTP_200_OK)
async def search_shopping_hubs(
    query: str = Query(
        ...,
        description="Search term matched against hub name, state, description, or categories."
    )
):
    """
    Search across all Shopping Hub destinations.
    Matches partially and case-insensitively using regex matching support.
    """
    return await ShoppingHubService.search_hubs(query=query)

@router.get("/{hubId}", response_model=ShoppingHubDetailsResponse, status_code=status.HTTP_200_OK)
async def get_hub_by_id(
    hubId: str
):
    """
    Retrieve full details (including coordinates, cover images, and category list) of a specific Shopping Hub.
    """
    hub = await ShoppingHubService.get_hub_by_id(hubId)
    if not hub:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shopping Hub with ID '{hubId}' not found."
        )
    return hub

@router.get("/{hubId}/stores", response_model=List[StoreCardResponse], status_code=status.HTTP_200_OK)
async def get_hub_stores(
    hubId: str
):
    """
    Retrieve all trusted regional retail stores registered within a given Shopping Hub.
    Protects private rating metrics internally and yields standard customer-facing store card summaries.
    """
    hub = await ShoppingHubService.get_hub_by_id(hubId)
    if not hub:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shopping Hub with ID '{hubId}' not found."
        )
    return await ShoppingHubService.get_hub_stores(hubId)
