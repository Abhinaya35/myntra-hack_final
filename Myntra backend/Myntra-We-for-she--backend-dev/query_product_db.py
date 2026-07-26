import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

async def main():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    p = await db.products.find_one({"_id": "p_0001"})
    print("Product p_0001 in DB:")
    if p:
        print(f"Name: {p.get('name')}")
        print(f"Thumbnail: {p.get('thumbnail')}")
        if 'images' in p:
            print(f"Images: {p.get('images')}")
    else:
        print("Product p_0001 not found!")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
