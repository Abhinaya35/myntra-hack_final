import motor.motor_asyncio
import asyncio

async def main():
    client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
    dbs = await client.list_database_names()
    print("Databases list:", dbs)
    for db_name in dbs:
         if db_name in ['myntra', 'myntra_hackathon', 'test']:
              db = client[db_name]
              colls = await db.list_collection_names()
              print(f"Collections in {db_name}:", colls)
              for coll in colls:
                   cnt = await db[coll].count_documents({})
                   print(f"  - {coll}: {cnt} docs")

if __name__ == "__main__":
    asyncio.run(main())
