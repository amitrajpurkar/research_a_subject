export const meta = {
  name: 'ea-04-deck-pptx',
  description: 'Step 4: build an elegant light-pastel PowerPoint deck from the Step-3 deck JSON/markdown, then render and QA it',
  whenToUse: 'Fourth step of the EA pattern/vendor evaluation pipeline (SPEC §9). Args: family, filePrefix, outputDir, deckFile?, researchDate.',
  phases: [
    { title: 'Build', detail: 'pptxgenjs build from deck JSON' },
    { title: 'QA', detail: 'validate, render, inspect and fix every slide' },
  ],
}

const A = args || {}
const FAMILY = A.family || 'Data Integration'
const PREFIX = A.filePrefix || FAMILY.toLowerCase().replace(/[^a-z0-9]+/g, '_')
const OUT = A.outputDir || 'OUTPUTS/ipaas'
const DECK = A.deckFile || `${OUT}/${PREFIX}_patterns_deck.json`
const DECK_MD = DECK.replace(/\.json$/, '.md')
const PPTX = `${OUT}/${PREFIX}_patterns_deck.pptx`

const FILE_ACCESS = `FILE ACCESS: All paths are relative to the project root (the folder containing INPUTS/ and OUTPUTS/). Use your normal file tools. If the project folder is not on this machine (e.g., a cloud sandbox linked to the user's computer), load the remote-devices tools via ToolSearch: read inputs with device_bash (or device_stage_files), build in your sandbox, and write the final .pptx back with device_commit_files (stage outputs under /mnt/user-data/outputs first if required).`

const DESIGN = `DESIGN SPEC — elegant, web-safe, LIGHT PASTEL (no dark slides):
- pptxgenjs, pres.layout = "LAYOUT_WIDE" (13.33 × 7.5 in). Margins >= 0.5 in. Font: Arial everywhere (titles 26-30 pt bold, section kicker 11 pt bold, body 10.5-14 pt, footers 9 pt).
- Palette (hex, no '#'): background FFFFFF (content) / F8FAFC (title slide); ink 2F3E4E; muted 6B7785; lavender E7E3F4; sky DCEAF7; mint DFF1E7; peach FBE3D3; butter FFF3C9; rose F6DADA; table borders D9DEE5.
- Platform (e.g., Snowflake ❄) column: header fill 8CC4EA, 2.25 pt outline 3F8FC7 around the column. Current technology (★) column: header fill F2B58B, 2.25 pt outline D9823F. Ref columns: header fill E3E6EA, italic. Other headers: lavender E7E3F4 with ink text.
- Score heat (0→4) cell fills: F4F5F7, E6F2EA, CFE8D8, A9D7BB, 7DBF98 — dark ink text on all. Highest-scoring non-Ref total: mint fill + bold.
- Motif: rounded cards (ROUNDED_RECTANGLE, rectRadius 0.06) with numbered pastel circles; no accent stripes, no underline bars, no gradients.
SLIDES (15, fixed order):
 1. Title + pattern list: title "<Family> Patterns", subtitle about capabilities/vendor evaluation/platform fit; 6 lavender/sky tiles (3×2) each with number circle, pattern name, one-line tag.
 2,4,6,8,10,12. "<Pattern> — Top 10 Capabilities": kicker "PATTERN n OF 6 · CAPABILITIES"; 2 columns × 5 sky cards; each card: number circle, bold capability name, "Look for:" line, italic "Why:" line; footer source.
 3,5,7,9,11,13. "<Pattern> — Vendor Comparison": kicker; legend chips top-right (❄ platform, ★ current, heat scale); table: #, Capability, one column per vendor (header 9-10 pt, wraps), 10 score rows (~0.34 in), Weighted total row; butter takeaway box below (include platformNote if present); footer source file. Must fit one slide even with 10 vendor columns (capability col ~2.45 in, remaining width split evenly).
 14. "Where <Platform> Fits": three pastel chips Bronze/Silver/Gold (peach/lavender/butter) then table: Pattern | Fit pill (Strong=mint, Partial=butter, Gap=rose, dark text) | Layer | Native capability | Gap → complement.
 15. "Leveraging Current Technologies with <Platform>" (or "Consolidation Guidance" if no current tech): one card per technology with ★ name, pattern, disposition pill (Keep=mint, Reposition=butter, Retire=rose), "Today" and "With <Platform>" text; bottom two boxes: mint "Engage — genuine net-new needs" and rose "Avoid / defer — already covered".
- Every slide: speaker notes naming its source file(s). Every addText uses isTextBox: true. Never share option objects between calls.`

phase('Build')
const build = await agent(`${FILE_ACCESS}\n\nBuild a PowerPoint deck for the ${FAMILY} patterns. Load the pptx skill first (Skill tool: "anthropic-skills:pptx" or "pptx", whichever is listed) and follow its pptxgenjs guidance and gotchas.\n\nINPUT: ${DECK} (JSON sidecar with patterns[].{name, tag, features[10]{name, lookFor, why}, columns[]{name, kind}, rows[10][V], totals[V], takeaway, platformNote, report} and synthesis.{platformFit, currentTech, engage, avoid, consolidation}). If the JSON is missing, parse ${DECK_MD} instead.\n\n${DESIGN}\n\nWrite a generator script (keep it next to the output as ${OUT}/_build_${PREFIX}_deck.js is fine, or in your scratch space), run it, then run the skill's validate.py on the result. Save the deck to ${PPTX}. Return the path, slide count and validation result.`, {
  label: 'build-pptx', phase: 'Build',
  schema: { type: 'object', properties: { pptx: { type: 'string' }, slides: { type: 'integer' }, validation: { type: 'string' }, generator: { type: 'string' } }, required: ['pptx', 'slides', 'validation', 'generator'] },
})

phase('QA')
const qa = await agent(`${FILE_ACCESS}\n\nVisually QA the deck ${build.pptx} (built by generator ${build.generator}). Load the pptx skill. Convert to PDF with the skill's soffice wrapper, render JPGs with pdftoppm, and LOOK at every slide image. Check: text overflow/clipping (first), overlaps, margins < 0.5 in, table fitting on comparison slides, legibility of 9-10 pt headers, pastel palette applied (no dark slides), ❄/★ column highlights visible, consistent card spacing, speaker notes present. Fix issues in the generator (not by hand-editing XML), rebuild, re-validate, re-render only changed slides, and stop when clean. Save the final deck to ${PPTX}.\n\nDesign reference:\n${DESIGN}\n\nReturn a short QA log.`, {
  label: 'qa-pptx', phase: 'QA',
  schema: { type: 'object', properties: { pptx: { type: 'string' }, issuesFixed: { type: 'array', items: { type: 'string' } }, clean: { type: 'boolean' } }, required: ['pptx', 'issuesFixed', 'clean'] },
})

return { pptx: qa.pptx || build.pptx, slides: build.slides, validation: build.validation, qa }
