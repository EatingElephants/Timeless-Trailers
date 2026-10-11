#!/usr/bin/env python3
"""
Builds the Timeless Trailers site into the site/ folder.

    How to run:   py -3 build.py        (or double-click build.bat)

- site/index.html is made from src/shell.html + src/styles.css + src/data.js + src/app1.js + src/app2.js
- site/img/ comes from tools/make_images.py (only rerun that if you change a photo)
- site/video/ was made once with ffmpeg (see tools/encode.ps1)
- site/specs/ gets a copy of the Timpte spec sheets listed below

Uses only what comes with Python. Nothing to install for the build itself.
"""
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
SITE = ROOT / "site"
LIB = Path(r"C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content")
SHEETS = LIB / "Product Catalog & Spec Sheets"

# Spec sheets published on the site (dealer-only documents are deliberately not here)
SPECS = {
    "timpte-514-ez-load.pdf": SHEETS / "Motorsports Spec Sheets" / "Timpte_ET_514_EZLoad_SpecSheet.pdf",
    "timpte-720-ez-load.pdf": SHEETS / "Motorsports Spec Sheets" / "Timpte_ET_720_EZLoad_SpecSheet.pdf",
    "timpte-10k-ez-load.pdf": SHEETS / "Motorsports Spec Sheets" / "Timpte_ET_10K_EZLoad_SpecSheet.pdf",
    "timpte-14k-split-tilt.pdf": SHEETS / "Powerhouse Spec Sheets" / "Timpte_ET_14K_SplitTilt_SpecSheet.pdf",
    "timpte-16k-split-tilt.pdf": SHEETS / "Powerhouse Spec Sheets" / "Timpte_ET_16K_SplitTilt_SpecSheet.pdf",
    "timpte-14k-dump.pdf": SHEETS / "Powerhouse Spec Sheets" / "Timpte_ET_14K_Dump_SpecSheet.pdf",
    "timpte-16k-dump.pdf": SHEETS / "Powerhouse Spec Sheets" / "Timpte_ET_16K_Dump_SpecSheet.pdf",
    "timpte-16k-gooseneck.pdf": SHEETS / "Powerhouse Spec Sheets" / "Timpte_ET_16K_Gooseneck_SpecSheet.pdf",
    "timpte-deck-over-2026.pdf": LIB / "Sales Bulletins" / "Timpte-DeckOver-SpecSheet-072326.pdf",
    "timpte-equipment-trailer-catalog-2026.pdf": SHEETS / "Timpte_Equipment_Trailer_Catalog_082526.pdf",
}


def read(p):
    return p.read_text("utf-8")


def jsonld():
    """Structured data for search engines: the dealership, and one Product per Timpte model (specs pulled from src/data.js)."""
    import json, re
    data = read(SRC / "data.js")
    products = []
    for m in re.finditer(r'model: "([^"]+)", type: "(\w+)".*?payload: (\d+), gvwr: (\d+), empty: (\d+), deck: "((?:[^"\\]|\\.)*)"', data, re.S):
        name, typ, payload, gvwr, empty, deck = m.groups()
        products.append({
            "@type": "Product", "name": name, "brand": {"@type": "Brand", "name": "Timpte"},
            "category": "Aluminum " + {"tilt": "split tilt equipment trailer", "deckover": "deck over trailer", "gooseneck": "gooseneck trailer", "dump": "dump trailer", "ezload": "EZ Load car and UTV hauler"}[typ],
            "additionalProperty": [
                {"@type": "PropertyValue", "name": "Payload capacity", "value": payload, "unitText": "lb"},
                {"@type": "PropertyValue", "name": "GVWR", "value": gvwr, "unitText": "lb"},
                {"@type": "PropertyValue", "name": "Empty weight", "value": empty, "unitText": "lb"},
                {"@type": "PropertyValue", "name": "Deck", "value": deck.replace('\\"', '"')},
            ],
        })
    graph = [{
        "@type": "AutoDealer", "name": "Timeless Trailers", "slogan": "Built once. Lasts forever.",
        "description": "The only dealer in the U.S. that sells Timpte equipment trailers exclusively. Aluminum split tilt, deck over, gooseneck, dump and EZ Load trailers in Waxhaw, NC.",
        "telephone": "+1-704-589-3100",
        "address": {"@type": "PostalAddress", "streetAddress": "4417-A Helms Road", "addressLocality": "Waxhaw", "addressRegion": "NC", "postalCode": "28173", "addressCountry": "US"},
        "openingHoursSpecification": [{"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:00", "closes": "17:00"}],
        "brand": {"@type": "Brand", "name": "Timpte Equipment Trailers"},
        "areaServed": ["Waxhaw NC", "Charlotte NC", "Union County NC", "North Carolina", "South Carolina"],
        "makesOffer": [{"@type": "Offer", "itemOffered": p} for p in products],
    }]
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, indent=1)


def main():
    SITE.mkdir(exist_ok=True)
    html = read(SRC / "shell.html")
    for key, name in [("CSS", "styles.css"), ("DATA", "data.js"), ("APP1", "app1.js"), ("APP2", "app2.js")]:
        html = html.replace("%%" + key + "%%", read(SRC / name))
    html = html.replace("%%JSONLD%%", jsonld())
    (SITE / "index.html").write_text(html, "utf-8", newline="\n")
    print("  wrote site/index.html", len(html) // 1024, "KB")

    specs = SITE / "specs"
    specs.mkdir(exist_ok=True)
    for name, source in SPECS.items():
        if source.exists():
            if not (specs / name).exists() or (specs / name).stat().st_mtime < source.stat().st_mtime:
                shutil.copyfile(source, specs / name)
        else:
            print("  MISSING spec sheet:", source)
    print("  specs:", len(list(specs.glob("*.pdf"))), "PDFs")

    # safety: nothing dealer-only in site/
    bad = [p for p in SITE.rglob("*") if p.is_file() and any(w in p.name.lower() for w in ("priced", "bulletin", "order form", "branding", "marketing"))]
    if bad:
        raise SystemExit("Dealer-only file in site/: " + ", ".join(str(b) for b in bad))
    big = [p for p in SITE.rglob("*") if p.is_file() and p.stat().st_size > 25 * 1024 * 1024]
    if big:
        raise SystemExit("Over Cloudflare's 25 MB file limit: " + ", ".join(p.name for p in big))
    print("Done.")


if __name__ == "__main__":
    main()
