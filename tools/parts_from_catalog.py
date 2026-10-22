"""
Pulls every part out of Timpte's Serviceable Parts Catalog (PDF) into src/parts.json.

    py -3 tools/parts_from_catalog.py "<path to the catalog PDF>"

Works on the text inside the PDF (no scans, no OCR). Each part gets: part number, description, the series it fits
(from the "14K, 16K" style tags in the description), the catalog section it sits in (Split Tilt, Dump, Hydraulics...),
which Timpte line (Motorsports or Powerhouse) and the price if the catalog has one. Prices are kept in the file but the
site only shows them when config.json allows; the catalog is a dealer document and its prices may not be customer prices.

Uses only what comes with Python.
"""
import json, re, sys, zlib
from pathlib import Path

pdf = Path(sys.argv[1])
out = Path(__file__).resolve().parent.parent / "src" / "parts.json"
raw = pdf.read_bytes()

# ---- the PDF's objects, and its pages in reading order (the page tree, not the order the bytes happen to be in) ----
objs = {int(m.group(1)): m.group(2) for m in re.finditer(rb"(?<![\d])(\d+) 0 obj(.*?)endobj", raw, re.S)}

def refs(body, key):
    m = re.search(rb"/" + key + rb"\s*(\[[^\]]*\]|\d+ 0 R)", body)
    return [int(x) for x in re.findall(rb"(\d+) 0 R", m.group(1))] if m else []

order = []
def walk(n, depth=0):
    b = objs.get(n, b"")
    if depth > 20: return
    if re.search(rb"/Type\s*/Pages\b", b):
        for k in refs(b, b"Kids"): walk(k, depth + 1)
    elif re.search(rb"/Type\s*/Page\b", b):
        order.append(n)
for n, b in objs.items():
    if re.search(rb"/Type\s*/Pages\b", b) and not re.search(rb"/Parent\b", b):
        walk(n)

def decode(bs):
    s = bs.decode("latin-1")
    s = s.replace("\\(", "(").replace("\\)", ")").replace("\\222", "'").replace("\\224", '"').replace("\\223", '"').replace("\\226", "-").replace("\\227", "-")
    s = re.sub(r"\\\d{3}", "", s)
    return s.replace("\\\\", "\\")

STR = rb"\(((?:[^()\\]|\\.)*)\)"
def text_of(stream):
    # drop the marked-content dictionaries (they carry "( )" strings that would swallow real text), then read the
    # text operators in order: one TJ array or Tj string = one run, runs joined with a space
    s = re.sub(rb"<<.*?>>\s*BDC", b"", stream, flags=re.S)
    parts = []
    for m in re.finditer(rb"\[((?:[^\[\]\\]|\\.)*)\]\s*TJ|" + STR + rb"\s*Tj", s, re.S):
        if m.group(1) is not None:
            parts.append("".join(decode(x) for x in re.findall(STR, m.group(1), re.S)))
        else:
            parts.append(decode(m.group(2)))
    txt = " ".join(parts)
    txt = re.sub(r"en-(GB|US)", " ", txt)
    return re.sub(r"\s+", " ", txt)

pages = []
for n in order:
    txt = ""
    for c in refs(objs[n], b"Contents"):
        m = re.search(rb"stream\r?\n(.*?)\r?\nendstream", objs.get(c, b""), re.S)
        if not m: continue
        try: txt += " " + text_of(zlib.decompress(m.group(1)))
        except Exception: continue
    pages.append(txt)
if not pages:
    raise SystemExit("Could not read the catalog's pages.")

# ---- sections by catalog page number (the catalog's own table of contents, May 2026 edition) ----
TOC = [(5, 8, "Torsion Parts", "Motorsports"), (9, 10, "Ramped Parts", "Motorsports"), (11, 13, "Leaf Spring Parts", "Motorsports"),
       (14, 15, "Toolbox Area", "Motorsports"), (16, 16, "Trailer Decals", "Motorsports"), (17, 18, "Hydraulics", "Motorsports"),
       (20, 26, "Split Tilt Parts", "Powerhouse"), (27, 30, "Deck Over Parts", "Powerhouse"), (31, 35, "Gooseneck Parts", "Powerhouse"),
       (36, 39, "Dump Parts", "Powerhouse"), (40, 40, "Trailer Decals", "Powerhouse"), (41, 41, "Accessories", "Both")]
def section_of(pageno):
    for a, b, s, series in TOC:
        if a <= pageno <= b: return s, series
    return None, None

# part numbers: 577-302485, 030-54116, or plain six digits (183591) on the gooseneck and dump pages
PARTNO = re.compile(r"\b(\d{3}-\d{5,6}|\d{6})\b")
PRICE = re.compile(r"(Call for Pric(?:e|ing)|\d{1,3}(?:,\d{3})*\.\d{2})(?=\s|$)")
# "fits to": 14K, 16K · 5K, 10K · 1620, 1626, 1620HD, 1626HD · 14K Dump, 16K Dump · 1414 Dump, 1614 Dump
FIT1 = r"(?:\d{1,2}K(?:HD)?(?: Dump)?|\d{4}(?:HD)?(?: Dump)?)"
FITS = re.compile(r"^(" + FIT1 + r"(?:,\s*" + FIT1 + r")*)\s+")
STOP = re.compile(r"\s+(PART NO\.|DESCRIPTION|FITS TO|CONTENTS|CONTACT|POWERHOUSE|MOTORSPORTS|ACCESSORIES)\b.*$")
CAPS_TAIL = re.compile(r"(\s+[A-Z][A-Z0-9/&\-\"]{2,})+$")

parts, seen = [], set()
for i, txt in enumerate(pages, 1):
    section, series = section_of(i)
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
        desc = re.sub(r"\s+All pricing for options.*$", "", desc)                      # the catalog's footnote
        desc = re.sub(r"\s+-\s+(?=(?:\d{1,2}K\s+)?[A-Z][A-Z0-9/&\-\"(]{2,}(?:\s|$)).*$", "", desc)  # " - CAPTION" after an unpriced row
        stripped = CAPS_TAIL.sub("", desc).strip(" -:,")
        if len(stripped) < 3:  # a part whose whole name is in capitals (PAWL): keep the first caps word instead
            m2 = re.match(r"^(.*?)\s+-\s*", desc.strip())
            stripped = (m2.group(1) if m2 else desc).strip(" -:,")
        desc = stripped
        fits = None
        f = FITS.match(desc)
        if f:
            fits = [x.strip() for x in f.group(1).split(",")]
            desc = desc[f.end():].strip(" -:,")
        if len(desc) < 3 or no in seen:
            continue
        seen.add(no)
        parts.append({"no": no, "name": desc, "fits": fits, "section": section or "Parts", "series": series or "Both", "page": i, "price": price, "callForPrice": call})

out.write_text(json.dumps({"_comment": "From Timpte's Serviceable Parts Catalog " + pdf.name + ". Prices show on the site only when config.json allows.", "catalog": pdf.name, "parts": parts}, indent=1) + "\n", "utf-8")
by_sec = {}
for p in parts: by_sec[p["section"]] = by_sec.get(p["section"], 0) + 1
print(f"{len(parts)} parts from {len(pages)} pages ->", out.name)
for s, n in sorted(by_sec.items(), key=lambda x: -x[1]): print(f"  {n:4}  {s}")
print("priced:", sum(1 for p in parts if p["price"]), " call for price:", sum(1 for p in parts if p["callForPrice"]), " no price:", sum(1 for p in parts if not p["price"] and not p["callForPrice"]))
for p in parts[:4] + [x for x in parts if x["section"] == "Dump Parts"][:4]: print("  ", p["page"], p["no"], "|", (p["fits"] or ""), "|", p["name"][:60], "|", p["price"] if p["price"] else ("call" if p["callForPrice"] else "-"))
