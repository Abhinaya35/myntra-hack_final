import subprocess
import json

def get_git_file(filepath):
    try:
        return subprocess.check_output(["git", "show", f"HEAD:{filepath}"], stderr=subprocess.subprocess.DEVNULL if hasattr(subprocess, 'DEVNULL') else None).decode('utf-8')
    except Exception:
        with open('seed/products(2).json', 'r', encoding='utf-8') as f:
             return f.read()

def main():
    try:
        old_content = get_git_file("seed/products.json")
        old_products = json.loads(old_content)
    except Exception as e:
        with open("comparison.txt", "w") as out:
             out.write(f"Failed to load git HEAD products.json: {e}\n")
        return
        
    with open("seed/products.json", "r", encoding="utf-8") as f:
         new_products = json.load(f)
         
    with open("comparison.txt", "w", encoding="utf-8") as out:
         for p_new in new_products[:5]:
              pid = p_new["_id"]
              p_old = next((x for x in old_products if x["_id"] == pid), None)
              if p_old:
                   out.write(f"Product ID: {pid}\n")
                   out.write(f" - Old Name: {p_old.get('name')}\n")
                   out.write(f" - New Name: {p_new.get('name')}\n")
                   out.write(f" - Old Thumbnail: {p_old.get('thumbnail')}\n")
                   out.write(f" - New Thumbnail: {p_new.get('thumbnail')}\n")
                   out.write(f" - Old Images: {p_old.get('images')}\n")
                   out.write(f" - New Images: {p_new.get('images')}\n")
                   out.write(f" - Old Brand/Store: {p_old.get('brand')} / {p_old.get('store_name')}\n")
                   out.write(f" - New Brand/Store: {p_new.get('brand')} / {p_new.get('store_name')}\n")
                   out.write("---------------------------------\n")

if __name__ == "__main__":
    main()
