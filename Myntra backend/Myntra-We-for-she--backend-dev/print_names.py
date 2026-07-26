import json
with open("seed/stores.json", "r", encoding="utf-8") as f:
    stores = json.load(f)
karimnagar_stores = [s for s in stores if s.get("city") == "Karimnagar"]
for s in karimnagar_stores:
    print("NAME:", s.get("name"))
