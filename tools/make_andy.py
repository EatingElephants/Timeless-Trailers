"""
Turns the two Andy mascot illustrations (made in Canva, backgrounds removed) into the web images the site uses.

    py -3 tools/make_andy.py  <folder with andy-wave.png and andy-thumbs.png>

Writes to site/img/:
  andy-wave.webp    the waving Andy for the corner button (transparent, trimmed, 480 px wide)
  andy-thumbs.webp  the thumbs-up Andy with the clipboard (transparent, trimmed, 720 px tall)
  andy-face.webp    a square crop of the waving Andy's face for round avatars (240 px)
Needs Pillow. The originals stay in OneDrive\\Desktop\\Albright Innovations\\Matt Lyons\\Timeless Trailers\\03 Media\\Andy.
"""
import sys
from pathlib import Path
from PIL import Image

src = Path(sys.argv[1])
out = Path(__file__).resolve().parent.parent / "site" / "img"


def trimmed(name):
    im = Image.open(src / name).convert("RGBA")
    box = im.getchannel("A").getbbox()
    return im.crop(box)


def fit(im, w=None, h=None):
    if w:
        h2 = round(im.height * w / im.width); return im.resize((w, h2), Image.LANCZOS)
    w2 = round(im.width * h / im.height); return im.resize((w2, h), Image.LANCZOS)


wave = trimmed("andy-wave.png")
fit(wave, w=480).save(out / "andy-wave.webp", "WEBP", quality=88, method=6)

thumbs = trimmed("andy-thumbs.png")
fit(thumbs, h=720).save(out / "andy-thumbs.webp", "WEBP", quality=88, method=6)

# face: a square around the head of the waving Andy. Cap top to chin is roughly the top 45% of the trimmed image,
# centred a little right of the middle (the hand is on the left).
w, h = wave.size
side = int(h * 0.46)
cx = int(w * 0.57); cy = int(h * 0.27)
box = (max(0, cx - side // 2), max(0, cy - side // 2), min(w, cx + side // 2), min(h, cy + side // 2))
face = wave.crop(box)
# flatten onto the site's warm paper so it works in a round avatar
bg = Image.new("RGBA", face.size, (255, 248, 232, 255)); bg.alpha_composite(face)
bg.convert("RGB").resize((240, 240), Image.LANCZOS).save(out / "andy-face.webp", "WEBP", quality=88, method=6)

for n in ("andy-wave.webp", "andy-thumbs.webp", "andy-face.webp"):
    p = out / n; im = Image.open(p); print(f"  {n}: {im.size[0]}x{im.size[1]} {p.stat().st_size // 1024} KB")
