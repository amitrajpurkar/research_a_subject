export const meta = {
  name: 'ea-02-vendor-compare',
  description: 'Step 2: research and write one vendor-comparison report per pattern, then verify scores and structure',
  whenToUse: 'Second step of the EA pattern/vendor evaluation pipeline (SPEC §7). Args: family, outputDir, capabilitiesFile, vendorListFile, currentTech?, platform, researchDate, only? (list of slugs to run).',
  phases: [
    { title: 'Discover', detail: 'map patterns to vendor lists' },
    { title: 'Research & Write', detail: 'one agent per pattern writes compare_<slug>_vendors.md' },
    { title: 'Verify', detail: 'recompute arithmetic, check structure and bibliography' },
  ],
}

const A = args || {}
const FAMILY = A.family || 'Data Integration'
const OUT = A.outputDir || 'OUTPUTS/ipaas'
const CAPS = A.capabilitiesFile
const VENDORS = A.vendorListFile
const PLATFORM = A.platform || 'Snowflake'
const DATE = A.researchDate || 'the current month'
const CURRENT = A.currentTech || []
if (!CAPS || !VENDORS) throw new Error('args.capabilitiesFile and args.vendorListFile are required')

const FILE_ACCESS = `FILE ACCESS: All paths are relative to the project root (the folder containing INPUTS/ and OUTPUTS/). Use your normal file tools. If the project folder is not on this machine (e.g., a cloud sandbox linked to the user's computer), load the remote-devices tools via ToolSearch and use device_bash on $HOME/mnt/<project-folder>/<path> to read and write (write with heredoc/python; never re-type content from truncated tool output).`

phase('Discover')
const disc = await agent(`${FILE_ACCESS}\n\nRead ${CAPS} (the Step-1 capabilities file; each pattern is a "### Pattern N: <name>" section) and ${VENDORS} (vendor list per pattern). Return, in the pattern order of the capabilities file: pattern number, name, a short snake_case slug (reuse obvious short forms, e.g. elt, cdc, dv, mdm, mft, pipe_orch, agent_platform, agent_framework, mcp, rag, vector_search, ai_gateway_obs), the market vendors listed for it, the vendors marked "(current)" or matching this list of current enterprise technologies: ${JSON.stringify(CURRENT)}, and the most relevant ${PLATFORM}-native offering to add as an unranked reference column (or empty string if none is relevant).`, {
  label: 'map-vendors', schema: {
    type: 'object', properties: {
      patterns: { type: 'array', items: { type: 'object', properties: {
        n: { type: 'integer' }, name: { type: 'string' }, slug: { type: 'string' },
        vendors: { type: 'array', items: { type: 'string' } },
        current: { type: 'array', items: { type: 'string' } },
        platformRef: { type: 'string' },
      }, required: ['n', 'name', 'slug', 'vendors', 'current', 'platformRef'] } },
    }, required: ['patterns'],
  },
})
let patterns = disc.patterns
if (Array.isArray(A.only) && A.only.length) patterns = patterns.filter(p => A.only.includes(p.slug))
log(patterns.map(p => `${p.n}. ${p.name}: ${p.vendors.join(', ')}${p.current.length ? ' | current: ' + p.current.join(', ') : ''}${p.platformRef ? ' | ref: ' + p.platformRef : ''}`).join('\n'))

const REPORT_SPEC = `REPORT STRUCTURE (markdown; follow exactly):
# <Pattern> Vendor Comparison — Healthcare Enterprise ${FAMILY} Pattern
Header lines: **Integration pattern:**, **Evaluation basis:** \`${CAPS}\` — Pattern N (Part 1 top-10 capabilities, Part 2 pillar weighting, Part 3 scoring template, Part 4 qualitative risk), **Vendor list source:** \`${VENDORS}\`, **Vendors assessed:**, **Current enterprise technology:** (or "None"), **Research date:** ${DATE} (+ source types). Then: scoring-scale table (0 Not supported · 1 Basic/custom scripts · 2 Out-of-box/configurable · 3 Advanced/native cloud · 4 Fully automated/AI-driven leader), the Part-2 pillar weights table, a "How to read the scores" note, and scoping notes (renames, retirements, M&A, product-category mismatches, what exactly is scored).
---
## Section 1 — Vendor Profiles against the 10 Capabilities  (list the 10 capability names)
### Part A — Market Vendors
### 1.1 <Vendor>
**Context:** 3-6 sentences (ownership, versions/GA, renames, Gartner/Forrester positioning, 2025-26 changes).
| # | Capability | Evidence | Score |  — 10 rows; Evidence = 2-4 sentences of specific, current facts naming real features.
**Pros** 5-7 bullets each ending with (source type) · **Cons** 5-7 bullets · **Pricing:** · **Healthcare / HIPAA note:** (BAA status; mark (unverified) if not public)
### Part B — Technologies Currently Used in the Enterprise (★ current) — same profile format; omit Part B if none.
### Reference — ${PLATFORM} (Ref:) — short profile + 10-row score table; NOT ranked.
---
## Section 2 — Comparison: <Pattern> Feature Scoring Template (0 to 4 Scale)
One line: each capability weighted 10%; Weighted = Score × 10%; Total = Σ (max 4.0); Normalized % = Total ÷ 4.0.
### 2.1 Raw scores (0–4)
| # | Capability | Description & Evaluation Focus | Weight | <Vendor 1> | ... | <★ Current (current)> | <Ref: ...> |   (10 rows; mark low-confidence cells with * and footnote)
### 2.2 Weighted scores (Score × Weight) and totals
| # | Capability | <same columns> |   (10 rows, values like 0.30)
| **TOTALS** | **Sum of weighted scores (max 4.0)** | **x.xx** | ...
| | **Normalized to 100%** | **xx.x%** | ...
| | **Rank** | 1 | 2= | ... | (reference) |
### 2.3 Qualitative Architecture Risk & Fit Assessment
Rows: Part-4 domains from the template + Vendor/Roadmap Stability + Lock-in + HIPAA/BAA + ${PLATFORM} fit (+ Security track record where relevant). One column per vendor.
### 2.4 Analysis — Best Fit & Recommendations
Best-fit vendor(s) and why; where each other vendor fits; how the pattern connects to ${PLATFORM} (what ${PLATFORM} already covers — prefer platform + reuse of current tech over new point/niche vendors); recommended target state (primary standard + exception path); PoC checklist (4-6 items).
---
## Section 3 — Bibliography
Groups: Input; one heading per vendor; Analyst research (Gartner / Forrester / IDC); Comparisons, reviews & practitioner articles. Numbered continuously: N. Publisher — Title — URL. Mark vendor-/competitor-authored comparisons. >= 8 sources per vendor. Never fabricate URLs.
*Closing italic line: research-based estimates, validate via PoC and contract review.*`

const SCORE_SCHEMA = {
  type: 'object', properties: {
    file: { type: 'string' },
    columns: { type: 'array', items: { type: 'string' } },
    rows: { type: 'array', items: { type: 'array', items: { type: 'integer' } } },
    totals: { type: 'array', items: { type: 'number' } },
    bibliographyCount: { type: 'integer' },
    recommendation: { type: 'string' },
  }, required: ['file', 'columns', 'rows', 'totals', 'bibliographyCount', 'recommendation'],
}

const out = await pipeline(patterns,
  p => agent(`${FILE_ACCESS}\n\nWrite a thorough vendor-comparison report for the ${FAMILY} pattern "${p.name}" (Pattern ${p.n}).\n\nFirst read the "### Pattern ${p.n}" section of ${CAPS}: use its 10 capabilities (exact names and order), Part 2 pillar weights and Part 4 risk domains.\n\nMarket vendors (in this order): ${p.vendors.filter(v => !p.current.includes(v)).join('; ')}.\nCurrent enterprise technologies (★, ranked, profiled in Part B): ${p.current.length ? p.current.join('; ') : 'none'}.\nReference column (unranked): ${p.platformRef ? 'Ref: ' + p.platformRef : 'none'}.\n\nCONTEXT: large US healthcare enterprise (PHI/HIPAA/BAA; claims, care mgmt, clinical, member domains); EA criteria = enterprise adaptability, portability cloud/on-prem, operating cost, complexity, functional completeness across domains, value realization; ${PLATFORM} is the enterprise data platform (medallion lakehouse); goal is to rationalize and avoid unnecessary point/niche vendors. Research date ${DATE}.\n\nRESEARCH thoroughly with WebSearch + WebFetch (fall back to WebFetch of known docs if search is exhausted): vendor docs/release notes, ownership & M&A, renames/retirements, Gartner (MQ, Market Guides, Hype Cycles, Peer Insights) and Forrester placements, G2/PeerSpot/TrustRadius/Reddit/GitHub, security advisories, pricing, HIPAA/BAA. Flag uncertainty inline with (unverified)/(low confidence).\n\nSCORING: 0-4 per capability; each 10%; Weighted = score × 0.10; Total = sum of raw ÷ 10 (max 4.00); Normalized = Total ÷ 4. Compute carefully.\n\n${REPORT_SPEC}\n\nWrite the full report (typically 45-80 KB) to ${OUT}/compare_${p.slug}_vendors.md. Return the file path, the column names of table 2.1 (vendors incl. current and Ref), the 10×V raw score rows, the totals (0-4 scale), the bibliography count, and a 2-3 sentence recommendation.`, {
    label: `write:${p.slug}`, phase: 'Research & Write', schema: SCORE_SCHEMA,
  }),
  (r, p) => agent(`${FILE_ACCESS}\n\nVerify and repair ${r.file} (vendor comparison for "${p.name}"). Using a short python script (not by eye): parse table 2.1 raw scores and table 2.2 weighted scores; confirm weighted = raw × 0.10 for every cell, TOTALS = Σ weighted, Normalized = TOTALS ÷ 4 × 100, Rank ordering correct with Ref columns shown as (reference). Fix any mismatch in place (2.2/totals/ranks — and any totals quoted in 2.4 prose). Also confirm: every vendor in 2.1 has a Section-1 profile with a 10-row evidence table, pros, cons, pricing; Sections 2.3, 2.4 and 3 exist; bibliography entries are numbered with URLs (spot-check 3 URLs with WebFetch). Return findings.`, {
    label: `verify:${p.slug}`, phase: 'Verify',
    schema: { type: 'object', properties: { ok: { type: 'boolean' }, totals: { type: 'array', items: { type: 'number' } }, fixes: { type: 'string' } }, required: ['ok', 'totals', 'fixes'] },
  }).then(v => ({ pattern: p.name, file: r.file, columns: r.columns, totals: v.totals, bibliography: r.bibliographyCount, recommendation: r.recommendation, verify: v })),
)

const done = out.filter(Boolean)
if (done.length < patterns.length) log(`WARNING: ${patterns.length - done.length} report(s) failed; re-run with args.only = [slugs] (and resumeFromRunId) to retry`)
return done
