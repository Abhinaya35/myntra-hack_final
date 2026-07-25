from typing import List, Optional
from pydantic import BaseModel, Field
from app.utils.helpers import PyObjectId

class ProductBase(BaseModel):
    store_id: PyObjectId = Field(description="The unique store ObjectId identifier")
    name: str = Field(description="Visual name of the product")
    price: float = Field(description="Retail price before discount")
    discount_price: Optional[float] = Field(default=None, description="Promotional sale price (optional)")
    discount_percentage: Optional[float] = Field(default=None, description="Calculated discount percentage (optional)")
    category: str = Field(description="Primary category, e.g. Sarees, Shirts")
    brand: str = Field(description="Brand or retailer designer name")
    is_available: bool = Field(default=True, description="Flag representing whether product is active for purchase")

class ProductCardResponse(ProductBase):
    """
    Lightweight Product representation optimized for product grids.
    Excludes heavyweight description, sizes, images list and created_at metadata.
    """
    id: str = Field(validation_alias="_id", description="Unique string representation of the product ObjectId")
    thumbnail: str = Field(description="Main display image thumbnail URL")
    rating: float = Field(default=4.0, description="Average review rating")

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "id": "60c72b2f9b1d8e1f5c6b4569",
                "store_id": "60c72b2f9b1d8e1f5c6b4567",
                "name": "Heritage Silk Saree",
                "price": 8500.0,
                "discount_price": 5999.0,
                "discount_percentage": 29.42,
                "category": "Sarees",
                "brand": "South India Shopping Mall",
                "is_available": True,
                "thumbnail": "https://example.com/images/saree-thumb.png",
                "rating": 4.6
            }
        }
    }

class ProductSearchResponse(ProductCardResponse):
    """
    Product Card response containing relevance match ranking scores.
    """
    relevance_score: Optional[float] = Field(default=None, description="DYNAMIC relevance sorting match rank score")

class ProductListResponse(BaseModel):
    """
    Paginated browse catalog payload wrapping cards array and total count metadata.
    """
    products: List[ProductCardResponse] = Field(description="List of product cards matching query criteria")
    total: int = Field(description="Total number of products matching query criteria")

    model_config = {
        "json_schema_extra": {
            "example": {
                "products": [
                    {
                        "id": "60c72b2f9b1d8e1f5c6b4569",
                        "store_id": "60c72b2f9b1d8e1f5c6b4567",
                        "name": "Heritage Silk Saree",
                        "price": 8500.0,
                        "discount_price": 5999.0,
                        "discount_percentage": 29.42,
                        "category": "Sarees",
                        "brand": "South India Shopping Mall",
                        "is_available": True,
                        "thumbnail": "https://example.com/images/saree-thumb.png",
                        "rating": 4.6
                    }
                ],
                "total": 1
            }
        }
    }

from datetime import datetime
from typing import Dict

class ProductSize(BaseModel):
    size: str = Field(description="Size identifier (e.g. M, XL, L)")
    in_stock: bool = Field(default=True, description="Availability index")

class ProductColor(BaseModel):
    name: str = Field(description="Visual name of color (e.g. Vermilion Red)")
    hex: str = Field(description="Hexadecimal color descriptor (e.g. #E34234)")
    thumbnail: str = Field(description="Variant display thumbnail image URL")

class RatingSummary(BaseModel):
    average_rating: float = Field(description="Average customer rating")
    review_count: int = Field(description="Total reviews count")
    rating_distribution: Dict[str, int] = Field(description="Reviews breakdown by star ratings (1 to 5 Stars)")

class StoreSummary(BaseModel):
    id: str = Field(validation_alias="_id", description="Unique store ObjectId representation")
    name: str = Field(description="Store name")
    shopping_hub: Optional[str] = Field(default=None, description="Shopping Hub name")
    city: str = Field(description="Store Address City location")
    google_rating: float = Field(description="Google maps listing rating")
    years_in_business: int = Field(description="Merchant operational history age in years")
    description: Optional[str] = Field(default=None, description="About info")
    is_verified: bool = Field(default=False, description="Verification badge")
    specialties: List[str] = Field(default_factory=list, description="Fashion domain niches (chips)")
    logo_image: Optional[str] = Field(default=None, description="Merchant profile image URL")
    banner_image: Optional[str] = Field(default=None, description="Outlet banner image URL")
    address: str = Field(description="Full mapped address location")
    latitude: float = Field(description="GIS coordinate lat")
    longitude: float = Field(description="GIS coordinate lng")

    model_config = {
        "populate_by_name": True
    }

class ProductDetailsInfo(BaseModel):
    id: str = Field(validation_alias="_id", description="Product unique identifier")
    store_id: str = Field(description="Unique store ID")
    name: str = Field(description="Visual name of the product")
    description: Optional[str] = Field(default=None, description="Detailed product description text")
    category: str = Field(description="Primary category")
    sub_category: Optional[str] = Field(default=None, description="Sub-category")
    gender: str = Field(description="Target gender demographics")
    occasion: Optional[str] = Field(default=None, description="Garment wear event context")
    material: Optional[str] = Field(default=None, description="Tex textile fabric")
    is_available: bool = Field(default=True, description="Availability flag")
    stock_quantity: int = Field(default=10, description="Available stock quantity count")
    created_at: datetime = Field(description="Timestamp of garment entry")
    thumbnail: str = Field(description="Main photo thumbnail URL")
    images: List[str] = Field(default_factory=list, description="Mock gallery photo URLs list")

    model_config = {
        "populate_by_name": True
    }

class ProductPricingInfo(BaseModel):
    price: float = Field(description="Retail price before markdowns")
    discount_price: Optional[float] = Field(default=None, description="Current promotional sale price value")
    discount_percentage: Optional[float] = Field(default=None, description="Calculated sale markdown percentage")

class ProductVariantsInfo(BaseModel):
    sizes: List[ProductSize] = Field(default_factory=list, description="Available catalog sizes list details")
    colors: List[ProductColor] = Field(default_factory=list, description="Garment options color variants details")

class ProductDetailsResponse(BaseModel):
    product: ProductDetailsInfo
    pricing: ProductPricingInfo
    variants: ProductVariantsInfo
    specifications: Dict[str, str] = Field(default_factory=dict, description="Garment details key-value specifications map")
    ratings: RatingSummary = Field(description="Ratings distribution count maps and average star scores")
    store: Optional[StoreSummary] = Field(default=None, description="Store summary trusted details and metrics")

    model_config = {
        "populate_by_name": True
    }

class RecommendedProductCardResponse(ProductCardResponse):
    """
    Lightweight Product Card extended with a recommendation context reason.
    """
    recommendation_reason: str = Field(description="Explanatory reason why this product was recommended")

class SimilarRecommendationsResponse(BaseModel):
    products: List[RecommendedProductCardResponse] = Field(default_factory=list, description="Top similar products list")

class StoreRecommendationsResponse(BaseModel):
    section_title: str = Field(description="Contextual title mapping store name and query intent")
    products: List[RecommendedProductCardResponse] = Field(default_factory=list, description="Similar products from same store")

