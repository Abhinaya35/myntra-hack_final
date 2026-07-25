import math
from typing import List, Optional, Dict, Any
from bson import ObjectId
from database.database import get_database
from app.config import settings

class StoreService:
    @staticmethod
    def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """
        Calculate distance between two coordinates in km using the Haversine formula.
        """
        R = 6371.0  # Earth's radius in km
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) ** 2 +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    @staticmethod
    def calculate_distance_score(distance: float, radius: float) -> float:
        """
        Distance Score = max(0.0, (radius - distance) / radius)
        """
        if radius <= 0:
            return 0.0
        return max(0.0, (radius - distance) / radius)

    @staticmethod
    def calculate_final_score(normalized_trust: float, distance_score: float) -> float:
        """
        Final Score = w_trust * Normalized Trust Score + w_dist * Distance Score
        """
        w_trust = settings.RANKING_TRUST_WEIGHT
        w_dist = settings.RANKING_DISTANCE_WEIGHT
        return (w_trust * normalized_trust) + (w_dist * distance_score)

    @staticmethod
    def sort_stores(stores: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Sort stores by final_score (Descending).
        """
        return sorted(stores, key=lambda s: s.get("final_score", 0.0), reverse=True)

    @staticmethod
    async def get_all_stores() -> List[Dict[str, Any]]:
        db = get_database()
        cursor = db.stores.find()
        return await cursor.to_list(length=200)

    @staticmethod
    async def get_store_by_id(store_id: str) -> Optional[Dict[str, Any]]:
        db = get_database()
        if not ObjectId.is_valid(store_id):
            return None
        return await db.stores.find_one({"_id": ObjectId(store_id)})

    # ==========================================
    # SEARCH DISCOVERY ENGINE HELPER METHODS
    # ==========================================

    @staticmethod
    def normalize_query(query: str) -> str:
        """
        Normalize query string by removing surrounding padding and lowercasing.
        """
        return query.strip().lower()

    @staticmethod
    def search_store_name(name: str, query: str) -> float:
        """
        Calculate store name match score.
        Exact Match = 100 points, Substring Match = 50 points.
        """
        name_lower = name.lower()
        if name_lower == query:
            return 100.0
        elif query in name_lower:
            return 50.0
        return 0.0

    @staticmethod
    def search_city(city: str, query: str) -> float:
        """
        Calculate city match score (40 points if matched).
        """
        if query in city.lower():
            return 40.0
        return 0.0

    @staticmethod
    def search_state(state: str, query: str) -> float:
        """
        Calculate state match score (10 points if matched).
        """
        if query in state.lower():
            return 10.0
        return 0.0

    @staticmethod
    def search_category(categories: List[str], query: str) -> float:
        """
        Calculate category match score (30 points if matched).
        """
        if any(query in cat.lower() for cat in categories):
            return 30.0
        return 0.0

    @staticmethod
    def search_description(description: Optional[str], query: str) -> float:
        """
        Calculate description match score (20 points if matched).
        """
        if description and query in description.lower():
            return 20.0
        return 0.0

    @staticmethod
    def calculate_relevance_score(store: Dict[str, Any], query: str) -> float:
        """
        Calculate cumulative relevance match score using structured weights.
        """
        score = 0.0
        
        name = store.get("name", "")
        city = store.get("city", "")
        state = store.get("state", "")
        categories = store.get("categories", [])
        description = store.get("description", "")
        
        # 1. Exact or partial store name match
        score += StoreService.search_store_name(name, query)
        # 2. City match
        score += StoreService.search_city(city, query)
        # 3. Category match
        score += StoreService.search_category(categories, query)
        # 4. Description match
        score += StoreService.search_description(description, query)
        # 5. State match
        score += StoreService.search_state(state, query)
        
        # Fallback to keyword split evaluation for multi-term query checks
        if score == 0.0:
            words = [w for w in query.split() if w]
            if len(words) > 1:
                for word in words:
                    # Grant fractional points for separate word terms matches
                    if word in name.lower():
                        score += 30.0
                    if word in city.lower():
                        score += 25.0
                    if any(word in cat.lower() for cat in categories):
                        score += 20.0
                    if description and word in description.lower():
                        score += 5.0
                    if word in state.lower():
                        score += 2.0
                        
        return score

    @staticmethod
    def sort_search_results(
        stores: List[Dict[str, Any]],
        lat: Optional[float] = None,
        lon: Optional[float] = None
    ) -> List[Dict[str, Any]]:
        """
        Sort results by Relevance (Descending), then Trust Score (Descending) and optionally Distance (Ascending).
        """
        def get_sort_key(s: Dict[str, Any]):
            rel_score = s.get("relevance_score", 0.0)
            trust = s.get("trust_score", 0.0)
            dist = s.get("distance_km", 0.0) if lat is not None and lon is not None else 0.0
            # Sort order priority:
            # 1. Relevance Score Descending (-rel_score)
            # 2. Trust Score Descending (-trust)
            # 3. Distance Ascending (dist)
            return (-rel_score, -trust, dist)

        return sorted(stores, key=get_sort_key)

    @staticmethod
    async def search_stores(
        query: str,
        lat: Optional[float] = None,
        lon: Optional[float] = None
    ) -> List[Dict[str, Any]]:
        """
        Intelligent fashion search discovery across name, location, and description fields.
        """
        norm_query = StoreService.normalize_query(query)
        if not norm_query:
            return []
            
        db = get_database()
        cursor = db.stores.find()
        all_stores = await cursor.to_list(length=1000)
        
        matched_stores = []
        for store in all_stores:
            rel_score = StoreService.calculate_relevance_score(store, norm_query)
            if rel_score > 0:
                store_copy = dict(store)
                store_copy["relevance_score"] = rel_score
                
                # Optional distance computation if customer location is logged
                if lat is not None and lon is not None:
                    store_lat = store.get("latitude")
                    store_lon = store.get("longitude")
                    if store_lat is not None and store_lon is not None:
                        dist = StoreService.haversine(lat, lon, store_lat, store_lon)
                        store_copy["distance_km"] = round(dist, 2)
                        
                matched_stores.append(store_copy)
                
        return StoreService.sort_search_results(matched_stores, lat, lon)

    # Legacy method compatibility
    @staticmethod
    async def search_stores_by_name(query: str) -> List[Dict[str, Any]]:
        return await StoreService.search_stores(query)

    @staticmethod
    async def get_nearby_stores(lat: float, lon: float, radius_km: float) -> List[Dict[str, Any]]:
        db = get_database()
        cursor = db.stores.find()
        all_stores = await cursor.to_list(length=1000)

        nearby = []
        for store in all_stores:
            store_lat = store.get("latitude")
            store_lon = store.get("longitude")
            if store_lat is None or store_lon is None:
                continue
            
            dist = StoreService.haversine(lat, lon, store_lat, store_lon)
            if dist <= radius_km:
                store_copy = dict(store)
                store_copy["distance_km"] = round(dist, 2)
                nearby.append(store_copy)

        if not nearby:
            return []

        max_trust = max((s.get("trust_score", 0.0) for s in nearby), default=0.0)
        if max_trust <= 0:
            max_trust = 10.0

        for store in nearby:
            trust = store.get("trust_score", 0.0)
            norm_trust = trust / max_trust
            dist = store.get("distance_km", 0.0)
            dist_score = StoreService.calculate_distance_score(dist, radius_km)
            final_score = StoreService.calculate_final_score(norm_trust, dist_score)

            store["normalized_trust_score"] = round(norm_trust, 4)
            store["distance_score"] = round(dist_score, 4)
            store["final_score"] = round(final_score, 4)

        return StoreService.sort_stores(nearby)

    @staticmethod
    async def get_store_collections(store_id: str) -> List[Dict[str, Any]]:
        """
        Dynamically analyzes all products belonging to the selected store
        and projects available shopping collections using MongoDB aggregation.
        """
        db = get_database()
        
        # Check store existence
        store_match_id = store_id
        if ObjectId.is_valid(store_id):
            store = await db.stores.find_one({"_id": ObjectId(store_id)})
            store_match_id = {"$in": [store_id, ObjectId(store_id)]}
        else:
            store = await db.stores.find_one({"_id": store_id})
            
        if not store:
            return []

        pipeline = [
            {
                "$match": {
                    "store_id": store_match_id,
                    "is_available": True,
                    "occasion": {"$ne": None, "$ne": ""}
                }
            },
            {
                "$project": {
                    "name": 1,
                    "thumbnail": 1,
                    "occasions_list": {"$split": ["$occasion", ", "]}
                }
            },
            {
                "$unwind": "$occasions_list"
            },
            {
                "$group": {
                    "_id": "$occasions_list",
                    "product_count": {"$sum": 1},
                    "cover_image": {"$first": "$thumbnail"}
                }
            },
            {
                "$match": {
                    "_id": {"$ne": ""}
                }
            },
            {
                "$sort": {"product_count": -1, "_id": 1}
            }
        ]

        cursor = db.products.aggregate(pipeline)
        docs = await cursor.to_list(length=100)

        desc_map = {
            "Wedding": "Bridal and wedding fashion",
            "Festival": "Festive outfits and celebration styles",
            "Daily Wear": "Daily essentials and comfortable wear",
            "Office Wear": "Office work and formal fashion",
            "Casual": "Relaxed everyday casual collections",
            "Party Wear": "High-style evening and party wear",
            "Ethnic": "Traditional ethnic wear and motifs",
            "Traditional": "Classic heritage traditional wear",
            "Family Function": "Perfect attire for family get-togethers",
            "College Wear": "Trendy casuals for campus wear",
            "Travel": "Easy and stylish travel wear",
            "Vacation": "Chic holiday and vacation outfits",
            "Kids": "Cute and playful outfits for kids",
            "Celebration": "Celebration and ceremony statements"
        }

        collections = []
        for doc in docs:
            name = doc["_id"]
            collections.append({
                "collection_name": name,
                "product_count": doc["product_count"],
                "cover_image": doc.get("cover_image"),
                "description": desc_map.get(name, f"{name} Collection")
            })
            
        return collections

    @staticmethod
    async def check_delivery_availability(store_id: str, address: Dict[str, Any]) -> Dict[str, Any]:
        """
        Verify deliverability of user address parameters relative to selected store.
        Checks for store capability, state/city limits, and maximum distance constraint if coordinates are provided.
        """
        store = await StoreService.get_store_by_id(store_id)
        if not store:
            return {"deliverable": False, "reason": "Currently unavailable for your location."}
            
        # 1. Store capability check
        if not store.get("delivery_available", True):
            return {"deliverable": False, "reason": "Currently unavailable for your location."}
            
        # 2. State restriction checks
        req_state = address.get("state")
        spec_states = store.get("supported_states")
        if req_state and spec_states:
            normalized_states = [s.strip().lower() for s in spec_states if s]
            if req_state.strip().lower() not in normalized_states:
                return {"deliverable": False, "reason": "Currently unavailable for your location."}

        # 3. City restriction checks
        req_city = address.get("city")
        spec_cities = store.get("supported_cities")
        if req_city and spec_cities:
            normalized_cities = [c.strip().lower() for c in spec_cities if c]
            if req_city.strip().lower() not in normalized_cities:
                return {"deliverable": False, "reason": "Currently unavailable for your location."}

        # 4. Geodistance check if coordinates are provided
        req_lat = address.get("latitude")
        req_lon = address.get("longitude")
        store_lat = store.get("latitude")
        store_lon = store.get("longitude")
        radius_limit = store.get("delivery_radius_km", 15.0)

        if req_lat is not None and req_lon is not None and store_lat is not None and store_lon is not None:
            dist = StoreService.haversine(req_lat, req_lon, store_lat, store_lon)
            if dist > radius_limit:
                return {"deliverable": False, "reason": "Currently unavailable for your location."}

        return {"deliverable": True}
