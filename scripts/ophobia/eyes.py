# Cuts the ophobia artwork (eyes.png, a flat raster) into pieces the slide can
# animate: the drawing with every pupil painted out, a sheet holding each pupil
# and each eye's white (drawn over the pupil to blink), and their positions.
# Also trims the wordmark used on the project page.
# Needs Pillow, NumPy and SciPy. Run: python3 scripts/ophobia/eyes.py
import json
import math
import os

import numpy as np
from PIL import Image
from scipy import ndimage as nd

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "../..")
IMG = os.path.join(ROOT, "public/images/projects")
PAD = 16  # white kept around the drawing after the trim
ANGLES = 16  # directions a pupil's travel is measured in


def trim(gray, pad=PAD):
    """Crops to the drawing and turns the scan's off-white paper pure white."""
    gray = np.clip(gray * 255 / 235, 0, 255)
    ys, xs = np.nonzero(gray < 128)
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad + 1, gray.shape[0])
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad + 1, gray.shape[1])
    return gray[y0:y1, x0:x1]


def save(gray, name, alpha=None):
    a = np.clip(gray, 0, 255).astype(np.uint8)
    if alpha is None:
        Image.fromarray(a, "L").save(os.path.join(IMG, name), optimize=True)
    else:
        rgba = np.dstack([a, a, a, np.clip(alpha, 0, 255).astype(np.uint8)])
        Image.fromarray(rgba, "RGBA").save(os.path.join(IMG, name), optimize=True)


def travel(pupil, room, cy, cx):
    """How far the pupil can slide in each direction and stay inside `room`."""
    edge = pupil & ~nd.binary_erosion(pupil)
    ys, xs = np.nonzero(edge)
    out = []
    for k in range(ANGLES):
        t = 2 * math.pi * k / ANGLES
        dx, dy = math.cos(t), math.sin(t)
        d = 0.0
        while d < 200:
            ny = np.round(ys + dy * (d + 0.5)).astype(int)
            nx = np.round(xs + dx * (d + 0.5)).astype(int)
            ok = (ny >= 0) & (ny < room.shape[0]) & (nx >= 0) & (nx < room.shape[1])
            if not ok.all() or not room[ny, nx].all():
                break
            d += 0.5
        out.append(round(d, 1))
    return out


def main():
    gray = trim(np.array(Image.open(os.path.join(HERE, "eyes.png")).convert("L")).astype(float))
    H, W = gray.shape
    save(gray, "ophobia.png")

    # an eye's white is a light region closed by the outline; the pupil is the
    # hole inside it. Letter counters and highlights enclose nothing that big.
    light = gray > 128
    lab, _ = nd.label(light)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])))
    base = gray.copy()
    eyes = []
    for k, sl in enumerate(nd.find_objects(lab), 1):
        if k in border:
            continue
        white = lab[sl] == k
        filled = nd.binary_fill_holes(white)
        hole = filled & ~white
        if hole.sum() < 200:
            continue
        # keep the pupil alone, not stray specks of the scan around it
        parts, _ = nd.label(hole)
        hole = parts == np.argmax(np.bincount(parts.ravel())[1:]) + 1
        # the box grows so a pupil's antialiased edge and its travel fit
        y0, x0 = sl[0].start - 2, sl[1].start - 2
        h, w = white.shape[0] + 4, white.shape[1] + 4
        f = np.zeros((h, w), bool)
        f[2:-2, 2:-2] = filled
        p = np.zeros((h, w), bool)
        p[2:-2, 2:-2] = hole
        ring = nd.binary_dilation(p, iterations=2)
        crop = gray[y0 : y0 + h, x0 : x0 + w]
        # pupil sprite: solid inside, the antialiased rim kept as black alpha
        a = np.where(p, 255, np.where(ring, 255 - crop, 0))
        c = np.where(p, crop, 0)
        ys, xs = np.nonzero(ring)
        py0, py1, px0, px1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
        cy, cx = nd.center_of_mass(p)
        room = nd.binary_dilation(f, iterations=2)
        eyes.append(
            dict(
                pupil=(c[py0:py1, px0:px1], a[py0:py1, px0:px1]),
                lid=f,
                x=x0 + px0, y=y0 + py0,
                lx=x0, ly=y0,
                cx=round(x0 + cx, 1), cy=round(y0 + cy, 1),
                r=round(math.sqrt(p.sum() / math.pi), 1),
                lim=travel(p, room, cy, cx),
            )
        )
        base[y0 : y0 + h, x0 : x0 + w] = np.where(f | ring, 255, crop)
    save(base, "ophobia-base.png")

    # sheet: pupils on the first shelf, eye whites below, 2px apart
    sprites = [e["pupil"][0] for e in eyes] + [e["lid"] for e in eyes]
    SW = 1024
    x = y = row = 0
    spots = []
    for s in sprites:
        h, w = s.shape
        if x + w > SW:
            x, y, row = 0, y + row + 2, 0
        spots.append((x, y))
        x, row = x + w + 2, max(row, h)
    sheet = np.zeros((y + row, SW))
    alpha = np.zeros((y + row, SW))
    n = len(eyes)
    for i, e in enumerate(eyes):
        (c, a), (sx, sy) = e["pupil"], spots[i]
        sheet[sy : sy + c.shape[0], sx : sx + c.shape[1]] = c
        alpha[sy : sy + c.shape[0], sx : sx + c.shape[1]] = a
        lid, (sx, sy) = e["lid"], spots[n + i]
        sheet[sy : sy + lid.shape[0], sx : sx + lid.shape[1]] = np.where(lid, 255, 0)
        alpha[sy : sy + lid.shape[0], sx : sx + lid.shape[1]] = np.where(lid, 255, 0)
    save(sheet, "ophobia-pupils.png", alpha)

    out = []
    for i, e in enumerate(eyes):
        ph, pw = e["pupil"][0].shape
        lh, lw = e["lid"].shape
        out.append(
            dict(
                p=[*spots[i], pw, ph, int(e["x"]), int(e["y"])],
                l=[*spots[n + i], lw, lh, int(e["lx"]), int(e["ly"])],
                c=[e["cx"], e["cy"]], r=e["r"], lim=e["lim"],
            )
        )
    with open(os.path.join(ROOT, "src/data/ophobiaEyes.json"), "w") as fh:
        json.dump({"w": W, "h": H, "eyes": out}, fh, separators=(",", ":"))
    print(f"{len(eyes)} eyes, {W}x{H}")

    word = trim(np.array(Image.open(os.path.join(HERE, "wordmark.png")).convert("L")).astype(float))
    save(word, "ophobia-detail.png")


main()
