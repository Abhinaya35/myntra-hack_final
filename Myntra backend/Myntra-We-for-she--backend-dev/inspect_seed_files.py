import os
import datetime
import json

seed_dir = "seed"
files = os.listdir(seed_dir)
print("=== Seed Directory Files ===")
for f in files:
    path = os.path.join(seed_dir, f)
    size = os.path.getsize(path)
    mtime = datetime.datetime.fromtimestamp(os.path.getmtime(path))
    print(f"{f}: size={size} bytes, modified={mtime}")

# Try to parse and get counts
for f in sorted(files):
    if not f.endswith(".json"):
        continue
    path = os.path.join(seed_dir, f)
    try:
        with open(path, "r", encoding="utf-8") as file:
            data = json.load(file)
            print(f"{f}: parsed successfully, type={type(data)}, length={len(data) if isinstance(data, list) else 'dict'}")
            if isinstance(data, list) and len(data) > 0:
                first = data[0]
                if "_id" in first:
                    print(f"  First item _id: {first['_id']}")
                if "name" in first:
                    print(f"  First item name: {first['name']}")
    except Exception as e:
        print(f"{f}: failed to parse - {e}")
