from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/test")
async def test_endpoint():
    return {"message": "Users Router Working"}
