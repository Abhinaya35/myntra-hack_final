from typing import List
from pydantic import BaseModel
from app.schemas.product import ProductResponse

class RecommendationQuery(BaseModel):
    user_id: str
    limit: int = 10

class RecommendationResponse(BaseModel):
    user_id: str
    recommended_products: List[ProductResponse]
    source: str = "dummy_algorithm"  # placeholder algorithm description
