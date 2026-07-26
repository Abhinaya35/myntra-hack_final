import json
with open("seed/stores.json", "r", encoding="utf-8") as f:
    stores = json.load(f)
karimnagar_stores = [s for s in stores if s.get("city") == "Karimnagar"]
print("Count:", len(karimnagar_stores))
for s in karimnagar_stores:
    print(f"N: {s.get('name')[:20]}")
    print(f" L: {s.get('logo_image')}")
    print(f" B: {s.get('banner_image')}")
