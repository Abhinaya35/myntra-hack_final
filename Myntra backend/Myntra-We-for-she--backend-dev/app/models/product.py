from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from app.utils.helpers import PyObjectId

class ProductDB(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    store_id: PyObjectId = Field(description="ObjectId referencing the store that owns this product")
    name: str = Field(description="Visual name of the product")
    description: Optional[str] = Field(default=None, description="Detailed text describing the product")
    price: float = Field(description="Retail price before discount")
    discount_price: Optional[float] = Field(default=None, description="Promotional sale price (optional)")
    discount_percentage: Optional[float] = Field(default=None, description="Calculated discount percentage (optional)")
    category: str = Field(description="Primary category, e.g. Sarees, Shirts")
    sub_category: Optional[str] = Field(default=None, description="Sub-category, e.g. Silk Sarees, Cotton Shirts")
    brand: str = Field(description="Brand or designer name")
    gender: str = Field(description="Target gender: Men, Women, Unisex, Kids")
    occasion: str = Field(description="Occasion category: Ethnic, Casual, Festive, Formal")
    material: str = Field(description="Main textile fabric: Cotton, Silk, Denim")
    sizes: List[Dict[str, Any]] = Field(default=[], description="Available standard sizes list")
    colors: List[Dict[str, Any]] = Field(default=[], description="Available product color metadata list")
    specifications: Dict[str, str] = Field(default={}, description="Garment specifications key-value map")
    stock_quantity: int = Field(default=10, description="Available inventory count")
    rating: float = Field(default=4.0, description="Average review rating out of 5")
    review_count: int = Field(default=0, description="Number of customer reviews submitted")
    thumbnail: str = Field(description="URL link to product main thumbnail image")
    images: List[str] = Field(default=[], description="List of URL images for product carousel")
    is_available: bool = Field(default=True, description="Flag representing whether product is active for purchase")
    is_featured: bool = Field(default=False, description="Flag representing featured promotion badge placement")
    origin: Optional[str] = Field(default=None, description="Craft or textile origin")
    is_gi_certified: bool = Field(default=False, description="Flag representing Geographical Indication certification status")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Creation timestamp")

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "store_id": "60c72b2f9b1d8e1f5c6b4567",
                "name": "Heritage Silk Saree",
                "description": "Premium hand-woven silk saree directly from Coimbatore weavers.",
                "price": 8500.0,
                "discount_price": 5999.0,
                "discount_percentage": 29.42,
                "category": "Sarees",
                "sub_category": "Silk Sarees",
                "brand": "Coimbatore Weavers Co.",
                "gender": "Women",
                "occasion": "Ethnic Wear",
                "material": "Silk",
                "sizes": ["FS"],
                "colors": ["Magenta Red", "Golden Ochre"],
                "stock_quantity": 25,
                "rating": 4.6,
                "review_count": 87,
                "thumbnail": "https://example.com/images/saree-thumb.png",
                "images": ["https://example.com/images/saree-full.png"],
                "is_available": True,
                "is_featured": True
            }
        }
    }
