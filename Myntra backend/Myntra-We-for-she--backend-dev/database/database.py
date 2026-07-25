import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

logger = logging.getLogger("uvicorn.error")

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_instance = Database()

async def connect_to_mongo():
    logger.info("Connecting to MongoDB...")
    try:
        db_instance.client = AsyncIOMotorClient(
            settings.MONGODB_URI,
            serverSelectionTimeoutMS=2000
        )
        db_instance.db = db_instance.client[settings.DATABASE_NAME]
        # Verify connection on startup by pinging
        await db_instance.client.admin.command('ping')
        logger.info("MongoDB Connection Successful.")
        
        # Drop previous simple unique index to avoid IndexOptionsConflict when changing definition
        try:
            await db_instance.db["addresses"].drop_index("normalizedKey_1")
        except Exception:
            pass

        # Create unique partial indexes on addresses collection
        await db_instance.db["addresses"].create_index(
            "normalizedKey", 
            unique=True,
            partialFilterExpression={"normalizedKey": {"$type": "string"}}
        )
        await db_instance.db["addresses"].create_index(
            "coordinateCacheKey", 
            unique=True,
            partialFilterExpression={"coordinateCacheKey": {"$type": "string"}}
        )
        logger.info("Unique partial indexes for 'normalizedKey' and 'coordinateCacheKey' initialized successfully.")

        # Create address management indexes
        await db_instance.db["addresses"].create_index("userId")
        await db_instance.db["addresses"].create_index("isDefault")
        await db_instance.db["addresses"].create_index(
            [("userId", 1), ("updatedAt", -1)]
        )
        await db_instance.db["addresses"].create_index(
            [("userId", 1), ("isDefault", 1)]
        )
        logger.info("Address management indexes initialized successfully.")

        # Create unique index on users email
        await db_instance.db["users"].create_index("email", unique=True)
        logger.info("Users collection indexes initialized successfully.")
    except Exception as e:
        logger.error(f"MongoDB Connection Failed: {str(e)}")
        # We don't raise error to keep backend running but degraded, or we can handle it.
        # But we must verify connection on health checks.

async def close_mongo_connection():
    logger.info("Closing MongoDB connection...")
    if db_instance.client is not None:
        db_instance.client.close()
        logger.info("MongoDB connection closed.")

def get_database():
    """
    Helper function to get the current MongoDB database instance.
    """
    if db_instance.db is None:
        raise RuntimeError("Database not initialized. Please call connect_to_mongo first.")
    return db_instance.db
