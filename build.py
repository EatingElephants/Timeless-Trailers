#!/usr/bin/env python3
"""
Builds BOTH Timeless Trailers sites from the one set of files in src/.

    How to run:   py -3 build.py        (or double-click build.bat)

Two sites come out of one build:

  site/        the PUBLIC site for customers. No sign-in, no My Account, no dealer console, no sample people.
               The back-end code is cut out, not hidden.
  site-demo/   the DEMO site for Matt and for showing prospects: everything the public site has plus the back end.

Every page has its own folder and index.html (site/trailers/1420-split-tilt/index.html), with its own title,
description, canonical address and structured data, and the page's main content written in so search engines
can read it before the script runs. The script (site/app.js) then takes over and runs the site as before.

Where things come from:
  src/config.json      this dealer: name, phone, address, hours, Andy's addresses, switches
  src/models.json      the Timpte models (specs from the spec sheets)
  src/inventory.json   the units on the lot
  src/parts.json       the parts catalog
  src/data.js          everything else the site shows (categories, lineup, videos, maintenance...)
  src/app1.js + app2.js   the pages and behaviour; code between /* @demo */ and /* @end-demo */ is demo-only
  src/styles.css, src/shell.html

site/img/ comes from tools/make_images.py and tools/make_andy.py, site/video/ from tools/encode.ps1 and
tools/hero_montage.ps1, site/specs/ is copied from the Timpte library below. site-demo/ keeps only its pages in git;
its img/, video/ and specs/ are hard links to site/'s copies (and Cloudflare copies them at deploy time).

Uses only what comes with Python.
"""
import hashlib
import html
import json
import os
import re
import shutil
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
SITE = ROOT / "site"
DEMO_SITE = ROOT / "site-demo"
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
    "timpte-16khd-gooseneck.pdf": SHEETS / "Powerhouse Spec Sheets" / "Timpte_ET_16KHD_Gooseneck_SpecSheet.pdf",
    "timpte-14k-deck-over.pdf": SHEETS / "Powerhouse Spec Sheets" / "Timpte_ET_14K_DeckOver_SpecSheet.pdf",
    "timpte-16k-deck-over.pdf": SHEETS / "Powerhouse Spec Sheets" / "Timpte_ET_16K_DeckOver_SpecSheet.pdf",
}

CAT_SLUG = {"tilt": "split-tilt", "deckover": "deck-over", "gooseneck": "gooseneck", "dump": "dump", "ezload": "ez-load"}
CAT_TITLE = {"tilt": "Split Tilt", "deckover": "Deck Over", "gooseneck": "Gooseneck", "dump": "Dump", "ezload": "EZ Load"}
CAT_BLURB = {
    "tilt": "Tilt decks for skid steers and mini excavators. No ramps to lift.",
    "deckover": "A full 98-inch deck above the wheels for wide machines and vehicles.",
    "gooseneck": "Steadier on long runs with bigger machines.",
    "dump": "Aluminum dump boxes with no structural welds. Nothing to rust out.",
    "ezload": "Powered decks that drop low for cars, UTVs, mowers and golf carts.",
}
DEMO_BLOCK = re.compile(r"/\*\s*@demo\s*\*/.*?/\*\s*@end-demo\s*\*/", re.S)


def read(p):
    return p.read_text("utf-8")


def load_json(name):
    return json.loads(read(SRC / name))


def esc(s):
    return html.escape(str(s if s is not None else ""), quote=True)


def num(n):
    return f"{int(n):,}"


def money(n):
    return "$" + f"{int(round(n)):,}"


def strip_demo(js, name):
    opens, closes = js.count("@demo */"), js.count("@end-demo */")
    if opens != closes:
        raise SystemExit(f"{name}: {opens} '@demo' markers but {closes} '@end-demo' markers. Every block needs both.")
    out = DEMO_BLOCK.sub("", js)
    if re.search(r"/\*\s*@(end-)?demo\s*\*/", out):
        raise SystemExit(f"{name}: a demo marker is out of order (an @end-demo before its @demo?).")
    return out


# ---------------------------------------------------------------------------- data
CONFIG = load_json("config.json")
MODELS = load_json("models.json")
INVENTORY = load_json("inventory.json")["units"]
ACCESSORIES = load_json("accessories.json")
SITE_URL = CONFIG["site"]["url"].rstrip("/")
BIZ = CONFIG["business"]
SHOW_PRICES = bool(CONFIG.get("showPrices"))


def units_of(key):
    return [u for u in INVENTORY if u["key"] == key and u.get("status") != "sold"]


def unit_full(u):
    t = dict(MODELS[u["key"]]); t.update(u); return t


# ---------------------------------------------------------------------------- structured data
def ld_org():
    return {
        "@type": "AutoDealer", "@id": SITE_URL + "/#dealer", "name": BIZ["name"], "url": SITE_URL + "/",
        "slogan": CONFIG["site"]["tagline"], "description": CONFIG["wording"]["exclusive"] + " Aluminum split tilt, deck over, gooseneck, dump and EZ Load trailers in Waxhaw, NC.",
        "telephone": "+1-" + BIZ["phone"], "image": SITE_URL + CONFIG["site"]["ogImage"],
        "address": {"@type": "PostalAddress", "streetAddress": BIZ["street"], "addressLocality": BIZ["city"], "addressRegion": BIZ["state"], "postalCode": BIZ["zip"], "addressCountry": "US"},
        "openingHoursSpecification": [{"@type": "OpeningHoursSpecification", "dayOfWeek": BIZ["openingHours"]["days"], "opens": BIZ["openingHours"]["opens"], "closes": BIZ["openingHours"]["closes"]}],
        "brand": {"@type": "Brand", "name": "Timpte Equipment Trailers"}, "areaServed": BIZ["areaServed"],
    }


def ld_product(m, u=None):
    p = {
        "@type": "Product", "name": (f"{u['year']} " if u else "") + m["model"] + (f" · Stock {u['id']}" if u else ""),
        "brand": {"@type": "Brand", "name": "Timpte"}, "image": SITE_URL + "/img/" + m["img"] + ".webp", "description": m["blurb"],
        "category": "Aluminum " + {"tilt": "split tilt equipment trailer", "deckover": "deck over trailer", "gooseneck": "gooseneck trailer", "dump": "dump trailer", "ezload": "EZ Load car and UTV hauler"}[m["type"]],
        "additionalProperty": [
            {"@type": "PropertyValue", "name": "Payload capacity", "value": m["payload"], "unitText": "lb"},
            {"@type": "PropertyValue", "name": "GVWR", "value": m["gvwr"], "unitText": "lb"},
            {"@type": "PropertyValue", "name": "Empty weight", "value": m["empty"], "unitText": "lb"},
            {"@type": "PropertyValue", "name": "Deck", "value": m["deck"]},
        ],
    }
    if u and u.get("id"):
        p["sku"] = u["id"]
    price = (u or {}).get("price") or m.get("listPrice")
    if SHOW_PRICES and price:
        p["offers"] = {"@type": "Offer", "price": price, "priceCurrency": "USD", "url": SITE_URL + (f"/stock/{u['id']}/" if u else f"/trailers/{m['slug']}/"),
                       "availability": "https://schema.org/InStock" if (u or {}).get("status", "lot") == "lot" else "https://schema.org/PreOrder",
                       "seller": {"@id": SITE_URL + "/#dealer"}}
    return p


def ld_crumbs(crumbs):
    return {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": SITE_URL + p} for i, (n, p) in enumerate(crumbs)]}


def jsonld(graph):
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, indent=1)


# ---------------------------------------------------------------------------- pre-rendered page bodies
def head(crumbs, eyebrow, h1, lede):
    trail = " / ".join(f'<a href="{p}">{esc(n)}</a>' for n, p in crumbs[:-1]) + (" / " + esc(crumbs[-1][0]) if len(crumbs) > 1 else "")
    return f'<div class="page-head"><div class="wrap"><div class="crumbs">{trail}</div><div class="eyebrow">{esc(eyebrow)}</div><h1 style="margin-top:10px">{esc(h1)}</h1><p class="lede">{lede}</p></div></div>'


def card(u):
    t = unit_full(u)
    price = money(t["price"]) if SHOW_PRICES and t.get("price") else "Call for price"
    return (f'<article class="tcard"><a class="tc-photo" href="/stock/{t["id"]}/"><img src="/img/{t["img"]}.webp" alt="{esc(t["model"])}" loading="lazy"></a>'
            f'<div class="tc-body"><em>{CAT_TITLE[t["type"]]}</em><h3><a href="/stock/{t["id"]}/">{t["year"]} {esc(t["model"])}</a></h3>'
            f'<ul class="specs3"><li><b>{num(t["payload"])} lb</b><span>Payload</span></li><li><b>{t["deckFt"]} ft</b><span>Deck</span></li><li><b>{num(t["gvwr"])} lb</b><span>GVWR</span></li></ul>'
            f'<div class="tc-foot"><div class="price">{price}</div><a class="btn btn-line sm" href="/stock/{t["id"]}/">Details</a></div></div></article>')


def model_tile(m):
    return (f'<a class="model" href="/trailers/{m["slug"]}/"><div class="ph"><img src="/img/{m["img"]}.webp" alt="{esc(m["model"])}" loading="lazy"></div>'
            f'<div class="mb"><em>{num(m["payload"])} lb payload</em><b>{esc(m["model"])}</b><span>{esc(" · ".join(m["feat"]))}</span></div></a>')


def spec_table(t):
    rows = [("Payload", num(t["payload"]) + " lb"), ("GVWR", num(t["gvwr"]) + " lb"), ("Empty weight", num(t["empty"]) + " lb"), ("Deck", t["deck"]), ("Deck width", t["width"]),
            ("Loading", t["loading"] + (f" · {t.get('angleText') or str(t['angle']) + '°'} loading angle" if t.get("angle") else "")), ("Overall length", t.get("length") or ""),
            ("Axles", t["axles"]), ("Hitch", t["hitch"]), ("Brakes", t["brakes"]), ("Tires", t["tires"]), ("Construction", "Aluminum, no structural welds")]
    return '<table class="spec-table"><tbody>' + "".join(f'<tr><th scope="row">{esc(k)}</th><td>{esc(v)}</td></tr>' for k, v in rows if v) + "</tbody></table>"


def body_home():
    lot = [u for u in INVENTORY if u.get("status") == "lot"]
    cats = "".join(f'<a class="cat" href="/trailers/{CAT_SLUG[k]}/"><div class="ph"><img src="/img/tile-{k}.webp" alt="" loading="lazy"></div><div class="cb"><b>{CAT_TITLE[k]}</b><p>{esc(CAT_BLURB[k])}</p></div></a>' for k in CAT_SLUG)
    return (f'<section class="hero hero-full" style="min-height:0"><div class="wrap hero-inner"><div class="eyebrow">{esc(CONFIG["wording"]["exclusiveShort"])}</div>'
            f'<h1 style="margin-top:16px">Built once. <span>Lasts forever.</span></h1><p class="lede">All-aluminum Timpte trailers for contractors, haulers and weekend toys, from the only Customer Service Center (CSC) in the U.S. that sells Timpte exclusively. Tell us what you haul and we\'ll match the trailer.</p>'
            f'<div class="hero-ctas"><a class="btn btn-dark" href="/trailers/">See what\'s on the lot</a><a class="btn btn-line" href="/finder/">Find my trailer</a></div></div></section>'
            f'<section id="shop"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">Shop by category</div><h2 style="margin-top:10px">Start with what you haul.</h2></div></div><div class="cat-grid">{cats}</div></div></section>'
            f'<section class="lot"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">On the lot now</div><h2 style="margin-top:10px">{len(lot)} trailers ready to hitch up in {esc(BIZ["city"])}.</h2></div></div><div class="tgrid">{"".join(card(u) for u in lot[:6])}</div></div></section>'
            f'<section><div class="wrap"><div class="eyebrow">The Timpte lineup</div><h2 style="margin-top:10px">Every model, available to order.</h2><div class="line-grid">{"".join(model_tile(m) for m in MODELS.values())}</div></div></section>')


def body_inventory(cat=None):
    units = [u for u in INVENTORY if u.get("status") != "sold" and (cat is None or MODELS[u["key"]]["type"] == cat)]
    models = [m for m in MODELS.values() if cat is None or m["type"] == cat]
    title = f"{CAT_TITLE[cat]} trailers" if cat else "Inventory"
    crumbs = [("Home", "/"), ("Trailers", "/trailers/")] + ([(CAT_TITLE[cat], f"/trailers/{CAT_SLUG[cat]}/")] if cat else [])
    lede = esc(CAT_BLURB[cat]) + " " if cat else ""
    lede += f"{len([u for u in units if u.get('status') == 'lot'])} units ready to hitch up in {esc(BIZ['city'])} today, plus what's on the truck from Timpte."
    return (head(crumbs, "On the lot and arriving", title + ".", lede) +
            f'<section style="padding-top:34px"><div class="wrap"><div class="tgrid">{"".join(card(u) for u in units)}</div></div></section>'
            f'<section><div class="wrap"><div class="sec-head"><div><div class="eyebrow">The Timpte lineup</div><h2 style="margin-top:10px">Available to order.</h2></div></div><div class="line-grid">{"".join(model_tile(m) for m in models)}</div></div></section>')


def body_model(m):
    units = units_of(m["key"])
    price = money(m["listPrice"]) if SHOW_PRICES and m.get("listPrice") else "Call for price"
    label = "List price" if price != "Call for price" else "Price"
    short = esc(m["model"].replace("Timpte ", ""))
    gallery = "".join(f'<li><img src="/img/{g}.webp" alt="{esc(m["model"])}, photo {i + 1}" loading="lazy"></li>' for i, g in enumerate(m.get("gallery") or []))
    gallery_html = f'<ul class="gallery">{gallery}</ul>' if gallery else ""
    first_img = (m.get("gallery") or [m["img"]])[0]
    features = "".join("<li>" + esc(x) + "</li>" for x in m["features"])
    sheet = f'<a class="btn btn-line sm" href="/specs/{m["spec"]}" target="_blank" rel="noopener">Download the spec sheet (PDF)</a>' if m.get("spec") else ""
    units_html = "".join(f'<p><a href="/stock/{u["id"]}/">{u["year"]} {esc(m["model"])} · Stock {u["id"]}</a></p>' for u in units) or "<p>None on the lot right now. We order any configuration straight from Timpte.</p>"
    note = "Specs from Timpte's 2026 spec sheet. Empty weights are estimates; options change them."
    return (f'<section style="padding-top:28px"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / <a href="/trailers/">Trailers</a> / <a href="/trailers/{CAT_SLUG[m["type"]]}/">{CAT_TITLE[m["type"]]}</a> / {short}</div>'
            f'<div class="detail-grid"><div><div class="dphoto"><img src="/img/{first_img}.webp" alt="{esc(m["model"])}"></div>{gallery_html}'
            f'<div class="block"><h3>About the {short}</h3><p>{esc(m["blurb"])}</p></div>'
            f'<div class="block"><h3>Features</h3><ul class="flist">{features}</ul></div>'
            f'<div class="block"><h3>Full specs</h3>{spec_table(m)}<p class="note">{note}</p>{sheet}</div></div>'
            f'<aside class="dside"><div class="eyebrow">Timpte {CAT_TITLE[m["type"]]}</div><h1 style="margin-top:8px">{esc(m["model"])}</h1>'
            f'<div class="dprice"><div><small class="muted">{label}</small><div class="price">{price}</div></div><div class="pay">{esc(CONFIG["wording"]["andy"])}</div></div>'
            f'<h3>{len(units)} on the lot or on the way</h3>{units_html}'
            f'<p><a class="btn btn-gold" href="/contact/?m={esc(m["model"])}">Get a quote</a></p></aside></div></div></section>')


def body_stock(u):
    t = unit_full(u)
    price = money(t["price"]) if SHOW_PRICES and t.get("price") else "Call for price"
    status = {"lot": "On the lot", "order": "Arriving " + (t.get("eta") or "soon"), "hold": "On hold", "sold": "Sold"}.get(t.get("status"), "")
    short = esc(t["model"].replace("Timpte ", ""))
    return (f'<section style="padding-top:28px"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / <a href="/trailers/">Trailers</a> / <a href="/trailers/{t["slug"]}/">{short}</a> / Stock {t["id"]}</div>'
            f'<div class="detail-grid"><div><div class="dphoto"><img src="/img/{t["img"]}.webp" alt="{esc(t["model"])}"></div><div class="block"><h3>About this unit</h3><p>{esc(t["blurb"])}</p></div>'
            f'<div class="block"><h3>Full specs</h3>{spec_table(t)}</div></div>'
            f'<aside class="dside"><div class="eyebrow">{CAT_TITLE[t["type"]]} · {esc(status)}</div><h1 style="margin-top:8px">{t["year"]} {esc(t["model"])}</h1><p>Stock {t["id"]}</p>'
            f'<div class="dprice"><div><small class="muted">Price</small><div class="price">{price}</div></div></div><p><a class="btn btn-gold" href="/contact/?m={esc(t["model"])}">Get a quote</a> <a class="btn btn-line" href="/trailers/{t["slug"]}/">All about the {short}</a></p></aside></div></div></section>')


def body_simple(crumbs, eyebrow, h1, lede, extra=""):
    return head(crumbs, eyebrow, h1, lede) + (f'<section style="padding-top:34px"><div class="wrap">{extra}</div></section>' if extra else "")


def body_accessories():
    cards = ""
    for a in ACCESSORIES["items"]:
        price = money(a["msrp"]) if SHOW_PRICES else "Call for price"
        pic = f'<img src="/img/{a["image"]}.webp" alt="{esc(a["name"])}" loading="lazy">' if a.get("image") else ""
        small = f'Part {esc(a["no"])}' + (" · fits " + esc(" / ".join(a["fits"])) if a.get("fits") else "") + (" · " + esc(a["detail"]) if a.get("detail") else "")
        cards += f'<div class="acc"><div class="acc-pic">{pic}</div><div class="acc-body"><em>{esc(a["group"])}</em><b>{esc(a["name"])}</b><small>{small}</small><div class="pp"><strong>{price}</strong></div></div></div>'
    return body_simple([("Home", "/"), ("Accessories", "/accessories/")], "Own · Accessories", "Accessories.",
                       "Timpte's own accessories for your trailer, at Timpte's list prices, ordered through us and picked up in Waxhaw.", f'<div class="acc-list">{cards}</div>')


def body_resources():
    sheets = "".join(f'<li><a href="/specs/{m["spec"]}">{esc(m["model"])} spec sheet (PDF)</a></li>' for m in MODELS.values() if m.get("spec"))
    return body_simple([("Home", "/"), ("Owner resources", "/owner-resources/")], "Own · Keep it rolling", "Owner resources.",
                       "The maintenance schedule, every Timpte spec sheet, and where to turn for accessories, maintenance help and warranty.",
                       f'<div class="panel"><h3>Spec sheets</h3><ul class="docs">{sheets}</ul></div>')


def body_privacy():
    return body_simple([("Home", "/"), ("Privacy", "/privacy/")], "Plain words", "Privacy.", "What this site collects, who sees it, and what we do with it.",
                       f'<div class="panel" style="max-width:760px"><h3>What we collect</h3><p>When you ask for a quote, hold a unit, request an accessory or ask about financing, we collect what you type into the form: your name, phone number, and what you told us about your trailer, load or truck.</p>'
                       f'<h3>Who sees it</h3><p>Your request goes to {esc(BIZ["name"])} in {esc(BIZ["city"])}, {esc(BIZ["state"])}, and to nobody else. We do not sell or share it.</p>'
                       f'<h3>Cookies and tracking</h3><p>This site remembers a few things in your own browser, like trailers you saved or compared. We count visits with a privacy-respecting analytics service that does not use cookies.</p>'
                       f'<h3>Questions</h3><p>Call {esc(BIZ["phone"])} or visit us at {esc(BIZ["address"])}.</p></div>')


# ---------------------------------------------------------------------------- routes
def routes(demo):
    """Every page the site has: (path, title, description, body html, json-ld graph, in sitemap?)."""
    name = BIZ["name"]; excl = CONFIG["wording"]["exclusive"]; city = f"{BIZ['city']}, {BIZ['state']}"
    R = []
    R.append(("/", CONFIG["site"]["title"], CONFIG["site"]["description"], body_home(), [ld_org()] + [ld_product(m) for m in MODELS.values()], True))
    lot_n = len([u for u in INVENTORY if u.get("status") == "lot"])
    R.append(("/trailers/", f"Timpte trailers on the lot and to order · {name} · {city}", f"{lot_n} Timpte trailers ready today in {city}, plus every model available to order. Split tilt, deck over, gooseneck, dump and EZ Load.",
              body_inventory(), [ld_crumbs([("Home", "/"), ("Trailers", "/trailers/")])], True))
    for k, slug in CAT_SLUG.items():
        n = len([u for u in INVENTORY if u.get("status") == "lot" and MODELS[u["key"]]["type"] == k])
        R.append((f"/trailers/{slug}/", f"Timpte {CAT_TITLE[k]} trailers · {name} · {city}", f"{CAT_BLURB[k]} {n} on the lot in {city}. Specs, photos and spec sheets for every Timpte {CAT_TITLE[k]} model.",
                  body_inventory(k), [ld_crumbs([("Home", "/"), ("Trailers", "/trailers/"), (CAT_TITLE[k], f"/trailers/{slug}/")])], True))
    for m in MODELS.values():
        R.append((f"/trailers/{m['slug']}/", f"{m['model']} · specs, price and availability · {name}", f"{m['blurb']} {num(m['payload'])} lb payload, {num(m['gvwr'])} lb GVWR. Spec sheet, photos and what's on the lot in {city}.",
                  body_model(m), [ld_product(m), ld_crumbs([("Home", "/"), ("Trailers", "/trailers/"), (CAT_TITLE[m["type"]], f"/trailers/{CAT_SLUG[m['type']]}/"), (m["model"], f"/trailers/{m['slug']}/")])], True))
    for u in INVENTORY:
        if u.get("status") == "sold":
            continue
        m = MODELS[u["key"]]
        R.append((f"/stock/{u['id']}/", f"{u['year']} {m['model']} · Stock {u['id']} · {name}", f"{m['blurb']} Stock {u['id']} at {name}, {city}.",
                  body_stock(u), [ld_product(m, u), ld_crumbs([("Home", "/"), ("Trailers", "/trailers/"), (m["model"], f"/trailers/{m['slug']}/"), (f"Stock {u['id']}", f"/stock/{u['id']}/")])], True))
    simple = [
        ("/finder/", "Trailer Finder", "Start with the load", "Trailer Finder.", "Pick what you haul and we'll point you at the Timpte family built for it.", f"Pick what you haul and find the Timpte trailer built for it. Split tilt, deck over, gooseneck, dump or EZ Load, from {name} in {city}."),
        ("/compare/", "Compare trailers", "Side by side", "Compare models.", "Up to three trailers, side by side.", f"Compare Timpte trailers side by side: payload, GVWR, deck, loading angle, axles and tires. {name}, {city}."),
        ("/financing/", "Financing", "Own · Financing", "Financing.", "Payment options offered through preferred vendors.", f"Trailer financing and a payment calculator from {name}, {city}."),
        ("/about/", "About", "Company", "A Customer Service Center that picks up the phone.", excl, f"{excl} Based in {city}. {name}."),
        ("/contact/", "Contact and visit", "Visit · Call · Quote", "Come see the lot.", f"{esc(BIZ['address'])} · {esc(BIZ['phone'])} · {esc(BIZ['hours'])}", f"Visit {name} at {BIZ['address']}, call {BIZ['phone']}, or ask for a quote. {BIZ['hours']}."),
    ]
    for path, title, eyebrow, h1, lede, desc in simple:
        R.append((path, f"{title} · {name}", desc, body_simple([("Home", "/"), (title, path)], eyebrow, h1, lede), [ld_crumbs([("Home", "/"), (title, path)])], True))
    R.append(("/accessories/", f"Timpte trailer accessories · {name}", f"Timpte accessories at list price: spare tires and holders, rock guards, winch kits, tie-downs, toolboxes and dump box add-ons. Ordered through {name}, picked up in {city}.", body_accessories(), [ld_crumbs([("Home", "/"), ("Accessories", "/accessories/")])], True))
    R.append(("/owner-resources/", f"Owner resources · {name}", f"Maintenance schedule, every Timpte spec sheet, accessories, maintenance and warranty help from {name}.", body_resources(), [ld_crumbs([("Home", "/"), ("Owner resources", "/owner-resources/")])], True))
    R.append(("/privacy/", f"Privacy · {name}", f"What the {name} website collects, who sees it, and what we do with it.", body_privacy(), [ld_crumbs([("Home", "/"), ("Privacy", "/privacy/")])], True))
    R.append(("/404.html", f"Page not found · {name}", "That page isn't here.", '<section><div class="wrap"><div class="empty" style="max-width:640px;margin:40px auto"><b>That page isn\'t here.</b> <a href="/trailers/">See what\'s on the lot</a>, or <a href="/">start at the front door</a>.</div></div></section>', [], False))
    if demo:
        for path, title in (("/account/", "My Account"), ("/admin/", "Dealer console"), ("/vision/", "What the finished site adds")):
            R.append((path, f"{title} · {name}", title, f'<section><div class="wrap"><h1>{esc(title)}</h1></div></section>', [], False))
    return R


# ---------------------------------------------------------------------------- build
def build_site(folder, demo):
    folder.mkdir(exist_ok=True)
    # app.js: the data files, then the three script files (demo blocks cut out of the public site)
    data_js = "".join(f"const {k} = {json.dumps(v, ensure_ascii=False)};\n" for k, v in (("CONFIG", CONFIG), ("MODELS", MODELS), ("INVENTORY", {"units": INVENTORY}), ("ACCESSORIES", ACCESSORIES)))
    code = ""
    for name in ("data.js", "app1.js", "app2.js"):
        c = read(SRC / name)
        if not demo:
            c = strip_demo(c, name)
        code += c + "\n"
    code = code.replace("%%DEMO%%", "true" if demo else "false")
    app_js = '"use strict";\n' + data_js + code.replace('"use strict";\n', "", 1)
    css = read(SRC / "styles.css")
    if not demo and re.search(r"Dealer console|signin-open|renderKpis|personas:|Reset demo", app_js):
        raise SystemExit("site/app.js still contains back-end text. Check the @demo markers.")
    version = hashlib.md5((app_js + css).encode("utf-8")).hexdigest()[:10]
    (folder / "app.js").write_text(app_js, "utf-8", newline="\n")
    (folder / "site.css").write_text(css, "utf-8", newline="\n")

    shell = read(SRC / "shell.html")
    indexable = CONFIG["site"].get("indexable") and not demo
    robots_tag = "" if indexable else '<meta name="robots" content="noindex, nofollow">\n'
    token = CONFIG.get("analytics", {}).get("cloudflareToken")
    analytics = f'<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon=\'{{"token": "{token}"}}\'></script>' if token and not demo else ""
    written, urls = 0, []
    # clear old page folders so a sold unit's page goes away
    for sub in ("trailers", "stock", "finder", "compare", "parts", "service", "accessories", "owner-resources", "financing", "about", "contact", "privacy", "account", "admin", "vision"):
        if (folder / sub).exists():
            shutil.rmtree(folder / sub)
    for path, title, desc, body, graph, in_map in routes(demo):
        canon = SITE_URL + path
        page = (shell.replace("%%ROBOTS%%", robots_tag).replace("%%TITLE%%", esc(title)).replace("%%DESC%%", esc(desc)).replace("%%CANON%%", canon)
                .replace("%%OGTITLE%%", esc(title)).replace("%%OGIMAGE%%", SITE_URL + CONFIG["site"]["ogImage"]).replace("%%JSONLD%%", jsonld(graph) if graph else "{}")
                .replace("%%VERSION%%", version).replace("%%APP%%", body).replace("%%ANALYTICS%%", analytics))
        if "%%" in page:
            raise SystemExit(f"{path}: an unfilled %%placeholder%% is left in the page.")
        target = folder / "404.html" if path == "/404.html" else folder / path.strip("/") / "index.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(page, "utf-8", newline="\n")
        written += 1
        if in_map and not demo:
            urls.append(canon)
    today = date.today().isoformat()
    (folder / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(f"  <url><loc>{u}</loc><lastmod>{today}</lastmod></url>\n" for u in urls) + "</urlset>\n", "utf-8", newline="\n")
    (folder / "robots.txt").write_text(("User-agent: *\nAllow: /\n\nSitemap: " + SITE_URL + "/sitemap.xml\n") if indexable else "User-agent: *\nDisallow: /\n", "utf-8", newline="\n")
    # the Parts and Service pages became Accessories and Owner resources (Oct 24); Cloudflare reads _redirects before serving files
    (folder / "_redirects").write_text("/parts/* /accessories/ 301\n/service/* /owner-resources/ 301\n", "utf-8", newline="\n")
    print(f"  {folder.name}: {written} pages, app.js {len(app_js) // 1024} KB, site.css {len(css) // 1024} KB, {'indexable' if indexable else 'hidden from search engines'}")


def link_media():
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
    # the old single-page builds are gone
    for folder in (SITE, DEMO_SITE):
        folder.mkdir(exist_ok=True)
    build_site(SITE, demo=False)
    build_site(DEMO_SITE, demo=True)

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
