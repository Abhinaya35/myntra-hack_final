import json

def main():
    with open('seed/products.json', 'r', encoding='utf-8') as f:
         products = json.load(f)
         
    unique_urls = set()
    for p in products:
         t = p.get('thumbnail', '')
         if 'ibb.co' in t:
              unique_urls.add(t)
         for img in p.get('images', []):
              if 'ibb.co' in img:
                   unique_urls.add(img)
                   
    print(f"Total unique ibb.co URLs: {len(unique_urls)}")
    print("Sample URLs:")
    for u in list(unique_urls)[:10]:
         print(" -", u)

if __name__ == "__main__":
    main()
