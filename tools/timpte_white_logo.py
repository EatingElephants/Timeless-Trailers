"""
Makes site/img/timpte-et-logo-white.webp: Timpte's Equipment Trailer logo with white lettering on a transparent
background, for the dark footer (Josh, Oct 24: the black-on-white version was unreadable there). The orange slash
stays orange. Source: Timpte's own PNG in the dealer library. Needs Pillow.

    py -3 tools/timpte_white_logo.py
"""
from pathlib import Path
from PIL import Image

SRC = Path(r"C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content\Timpte_Logo_Equipment_Trailer_Large.png")
OUT = Path(__file__).resolve().parent.parent / "site" / "img" / "timpte-et-logo-white.webp"

im = Image.open(SRC).convert("RGBA")
px = im.load(); W, H = im.size
for y in range(H):
    for x in range(W):
        r, g, b, a = px[x, y]
        if a and max(r, g, b) < 150 and r < 120:      # the dark lettering; the orange slash has r > 200
            px[x, y] = (255, 255, 255, a)
im = im.crop(im.getbbox())
im = im.resize((700, round(im.height * 700 / im.width)), Image.LANCZOS)
im.save(OUT, "WEBP", quality=90, method=6)
print("wrote", OUT, im.size)
