import json
import os
import random

# Category to product templates mapping
CAT_TEMPLATES = {
    "Sarees": [
        {
            "name": "Kanchipuram Silk Saree",
            "sub_category": "Silk Sarees",
            "description": "Exquisite hand-woven gold zari border Kanchipuram silk saree, perfect for weddings.",
            "price": 8500.0,
            "discount_price": 5999.0,
            "brand": "Heritage Silks",
            "gender": "Women",
            "occasion": "Ethnic Wear",
            "material": "Silk",
            "sizes": ["FS"],
            "colors": ["Vermilion Red", "Peacock Blue"],
            "thumbnail": "https://example.com/images/sarees-kanchipuram-thumb.png",
            "images": ["https://example.com/images/sarees-kanchipuram-1.png"]
        },
        {
            "name": "Banarasi Georgette Saree",
            "sub_category": "Georgette Sarees",
            "description": "Elegant Banarasi georgette saree featuring intricate silver zari motifs across the body.",
            "price": 6200.0,
            "discount_price": 4999.0,
            "brand": "Royal Weavers",
            "gender": "Women",
            "occasion": "Festival Wear",
            "material": "Georgette",
            "sizes": ["FS"],
            "colors": ["Fuschia Pink", "Royal Violet"],
            "thumbnail": "https://example.com/images/sarees-banarasi-thumb.png",
            "images": ["https://example.com/images/sarees-banarasi-1.png"]
        },
        {
            "name": "Linen Floral Print Saree",
            "sub_category": "Linen Sarees",
            "description": "Casual linen saree with fresh pastel floral prints, highly breathable for daywear.",
            "price": 2800.0,
            "discount_price": 2399.0,
            "brand": "Linen Craft",
            "gender": "Women",
            "occasion": "Casual",
            "material": "Linen",
            "sizes": ["FS"],
            "colors": ["Mint Green", "Sun Yellow"],
            "thumbnail": "https://example.com/images/sarees-linen-thumb.png",
            "images": ["https://example.com/images/sarees-linen-1.png"]
        }
    ],
    "Lehengas": [
        {
            "name": "Embroidered Velvet Lehenga Choli",
            "sub_category": "Bridal Lehengas",
            "description": "Luxurious velvet bridal lehenga heavily embellished with zardozi and stone embroidery.",
            "price": 18500.0,
            "discount_price": 14999.0,
            "brand": "Couture Indian",
            "gender": "Women",
            "occasion": "Ethnic Wear",
            "material": "Velvet",
            "sizes": ["S", "M", "L"],
            "colors": ["Crimson Maroon", "Wine Plum"],
            "thumbnail": "https://example.com/images/lehengas-velvet-thumb.png",
            "images": ["https://example.com/images/lehengas-velvet-1.png"]
        },
        {
            "name": "Floral Organza Lehenga Set",
            "sub_category": "Partywear Lehengas",
            "description": "Modern lightweight organza lehenga choli featuring floral prints and mirror-work border.",
            "price": 8600.0,
            "discount_price": 6880.0,
            "brand": "Desi Chic",
            "gender": "Women",
            "occasion": "Festival Wear",
            "material": "Organza",
            "sizes": ["S", "M", "L"],
            "colors": ["Peach Cream", "Lavender Frost"],
            "thumbnail": "https://example.com/images/lehengas-floral-thumb.png",
            "images": ["https://example.com/images/lehengas-floral-1.png"]
        }
    ],
    "Kurtis": [
        {
            "name": "Anarkali Embroidered Kurti",
            "sub_category": "Anarkali Kurtis",
            "description": "Flowy rayon Anarkali kurti decorated with Kashmiri thread embroidery on the yoke.",
            "price": 1900.0,
            "discount_price": 1399.0,
            "brand": "Daily Ethnic",
            "gender": "Women",
            "occasion": "Casual",
            "material": "Rayon",
            "sizes": ["S", "M", "L", "XL"],
            "colors": ["Teal Blue", "Rust Orange"],
            "thumbnail": "https://example.com/images/kurtis-anarkali-thumb.png",
            "images": ["https://example.com/images/kurtis-anarkali-1.png"]
        },
        {
            "name": "Straight Cotton A-line Kurta",
            "sub_category": "Cotton Kurtas",
            "description": "Pure cotton straight fit kurta with geometric prints, comfortable for formal setups.",
            "price": 1200.0,
            "discount_price": 999.0,
            "brand": "Indi Weaves",
            "gender": "Women",
            "occasion": "Formal",
            "material": "Cotton",
            "sizes": ["M", "L", "XL", "XXL"],
            "colors": ["Indigo Blue", "Charcoal Black"],
            "thumbnail": "https://example.com/images/kurtis-regular-thumb.png",
            "images": ["https://example.com/images/kurtis-regular-1.png"]
        }
    ],
    "Salwars": [
        {
            "name": "Chanderi Silk Salwar Kameez Suit Set",
            "sub_category": "Straight Suit Sets",
            "description": "Premium Chanderi silk straight kurta matched with gold woven border dupatta and pants.",
            "price": 4500.0,
            "discount_price": 3599.0,
            "brand": "Avassa",
            "gender": "Women",
            "occasion": "Festival Wear",
            "material": "Chanderi Silk",
            "sizes": ["M", "L", "XL"],
            "colors": ["Mustard Yellow", "Emerald Green"],
            "thumbnail": "https://example.com/images/salwars-silk-thumb.png",
            "images": ["https://example.com/images/salwars-silk-1.png"]
        },
        {
            "name": "Printed Cotton Patiala Suit Set",
            "sub_category": "Patiala Suits",
            "description": "Vibrant Jaipuri prints on cotton knee-length kameez coupled with dynamic pleated patiala salwar.",
            "price": 2200.0,
            "discount_price": 1760.0,
            "brand": "Jaipur Rang",
            "gender": "Women",
            "occasion": "Casual",
            "material": "Cotton",
            "sizes": ["S", "M", "L", "XL"],
            "colors": ["Ruby Red", "Deep Turquoise"],
            "thumbnail": "https://example.com/images/salwars-patiala-thumb.png",
            "images": ["https://example.com/images/salwars-patiala-1.png"]
        }
    ],
    "Shirts": [
        {
            "name": "Pure Linen Casual Shirt",
            "sub_category": "Casual Shirts",
            "description": "100% pure premium linen shirt, button-down collar, enzyme washed for superior comfort.",
            "price": 2600.0,
            "discount_price": 1820.0,
            "brand": "Threads & Co.",
            "gender": "Men",
            "occasion": "Casual",
            "material": "Linen",
            "sizes": ["M", "L", "XL"],
            "colors": ["Classic White", "Sky Blue", "Olive Green"],
            "thumbnail": "https://example.com/images/shirts-linen-thumb.png",
            "images": ["https://example.com/images/shirts-linen-1.png"]
        },
        {
            "name": "Slim Fit Formal Cotton Shirt",
            "sub_category": "Formal Shirts",
            "description": "High-thread-count formal shirt with cutaway collar, smooth satin finish for business wear.",
            "price": 1900.0,
            "discount_price": 1499.0,
            "brand": "Sartorial",
            "gender": "Men",
            "occasion": "Formal",
            "material": "Cotton",
            "sizes": ["S", "M", "L", "XL"],
            "colors": ["Pink Pearl", "Corporate Blue"],
            "thumbnail": "https://example.com/images/shirts-formal-thumb.png",
            "images": ["https://example.com/images/shirts-formal-1.png"]
        }
    ],
    "T-Shirts": [
        {
            "name": "Sateen Cotton Polo T-Shirt",
            "sub_category": "Polo T-Shirts",
            "description": "Smart casual polo knitted from Mercerized combed cotton, double tipping contrast collar.",
            "price": 1200.0,
            "discount_price": 999.0,
            "brand": "Sport Classic",
            "gender": "Men",
            "occasion": "Casual",
            "material": "Cotton",
            "sizes": ["S", "M", "L", "XL", "XXL"],
            "colors": ["Navy Blue", "Crimson Red", "Jet Black"],
            "thumbnail": "https://example.com/images/tshirts-polo-thumb.png",
            "images": ["https://example.com/images/tshirts-polo-1.png"]
        },
        {
            "name": "Oversized Streetwear Graphic Tee",
            "sub_category": "Oversized Tees",
            "description": "Heavy-knit drop shoulder street essential carrying vintage screen-printed typography graphics on the back.",
            "price": 1500.0,
            "discount_price": 1050.0,
            "brand": "Urban Wave",
            "gender": "Unisex",
            "occasion": "Casual",
            "material": "Cotton",
            "sizes": ["M", "L", "XL"],
            "colors": ["Acid Wash Grey", "Off White"],
            "thumbnail": "https://example.com/images/tshirts-graphic-thumb.png",
            "images": ["https://example.com/images/tshirts-graphic-1.png"]
        }
    ],
    "Jeans": [
        {
            "name": "Slim Fit Stretch Denim Jeans",
            "sub_category": "Slim Jeans",
            "description": "Faded indigo blue stretch denim jeans, 5-pocket styling, whiskers detail on front thighs.",
            "price": 2800.0,
            "discount_price": 2100.0,
            "brand": "Blue Denim Co.",
            "gender": "Men",
            "occasion": "Casual",
            "material": "Denim",
            "sizes": ["30", "32", "34", "36"],
            "colors": ["Dark Indigo", "Light Blue Wash"],
            "thumbnail": "https://example.com/images/jeans-slim-thumb.png",
            "images": ["https://example.com/images/jeans-slim-1.png"]
        },
        {
            "name": "Classic Straight Leg Denims",
            "sub_category": "Straight Jeans",
            "description": "Original fit heavy-duty denim jeans with raw selvedge edge detailing, durable vintage look.",
            "price": 3500.0,
            "discount_price": 2800.0,
            "brand": "Heritage Denims",
            "gender": "Men",
            "occasion": "Casual",
            "material": "Denim",
            "sizes": ["32", "34", "36", "38"],
            "colors": ["Raw Indigo Black"],
            "thumbnail": "https://example.com/images/jeans-classic-thumb.png",
            "images": ["https://example.com/images/jeans-classic-1.png"]
        }
    ],
    "Sherwanis": [
        {
            "name": "Royal Zardozi Wedding Sherwani",
            "sub_category": "Groom Sherwanis",
            "description": "Premium brocade silk sherwani adorned with manual golden zardozi work and beaded collar.",
            "price": 22000.0,
            "discount_price": 17999.0,
            "brand": "Royal Grooms",
            "gender": "Men",
            "occasion": "Ethnic Wear",
            "material": "Brocade Silk",
            "sizes": ["M", "L", "XL"],
            "colors": ["Cream Ivory", "Royal Beige"],
            "thumbnail": "https://example.com/images/sherwanis-royal-thumb.png",
            "images": ["https://example.com/images/sherwanis-royal-1.png"]
        },
        {
            "name": "Modern Jodhpuri Bandhgala Suit",
            "sub_category": "Bandhgala Suits",
            "description": "A refined, velvet tailored Bandhgala jacket matched with formal charcoal pencil trousers.",
            "price": 14000.0,
            "discount_price": 11200.0,
            "brand": "Couture Men",
            "gender": "Men",
            "occasion": "Festival Wear",
            "material": "Velvet",
            "sizes": ["S", "M", "L"],
            "colors": ["Deep Royal Blue", "Crimson Burgundy"],
            "thumbnail": "https://example.com/images/sherwanis-bandhgala-thumb.png",
            "images": ["https://example.com/images/sherwanis-bandhgala-1.png"]
        }
    ],
    "Kids Wear": [
        {
            "name": "Girls Floral Cotton Frock",
            "sub_category": "Girls Frocks",
            "description": "Gentle daily cotton frock for girls featuring floral multi-color patterns and breathable inner lining.",
            "price": 1200.0,
            "discount_price": 899.0,
            "brand": "Tiny Tots",
            "gender": "Kids",
            "occasion": "Casual",
            "material": "Cotton",
            "sizes": ["3-4Y", "5-6Y", "7-8Y"],
            "colors": ["Marigold Yellow", "Coral Pink"],
            "thumbnail": "https://example.com/images/kids-frock-thumb.png",
            "images": ["https://example.com/images/kids-frock-1.png"]
        },
        {
            "name": "Boys Silk Kurta Pyjama Set",
            "sub_category": "Boys Ethnic Sets",
            "description": "Comfort-oriented jacquard silk blend kurta with soft cotton elastic-waist pajamas.",
            "price": 1800.0,
            "discount_price": 1399.0,
            "brand": "Chotta Ethnic",
            "gender": "Kids",
            "occasion": "Festival Wear",
            "material": "Silk Blend",
            "sizes": ["4-5Y", "6-7Y", "8-9Y"],
            "colors": ["Golden Fawn", "Turquoise Aqua"],
            "thumbnail": "https://example.com/images/kids-kurta-thumb.png",
            "images": ["https://example.com/images/kids-kurta-1.png"]
        }
    ],
    "Accessories": [
        {
            "name": "Handmade Banarasi Silk Dupatta",
            "sub_category": "Dupattas",
            "description": "Traditional Banarasi zari silk dupatta featuring classic floral patterns, a grand addition to salwar suits.",
            "price": 1600.0,
            "discount_price": 1290.0,
            "brand": "Weaves Gallery",
            "gender": "Women",
            "occasion": "Ethnic Wear",
            "material": "Silk",
            "sizes": ["FS"],
            "colors": ["Bright Maroon", "Peacock Green"],
            "thumbnail": "https://example.com/images/accessories-dupatta-thumb.png",
            "images": ["https://example.com/images/accessories-dupatta-1.png"]
        },
        {
            "name": "Classic Leather Formal Wallet",
            "sub_category": "Wallets",
            "description": "Crafted from genuine full-grain leather, bi-fold design with RFID blocking slots.",
            "price": 1500.0,
            "discount_price": 999.0,
            "brand": "Hide & Stitch",
            "gender": "Men",
            "occasion": "Formal",
            "material": "Leather",
            "sizes": ["FS"],
            "colors": ["Tan Brown", "Chestnut Black"],
            "thumbnail": "https://example.com/images/accessories-wallet-thumb.png",
            "images": ["https://example.com/images/accessories-wallet-1.png"]
        }
    ],
    "Footwear": [
        {
            "name": "Embellished Wedding mojari Heels",
            "sub_category": "Ethnic Footwear",
            "description": "Block heels fully wrapped in embroidered silk fabric, padded memory foam sole for high comfort.",
            "price": 3800.0,
            "discount_price": 2999.0,
            "brand": "Step-In Style",
            "gender": "Women",
            "occasion": "Festival Wear",
            "material": "Silk & Leather",
            "sizes": ["5", "6", "7", "8"],
            "colors": ["Champagne Gold", "Metallic Pink"],
            "thumbnail": "https://example.com/images/footwear-heels-thumb.png",
            "images": ["https://example.com/images/footwear-heels-1.png"]
        },
        {
            "name": "Leather Comfort Walk Loafers",
            "sub_category": "Casual Loafers",
            "description": "Genuine suede leather slip-on driving shoes, hand-stitched details and flexible rubber outsoles.",
            "price": 4200.0,
            "discount_price": 3360.0,
            "brand": "Walk Fit",
            "gender": "Men",
            "occasion": "Casual",
            "material": "Suede Leather",
            "sizes": ["8", "9", "10", "11"],
            "colors": ["Sandy Tan", "Classic Charcoal"],
            "thumbnail": "https://example.com/images/footwear-loafers-thumb.png",
            "images": ["https://example.com/images/footwear-loafers-1.png"]
        }
    ],
    "Handbags": [
        {
            "name": "Premium Leather Tote Bag",
            "sub_category": "Tote Bags",
            "description": "Spacious premium leather handbag with laptop compartment, gold-toned zipper pulling accents.",
            "price": 5500.0,
            "discount_price": 3999.0,
            "brand": "Moda Bags",
            "gender": "Women",
            "occasion": "Formal",
            "material": "Leather",
            "sizes": ["FS"],
            "colors": ["Caramel Brown", "Classic Ebony Black"],
            "thumbnail": "https://example.com/images/handbags-tote-thumb.png",
            "images": ["https://example.com/images/handbags-tote-1.png"]
        },
        {
            "name": "Zardozi Clutch Handbag Set",
            "sub_category": "Ethnic Clutches",
            "description": "Stunning velvet evening clutch featuring handmade zardozi embroidery and metal chain strap.",
            "price": 2800.0,
            "discount_price": 2240.0,
            "brand": "Shahi Clutch",
            "gender": "Women",
            "occasion": "Ethnic Wear",
            "material": "Velvet",
            "sizes": ["FS"],
            "colors": ["Royal Scarlet Red", "Emerald Green"],
            "thumbnail": "https://example.com/images/handbags-clutch-thumb.png",
            "images": ["https://example.com/images/handbags-clutch-1.png"]
        }
    ],
    "Ethnic Wear": [
        {
            "name": "Jaipuri Block Printed Cotton Kurta Set",
            "sub_category": "Kurta Sets",
            "description": "Pure cotton straight fit traditional style kurta matched with striped straight pants, elegant ethnic wear.",
            "price": 3200.0,
            "discount_price": 2399.0,
            "brand": "Rangila Jaipur",
            "gender": "Women",
            "occasion": "Ethnic Wear",
            "material": "Cotton",
            "sizes": ["S", "M", "L", "XL"],
            "colors": ["Indigo Blue Print", "Fierce Pink Print"],
            "thumbnail": "https://example.com/images/ethnic-kurta-thumb.png",
            "images": ["https://example.com/images/ethnic-kurta-1.png"]
        },
        {
            "name": "Lucknowi Chikankari Georgette Kurta",
            "sub_category": "Chikankari Kurtas",
            "description": "Beautiful hand-embroidered Lucknowi chikankari georgette kurta, comes with soft inner lining.",
            "price": 2800.0,
            "discount_price": 2199.0,
            "brand": "Awadh Weaves",
            "gender": "Women",
            "occasion": "Ethnic Wear",
            "material": "Georgette",
            "sizes": ["M", "L", "XL"],
            "colors": ["Mint Aqua", "Baby Pink"],
            "thumbnail": "https://example.com/images/ethnic-chikan-thumb.png",
            "images": ["https://example.com/images/ethnic-chikan-1.png"]
        }
    ],
    "Festival Wear": [
        {
            "name": "Traditional Festive Jacquard Silk Kurta",
            "sub_category": "Festive Kurtas",
            "description": "Brocade jacquard weave luxury kurta with churidar pajama, grand attire for Diwali and functions.",
            "price": 4800.0,
            "discount_price": 3599.0,
            "brand": "Festiva Weaves",
            "gender": "Men",
            "occasion": "Festival Wear",
            "material": "Jacquard Silk",
            "sizes": ["M", "L", "XL"],
            "colors": ["Golden Champagne", "Deep Wine Rose"],
            "thumbnail": "https://example.com/images/festive-jacquard-thumb.png",
            "images": ["https://example.com/images/festive-jacquard-1.png"]
        },
        {
            "name": "Zari Border Silk Dhoti Set",
            "sub_category": "Dhoti Sets",
            "description": "Pure Mysore silk traditional gold border dhoti matched with silk contrast angavastram.",
            "price": 3900.0,
            "discount_price": 3120.0,
            "brand": "Heritage Silks",
            "gender": "Men",
            "occasion": "Festival Wear",
            "material": "Pure Silk",
            "sizes": ["FS"],
            "colors": ["Cream Gold White"],
            "thumbnail": "https://example.com/images/festive-dhoti-thumb.png",
            "images": ["https://example.com/images/festive-dhoti-1.png"]
        }
    ]
}

def generate_products():
    # Read stores.json
    stores_path = os.path.join("seed", "stores.json")
    if not os.path.exists(stores_path):
        print(f"Error: stores.json path '{stores_path}' does not exist.")
        return

    with open(stores_path, "r", encoding="utf-8") as f:
        stores = json.load(f)

    print(f"Loaded {len(stores)} stores to map products.")

    products_list = []
    product_counter = 1

    for store in stores:
        categories = store.get("categories", [])
        if not categories:
            categories = ["Ethnic Wear"]
        
        # We generate 3-4 products for each store to reach ~132-176 products matching categories
        # Let's target exactly 3 products for each store
        # to ensure variation we cycle or choose from CAT_TEMPLATES
        for i in range(3):
            # Choose category
            cat = categories[i % len(categories)]
            templates = CAT_TEMPLATES.get(cat, CAT_TEMPLATES["Ethnic Wear"])
            # Choose template
            template = templates[i % len(templates)]
            
            # Copy template to avoid modifying references
            p = dict(template)
            
            # Uniqueness customizations
            p_id = f"p_{product_counter:04d}"
            p["_id"] = p_id
            p["category"] = cat
            product_counter += 1
            
            # Customize name to include store city or name details slightly
            # Example: "South India Shopping Mall Kanchipuram Silk Saree (Vermilion Red)"
            short_store_name = store["name"].split(" ")[0]
            color_variant = p['colors'][i % len(p['colors'])]
            p["name"] = f"{short_store_name} {p['name']} ({color_variant} - v{i+1})"
            p["brand"] = store["name"]
            
            # Dynamic fields
            p["store_name"] = store["name"]
            p["store_city"] = store["city"]

            # Predefined GI craft & origin mapping
            text = f"{p['name']} {p['category']} {p.get('sub_category', '')}".lower()
            gi_mapping = {
                "dharmavaram": "Dharmavaram",
                "kanchipuram": "Kanchipuram",
                "kanjivaram": "Kanchipuram",
                "banarasi": "Banarasi",
                "banaras": "Banarasi",
                "chanderi": "Chanderi",
                "pochampally": "Pochampally",
                "mangalagiri": "Mangalagiri",
                "venkatagiri": "Venkatagiri",
                "kota doria": "Kota Doria",
                "maheshwari": "Maheshwari",
                "paithani": "Paithani"
            }
            other_origins = {
                "lucknow": "Lucknow",
                "chikankari": "Lucknow",
                "jaipuri": "Jaipur",
                "jaipur": "Jaipur",
                "jamdani": "Uppada",
                "uppada": "Uppada",
                "gadwal": "Gadwal",
                "patola": "Patan",
                "kasavu": "Kerala",
                "kerala": "Kerala"
            }

            origin_val = None
            is_gi = False
            for key, val in gi_mapping.items():
                if key in text:
                    origin_val = val
                    is_gi = True
                    break
            if not origin_val:
                for key, val in other_origins.items():
                    if key in text:
                        origin_val = val
                        break
            if not origin_val:
                origin_val = store.get("city", "India")

            p["origin"] = origin_val
            p["is_gi_certified"] = is_gi

            # Convert sizes list of strings to list of dicts
            formatted_sizes = []
            for sz in p.get("sizes", []):
                if isinstance(sz, str):
                    formatted_sizes.append({"size": sz, "in_stock": True})
                else:
                    formatted_sizes.append(sz)
            p["sizes"] = formatted_sizes

            # Convert colors list of strings to list of dicts
            formatted_colors = []
            color_hex_map = {
                "Vermilion Red": "#E34234",
                "Peacock Blue": "#008080",
                "Peacock Blue - v1": "#008080",
                "Fuschia Pink": "#FF007F",
                "Royal Violet": "#7851A9",
                "Mint Green": "#98FF98",
                "Sun Yellow": "#FFD700",
                "Crimson Maroon": "#800000",
                "Wine Plum": "#5C246E",
                "Peach Cream": "#FFDAB9",
                "Lavender Frost": "#E6E6FA",
                "Teal Blue": "#008080",
                "Rust Orange": "#C95A49",
                "Indigo Blue": "#4B0082",
                "Charcoal Black": "#36454F",
                "Mustard Yellow": "#FFDB58",
                "Emerald Green": "#50C878",
                "Ruby Red": "#E0115F",
                "Deep Turquoise": "#00CED1",
                "Classic White": "#FFFFFF",
                "Sky Blue": "#87CEEB",
                "Olive Green": "#808000",
                "Pink Pearl": "#E7ACCF",
                "Corporate Blue": "#4E73DF",
                "Navy Blue": "#000080",
                "Crimson Red": "#DC143C",
                "Jet Black": "#0A0A0A",
                "Acid Wash Grey": "#808080",
                "Off White": "#FAF9F6",
                "Dark Indigo": "#0F2027",
                "Light Blue Wash": "#ADD8E6",
                "Raw Indigo Black": "#1A252C",
                "Cream Ivory": "#FFFDD0",
                "Royal Beige": "#F5F5DC",
                "Deep Royal Blue": "#0020C2",
                "Crimson Burgundy": "#800020",
                "Marigold Yellow": "#EAA221",
                "Coral Pink": "#F88379",
                "Golden Fawn": "#E5A93B",
                "Turquoise Aqua": "#00F5FF",
                "Bright Maroon": "#C32148",
                "Peacock Green": "#00A86B",
                "Tan Brown": "#D2B48C",
                "Chestnut Black": "#4A3B32",
                "Champagne Gold": "#F7E7CE",
                "Metallic Pink": "#FDA4AF",
                "Sandy Tan": "#F4A460",
                "Classic Charcoal": "#36454F",
                "Caramel Brown": "#AFD275",
                "Classic Ebony Black": "#101010",
                "Royal Scarlet Red": "#FF2400",
                "Indigo Blue Print": "#4B0082",
                "Fierce Pink Print": "#FF69B4",
                "Mint Aqua": "#A7F3D0",
                "Baby Pink": "#FBCFE8",
                "Golden Champagne": "#FDE68A",
                "Deep Wine Rose": "#BE185D",
                "Cream Gold White": "#FFFDF0"
            }

            for col in p.get("colors", []):
                if isinstance(col, str):
                    h = color_hex_map.get(col, "#7F7F7F")
                    formatted_colors.append({
                        "name": col,
                        "hex": h,
                        "thumbnail": p.get("thumbnail") or "https://example.com/images/default.png"
                    })
                else:
                    formatted_colors.append(col)
            p["colors"] = formatted_colors
            
            # Calculate discount
            pct = 0.0
            if p.get("discount_price"):
                pct = round(((p["price"] - p["discount_price"]) / p["price"]) * 100, 2)
            p["discount_percentage"] = pct
            
            p["stock_quantity"] = random.randint(5, 50)
            p["rating"] = round(random.uniform(4.0, 4.9), 1)
            p["review_count"] = random.randint(10, 450)
            p["is_available"] = True
            p["is_featured"] = (i == 0) # Mark the first product of every store as featured
            p["created_at"] = "2026-07-18T12:00:00Z"
            
            products_list.append(p)

    out_path = os.path.join("seed", "products.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(products_list, f, indent=4, ensure_ascii=False)

    print(f"SUCCESS: Generated {len(products_list)} products inside '{out_path}'.")

if __name__ == "__main__":
    generate_products()
