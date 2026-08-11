#!/usr/bin/env python3
"""
deck_job.py — scaffolding helper for the screenshot-deck-builder skill.

Handles the deterministic bookkeeping around turning a folder of sequential
screenshots (under a project's INPUTS/ folder) into a slide deck delivered
to OUTPUTS/: resolving paths, sorting images into presentation order,
naming the output files, validating the built .pptx, rendering it to .pdf,
and copying both into place.

It does NOT generate slide content — that's done by Claude with pptxgenjs,
guided by the pptx skill. This script only does the parts that don't need
judgment.

Usage:
  python3 deck_job.py setup INPUT_SUBFOLDER [OUTPUT_SUBFOLDER]
      Validates INPUTS/INPUT_SUBFOLDER exists and contains images, sorts
      them into presentation order, resolves/creates the OUTPUTS
      destination, and prints a JSON manifest to stdout.

  python3 deck_job.py finalize BUILT_PPTX OUTPUT_DIR BASENAME [--skip-validate] [--pptx-skill-dir DIR]
      Validates the built .pptx (via the pptx skill's validate.py),
      converts it to .pdf, and copies both files into OUTPUT_DIR as
      BASENAME.pptx / BASENAME.pdf. Prints a JSON result to stdout.
      Exits non-zero (and copies nothing) if validation fails.

Both subcommands auto-detect the project root by walking upward from the
current directory looking for a directory that contains (or can sensibly
contain) INPUTS/ and OUTPUTS/ folders.
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".tif", ".tiff"}

# Where the pptx skill's office scripts (validate.py, soffice.py) tend to
# live in this environment. First match wins; override with --pptx-skill-dir.
PPTX_SKILL_CANDIDATES = [
    "/root/.claude/skills/synced/pptx/scripts/office",
    "/mnt/skills/public/pptx/scripts/office",
]


def find_project_root(start: Path) -> Path:
    """Walk upward from `start` looking for a folder that has (or is a
    sensible place for) INPUTS/ and OUTPUTS/. Falls back to `start`."""
    cur = start.resolve()
    for candidate in [cur, *cur.parents]:
        if (candidate / "INPUTS").is_dir():
            return candidate
    return cur


def natural_sort_key(path: Path):
    """Sort filenames the way a human would: IMG_9 before IMG_10."""
    parts = re.split(r"(\d+)", path.name)
    return [int(p) if p.isdigit() else p.lower() for p in parts]


def collect_images(input_dir: Path):
    files = [p for p in input_dir.iterdir() if p.is_file() and p.suffix.lower() in IMAGE_EXTS]
    if not files:
        return [], "filename"

    # Prefer EXIF capture time when available and consistent; otherwise
    # fall back to natural filename sort.
    try:
        from PIL import Image
        from PIL.ExifTags import TAGS

        DATETIME_TAG = next((k for k, v in TAGS.items() if v == "DateTimeOriginal"), None)
        stamped = []
        for p in files:
            try:
                with Image.open(p) as img:
                    exif = img.getexif()
                ts = exif.get(DATETIME_TAG) if DATETIME_TAG and exif else None
            except Exception:
                ts = None
            stamped.append((p, ts))

        if all(ts is not None for _, ts in stamped):
            stamped.sort(key=lambda pair: pair[1])
            return [p for p, _ in stamped], "exif"
    except ImportError:
        pass

    files.sort(key=natural_sort_key)
    return files, "filename"


def cmd_setup(args):
    project_root = find_project_root(Path.cwd())
    input_dir = (project_root / "INPUTS" / args.input_subfolder).resolve()

    if not input_dir.is_dir():
        print(json.dumps({
            "error": f"INPUTS subfolder not found: {input_dir}",
            "project_root": str(project_root),
        }), file=sys.stderr)
        sys.exit(1)

    images, sort_method = collect_images(input_dir)
    if not images:
        print(json.dumps({
            "error": f"No image files found in {input_dir}",
            "project_root": str(project_root),
        }), file=sys.stderr)
        sys.exit(1)

    output_dir = (project_root / "OUTPUTS" / args.output_subfolder).resolve() if args.output_subfolder \
        else (project_root / "OUTPUTS").resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    today = subprocess.check_output(["date", "+%Y%m%d"], text=True).strip()
    suggested_basename = f"{Path(args.input_subfolder).name}_{today}"

    manifest = {
        "project_root": str(project_root),
        "input_dir": str(input_dir),
        "output_dir": str(output_dir),
        "images": [str(p) for p in images],
        "image_count": len(images),
        "sort_method": sort_method,
        "suggested_basename": suggested_basename,
    }
    print(json.dumps(manifest, indent=2))


def find_pptx_skill_dir(override):
    if override:
        return Path(override)
    for c in PPTX_SKILL_CANDIDATES:
        if Path(c).is_dir():
            return Path(c)
    return None


def cmd_finalize(args):
    built_pptx = Path(args.built_pptx).resolve()
    output_dir = Path(args.output_dir).resolve()
    basename = args.basename

    if not built_pptx.is_file():
        print(json.dumps({"error": f"Built pptx not found: {built_pptx}"}), file=sys.stderr)
        sys.exit(1)

    skill_dir = find_pptx_skill_dir(args.pptx_skill_dir)

    if not args.skip_validate:
        if skill_dir and (skill_dir / "validate.py").is_file():
            result = subprocess.run(
                [sys.executable, str(skill_dir / "validate.py"), str(built_pptx)],
                capture_output=True, text=True,
            )
            print(result.stdout)
            if result.returncode != 0 or "FAILED" in result.stdout.upper():
                print(result.stderr, file=sys.stderr)
                print(json.dumps({"error": "pptx validation failed — fix the generator and retry.", "output": result.stdout}), file=sys.stderr)
                sys.exit(1)
        else:
            print("Warning: pptx skill's validate.py not found — skipping validation.", file=sys.stderr)

    # Convert to PDF into a scratch dir, then copy both files into place.
    scratch = built_pptx.parent / "_deck_job_render"
    scratch.mkdir(exist_ok=True)

    converted = False
    if skill_dir and (skill_dir / "soffice.py").is_file():
        result = subprocess.run(
            [sys.executable, str(skill_dir / "soffice.py"), "--convert-to", "pdf",
             "--outdir", str(scratch), str(built_pptx)],
            capture_output=True, text=True,
        )
        converted = result.returncode == 0
        if not converted:
            print(result.stdout, file=sys.stderr)
            print(result.stderr, file=sys.stderr)

    if not converted:
        # Fallback: bare soffice, headless.
        result = subprocess.run(
            ["soffice", "--headless", "--convert-to", "pdf", "--outdir", str(scratch), str(built_pptx)],
            capture_output=True, text=True,
        )
        converted = result.returncode == 0
        if not converted:
            print(result.stdout, file=sys.stderr)
            print(result.stderr, file=sys.stderr)
            print(json.dumps({"error": "PDF conversion failed."}), file=sys.stderr)
            sys.exit(1)

    generated_pdf = scratch / (built_pptx.stem + ".pdf")
    if not generated_pdf.is_file():
        print(json.dumps({"error": f"Expected converted PDF not found: {generated_pdf}"}), file=sys.stderr)
        sys.exit(1)

    output_dir.mkdir(parents=True, exist_ok=True)
    final_pptx = output_dir / f"{basename}.pptx"
    final_pdf = output_dir / f"{basename}.pdf"
    shutil.copyfile(built_pptx, final_pptx)
    shutil.copyfile(generated_pdf, final_pdf)

    print(json.dumps({
        "pptx": str(final_pptx),
        "pdf": str(final_pdf),
        "validated": not args.skip_validate,
    }, indent=2))


def main():
    parser = argparse.ArgumentParser(description="Screenshot-deck-builder scaffolding helper.")
    sub = parser.add_subparsers(dest="command", required=True)

    p_setup = sub.add_parser("setup", help="Resolve paths and list screenshots in order.")
    p_setup.add_argument("input_subfolder", help="Path relative to INPUTS/, e.g. ja_presentation")
    p_setup.add_argument("output_subfolder", nargs="?", default="", help="Path relative to OUTPUTS/ (default: OUTPUTS root)")
    p_setup.set_defaults(func=cmd_setup)

    p_final = sub.add_parser("finalize", help="Validate, render to PDF, and copy the deck into OUTPUTS/.")
    p_final.add_argument("built_pptx", help="Path to the freshly generated .pptx")
    p_final.add_argument("output_dir", help="Destination directory (from setup's output_dir)")
    p_final.add_argument("basename", help="Output filename base, no extension")
    p_final.add_argument("--skip-validate", action="store_true", help="Skip validate.py (not recommended)")
    p_final.add_argument("--pptx-skill-dir", default=None, help="Override path to pptx skill's scripts/office dir")
    p_final.set_defaults(func=cmd_finalize)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
