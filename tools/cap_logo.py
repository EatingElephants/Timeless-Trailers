"""
Puts the Timeless Trailers logo on Andy's cap, centred on the cap's front panel.

    py -3 tools/cap_logo.py

Reads the four original drawings in the Timeless media folder (03 Media\\Andy), stamps the logo on the front panel
and writes the results to 03 Media\\Andy\\capped\\. Then run:
    py -3 tools/make_andy.py "<...>\\03 Media\\Andy\\capped"
to make the web files. Needs Pillow.

The numbers below were measured from the drawings on Oct 24: the front panel is the plain gold area between the two
seams and above the brim. The logo is centred on it, 88% of its width, and tilted to sit parallel to the panel's
edges (a negative tilt turns it clockwise, so the right end sits lower, the way the brim runs in these drawings).
"""
from pathlib import Path
from PIL import Image

SRC = Path(r"C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Andy")
OUT = SRC / "capped"
LOGO = Path(__file__).resolve().parent.parent / "site" / "img" / "timeless-logo.webp"

# drawing: (centre x, centre y, logo width, tilt in degrees; positive turns counter-clockwise)
PLACE = {
    "andy-wave.png": (640, 126, 206, -8),    # panel x 523-758, y 59-204; its edges run down to the right 5-10 degrees
    "andy-look.png": (676, 104, 197, -10),   # panel x 564-788, y 32-187; edges run 7-13 degrees
    "andy-read.png": (646, 155, 190, -5),    # panel x 539-754, y 61-258; edges run 1-9 degrees
    "andy-thumbs.png": (513, 110, 228, 8),   # panel x 383-644, y 32-193; this pose faces the other way
}

OUT.mkdir(exist_ok=True)
logo = Image.open(LOGO).convert("RGBA")
for name, (cx, cy, w, tilt) in PLACE.items():
    im = Image.open(SRC / name).convert("RGBA")
    h = round(logo.height * w / logo.width)
    patch = logo.resize((w, h), Image.LANCZOS).rotate(tilt, resample=Image.BICUBIC, expand=True)
    im.alpha_composite(patch, (cx - patch.width // 2, cy - patch.height // 2))
    im.save(OUT / name)
    print("  stamped", name, "at", (cx, cy), "width", w, "tilt", tilt)
print("wrote", OUT)
