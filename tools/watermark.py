"""
Puts a small Timeless Trailers logo in the corner of the gallery, tile and backdrop photos in site/img/,
and builds the Dump tile from the dump product shot. Run after make_images.py:  py -3 tools/watermark.py
"""
from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "site" / "img"
logo = Image.open(IMG / "timeless-logo.webp").convert("RGBA")

def mark(path, scale=0.16, pad=0.025):
    im = Image.open(path).convert("RGBA")
    w = max(120, int(im.width * scale))
    lg = logo.resize((w, round(logo.height * w / logo.width)), Image.LANCZOS)
    # soft dark plate behind the logo so it reads on bright photos
    plate = Image.new("RGBA", (lg.width + 24, lg.height + 16), (0, 0, 0, 0))
    inner = Image.new("RGBA", plate.size, (20, 18, 14, 150))
    plate = Image.alpha_composite(plate, inner).filter(ImageFilter.GaussianBlur(6))
    x = im.width - plate.width - int(im.width * pad)
    y = im.height - plate.height - int(im.width * pad)
    im.alpha_composite(plate, (x, y))
    im.alpha_composite(lg, (x + 12, y + 8))
    im.convert("RGB").save(path, "WEBP", quality=80, method=6)

def dump_tile():
    """A dark, photographic-feeling tile for Dump from the product cut-out."""
    card = Image.open(IMG / "card-1614d.webp").convert("RGBA")
    tile = Image.new("RGBA", (1400, 788), (28, 26, 22, 255))
    # brushed-aluminium feel: soft vertical gradient
    for yy in range(788):
        v = 28 + int(26 * (yy / 788))
        tile.paste((v, v - 1, v - 3, 255), (0, yy, 1400, yy + 1))
    w = 1180
    c = card.resize((w, round(card.height * w / card.width)), Image.LANCZOS)
    # drop the white background of the cut-out to near-transparent
    px = c.load()
    for yy in range(c.height):
        for xx in range(c.width):
            r, g, b, a = px[xx, yy]
            if r > 238 and g > 238 and b > 238:
                px[xx, yy] = (r, g, b, 0)
    tile.alpha_composite(c, ((1400 - w) // 2, 788 - c.height - 60))
    tile.convert("RGB").save(IMG / "tile-dump.webp", "WEBP", quality=80, method=6)

if __name__ == "__main__":
    dump_tile()
    n = 0
    for p in sorted(IMG.glob("*.webp")):
        if p.name.startswith(("g-", "tile-", "bg-")):
            mark(p); n += 1
    print(f"watermarked {n} photos; tile-dump.webp made")
