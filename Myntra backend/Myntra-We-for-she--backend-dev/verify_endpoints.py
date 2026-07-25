import urllib.request
import json
import sys

def test_endpoint(url, expected_min_count=None, check_keys_present=None, check_keys_absent=None, custom_assert=None):
    print(f"Testing Endpoint: {url} ...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            print("  SUCCESS!")
            
            target_data = data
            is_paginated_list = isinstance(data, dict) and "products" in data and "total" in data
            if is_paginated_list:
                target_data = data["products"]
                print(f"  [Paginated List] total count metadata: {data['total']}")
            
            if expected_min_count is not None:
                if not isinstance(target_data, list):
                    print(f"  CRITICAL ERROR: Expected list representation, got {type(target_data)}!")
                    sys.exit(1)
                if len(target_data) < expected_min_count:
                    print(f"  CRITICAL ERROR: Expected count at least {expected_min_count}, got {len(target_data)}!")
                    sys.exit(1)
                print(f"  [OK] Returned matches: {len(target_data)}")
                
            if isinstance(target_data, list) and len(target_data) > 0:
                item = target_data[0]
            elif isinstance(target_data, list) and len(target_data) == 0:
                item = {}
            else:
                item = target_data
                
            if check_keys_present:
                for k in check_keys_present:
                    target_obj = data if k in ["products", "total"] else item
                    if k not in target_obj:
                        print(f"  CRITICAL ERROR: Key '{k}' is missing from response!")
                        print(f"  Checked object keys: {list(target_obj.keys())}")
                        sys.exit(1)
                print(f"  [OK] Validated keys present: {check_keys_present}")
                
            if check_keys_absent:
                for k in check_keys_absent:
                    target_obj = data if k in ["products", "total"] else item
                    if k in target_obj:
                        print(f"  CRITICAL ERROR: Key '{k}' was found in response but should be absent!")
                        sys.exit(1)
                print(f"  [OK] Validated keys absent: {check_keys_absent}")
                
            if custom_assert:
                custom_assert(data)
                print("  [OK] Custom assertion passed.")
            print("  --------------------------------------")
    except Exception as e:
        print(f"  FAILED: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    # ----------------- REGISTRATION MODULE VERIFICATIONS -----------------
    # Test 1: GET /states
    def assert_states_count(data):
        states_names = [s["name"] for s in data]
        print(f"  Available states: {states_names}")
        if "Telangana" not in states_names:
            print("  CRITICAL ERROR: Telangana is missing from states directory!")
            sys.exit(1)
    test_endpoint(
        "http://localhost:8000/states",
        expected_min_count=9,
        check_keys_present=["id", "name", "image", "shopping_hub_count"],
        check_keys_absent=["_id"],
        custom_assert=assert_states_count
    )
    
    # Test 2: GET /shopping-hubs
    test_endpoint(
        "http://localhost:8000/shopping-hubs", 
        expected_min_count=14, 
        check_keys_present=["id", "name", "state", "description", "banner_image", "categories", "store_count", "featured"],
        check_keys_absent=["_id", "region"]
    )
    
    # Test 3: GET /shopping-hubs with state filter
    test_endpoint("http://localhost:8000/shopping-hubs?state=Telangana", expected_min_count=3)
    
    # Test 4: GET /shopping-hubs?featured=true
    test_endpoint("http://localhost:8000/shopping-hubs?featured=true", expected_min_count=9)
    
    # Test 5: GET /shopping-hubs/hyd
    test_endpoint(
        "http://localhost:8000/shopping-hubs/hyd",
        check_keys_present=["id", "name", "cover_image", "latitude", "longitude", "created_at"],
        check_keys_absent=["_id", "region"]
    )
    
    # Test 6: GET /shopping-hubs/hyd/stores
    test_endpoint(
        "http://localhost:8000/shopping-hubs/hyd/stores",
        expected_min_count=5,
        check_keys_present=["_id", "name", "trust_score", "logo_image", "specialties"],
        check_keys_absent=["shopping_hub_id", "google_rating", "review_count"]
    )
    
    # Fetch a real store ID dynamically to run products module tests
    req = urllib.request.Request("http://localhost:8000/shopping-hubs/hyd/stores", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        stores_list = json.loads(resp.read().decode())
        if not stores_list:
            print("CRITICAL ERROR: No stores in Hyderabad hub to run product verification tests!")
            sys.exit(1)
        target_store = stores_list[0]
        target_store_unique_id = target_store["_id"]
        target_store_name = target_store["name"]
        print(f"\n[INFO] Running Product Module Tests with Store: '{target_store_name}' (ID: {target_store_unique_id})\n")

    # ----------------- PRODUCT MODULE VERIFICATIONS -----------------
    # Test 7: Fetch all products (unfiltered)
    def assert_global_products(data):
        if data["total"] != 132:
            print(f"  CRITICAL ERROR: Expected total 132 products, got {data['total']}!")
            sys.exit(1)
    test_endpoint(
        "http://localhost:8000/products",
        check_keys_present=["products", "total"],
        custom_assert=assert_global_products
    )
    
    # Test 8: Check key presence/absence on a single returned Product Card (ensuring lightweight payload)
    test_endpoint(
        "http://localhost:8000/products",
        check_keys_present=["id", "name", "thumbnail", "price", "discount_price", "discount_percentage", "rating", "category", "brand", "is_available"],
        check_keys_absent=["description", "sizes", "images", "stock_quantity", "_id"]
    )
    
    # Test 9: GET /stores/{storeId}/products
    test_endpoint(
        f"http://localhost:8000/stores/{target_store_unique_id}/products",
        expected_min_count=1,
        check_keys_present=["id", "name", "price", "category", "brand", "is_available"],
        check_keys_absent=["description", "sizes", "images", "_id"]
    )

    # Test 10: GET /products with store_ids filter
    test_endpoint(
        f"http://localhost:8000/products?store_ids={target_store_unique_id}",
        expected_min_count=1
    )

    # Test 11: GET /products with search query matching Name or Categories (case-insensitive substring)
    test_endpoint(
        "http://localhost:8000/products?search=silk",
        check_keys_present=["products", "total"]
    )

    # Test 12: GET /products with misspelled query (Spelling Correction Verification)
    test_endpoint(
        "http://localhost:8000/products?search=sare",
        custom_assert=lambda d: any("saree" in p["name"].lower() for p in d["products"])
    )

    # Test 13: GET /products with synonym query (Synonym Expansion Verification)
    test_endpoint(
        "http://localhost:8000/products?search=bridal",
        custom_assert=lambda d: any("lehenga" in p["name"].lower() or "wedding" in p["name"].lower() for p in d["products"])
    )

    # Test 14: Category Normalization & Expansion (`category=saree`)
    # category=saree should match not just exact category Saree, but Silk Sarees, Traditional Sarees, Designer Sarees, etc.
    # Check that returned categories contain multiple variations
    def assert_category_expansion(data):
        cats = {p["category"] for p in data["products"]}
        print(f"  Matched categories for expansion: {cats}")
        # Verify it matched multiple different saree types
        if len(cats) < 2:
            print("  CRITICAL ERROR: Category expansion verification failed! Only matched one category variant.")
            sys.exit(1)
    test_endpoint(
        "http://localhost:8000/products?category=saree",
        expected_min_count=5,
        custom_assert=assert_category_expansion
    )

    # Test 15: Occasion Normalization & Description matching (`occasion=Wedding`)
    # occasion=Wedding should return wedding products, plus those whose occasion is Ethnic Wear but match wedding keywords in description
    def assert_occasion_expansion(data):
        occasions = {p["category"] for p in data["products"]}
        print(f"  Matched count for occasion=Wedding: {len(data['products'])}")
        # Check description matching
        if len(data["products"]) < 5:
            print("  CRITICAL ERROR: Occasion expansion did not fetch expected matches from database.")
            sys.exit(1)
    test_endpoint(
        "http://localhost:8000/products?occasion=Wedding",
        expected_min_count=5,
        custom_assert=assert_occasion_expansion
    )

    # Test 16: GET /products sorting by price low-to-high
    def assert_sort_price_asc(data):
        products = data["products"]
        prices = [p.get("discount_price") if p.get("discount_price") is not None else p["price"] for p in products if p["is_available"]]
        if prices != sorted(prices):
            print(f"  CRITICAL ERROR: Price low to high sort failed! Prices: {prices[:10]}")
            sys.exit(1)
    test_endpoint(
        "http://localhost:8000/products?sort=price_low_to_high",
        custom_assert=assert_sort_price_asc
    )

    # Test 17: GET /products with store search term (resolving store name to stores list mapping)
    test_endpoint(
        "http://localhost:8000/products?search=RS%20Brothers",
        custom_assert=lambda d: any("rs brothers" in p["brand"].lower() for p in d["products"])
    )

    # Fetch a real product ID dynamically
    req = urllib.request.Request("http://localhost:8000/products", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        products_data = json.loads(resp.read().decode())
        prod_list = products_data.get("products", [])
        if not prod_list:
            print("CRITICAL ERROR: No products found in database to run details tests!")
            sys.exit(1)
        valid_product_id = prod_list[0]["id"]
        print(f"\n[INFO] Selected Valid Product ID: '{valid_product_id}' for Details Page Verification.\n")

    # Test 18: GET /products/{productId} for valid product details
    def assert_details_structure(data):
        # Assert groups
        required_groups = ["product", "pricing", "variants", "specifications", "ratings", "store"]
        for g in required_groups:
            if g not in data:
                print(f"  CRITICAL ERROR: Group '{g}' is missing from product details response!")
                sys.exit(1)
        
        prod = data["product"]
        required_prod_keys = ["id", "store_id", "name", "category", "gender", "thumbnail", "images"]
        for k in required_prod_keys:
            if k not in prod:
                print(f"  CRITICAL ERROR: Key '{k}' is missing from nested product details!")
                sys.exit(1)

        pricing = data["pricing"]
        if "price" not in pricing:
            print("  CRITICAL ERROR: Price is missing from pricing details!")
            sys.exit(1)

        variants = data["variants"]
        # Verify sizes nested schema
        sizes_list = variants.get("sizes", [])
        if not isinstance(sizes_list, list) or len(sizes_list) == 0:
            print("  CRITICAL ERROR: 'sizes' is missing or not a populated list!")
            sys.exit(1)
        for s in sizes_list:
            if "size" not in s or "in_stock" not in s:
                print(f"  CRITICAL ERROR: Invalid size object schema: {s}")
                sys.exit(1)

        # Verify colors nested schema
        colors_list = variants.get("colors", [])
        if not isinstance(colors_list, list):
            print("  CRITICAL ERROR: 'colors' is not a list!")
            sys.exit(1)
        for c in colors_list:
            if "name" not in c or "hex" not in c or "thumbnail" not in c:
                print(f"  CRITICAL ERROR: Invalid color object schema: {c}")
                sys.exit(1)

        # Verify specifications dictionary
        specs = data["specifications"]
        if not isinstance(specs, dict) or "Material" not in specs or "Fabric" not in specs:
            print(f"  CRITICAL ERROR: Specifications is missing or lacks basic keys: {specs}")
            sys.exit(1)

        # Verify ratings
        rs = data["ratings"]
        if "average_rating" not in rs or "review_count" not in rs or "rating_distribution" not in rs:
            print(f"  CRITICAL ERROR: ratings object is invalid: {rs}")
            sys.exit(1)
        dist = rs["rating_distribution"]
        for star in ["1", "2", "3", "4", "5"]:
            if star not in dist:
                print(f"  CRITICAL ERROR: rating_distribution is missing star key '{star}'!")
                sys.exit(1)

        # Verify store card is included (Highlight regional trust USP)
        sc = data["store"]
        if sc is not None:
            store_card_keys = ["id", "name", "shopping_hub", "city", "google_rating", "years_in_business", "address", "latitude", "longitude", "specialties"]
            for k in store_card_keys:
                if k not in sc:
                    print(f"  CRITICAL ERROR: Store summary is missing regional key '{k}'!")
                    sys.exit(1)
            
            # Check custom specialties and logo fields
            if not sc.get("specialties") or not sc.get("logo_image"):
                print(f"  CRITICAL ERROR: Specialties or logo_image is blank inside store summary: {sc}")
                sys.exit(1)
                
            print(f"  [OK] verified store details: '{sc['name']}' from '{sc['shopping_hub']}' hub is present and showcases trust indicators")
            print(f"  [OK] specialties: {sc['specialties']}")
            print(f"  [OK] logo_image: {sc['logo_image']}")
        else:
            print("  [WARNING] store card was null")

    test_endpoint(
        f"http://localhost:8000/products/{valid_product_id}",
        custom_assert=assert_details_structure
    )

    # Test 19: GET /products/{invalidId} (expect HTTP 400 Bad Request)
    print("Testing Endpoint: http://localhost:8000/products/invalid_id (expecting 400)...")
    try:
        req = urllib.request.Request("http://localhost:8000/products/invalid_id", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            print("  CRITICAL ERROR: Expected 400 Bad Request, but request succeeded!")
            sys.exit(1)
    except urllib.error.HTTPError as he:
        if he.code == 400:
            print("  SUCCESS! Got exception code 400 Bad Request.")
        else:
            print(f"  CRITICAL ERROR: Expected HTTP 400, got {he.code}!")
            sys.exit(1)
    except Exception as e:
        print(f"  CRITICAL ERROR: Got unexpected error: {e}")
        sys.exit(1)
    print("  --------------------------------------")

    # Test 20: GET /products/{nonExistentId} (expect HTTP 404 Not Found)
    non_existent = "60c72b2f9b1d8e1f5c6b4569"
    print(f"Testing Endpoint: http://localhost:8000/products/{non_existent} (expecting 404)...")
    try:
        req = urllib.request.Request(f"http://localhost:8000/products/{non_existent}", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            print("  CRITICAL ERROR: Expected 404 Not Found, but request succeeded!")
            sys.exit(1)
    except urllib.error.HTTPError as he:
        if he.code == 404:
            print("  SUCCESS! Got exception code 404 Not Found.")
        else:
            print(f"  CRITICAL ERROR: Expected HTTP 404, got {he.code}!")
            sys.exit(1)
    except Exception as e:
        print(f"  CRITICAL ERROR: Got unexpected error: {e}")
        sys.exit(1)
    print("  --------------------------------------")

    # Test 21: GET /products/{productId}/recommendations/similar
    def assert_similar_recs(data):
        if "products" not in data:
            print("  CRITICAL ERROR: Similar recommendations missing 'products' key!")
            sys.exit(1)
        products = data["products"]
        if not isinstance(products, list) or len(products) == 0:
            print("  CRITICAL ERROR: Similar recommendations 'products' list is empty!")
            sys.exit(1)
        
        # Check first card structure and reason
        card = products[0]
        card_keys = ["id", "store_id", "name", "price", "thumbnail", "rating", "recommendation_reason"]
        for k in card_keys:
            if k not in card:
                print(f"  CRITICAL ERROR: Similar recommendation card missing key: '{k}'")
                sys.exit(1)
        
        # Exclude self
        if any(p["id"] == valid_product_id for p in products):
            print("  CRITICAL ERROR: Viewed product itself returned in similar recommendations list!")
            sys.exit(1)
        print(f"  [OK] verified similar matches count: {len(products)}")
        print(f"  [OK] first similar product recommendation reason: '{card['recommendation_reason']}'")

    test_endpoint(
        f"http://localhost:8000/products/{valid_product_id}/recommendations/similar",
        custom_assert=assert_similar_recs
    )

    # Test 22: GET /products/{productId}/recommendations/store
    def assert_store_recs(data):
        if "products" not in data or "section_title" not in data:
            print("  CRITICAL ERROR: Store recommendations missing 'products' or 'section_title' key!")
            sys.exit(1)
        products = data["products"]
        title = data["section_title"]
        if not title:
            print("  CRITICAL ERROR: Store recommendations section title is empty!")
            sys.exit(1)
        
        if not isinstance(products, list) or len(products) == 0:
            print("  CRITICAL ERROR: Store recommendations 'products' list is empty!")
            sys.exit(1)

        # Check first card
        card = products[0]
        card_keys = ["id", "store_id", "name", "price", "thumbnail", "rating", "recommendation_reason"]
        for k in card_keys:
            if k not in card:
                print(f"  CRITICAL ERROR: Store recommendation card missing key: '{k}'")
                sys.exit(1)

        # Retrieve viewed product parent store_id from details first
        req_det = urllib.request.Request(f"http://localhost:8000/products/{valid_product_id}", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req_det) as resp_det:
            det_data = json.loads(resp_det.read().decode())
            target_store_id = det_data["product"]["store_id"]
            
        # Verify same store and exclusion
        for p in products:
            if p["store_id"] != target_store_id:
                print(f"  CRITICAL ERROR: Store recommendation item parent store ID '{p['store_id']}' doesn't match expected '{target_store_id}'!")
                sys.exit(1)
            if p["id"] == valid_product_id:
                print("  CRITICAL ERROR: Viewed product itself returned in store recommendations list!")
                sys.exit(1)

        print(f"  [OK] verified store matches count: {len(products)}")
        print(f"  [OK] section title context: '{title}'")
        print(f"  [OK] first store product recommendation reason: '{card['recommendation_reason']}'")

    test_endpoint(
        f"http://localhost:8000/products/{valid_product_id}/recommendations/store",
        custom_assert=assert_store_recs
    )

    # Test 23: GET /products/invalid_id/recommendations/similar (expect 400 Bad Request)
    print("Testing Endpoint: http://localhost:8000/products/invalid_id/recommendations/similar (expecting 400)...")
    try:
        req = urllib.request.Request("http://localhost:8000/products/invalid_id/recommendations/similar", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            print("  CRITICAL ERROR: Expected 400 Bad Request, but request succeeded!")
            sys.exit(1)
    except urllib.error.HTTPError as he:
        if he.code == 400:
            print("  SUCCESS! Got exception code 400 Bad Request.")
        else:
            print(f"  CRITICAL ERROR: Expected HTTP 400, got {he.code}!")
            sys.exit(1)
    except Exception as e:
        print(f"  CRITICAL ERROR: Got unexpected error: {e}")
        sys.exit(1)
    print("  --------------------------------------")

    # Test 24: GET /products/{nonExistentId}/recommendations/store (expect 404 Not Found)
    print(f"Testing Endpoint: http://localhost:8000/products/{non_existent}/recommendations/store (expecting 404)...")
    try:
        req = urllib.request.Request(f"http://localhost:8000/products/{non_existent}/recommendations/store", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            print("  CRITICAL ERROR: Expected 404 Not Found, but request succeeded!")
            sys.exit(1)
    except urllib.error.HTTPError as he:
        if he.code == 404:
            print("  SUCCESS! Got exception code 404 Not Found.")
        else:
            print(f"  CRITICAL ERROR: Expected HTTP 404, got {he.code}!")
            sys.exit(1)
    except Exception as e:
        print(f"  CRITICAL ERROR: Got unexpected error: {e}")
        sys.exit(1)
    # Test 25: GET /stores/{storeId}/collections
    def assert_store_collections(data):
        if not isinstance(data, list):
            print("  CRITICAL ERROR: Store collections response is not a list!")
            sys.exit(1)
        if len(data) == 0:
            print("  CRITICAL ERROR: Store collections response is empty!")
            sys.exit(1)
            
        col = data[0]
        keys = ["collection_name", "product_count", "cover_image", "description"]
        for k in keys:
            if k not in col:
                print(f"  CRITICAL ERROR: Store collection item missing key: '{k}'")
                sys.exit(1)
                
        print(f"  [OK] verified collections count: {len(data)}")
        print(f"  [OK] first collection: name='{col['collection_name']}', count={col['product_count']}")

    test_endpoint(
        f"http://localhost:8000/stores/{target_store_unique_id}/collections",
        custom_assert=assert_store_collections
    )

    # Test 26: GET /stores/{nonExistentId}/collections (expect 404 Not Found)
    print(f"Testing Endpoint: http://localhost:8000/stores/{non_existent}/collections (expecting 404)...")
    try:
        req = urllib.request.Request(f"http://localhost:8000/stores/{non_existent}/collections", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            print("  CRITICAL ERROR: Expected 404 Not Found, but request succeeded!")
            sys.exit(1)
    except urllib.error.HTTPError as he:
        if he.code == 404:
            print("  SUCCESS! Got exception code 404 Not Found.")
        else:
            print(f"  CRITICAL ERROR: Expected HTTP 404, got {he.code}!")
            sys.exit(1)
    except Exception as e:
        print(f"  CRITICAL ERROR: Got unexpected error: {e}")
        sys.exit(1)
    # Test 27: POST /stores/{storeId}/check-delivery (expect deliverable: true for close coordinates)
    print(f"Testing Endpoint: http://localhost:8000/stores/{target_store_unique_id}/check-delivery (matching delivery area)...")
    try:
        url = f"http://localhost:8000/stores/{target_store_unique_id}/check-delivery"
        req_body = json.dumps({
            "state": "Telangana",
            "city": "Hyderabad",
            "latitude": 17.385,
            "longitude": 78.486
        }).encode('utf-8')
        req = urllib.request.Request(url, data=req_body, headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            if not data.get("deliverable"):
                print(f"  CRITICAL ERROR: Expected deliverable true, got {data}!")
                sys.exit(1)
            print("  SUCCESS! Store is deliverable to user coordinates.")
    except Exception as e:
        print(f"  CRITICAL ERROR: Got unexpected error: {e}")
        sys.exit(1)
    print("  --------------------------------------")

    # Test 28: POST /stores/{storeId}/check-delivery (expect deliverable: false for far coordinates/Bengaluru)
    print(f"Testing Endpoint: http://localhost:8000/stores/{target_store_unique_id}/check-delivery (exceeding radius)...")
    try:
        url = f"http://localhost:8000/stores/{target_store_unique_id}/check-delivery"
        req_body = json.dumps({
            "state": "Karnataka",
            "city": "Bengaluru",
            "latitude": 12.9716,
            "longitude": 77.5946
        }).encode('utf-8')
        req = urllib.request.Request(url, data=req_body, headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            if data.get("deliverable") or "unavailable" not in data.get("reason", "").lower():
                print(f"  CRITICAL ERROR: Expected deliverable false with unavailable reason, got {data}!")
                sys.exit(1)
            print(f"  SUCCESS! Deliverable is false. Reason: '{data['reason']}'")
    except Exception as e:
        print(f"  CRITICAL ERROR: Got unexpected error: {e}")
        sys.exit(1)
    print("  --------------------------------------")

    # Test 29: POST /stores/{nonExistentId}/check-delivery (expect 404 Not Found)
    print(f"Testing Endpoint: http://localhost:8000/stores/{non_existent}/check-delivery (expecting 404)...")
    try:
        url = f"http://localhost:8000/stores/{non_existent}/check-delivery"
        req_body = json.dumps({
            "state": "Telangana",
            "city": "Hyderabad",
            "latitude": 17.385,
            "longitude": 78.486
        }).encode('utf-8')
        req = urllib.request.Request(url, data=req_body, headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            print("  CRITICAL ERROR: Expected 404 Not Found, but request succeeded!")
            sys.exit(1)
    except urllib.error.HTTPError as he:
        if he.code == 404:
            print("  SUCCESS! Got exception code 404 Not Found.")
        else:
            print(f"  CRITICAL ERROR: Expected HTTP 404, got {he.code}!")
            sys.exit(1)
    except Exception as e:
        print(f"  CRITICAL ERROR: Got unexpected error: {e}")
        sys.exit(1)
    print("  --------------------------------------")

    # Test 30: GET /stores (StoreCardResponse check)
    def assert_store_card_response(data):
        if not isinstance(data, list) or len(data) == 0:
            print("  CRITICAL ERROR: GET /stores did not return a populated list!")
            sys.exit(1)
        store = data[0]
        present_keys = ["_id", "name", "city", "state", "logo_image", "trust_score", "categories", "specialties", "years_in_business", "is_verified"]
        absent_keys = ["banner_image", "shopping_hub_id", "shopping_hub", "google_rating", "review_count"]
        for k in present_keys:
            if k not in store:
                print(f"  CRITICAL ERROR: StoreCardResponse missing required key '{k}'!")
                sys.exit(1)
        for k in absent_keys:
            if k in store:
                print(f"  CRITICAL ERROR: StoreCardResponse exposes restricted key '{k}'!")
                sys.exit(1)
        print("  SUCCESS! StoreCardResponse contains all expected fields and removes restricted ones.")

    test_endpoint(
        "http://localhost:8000/stores",
        expected_min_count=5,
        custom_assert=assert_store_card_response
    )

    # Test 31: GET /stores/search
    test_endpoint(
        f"http://localhost:8000/stores/search?query={urllib.parse.quote(target_store_name)}",
        expected_min_count=1,
        custom_assert=assert_store_card_response
    )

    # Test 32: GET /stores/nearby
    def assert_nearby_store_response(data):
        if not isinstance(data, list) or len(data) == 0:
            print("  CRITICAL ERROR: GET /stores/nearby did not return stores!")
            sys.exit(1)
        store = data[0]
        present_keys = ["_id", "name", "city", "state", "logo_image", "trust_score", "categories", "specialties", "years_in_business", "is_verified", "distance_km"]
        absent_keys = ["banner_image", "shopping_hub_id", "shopping_hub", "google_rating", "review_count"]
        for k in present_keys:
            if k not in store:
                print(f"  CRITICAL ERROR: NearbyStoreResponse missing key '{k}'!")
                sys.exit(1)
        for k in absent_keys:
            if k in store:
                print(f"  CRITICAL ERROR: NearbyStoreResponse exposes restricted key '{k}'!")
                sys.exit(1)
        print("  SUCCESS! NearbyStoreResponse verified correctly.")

    test_endpoint(
        "http://localhost:8000/stores/nearby?latitude=17.385&longitude=78.486&radius=50",
        expected_min_count=1,
        custom_assert=assert_nearby_store_response
    )

    # Test 33: GET /stores/{id} (StoreDetailsResponse check)
    def assert_store_details_response(data):
        present_keys = [
            "_id", "name", "city", "state", "logo_image", "banner_image", "trust_score", 
            "categories", "specialties", "years_in_business", "is_verified", "description", 
            "address", "latitude", "longitude", "delivery_available", "delivery_radius_km", 
            "supported_states", "supported_cities"
        ]
        absent_keys = ["shopping_hub_id", "shopping_hub", "google_rating", "review_count"]
        for k in present_keys:
            if k not in data:
                print(f"  CRITICAL ERROR: StoreDetailsResponse missing required key '{k}'!")
                sys.exit(1)
        for k in absent_keys:
            if k in data:
                print(f"  CRITICAL ERROR: StoreDetailsResponse exposes restricted key '{k}'!")
                sys.exit(1)
        print("  SUCCESS! StoreDetailsResponse verified successfully.")

    test_endpoint(
        f"http://localhost:8000/stores/{target_store_unique_id}",
        custom_assert=assert_store_details_response
    )

    print("\nALL REFACTORED SEARCH ENGINE, EXPANSION, AND PRODUCT DETAILS VERIFICATIONS PASSED SUCCESSFULLY!")

