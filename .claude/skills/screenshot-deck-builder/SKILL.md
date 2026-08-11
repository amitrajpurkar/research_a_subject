---
name: screenshot-deck-builder
description: "Use when the user wants to turn a folder of sequential screenshots (e.g. photos of someone else's presentation, phone screenshots of slides) into an editable PowerPoint deck and matching PDF for this project. Trigger on requests like 'build the deck from these screenshots', 'recreate this presentation from the photos in INPUTS/...', or when invoked directly with an INPUTS subfolder name (e.g. '/screenshot-deck-builder ja_presentation'). Also use for follow-up edit rounds on a deck this skill already built. Handles the full pipeline: reading screenshots in sequence, generating a pptxgenjs deck, validating it, rendering it to PDF for visual QA, and delivering both files to OUTPUTS/."
---

# Screenshot → Slide Deck Builder

Recreates a slide deck from a folder of sequential screenshot images (e.g. `IMG_0137.JPG` … `IMG_0175.JPG`) sitting under this project's `INPUTS/` folder, and produces a matching `.pptx` + `.pdf`, saved under `OUTPUTS/`.

This skill is scaffolding, not a black box — the actual slide reconstruction (reading each screenshot and reproducing its layout/text/colors) is done by you, guided by the `pptx` skill. This skill's helper script only handles the deterministic bookkeeping: path resolution, image ordering, naming, validation, PDF rendering, and file placement.

## Invocation

Args are two space-separated positional values:

```
/screenshot-deck-builder <input-subfolder> [output-subfolder]
```

- `<input-subfolder>` (required) — path relative to this project's `INPUTS/` folder, e.g. `ja_presentation`. Must contain the sequential screenshot images.
- `[output-subfolder]` (optional) — path relative to `OUTPUTS/`. Defaults to the `OUTPUTS/` folder root if omitted.

If `args` is empty, or names a folder that doesn't exist under `INPUTS/`, use AskUserQuestion rather than guessing — don't fill the gap with a made-up folder name.

If this is a **follow-up round of edits** to a deck this skill already built (e.g. "on page 5 change X", "swap the box on page 14 for a link"), skip straight to step 4 below: reopen the existing generator script and re-run validate → QA → finalize → deliver. No need to re-read the screenshots.

## Workflow

**1. Setup** — resolve paths and get the images in presentation order:

```bash
python3 <this-skill-dir>/scripts/deck_job.py setup <input-subfolder> [output-subfolder]
```

Prints JSON with `images` (sorted list of absolute paths — by EXIF capture time if available and consistent, otherwise natural filename order), `output_dir` (already created), and `suggested_basename` (`<input-subfolder-name>_<YYYYMMDD>`). If the user's request implies a more specific name (e.g. the presenter's name), prefer that over the suggested basename when you get to finalize.

**2. Read the screenshots in order.** Use the Read tool on each path from `images`, in sequence, to understand each slide's layout, text, colors, diagrams, and any charts.

**3. Read the pptx skill's `SKILL.md`** before writing any generator code, and follow its pptxgenjs gotchas exactly — hex colors without `#`, fresh shadow objects per call, `"ellipse"` never `"oval"`, `LAYOUT_WIDE` set before adding slides, etc. These are easy to get subtly wrong and the mistakes are often invisible until rendered.

**4. Build the deck** with a pptxgenjs script in a scratch directory (e.g. `/tmp/deck_build/gen.js`), one slide block per screenshot, reproducing each slide's layout/content as closely as practical. Apply any specific edits or additions the user asked for on top of the base reconstruction. Keep the generator script around — later edit rounds reopen and re-run it rather than rebuilding from scratch.

**5. Validate and finalize** — once `gen.js` runs clean and produces a `.pptx`:

```bash
python3 <this-skill-dir>/scripts/deck_job.py finalize <built.pptx> <output_dir> <basename>
```

using `output_dir` and (unless overridden) `suggested_basename` from step 1. This runs the pptx skill's `validate.py`, converts to PDF, and copies both files into `OUTPUTS/` as `<basename>.pptx` / `<basename>.pdf`. It exits non-zero and copies nothing if validation fails — fix the generator and retry rather than forcing bad output through.

**6. Visual QA before declaring done.** Render each page to JPG (`pdftoppm -jpeg -r 100 <pdf> slide` in a scratch dir) and Read a representative sample: slide 1, every slide you specifically edited, and at least one untouched slide (to confirm no header/style regression across the deck). Zoom into any subtle area you're unsure about (crop with PIL) rather than trusting a full-slide thumbnail.

**7. Deliver.** `SendUserFile` both the `.pptx` and `.pdf` from the `finalize` output paths. If a desktop device is connected (device-bridge tools available), also `device_commit_files` them to the same relative path under the user's local project — mirroring `OUTPUTS/<output-subfolder>/` on their machine.

## Notes

- Never read anything under `OUTPUTS/` or `TEMPLATES/` unless the user points you to a specific file there.
- The helper script auto-detects the project root by walking upward from the current directory for an `INPUTS/` folder — run it from anywhere inside the project.
- If `finalize` reports it couldn't find the pptx skill's `validate.py`/`soffice.py`, pass `--pptx-skill-dir <path>` pointing at that skill's `scripts/office` directory.
- Don't hand-roll path joining, date-stamping, or image sorting in ad hoc bash — use the helper script for that so naming stays consistent across runs.
