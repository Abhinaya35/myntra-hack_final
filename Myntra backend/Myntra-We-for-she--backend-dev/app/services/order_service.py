from datetime import datetime
from typing import List, Dict, Any
from bson import ObjectId

class OrderService:
    @staticmethod
    async def get_dummy_order() -> Dict[str, Any]:
        return {
            "_id": ObjectId("60c72b2f9b1d8e1f5c6b4560"),
            "user_id": ObjectId("60c72b2f9b1d8e1f5c6b4568"),
            "store_id": ObjectId("60c72b2f9b1d8e1f5c6b4567"),
            "items": [
                {
                    "product_id": ObjectId("60c72b2f9b1d8e1f5c6b4569"),
                    "quantity": 1,
                    "price": 6999.00
                }
            ],
            "total_amount": 6999.00,
            "status": "pending",
            "shipping_address": "Flat 402, Highrise Apts, Madhapur, Hyderabad, 500081",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

    @staticmethod
    async def get_all_dummy_orders() -> List[Dict[str, Any]]:
        return [await OrderService.get_dummy_order()]
