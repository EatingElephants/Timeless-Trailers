"""
Turns the chosen Timpte photos into fast web images in site/img/.
Originals stay where they are (OneDrive). Run:  py -3 tools/make_images.py

To change a photo: edit the PICKS list below, then run this again.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "site" / "img"
LIB = Path(r"C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content")
SI = LIB / "Stock Images"
TP = Path(r"C:\Users\jsalb\OneDrive\Desktop\Timeless Photos")
SRC = ROOT / "src" / "img-originals"

MS = SI / "Motorsports"
PH = SI / "Powerhouse"

# (output name, source file, max width)
PICKS = [
    # brand
    ("timeless-logo", SRC / "timeless-logo.webp", 900),
    ("timpte-et-logo", LIB / "Timpte_Logo_Equipment_Trailer_Large.png", 700),
    ("timpte-powerhouse-logo", LIB / "Timpte_Logo_Powerhouse_Large.png", 600),
    ("timpte-motorsports-logo", LIB / "Timpte_Logo_Motorsports_Large.png", 600),
    ("family-showroom", SI / "Model Family" / "Timpte_Equipment_Trailer_ModelFamily-01.jpg", 1600),
    ("family-lineup", SI / "Model Family" / "Timpte_Equipment_Trailer_ModelFamily-08.jpg", 1600),

    # card images (product shots on white)
    ("card-514", MS / "514 EZ Load" / "Stock Photos" / "514-EZLoad.png", 900),
    ("card-720", TP / "7kr3tsez-trailer-resize.webp", 900),
    ("card-1020", MS / "1020 EZ Load" / "Stock Photos" / "Timpte-1020-EZLoad-FrontCutOut.png", 900),
    ("card-1026", TP / "1026.webp", 900),
    ("card-1420st", TP / "split_tilt_deck_2.webp", 900),
    ("card-1624st", PH / "Split Tilt Models" / "1624 Split Tilt" / "Equipment Photos" / "16k-Split-002.jpg", 1200),
    ("card-1414d", TP / "timpte-1414-dump.webp", 900),
    ("card-1614d", TP / "timpte-1614-dump.webp", 900),
    ("card-1620do", PH / "Deck Over Models" / "1620 Deck Over" / "Stock Photos" / "Timpte_1620_DeckOver_CutOut.png", 900),
    ("card-1620gn", TP / "1620gndo-trailer-new.webp", 900),

    # galleries: real loads first
    ("g-514-1", MS / "514 EZ Load" / "Equipment Photos" / "5K-EZLoad-001.jpg", 1600),
    ("g-514-2", MS / "514 EZ Load" / "Equipment Photos" / "5K-EZLoad-003.jpg", 1600),
    ("g-514-3", MS / "514 EZ Load" / "Equipment Photos" / "5K-EZLoad-005.jpg", 1600),
    ("g-514-4", MS / "514 EZ Load" / "Equipment Photos" / "UTV-4.jpg", 1600),
    ("g-720-1", MS / "720 EZ Load" / "Equipment Photos" / "7K-EZLoad-005.jpg", 1600),
    ("g-720-2", MS / "720 EZ Load" / "Equipment Photos" / "7K-EZLoad-006.jpg", 1600),
    ("g-720-3", MS / "720 EZ Load" / "Equipment Photos" / "7K-EZLoad-013.jpg", 1600),
    ("g-720-4", MS / "720 EZ Load" / "Equipment Photos" / "IMG_7024.jpg", 1600),
    ("g-1020-1", MS / "1020 EZ Load" / "Equipment Photos" / "10K-EZLoad-001.jpg", 1600),
    ("g-1020-2", MS / "1020 EZ Load" / "Equipment Photos" / "10K-EZLoad-007.jpg", 1600),
    ("g-1020-3", MS / "1020 EZ Load" / "Equipment Photos" / "DSC01427.jpg", 1600),
    ("g-1020-4", MS / "1020 EZ Load" / "Equipment Photos" / "DSC01567-edit.jpg", 1600),
    ("g-1026-1", MS / "1026 EZ Load" / "Equipment Photos" / "1026-EZLoad-001.jpg", 1600),
    ("g-1026-2", MS / "1026 EZ Load" / "Equipment Photos" / "1026-EZLoad-004.jpg", 1600),
    ("g-1026-3", MS / "1026 EZ Load" / "Equipment Photos" / "1026-EZLoad-006.jpg", 1600),
    ("g-1026-4", MS / "1026 EZ Load" / "Equipment Photos" / "1026-EZLoad-010.jpg", 1600),
    ("g-1420st-1", PH / "Split Tilt Models" / "1420 Split Tilt" / "Equipment Pictures" / "14k-Split-003.jpg", 1600),
    ("g-1420st-2", PH / "Split Tilt Models" / "1420 Split Tilt" / "Equipment Pictures" / "14k-Split-004.jpg", 1600),
    ("g-1420st-3", PH / "Split Tilt Models" / "1420 Split Tilt" / "Equipment Pictures" / "8G3A8445.jpg", 1600),
    ("g-1420st-4", PH / "Split Tilt Models" / "1420 Split Tilt" / "Showroom Pictures" / "Timpte-1420-SplitTilt-10.jpg", 1600),
    ("g-1624st-1", PH / "Split Tilt Models" / "1624 Split Tilt" / "Equipment Photos" / "16k-Split-004.jpg", 1600),
    ("g-1624st-2", PH / "Split Tilt Models" / "1624 Split Tilt" / "Equipment Photos" / "DSC01311.jpg", 1600),
    ("g-1624st-3", PH / "Split Tilt Models" / "1624 Split Tilt" / "Equipment Photos" / "DSC01365.jpg", 1600),
    ("g-1624st-4", PH / "Split Tilt Models" / "1624 Split Tilt" / "Equipment Photos" / "DSC01395.jpg", 1600),
    ("g-1620do-1", PH / "Deck Over Models" / "1620 Deck Over" / "Stock Photos" / "Timpte_1620_DeckOver_002.jpg", 1600),
    ("g-1620do-2", PH / "Deck Over Models" / "1620 Deck Over" / "Stock Photos" / "Timpte_1620_DeckOver_010.jpg", 1600),
    ("g-1620do-3", PH / "Deck Over Models" / "1620 Deck Over" / "Stock Photos" / "Timpte_1620_DeckOver_007.jpg", 1600),
    ("g-1620do-4", PH / "Deck Over Models" / "1620 Deck Over" / "Stock Photos" / "Timpte_1620_DeckOver_013.jpg", 1600),
    ("g-1620gn-1", PH / "Gooseneck Models" / "1620 Gooseneck" / "Stock Photos" / "Timpte_1620_Gooseneck_003.jpg", 1600),
    ("g-1620gn-2", PH / "Gooseneck Models" / "1620 Gooseneck" / "Stock Photos" / "Timpte_1620_Gooseneck_007.jpg", 1600),
    ("g-1620gn-3", PH / "Gooseneck Models" / "1620 Gooseneck" / "Stock Photos" / "Timpte_1620_Gooseneck_017.jpg", 1600),
    ("g-1620gn-4", PH / "Gooseneck Models" / "1620 Gooseneck" / "Stock Photos" / "Timpte_1620_Gooseneck_SpareTire_001.jpg", 1600),
]


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for name, src, width in PICKS:
        im = Image.open(src)
        if im.format == "JPEG":
            im.draft("RGB", (width * 2, width * 2))
        has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
        im = im.convert("RGBA" if has_alpha else "RGB")
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        dst = OUT / f"{name}.webp"
        im.save(dst, "WEBP", quality=80 if not has_alpha else 88, method=6)
        kb = dst.stat().st_size // 1024
        total += kb
        print(f"  {name:24s} {im.width}x{im.height}  {kb} KB")
    print(f"{len(PICKS)} images, {total/1024:.1f} MB total")


if __name__ == "__main__":
    main()
