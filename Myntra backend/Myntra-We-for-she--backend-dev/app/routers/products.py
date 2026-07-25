from fastapi import APIRouter, Query, status, HTTPException
from typing import Optional
from app.schemas.product import ProductListResponse, ProductDetailsResponse, SimilarRecommendationsResponse, StoreRecommendationsResponse
from app.services.product_service import ProductService
from bson import ObjectId

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/test")
async def test_endpoint():
    return {"message": "Products Router Working"}

@router.get("", response_model=ProductListResponse, status_code=status.HTTP_200_OK)
async def get_products(
    search: Optional[str] = Query(None, description="Case-insensitive spelling-corrected searching"),
    store_ids: Optional[str] = Query(None, description="Comma-separated store ObjectIds"),
    category: Optional[str] = Query(None, description="Category filter (e.g. Sarees)"),
    gender: Optional[str] = Query(None, description="Gender filter (e.g. Women)"),
    occasion: Optional[str] = Query(None, description="Occasion filter (e.g. Casual)"),
    price_min: Optional[float] = Query(None, description="Minimum price filter"),
    price_max: Optional[float] = Query(None, description="Maximum price filter"),
    available: Optional[bool] = Query(None, description="Filter by availability status"),
    sort: str = Query("relevance", description="Sorting criteria (relevance, price_low_to_high, price_high_to_low, rating, discount, newest)")
):
    """
    Explore the global product catalog. Supports synonym expansions and configurable sorting.
    """
    products = await ProductService.get_products(
        search=search,
        store_ids=store_ids,
        category=category,
        gender=gender,
        occasion=occasion,
        price_min=price_min,
        price_max=price_max,
        available=available,
        sort=sort
    )
    return {
        "products": products,
        "total": len(products)
    }

@router.get("/{productId}", response_model=ProductDetailsResponse, status_code=status.HTTP_200_OK)
async def get_product_by_id(productId: str):
    """
    Retrieve aggregated Details of a Product, including its parent Store metadata, specifications,
    rating distributions, sizes, and colors variant inventory breakdown.
    """
    is_hex_id = ObjectId.is_valid(productId)
    is_custom_id = productId.startswith("p_") and productId[2:].isdigit()
    if not (is_hex_id or is_custom_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid product ID format: {productId}. Expected format 'p_xxxx' or ObjectId."
        )
        
    details = await ProductService.get_product_details(productId)
    if not details:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product not found with ID: {productId}"
        )
        
    return details

@router.get("/{productId}/recommendations/similar", response_model=SimilarRecommendationsResponse, status_code=status.HTTP_200_OK)
async def get_similar_recommendations(productId: str, limit: int = Query(10, description="Number of recommendations to fetch")):
    """
    Get products most similar to current product across stores.
    """
    is_hex_id = ObjectId.is_valid(productId)
    is_custom_id = productId.startswith("p_") and productId[2:].isdigit()
    if not (is_hex_id or is_custom_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid product ID format: {productId}. Expected format 'p_xxxx' or ObjectId."
        )

    # Validate product exists first
    product_exists = await ProductService.get_product_details(productId)
    if not product_exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product not found with ID: {productId}"
        )

    recs = await ProductService.get_similar_recommendations(productId, limit)
    return {"products": recs}

@router.get("/{productId}/recommendations/store", response_model=StoreRecommendationsResponse, status_code=status.HTTP_200_OK)
async def get_store_recommendations(productId: str, limit: int = Query(10, description="Number of recommendations to fetch")):
    """
    Get additional products from same Regional Store preserving style/category intent.
    """
    is_hex_id = ObjectId.is_valid(productId)
    is_custom_id = productId.startswith("p_") and productId[2:].isdigit()
    if not (is_hex_id or is_custom_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid product ID format: {productId}. Expected format 'p_xxxx' or ObjectId."
        )

    # Validate product exists first
    product_exists = await ProductService.get_product_details(productId)
    if not product_exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product not found with ID: {productId}"
        )

    return await ProductService.get_store_recommendations(productId, limit)
