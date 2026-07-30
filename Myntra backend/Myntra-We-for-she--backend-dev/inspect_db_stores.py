import asyncio
import json
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

async def main():
    with open("seed/stores.json", "r", encoding="utf-8") as f:
        stores = json.load(f)
    print(f"Loaded {len(stores)} stores from seed/stores.json")
    first_store = stores[0]
    print("First store in stores.json:")
    print("  Name:", first_store.get("name"))
    print("  City:", first_store.get("city"))
    print("  Logo Image:", first_store.get("logo_image"))
    print("  Banner Image:", first_store.get("banner_image"))

    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    
    db_store = await db.stores.find_one({"name": first_store["name"], "city": first_store["city"]})
    print("\nDatabase store found:")
    if db_store:
        print("  _id:", db_store.get("_id"))
        print("  Name:", db_store.get("name"))
        print("  City:", db_store.get("city"))
        print("  Logo Image:", db_store.get("logo_image"))
        print("  Banner Image:", db_store.get("banner_image"))
        print("  Other fields in DB:", list(db_store.keys()))
    else:
        print("  Not found in DB!")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
