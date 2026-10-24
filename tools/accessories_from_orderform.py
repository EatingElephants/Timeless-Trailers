"""
Reads Timpte's Dealer Order Form spreadsheet and writes:
  - src/accessories.json   the Equipment Trailer Parts tab: part number, description, what it fits, MSRP, group
  - list prices (MSRP) into src/models.json, matched by Timpte's model code

    py -3 tools/accessories_from_orderform.py "<path to the .xlsx>"

Only MSRP (the customer price) leaves this script. The dealer-price columns are read past and dropped; the
spreadsheet itself stays out of the repo (it's a dealer document). Pictures are not in the spreadsheet; each
accessory has an "image" field to fill in by hand (a file name in site/img/) when Timpte or Matt supplies photos.

Uses only what comes with Python.
"""
import json, re, sys, zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

xlsx = Path(sys.argv[1])
SRC = Path(__file__).resolve().parent.parent / "src"
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main", "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}

z = zipfile.ZipFile(xlsx)
ss = ["".join(t.text or "" for t in si.iter("{%s}t" % NS["m"])) for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si", NS)] if "xl/sharedStrings.xml" in z.namelist() else []
wb = ET.fromstring(z.read("xl/workbook.xml")); rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
rid2t = {r.get("Id"): r.get("Target") for r in rels}
sheets = {s.get("name"): "xl/" + rid2t[s.get("{%s}id" % NS["r"])].lstrip("/") for s in wb.find("m:sheets", NS)}

def col(ref):
    n = 0
    for ch in re.match(r"[A-Z]+", ref).group(): n = n * 26 + ord(ch) - 64
    return n

def rows(sheet):
    out = []
    for row in ET.fromstring(z.read(sheets[sheet])).iter("{%s}row" % NS["m"]):
        cells = {}
        for c in row.findall("m:c", NS):
            v = c.find("m:v", NS)
            if v is None: continue
            if c.get("t") == "s": val = ss[int(v.text)]
            else:
                try: val = float(v.text); val = int(val) if val.is_integer() else val
                except Exception: val = v.text
            cells[col(c.get("r"))] = val
        out.append(cells)
    return out

# ---- accessories: Equipment Trailer Parts. Columns: C part #, D description, J MSRP. (K and L are dealer prices: not read.) ----
GROUPS = {"TIRES AND HOLDERS": "Spare tires and holders", "ROCKGUARD AND TIRE RACK": "Rock guards and tire racks", "DUMP TRAILER ACCESSORIES": "Dump trailer add-ons", "MISC. TRAILER ACCESSORIES": "Tie-downs, winches, toolboxes and more"}
FIT = re.compile(r"\b(\d{1,2}K(?: RAMPED)?|GOOSENECKS?)\b", re.I)

def tidy(desc):
    """Timpte's shouting description -> a name, what it fits, and the small print (size, ply, capacity)."""
    d = re.sub(r"\s+", " ", desc.replace("\u00a0", " ").replace("\u2013", " - ").replace("\u2014", " - ")).strip()
    size = re.search(r'(\d{2})"', d)
    ply = re.search(r"(\d)\s*-?\s*PLY", d, re.I)
    cap = re.search(r"/\s*([\d,]+)\s*LBS?", d, re.I)
    fits = []
    for f in FIT.findall(d):
        f = f.upper().replace("GOOSENECKS", "Goosenecks").replace("GOOSENECK", "Goosenecks").replace("RAMPED", "Ramped")
        if f not in fits: fits.append(f)
    name = FIT.sub("", d)
    name = re.sub(r'\d{2}"', "", name)
    name = re.sub(r"(\d)\s*-?\s*PLY", "", name, flags=re.I)
    name = re.sub(r"/\s*[\d,]+\s*LBS?", "", name, flags=re.I)
    name = name.replace("SWIVAL", "SWIVEL").replace("BOXEXTENSION", "BOX EXTENSION").replace("STAKE POCKETS PAIR", "STAKE POCKETS (PAIR)")
    name = re.sub(r"\s*-\s*DUMP TRL\b", " FOR DUMP TRAILER", name).replace("DUMP TRL", "DUMP TRAILER")
    name = name.replace("1' ", "1-FOOT ")
    name = re.sub(r"\s*,\s*,\s*&?\s*", " ", name)            # "FOR 14K, 16K, & DUMP" -> "FOR DUMP" once the Ks are gone
    name = re.sub(r"\s*/\s*(?=\s|$)", " ", name)
    name = re.sub(r"\s+", " ", name).strip(" -/,")
    name = re.sub(r"\s+-\s*$", "", name).strip()
    words = []
    for w in name.lower().split(" "):
        if w in ("&", "-", "/", "for", "and", "with", "(pair)"): words.append(w); continue
        if w == "d-ring": words.append("D-ring"); continue
        if w == "l-track": words.append("L-track"); continue
        if re.match(r"^\d", w): words.append(w); continue
        words.append(w.capitalize())
    name = " ".join(words)
    name = re.sub(r"\s+(for|and|with)$", "", name).strip()
    name = name.replace("Gun Metal Gray", "gun metal gray").replace("1-foot", "1-foot")
    name = name[0].upper() + name[1:]
    extra = []
    if size: extra.append(size.group(1) + '"')
    if ply: extra.append(ply.group(1) + "-ply")
    if cap: extra.append(cap.group(1) + " lb")
    return name.strip(), fits, extra

items, group = [], None
for cells in rows("Equipment Trailer Parts"):
    c, d, j = cells.get(3), cells.get(4), cells.get(10)
    if isinstance(c, str) and c.strip().upper() in GROUPS: group = GROUPS[c.strip().upper()]; continue
    if c and d and isinstance(j, (int, float)):
        name, fits, extra = tidy(str(d))
        items.append({"no": str(c), "name": name, "fits": fits, "detail": " · ".join(extra), "group": group or "Accessories", "msrp": round(float(j), 2), "image": None})
(SRC / "accessories.json").write_text(json.dumps({"_comment": "Timpte accessories from the Dealer Order Form (" + xlsx.name + "): part number, description, what it fits, MSRP. Dealer prices are never copied. image = a file in site/img/ once photos arrive.", "source": xlsx.name, "items": items}, indent=1, ensure_ascii=False) + "\n", "utf-8", newline="\n")
print(f"accessories.json: {len(items)} items")
for it in items: print(f"   {it['no']}  {it['name']:<48} fits {','.join(it['fits']) or '-':<14} {it['detail']:<12} ${it['msrp']:,.2f}  [{it['group']}]")

# ---- trailer list prices (MSRP) into models.json, by Timpte model code ----
CODE = {"514TSEZ": "514", "7KR3TSEZ": "720", "1020R3TSEZ": "1020", "1026R3TSEZ": "1026", "1420STTB": "1420ST", "1424STTB": "1424ST", "1624STTBS": "1624ST",
        "1420BPDO": "1420DO", "1426BPDO": "1426DO", "1620BPDO": "1620DO", "1626BPDO": "1626DO", "1620GNDO": "1620GN", "1626GNDO": "1626GN",
        "1620GNDOHD": "1620HD", "1626GNDOHD": "1626HD", "1414TSDT": "1414D", "1416TSDT": "1416D", "1614TSDT": "1614D", "1616TSDT": "1616D"}
models = json.loads((SRC / "models.json").read_text("utf-8"))
seen = set()
for cells in rows("Trailers"):
    code, msrp, partno = cells.get(4), cells.get(11), cells.get(3)
    if isinstance(code, str) and code.strip() in CODE and isinstance(msrp, (int, float)):
        key = CODE[code.strip()]
        models[key]["listPrice"] = int(round(msrp)); models[key]["timpteCode"] = code.strip(); models[key]["timptePart"] = str(partno) if partno else None
        seen.add(key)
(SRC / "models.json").write_text(json.dumps(models, indent=2, ensure_ascii=False) + "\n", "utf-8", newline="\n")
print("models.json list prices set for:", ", ".join(k for k in models if k in seen), "| missing:", [k for k in models if k not in seen])
