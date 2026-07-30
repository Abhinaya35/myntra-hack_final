import asyncio
import json
import urllib.request
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

async def main():
    # 1. Load from products.json
    with open("seed/products.json", "r", encoding="utf-8") as f:
        products = json.load(f)
    json_prod = next(p for p in products if p.get("_id") == "p_0001")
    print("=== JSON Seed (products.json) ===")
    print("  Name:", json_prod.get("name"))
    print("  Thumbnail:", json_prod.get("thumbnail"))
    print("  Images:", json_prod.get("images"))
    print("  Price:", json_prod.get("price"))
    print("  Rating:", json_prod.get("rating"))

    # 2. Query MongoDB
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    db_prod = await db.products.find_one({"_id": "p_0001"})
    print("\n=== MongoDB database ===")
    if db_prod:
         print("  Name:", db_prod.get("name"))
         print("  Thumbnail:", db_prod.get("thumbnail"))
         print("  Images:", db_prod.get("images"))
         print("  Price:", db_prod.get("price"))
         print("  Rating:", db_prod.get("rating"))
    else:
         print("  Not found in MongoDB!")
    client.close()

    # 3. Query Backend API
    try:
        url = "http://localhost:8000/products/p_0001"
        res = urllib.request.urlopen(url).read().decode('utf-8')
        api_data = json.loads(res)
        api_prod = api_data.get("product", {})
        print("\n=== Backend API (GET /products/p_0001) ===")
        print("  Name:", api_prod.get("name"))
        print("  Thumbnail:", api_prod.get("thumbnail"))
        print("  Images:", api_prod.get("images"))
        print("  Price:", api_prod.get("price"))
        print("  Rating:", api_prod.get("rating")) # Wait, ratings are inside api_data.ratings
        print("  Ratings Block:", api_data.get("ratings"))
    except Exception as e:
        print("\n=== Backend API Error ===")
        print("  Failed:", e)

if __name__ == "__main__":
    asyncio.run(main())
