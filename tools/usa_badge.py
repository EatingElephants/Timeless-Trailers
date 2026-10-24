"""
Makes site/img/usa-badge.webp: Josh's Made in the USA shield sticker (Oct 24) with the Timpte Equipment Trailer
logo set into its white panel, background cut away so it floats at the top right of every page.

    py -3 tools/usa_badge.py

Source artwork: 03 Media\\Made in the USA badge.webp (the sticker Josh sent). Logo: site/img/timpte-et-logo.webp.
Needs Pillow.
"""
from collections import deque
from pathlib import Path
from PIL import Image

MEDIA = Path(r"C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media")
ROOT = Path(__file__).resolve().parent.parent
SRC = MEDIA / "Made in the USA badge.webp"
LOGO = ROOT / "site" / "img" / "timpte-et-logo.webp"
OUT = ROOT / "site" / "img" / "usa-badge.webp"

im = Image.open(SRC).convert("RGBA"); W, H = im.size; px = im.load()
white = lambda p: p[3] > 0 and min(p[0], p[1], p[2]) > 232

def fill(seeds, ok):
    """Flood fill from the seeds through pixels that pass ok(); returns the set of pixels."""
    seen = set(); q = deque()
    for s in seeds:
        if s not in seen and ok(px[s]): seen.add(s); q.append(s)
    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < W and 0 <= ny < H and (nx, ny) not in seen and ok(px[nx, ny]):
                seen.add((nx, ny)); q.append((nx, ny))
    return seen

# 1. the background: everything white that touches the edge of the picture
edge = [(x, 0) for x in range(W)] + [(x, H - 1) for x in range(W)] + [(0, y) for y in range(H)] + [(W - 1, y) for y in range(H)]
bg = fill(edge, white)
for x, y in bg: px[x, y] = (255, 255, 255, 0)
# soften the cut edge: a pixel next to the cut that is still whitish gets half alpha
for x, y in list(bg):
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < W and 0 <= ny < H and (nx, ny) not in bg:
            p = px[nx, ny]
            if min(p[0], p[1], p[2]) > 200: px[nx, ny] = (p[0], p[1], p[2], 170)
print(f"sticker {W}x{H}, background cut: {len(bg)} px")

# 2. the white panel: the biggest white area in the lower half, found from the longest white run on one row
y0 = int(H * 0.68); best = (0, 0, 0); run = 0
for x in range(W):
    if white(px[x, y0]): run += 1
    else:
        if run > best[0]: best = (run, x - run, x - 1)
        run = 0
if run > best[0]: best = (run, W - run, W - 1)
panel = fill([((best[1] + best[2]) // 2, y0)], white)
xs = [p[0] for p in panel]; ys = [p[1] for p in panel]
L, T, R, B = min(xs), min(ys), max(xs), max(ys)
print(f"white panel x {L}-{R} ({R - L} wide), y {T}-{B} ({B - T} tall)")

# 3. the logo, centred in the panel at 80% of its width (or less if the panel is short)
logo = Image.open(LOGO).convert("RGBA")
w = int((R - L) * 0.80); h = round(logo.height * w / logo.width)
if h > (B - T) * 0.62: h = int((B - T) * 0.62); w = round(logo.width * h / logo.height)
logo = logo.resize((w, h), Image.LANCZOS)
im.alpha_composite(logo, ((L + R) // 2 - w // 2, (T + B) // 2 - h // 2))

im = im.crop(im.getbbox())
im = im.resize((520, round(im.height * 520 / im.width)), Image.LANCZOS)
im.save(OUT, "WEBP", quality=90, method=6)
print("wrote", OUT, im.size, OUT.stat().st_size // 1024, "KB")
preview = Image.new("RGBA", (im.width * 2 + 60, im.height + 40), (40, 36, 30, 255))
preview.alpha_composite(im, (20, 20)); light = Image.new("RGBA", (im.width + 20, im.height + 40), (243, 241, 236, 255)); preview.alpha_composite(light, (im.width + 40, 0)); preview.alpha_composite(im, (im.width + 50, 20))
preview.save(ROOT.parent / "timeless-trailers" / "site" / "img" / "_usa-badge-preview.png")
