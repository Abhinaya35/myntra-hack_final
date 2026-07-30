import json

with open("seed/stores.json", "r", encoding="utf-8") as f:
    stores = json.load(f)

with open("seed/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

store_keys = {(s["name"], s["city"]) for s in stores}
store_keys_lower = {(s["name"].lower().strip(), s["city"].lower().strip()) for s in stores}

print(f"Total stores in stores.json: {len(stores)}")
print(f"Total products in products.json: {len(products)}")

missing_exact = []
missing_case_insensitive = []

for p in products:
    p_name = p.get("name")
    s_name = p.get("store_name")
    s_city = p.get("store_city")
    
    if (s_name, s_city) not in store_keys:
        missing_exact.append((p_name, s_name, s_city))
        if (s_name.lower().strip(), s_city.lower().strip()) not in store_keys_lower:
            missing_case_insensitive.append((p_name, s_name, s_city))

print(f"Products missing exact store name/city match: {len(missing_exact)}")
if missing_exact:
    print("First 10 missing exact matches:")
    for pm in missing_exact[:10]:
        print(f"  Product: '{pm[0]}' -> Store: '{pm[1]}', City: '{pm[2]}'")

print(f"Products missing case-insensitive store name/city match: {len(missing_case_insensitive)}")
if missing_case_insensitive:
    print("First 10 missing case-insensitive matches:")
    for pm in missing_case_insensitive[:10]:
        print(f"  Product: '{pm[0]}' -> Store: '{pm[1]}', City: '{pm[2]}'")

# Also check for duplicate product names per store in products.json
prod_dupes = {}
for p in products:
    key = (p.get("name"), p.get("store_name"), p.get("store_city"))
    prod_dupes[key] = prod_dupes.get(key, 0) + 1

dupes = {k: v for k, v in prod_dupes.items() if v > 1}
print(f"Duplicate product keys (same name + store + city) in products.json: {len(dupes)}")
if dupes:
    for k, v in list(dupes.items())[:5]:
        print(f"  Key: {k} -> Count: {v}")
