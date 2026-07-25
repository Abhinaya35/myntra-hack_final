import asyncio
import os
import re
from pymongo import MongoClient

# Extract MongoDB configurations from environment or sys path
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.config import settings

def parse_landmark(landmark_str):
    if not landmark_str:
        return "", "", ""
    name_match = re.match(r"Name:\s*(.*?)\s*\|\s*Phone:\s*(.*?)\s*\|\s*Landmark:\s*(.*)", landmark_str)
    if name_match:
        return name_match.group(1).strip(), name_match.group(2).strip(), name_match.group(3).strip()
    return "", "", landmark_str

def migrate():
    print(f"Connecting to MongoDB: {settings.MONGODB_URI}...")
    client = MongoClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    
    collection = db["addresses"]
    cursor = collection.find()
    
    migrated_count = 0
    
    for doc in cursor:
        doc_id = doc["_id"]
        
        # Sourced values
        fullName = doc.get("fullName") or doc.get("contactName") or doc.get("contact_name") or ""
        phoneNumber = doc.get("phoneNumber") or doc.get("contactPhone") or doc.get("contact_phone") or ""
        houseNumber = doc.get("houseNumber") or doc.get("house_number") or doc.get("house_id") or ""
        landmark = doc.get("landmark") or ""
        
        # Check if landmark needs unpack
        parsed_name, parsed_phone, parsed_landmark = parse_landmark(landmark)
        if parsed_name or parsed_phone:
            # Only override if the main fields are empty
            if not fullName:
                fullName = parsed_name
            if not phoneNumber:
                phoneNumber = parsed_phone
            landmark = parsed_landmark
            
        userId = doc.get("userId") or doc.get("user_id")
        
        normalizedKey = doc.get("normalizedKey") or doc.get("normalized_key") or None
        coordinateCacheKey = doc.get("coordinateCacheKey") or doc.get("coordinate_cache_key") or None
        
        # Reconstruct exactly matching canonical structure
        new_doc = {
            "userId": userId,
            "fullName": fullName,
            "phoneNumber": phoneNumber,
            "houseNumber": houseNumber,
            "street": doc.get("street") or "",
            "landmark": landmark,
            "city": doc.get("city") or "",
            "state": doc.get("state") or "",
            "pincode": doc.get("pincode") or "",
            "country": doc.get("country") or "India",
            "label": doc.get("label") or "Home",
            "isDefault": doc.get("isDefault") or doc.get("is_default") or False,
            "latitude": doc.get("latitude") or 0.0,
            "longitude": doc.get("longitude") or 0.0,
            "formatted_address": doc.get("formatted_address") or "",
            "display_name": doc.get("display_name") or "",
        }
        
        if normalizedKey:
            new_doc["normalizedKey"] = normalizedKey
        if coordinateCacheKey:
            new_doc["coordinateCacheKey"] = coordinateCacheKey
            
        # Reconstruct timestamps
        if "createdAt" in doc:
            new_doc["createdAt"] = doc["createdAt"]
        elif "created_at" in doc:
            new_doc["createdAt"] = doc["created_at"]
        else:
            from datetime import datetime
            new_doc["createdAt"] = datetime.utcnow()

        if "updatedAt" in doc:
            new_doc["updatedAt"] = doc["updatedAt"]
        elif "updated_at" in doc:
            new_doc["updatedAt"] = doc["updated_at"]
        else:
            from datetime import datetime
            new_doc["updatedAt"] = datetime.utcnow()
            
        # Replace the document completely to strip old names
        collection.replace_one({"_id": doc_id}, new_doc)
        migrated_count += 1
        
    print(f"Successfully migrated {migrated_count} address documents.")
    client.close()

if __name__ == "__main__":
    migrate()
