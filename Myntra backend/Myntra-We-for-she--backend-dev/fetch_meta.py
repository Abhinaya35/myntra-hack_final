import urllib.request
import re

def main():
    url = "https://ibb.co/PvBGN0Rd"
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        html = urllib.request.urlopen(req).read().decode('utf-8')
        m = re.search(r'property="og:image"\s+content="([^"]+)"', html)
        if m:
             print("Found og:image:", m.group(1))
        else:
             m2 = re.search(r'content="([^"]+)"\s+property="og:image"', html)
             if m2:
                  print("Found og:image (alternate):", m2.group(1))
             else:
                  print("og:image not found. First 500 chars:")
                  print(html[:500])
    except Exception as e:
        print("Error fetching URL:", e)

if __name__ == "__main__":
    main()
