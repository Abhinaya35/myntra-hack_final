import re
from typing import List, Dict, Any, Optional
from database.database import db_instance

class ShoppingHubService:
    @staticmethod
    async def get_all_states() -> List[Dict[str, Any]]:
        """
        Dynamically groups shopping hubs in MongoDB by state to construct
        a unique list of states with respective hub counts and image URLs.
        """
        pipeline = [
            {
                "$group": {
                    "_id": "$state",
                    "shopping_hub_count": {"$sum": 1}
                }
            }
        ]
        cursor = db_instance.db.shopping_hubs.aggregate(pipeline)
        grouped_results = await cursor.to_list(length=100)

        states_list = []
        for group in grouped_results:
            state_name = group["_id"]
            if not state_name:
                continue
            
            # Slugify the state name for ID and standard URLs
            state_id = state_name.lower().strip().replace(" ", "-")
            image_url = f"https://example.com/states/{state_id}.png"
            
            states_list.append({
                "id": state_id,
                "name": state_name,
                "image": image_url,
                "shopping_hub_count": group["shopping_hub_count"]
            })

        # Sort states alphabetically by name
        states_list.sort(key=lambda s: s["name"].lower())
        return states_list

    @staticmethod
    async def get_featured_hubs(
        state: Optional[str] = None,
        featured: Optional[bool] = None
    ) -> List[Dict[str, Any]]:
        """
        Retrieves shopping hubs from MongoDB.
        Supports filtering by state (case-insensitive keyword matching) and featured status.
        Excludes region from public schemas output.
        """
        query_filter = {}
        if state:
            query_filter["state"] = {"$regex": f"^{state.strip()}$", "$options": "i"}
        if featured is not None:
            query_filter["featured"] = featured

        cursor = db_instance.db.shopping_hubs.find(query_filter)
        hubs = await cursor.to_list(length=100)

        # Sort featured first, then by name ascending
        hubs.sort(key=lambda h: (-1 if h.get("featured", False) else 0, h.get("name", "").lower()))
        return hubs

    @staticmethod
    async def get_hub_by_id(hub_id: str) -> Optional[Dict[str, Any]]:
        """
        Retrieves a single shopping hub by its string unique ID (e.g. 'hyd').
        """
        hub = await db_instance.db.shopping_hubs.find_one({"_id": hub_id.strip()})
        return hub

    @staticmethod
    async def get_hub_stores(hub_id: str) -> List[Dict[str, Any]]:
        """
        Returns all trusted stores belonging to a selected Shopping Hub.
        Matches stores where shopping_hub_id equals the hub_id.
        """
        cursor = db_instance.db.stores.find({"shopping_hub_id": hub_id.strip()})
        stores = await cursor.to_list(length=100)
        # Sort stores by years_in_business descending, then name ascending
        stores.sort(key=lambda s: (-s.get("years_in_business", 0), s.get("name", "").lower()))
        return stores

    @staticmethod
    async def search_hubs(
        query: str,
        state: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Searches across: Name, State, Description, and Categories.
        Uses case-insensitive partial substring matching (regex).
        If state is specified, searches only nodes within that state.
        """
        if not query or not query.strip():
            return []

        search_term = query.strip()
        
        # Build standard regex query to match any of the fields partially
        # Safely escape the query string to prevent regex injection
        escaped_query = re.escape(search_term)
        regex_query = {"$regex": escaped_query, "$options": "i"}

        or_conditions = [
            {"name": regex_query},
            {"state": regex_query},
            {"description": regex_query},
            {"categories": regex_query}
        ]

        query_filter = {"$or": or_conditions}
        if state:
            query_filter["state"] = {"$regex": f"^{state.strip()}$", "$options": "i"}

        cursor = db_instance.db.shopping_hubs.find(query_filter)
        hubs = await cursor.to_list(length=100)

        # Map relevance score dynamically for sorting:
        # 1. Exact Name match gets highest
        # 2. Starts with name match gets second
        # 3. Substring match gets third
        results = []
        lower_term = search_term.lower()
        for hub in hubs:
            name = hub.get("name", "").lower()
            if name == lower_term:
                score = 100.0
            elif name.startswith(lower_term):
                score = 75.0
            else:
                score = 50.0
            
            hub["relevance_score"] = score
            results.append(hub)

        # Sort by relevance_score descending, then name ascending
        results.sort(key=lambda h: (-h.get("relevance_score", 0.0), h.get("name", "").lower()))
        return results
