from typing import Dict, Any
from bson import ObjectId
from app.services.product_service import ProductService

class RecommendationService:
    @staticmethod
    async def get_dummy_recommendations(user_id: str, limit: int) -> Dict[str, Any]:
        dummy_product = await ProductService.get_dummy_product()
        return {
            "user_id": user_id,
            "recommended_products": [dummy_product],
            "source": "dummy_collaborative_filtering"
        }
