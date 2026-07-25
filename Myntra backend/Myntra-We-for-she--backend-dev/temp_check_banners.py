import asyncio, json
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

CITIES = ['Hyderabad', 'Patna', 'Nagpur']

async def main():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    for city in CITIES:
        cursor = db.stores.find({'city': city})
        stores = await cursor.to_list(length=100)
        for s in stores:
            print(json.dumps({
                'city': city,
                'name': s.get('name'),
                'id': str(s.get('_id')),
                'banner_image': s.get('banner_image')
            }))
    client.close()

asyncio.run(main())
