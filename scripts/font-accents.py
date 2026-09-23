# Adds French/Latin-1 accented letters to a Nanum Myeongjo woff2 as composite
# glyphs built from the font's own ASCII marks (` ^ . ~ ,).
import sys, copy
from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._g_l_y_f import Glyph, GlyphComponent, GlyphCoordinates

src, dst = sys.argv[1], sys.argv[2]
f = TTFont(src)
glyf, hmtx = f["glyf"], f["hmtx"]
cmap = f.getBestCmap()
order = f.getGlyphOrder()
bold = "ExtraBold" in src

def bbox(n):
    g = glyf[n]; g.recalcBounds(glyf); return g.xMin, g.yMin, g.xMax, g.yMax

def add(name, glyph, adv):
    glyf[name] = glyph
    hmtx[name] = (adv, getattr(glyph, "xMin", 0))
    if name not in order:
        order.append(name)

# dotless i/j: the letter minus its topmost contour (the dot)
def dotless(base, name):
    g = copy.deepcopy(glyf[base]); g.expand(glyf)
    coords, ends = g.getCoordinates(glyf)[0], g.endPtsOfContours
    flags = g.flags
    starts = [0] + [e + 1 for e in ends[:-1]]
    tops = [max(coords[i][1] for i in range(s, e + 1)) for s, e in zip(starts, ends)]
    drop = tops.index(max(tops))
    keep = [i for k, (s, e) in enumerate(zip(starts, ends)) if k != drop for i in range(s, e + 1)]
    ng = Glyph(); ng.numberOfContours = len(ends) - 1
    ng.coordinates = GlyphCoordinates([coords[i] for i in keep])
    ng.flags = bytearray(flags[i] for i in keep)
    newends, n = [], 0
    for k, (s, e) in enumerate(zip(starts, ends)):
        if k != drop:
            n += e - s + 1; newends.append(n - 1)
    ng.endPtsOfContours = newends; ng.program = g.program if hasattr(g, "program") else None
    from fontTools.ttLib.tables import ttProgram
    ng.program = ttProgram.Program(); ng.program.fromBytecode(b"")
    ng.recalcBounds(glyf)
    add(name, ng, hmtx[base][0])
    return name

DOTLESS = {"i": dotless("i", "dotlessi")}

def comp(name, x, y, sx=1.0, sy=1.0):
    c = GlyphComponent(); c.glyphName = name; c.x, c.y = round(x), round(y)
    c.flags = 0x4  # ROUND_XY_TO_GRID
    if sx != 1 or sy != 1:
        c.transform = [[sx, 0], [0, sy]]
    return c

XH, CAP = 496, 771
GAP_L, GAP_U = 70, 45

def mark(kind, base_box, upper):
    """Components for one mark, centred over the base's ink."""
    bx0, by0, bx1, by1 = base_box
    cx = (bx0 + bx1) / 2
    top = (CAP if upper else XH) + (GAP_U if upper else GAP_L)
    s = 0.62 if upper else 0.8
    out = []
    if kind in ("grave", "acute"):
        x0, y0, x1, y1 = bbox("grave")
        w = (x1 - x0) * s
        if kind == "grave":
            out.append(comp("grave", cx - w / 2 - x0 * s, top - y0 * s, s, s))
        else:  # mirror of the grave
            out.append(comp("grave", cx + w / 2 + x0 * s, top - y0 * s, -s, s))
    elif kind == "circumflex":
        x0, y0, x1, y1 = bbox("asciicircum")
        sx, sy = (0.62, 0.55) if upper else (0.72, 0.65)
        w = (x1 - x0) * sx
        out.append(comp("asciicircum", cx - w / 2 - x0 * sx, top - y0 * sy, sx, sy))
    elif kind == "diaeresis":
        x0, y0, x1, y1 = bbox("period")
        sd = 0.75 if upper else 0.82
        w = (x1 - x0) * sd; sep = 140 if upper else 130
        for dx in (-sep / 2, sep / 2):
            out.append(comp("period", cx + dx - w / 2 - x0 * sd, top + 10 - y0 * sd, sd, sd))
    elif kind == "tilde":
        x0, y0, x1, y1 = bbox("asciitilde")
        sx, sy = (0.55, 0.6) if upper else (0.62, 0.7)
        w = (x1 - x0) * sx
        out.append(comp("asciitilde", cx - w / 2 - x0 * sx, top - y0 * sy, sx, sy))
    elif kind == "cedilla":
        # a comma turned into a hook, hung from the bottom centre
        x0, y0, x1, y1 = bbox("comma")
        s = 0.95
        w = (x1 - x0) * s
        out.append(comp("comma", cx + w / 2 + x0 * s - 10, -y1 * s + 40, -s, s))
    return out

TABLE = {
    "grave": "àèìòùÀÈÌÒÙ", "acute": "áéíóúýÁÉÍÓÚÝ", "circumflex": "âêîôûÂÊÎÔÛ",
    "diaeresis": "äëïöüÿÄËÏÖÜŸ", "tilde": "ãñõÃÑÕ", "cedilla": "çÇ",
}
BASE = str.maketrans("àèìòùáéíóúýâêîôûäëïöüÿãñõçÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÄËÏÖÜŸÃÑÕÇ",
                     "aeiouaeiouyaeiouaeiouyanocAEIOUAEIOUYAEIOUAEIOUYANOC")
added = []
for kind, chars in TABLE.items():
    for ch in chars:
        if ord(ch) in cmap:
            continue
        b = ch.translate(BASE)
        if ord(b) not in cmap:
            continue
        bname = cmap[ord(b)]
        upper = b.isupper()
        use = DOTLESS.get(b, bname)
        g = Glyph(); g.numberOfContours = -1
        g.components = [comp(use, 0, 0)] + mark(kind, bbox(bname), upper)
        g.recalcBounds(glyf)
        name = "uni%04X" % ord(ch)
        add(name, g, hmtx[bname][0])
        for t in f["cmap"].tables:
            if t.isUnicode():
                t.cmap[ord(ch)] = name
        added.append(ch)

f.setGlyphOrder(order)
f["maxp"].numGlyphs = len(order)
f["post"].formatType = 3.0  # drop the glyph-name table, the new names don't need it
f.flavor = "woff2"
f.save(dst)
print(dst, "added", "".join(added))
