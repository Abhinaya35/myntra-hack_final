import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

async def main():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    
    hubs = await db.shopping_hubs.count_documents({})
    stores = await db.stores.count_documents({})
    products = await db.products.count_documents({})
    
    print(f"MongoDB Counts:")
    print(f"  Shopping Hubs: {hubs}")
    print(f"  Stores: {stores}")
    print(f"  Products: {products}")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
