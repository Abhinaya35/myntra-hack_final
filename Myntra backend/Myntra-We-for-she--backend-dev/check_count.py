import motor.motor_asyncio
import asyncio

async def main():
    client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
    db = client.myntra_hackathon
    stores_count = await db.stores.count_documents({})
    products_count = await db.products.count_documents({})
    hubs_count = await db.shopping_hubs.count_documents({})
    print("---------------------------------")
    print(f"MongoDB Stores count:   {stores_count}")
    print(f"MongoDB Products count: {products_count}")
    print(f"MongoDB Hubs count:     {hubs_count}")
    print("---------------------------------")

if __name__ == "__main__":
    asyncio.run(main())
