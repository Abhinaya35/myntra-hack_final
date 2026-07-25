import asyncio
import httpx
from pymongo import MongoClient
import jwt
from datetime import datetime, timezone, timedelta
from app.config import settings

async def verify_final_readiness():
    url_base = "http://127.0.0.1:8000/auth"
    
    # 1. Clear previous test records in MongoDB
    client = MongoClient("mongodb://localhost:27017")
    db = client["myntra_hackathon"]
    db["users"].delete_many({"email": "final_readiness_user@example.com"})
    print("Cleared test user records from 'users' collection.")
    
    async with httpx.AsyncClient() as client:
        # Scenario A: User Registration Check
        print("\n=== Scenario A: Registration Response Payload ===")
        reg_payload = {
            "name": "Bob Final",
            "email": "final_readiness_user@example.com",
            "password": "securepassword"
        }
        res_reg = await client.post(f"{url_base}/register", json=reg_payload)
        print(f"Status Code: {res_reg.status_code}")
        reg_data = res_reg.json()
        print(f"Response: {reg_data}")
        assert res_reg.status_code == 201
        assert reg_data["message"] == "User registered successfully"
        assert "user" in reg_data
        assert "id" in reg_data["user"]
        assert "_id" not in reg_data["user"]      # Extremely critical: NO _id in user profile!
        assert "createdAt" in reg_data["user"]
        assert "created_at" not in reg_data["user"] # Extremely critical: NO created_at !
        
        # Scenario B: User Login Check
        print("\n=== Scenario B: Login Response Payload ===")
        login_payload = {
            "email": "final_readiness_user@example.com",
            "password": "securepassword"
        }
        res_login = await client.post(f"{url_base}/login", json=login_payload)
        print(f"Status Code: {res_login.status_code}")
        login_data = res_login.json()
        print(f"Response: {login_data}")
        assert res_login.status_code == 200
        assert login_data["message"] == "Login successful"
        assert "access_token" in login_data
        assert "user" in login_data
        assert "id" in login_data["user"]
        assert "_id" not in login_data["user"]
        assert "createdAt" in login_data["user"]
        assert "created_at" not in login_data["user"]
        
        token = login_data["access_token"]
        
        # Scenario C: Get User Profile /me
        print("\n=== Scenario C: Profile Response /me ===")
        res_me = await client.get(f"{url_base}/me", headers={"Authorization": f"Bearer {token}"})
        print(f"Status Code: {res_me.status_code}")
        me_data = res_me.json()
        print(f"Response: {me_data}")
        assert res_me.status_code == 200
        assert "id" in me_data
        assert "_id" not in me_data
        assert "createdAt" in me_data
        assert "created_at" not in me_data
        
        # Scenario D: Get User Profile with Non-ObjectId sub claim in JWT
        print("\n=== Scenario D: JWT Validation with non-ObjectId sub ===")
        # Craft an invalid JWT token manually using a string sub like "not-an-object-id"
        invalid_sub_claims = {
            "sub": "not-an-object-id",
            "email": "final_readiness_user@example.com",
            "role": "customer",
            "exp": datetime.now(timezone.utc) + timedelta(minutes=10),
            "iat": datetime.now(timezone.utc)
        }
        invalid_jwt = jwt.encode(invalid_sub_claims, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        res_invalid_sub = await client.get(f"{url_base}/me", headers={"Authorization": f"Bearer {invalid_jwt}"})
        print(f"Status Code: {res_invalid_sub.status_code}")
        print(f"Response: {res_invalid_sub.json()}")
        assert res_invalid_sub.status_code == 401
        
        print("\nAll Final Auth Production Readiness Response Tests completed successfully!")

if __name__ == "__main__":
    asyncio.run(verify_final_readiness())
