"""
Makes the accessory pictures in site/img/ (acc-*.webp, 800x600) from Timpte's stock photos, and records which
accessory uses which picture in src/accessories.json.

    py -3 tools/make_accessory_images.py

Timpte's library has no catalog shots of the accessories themselves, so these are Timpte photos of the accessory
installed on a trailer (a spare tire on its holder, a toolbox, L-track with a D-ring, stake pockets, wheels).
Accessories with no matching photo keep "image": null and the page shows a drawn icon for the group instead.
Replace any of these by dropping a real product photo in and pointing PHOTOS at it. Needs Pillow.
"""
import json
from pathlib import Path
from PIL import Image

LIB = Path(r"C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content\Stock Images")
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "site" / "img"
ACC = ROOT / "src" / "accessories.json"

# picture name -> source photo in the library
PHOTOS = {
    "acc-spare-tire": LIB / "Powerhouse/Gooseneck Models/1620 Gooseneck/Stock Photos/Timpte_1620_Gooseneck_SpareTire_001.jpg",
    "acc-wheel-15": LIB / "Motorsports/1026 EZ Load/Stock Photos/Timpte_1026_EZLoad_Wheels.jpg",
    "acc-wheel-16": LIB / "Powerhouse/Deck Over Models/1626 Deck Over/Stock Photos/DeckOver-Tires.jpg",
    "acc-ltrack-dring": LIB / "Motorsports/1026 EZ Load/Stock Photos/Timpte_1026_EZLoad_LTrack_DRing.jpg",
    "acc-stake-pocket": LIB / "Motorsports/1026 EZ Load/Stock Photos/Timpte_1026_EZLoad_StakePocket.jpg",
    "acc-toolbox-gn": LIB / "Powerhouse/Gooseneck Models/1620 Gooseneck/Stock Photos/Timpte_1620_Gooseneck_Toolbox_001.jpg",
    "acc-toolbox-ez": LIB / "Motorsports/1026 EZ Load/Stock Photos/Timpte_1026_EZLoad_Toolbox_001.jpg",
}
# accessory part number -> picture name
USES = {
    "122416": "acc-spare-tire", "122415": "acc-spare-tire",
    "150133": "acc-wheel-15", "150134": "acc-wheel-15", "150132": "acc-wheel-15", "150135": "acc-wheel-16", "150138": "acc-wheel-16",
    "115051": "acc-ltrack-dring",
    "122519": "acc-stake-pocket", "127499": "acc-stake-pocket",
    "125525": "acc-toolbox-gn", "186832": "acc-toolbox-gn", "150191": "acc-toolbox-ez",
}

for name, src in PHOTOS.items():
    if not src.exists():
        print("  missing photo:", src); continue
    im = Image.open(src).convert("RGB")
    w, h = im.size; target = 4 / 3
    if w / h > target:
        nw = int(h * target); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    im = im.resize((800, 600), Image.LANCZOS)
    im.save(OUT / f"{name}.webp", "WEBP", quality=82, method=6)
    print(f"  {name}.webp  {(OUT / (name + '.webp')).stat().st_size // 1024} KB")

data = json.loads(ACC.read_text("utf-8"))
n = 0
for it in data["items"]:
    if it["no"] in USES:
        it["image"] = USES[it["no"]]; n += 1
ACC.write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n", "utf-8", newline="\n")
print(f"{n} of {len(data['items'])} accessories have a picture; the rest show their group's icon.")
