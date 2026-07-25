import asyncio
import httpx
from pymongo import MongoClient

async def test_reverse_geocoding():
    url = "http://127.0.0.1:8000/address/reverse-geocode"
    
    # Clean DB first
    try:
        from app.config import settings
        mongo_client = MongoClient(settings.MONGODB_URI)
        db = mongo_client[settings.DATABASE_NAME]
        db["addresses"].delete_many({})
        print("Cleared 'addresses' collection for reverse caching tests.\n")
    except Exception as e:
        print(f"Could not connect to MongoDB: {e}")
        return

    # Scenario 1 & 2 layout (Sangareddy coordinates)
    sangareddy_coords = {"latitude": 17.615515, "longitude": 78.081722}
    # Scenario 3 (Hyderabad coordinates)
    hyderabad_coords = {"latitude": 17.385044, "longitude": 78.486671}
    # Scenario 4 (Latitude 95)
    lat_invalid = {"latitude": 95.0, "longitude": 78.486671}
    # Scenario 5 (Longitude 200)
    lon_invalid = {"latitude": 17.385044, "longitude": 200.0}
    # Scenario 6 (Ocean - Gulf of Guinea)
    ocean_coords = {"latitude": 0.0, "longitude": 0.0}

    async with httpx.AsyncClient() as client:
        # Test 1 -> Cache Miss, Resolves Sangareddy
        print("=== Test 1: Coordinates Lookup (17.615515, 78.081722) ===")
        resp1 = await client.post(url, json=sangareddy_coords)
        print(f"Status Code: {resp1.status_code}")
        data1 = resp1.json()
        print(f"Response: {data1}\n")
        assert resp1.status_code == 200
        assert data1.get("cached") is False, "Expected cache miss!"
        assert data1.get("city") != "", "Expected resolved city!"

        # Test 2 -> Same coordinates again -> Cache Hit (Direct from DB)
        print("=== Test 2: Duplicate Coordinates Cache Hit ===")
        resp2 = await client.post(url, json=sangareddy_coords)
        print(f"Status Code: {resp2.status_code}")
        data2 = resp2.json()
        print(f"Response: {data2}\n")
        assert resp2.status_code == 200
        assert data2.get("cached") is True, "Expected cache hit!"

        # Test 3 -> Coordinates of Hyderabad
        print("=== Test 3: Hyderabad Coordinates Lookup ===")
        resp3 = await client.post(url, json=hyderabad_coords)
        print(f"Status Code: {resp3.status_code}")
        data3 = resp3.json()
        print(f"Response: {data3}\n")
        assert resp3.status_code == 200
        assert data3.get("cached") is False, "Expected cache miss!"
        assert "hyderabad" in data3.get("city", "").lower()

        # Test 4 -> Latitude 95
        print("=== Test 4: Latitude Out of Bounds (95) ===")
        resp4 = await client.post(url, json=lat_invalid)
        print(f"Status Code: {resp4.status_code}")
        print(f"Response: {resp4.json()}\n")
        assert resp4.status_code == 422, "Expected 422 validation error!"

        # Test 5 -> Longitude 200
        print("=== Test 5: Longitude Out of Bounds (200) ===")
        resp5 = await client.post(url, json=lon_invalid)
        print(f"Status Code: {resp5.status_code}")
        print(f"Response: {resp5.json()}\n")
        assert resp5.status_code == 422, "Expected 422 validation error!"

        # Test 6 -> Ocean Coordinates (0,0) -> 404
        print("=== Test 6: Ocean Coordinates ===")
        resp6 = await client.post(url, json=ocean_coords)
        print(f"Status Code: {resp6.status_code}")
        print(f"Response: {resp6.json()}\n")
        assert resp6.status_code == 404, "Expected 404 not found!"

if __name__ == "__main__":
    asyncio.run(test_reverse_geocoding())
