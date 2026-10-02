#!/usr/bin/env python3
"""Grade sketch photos for the gallery.

Bright, high-contrast paper with dark lines, matching the sketches already
in public/images/sketches. Run this on every new photo before adding it:

    python3 scripts/process-sketches.py photo.jpg
    python3 scripts/process-sketches.py photo.jpg public/images/sketches/name.jpg
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

# Paper white is the high end of the photo, not a fixed exposure.
BLACK_PERCENTILE = 0.015
WHITE_PERCENTILE = 0.93
# Lift the paper after the stretch so the page reads bright.
GAMMA = 0.82
CONTRAST = 1.12
# Keep a little of the desk color; the drawing stays near black and white.
COLOR = 0.88
UNSHARP = (1.2, 30, 2)  # radius, percent, threshold

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "sketches"


def _percentile(img: Image.Image, p: float) -> int:
    hist = img.convert("L").histogram()
    target = sum(hist) * p
    seen = 0
    for level, count in enumerate(hist):
        seen += count
        if seen >= target:
            return level
    return 255


def grade_sketch(img: Image.Image) -> Image.Image:
    img = ImageOps.exif_transpose(img).convert("RGB")
    black = _percentile(img, BLACK_PERCENTILE)
    white = _percentile(img, WHITE_PERCENTILE)
    if white <= black + 8:
        white = min(255, black + 8)

    span = white - black
    lut = []
    for level in range(256):
        x = (level - black) / span
        x = 0.0 if x < 0 else 1.0 if x > 1 else x
        lut.append(int(round((x**GAMMA) * 255)))

    img = img.point(lut * 3)
    img = ImageEnhance.Contrast(img).enhance(CONTRAST)
    img = ImageEnhance.Color(img).enhance(COLOR)
    radius, percent, threshold = UNSHARP
    return img.filter(ImageFilter.UnsharpMask(radius=radius, percent=percent, threshold=threshold))


def process(src: Path, dest: Path | None = None) -> Path:
    if dest is None:
        dest = OUT_DIR / f"{src.stem}.jpg"
    dest = dest if dest.is_absolute() else ROOT / dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    graded = grade_sketch(Image.open(src))
    graded.save(dest, "JPEG", quality=92, optimize=True, progressive=True)
    print(f"{dest.relative_to(ROOT)} {graded.size[0]}x{graded.size[1]}")
    return dest


def main(argv: list[str]) -> None:
    if not argv:
        print(__doc__.strip())
        sys.exit(1)
    src = Path(argv[0])
    dest = Path(argv[1]) if len(argv) > 1 else None
    process(src, dest)


if __name__ == "__main__":
    main(sys.argv[1:])
