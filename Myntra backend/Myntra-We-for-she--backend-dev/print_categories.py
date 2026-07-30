import json
from collections import Counter

def main():
    with open('seed/products.json', 'r', encoding='utf-8') as f:
         products = json.load(f)
    categories = [p.get('category') for p in products]
    print(Counter(categories))

if __name__ == "__main__":
    main()
