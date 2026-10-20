"""
Turns the Andy mascot illustrations (made in Canva, backgrounds removed) into the web images the site uses.

    py -3 tools/make_andy.py  <folder with the PNGs below>

Expects in that folder (all 1264x1264 transparent PNGs, same framing, except andy-thumbs which is 1088x1456):
  andy-wave.png   looking at you, waving, clipboard under the arm
  andy-look.png   looking at you, holding the clipboard with both hands
  andy-read.png   looking down at the clipboard, turning a page
  andy-thumbs.png waist-up, thumbs up (not used on the site yet)

Writes to site/img/:
  andy-1.webp, andy-2.webp, andy-3.webp   the three idle-loop frames for the corner button (wave, look, read), 480 px,
                                          NOT trimmed, so the character stays put as the frames crossfade
  andy-thumbs.webp                        trimmed, 720 px tall
  andy-face.webp                          a square crop of the waving Andy's face for round avatars (240 px)
Needs Pillow. The originals stay in OneDrive\\Desktop\\Albright Innovations\\Matt Lyons\\Timeless Trailers\\03 Media\\Andy.
"""
import sys
from pathlib import Path
from PIL import Image

src = Path(sys.argv[1])
out = Path(__file__).resolve().parent.parent / "site" / "img"


def load(name):
    return Image.open(src / name).convert("RGBA")


def fit(im, w=None, h=None):
    if w:
        return im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    return im.resize((round(im.width * h / im.height), h), Image.LANCZOS)


# idle-loop frames: same canvas, same scale, no trimming
for i, name in enumerate(("andy-wave.png", "andy-look.png", "andy-read.png"), 1):
    if (src / name).exists():
        fit(load(name), w=480).save(out / f"andy-{i}.webp", "WEBP", quality=88, method=6)
    else:
        print("  missing", name)

thumbs = load("andy-thumbs.png")
thumbs = thumbs.crop(thumbs.getchannel("A").getbbox())
fit(thumbs, h=720).save(out / "andy-thumbs.webp", "WEBP", quality=88, method=6)

# face: a square around the head of the waving Andy (untrimmed canvas: the head sits upper-middle, hand on the left)
wave = load("andy-wave.png")
w, h = wave.size
side = int(h * 0.44)
cx = int(w * 0.58); cy = int(h * 0.30)
face = wave.crop((cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2))
bg = Image.new("RGBA", face.size, (255, 248, 232, 255)); bg.alpha_composite(face)
bg.convert("RGB").resize((240, 240), Image.LANCZOS).save(out / "andy-face.webp", "WEBP", quality=88, method=6)

for p in sorted(out.glob("andy-*.webp")):
    im = Image.open(p); print(f"  {p.name}: {im.size[0]}x{im.size[1]} {p.stat().st_size // 1024} KB")
