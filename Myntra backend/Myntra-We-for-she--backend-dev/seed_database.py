import os
import json
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

# Setup workspace directory in sys.path
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.config import settings

async def seed():
    print("Seed Process Started...")
    print(f"Connecting to MongoDB at: {settings.MONGODB_URI}...")
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    
    # 1. Seed Shopping Hubs
    hubs_path = os.path.join("seed", "shopping_hubs.json")
    if not os.path.exists(hubs_path):
        print(f"Error: shopping hubs seed file '{hubs_path}' not found.")
        client.close()
        return
        
    with open(hubs_path, "r", encoding="utf-8") as f:
        hubs = json.load(f)
        
    print(f"Loaded {len(hubs)} shopping hubs.")
    
    hubs_inserted = 0
    hubs_skipped = 0
    
    for hub in hubs:
        existing = await db.shopping_hubs.find_one({"_id": hub["_id"]})
        if existing:
            hubs_skipped += 1
            continue
            
        hub["created_at"] = datetime.utcnow()
        await db.shopping_hubs.insert_one(hub)
        hubs_inserted += 1
        
    # 2. Seed Stores
    stores_path = os.path.join("seed", "stores.json")
    if not os.path.exists(stores_path):
        print(f"Error: stores seed file '{stores_path}' not found.")
        client.close()
        return
        
    # Clear existing stores collection to renew specialties & logo images
    await db.stores.delete_many({})
    print("Cleared existing stores collection.")

    with open(stores_path, "r", encoding="utf-8") as f:
        stores = json.load(f)
        
    print(f"Loaded {len(stores)} stores to seed.")
    
    stores_inserted = 0
    stores_skipped = 0
    
    for store in stores:
        existing = await db.stores.find_one({"name": store["name"], "city": store["city"]})
        if existing:
            stores_skipped += 1
            continue
            
        store["created_at"] = datetime.utcnow()
        store["updated_at"] = datetime.utcnow()
        store["delivery_available"] = store.get("delivery_available", True)
        store["delivery_radius_km"] = store.get("delivery_radius_km", 15.0)
        store["supported_states"] = store.get("supported_states", [])
        store["supported_cities"] = store.get("supported_cities", [])
        await db.stores.insert_one(store)
        stores_inserted += 1
        
    # 3. Seed Products
    products_path = os.path.join("seed", "products.json")
    products_inserted = 0
    products_skipped = 0
    products_loaded = 0
    
    if os.path.exists(products_path):
        # Drop existing products to ensure clean seed slate without validation errors
        await db.products.delete_many({})
        print("Cleared existing products collection.")
        
        with open(products_path, "r", encoding="utf-8") as f:
            products = json.load(f)
        
        products_loaded = len(products)
        print(f"Loaded {products_loaded} products to seed.")
        
        for p in products:
            # Look up store ID dynamically
            store_name = p.pop("store_name", None)
            store_city = p.pop("store_city", None)
            
            store_doc = await db.stores.find_one({"name": store_name, "city": store_city})
            if not store_doc:
                print(f"Warning: Store '{store_name}' in '{store_city}' not found. Skipping product '{p['name']}'.")
                products_skipped += 1
                continue
                
            p["store_id"] = store_doc["_id"]
            
            # Check if this product already exists at this store
            existing = await db.products.find_one({"name": p["name"], "store_id": p["store_id"]})
            if existing:
                products_skipped += 1
                continue
                
            # Date parse
            created_str = p.get("created_at")
            if created_str:
                p["created_at"] = datetime.fromisoformat(created_str.replace("Z", "+00:00"))
            else:
                p["created_at"] = datetime.utcnow()
                
            p["updated_at"] = datetime.utcnow()
            await db.products.insert_one(p)
            products_inserted += 1
    else:
        print("Warning: products.json seed file not found.")

    print("=================== Seeding Summary ===================")
    print(f"Shopping Hubs - Handled: {len(hubs)} | Inserted: {hubs_inserted} | Skipped: {hubs_skipped}")
    print(f"Stores        - Handled: {len(stores)} | Inserted: {stores_inserted} | Skipped: {stores_skipped}")
    print(f"Products      - Handled: {products_loaded} | Inserted: {products_inserted} | Skipped: {products_skipped}")
    print("=======================================================")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed())
