from datetime import datetime
import logging
import re
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Request
from pymongo.errors import DuplicateKeyError
from bson import ObjectId

from app.schemas.address import (
    AddressRequest,
    AddressResponse,
    AddressUpdatePayload,
    ReverseGeocodeRequest,
    ReverseGeocodeResponse
)
from app.models.address import AddressDB
from app.services.geocoding_service import (
    GeocodingService,
    AddressNotFoundError,
    GeocodingAPIError,
    GeocodingRateLimitError
)
from app.services.reverse_geocoding_service import ReverseGeocodingService
from database.database import get_database
from app.auth.dependencies import get_current_user

logger = logging.getLogger("uvicorn.error")

router = APIRouter(prefix="/address", tags=["address"])

def generate_normalized_key(
    street: str, 
    landmark: str, 
    city: str, 
    state: str, 
    pincode: str, 
    country: str
) -> str:
    """
    Produces a case-insensitive, whitespace-trimmed, and space-removed pipe separated key.
    Excludes house_number to group cache entries by location/locality.
    """
    parts = [street, landmark, city, state, pincode, country]
    cleaned = [re.sub(r"\s+", "", p.strip().lower()) for p in parts]
    return "|".join(cleaned)

def construct_formatted_address(
    houseNumber: str, 
    street: str, 
    landmark: str, 
    city: str, 
    state: str, 
    pincode: str, 
    country: str
) -> str:
    """
    Constructs a clean mailing/delivery address output.
    Filters out empty values and joins with a comma.
    """
    parts = [houseNumber, street, landmark, city, state, pincode, country]
    filtered = [p.strip() for p in parts if p and p.strip()]
    return ", ".join(filtered)

def get_user_id_query_filter(userId: Any) -> Dict[str, Any]:
    """
    Generates a resilient MongoDB filter that matches either the string representation 
    or the BSON ObjectId representation.
    """
    filters = []
    if isinstance(userId, ObjectId):
        filters.append(userId)
        filters.append(str(userId))
    else:
        filters.append(str(userId))
        try:
            filters.append(ObjectId(str(userId)))
        except Exception:
            pass
    return {"userId": {"$in": filters}}

from typing import Union

@router.post(
    "/geocode", 
    response_model=AddressResponse, 
    status_code=status.HTTP_201_CREATED, 
    summary="Geocode and save address", 
    description="Resolves address details to coordinates and saves it to MongoDB. (JWT Token Required)"
)
async def geocode_address(
    payload: Union[AddressRequest, Dict[str, Any]], 
    request: Request,
    current_user: dict = Depends(get_current_user)
):
    """
    Geocodes structured delivery addresses or raw address string.
    Reuses cached coordinates if a matching normalized location key exists in MongoDB.
    """
    logger.info("[Address] Geocoding/Saving Address")
    db = get_database()
    user_id_obj = current_user["_id"]

    # Determine if raw string or structured request
    is_raw = isinstance(payload, dict) and "address" in payload and len(payload) == 1
    
    if is_raw:
        raw_address = payload["address"]
        normalized_key = raw_address.strip().lower()
        
        cached_record = await db["geocoding_cache"].find_one({"normalizedKey": normalized_key})
        if cached_record:
            logger.info(f"[Geocoding] Cache Hit for raw address: {normalized_key}")
            latitude, longitude, display_name = cached_record["latitude"], cached_record["longitude"], cached_record["display_name"]
        else:
            logger.info(f"[Geocoding] Cache Miss for raw address: {normalized_key}")
            resolved = await GeocodingService.geocode(street=raw_address)
            latitude, longitude, display_name = resolved["latitude"], resolved["longitude"], resolved["display_name"]
            await db["geocoding_cache"].update_one(
                {"normalizedKey": normalized_key},
                {"$set": {"latitude": latitude, "longitude": longitude, "display_name": display_name, "updatedAt": datetime.utcnow()}},
                upsert=True
            )
        
        return AddressResponse(id="", userId=str(user_id_obj), fullName="", phoneNumber="", label="Home", isDefault=False, houseNumber="", street="", landmark="", city="", state="", pincode="", country="", formatted_address=raw_address, display_name=display_name, latitude=latitude, longitude=longitude, cached=True if cached_record else False, createdAt=datetime.utcnow(), updatedAt=datetime.utcnow())

    # Structured Flow
    addr_req = AddressRequest(**payload) if isinstance(payload, dict) else payload
    normalized_key = generate_normalized_key(addr_req.street, addr_req.landmark, addr_req.city, addr_req.state, addr_req.pincode, addr_req.country)
    
    cached_record = await db["geocoding_cache"].find_one({"normalizedKey": normalized_key})
    if cached_record:
        logger.info("[Geocoding] Cache Hit for structured address")
        latitude, longitude, display_name = cached_record["latitude"], cached_record["longitude"], cached_record["display_name"]
    else:
        logger.info("[Geocoding] Cache Miss for structured address")
        resolved = await GeocodingService.geocode(houseNumber=addr_req.houseNumber, street=addr_req.street, landmark=addr_req.landmark, city=addr_req.city, state=addr_req.state, pincode=addr_req.pincode, country=addr_req.country)
        latitude, longitude, display_name = resolved["latitude"], resolved["longitude"], resolved["display_name"]
        await db["geocoding_cache"].update_one({"normalizedKey": normalized_key}, {"$set": {"latitude": latitude, "longitude": longitude, "display_name": display_name, "updatedAt": datetime.utcnow()}}, upsert=True)

    formatted = construct_formatted_address(addr_req.houseNumber, addr_req.street, addr_req.landmark, addr_req.city, addr_req.state, addr_req.pincode, addr_req.country)
    doc = addr_req.model_dump()
    doc.update({"userId": str(user_id_obj), "user_id": user_id_obj, "latitude": latitude, "longitude": longitude, "display_name": display_name, "formatted_address": formatted, "normalizedKey": normalized_key, "createdAt": datetime.utcnow(), "updatedAt": datetime.utcnow()})
    
    if doc.get("isDefault"):
        await db["addresses"].update_many({"userId": str(user_id_obj), "isDefault": True}, {"$set": {"isDefault": False}})
    
    res = await db["addresses"].insert_one(doc)
    return AddressResponse(id=str(res.inserted_id), **doc)

@router.post(
    "/reverse-geocode", 
    response_model=ReverseGeocodeResponse, 
    status_code=status.HTTP_200_OK, 
    summary="Reverse geocode coordinates", 
    description="Resolves coordinates to structured address properties and links to active User profile. (JWT Token Required)"
)
async def reverse_geocode_address(
    payload: ReverseGeocodeRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Reverse geocodes coordinates (lat/lon) to a structured address.
    Checks the local MongoDB coordinate cache first.
    """
    logger.info("[Reverse Geocoding] Request Received")
    db = get_database()
    user_id_obj = current_user["_id"]
    
    # 1. Generate normalized coordinate cache key
    coordinate_cache_key = ReverseGeocodingService.generate_cache_key(
        latitude=payload.latitude,
        longitude=payload.longitude
    )
    
    # 2. Call Reverse Geocoding service
    try:
        resolved = await ReverseGeocodingService.reverse_geocode(
            latitude=payload.latitude,
            longitude=payload.longitude
        )
    except AddressNotFoundError as e:
        logger.warning(f"Coordinates address not found: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except GeocodingRateLimitError as e:
        logger.error(f"Rate limited: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=str(e)
        )
    except GeocodingAPIError as e:
        logger.error(f"API Error during lookup: {str(e)}")
        error_msg = str(e).lower()
        if "timeout" in error_msg or "failed to connect" in error_msg:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=str(e)
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected error during Nominatim Reverse lookup: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}"
        )

    # 3. Reconstruct clean formatted address
    formatted = construct_formatted_address(
        houseNumber=resolved["houseNumber"],
        street=resolved["street"],
        landmark=resolved["landmark"],
        city=resolved["city"],
        state=resolved["state"],
        pincode=resolved["pincode"],
        country=resolved["country"]
    )

    # 4. Return response without database persistence
    return ReverseGeocodeResponse(
        houseNumber=resolved["houseNumber"],
        street=resolved["street"],
        landmark=resolved["landmark"],
        city=resolved["city"],
        state=resolved["state"],
        pincode=resolved["pincode"],
        country=resolved["country"],
        formatted_address=formatted,
        display_name=resolved["display_name"],
        latitude=payload.latitude,
        longitude=payload.longitude,
        cached=False
    )
 
@router.get(
    "", 
    response_model=List[AddressResponse], 
    summary="Get user addresses", 
    description="Retrieves a list of saved addresses for the authenticated User. Sorted defaults first."
)
async def get_user_addresses(current_user: dict = Depends(get_current_user)):
    db = get_database()
    user_id_obj = current_user["_id"]
    logger.info(f"[Address] Retrieving user addresses for '{user_id_obj}'")
    
    query = get_user_id_query_filter(user_id_obj)
    query["$or"] = [
        {"coordinateCacheKey": {"$exists": False}},
        {"coordinateCacheKey": None}
    ]
    cursor = db["addresses"].find(query).sort([("isDefault", -1), ("updatedAt", -1)])
    results = await cursor.to_list(length=100)
    
    output = []
    for r in results:
        output.append(AddressResponse(
            id=str(r["_id"]),
            userId=str(r["userId"]) if r.get("userId") else str(user_id_obj),
            fullName=r.get("fullName") or r.get("fullName", ""),
            phoneNumber=r.get("phoneNumber") or r.get("phoneNumber", ""),
            label=r.get("label", "Home"),
            isDefault=r.get("isDefault", False),
            houseNumber=r.get("houseNumber", ""),
            street=r.get("street") or r.get("street", ""),
            landmark=r.get("landmark") or r.get("landmark", ""),
            city=r.get("city") or r.get("city", ""),
            state=r.get("state") or r.get("state", ""),
            pincode=r.get("pincode") or r.get("pincode", ""),
            country=r.get("country") or r.get("country", "India"),
            formatted_address=r.get("formatted_address", ""),
            latitude=r.get("latitude"),
            longitude=r.get("longitude"),
            display_name=r.get("display_name", ""),
            cached=True,
            createdAt=r.get("createdAt") or datetime.utcnow(),
            updatedAt=r.get("updatedAt") or datetime.utcnow()
        ))
        
    return output

@router.put(
    "/{addressId}", 
    response_model=AddressResponse, 
    summary="Edit saved address", 
    description="Updates address parameters. Verifies user ownership."
)
async def update_address(
    addressId: str, 
    payload: AddressUpdatePayload,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id_obj = current_user["_id"]
    
    # 1. Retrieve the existing address document
    try:
        addr_id_obj = ObjectId(addressId)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Address ID string format"
        )
        
    addr = await db["addresses"].find_one({"_id": addr_id_obj})
    if not addr:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Address record not found"
        )
        
    # Check ownership
    addr_user_id = addr.get("userId")
    if str(addr_user_id) != str(user_id_obj):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to edit another user's address"
        )
        
    # 2. Check if geocoding critical fields changed
    critical_fields = ["houseNumber", "street", "landmark", "city", "state", "pincode", "country"]
    is_loc_changed = False
    
    for f in critical_fields:
        payload_val = getattr(payload, f)
        db_val = addr.get(f)
        if payload_val is not None and payload_val != db_val:
            is_loc_changed = True
            break
            
    latitude = addr["latitude"]
    longitude = addr["longitude"]
    display_name = addr["display_name"]
    normalized_key = addr.get("normalizedKey")
    cached = True
    
    p_fullName = payload.fullName if payload.fullName is not None else addr.get("fullName", "")
    p_phoneNumber = payload.phoneNumber if payload.phoneNumber is not None else addr.get("phoneNumber", "")
    p_houseNumber = payload.houseNumber if payload.houseNumber is not None else addr.get("houseNumber", "")
    p_street = payload.street if payload.street is not None else addr.get("street", "")
    p_landmark = payload.landmark if payload.landmark is not None else addr.get("landmark", "")
    p_city = payload.city if payload.city is not None else addr.get("city", "")
    p_state = payload.state if payload.state is not None else addr.get("state", "")
    p_pincode = payload.pincode if payload.pincode is not None else addr.get("pincode", "")
    p_country = payload.country if payload.country is not None else addr.get("country", "India")
    
    # 3. Handle location recalculation if critical properties changed
    if is_loc_changed:
        normalized_key = generate_normalized_key(
            street=p_street,
            landmark=p_landmark,
            city=p_city,
            state=p_state,
            pincode=p_pincode,
            country=p_country
        )
        
        # Check cache
        try:
            cache_rec = await db["addresses"].find_one({"normalizedKey": normalized_key})
            if cache_rec:
                logger.info("[Geocoding] Cache Hit")
                latitude = cache_rec["latitude"]
                longitude = cache_rec["longitude"]
                display_name = cache_rec["display_name"]
                cached = True
            else:
                logger.info("[Geocoding] Cache Miss")
                # Request geocoding
                resolved = await GeocodingService.geocode(
                    houseNumber=p_houseNumber,
                    street=p_street,
                    city=p_city,
                    state=p_state,
                    pincode=p_pincode,
                    country=p_country
                )
                latitude = resolved["latitude"]
                longitude = resolved["longitude"]
                display_name = resolved["display_name"]
                cached = False
        except AddressNotFoundError as e:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
            
    # 4. Generate new formatted address layout
    formatted = construct_formatted_address(
        houseNumber=p_houseNumber,
        street=p_street,
        landmark=p_landmark,
        city=p_city,
        state=p_state,
        pincode=p_pincode,
        country=p_country
    )
    
    p_is_default = payload.isDefault
    
    if p_is_default:
        user_query = get_user_id_query_filter(user_id_obj)
        user_query["isDefault"] = True
        # Unset all other defaults
        await db["addresses"].update_many(
            user_query,
            {"$set": {"isDefault": False, "updatedAt": datetime.utcnow()}}
        )
        
    # 5. Apply updates
    updates = {
        "fullName": p_fullName,
        "phoneNumber": p_phoneNumber,
        "houseNumber": p_houseNumber,
        "street": p_street,
        "landmark": p_landmark,
        "city": p_city,
        "state": p_state,
        "pincode": p_pincode,
        "country": p_country,
        "formatted_address": formatted,
        "normalizedKey": normalized_key,
        "latitude": latitude,
        "longitude": longitude,
        "display_name": display_name,
        "updatedAt": datetime.utcnow()
    }
    
    if payload.label is not None:
        updates["label"] = payload.label
    if p_is_default is not None:
        updates["isDefault"] = p_is_default
        
    await db["addresses"].update_one({"_id": addr_id_obj}, {"$set": updates})
    logger.info("[Address] Updating Address")
    
    return AddressResponse(
        id=addressId,
        userId=str(user_id_obj),
        fullName=p_fullName,
        phoneNumber=p_phoneNumber,
        label=updates.get("label", addr.get("label", "Home")),
        isDefault=updates.get("isDefault", addr.get("isDefault", False)),
        houseNumber=p_houseNumber,
        street=p_street,
        landmark=p_landmark,
        city=p_city,
        state=p_state,
        pincode=p_pincode,
        country=p_country,
        formatted_address=formatted,
        latitude=latitude,
        longitude=longitude,
        display_name=display_name,
        cached=cached,
        createdAt=addr.get("createdAt") or addr.get("created_at") or datetime.utcnow(),
        updatedAt=updates["updatedAt"]
    )

@router.delete(
    "/{addressId}", 
    status_code=status.HTTP_200_OK, 
    summary="Remove saved address", 
    description="Deletes an address. Verifies user ownership."
)
async def delete_address(
    addressId: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id_obj = current_user["_id"]
    
    try:
        addr_id_obj = ObjectId(addressId)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Address ID string format"
        )
        
    addr = await db["addresses"].find_one({"_id": addr_id_obj})
    if not addr:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Address record not found"
        )
        
    addr_user_id = addr.get("userId")
    if str(addr_user_id) != str(user_id_obj):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete another user's address"
        )
        
    was_default = addr.get("isDefault", False)
    
    # Perform deletion
    await db["addresses"].delete_one({"_id": addr_id_obj})
    logger.info("[Address] Deleting Address")
    
    # Promote a new default address if needed
    if was_default:
        user_query = get_user_id_query_filter(user_id_obj)
        next_addr = await db["addresses"].find_one(user_query)
        if next_addr:
            await db["addresses"].update_one(
                {"_id": next_addr["_id"]},
                {"$set": {"isDefault": True, "updatedAt": datetime.utcnow()}}
            )
            logger.info("[Address] Default Address Updated")
            
    return {"detail": "Address deleted successfully"}

@router.patch(
    "/default/{addressId}", 
    response_model=AddressResponse, 
    summary="Set default address", 
    description="Sets the specified address as the user's default, and unsets all other defaults for the owner user."
)
async def set_default_address(
    addressId: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id_obj = current_user["_id"]
    
    try:
        addr_id_obj = ObjectId(addressId)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Address ID string format"
        )
        
    addr = await db["addresses"].find_one({"_id": addr_id_obj})
    if not addr:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Address record not found"
        )
        
    addr_user_id = addr.get("userId")
    if str(addr_user_id) != str(user_id_obj):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to set default on another user's address"
        )
        
    # Unset other defaults for this user
    user_query = get_user_id_query_filter(user_id_obj)
    user_query["isDefault"] = True
    await db["addresses"].update_many(
        user_query,
        {"$set": {"isDefault": False, "updatedAt": datetime.utcnow()}}
    )
        
    # Mark this address as default
    await db["addresses"].update_one(
        {"_id": addr_id_obj},
        {"$set": {"isDefault": True, "updatedAt": datetime.utcnow()}}
    )
    logger.info("[Address] Default Address Updated")
    
    # Reload document
    updated_addr = await db["addresses"].find_one({"_id": addr_id_obj})
    
    return AddressResponse(
        id=str(updated_addr["_id"]),
        userId=str(updated_addr["userId"]) if updated_addr.get("userId") else str(user_id_obj),
        fullName=updated_addr.get("fullName") or updated_addr.get("fullName", ""),
        phoneNumber=updated_addr.get("phoneNumber") or updated_addr.get("phoneNumber", ""),
        label=updated_addr.get("label", "Home"),
        isDefault=True,
        houseNumber=updated_addr.get("houseNumber", ""),
        street=updated_addr.get("street") or updated_addr.get("street", ""),
        landmark=updated_addr.get("landmark") or updated_addr.get("landmark", ""),
        city=updated_addr.get("city") or updated_addr.get("city", ""),
        state=updated_addr.get("state") or updated_addr.get("state", ""),
        pincode=updated_addr.get("pincode") or updated_addr.get("pincode", ""),
        country=updated_addr.get("country") or updated_addr.get("country", "India"),
        formatted_address=updated_addr.get("formatted_address", ""),
        latitude=updated_addr.get("latitude"),
        longitude=updated_addr.get("longitude"),
        display_name=updated_addr.get("display_name", ""),
        cached=True,
        createdAt=updated_addr.get("createdAt") or updated_addr.get("created_at") or datetime.utcnow(),
        updatedAt=updated_addr.get("updatedAt") or updated_addr.get("updated_at") or datetime.utcnow()
    )
