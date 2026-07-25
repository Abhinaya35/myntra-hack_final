from fastapi import APIRouter

router = APIRouter(prefix="/orders", tags=["orders"])

@router.get("/test")
async def test_endpoint():
    return {"message": "Orders Router Working"}
