"""
Prints the text inside a PDF, page by page, using only what comes with Python.

    py -3 tools/pdf_text.py "<file.pdf>" [page numbers...]

Good enough for Timpte's spec sheets and catalogs (text PDFs, not scans). Used to read spec numbers
into src/models.json and by tools/parts_from_catalog.py.
"""
import re, sys, zlib
from pathlib import Path

STR = rb"\(((?:[^()\\]|\\.)*)\)"


def pages_of(raw):
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
        s = s.replace("\\(", "(").replace("\\)", ")").replace("\\222", "'").replace("\\224", '"').replace("\\223", '"').replace("\\226", "-").replace("\\227", "-").replace("\\251", "")
        s = re.sub(r"\\\d{3}", "", s)
        return s.replace("\\\\", "\\")

    def text_of(stream):
        s = re.sub(rb"<<.*?>>\s*BDC", b"", stream, flags=re.S)
        parts = []
        for m in re.finditer(rb"\[((?:[^\[\]\\]|\\.)*)\]\s*TJ|" + STR + rb"\s*Tj", s, re.S):
            parts.append("".join(decode(x) for x in re.findall(STR, m.group(1), re.S)) if m.group(1) is not None else decode(m.group(2)))
        return re.sub(r"\s+", " ", re.sub(r"en-(GB|US)", " ", " ".join(parts)))

    out = []
    for n in order:
        txt = ""
        for c in refs(objs[n], b"Contents"):
            m = re.search(rb"stream\r?\n(.*?)\r?\nendstream", objs.get(c, b""), re.S)
            if not m: continue
            try: txt += " " + text_of(zlib.decompress(m.group(1)))
            except Exception: continue
        out.append(txt.strip())
    return out


if __name__ == "__main__":
    pages = pages_of(Path(sys.argv[1]).read_bytes())
    want = [int(x) for x in sys.argv[2:]] or range(1, len(pages) + 1)
    for i in want:
        print(f"=== page {i} of {len(pages)}")
        print(pages[i - 1])
