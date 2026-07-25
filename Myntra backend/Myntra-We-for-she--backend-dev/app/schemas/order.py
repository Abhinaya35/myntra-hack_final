from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.utils.helpers import PyObjectId

class OrderItemBase(BaseModel):
    product_id: PyObjectId
    quantity: int
    price: float

class OrderBase(BaseModel):
    user_id: PyObjectId
    store_id: PyObjectId
    items: List[OrderItemBase]
    total_amount: float
    status: str = "pending"
    shipping_address: str

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    shipping_address: Optional[str] = None

class OrderResponse(OrderBase):
    id: PyObjectId = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "_id": "60c72b2f9b1d8e1f5c6b4560",
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
                "shipping_address": "Flat 402, Highrise Apts, Madhapur, Hyderabad, 500081",
                "created_at": "2026-07-16T19:19:37",
                "updated_at": "2026-07-16T19:19:37"
            }
        }
    }
