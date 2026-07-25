from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.utils.helpers import PyObjectId

class OrderItem(BaseModel):
    product_id: PyObjectId
    quantity: int
    price: float

class OrderDB(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: PyObjectId
    store_id: PyObjectId
    items: List[OrderItem]
    total_amount: float
    status: str = "pending"  # pending, paid, shipped, delivered, cancelled
    shipping_address: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "user_id": "60c72b2f9b1d8e1f5c6b4568",
                "store_id": "60c72b2f9b1d8e1f5c6b4567",
                "items": [
                    {
                        "product_id": "60c72b2f9b1d8e1f5c6b4569",
                        "quantity": 1,
                        "price": 6999.00
                    }
                ],
                "total_amount": 6999.00,
                "status": "pending",
                "shipping_address": "Flat 402, Highrise Apts, Madhapur, Hyderabad, 500081"
            }
        }
    }
