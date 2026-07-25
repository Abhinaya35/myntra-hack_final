import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import asyncio, json, requests
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

CITIES = ['Hyderabad', 'Patna', 'Nagpur']
BASE_URL = f"http://localhost:{settings.PORT}{settings.API_V1_STR}"

async def main():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    for city in CITIES:
        docs = await db.stores.find({'city': city}).to_list(length=100)
        if not docs:
            print(f'No stores found for {city}')
            continue
        for doc in docs:
            store_id = str(doc['_id'])
            resp = requests.get(f"{BASE_URL}/stores/{store_id}")
            if resp.status_code == 200:
                data = resp.json()
                print(json.dumps({
                    'city': city,
                    'store_name': doc.get('name'),
                    'store_id': store_id,
                    'api_banner_image': data.get('banner_image'),
                    'api_hero_banner': data.get('heroBanner') or data.get('banner_image')
                }, ensure_ascii=False))
            else:
                print(f'API error for {city} store {store_id}: {resp.status_code}')
    client.close()

asyncio.run(main())
