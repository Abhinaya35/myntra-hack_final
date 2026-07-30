import motor.motor_asyncio
import asyncio

async def main():
    client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
    db = client.myntra_hackathon
    
    # Get all store IDs
    stores = await db.stores.find({}, {'name': 1}).to_list(length=1000)
    store_ids = {str(s['_id']): s['name'] for s in stores}
    print(f"Total stores in DB: {len(stores)}")
    
    # Get all products
    products = await db.products.find({}).to_list(length=1000)
    print(f"Total products in DB: {len(products)}")
    
    missing_store = 0
    none_store = 0
    no_thumbnail = 0
    store_counts = {}
    
    for p in products:
         sid = p.get('store_id')
         if sid is None:
              none_store += 1
         elif str(sid) not in store_ids:
              missing_store += 1
         else:
              sname = store_ids[str(sid)]
              store_counts[sname] = store_counts.get(sname, 0) + 1
              
         if not p.get('thumbnail'):
              no_thumbnail += 1
              
    print("---------------------------------")
    print(f"Products with None store_id: {none_store}")
    print(f"Products with missing store_id: {missing_store}")
    print(f"Products with no thumbnail: {no_thumbnail}")
    print("---------------------------------")
    print("Products count per store:")
    for sname, count in sorted(store_counts.items(), key=lambda x: -x[1]):
         print(f" - {sname}: {count}")
    print("---------------------------------")

if __name__ == "__main__":
    asyncio.run(main())
