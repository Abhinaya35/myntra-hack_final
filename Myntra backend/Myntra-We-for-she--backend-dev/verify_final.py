import urllib.request
import json

def verify_recommendations():
    try:
        url = "http://localhost:8000/products/p_0001/recommendations/similar"
        res = urllib.request.urlopen(url).read().decode('utf-8')
        data = json.loads(res)
        products = data.get("products", [])
        print("=== Recommendations API Verification (GET /products/p_0001/recommendations/similar) ===")
        print("  Status: SUCCESS")
        print(f"  NumberOfProducts: {len(products)}")
        if products:
             p = products[0]
             print("  First recommended product:")
             print("    Name:", p.get("name"))
             print("    Rating:", p.get("rating"))
             print("    ReviewCount:", p.get("review_count"))
        else:
             print("  Warning: No recommendations returned!")
    except Exception as e:
        print("=== Recommendations API Verification ===")
        print(f"  Failed: {e}")

if __name__ == "__main__":
    verify_recommendations()
