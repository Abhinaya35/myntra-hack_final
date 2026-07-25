import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import asyncio, json
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

CITIES = ['Hyderabad', 'Patna', 'Nagpur']

async def main():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    for city in CITIES:
        docs = await db.stores.find({'city': city}).to_list(length=10)
        if not docs:
            print(f'No stores found for {city}')
            continue
        for doc in docs:
            print(json.dumps({
                'city': city,
                'name': doc.get('name'),
                'id': str(doc.get('_id')),
                'banner_image': doc.get('banner_image')
            }, ensure_ascii=False))
    client.close()

asyncio.run(main())
