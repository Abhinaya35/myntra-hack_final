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
    db_instance.client = AsyncIOMotorClient(settings.MONGO_DETAILS)
    db_instance.db = db_instance.client[settings.DATABASE_NAME]
    logger.info("Connection to MongoDB established.")

async def close_mongo_connection():
    logger.info("Closing connection to MongoDB...")
    if db_instance.client:
        db_instance.client.close()
        logger.info("Connection to MongoDB closed.")

def get_database():
    """
    Dependency or helper function to access the MongoDB database.
    """
    if db_instance.db is None:
        raise RuntimeError("Database not initialized. Please call connect_to_mongo first.")
    return db_instance.db
