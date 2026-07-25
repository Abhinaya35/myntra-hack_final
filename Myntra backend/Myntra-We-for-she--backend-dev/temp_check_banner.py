import asyncio, json
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

async def main():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    store = await db.stores.find_one({"name": "RS Brothers"})
    print('Banner image:', store.get('banner_image'))
    client.close()

asyncio.run(main())
