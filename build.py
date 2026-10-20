#!/usr/bin/env python3
"""
Builds BOTH Timeless Trailers sites from the one set of files in src/.

    How to run:   py -3 build.py        (or double-click build.bat)

Two sites come out of one build:

  site/        the PUBLIC site for customers. No sign-in, no My Account, no dealer console,
               no sample people, no sample prices ("Call for price"). The back-end code is not
               hidden in this file; it is cut out, so it never reaches a visitor's browser.
  site-demo/   the DEMO site for Matt and for showing prospects. Everything the public site has,
               plus the back end: sign in as a customer or as Matt, My Account, the dealer console,
               sample prices, the demo tour, sample reviews and the "What the finished site adds" page.

How the cut works: in src/*.js, anything between a line "/* @demo */" and a line "/* @end-demo */"
is removed for the public site. The constant DEMO is filled in as false (public) or true (demo).

- site/index.html and site-demo/index.html are made from src/shell.html + src/styles.css + src/data.js + src/app1.js + src/app2.js
- site/img/ comes from tools/make_images.py (only rerun that if you change a photo)
- site/video/ was made once with ffmpeg (see tools/encode.ps1)
- site/specs/ gets a copy of the Timpte spec sheets listed below
- site-demo/ holds only its index.html in git. Its img/, video/ and specs/ are hard links to the ones in site/
  (made here for local preview) and are copied by Cloudflare's build command when the demo site deploys.

Uses only what comes with Python. Nothing to install for the build itself.
"""
import os
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
SITE = ROOT / "site"
DEMO_SITE = ROOT / "site-demo"
LIB = Path(r"C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content")
SHEETS = LIB / "Product Catalog & Spec Sheets"

# The "Design concept v3" strip across the top came off on Oct 20 (Josh: it cost an inch of the hero video).
# The demo site still links to "What the finished site adds" from its footer.

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

DEMO_BLOCK = re.compile(r"/\*\s*@demo\s*\*/.*?/\*\s*@end-demo\s*\*/", re.S)


def read(p):
    return p.read_text("utf-8")


def strip_demo(js, name):
    """Remove every /* @demo */ ... /* @end-demo */ block. Stops the build if the markers don't pair up."""
    opens, closes = js.count("@demo */"), js.count("@end-demo */")
    if opens != closes:
        raise SystemExit(f"{name}: {opens} '@demo' markers but {closes} '@end-demo' markers. Every block needs both.")
    out = DEMO_BLOCK.sub("", js)
    if re.search(r"/\*\s*@(end-)?demo\s*\*/", out):
        raise SystemExit(f"{name}: a demo marker is out of order (an @end-demo before its @demo?).")
    return out


def jsonld():
    """Structured data for search engines: the dealership, and one Product per Timpte model (specs pulled from src/data.js)."""
    import json
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


def build_page(folder, demo):
    """Write one index.html: the demo site keeps everything, the public site has the demo blocks cut out."""
    folder.mkdir(exist_ok=True)
    html = read(SRC / "shell.html")
    for key, name in [("CSS", "styles.css"), ("DATA", "data.js"), ("APP1", "app1.js"), ("APP2", "app2.js")]:
        code = read(SRC / name)
        if name.endswith(".js") and not demo:
            code = strip_demo(code, name)
        html = html.replace("%%" + key + "%%", code)
    html = html.replace("%%JSONLD%%", jsonld())
    html = html.replace("%%DEMO%%", "true" if demo else "false")
    if "%%" in html:
        raise SystemExit(f"{folder.name}: an unfilled %%placeholder%% is left in the page.")
    if not demo and re.search(r"Dealer console|signin-open|renderKpis|personas:|Reset demo", html):
        raise SystemExit("site/index.html still contains back-end text. Check the @demo markers.")
    (folder / "index.html").write_text(html, "utf-8", newline="\n")
    print(f"  wrote {folder.name}/index.html", len(html) // 1024, "KB")


def link_media():
    """Give site-demo/ the same img/, video/ and specs/ as site/ for local preview, without a second copy on disk.
    Hard links where Windows allows them, plain copies otherwise. These folders are not committed (see .gitignore)."""
    for sub in ("img", "video", "specs"):
        src, dst = SITE / sub, DEMO_SITE / sub
        if not src.exists():
            continue
        dst.mkdir(exist_ok=True)
        for f in src.iterdir():
            if not f.is_file():
                continue
            target = dst / f.name
            if target.exists() and target.stat().st_size == f.stat().st_size and target.stat().st_mtime >= f.stat().st_mtime:
                continue
            if target.exists():
                target.unlink()
            try:
                os.link(f, target)
            except OSError:
                shutil.copyfile(f, target)
        for stale in dst.iterdir():
            if stale.is_file() and not (src / stale.name).exists():
                stale.unlink()


def safety_checks(folder):
    bad = [p for p in folder.rglob("*") if p.is_file() and any(w in p.name.lower() for w in ("priced", "bulletin", "order form", "branding", "marketing"))]
    if bad:
        raise SystemExit("Dealer-only file in " + folder.name + "/: " + ", ".join(str(b) for b in bad))
    big = [p for p in folder.rglob("*") if p.is_file() and p.stat().st_size > 25 * 1024 * 1024]
    if big:
        raise SystemExit("Over Cloudflare's 25 MB file limit: " + ", ".join(p.name for p in big))


def main():
    build_page(SITE, demo=False)
    build_page(DEMO_SITE, demo=True)

    specs = SITE / "specs"
    specs.mkdir(exist_ok=True)
    for name, source in SPECS.items():
        if source.exists():
            if not (specs / name).exists() or (specs / name).stat().st_mtime < source.stat().st_mtime:
                shutil.copyfile(source, specs / name)
        else:
            print("  MISSING spec sheet:", source)
    print("  specs:", len(list(specs.glob("*.pdf"))), "PDFs")

    link_media()
    safety_checks(SITE)
    safety_checks(DEMO_SITE)
    print("Done. Public site in site/, demo site in site-demo/.")


if __name__ == "__main__":
    main()
