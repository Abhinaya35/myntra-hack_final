import urllib.request, json
res = urllib.request.urlopen("http://localhost:8000/stores").read()
stores = json.loads(res.decode("utf-8"))
k_stores = [s for s in stores if s.get("city") == "Karimnagar"]
print("API Karimnagar Count:", len(k_stores))
for s in k_stores:
    print(f"Name: {s.get('name')}")
    print(f"  Logo: {s.get('logo_image')}")
    print(f"  Banner: {s.get('banner_image')}")
