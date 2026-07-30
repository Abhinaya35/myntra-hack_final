import json
from collections import Counter

def main():
    with open('seed/products.json', 'r', encoding='utf-8') as f:
         products = json.load(f)
    print("---------------------------------")
    print(f"Total products in products.json: {len(products)}")
    
    # Analyze thumbnail domains
    thumb_domains = []
    image_domains = []
    
    for p in products:
         t = p.get('thumbnail', '')
         if t and '//' in t:
              thumb_domains.append(t.split('/')[2])
         for img in p.get('images', []):
              if img and '//' in img:
                   image_domains.append(img.split('/')[2])
                   
    print("Thumbnail domains count:")
    print(Counter(thumb_domains))
    print("Images domains count:")
    print(Counter(image_domains))
    
    # Print examples
    print("\nSome sample thumbnails:")
    for p in products[:5]:
         print(f" - {p.get('name')[:30]}: {p.get('thumbnail')}")
    print("---------------------------------")

if __name__ == "__main__":
    main()
