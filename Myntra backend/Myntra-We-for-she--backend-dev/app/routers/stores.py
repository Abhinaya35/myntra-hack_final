from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Optional, Union
from app.schemas.store import StoreResponse, StoreNearbyResponse, StoreDetailsResponse, StoreCollectionResponse, UserDeliveryAddressRequest, DeliveryAvailabilityResponse
from app.schemas.product import ProductCardResponse
from app.services.store_service import StoreService
from app.services.product_service import ProductService

router = APIRouter(prefix="/stores", tags=["stores"])

@router.get("", response_model=List[StoreResponse], status_code=status.HTTP_200_OK)
async def get_stores():
    """
    Get all trusted regional stores.
    """
    return await StoreService.get_all_stores()

@router.get("/search", response_model=List[Union[StoreNearbyResponse, StoreResponse]], status_code=status.HTTP_200_OK)
async def search_stores(query: str, latitude: Optional[float] = None, longitude: Optional[float] = None):
    """
    Search stores by store name, city, state, categories or description with relevance ranking.
    """
    return await StoreService.search_stores(query, latitude, longitude)

@router.get("/nearby", response_model=List[StoreNearbyResponse], status_code=status.HTTP_200_OK)
async def get_nearby_stores(latitude: float, longitude: float, radius: float):
    """
    Find stores within the given radius (in km) sorted by Trust Score (descending) and Distance (ascending).
    """
    return await StoreService.get_nearby_stores(latitude, longitude, radius)

@router.get("/{id}", response_model=StoreDetailsResponse, status_code=status.HTTP_200_OK)
async def get_store_by_id(id: str):
    """
    Get a single trusted store by its MongoDB ObjectId.
    """
    store = await StoreService.get_store_by_id(id)
    if not store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Store not found with id {id}"
        )
    return store

@router.get("/{storeId}/products", response_model=List[ProductCardResponse], status_code=status.HTTP_200_OK)
async def get_store_products(
    storeId: str,
    category: Optional[str] = Query(None, description="Category filter (e.g. Sarees)"),
    gender: Optional[str] = Query(None, description="Gender filter (e.g. Women)"),
    occasion: Optional[str] = Query(None, description="Occasion filter (e.g. Casual)"),
    price_min: Optional[float] = Query(None, description="Minimum price filter"),
    price_max: Optional[float] = Query(None, description="Maximum price filter"),
    available: Optional[bool] = Query(None, description="Filter by availability status"),
    sort: str = Query("relevance", description="Sorting criteria (relevance, price_low_to_high, price_high_to_low, rating, discount, newest)")
):
    """
    Retrieve lightweight Product Cards belonging to the specified Store ID, with optional filters.
    """
    store = await StoreService.get_store_by_id(storeId)
    if not store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Store not found with id {storeId}"
        )
    return await ProductService.get_store_products(
        store_id=storeId,
        category=category,
        gender=gender,
        occasion=occasion,
        price_min=price_min,
        price_max=price_max,
        available=available,
        sort=sort
    )

@router.get("/{storeId}/collections", response_model=List[StoreCollectionResponse], status_code=status.HTTP_200_OK)
async def get_store_collections(storeId: str):
    """
    Get dynamically generated shopping collections for the specified Store ID.
    """
    # Verify store exists
    store = await StoreService.get_store_by_id(storeId)
    if not store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Store not found with id {storeId}"
        )
    return await StoreService.get_store_collections(storeId)

@router.post("/{storeId}/check-delivery", response_model=DeliveryAvailabilityResponse, status_code=status.HTTP_200_OK)
async def check_store_delivery(storeId: str, address: UserDeliveryAddressRequest):
    """
    Validate deliverability of user address parameters relative to selected store.
    """
    store = await StoreService.get_store_by_id(storeId)
    if not store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Store not found with id {storeId}"
        )
    result = await StoreService.check_delivery_availability(storeId, address.model_dump())
    return result




