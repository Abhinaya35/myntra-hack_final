from fastapi import APIRouter

router = APIRouter(prefix="/recommendations", tags=["recommendations"])

@router.get("/test")
async def test_endpoint():
    return {"message": "Recommendations Router Working"}
