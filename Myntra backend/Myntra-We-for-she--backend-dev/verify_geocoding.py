import asyncio
import httpx
from pymongo import MongoClient

async def test_locations():
    url = "http://127.0.0.1:8000/address/geocode"
    
    # Connect and clear DB for clean testing
    try:
        from app.config import settings
        mongo_client = MongoClient(settings.MONGODB_URI)
        db = mongo_client[settings.DATABASE_NAME]
        db["addresses"].delete_many({})
        print("Cleared 'addresses' collection for location caching tests.\n")
    except Exception as e:
        print(f"Could not connect to MongoDB: {e}")
        return

    # Scenario address models
    addr1 = {
        "house_number": "3-5-68/3",
        "street": "XYZ Colony",
        "city": "Sangareddy",
        "state": "Telangana"
    }
    addr2 = {
        "house_number": "3-5-70",
        "street": "XYZ Colony",
        "city": "Sangareddy",
        "state": "Telangana"
    }
    addr3 = {
        "house_number": "3-5-68/3",
        "street": "ABC Street",
        "city": "Sangareddy",
        "state": "Telangana"
    }
    addr4 = {
        "house_number": "3-5-68/3",
        "street": "XYZ Colony",
        "city": "Hyderabad",
        "state": "Telangana"
    }
    # Test 5 spacing variants
    addr5_base = {
        "street": "XYZ Colony",
        "city": "Sangareddy",
        "state": "Telangana"
    }
    addr5_spaced = {
        "street": " xyz colony ",
        "city": "Sangareddy",
        "state": "Telangana"
    }
    addr5_merged = {
        "street": "XYZColony",
        "city": "Sangareddy",
        "state": "Telangana"
    }

    async with httpx.AsyncClient() as client:
        # Test 1 -> Cache Miss, Calls Nominatim
        print("=== Test 1: First location lookup (3-5-68/3, XYZ Colony, Sangareddy) ===")
        resp1 = await client.post(url, json=addr1)
        data1 = resp1.json()
        print(f"Response: {data1}")
        assert resp1.status_code == 201
        assert data1.get("cached") is False, "Expected cache miss!"
        print("Test 1 Result: SUCCESS (cached=false)\n")

        # Test 2 -> Cache Hit (different house number, same location query)
        print("=== Test 2: Same location, different house number (3-5-70, XYZ Colony, Sangareddy) ===")
        resp2 = await client.post(url, json=addr2)
        data2 = resp2.json()
        print(f"Response: {data2}")
        assert resp2.status_code == 201
        assert data2.get("cached") is True, "Expected cache hit!"
        print("Test 2 Result: SUCCESS (cached=true)\n")

        # Test 3 -> Different street query (ABC Street) -> Cache Miss
        print("=== Test 3: Different street lookup (ABC Street) ===")
        resp3 = await client.post(url, json=addr3)
        data3 = resp3.json()
        print(f"Response: {data3}")
        assert resp3.status_code == 201
        assert data3.get("cached") is False, "Expected cache miss!"
        print("Test 3 Result: SUCCESS (cached=false)\n")

        # Test 4 -> Different city lookup (Hyderabad) -> Cache Miss
        print("=== Test 4: Different city lookup (Hyderabad) ===")
        resp4 = await client.post(url, json=addr4)
        data4 = resp4.json()
        print(f"Response: {data4}")
        assert resp4.status_code == 201
        assert data4.get("cached") is False, "Expected cache miss!"
        print("Test 4 Result: SUCCESS (cached=false)\n")

        # Test 5 -> Spacing differences -> Cache Hit
        print("=== Test 5: Spacing differences check ===")
        print("1. Submitting base query (should Cache Hit on Sangareddy)...")
        resp5a = await client.post(url, json=addr5_base)
        print(f"Base Response: {resp5a.json()}")
        assert resp5a.status_code == 201
        assert resp5a.json().get("cached") is True, "Expected cache hit on base query!"

        print("2. Submitting ' xyz colony ' (with leading/trailing padding)...")
        resp5b = await client.post(url, json=addr5_spaced)
        print(f"Spaced Response: {resp5b.json()}")
        assert resp5b.status_code == 201
        assert resp5b.json().get("cached") is True, "Expected cache hit on spaced query!"

        print("3. Submitting 'XYZColony' (fully merged word)...")
        resp5c = await client.post(url, json=addr5_merged)
        print(f"Merged Response: {resp5c.json()}")
        assert resp5c.status_code == 201
        assert resp5c.json().get("cached") is True, "Expected cache hit on merged query!"
        
        print("Test 5 Result: SUCCESS (All spacing variations cached successfully)\n")

    # Confirm unique index prevents duplicate MongoDB documents on exact same normalizedKey
    print("=== Double-check MongoDB Addresses collection ===")
    records = list(db["addresses"].find())
    print(f"Total entries stored in MongoDB: {len(records)}")
    for r in records:
         print(f" - normalizedKey: '{r.get('normalizedKey')}', formatted_address: '{r.get('formatted_address')}'")

if __name__ == "__main__":
    asyncio.run(test_locations())
