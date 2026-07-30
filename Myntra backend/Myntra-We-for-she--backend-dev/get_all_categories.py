import json
from collections import Counter

def main():
    with open('seed/products.json', 'r', encoding='utf-8') as f:
         products = json.load(f)
    categories = [p.get('category') for p in products]
    with open('categories.txt', 'w', encoding='utf-8') as out:
         out.write("Categories Counter:\n")
         for cat, cnt in sorted(Counter(categories).items(), key=lambda x: -x[1]):
              out.write(f"  - {cat}: {cnt}\n")

if __name__ == "__main__":
    main()
