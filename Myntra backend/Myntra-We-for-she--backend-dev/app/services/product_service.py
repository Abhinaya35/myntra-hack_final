from datetime import datetime
from typing import List, Dict, Any, Optional
from bson import ObjectId
from database.database import db_instance
from app.services.search_service import SearchService

class ProductService:
    @staticmethod
    def parse_store_ids(store_ids_csv: Optional[str]) -> List[ObjectId]:
        """
        Utility parsing helper that splits a comma-separated query parameter string for store IDs,
        validates each token is a valid MongoDB ObjectId, and compiles them into a List of ObjectIds.
        """
        if not store_ids_csv:
            return []
        
        parsed = []
        for raw_id in store_ids_csv.split(","):
            clean_id = raw_id.strip()
            if clean_id and ObjectId.is_valid(clean_id):
                parsed.append(ObjectId(clean_id))
        return parsed

    @staticmethod
    async def get_store_products(
        store_id: str,
        category: Optional[str] = None,
        gender: Optional[str] = None,
        occasion: Optional[str] = None,
        price_min: Optional[float] = None,
        price_max: Optional[float] = None,
        available: Optional[bool] = None,
        sort: str = "relevance"
    ) -> List[Dict[str, Any]]:
        """
        Retrieve products registered under a specific store.
        Delegates to get_products with store_ids filter restricted to store_id.
        """
        return await ProductService.get_products(
            store_ids=store_id,
            category=category,
            gender=gender,
            occasion=occasion,
            price_min=price_min,
            price_max=price_max,
            available=available,
            sort=sort
        )

    @staticmethod
    async def get_products(
        search: Optional[str] = None,
        store_ids: Optional[str] = None,
        category: Optional[str] = None,
        gender: Optional[str] = None,
        occasion: Optional[str] = None,
        price_min: Optional[float] = None,
        price_max: Optional[float] = None,
        available: Optional[bool] = None,
        sort: str = "relevance"
    ) -> List[Dict[str, Any]]:
        """
        Global product discovery catalog. Delegates all search intelligence (spelling correction,
        alias expansion, query generation) to the common SearchService which is ready for future
        Elasticsearch transition.
        """
        # 1. Fetch store map (needed for name matching and relevance scoring)
        stores_cursor = db_instance.db.stores.find({}, {"name": 1})
        stores = await stores_cursor.to_list(length=200)
        store_map = {store["_id"]: store["name"] for store in stores}
        store_map_str = {str(k): v for k, v in store_map.items()}

        # 2. Build MongoDB query filter using SearchService query builder
        query_filter = SearchService.build_product_query(
            search=search,
            store_ids=store_ids,
            category=category,
            gender=gender,
            occasion=occasion,
            price_min=price_min,
            price_max=price_max,
            available=available,
            store_map=store_map
        )

        # 3. Query DB
        cursor = db_instance.db.products.find(query_filter)
        products = await cursor.to_list(length=1000)

        # 4. Apply Relevance Ranking Metrics via SearchService
        products = SearchService.rank_results(
            products=products,
            query_str=search,
            category=category,
            occasion=occasion,
            store_map=store_map_str
        )

        # 5. Handle user chosen hard-sorting rules (if other than relevance)
        if sort == "price_low_to_high":
            products.sort(key=lambda p: (
                0 if p.get("is_available", True) else 1,
                float(p.get("discount_price") if p.get("discount_price") is not None else p.get("price", 0.0))
            ))
        elif sort == "price_high_to_low":
            products.sort(key=lambda p: (
                0 if p.get("is_available", True) else 1,
                -float(p.get("discount_price") if p.get("discount_price") is not None else p.get("price", 0.0))
            ))
        elif sort == "rating":
            products.sort(key=lambda p: (
                0 if p.get("is_available", True) else 1,
                -float(p.get("rating", 0.0))
            ))
        elif sort == "discount":
            products.sort(key=lambda p: (
                0 if p.get("is_available", True) else 1,
                -float(p.get("discount_percentage", 0.0))
            ))
        elif sort == "newest":
            def get_timestamp(p: Dict[str, Any]) -> float:
                created = p.get("created_at")
                if isinstance(created, datetime):
                    return created.timestamp()
                elif isinstance(created, str):
                    try:
                        return datetime.fromisoformat(created.replace("Z", "+00:00")).timestamp()
                    except ValueError:
                        return 0.0
                return 0.0
            
            products.sort(key=lambda p: (
                0 if p.get("is_available", True) else 1,
                -get_timestamp(p)
            ))
        else:
            # Default sorting rules (relevance already handled by SearchService.rank_results)
            pass

        return products

    @staticmethod
    async def get_product_details(product_id: str) -> Optional[Dict[str, Any]]:
        """
        Retrieves a product by ID, merges linked Store details, maps variant specifications,
        sizes, colors directly from MongoDB, returning a grouped ProductDetailsResponse format.
        """
        if not product_id:
            return None

        # 1. Fetch Product
        product = await db_instance.db.products.find_one({"_id": product_id})
        if not product:
            return None

        # 2. Fetch Store (if store_id set)
        store = None
        store_id = product.get("store_id")
        if store_id:
            store = await db_instance.db.stores.find_one({"_id": store_id if isinstance(store_id, ObjectId) else ObjectId(store_id)})

        # 3. Resolve Store Summary details (Highlight Regional USP)
        store_summary = None
        if store:
            shopping_hub_name = None
            hub_id = store.get("shopping_hub_id")
            if hub_id:
                hub = await db_instance.db.shopping_hubs.find_one({"_id": hub_id})
                if hub:
                    shopping_hub_name = hub.get("name")
            
            store_summary = {
                "id": str(store["_id"]),
                "name": store.get("name"),
                "shopping_hub": shopping_hub_name,
                "city": store.get("city"),
                "google_rating": store.get("google_rating", 4.2),
                "years_in_business": store.get("years_in_business", 5),
                "description": store.get("description"),
                "is_verified": store.get("is_verified", False),
                "specialties": store.get("specialties", []),
                "logo_image": store.get("logo_image"),
                "banner_image": store.get("banner_image"),
                "address": store.get("address"),
                "latitude": store.get("latitude"),
                "longitude": store.get("longitude")
            }

        # 4. Extract size variants
        sizes = [
            {
                "size": s.get("size"),
                "in_stock": s.get("in_stock", True)
            }
            for s in product.get("sizes", [])
        ]

        # 5. Extract color variants
        colors = [
            {
                "name": c.get("name"),
                "hex": c.get("hex", "#7F7F7F"),
                "thumbnail": c.get("thumbnail")
            }
            for c in product.get("colors", [])
        ]

        # 6. Extract Specifications
        specifications = product.get("specifications", {})

        # 7. Generate Rating distribution Breakdown (Remain dynamic!)
        rating_val = float(product.get("rating", 4.3))
        cnt = int(product.get("review_count", 25))
        ratings_dict = {"5": 0, "4": 0, "3": 0, "2": 0, "1": 0}
        if cnt > 0:
            scale_val = max(1.0, min(5.0, rating_val))
            p5 = max(0.0, scale_val - 3.0) / 2.0
            p4 = 1.0 - p5
            w5 = int(cnt * p5 * 0.85)
            w4 = int(cnt * p4 * 0.82)
            w3 = int(cnt * 0.08)
            w2 = int(cnt * 0.04)
            w1 = cnt - (w5 + w4 + w3 + w2)
            if w1 < 0:
                w1 = 0
            diff = cnt - (w5 + w4 + w3 + w2 + w1)
            w5 += diff
            ratings_dict = {
                "5": max(0, w5),
                "4": max(0, w4),
                "3": max(0, w3),
                "2": max(0, w2),
                "1": max(0, w1)
            }

        # 8. Merge and Return formatted details object
        details = {
            "product": {
                "id": str(product["_id"]),
                "store_id": str(product.get("store_id", "")),
                "name": product.get("name"),
                "description": product.get("description"),
                "category": product.get("category"),
                "sub_category": product.get("sub_category"),
                "gender": product.get("gender"),
                "occasion": product.get("occasion"),
                "material": product.get("material"),
                "is_available": product.get("is_available", True),
                "stock_quantity": product.get("stock_quantity", 10),
                "origin": product.get("origin"),
                "is_gi_certified": product.get("is_gi_certified", False),
                "created_at": product.get("created_at"),
                "thumbnail": product.get("thumbnail"),
                "images": product.get("images", [])
            },
            "pricing": {
                "price": product.get("price"),
                "discount_price": product.get("discount_price"),
                "discount_percentage": product.get("discount_percentage")
            },
            "variants": {
                "sizes": sizes,
                "colors": colors
            },
            "specifications": specifications,
            "ratings": {
                "average_rating": rating_val,
                "review_count": cnt,
                "rating_distribution": ratings_dict
            },
            "store": store_summary
        }
        return details

    @staticmethod
    async def get_similar_recommendations(product_id: str, limit: int = 10) -> List[Dict[str, Any]]:
        """
        Recommend products most similar to current product irrespective of regional store.
        Ranks by sub-category, category, occasion, material, gender, price difference, rating, color and brand.
        """
        p = await db_instance.db.products.find_one({"_id": product_id})
        if not p:
            return []

        cursor = db_instance.db.products.find({"_id": {"$ne": product_id}})
        candidates = await cursor.to_list(length=1000)

        p_price = p.get("price", 0)
        p_colors = [col.get("name", "").lower() for col in p.get("colors", []) if isinstance(col, dict)]

        scored = []
        for c in candidates:
            score = 0.0
            reasons = []

            # 1. Sub Category
            if c.get("sub_category") == p.get("sub_category") and p.get("sub_category"):
                score += 10.0
                reasons.append("Same Sub-Category")
            # 2. Category
            elif c.get("category") == p.get("category") and p.get("category"):
                score += 8.0
                reasons.append("Same Category")

            # 3. Occasion
            if c.get("occasion") == p.get("occasion") and p.get("occasion"):
                score += 6.0
                reasons.append("Same Occasion")

            # 4. Material
            if c.get("material") == p.get("material") and p.get("material"):
                score += 4.0
                reasons.append("Same Material")

            # 5. Gender
            if c.get("gender") == p.get("gender") and p.get("gender"):
                score += 3.0

            # 6. Price Range (+-20%)
            c_price = c.get("price", 0)
            if p_price > 0:
                price_diff = abs(c_price - p_price)
                if (price_diff / p_price) <= 0.20:
                    score += 3.0
                    reasons.append("Similar Price")

            # 7. Rating
            c_rating = c.get("rating", 0.0)
            score += c_rating * 0.4  # up to 2 pts
            if c_rating >= 4.4:
                reasons.append("Highly Rated")

            # 8. Same Color
            c_colors = [col.get("name", "").lower() for col in c.get("colors", []) if isinstance(col, dict)]
            if any(col in p_colors for col in c_colors):
                score += 1.0
                reasons.append("Similar Color")

            # 9. Same Brand
            if c.get("brand") == p.get("brand") and p.get("brand"):
                score += 1.0
                reasons.append("Same Brand")

            # Format Consolidated Reason
            if not reasons:
                reason_str = "Popular Alternative"
            elif len(reasons) >= 2:
                # Prioritize distinct fields for primary reason string
                reason_str = f"{reasons[0]} • {reasons[1]}"
            else:
                reason_str = reasons[0]

            scored.append({
                "candidate": c,
                "score": score,
                "reason": reason_str
            })

        # Sort descending by relevance score
        scored.sort(key=lambda x: x["score"], reverse=True)

        results = []
        for item in scored[:limit]:
            cand = item["candidate"]
            results.append({
                "id": str(cand["_id"]),
                "store_id": str(cand.get("store_id", "")),
                "name": cand.get("name"),
                "price": cand.get("price"),
                "discount_price": cand.get("discount_price"),
                "discount_percentage": cand.get("discount_percentage"),
                "category": cand.get("category"),
                "brand": cand.get("brand"),
                "is_available": cand.get("is_available", True),
                "thumbnail": cand.get("thumbnail"),
                "rating": cand.get("rating", 4.0),
                "recommendation_reason": item["reason"]
            })
        return results

    @staticmethod
    async def get_store_recommendations(product_id: str, limit: int = 10) -> Dict[str, Any]:
        """
        Recommend products from the same Regional Store while preserving user shopping intent.
        """
        p = await db_instance.db.products.find_one({"_id": product_id})
        if not p:
            return {"section_title": "More From This Store", "products": []}

        store_name = "Store"
        store = await db_instance.db.stores.find_one({"_id": p.get("store_id") if isinstance(p.get("store_id"), ObjectId) else ObjectId(p.get("store_id"))})
        if store:
            store_name = store.get("name", "Store")

        # 1. Fetch Candidates from same store, excluding current product
        cursor = db_instance.db.products.find({
            "store_id": p.get("store_id"),
            "_id": {"$ne": product_id}
        })
        candidates = await cursor.to_list(length=100)

        # 2. Build Category Intent Match Heuristics
        p_text = f"{p.get('category', '')} {p.get('sub_category', '')} {p.get('name', '')}".lower()
        
        # Categorized sets
        kurta_keywords = ["kurta", "kurti", "anarkali", "salwar", "churidar", "suit", "set", "chikankari"]
        saree_keywords = ["saree", "sari", "pattu", "lehenga", "blouse"]
        men_keywords = ["sherwani", "dhoti", "kurta", "jacket", "menswear"]

        p_type = None
        if any(k in p_text for k in kurta_keywords):
            p_type = "kurta"
        elif any(k in p_text for k in saree_keywords):
            p_type = "saree"
        elif any(k in p_text for k in men_keywords):
            p_type = "men"

        p_price = p.get("price", 0)

        scored = []
        for c in candidates:
            c_text = f"{c.get('category', '')} {c.get('sub_category', '')} {c.get('name', '')}".lower()
            score = 0.0
            intent_matched = False

            # Intent boost (+50 pts)
            if p_type == "kurta" and any(k in c_text for k in kurta_keywords):
                score += 50.0
                intent_matched = True
            elif p_type == "saree" and any(k in c_text for k in saree_keywords):
                score += 50.0
                intent_matched = True
            elif p_type == "men" and any(k in c_text for k in men_keywords):
                score += 50.0
                intent_matched = True
            elif c.get("category") == p.get("category"):
                score += 50.0
                intent_matched = True

            # Metadata matches
            if c.get("sub_category") == p.get("sub_category") and p.get("sub_category"):
                score += 10.0
            if c.get("category") == p.get("category") and p.get("category"):
                score += 8.0
            if c.get("occasion") == p.get("occasion") and p.get("occasion"):
                score += 6.0
            if c.get("material") == p.get("material") and p.get("material"):
                score += 4.0

            # Price Match
            c_price = c.get("price", 0)
            if p_price > 0 and abs(c_price - p_price)/p_price <= 0.20:
                score += 2.0

            # Rating Match
            score += c.get("rating", 0.0) * 0.4

            # Recommendation Reason Design
            reasons = []
            if intent_matched:
                if c.get("sub_category") == p.get("sub_category") and p.get("sub_category"):
                    reasons.append("Same Collection")
                if c.get("occasion") == p.get("occasion") and p.get("occasion"):
                    reasons.append("Same Occasion")
            
            if not reasons:
                if c.get("rating", 0) >= 4.3:
                    reasons.append("Popular in this store")
                else:
                    reasons.append("From the same trusted regional store")

            scored.append({
                "candidate": c,
                "score": score,
                "reason": reasons[0]
            })

        # Sort descending by score
        scored.sort(key=lambda x: x["score"], reverse=True)

        results = []
        for item in scored[:limit]:
            cand = item["candidate"]
            results.append({
                "id": str(cand["_id"]),
                "store_id": str(cand.get("store_id", "")),
                "name": cand.get("name"),
                "price": cand.get("price"),
                "discount_price": cand.get("discount_price"),
                "discount_percentage": cand.get("discount_percentage"),
                "category": cand.get("category"),
                "brand": cand.get("brand"),
                "is_available": cand.get("is_available", True),
                "thumbnail": cand.get("thumbnail"),
                "rating": cand.get("rating", 4.0),
                "recommendation_reason": item["reason"]
            })

        # Section Title Builder
        intent_title = "Ethnic Collections"
        if p_type == "saree":
            intent_title = "Traditional Sarees"
        elif p_type == "kurta":
            intent_title = "Kurta Sets"
        elif p_type == "men":
            intent_title = "Men's Ethnic Wear"
        elif p.get("sub_category"):
            intent_title = p.get("sub_category")
        elif p.get("category"):
            intent_title = f"{p.get('category')}s" if not p.get("category", "").endswith("s") else p.get("category")

        section_title = f"More {intent_title} from {store_name}"

        return {
            "section_title": section_title,
            "products": results
        }
