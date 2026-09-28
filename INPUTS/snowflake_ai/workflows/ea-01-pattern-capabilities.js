export const meta = {
  name: 'ea-01-pattern-capabilities',
  description: 'Step 1: research top-10 capabilities + scoring templates for 6 integration patterns and write one markdown file',
  whenToUse: 'First step of the EA pattern/vendor evaluation pipeline (see INPUTS/snowflake_ai/SPEC_pattern_vendor_evaluation.md §6). Args: family, filePrefix, outputDir, patternsFile, platform, researchDate.',
  phases: [
    { title: 'Discover', detail: 'read the pattern list' },
    { title: 'Research', detail: 'one research agent per pattern writes a section file' },
    { title: 'Verify', detail: 'one verifier per section checks structure and sources' },
    { title: 'Assemble', detail: 'concatenate sections, build consolidated bibliography' },
  ],
}

const A = args || {}
const FAMILY = A.family || 'Data Integration'
const PREFIX = A.filePrefix || FAMILY.toLowerCase().replace(/[^a-z0-9]+/g, '_')
const OUT = A.outputDir || 'OUTPUTS/ipaas'
const PATTERNS_FILE = A.patternsFile
const PLATFORM = A.platform || 'Snowflake'
const DATE = A.researchDate || 'the current month'
const WORK = `${OUT}/_work_${PREFIX}_capabilities`
const FINAL = `${OUT}/${PREFIX}_capabilities_scoring_templates.md`
if (!PATTERNS_FILE) throw new Error('args.patternsFile is required')

const FILE_ACCESS = `FILE ACCESS: All paths are relative to the project root (the folder containing INPUTS/ and OUTPUTS/). Use your normal file tools. If the project folder is not on this machine (e.g., you run in a cloud sandbox linked to the user's computer), load the remote-devices tools via ToolSearch and use device_bash on $HOME/mnt/<project-folder>/<path> to read and to write files (write with a heredoc or python; never re-type content from truncated tool output). Create folders as needed.`

const CONTEXT = `CONTEXT: Large US healthcare enterprise (payer/provider; claims, care management, clinical, member, provider, finance domains). PHI/HIPAA/HITECH apply; BAA required for managed services touching PHI. The Enterprise Architecture team attaches high-value ratings to: enterprise adaptability, portability between cloud vendors vs on-premise, operating costs, complexity, functional completeness for different domains, value-realization potential. The enterprise has a vast spectrum of data sources and consumers across domains and several overlapping technologies per pattern that need rationalization${/ai/i.test(FAMILY) ? '; it has run many AI POCs/pilots and now wants to standardize and scale' : ''}. ${PLATFORM} is the enterprise data platform (medallion lakehouse). Research date: ${DATE}.`

phase('Discover')
const disc = await agent(`${FILE_ACCESS}\n\nRead ${PATTERNS_FILE}. Return the six (or however many are listed) patterns from its first list, in order, with a short snake_case slug for each (e.g., "ELT, ETL" -> "elt"; "Vector Search" -> "vector_search"). If the file has a "Tasks for Research" or similar instruction section, return its text in extraInstructions (else empty string).`, {
  label: 'read-patterns', schema: {
    type: 'object', properties: {
      patterns: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, slug: { type: 'string' } }, required: ['name', 'slug'] } },
      extraInstructions: { type: 'string' },
    }, required: ['patterns', 'extraInstructions'],
  },
})
const patterns = disc.patterns
log(`${patterns.length} patterns: ${patterns.map(p => p.name).join(' | ')}`)

const SECTION_SPEC = (p, i) => `Write the Step-1 section for PATTERN ${i + 1}: "${p.name}" (${FAMILY} family).

RESEARCH QUESTION (answer it via extensive, current web research — WebSearch + WebFetch; if WebSearch is exhausted, WebFetch known pages):
"For the given ${FAMILY} pattern of ${p.name}, what are the top 10 features or capabilities that a large size HealthCare Enterprise should consider when evaluating Vendor Solutions which are cloud ready/ cloud native and AI enabled; as an Enterprise Architecture team we are attaching a high-value-rating for enterprise adaptability, portability between cloud vendors vs on-premise, operation costs, complexity, functional completeness for different domains within the enterprise, value-realization-potential; for additional context this is an enterprise that has vast spectrum of data sources and data consumers across multiple domains; it also has several technologies being used for this Integration pattern, which needs to be rationalized."
FOLLOW-UP: "Provide few scoring templates for above 10 features that I can use to compare against the leading industry solutions for this pattern."
${disc.extraInstructions ? 'ADDITIONAL USER INSTRUCTIONS FROM THE PATTERN FILE:\n' + disc.extraInstructions + '\n' : ''}
${CONTEXT}

Use vendor-neutral sources (Gartner/Forrester/IDC summaries, standards bodies e.g. HL7/FHIR, OWASP, NIST, OpenTelemetry; cloud architecture centers incl. ${PLATFORM}), practitioner articles and leading vendors' capability pages. Ground capabilities in healthcare specifics (HL7, FHIR, DICOM, X12 837/835, NPI, EMPI, PHI masking, BAA) where relevant. Never fabricate URLs.

WRITE the section to ${WORK}/section_${String(i + 1).padStart(2, '0')}_${p.slug}.md with EXACTLY this markdown structure:

### Pattern ${i + 1}: ${p.name}
*Scope:* one sentence.

#### Part 1: Top 10 Features & Capabilities for Enterprise ${p.name}
1. <Capability name><br/>*What to look for:* <2 sentences><br/>*Why it matters:* <1-2 sentences>
... exactly 10 numbered items, each on ONE line in that format.

#### Part 2: Strategic Pillar Weighting Model for ${p.name}
| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |
(6 pillars, weights sum to exactly 100%; security-heavy patterns give Governance/Security 20-25%)

#### Part 3: ${p.name} Feature Scoring Template (0 to 4 Scale)
| # | Feature / Capability | Description & Evaluation Focus | Weight | Vendor A Score | Vendor A Weighted | Vendor B Score | Vendor B Weighted |
(10 rows, 10% each, blank score cells) then: | TOTALS | Sum of (Score × Weight) normalized to 100% |  | 100% |  | [Total A] |  | [Total B] |

#### Part 4: Qualitative Architecture Risk & Fit Assessment
| Evaluation Domain | Key Architecture Question | Vendor A Status | Vendor B Status |   (3-5 rows, include a ${PLATFORM}-fit row)

**Candidate solutions to score (illustrative):** comma-separated list of leading solutions; include the ${PLATFORM}-native option in bold if one exists.

#### Part 5: Bibliography — ${p.name}
N. Publisher — Title — URL      (numbered from 1; at least 8 real sources you actually consulted)

Return JSON: file path written, and the list of sources.`

const SRC = { type: 'array', items: { type: 'object', properties: { publisher: { type: 'string' }, title: { type: 'string' }, url: { type: 'string' } }, required: ['title', 'url'] } }

phase('Research')
const results = await pipeline(patterns,
  (p, _o, i) => agent(`${FILE_ACCESS}\n\n${SECTION_SPEC(p, i)}`, {
    label: `research:${p.slug}`, phase: 'Research',
    schema: { type: 'object', properties: { file: { type: 'string' }, sources: SRC }, required: ['file', 'sources'] },
  }),
  (r, p, i) => agent(`${FILE_ACCESS}\n\nVerify and repair the Step-1 section file ${r.file} for pattern "${p.name}". Check and FIX in place: (a) exactly 10 Part-1 capabilities each on one line with "<br/>*What to look for:*" and "<br/>*Why it matters:*"; (b) Part-2 weights sum to exactly 100%; (c) Part-3 has exactly 10 numbered rows at 10% plus the TOTALS row; (d) Part-4 table present; (e) candidate list present; (f) Part-5 bibliography has >= 8 numbered entries with URLs — spot-check 3 URLs with WebFetch and remove any that are clearly fabricated/404, replacing if possible. Return what you checked/fixed.`, {
    label: `verify:${p.slug}`, phase: 'Verify',
    schema: { type: 'object', properties: { ok: { type: 'boolean' }, fixes: { type: 'string' } }, required: ['ok', 'fixes'] },
  }).then(v => ({ ...r, verify: v, pattern: p })),
)
const good = results.filter(Boolean)
if (good.length < patterns.length) log(`WARNING: ${patterns.length - good.length} pattern section(s) failed — assemble will note gaps`)

phase('Assemble')
const order = good.map(g => g.file)
const allSources = good.flatMap(g => g.sources.map(s => ({ ...s, pattern: g.pattern.name })))
const seen = new Set(); const dedup = []
for (const s of allSources) { const k = (s.url || '').replace(/\/$/, '').toLowerCase(); if (!seen.has(k)) { seen.add(k); dedup.push(s) } }
const bib = dedup.map((s, n) => `${n + 1}. ${s.publisher ? s.publisher + ' — ' : ''}${s.title} — ${s.url}  *(${s.pattern})*`).join('\n')
const header = `## ${FAMILY} Patterns — Top 10 Capabilities & Scoring Templates\n\n${patterns.map((p, i) => ` ${i + 1}. ${p.name}`).join('\n')}\n<br/><br/>\n\n**Context:** ${CONTEXT.replace('CONTEXT: ', '')}\n\n**Structure per pattern:** Part 1 top-10 capabilities (What to look for / Why it matters) · Part 2 pillar weighting · Part 3 0–4 scoring template · Part 4 qualitative risk & fit · candidate solutions · Part 5 bibliography.\n\n**Scoring scale:**\n\`\`\`console\n0 = Not Supported / Non-Existent\n1 = Basic / Custom Scripting Required\n2 = Out-of-the-Box / Configurable\n3 = Advanced / Native Cloud Integration\n4 = Fully Automated / AI-Driven Market Leader\n\`\`\`\nWeighted score = Score × Weight; Total = Σ weighted (max 4.0); Normalized % = Total ÷ 4.0.\n\n---\n`
const footer = `\n---\n\n### How to Use These Templates\n1. Shortlist 3–6 candidates per pattern; always include the ${PLATFORM}-native option where one exists.\n2. Score from evidence (docs, PoC results), record the evidence source for every score, and run Part 4 alongside the numbers.\n3. Aim for one primary standard per pattern plus an approved exception path.\n\n---\n\n## Consolidated Bibliography (de-duplicated across patterns)\n\n${bib}\n\n*Prepared ${DATE} for the Enterprise Architecture team. Research-based; verify vendor-specific facts at evaluation time.*\n`
await agent(`${FILE_ACCESS}\n\nAssemble the final file ${FINAL}. Do it with a shell/python script (do NOT retype section content):\n1. Write the HEADER text below to ${FINAL}.\n2. Append, in this order, the contents of: ${order.join(', ')} — separated by a line containing only "---".\n3. Append the FOOTER text below.\n4. Confirm the file has ${good.length} "### Pattern" headings and report its size.\n\nHEADER:\n<<<\n${header}\n>>>\n\nFOOTER:\n<<<\n${footer}\n>>>`, { label: 'assemble', phase: 'Assemble' })

return { output: FINAL, sections: order, verification: good.map(g => ({ pattern: g.pattern.name, ok: g.verify.ok, fixes: g.verify.fixes })), sources: dedup.length }
