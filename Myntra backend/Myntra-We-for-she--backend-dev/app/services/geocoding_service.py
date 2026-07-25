import logging
import asyncio
import httpx
from typing import Dict, Any, Optional

logger = logging.getLogger("uvicorn.error")

class GeocodingError(Exception):
    """Base exception for geocoding module."""
    pass

class AddressNotFoundError(GeocodingError):
    """Raised when the address cannot be resolved."""
    pass

class GeocodingAPIError(GeocodingError):
    """Raised for server and connection issues."""
    pass

class GeocodingRateLimitError(GeocodingError):
    """Raised when rate limits (429) are encountered and retries fail."""
    pass

class GeocodingService:
    NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
    USER_AGENT = "MyntraHackathonApp/2.0 (contact@myntrahackathon.com)"
    
    _client: Optional[httpx.AsyncClient] = None

    @classmethod
    def get_client(cls) -> httpx.AsyncClient:
        """
        Gets or initializes the class-level AsyncClient.
        This ensures connection reuse and pooling.
        """
        if cls._client is None or cls._client.is_closed:
            cls._client = httpx.AsyncClient(timeout=10.0)
        return cls._client

    @classmethod
    async def close(cls):
        """
        Closes the shared AsyncClient resource.
        Hooked during FastAPI shutdown.
        """
        if cls._client is not None and not cls._client.is_closed:
            logger.info("Closing GeocodingService reusable AsyncClient...")
            await cls._client.aclose()
            cls._client = None
            logger.info("GeocodingService AsyncClient closed.")

    @classmethod
    async def geocode(
        cls, 
        houseNumber: str = "", 
        street: str = "", 
        landmark: str = "",
        city: str = "", 
        state: str = "", 
        pincode: str = "", 
        country: str = "India"
    ) -> Dict[str, Any]:
        """
        Attempts to resolve geographical coordinates (lat, lon, display name)
        using a fallback query strategy.
        """
        attempts = []

        # Attempt 1: houseNumber + street + landmark + city + state + pincode + country
        attempt1 = [houseNumber, street, landmark, city, state, pincode, country]
        attempts.append(("Attempt 1", attempt1))

        # Attempt 2: street + landmark + city + state + pincode + country
        attempt2 = [street, landmark, city, state, pincode, country]
        attempts.append(("Attempt 2", attempt2))

        # Attempt 3: city + state + pincode + country
        attempt3 = [city, state, pincode, country]
        attempts.append(("Attempt 3", attempt3))

        last_error = None
        executed_queries = set()

        for name, parts in attempts:
            # Reconstruct free-text search input
            query_parts = [p.strip() for p in parts if p and p.strip()]
            query_str = " ".join(query_parts)

            # Skip empty query strings or redundant operations
            if not query_str or query_str in executed_queries:
                continue

            executed_queries.add(query_str)
            print("--------------------------------")
            print(f"{name}")
            print("Query:")
            print(query_str)

            try:
                result = await cls._execute_request(query_str)
                print("Result:")
                print("SUCCESS")
                print("--------------------------------")
                return result
            except AddressNotFoundError as e:
                print("Result:")
                print("FAILED")
                print("--------------------------------")
                logger.warning(f"Address not found during {name}: {str(e)}")
                last_error = e
            except Exception as e:
                print("Result:")
                print("FAILED")
                print("--------------------------------")
                logger.error(f"Geocoding service error during {name}: {str(e)}")
                last_error = e

        if last_error:
            raise last_error

        raise AddressNotFoundError("Address could not be resolved after all fallback attempts.")

    @classmethod
    async def _execute_request(cls, query_str: str) -> Dict[str, Any]:
        """
        Helper method to fire request using the pooled HTTP client.
        Supports automatic retries for rate limiting (429) or transient timeouts.
        """
        client = cls.get_client()
        params = {
            "q": query_str,
            "format": "json",
            "limit": 1
        }
        headers = {
            "User-Agent": cls.USER_AGENT
        }

        max_retries = 2
        for attempt in range(max_retries):
            try:
                logger.info(f"[Geocoding] Calling Nominatim API (attempt {attempt + 1}) for query: '{query_str}'")
                response = await client.get(cls.NOMINATIM_URL, params=params, headers=headers)

                if response.status_code == 200:
                    data = response.json()
                    if not data or not isinstance(data, list):
                        raise AddressNotFoundError(f"No results returned for query: '{query_str}'")

                    result = data[0]
                    resolved_data = {
                        "latitude": float(result["lat"]),
                        "longitude": float(result["lon"]),
                        "display_name": result["display_name"]
                    }
                    logger.info(f"[Geocoding] Coordinates Retrieved: Lat {resolved_data['latitude']}, Lon {resolved_data['longitude']}")
                    return resolved_data
                elif response.status_code == 429:
                    logger.warning(f"Rate limited (429) on attempt {attempt + 1}. Retrying in 1.5 seconds...")
                    if attempt < max_retries - 1:
                        await asyncio.sleep(1.5)
                        continue
                    else:
                        raise GeocodingRateLimitError("Geocoding service rate limit exceeded.")
                else:
                    logger.error(f"Nominatim returned status code {response.status_code}: {response.text}")
                    raise GeocodingAPIError(f"Geocoding service returned status code {response.status_code}")

            except httpx.TimeoutException as e:
                logger.warning(f"Timeout on Nominatim call (attempt {attempt + 1}): {str(e)}")
                if attempt < max_retries - 1:
                    await asyncio.sleep(1.0)
                    continue
                raise GeocodingAPIError("Connection to geocoding service timed out.")

            except httpx.RequestError as e:
                logger.warning(f"Request error on Nominatim call (attempt {attempt + 1}): {str(e)}")
                if attempt < max_retries - 1:
                    await asyncio.sleep(1.0)
                    continue
                raise GeocodingAPIError("Failed to connect to the geocoding service.")
        
        raise GeocodingAPIError("API request execution failed.")
