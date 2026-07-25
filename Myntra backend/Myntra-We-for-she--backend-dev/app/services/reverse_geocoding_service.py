import logging
import asyncio
import httpx
from typing import Dict, Any
from app.services.geocoding_service import (
    GeocodingService,
    GeocodingError,
    AddressNotFoundError,
    GeocodingAPIError,
    GeocodingRateLimitError
)

logger = logging.getLogger("uvicorn.error")

class ReverseGeocodingService:
    REVERSE_URL = "https://nominatim.openstreetmap.org/reverse"
    
    @classmethod
    def generate_cache_key(cls, latitude: float, longitude: float) -> str:
        """
        Generates a deterministic unique key by rounding coordinate precision to 6 decimal places.
        This provides ~11cm resolution precision, ideal for location matching cache.
        """
        lat_rounded = round(latitude, 6)
        lon_rounded = round(longitude, 6)
        return f"{lat_rounded:.6f}|{lon_rounded:.6f}"

    @classmethod
    async def reverse_geocode(cls, latitude: float, longitude: float) -> Dict[str, Any]:
        """
        Calls Nominatim Reverse Geocoding API to resolve coordinates.
        Reuses the AsyncClient from GeocodingService.
        """
        client = GeocodingService.get_client()
        params = {
            "lat": latitude,
            "lon": longitude,
            "format": "json",
            "zoom": 18,
            "addressdetails": 1
        }
        headers = {
            "User-Agent": GeocodingService.USER_AGENT
        }
        
        url_query = f"lat={latitude}&lon={longitude}"
        max_retries = 2
        
        for attempt in range(max_retries):
            try:
                logger.info(f"[Reverse Geocoding] Calling Nominatim (attempt {attempt + 1}) for coordinates: {url_query}")
                logger.info("[Reverse Geocoding] Calling Nominatim")
                response = await client.get(cls.REVERSE_URL, params=params, headers=headers)
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Nominatim returns an "error" string in the JSON body for unresolved points (like ocean)
                    if "error" in data:
                        raise AddressNotFoundError(f"Address not found for coordinates: {url_query}")
                        
                    # Validate JSON layout contains address
                    if not data or "address" not in data:
                        raise AddressNotFoundError("Nominatim response did not return address details.")
                        
                    addr = data["address"]
                    
                    # Robust structured address field mapping
                    house_number = addr.get("house_number") or ""
                    street = addr.get("road") or addr.get("street") or addr.get("residential") or addr.get("pedestrian") or addr.get("service") or addr.get("footway") or addr.get("path") or ""
                    landmark = addr.get("neighbourhood") or addr.get("suburb") or addr.get("landmark") or addr.get("commercial") or ""
                    city = addr.get("city") or addr.get("town") or addr.get("village") or addr.get("municipality") or addr.get("hamlet") or addr.get("suburb") or ""
                    state = addr.get("state") or ""
                    pincode = addr.get("postcode") or ""
                    country = addr.get("country") or "India"
                    display_name = data.get("display_name") or ""
                    
                    logger.info("[Reverse Geocoding] Address Parsed")
                    
                    return {
                        "house_number": house_number,
                        "street": street,
                        "landmark": landmark,
                        "city": city,
                        "state": state,
                        "pincode": pincode,
                        "country": country,
                        "display_name": display_name
                    }
                    
                elif response.status_code == 429:
                    logger.warning(f"Rate limited (429) on attempt {attempt + 1}. Retrying in 1.5 seconds...")
                    if attempt < max_retries - 1:
                        await asyncio.sleep(1.5)
                        continue
                    else:
                        raise GeocodingRateLimitError("Geocoding service rate limit exceeded.")
                else:
                    logger.error(f"Nominatim reverse returned status code {response.status_code}: {response.text}")
                    raise GeocodingAPIError(f"Geocoding service returned status code {response.status_code}")
                    
            except httpx.TimeoutException as e:
                logger.warning(f"Timeout on Nominatim reverse call (attempt {attempt + 1}): {str(e)}")
                if attempt < max_retries - 1:
                    await asyncio.sleep(1.0)
                    continue
                raise GeocodingAPIError("Connection to geocoding service timed out.")
                
            except httpx.RequestError as e:
                logger.warning(f"Request error on Nominatim reverse call (attempt {attempt + 1}): {str(e)}")
                if attempt < max_retries - 1:
                    await asyncio.sleep(1.0)
                    continue
                raise GeocodingAPIError("Failed to connect to the geocoding service.")
        
        raise GeocodingAPIError("API request execution failed.")
