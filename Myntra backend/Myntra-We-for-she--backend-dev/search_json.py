import json
with open("seed/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)
matches = [p for p in products if p.get("_id") == "p_0001" or p.get("name") == "South Kanchipuram Silk Saree (Vermilion Red - v1)"]
print("Matches found in products.json:", len(matches))
for i, m in enumerate(matches):
    print(f"Match {i}:")
    print(f"  Name: {m.get('name')}")
    print(f"  Occasion: {m.get('occasion')}")
    print(f"  Images: {m.get('images')}")
