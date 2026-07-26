import asyncio
import json
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

def default_serializer(o):
    if isinstance(o, ObjectId):
        return str(o)
    if hasattr(o, "isoformat"):
        return o.isoformat()
    raise TypeError(f"Object of type {o.__class__.__name__} is not JSON serializable")

async def main():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    p = await db.products.find_one({"_id": "p_0001"})
    with open("db_product.json", "w", encoding="utf-8") as f:
        json.dump(p, f, indent=4, default=default_serializer)
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
