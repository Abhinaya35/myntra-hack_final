import json
import os

# Unique Unsplash image IDs that represent high-quality Indian traditional wear, sarees, boutiques, and retail showrooms.
UNSPLASH_IDS = [
    # South India Shopping Mall
    "photo-1610030469983-98e550d6193c", "photo-1608748010899-18f300247112",
    # RS Brothers
    "photo-1617627143750-d86bc21e42bb", "photo-1583391733956-3750e0ff4e8b",
    # Chandana Brothers
    "photo-1528255915607-9012fda0f836", "photo-1596783074918-c84cb06531ca",
    # KLM Fashion Mall
    "photo-1590736969955-71cc94801759", "photo-1610030470204-62770d6fde2e",
    # Kalanjali
    "photo-1610030469851-cd947c5040e0", "photo-1631857455684-a54a2f03665f",
    # CMR Heritage
    "photo-1597196526281-fe4861daa915", "photo-1610030469668-93535c17b6b3",
    # Kalanikethan
    "photo-1621184455862-c163dfb30e0f", "photo-1610030469796-7c6d66e74b3a",
    # Sri Vasavi Silks
    "photo-1610030469608-aa137a544c01", "photo-1605721911519-3dfeb3be25e7",
    # Padmavathi Shopping Mall
    "photo-1534126416832-a88fdf2911c2", "photo-1567401893930-7db7138b315d",
    # Sri Lakshmi Silks
    "photo-1441984904996-e0b6ba687e04", "photo-1594938298603-c8148c4dae35",
    # Vastra Trends
    "photo-1558769132-cb1aea458c5e", "photo-1441986300917-64674bd600d8",
    # Venkateswara Textiles
    "photo-1479064555552-3ef4979f8908", "photo-1523381210434-271e8be1f52b",
    # CMR Shopping Mall
    "photo-1490481651871-ab68de25d43d", "photo-1483985988355-763728e1935b",
    # KLM Fashion Mall (Vijayawada)
    "photo-1595341888016-a392ef81b7de", "photo-1489987707025-afc232f7ea0f",
    # Chandana Brothers (Vijayawada)
    "photo-1507679799987-c73779587ccf", "photo-1544816155-12df9643f363",
    # Sri Krishna Silks
    "photo-1567401893414-76b7b1e5a7a5", "photo-1606744837616-56c9a5c6a6eb",
    # CMR Central
    "photo-1581091226825-a6a2a5aee158", "photo-1543163521-1bf539c55dd2",
    # KLM Fashion Mall (Visakhapatnam)
    "photo-1490114538077-0a7f8cb49891", "photo-1578587018452-892bacefd3f2",
    # Varma Textiles
    "photo-1585487000160-6ebcfceb0d03", "photo-1509631179647-0177331693ae",
    # Chandana Brothers (Visakhapatnam)
    "photo-1512436991641-6745cdb1723f", "photo-1560243563-062bff001d68",
    # The Chennai Silks
    "photo-1555529669-e69e7aa0993b", "photo-1601924994987-69e26d50dc26",
    # Pothys (Coimbatore)
    "photo-1496747611176-843222e1e57c", "photo-1434389677669-e08b4cac3105",
    # RMKV
    "photo-1515886657613-9f3515b0c78f", "photo-1556905055-8f358a7a47b2",
    # Sri Kumaran Fashion
    "photo-1529139574466-a303027c1d8b", "photo-1501196354995-cbb51c65aaea",
    # Seematti
    "photo-1537832816519-689ad163238b", "photo-1539571696357-5a69c17a67c6",
    # Jayalakshmi Silks
    "photo-1603252109303-2751441dd157", "photo-1551488831-00ddcb6c6bd3",
    # Pothys (Kochi)
    "photo-1532453288454-75651b116063", "photo-1589410103681-309d94943fcf",
    # Milan Design
    "photo-1608231387042-66d1773070a5", "photo-1582298538104-e22e11c68616",
    # Mysore Saree Udyog
    "photo-1469334031218-e382a71b716b", "photo-1618220179428-22790b461013",
    # KSIC Silk Showroom
    "photo-1485968579580-b6d095142e6e", "photo-1544441893-675973e31985",
    # Prasiddhi Silks
    "photo-1492707892479-7bc8d5a4ee93", "photo-1485230895905-ec40ba36b9bc",
    # Kayes Fashion
    "photo-1595959183075-c1d09e37b19e", "photo-1598300042247-d088f8ab3a91",
    # Dhantoli Fashion House
    "photo-1516257984-b1b4d707412e", "photo-1618932260643-eee4a2f652a6",
    # Arvind Store
    "photo-1503342217505-b0a15ec3261c", "photo-1603252109463-5494f6c4ff98",
    # Cotton County
    "photo-1540221652346-e7dd6b50f3e7", "photo-1552374196-1ab2a1c593e8",
    # Vastram
    "photo-1505022610485-0249ba5b3675", "photo-1561526116-c3cc0090886a",
    # Rajasthali
    "photo-1611080626919-7cf5a9dbab5b", "photo-1585487000160-6ebcfceb0d03",
    # Jaipur Textile House
    "photo-1610030469608-aa137a544c01", "photo-1610030469796-7c6d66e74b3a",
    # Gulab Chand Prints
    "photo-1606744837616-56c9a5c6a6eb", "photo-1610030469983-98e550d6193c",
    # Jaipur Kurti Store
    "photo-1617627143750-d86bc21e42bb", "photo-1583391733956-3750e0ff4e8b",
    # V2 Retail
    "photo-1528255915607-9012fda0f836", "photo-1596783074918-c84cb06531ca",
    # Pantaloons Patna
    "photo-1590736969955-71cc94801759", "photo-1610030470204-62770d6fde2e",
    # Patna Fashion Hub
    "photo-1610030469851-cd947c5040e0", "photo-1631857455684-a54a2f03665f",
    # Bihar Ethnic Collections
    "photo-1597196526281-fe4861daa915", "photo-1610030469668-93535c17b6b3"
]

def main():
    json_path = os.path.join("seed", "stores.json")
    with open(json_path, "r", encoding="utf-8") as f:
        stores = json.load(f)

    for i, store in enumerate(stores):
        # 2 unique images per store
        logo_idx = (i * 2) % len(UNSPLASH_IDS)
        banner_idx = (i * 2 + 1) % len(UNSPLASH_IDS)
        
        logo_id = UNSPLASH_IDS[logo_idx]
        banner_id = UNSPLASH_IDS[banner_idx]
        
        # Build logo (square form factor fits beautifully in card lists)
        store["logo_image"] = f"https://images.unsplash.com/{logo_id}?auto=format&fit=crop&w=400&h=400&q=80"
        # Build banner (wide panorama ideal for hero elements)
        store["banner_image"] = f"https://images.unsplash.com/{banner_id}?auto=format&fit=crop&w=1200&h=540&q=80"

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(stores, f, indent=4, ensure_ascii=False)

    print(f"Updated {len(stores)} stores inside {json_path} successfully.")

if __name__ == "__main__":
    main()
