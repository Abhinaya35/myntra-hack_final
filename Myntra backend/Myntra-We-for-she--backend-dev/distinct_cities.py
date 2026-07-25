import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

async def main():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    cities = await db.stores.distinct('city')
    print('Distinct cities in stores collection:')
    for c in cities:
        print(c)
    client.close()

asyncio.run(main())
