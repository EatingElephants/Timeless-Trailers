"""
Puts the Timeless Trailers logo on Andy's cap.

    py -3 tools/cap_logo.py

Reads the four original drawings in the Timeless media folder (03 Media\\Andy), stamps the logo on the cap's front
panel (position, size and tilt set per drawing below), and writes the results to 03 Media\\Andy\\capped\\.
Then run:  py -3 tools/make_andy.py "<...>\\03 Media\\Andy\\capped"   to make the web files.
Needs Pillow.
"""
from pathlib import Path
from PIL import Image

SRC = Path(r"C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Andy")
OUT = SRC / "capped"
LOGO = Path(__file__).resolve().parent.parent / "site" / "img" / "timeless-logo.webp"

# drawing: (centre x, centre y, logo width, tilt in degrees, counter-clockwise positive)
PLACE = {
    "andy-wave.png": (608, 152, 172, 11),
    "andy-look.png": (652, 150, 182, 8),
    "andy-read.png": (646, 190, 196, 12),
    "andy-thumbs.png": (548, 118, 148, 2),
}

OUT.mkdir(exist_ok=True)
logo = Image.open(LOGO).convert("RGBA")
for name, (cx, cy, w, tilt) in PLACE.items():
    im = Image.open(SRC / name).convert("RGBA")
    h = round(logo.height * w / logo.width)
    patch = logo.resize((w, h), Image.LANCZOS).rotate(tilt, resample=Image.BICUBIC, expand=True)
    # a little bend: squash the top edge so it sits on the curve of the cap (cheap perspective)
    im.alpha_composite(patch, (cx - patch.width // 2, cy - patch.height // 2))
    im.save(OUT / name)
    print("  stamped", name, "at", (cx, cy), "width", w, "tilt", tilt)
print("wrote", OUT)
