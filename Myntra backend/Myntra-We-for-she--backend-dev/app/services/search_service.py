import re
import difflib
from typing import List, Dict, Any, Optional, Set
from bson import ObjectId

# Dictionaries Isolated
FASHION_VOCABULARY = [
    "kurta", "lehenga", "saree", "kanchipuram", "wedding", "ethnic", "cotton", "handloom", "silk", "shirt", 
    "trousers", "kurti", "jooti", "kurtas", "sherwanis", "handcrafted", "chikankari", "chanderi", "sarees", 
    "shirts", "lehengas", "bridal", "banarasi", "designer", "georgette", "dhoti", "t-shirts", "formal", 
    "casual", "festive", "floral", "anarkali", "salwar", "kurta set", "kids", "wedding wear", "groom wear"
]

SEARCH_ALIASES = {
    "kurthi": ["kurta", "kurti", "kurta set"],
    "kurti": ["kurta"],
    "kurta set": ["kurta"],
    "lehanga": ["lehenga"],
    "sare": ["saree"],
    "bridal": ["wedding", "lehenga", "ethnic wear"],
    "kids": ["kids wear"],
    "festival": ["festival wear", "ethnic wear"],
    "sherwani": ["wedding wear", "groom wear"]
}

CATEGORY_ALIASES = {
    "saree": [
        "Sarees",
        "Silk Sarees",
        "Designer Sarees",
        "Wedding Sarees",
        "Traditional Sarees",
        "Pure Silk Sarees",
        "Gadwal Sarees",
        "Cotton Sarees"
    ],
    "kurta": [
        "Kurta Sets",
        "Kurtis",
        "Chikankari Kurtas",
        "Anarkali Kurtis",
        "Kurta"
    ],
    "lehenga": [
        "Lehengas",
        "Partywear Lehengas",
        "Bridal Lehengas"
    ]
}

OCCASION_ALIASES = {
    "wedding": [
        "Wedding",
        "Ethnic Wear",
        "Festival Wear",
        "Bridal",
        "Marriage",
        "Reception"
    ],
    "bridal": [
        "Wedding",
        "Ethnic Wear",
        "Festival Wear",
        "Bridal",
        "Marriage",
        "Reception"
    ],
    "festival": [
        "Festival Wear",
        "Ethnic Wear",
        "Traditional"
    ],
    "casual": [
        "Casual",
        "Daily Wear",
        "Office Wear"
    ]
}

PUNCTUATION_RE = re.compile(r'[^\w\s\-]')

class SearchService:
    @staticmethod
    def normalize_query(query: str) -> str:
        """
        Clean search text: lowercase, strip punctuation and extra spaces.
        """
        if not query:
            return ""
        clean = PUNCTUATION_RE.sub(" ", query)
        clean = clean.lower()
        clean = re.sub(r'\s+', ' ', clean).strip()
        return clean

    @staticmethod
    def spell_correct(query: str) -> str:
        """
        Spell check each token against FASHION_VOCABULARY.
        """
        if not query:
            return ""
        words = query.split()
        corrected = []
        for w in words:
            matches = difflib.get_close_matches(w, FASHION_VOCABULARY, n=1, cutoff=0.7)
            corrected.append(matches[0] if matches else w)
        return " ".join(corrected)

    @staticmethod
    def normalize_category(category: Optional[str]) -> Optional[str]:
        if not category:
            return None
        return category.strip().lower()

    @staticmethod
    def normalize_occasion(occasion: Optional[str]) -> Optional[str]:
        if not occasion:
            return None
        return occasion.strip().lower()

    @staticmethod
    def expand_synonyms(query: str) -> Set[str]:
        """
        Expand terms using synonyms dictionary.
        """
        if not query:
            return set()
        words = query.split()
        expanded = set(words)
        for w in words:
            if w in SEARCH_ALIASES:
                for syn in SEARCH_ALIASES[w]:
                    expanded.update(syn.split())
        if len(words) >= 2:
            for i in range(len(words) - 1):
                bigram = f"{words[i]} {words[i+1]}"
                if bigram in SEARCH_ALIASES:
                    for syn in SEARCH_ALIASES[bigram]:
                        expanded.update(syn.split())
        return expanded

    @staticmethod
    def expand_category_aliases(category: Optional[str]) -> List[str]:
        """
        Normalize parent category filter and expand to mapped subcategories.
        """
        if not category:
            return []
        norm_cat = SearchService.normalize_category(category)
        search_terms = {norm_cat}
        if norm_cat in SEARCH_ALIASES:
            search_terms.update(SEARCH_ALIASES[norm_cat])

        matched = set()
        for term in search_terms:
            if term in CATEGORY_ALIASES:
                matched.update(CATEGORY_ALIASES[term])
        
        if matched:
            return list(matched)
        return [category]

    @staticmethod
    def expand_occasion_aliases(occasion: Optional[str]) -> List[str]:
        """
        Normalize and map occasion values to their corresponding aliases list.
        """
        if not occasion:
            return []
        norm_occ = SearchService.normalize_occasion(occasion)
        search_terms = {norm_occ}
        if norm_occ in SEARCH_ALIASES:
            search_terms.update(SEARCH_ALIASES[norm_occ])

        matched = set()
        for term in search_terms:
            if term in OCCASION_ALIASES:
                matched.update(OCCASION_ALIASES[term])
                
        if matched:
            return list(matched)
        return [occasion]

    @staticmethod
    def parse_store_ids(store_ids_csv: Optional[str]) -> List[ObjectId]:
        if not store_ids_csv:
            return []
        parsed = []
        for raw_id in store_ids_csv.split(","):
            clean_id = raw_id.strip()
            if clean_id and ObjectId.is_valid(clean_id):
                parsed.append(ObjectId(clean_id))
        return parsed

    @staticmethod
    def build_product_query(
        search: Optional[str] = None,
        store_ids: Optional[str] = None,
        category: Optional[str] = None,
        gender: Optional[str] = None,
        occasion: Optional[str] = None,
        price_min: Optional[float] = None,
        price_max: Optional[float] = None,
        available: Optional[bool] = None,
        store_map: Optional[Dict[ObjectId, str]] = None
    ) -> Dict[str, Any]:
        """
        Constructs the entire MongoDB filter query pipeline utilizing partial matches, synonym,
        parent category, and occasion aliases maps.
        """
        and_conditions = []

        # 1. Search Query
        if search and search.strip():
            normalized = SearchService.normalize_query(search)
            corrected = SearchService.spell_correct(normalized)
            expanded_terms = SearchService.expand_synonyms(corrected)
            
            if expanded_terms:
                or_conditions = []
                for term in expanded_terms:
                    escaped_term = re.escape(term)
                    regex_predicate = {"$regex": escaped_term, "$options": "i"}
                    
                    or_conditions.append({"name": regex_predicate})
                    or_conditions.append({"category": regex_predicate})
                    or_conditions.append({"description": regex_predicate})
                    or_conditions.append({"occasion": regex_predicate})
                    or_conditions.append({"gender": regex_predicate})
                    
                    if store_map:
                        store_hits = [
                            store_uuid for store_uuid, store_name in store_map.items()
                            if term in store_name.lower()
                        ]
                        if store_hits:
                            or_conditions.append({"store_id": {"$in": store_hits}})
                if or_conditions:
                    and_conditions.append({"$or": or_conditions})

        # 2. Category Normalization & Expansion
        if category:
            categories_expanded = SearchService.expand_category_aliases(category)
            cat_or_predicates = [
                {"category": {"$regex": re.escape(c), "$options": "i"}}
                for c in categories_expanded
            ]
            if cat_or_predicates:
                and_conditions.append({"$or": cat_or_predicates})

        # 3. Occasion Normalization & Description matching
        if occasion:
            occasions_expanded = SearchService.expand_occasion_aliases(occasion)
            occ_or_predicates = []
            for occ in occasions_expanded:
                regex_pred = {"$regex": re.escape(occ), "$options": "i"}
                occ_or_predicates.append({"occasion": regex_pred})
                occ_or_predicates.append({"description": regex_pred})
            if occ_or_predicates:
                and_conditions.append({"$or": occ_or_predicates})

        # 4. Gender Target
        if gender:
            and_conditions.append({"gender": {"$regex": re.escape(gender.strip()), "$options": "i"}})

        # 5. Store IDs constraints
        if store_ids:
            store_uuids = SearchService.parse_store_ids(store_ids)
            if store_uuids:
                and_conditions.append({"store_id": {"$in": store_uuids}})

        # 6. Availability filter
        if available is not None:
            and_conditions.append({"is_available": available})

        # 7. Price Limits check
        price_filter = {}
        if price_min is not None:
            price_filter["$gte"] = price_min
        if price_max is not None:
            price_filter["$lte"] = price_max
        if price_filter:
            and_conditions.append({
                "$or": [
                    {"discount_price": {**price_filter}, "discount_price": {"$ne": None}},
                    {"price": {**price_filter}, "discount_price": None}
                ]
            })

        return {"$and": and_conditions} if and_conditions else {}

    @staticmethod
    def rank_results(
        products: List[Dict[str, Any]],
        query_str: Optional[str] = None,
        category: Optional[str] = None,
        occasion: Optional[str] = None,
        store_map: Optional[Dict[str, str]] = None
    ) -> List[Dict[str, Any]]:
        """
        Rank search relevance using query input keywords, expanded synonyms, corrected word lists,
        normalised categories, and occasions mappings.
        """
        if not products:
            return []

        store_map = store_map or {}
        
        # Build score criteria lists
        normalized_query = SearchService.normalize_query(query_str) if query_str else ""
        query_words = normalized_query.split() if normalized_query else []
        
        # Prepopulate expanded terms
        corrected_query = SearchService.spell_correct(normalized_query) if normalized_query else ""
        expanded_keywords = list(SearchService.expand_synonyms(corrected_query)) if corrected_query else []
        
        target_cats = [c.lower() for c in SearchService.expand_category_aliases(category)] if category else []
        target_occs = [o.lower() for o in SearchService.expand_occasion_aliases(occasion)] if occasion else []

        for p in products:
            score = 0.0
            
            p_name_lower = p.get("name", "").lower()
            p_cat_lower = p.get("category", "").lower()
            p_desc_lower = p.get("description", "").lower()
            p_occ_lower = p.get("occasion", "").lower()
            
            # Store Name matching
            p_store_id = str(p.get("store_id", ""))
            p_store_name = store_map.get(p_store_id, "").lower() if p_store_id in store_map else ""

            # 1. Exact Name Match with user raw normalized query
            if normalized_query and p_name_lower.strip() == normalized_query:
                score += 1000.0
            # 2. Substring Name Match
            elif normalized_query and normalized_query in p_name_lower:
                score += 500.0

            # 3. Expanded Synonym Match inside name
            for keyword in expanded_keywords:
                if keyword in p_name_lower:
                    score += 100.0

            # 4. Category Match
            if target_cats and p_cat_lower in target_cats:
                score += 100.0
            for keyword in expanded_keywords:
                if keyword in p_cat_lower:
                    score += 20.0

            # 5. Occasion Match (exact or description)
            if target_occs:
                if p_occ_lower in target_occs:
                    score += 80.0
                desc_occ_hits = 0
                for occ in target_occs:
                    if occ in p_desc_lower:
                        desc_occ_hits += 1
                score += min(desc_occ_hits * 15.0, 30.0)
            for keyword in expanded_keywords:
                if keyword in p_occ_lower:
                    score += 15.0

            # 6. Store Match
            if p_store_name:
                for keyword in expanded_keywords:
                    if keyword in p_store_name:
                        score += 50.0

            # 7. Description Match
            desc_keyword_hits = 0
            for keyword in expanded_keywords:
                if keyword in p_desc_lower:
                    desc_keyword_hits += 1
            score += min(desc_keyword_hits * 10.0, 50.0)

            # Metadata priorities (tie-breakers)
            # 8. Featured priority
            if p.get("is_featured", False):
                score += 5.0
                
            # 9. Availability priority
            if p.get("is_available", True):
                score += 4.0
                
            # 10. Rating contribution
            score += float(p.get("rating", 0.0)) * 0.1
            
            # 11. Discount contribution
            score += (float(p.get("discount_percentage", 0.0)) / 100.0) * 0.5
            
            # 12. Newest timestamp contribution
            created = p.get("created_at")
            from datetime import datetime
            if isinstance(created, datetime):
                score += (created.timestamp() / 2e10)
            elif isinstance(created, str):
                try:
                    dt = datetime.fromisoformat(created.replace("Z", "+00:00"))
                    score += (dt.timestamp() / 2e10)
                except ValueError:
                    pass

            p["relevance_score"] = round(score, 4)

        # Sort descending by relevance score
        products.sort(key=lambda item: -item.get("relevance_score", 0.0))
        return products
