import json
import urllib.request
import re
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

category_mappings = {
    # Sarees
    "sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "silk sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "traditional sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "designer sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "pattu sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "bridal sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "pure silk sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "wedding sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "kanchipuram silk": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "traditional pattu": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "pure zari crepe": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "samudrika pattu": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "parampara silks": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "liril sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    
    # Lehengas
    "lehengas": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    "designer lehengas": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    "wedding gowns": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    "custom gowns": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    "bridal couture": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    
    # Kurtas / Ethic Wear / Salwars
    "kurtas": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    "kurtis": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    "anarkalis": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    "ethnic wear": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    "ethnic sets": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    "salwars": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    "salwar suits": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    "ready-made salwars": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    
    # Menswear / Dhotis
    "menswear": "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=600&q=80",
    "mens wear": "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=600&q=80",
    "dhotis": "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=600&q=80",
    "grooms wear": "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=600&q=80",
    "sherwanis": "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=600&q=80",
    
    # Kids
    "kids wear": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    "kids ethnic": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    "kids frocks": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    
    # Western / Casual / Shirts
    "jeans": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    "linen shirts": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    "t-shirts": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    "mens suitings": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    "suitings": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    "contemporary wear": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    "western wear": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    "westerns": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    "western outfits": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80"
}
global_default = "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"

cache_file = "ibb_cache.json"

def load_cache():
    if os.path.exists(cache_file):
        try:
            with open(cache_file, "r") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_cache(cache):
    with open(cache_file, "w") as f:
        json.dump(cache, f, indent=2)

def resolve_ibb_url(url):
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        m = re.search(r'property="og:image"\s+content="([^"]+)"', html)
        if m:
            return m.group(1)
        m2 = re.search(r'content="([^"]+)"\s+property="og:image"', html)
        if m2:
            return m2.group(1)
    except Exception as e:
        print(f"Error resolving {url}: {e}")
    return None

def get_fallback_image(category):
    if not category:
        return global_default
    cat_lower = category.strip().lower()
    return category_mappings.get(cat_lower, global_default)

def main():
    with open('seed/products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)

    # 1. Collect all unique ibb.co urls
    ibb_urls = set()
    for p in products:
        t = p.get('thumbnail', '')
        if 'ibb.co' in t:
            ibb_urls.add(t)
        for img in p.get('images', []):
            if 'ibb.co' in img:
                ibb_urls.add(img)
                
    print(f"Collected {len(ibb_urls)} unique ibb.co URLs.")
    
    # Load cache
    cache = load_cache()
    to_resolve = [u for u in ibb_urls if u not in cache]
    print(f"Already cached: {len(ibb_urls) - len(to_resolve)}. Need to resolve: {len(to_resolve)}.")
    
    if to_resolve:
        print("Resolving ibb.co URLs asynchronously via ThreadPool...")
        resolved_count = 0
        with ThreadPoolExecutor(max_workers=10) as executor:
            future_to_url = {executor.submit(resolve_ibb_url, url): url for url in to_resolve}
            for future in as_completed(future_to_url):
                url = future_to_url[future]
                direct_url = future.result()
                if direct_url:
                    cache[url] = direct_url
                    resolved_count += 1
                    print(f"Resolved [{resolved_count}/{len(to_resolve)}]: {url} -> {direct_url}")
                else:
                    print(f"Failed to resolve: {url}")
        save_cache(cache)
        
    # 2. Update products.json file contents in memory
    updated_count = 0
    ibb_replaced = 0
    mock_replaced = 0
    
    for p in products:
        category = p.get('category')
        
        # Replace thumbnail
        t = p.get('thumbnail', '')
        if 'ibb.co' in t:
            if t in cache:
                p['thumbnail'] = cache[t]
                ibb_replaced += 1
        elif 'example.com' in t:
            p['thumbnail'] = get_fallback_image(category)
            mock_replaced += 1
            
        # Replace images list
        new_images = []
        for img in p.get('images', []):
            if 'ibb.co' in img:
                if img in cache:
                    new_images.append(cache[img])
                    ibb_replaced += 1
                else:
                    new_images.append(img)
            elif 'example.com' in img:
                new_images.append(get_fallback_image(category))
                mock_replaced += 1
            else:
                new_images.append(img)
        p['images'] = new_images
        
        # Check colors list images
        for c in p.get('colors', []):
            c_thumb = c.get('thumbnail', '')
            if 'ibb.co' in c_thumb:
                if c_thumb in cache:
                    c['thumbnail'] = cache[c_thumb]
                    ibb_replaced += 1
            elif 'example.com' in c_thumb:
                c['thumbnail'] = get_fallback_image(category)
                mock_replaced += 1
                
    # 3. Write back to seed/products.json
    with open('seed/products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=4, ensure_ascii=False)
        
    print("---------------------------------")
    print(f"Finished processing products.json!")
    print(f"Solved ImgBB viewer replacements: {ibb_replaced}")
    print(f"Solved Mock example.com replacements: {mock_replaced}")
    print("---------------------------------")

if __name__ == "__main__":
    main()
