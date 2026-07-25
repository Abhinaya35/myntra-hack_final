from contextlib import asynccontextmanager
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from database.database import connect_to_mongo, close_mongo_connection, db_instance
from app.routers import stores, products, recommendations, orders, users, shopping_hubs, states, address
from app.auth import router as auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup actions
    print("Starting up FastAPI application...")
    await connect_to_mongo()
    print("Startup complete. MongoDB Connected Successfully.")
    yield
    # Shutdown actions
    print("Shutting down FastAPI application...")
    from app.services.geocoding_service import GeocodingService
    await GeocodingService.close()
    await close_mongo_connection()
    print("Shutdown complete. MongoDB Connection Closed.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API Foundation for Myntra Hackathon MVP",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]
if settings.ALLOWED_ORIGINS:
    if isinstance(settings.ALLOWED_ORIGINS, list):
        for o in settings.ALLOWED_ORIGINS:
            if o not in origins:
                origins.append(o)
    elif isinstance(settings.ALLOWED_ORIGINS, str) and settings.ALLOWED_ORIGINS not in origins:
        origins.append(settings.ALLOWED_ORIGINS)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers at root level to expose GET /stores/test etc.
app.include_router(auth.router)
app.include_router(stores.router)
app.include_router(states.router)
app.include_router(shopping_hubs.router)
app.include_router(products.router)
app.include_router(recommendations.router)
app.include_router(orders.router)
app.include_router(users.router)
app.include_router(address.router)

@app.get("/")
@app.get("/health", tags=["health"])
async def health_check(response: Response):
    database_status = "disconnected"
    db_name = "None"
    if db_instance.client is not None:
        try:
            await db_instance.client.admin.command('ping')
            database_status = "connected"
            db_name = db_instance.db.name if db_instance.db is not None else "None"
        except Exception:
            database_status = "disconnected"

    is_running = database_status == "connected"

    if not is_running:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return {
            "status": "degraded",
            "database": database_status,
            "db_name": db_name,
            "version": "1.0"
        }

    return {
        "status": "running",
        "database": database_status,
        "db_name": db_name,
        "version": "1.0"
    }
