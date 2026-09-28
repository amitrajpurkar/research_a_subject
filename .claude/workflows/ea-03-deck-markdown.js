export const meta = {
  name: 'ea-03-deck-markdown',
  description: 'Step 3: compile the 15-slide deck markdown (+ JSON sidecar) from the capabilities file and six vendor comparison reports',
  whenToUse: 'Third step of the EA pattern/vendor evaluation pipeline (SPEC §8). Args: family, filePrefix, outputDir, capabilitiesFile, reportFiles? (ordered), currentTech?, platform, researchDate.',
  phases: [
    { title: 'Discover', detail: 'map patterns to report files' },
    { title: 'Extract', detail: 'condense capabilities and score matrices per pattern' },
    { title: 'Synthesize', detail: 'platform-fit and current-technology analysis' },
    { title: 'Write', detail: 'write deck markdown and JSON' },
  ],
}

const A = args || {}
const FAMILY = A.family || 'Data Integration'
const PREFIX = A.filePrefix || FAMILY.toLowerCase().replace(/[^a-z0-9]+/g, '_')
const OUT = A.outputDir || 'OUTPUTS/ipaas'
const CAPS = A.capabilitiesFile
const PLATFORM = A.platform || 'Snowflake'
const DATE = A.researchDate || ''
const DECK_MD = `${OUT}/${PREFIX}_patterns_deck.md`
const DECK_JSON = `${OUT}/${PREFIX}_patterns_deck.json`
if (!CAPS) throw new Error('args.capabilitiesFile is required')

const FILE_ACCESS = `FILE ACCESS: All paths are relative to the project root (the folder containing INPUTS/ and OUTPUTS/). Use your normal file tools. If the project folder is not on this machine (e.g., a cloud sandbox linked to the user's computer), load the remote-devices tools via ToolSearch and use device_bash on $HOME/mnt/<project-folder>/<path> to read and write (write with heredoc/python; never re-type content from truncated tool output).`

phase('Discover')
const disc = await agent(`${FILE_ACCESS}\n\nRead ${CAPS} (patterns appear as "### Pattern N: <name>" sections, or — older format — as "#### Part 1: Top 10 Features & Capabilities for Enterprise <name>" blocks; the pattern order is the first list in the file). ${Array.isArray(A.reportFiles) && A.reportFiles.length ? 'The vendor-comparison reports are, in pattern order: ' + A.reportFiles.join(', ') + '.' : 'List ' + OUT + ' and match each pattern to its compare_*_vendors.md report (ask nothing; pick the obvious match by pattern name).'} Return the patterns in order with name, a one-line purpose tag (<= 12 words, healthcare-flavoured), and the report file path.`, {
  label: 'map-reports', schema: {
    type: 'object', properties: { patterns: { type: 'array', items: { type: 'object', properties: {
      name: { type: 'string' }, tag: { type: 'string' }, report: { type: 'string' } }, required: ['name', 'tag', 'report'] } } }, required: ['patterns'],
  },
})
const patterns = disc.patterns
log(patterns.map((p, i) => `${i + 1}. ${p.name} ← ${p.report}`).join('\n'))

const EXTRACT_SCHEMA = {
  type: 'object', properties: {
    features: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, lookFor: { type: 'string' }, why: { type: 'string' } }, required: ['name', 'lookFor', 'why'] } },
    columns: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, kind: { type: 'string', enum: ['vendor', 'platform', 'current', 'ref', 'platformRef'] } }, required: ['name', 'kind'] } },
    rows: { type: 'array', items: { type: 'array', items: { type: 'string' } } },
    totals: { type: 'array', items: { type: 'string' } },
    takeaway: { type: 'string' },
    platformNote: { type: 'string' },
  }, required: ['features', 'columns', 'rows', 'totals', 'takeaway', 'platformNote'],
}

phase('Extract')
const ex = await parallel(patterns.map((p, i) => () => agent(`${FILE_ACCESS}\n\nPattern ${i + 1}: "${p.name}". Read its top-10 capabilities in ${CAPS} and its vendor comparison report ${p.report} (Section 2.1 raw scores, 2.2 totals, 2.4 analysis).\nReturn:\n- features: the 10 capabilities in order, each with a SHORT name (<= 5 words), lookFor (<= 12 words), why (<= 10 words), faithfully condensed from "What to look for"/"Why it matters".\n- columns: every vendor column of table 2.1 in order, with kind: "platform" if it is a ${PLATFORM} offering that is a ranked vendor, "platformRef" if it is an unranked ${PLATFORM} reference column, "current" if marked current/★, "ref" for other reference columns, else "vendor". Strip markdown/asterisks from names; drop "(current)".\n- rows: the 10×V raw score strings exactly as in 2.1 (keep a trailing * if present).\n- totals: normalized % per column as in 2.2 (e.g., "82.5%").\n- takeaway: 2-3 sentences summarising 2.4 (best fit, key alternatives, key risk).\n- platformNote: if no ${PLATFORM} column exists, one sentence on how ${PLATFORM} relates to this pattern; else "".`, {
  label: `extract:${i + 1}`, phase: 'Extract', schema: EXTRACT_SCHEMA,
})))
const data = patterns.map((p, i) => ({ ...p, ...(ex[i] || {}) }))
const missing = data.filter(d => !d.features)
if (missing.length) log(`WARNING: extraction failed for ${missing.map(m => m.name).join(', ')}`)

phase('Synthesize')
const summary = data.map((d, i) => `Pattern ${i + 1} ${d.name}: columns=${(d.columns || []).map(c => c.name + '[' + c.kind + ']').join(', ')}; totals=${(d.totals || []).join(', ')}; takeaway=${d.takeaway}; report=${d.report}`).join('\n')
const syn = await agent(`${FILE_ACCESS}\n\nYou are the enterprise architect writing the closing slides of a ${FAMILY} patterns deck for a large US healthcare enterprise whose enterprise data platform is ${PLATFORM} (licences purchased; medallion lakehouse Bronze→Silver→Gold). Goal: maximize use of ${PLATFORM} and existing technologies, and avoid engaging too many point/niche vendors.\n\nPer-pattern results:\n${summary}\n\nRead the Section 2.4 analysis and any ${PLATFORM} profile in each report file for detail, and use current ${PLATFORM} documentation (WebSearch/WebFetch) to be accurate about native capabilities.\n\nReturn:\n1) platformFit: one entry per pattern (same order) with fit (Strong | Partial | Gap), layer (medallion layer(s) or "All layers"/"Consumption"), native (<= 40 words: ${PLATFORM}-native capabilities that serve the pattern), gap (<= 35 words: remaining gap → smallest complement, reuse existing tech first).\n2) currentTech: one entry per current enterprise technology found in the reports' current/★ columns${A.currentTech && A.currentTech.length ? ' (expected: ' + A.currentTech.join(', ') + ')' : ''} with name, pattern, role (<= 15 words), leverage (<= 35 words: how to use it in conjunction with ${PLATFORM}), disposition (Keep | Keep & focus | Reposition | Retire (phased) | Retire). Empty array if none.\n3) engage: 2-4 bullets of genuine net-new vendor needs; avoid: 2-4 bullets of engagements to avoid/defer because ${PLATFORM} or existing tech covers them.\n4) consolidation: if currentTech is empty, 3-5 bullets of consolidation guidance (which patterns ${PLATFORM} covers natively and where one standard vendor is needed); else [].`, {
  label: 'platform-analysis', phase: 'Synthesize',
  schema: { type: 'object', properties: {
    platformFit: { type: 'array', items: { type: 'object', properties: { pattern: { type: 'string' }, fit: { type: 'string' }, layer: { type: 'string' }, native: { type: 'string' }, gap: { type: 'string' } }, required: ['pattern', 'fit', 'layer', 'native', 'gap'] } },
    currentTech: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, pattern: { type: 'string' }, role: { type: 'string' }, leverage: { type: 'string' }, disposition: { type: 'string' } }, required: ['name', 'pattern', 'role', 'leverage', 'disposition'] } },
    engage: { type: 'array', items: { type: 'string' } },
    avoid: { type: 'array', items: { type: 'string' } },
    consolidation: { type: 'array', items: { type: 'string' } },
  }, required: ['platformFit', 'currentTech', 'engage', 'avoid', 'consolidation'] },
})

// ---- build markdown deterministically ----
const mark = c => (c.kind === 'platform' || c.kind === 'platformRef' ? '❄ ' : c.kind === 'current' ? '★ ' : '') + (c.kind === 'ref' || c.kind === 'platformRef' ? (/^Ref:/i.test(c.name) ? c.name : 'Ref: ' + c.name) : c.name) + (c.kind === 'current' ? ' (current)' : '')
const md = []
let n = 1
md.push(`# ${FAMILY} Patterns — Capabilities & Vendor Evaluation Deck (source content)`, '')
md.push(`Source content for \`${PREFIX}_patterns_deck.pptx\`, in slide order. Sources: \`${CAPS}\` and the vendor comparison reports listed per slide.${DATE ? ' Research date: ' + DATE + '.' : ''}`, '')
md.push(`**Legend:** ❄ = ${PLATFORM} offering · ★ = technology currently used in the enterprise · Ref = reference column (not ranked).`, '', '---', '')
md.push(`## Slide ${n++} — ${FAMILY} Patterns`, '')
data.forEach((d, i) => md.push(`${i + 1}. **${d.name}** — ${d.tag}`))
md.push('')
data.forEach((d, i) => {
  if (!d.features) return
  md.push('---', '', `## Slide ${n++} — ${d.name}: Top 10 Capabilities`, '', '| # | Capability | What to look for | Why it matters |', '|---|---|---|---|')
  d.features.forEach((f, j) => md.push(`| ${j + 1} | ${f.name} | ${f.lookFor} | ${f.why} |`))
  md.push('', `*Source: \`${CAPS}\` — Pattern ${i + 1}*`, '', '---', '')
  md.push(`## Slide ${n++} — ${d.name}: Vendor Comparison (0–4 scores, each capability 10%)`, '')
  md.push('| # | Capability | ' + d.columns.map(mark).join(' | ') + ' |', '|---|---|' + d.columns.map(() => '---').join('|') + '|')
  d.rows.forEach((r, j) => md.push(`| ${j + 1} | ${d.features[j] ? d.features[j].name : ''} | ${r.join(' | ')} |`))
  md.push('| | **Weighted total** | ' + d.totals.map(t => `**${t}**`).join(' | ') + ' |', '')
  if (d.platformNote) md.push(`*Note: ${d.platformNote}*`, '')
  md.push(`**Takeaway:** ${d.takeaway}`, '', `*Source: \`${d.report}\`*`, '')
})
md.push('---', '', `## Slide ${n++} — Where ${PLATFORM} Fits (medallion lakehouse)`, '', `Context: ${PLATFORM} is the enterprise data platform (Bronze → Silver → Gold). Goal: maximize the platform and minimize point/niche vendors.`, '')
md.push(`| Pattern | ${PLATFORM} fit | Medallion layer | ${PLATFORM}-native capability | Gap → complement (reuse first) |`, '|---|---|---|---|---|')
syn.platformFit.forEach(r => md.push(`| ${r.pattern} | **${r.fit}** | ${r.layer} | ${r.native} | ${r.gap} |`))
md.push('', '---', '')
if (syn.currentTech.length) {
  md.push(`## Slide ${n++} — Leveraging Current Technologies with ${PLATFORM}`, '', 'Goal: reuse what the enterprise already runs, avoid unnecessary vendor engagements, focus new spend on genuine gaps.', '')
  md.push(`| Technology | Pattern | Role today | How to leverage with ${PLATFORM} | Disposition |`, '|---|---|---|---|---|')
  syn.currentTech.forEach(r => md.push(`| ★ ${r.name} | ${r.pattern} | ${r.role} | ${r.leverage} | **${r.disposition}** |`))
} else {
  md.push(`## Slide ${n++} — Consolidation Guidance with ${PLATFORM}`, '', 'No current enterprise technologies were listed for this family.', '')
  syn.consolidation.forEach(b => md.push(`- ${b}`))
}
md.push('', '**Engage — genuine net-new needs:**', ...syn.engage.map(b => `- ${b}`), '', '**Avoid / defer — already covered:**', ...syn.avoid.map(b => `- ${b}`), '')
const markdown = md.join('\n')
const json = JSON.stringify({ family: FAMILY, prefix: PREFIX, platform: PLATFORM, researchDate: DATE, capabilitiesFile: CAPS, patterns: data, synthesis: syn }, null, 1)

phase('Write')
await agent(`${FILE_ACCESS}\n\nWrite two files EXACTLY with the content given (use a python script with the content embedded as raw strings, or the Write tool; do not alter anything). Then report each file's character count (expected: markdown ${markdown.length} chars, json ${json.length} chars; small differences from newline handling are fine).\n\nFILE 1: ${DECK_MD}\n<<<MD\n${markdown}\nMD>>>\n\nFILE 2: ${DECK_JSON}\n<<<JSON\n${json}\nJSON>>>`, { label: 'write-deck-md', phase: 'Write' })

return { deckMarkdown: DECK_MD, deckJson: DECK_JSON, slides: n - 1, patterns: data.map(d => ({ name: d.name, report: d.report, totals: d.totals })) }
