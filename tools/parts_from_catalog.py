"""
Pulls every part out of Timpte's Serviceable Parts Catalog (PDF) into src/parts.json.

    py -3 tools/parts_from_catalog.py "<path to the catalog PDF>"

Works on the text inside the PDF (no scans, no OCR). Each part gets: part number, description, the series it fits
(from the "14K, 16K" style tags in the description), the catalog section it sits in (Split Tilt, Dump, Hydraulics...),
and the price if the catalog has one. Prices are kept in the file but the site only shows them when config.json allows;
the catalog is a dealer document and its prices may not be customer prices.

Uses only what comes with Python.
"""
import json, re, sys, zlib
from pathlib import Path

pdf = Path(sys.argv[1])
out = Path(__file__).resolve().parent.parent / "src" / "parts.json"
raw = pdf.read_bytes()

# ---- text out of the PDF, one entry per content stream (roughly one per page) ----
def decode(bs):
    s = bs.decode("latin-1")
    s = s.replace("\\(", "(").replace("\\)", ")").replace("\\222", "'").replace("\\224", '"').replace("\\223", '"').replace("\\226", "-").replace("\\227", "-")
    s = re.sub(r"\\\d{3}", "", s)
    return s.replace("\\\\", "\\")

pages = []
for mm in re.finditer(rb"stream\r?\n(.*?)\r?\nendstream", raw, re.S):
    try:
        s = zlib.decompress(mm.group(1))
    except Exception:
        continue
    if b"Tj" not in s and b"TJ" not in s:
        continue
    parts = []
    for t in re.findall(rb"\((.*?)(?<!\\)\)\s*Tj", s, re.S):
        parts.append(decode(t))
    for arr in re.findall(rb"\[(.*?)\]\s*TJ", s, re.S):
        parts.append("".join(decode(x) for x in re.findall(rb"\((.*?)(?<!\\)\)", arr, re.S)))
    txt = " ".join(parts)
    txt = re.sub(r"en-(GB|US)", " ", txt)
    txt = re.sub(r"\s+", " ", txt)
    pages.append(txt)

# Sections by catalog page number (from the catalog's own table of contents, May 2026 edition).
# Each page's text ends with its page number right before the "CONTENTS CONTACT ..." footer.
TOC = [(5, 8, "Torsion Parts", "Motorsports"), (9, 10, "Ramped Parts", "Motorsports"), (11, 13, "Leaf Spring Parts", "Motorsports"),
       (14, 15, "Toolbox Area", "Motorsports"), (16, 16, "Trailer Decals", "Motorsports"), (17, 18, "Hydraulics", "Motorsports"),
       (20, 26, "Split Tilt Parts", "Powerhouse"), (27, 30, "Deck Over Parts", "Powerhouse"), (31, 35, "Gooseneck Parts", "Powerhouse"),
       (36, 39, "Dump Parts", "Powerhouse"), (40, 40, "Trailer Decals", "Powerhouse"), (41, 41, "Accessories", "Both")]
def page_number(txt):
    m = re.findall(r"(\d{1,2})\s+CONTENTS CONTACT", txt)
    return int(m[-1]) if m else None
def section_of(txt):
    n = page_number(txt)
    if n is None: return None, None, None
    for a, b, s, series in TOC:
        if a <= n <= b: return s, series, n
    return None, None, n

PARTNO = re.compile(r"\b(\d{3}-\d{6})\b")
PRICE = re.compile(r"(Call for Pric(?:e|ing)|\d{1,3}(?:,\d{3})*\.\d{2})(?=\s|$)")
FITS = re.compile(r"^((?:\d{1,2}K(?:HD)?)(?:,\s*(?:\d{1,2}K(?:HD)?))*)\s+")
STOP = re.compile(r"\s+(PART NO\.|DESCRIPTION|FITS TO|CONTENTS|CONTACT|POWERHOUSE|MOTORSPORTS|ACCESSORIES)\b.*$")
CAPS_TAIL = re.compile(r"(\s+[A-Z][A-Z0-9/&\-\"]{2,})+$")

parts, seen = [], set()
section, series, pageno = None, None, None
for i, txt in enumerate(pages, 1):
    sec, ser, n = section_of(txt)
    if sec: section, series, pageno = sec, ser, n
    hits = list(PARTNO.finditer(txt))
    for j, h in enumerate(hits):
        no = h.group(1)
        chunk = txt[h.end(): hits[j + 1].start() if j + 1 < len(hits) else len(txt)]
        price = None; call = False
        pm = PRICE.search(chunk)
        if pm:
            desc = chunk[:pm.start()]
            if pm.group(1).startswith("Call"): call = True
            else: price = float(pm.group(1).replace(",", ""))
        else:
            desc = chunk
        desc = STOP.sub("", desc)
        desc = CAPS_TAIL.sub("", desc).strip(" -:,")
        fits = None
        f = FITS.match(desc)
        if f:
            fits = [x.strip() for x in f.group(1).split(",")]
            desc = desc[f.end():].strip()
        if len(desc) < 3 or no in seen:
            continue
        seen.add(no)
        parts.append({"no": no, "name": desc, "fits": fits, "section": section or "Parts", "series": series or "", "page": pageno, "price": price, "callForPrice": call})

out.write_text(json.dumps({"_comment": "From Timpte's Serviceable Parts Catalog " + pdf.name + ". Prices show on the site only when config.json allows.", "catalog": pdf.name, "parts": parts}, indent=1) + "\n", "utf-8")
by_sec = {}
for p in parts: by_sec[p["section"]] = by_sec.get(p["section"], 0) + 1
print(f"{len(parts)} parts from {len(pages)} text pages ->", out.name)
for s, n in sorted(by_sec.items(), key=lambda x: -x[1]): print(f"  {n:4}  {s}")
print("priced:", sum(1 for p in parts if p["price"]), " call for price:", sum(1 for p in parts if p["callForPrice"]), " no price:", sum(1 for p in parts if not p["price"] and not p["callForPrice"]))
for p in parts[:6] + parts[60:64] + parts[-4:]: print("  ", p["no"], "|", (p["fits"] or ""), "|", p["name"][:70], "|", p["price"] if p["price"] else ("call" if p["callForPrice"] else "-"))
