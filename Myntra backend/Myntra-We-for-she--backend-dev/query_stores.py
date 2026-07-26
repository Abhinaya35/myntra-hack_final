import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

async def main():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    count = await db.stores.count_documents({})
    print("Total stores in DB:", count)
    
    stores = await db.stores.find({"city": "Karimnagar"}).to_list(100)
    print("Found stores in Karimnagar:")
    for s in stores:
         print(f"Name: {s.get('name')}")
         print(f"  Logo: {s.get('logo_image')}")
         print(f"  Banner: {s.get('banner_image')}")
         print(f"  Verified: {s.get('is_verified')}")
         print(f"  Specialties: {s.get('specialties')}")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
