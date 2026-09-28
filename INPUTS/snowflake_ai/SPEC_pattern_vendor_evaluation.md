# SPEC — Enterprise Integration Pattern Capability & Vendor Evaluation Pipeline

| Item | Value |
|---|---|
| Spec file | `INPUTS/snowflake_ai/SPEC_pattern_vendor_evaluation.md` |
| Version | 1.0 (September 2026) |
| Owner | Enterprise Architecture (EA) team |
| Derived from | EA working sessions, 23–27 Sep 2026 (Data Integration patterns, then AI patterns) |
| Runs on | Claude Code or Claude Cowork, with web search/fetch enabled |
| Companion workflows | `INPUTS/snowflake_ai/workflows/ea-01-pattern-capabilities.js` … `ea-04-deck-pptx.js` (copy to `.claude/workflows/` to invoke by name; see §10) |

---

## 1. Purpose

### 1.1 What this spec is for
This spec lets any EA colleague reproduce, on their own machine, the analysis the EA team produced for **Data Integration patterns** and **AI patterns**. Starting from a list of six patterns in one "pattern family" and a vendor list per pattern, it produces:

1. **Capabilities & scoring templates.** One markdown file with, for each pattern:
   - the top-10 capabilities a large healthcare enterprise should evaluate;
   - pillar weights, a 0–4 scoring template and a qualitative risk template;
   - a web-research bibliography.
2. **Vendor comparison reports.** One markdown file per pattern, covering:
   - deep vendor profiles with evidence and a score per capability;
   - pros and cons;
   - weighted score matrices and a risk/fit assessment;
   - recommendations and a bibliography.
3. **Slide-deck markdown.** One file summarizing all six patterns: capabilities, then vendor comparison for each pattern, closing with where **Snowflake** fits and how current technologies are leveraged.
4. **PowerPoint deck.** A `.pptx` built from the slide-deck markdown, in elegant, web-safe, light pastel styling.

### 1.2 Design principles
- **Research first, format second.** Every claim comes from current web research, and every source goes into a bibliography.
- **Same scale everywhere.** 0–4 scores, 10 capabilities at 10% each, normalized to 100%, so reports are comparable across patterns and families.
- **Honest scoring.** Some vendors on a list may not belong to the pattern's category (e.g., a data-quality tool listed under MDM). Score them anyway, flag the mismatch, and explain their "role alongside".
- **Platform-first rationalization.** Always ask what Snowflake (the enterprise data platform) already covers before recommending a new vendor.
- **Evidence over demos.** Scores are research-based estimates. Anything uncertain is tagged `(unverified)` / `(low confidence)` and goes on the PoC checklist.

---

## 2. Business Context (paste into every research prompt)

### 2.1 Enterprise profile
- A large US **healthcare** enterprise (payer/provider). Domains include claims, care management, clinical, member services, provider, finance, supply chain and research.
- Regulated data: **PHI**, HIPAA/HITECH, state privacy laws. A signed **BAA** is required for any managed service that touches PHI, and HITRUST is valued.
- A vast spectrum of data sources and consumers across domains, and several overlapping technologies per pattern that need **rationalization**.
- For AI patterns, add: *the enterprise has run many AI proofs-of-concept and pilots and now wants to standardize and scale.*

### 2.2 EA evaluation criteria (high-value ratings)
1. Enterprise adaptability
2. Portability between cloud vendors and on-premise
3. Operating costs
4. Complexity (and technology rationalization)
5. Functional completeness across enterprise domains
6. Value-realization potential

### 2.3 Platform & current-technology context
- **Snowflake** is the enterprise data platform (licences purchased), following a **medallion lakehouse** (Bronze → Silver → Gold).
- Technologies currently in use are marked **★ current** in vendor lists (e.g., for Data Integration: Boomi, Ab Initio, PySpark, Cloudera CDP, Secure FTP).

---

## 3. Folder Layout & Naming Conventions

### 3.1 Folders
```
<project-root>/
├── INPUTS/snowflake_ai/            ← specs, prompt logs, input notes
│   └── SPEC_pattern_vendor_evaluation.md   (this file)
├── OUTPUTS/ipaas/                  ← all generated reports and decks
│   └── workflows/                  ← ea-01 … ea-04 workflow scripts (source of truth)
└── .claude/workflows/              ← copy of the scripts so Claude Code can invoke them by name
```

### 3.2 File naming

| Artifact | Data Integration (existing) | AI patterns (existing) | New family `<fam>` |
|---|---|---|---|
| Pattern list (input) | first section of `data_integration_patterns.md` | `ai_patterns.md` | `<fam>_patterns.md` |
| Vendor list (input) | inline in prompts (see `INPUTS/snowflake_ai/prompt_vendor_compare.md`) | `ai_vendor_list.md` | `<fam>_vendor_list.md` |
| Step 1 output | `data_integration_patterns.md` | `ai_capabilities_scoring_templates.md` | `<fam>_capabilities_scoring_templates.md` |
| Step 2 outputs | `compare_elt_vendors.md`, `compare_cdc_vendors.md`, `compare_dv_vendors.md`, `compare_mdm_vendors.md`, `compare_mft_vendors.md`, `compare_pipe_orch_vendors.md` | `compare_agent_platform_vendors.md`, `compare_agent_framework_vendors.md`, `compare_mcp_vendors.md`, `compare_rag_vendors.md`, `compare_vector_search_vendors.md`, `compare_ai_gateway_obs_vendors.md` | `compare_<slug>_vendors.md` |
| Step 3 output | `data_integration_patterns_deck.md` | *(not yet generated)* → `ai_patterns_deck.md` | `<fam>_patterns_deck.md` (+ `.json` sidecar) |
| Step 4 output | `data_integration_patterns_deck.pptx` | *(not yet generated)* → `ai_patterns_deck.pptx` | `<fam>_patterns_deck.pptx` |

`<slug>` is a short snake_case pattern key (e.g., `elt`, `cdc`, `rag`, `vector_search`).

---

## 4. Inputs

### 4.1 Pattern list file (Step 1 input)
A markdown file whose **first list** names exactly six patterns, in presentation order. Example (`ai_patterns.md`):
```markdown
## AI Patterns
 1. Agent Platforms
 2. Agent Frameworks
 3. MCP EcoSystems
 4. RAG Frameworks
 5. Vector Search
 6. Gateway, Observability
```
Optional: a "Tasks for Research" section. If present, it overrides the default research question in §6.2.

### 4.2 Vendor list file (Step 2 input)
One heading or numbered item per pattern (same order and names as the pattern list), with bullet vendors beneath. Mark current enterprise technologies with `(current)`.
```markdown
 1. ELT, ETL
   * Informatica IDMC
   * Fivetran
   * Boomi (current)
   * Ab Initio (current)
 2. CDC Replication
   * Qlik Replicate
   * Cloudera Data Platform (current)
```

### 4.3 Workflow arguments
See §10.3. The minimum is the family label, file paths, and the platform name (`Snowflake`).

---

## 5. Pipeline Overview

```
 [patterns.md] ──► STEP 1 ea-01 ──► <fam>_capabilities_scoring_templates.md
                                              │
 [vendor_list.md] ────────────────────────────┤
                                              ▼
                    STEP 2 ea-02 ──► compare_<slug>_vendors.md  × 6
                                              │
                                              ▼
                    STEP 3 ea-03 ──► <fam>_patterns_deck.md (+ .json)
                                              │
                                              ▼
                    STEP 4 ea-04 ──► <fam>_patterns_deck.pptx
```

Run the steps **in order**. Review each output before starting the next; the steps are separate so a human can correct scores or wording in between. Steps 1–2 fan out one research agent per pattern, in parallel.

---

## 6. Step 1 — Top-10 Capabilities & Scoring Templates

### 6.1 Goal
Produce **one markdown file** that lists, pattern by pattern, the top-10 capabilities and the scoring templates, each backed by web research and a bibliography.

### 6.2 Research question (use verbatim, substituting the pattern)
> For the given **<pattern family> pattern of <pattern>**, what are the top 10 features or capabilities that a large size HealthCare Enterprise should consider when evaluating Vendor Solutions which are cloud ready/ cloud native and AI enabled; as an Enterprise Architecture team we are attaching a high-value-rating for enterprise adaptability, portability between cloud vendors vs on-premise, operation costs, complexity, functional completeness for different domains within the enterprise, value-realization-potential; for additional context this is an enterprise that has vast spectrum of data sources and data consumers across multiple domains; it also has several technologies being used for this Integration pattern, which needs to be rationalized.

Follow-up (use verbatim):
> Provide few scoring templates for above 10 features that I can use to compare against the leading industry solutions for this pattern.

### 6.3 Research method
- Use web search and fetch across:
  - vendor-neutral sources: Gartner/Forrester/IDC research summaries, Market Guides, Hype Cycles;
  - standards bodies (HL7/FHIR, OWASP, NIST, OpenTelemetry);
  - cloud architecture centers (AWS/Azure/GCP/Snowflake);
  - practitioner articles;
  - leading vendors' capability pages.
- Healthcare-ground each capability, citing concrete artifacts where they apply: HL7 v2, FHIR, DICOM, X12 837/835, NPI, EMPI, PHI masking, BAA.

### 6.4 Output structure (per pattern)
```markdown
### Pattern N: <Pattern>
*Scope:* one sentence.

#### Part 1: Top 10 Features & Capabilities for Enterprise <Pattern>
1. <Capability name><br/>*What to look for:* ...<br/>*Why it matters:* ...
... (exactly 10)

#### Part 2: Strategic Pillar Weighting Model for <Pattern>
| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |   (6 pillars, total = 100%)

#### Part 3: <Pattern> Feature Scoring Template (0 to 4 Scale)
| # | Feature / Capability | Description & Evaluation Focus | Weight | Vendor A Score | Vendor A Weighted | Vendor B Score | Vendor B Weighted |
(10 rows at 10% each + TOTALS row)

#### Part 4: Qualitative Architecture Risk & Fit Assessment
| Evaluation Domain | Key Architecture Question | Vendor A Status | Vendor B Status |   (3–5 rows)

**Candidate solutions to score (illustrative):** list, including the Snowflake-native option where one exists.

#### Part 5: Bibliography — <Pattern>
N. Publisher — Title — URL
```

The file opens with:
- the pattern list;
- the context (§2);
- the scoring scale block:
  - 0 = Not supported
  - 1 = Basic / custom scripting
  - 2 = Out-of-box / configurable
  - 3 = Advanced / native cloud
  - 4 = Fully automated / AI-driven leader

It ends with **"How to use these templates"** and a **consolidated, de-duplicated bibliography**.

### 6.5 Default pillar sets
Adapt the pillars per pattern. Security-heavy patterns (MCP, Gateway, MFT) give security **20–25%**.

| Pillar (typical) | Typical weight |
|---|---|
| Portability & Hybrid/Multi-Cloud | 20% |
| Functional Completeness (Domains) / Pattern-specific core (e.g., Transactional Integrity, Answer Quality) | 20% |
| Governance, Security & PHI Compliance | 15–25% |
| Complexity & Tech Rationalization | 15% |
| Operational Costs & FinOps | 10–20% |
| Value-Realization Potential | 10–15% |

### 6.6 Acceptance criteria
- 6 patterns, in input order.
- Exactly 10 capabilities each, every one with *What to look for* and *Why it matters*.
- Pillar weights total 100%.
- Part 3 has 10 rows at 10% each.
- ≥ 8 cited sources per pattern.
- No fabricated URLs.

---

## 7. Step 2 — Vendor Comparison Report (one file per pattern)

### 7.1 Inputs
The Step 1 file (the pattern's section), the vendor list for that pattern, and the current-technology markers.

### 7.2 Research method
- For every vendor, research current state (as of the run date):
  - vendor docs and release notes;
  - ownership and M&A;
  - renames and product retirements;
  - analyst placement (Gartner MQ / Market Guide / Peer Insights, Forrester Wave);
  - reviews (G2, PeerSpot, TrustRadius, Reddit, GitHub);
  - security advisories and CVEs where relevant;
  - pricing model;
  - HIPAA/BAA status.
- Add a **reference column** `Ref: <Snowflake offering>` where Snowflake has a native option (e.g., Openflow, Cortex Agents, Cortex Search, Snowflake-managed MCP server, Secure Data Sharing, AI Observability). It is **scored but not ranked**.
- Also useful: reference columns for managed variants (e.g., `Ref: PySpark on Databricks`, `Ref: Informatica DQ + MDM SaaS`).

### 7.3 Report structure
```markdown
# <Pattern> Vendor Comparison — Healthcare Enterprise <Family> Pattern
Header: pattern, evaluation basis (Step 1 file, Parts 1–4), vendor list source, vendors assessed,
current enterprise technology, research date, scoring-scale block, pillar weights, "how to read the scores",
scoping notes (renames, category mismatches, what exactly is scored).

## Section 1 — Vendor Profiles against the 10 Capabilities
### 1.1 <Vendor>
**Context:** ownership, versions, renames, analyst positioning, 2025–26 changes
| # | Capability | Evidence | Score |   (10 rows, 2–4 sentences of specific evidence each)
**Pros** (5–7, each with source type) · **Cons** (5–7) · **Pricing:** · **Healthcare / HIPAA note:**
... one subsection per market vendor, then "Part B — Technologies Currently Used in the Enterprise" (★), then Ref profiles

## Section 2 — Comparison: <Pattern> Feature Scoring Template (0 to 4 Scale)
### 2.1 Raw scores (0–4)       | # | Capability | Description & Evaluation Focus | Weight | Vendor… |
### 2.2 Weighted scores (Score × Weight) and totals   + TOTALS, Normalized %, Rank rows
### 2.3 Qualitative Architecture Risk & Fit Assessment   (Part 4 domains + stability, lock-in, HIPAA/BAA, Snowflake fit)
### 2.4 Analysis — Best Fit & Recommendations   (best fit, where others fit, Snowflake connection,
      target state = primary standard + exception path, PoC checklist)

## Section 3 — Bibliography
Grouped: Input files → one heading per vendor → Analyst research → Comparisons & practitioner articles.
Numbered `N. Publisher — Title — URL`; mark vendor- or competitor-authored pieces.
```

### 7.4 Scoring rules
| Rule | Detail |
|---|---|
| Scale | 0 Not supported · 1 Basic/custom scripting · 2 Out-of-box/configurable · 3 Advanced/native cloud · 4 Fully automated/AI-driven leader |
| Weights | 10 capabilities × 10% (optionally re-weight to mirror Part 2; state it if you do) |
| Weighted | score × 0.10, shown to 2 decimals |
| Total | Σ weighted (max 4.00) |
| Normalized | Total ÷ 4 × 100, 1 decimal |
| Rank | Market vendors and current technologies are ranked. `Ref:` columns show "(reference)" |
| Low confidence | Mark the score cell with `*` and explain in a footnote |
| Category mismatch | Score honestly (0–1 is acceptable) and add a "Role alongside <pattern>" note |
| Security track record | Record it in the qualitative risk table (e.g., exploited CVEs), not by altering feature scores |

### 7.5 Acceptance criteria
- Every vendor has 10 evidence rows plus pros, cons and pricing.
- The 2.1 and 2.2 tables agree.
- Totals equal the recomputed values: **verify with a script**.
- Each vendor has ≥ 8 bibliography entries.
- Renames, retirements and M&A are called out in the scoping notes.

---

## 8. Step 3 — Slide-Deck Markdown

### 8.1 Goal
Compile **one** markdown file (`<fam>_patterns_deck.md`) from the Step 1 file and the six Step 2 reports. Also write a JSON sidecar with the same data (`<fam>_patterns_deck.json`) so Step 4 can build the deck exactly.

### 8.2 Slide order (fixed)
| # | Slide | Content |
|---|---|---|
| 1 | **<Family> Patterns** | The 6 patterns in order, each with a one-line purpose |
| 2 | Pattern 1 — Top 10 Capabilities | 10 condensed items: *name · look for (≤ 12 words) · why (≤ 10 words)* |
| 3 | Pattern 1 — Vendor Comparison | Score matrix (capabilities × vendors), weighted-total row, 1–3 sentence takeaway |
| 4–13 | Patterns 2–6 | Same pair of slides for each pattern |
| 14 | **Where Snowflake Fits** | Per pattern: Fit (Strong / Partial / Gap), medallion layer, Snowflake-native capabilities, gap → complement (reuse first) |
| 15 | **Leveraging Current Technologies with Snowflake** | Per current tech: role today, how to use it with Snowflake, disposition (Keep / Reposition / Retire). Two boxes: **Engage (genuine net-new needs)** vs **Avoid / defer (already covered)**. For a family with no current technologies, show "Consolidation guidance" instead: which patterns Snowflake covers natively and which need one standard vendor |

### 8.3 Content rules
- **Highlighting**:
  - Snowflake offerings are marked **❄**.
  - Current enterprise technologies are marked **★ (current)**.
  - Reference columns are marked "Ref:" in italics.
  - The highest-scoring candidate total is flagged.
- A pattern with no Snowflake column gets a one-line note pointing to slide 14.
- The Snowflake analysis must aim to **maximize platform use and minimize point or niche vendors**. For each pattern it states what Snowflake does natively and the smallest complement needed.
- Every slide cites its source file.

---

## 9. Step 4 — PowerPoint Deck

### 9.1 Build method
Use the `pptx` skill with **pptxgenjs**, `LAYOUT_WIDE` (13.33 × 7.5 in). Build from the Step 3 JSON sidecar, with the markdown as the fallback.

### 9.2 Visual style — elegant, web-safe, light pastel
| Token | Hex | Use |
|---|---|---|
| Background | `FFFFFF` / `F8FAFC` | Slide background (light throughout; no dark slides) |
| Ink | `2F3E4E` | Titles and body text |
| Muted | `6B7785` | Captions, footers |
| Lavender | `E7E3F4` | Title-slide tiles, section chips |
| Sky | `DCEAF7` | Capability cards |
| Mint | `DFF1E7` | "Engage" box, Strong fit |
| Peach | `FBE3D3` | Current-technology highlight fill |
| Butter | `FFF3C9` | Partial fit, takeaway box |
| Rose | `F6DADA` | "Avoid" box, Gap fit |
| Snowflake accent | `8CC4EA` (fill) / `3F8FC7` (border) | Snowflake column header and outline |
| Current-tech accent | `F2B58B` (fill) / `D9823F` (border) | ★ column header and outline |
| Score heat 0→4 | `F4F5F7`, `E6F2EA`, `CFE8D8`, `A9D7BB`, `7DBF98` | Score cells (dark ink text on all) |

- **Fonts:** Arial throughout (web-safe; titles 26–30 pt bold, body 10.5–14 pt). No gradients, accent stripes or underline bars.
- **Motif:** rounded cards (`rectRadius` 0.06) with numbered pastel circles.
- **Tables:** thin `D9DEE5` borders. Highlighted columns get 2.25 pt outlines in the accent border colour.

### 9.3 QA
1. Run `validate.py`.
2. Render to PDF and then JPG, and inspect every slide.
3. Fix overflow and overlap, check the 0.5 in margins, and confirm nothing is clipped.
4. Re-render the changed slides.

Add speaker notes naming each slide's source file.

---

## 10. Workflows

### 10.1 Location
The workflow scripts are kept in `INPUTS/snowflake_ai/workflows/`, which is shared with the project and easy for colleagues to copy. To invoke them by name in Claude Code, copy them into `<project-root>/.claude/workflows/`:
```bash
mkdir -p .claude/workflows && cp INPUTS/snowflake_ai/workflows/ea-0*.js .claude/workflows/
```
Claude Code discovers them by name when it is started in `<project-root>`. In Cowork, or anywhere else, invoke them with `scriptPath` pointing to the file.

| Order | Workflow | Does | Main output |
|---|---|---|---|
| 1 | `ea-01-pattern-capabilities` | Reads the pattern list. Runs one research agent per pattern (in parallel) and one verifier per pattern. Assembles the single capabilities file and consolidated bibliography | `<fam>_capabilities_scoring_templates.md` |
| 2 | `ea-02-vendor-compare` | Reads the Step 1 file and vendor list. For each pattern, one research-and-write agent, then a verifier that recomputes arithmetic and fixes structure | `compare_<slug>_vendors.md` × 6 |
| 3 | `ea-03-deck-markdown` | Extracts condensed capabilities and score matrices from all reports, then synthesizes the Snowflake-fit and current-tech slides. Writes the deck markdown and JSON | `<fam>_patterns_deck.md` / `.json` |
| 4 | `ea-04-deck-pptx` | Builds the pastel PPTX from the JSON, then a QA agent renders it and fixes it | `<fam>_patterns_deck.pptx` |

### 10.2 How to invoke (sequentially)
In Claude Code, from the project root, ask:
> "Run the workflow `ea-01-pattern-capabilities` with args {…}"

Then review the output and run `ea-02`, then `ea-03`, then `ea-04`. Each workflow reports its outputs when it finishes.

### 10.3 Arguments
All paths are relative to the project root.

| Arg | ea-01 | ea-02 | ea-03 | ea-04 | Example |
|---|---|---|---|---|---|
| `family` | ✔ | ✔ | ✔ | ✔ | `"AI"` or `"Data Integration"` |
| `filePrefix` | ✔ | – | ✔ | ✔ | `"ai"` |
| `outputDir` | ✔ | ✔ | ✔ | ✔ | `"OUTPUTS/ipaas"` |
| `patternsFile` | ✔ | – | – | – | `"OUTPUTS/ipaas/ai_patterns.md"` |
| `capabilitiesFile` | – | ✔ | ✔ | – | `"OUTPUTS/ipaas/ai_capabilities_scoring_templates.md"` |
| `vendorListFile` | – | ✔ | – | – | `"OUTPUTS/ipaas/ai_vendor_list.md"` |
| `reportFiles` | – | – | optional | – | ordered list of the 6 comparison files (needed when names deviate, e.g. `compare_dv_vendors.md`) |
| `currentTech` | – | optional | optional | – | `["Boomi","Ab Initio","PySpark","Cloudera CDP","Secure FTP"]` |
| `platform` | ✔ | ✔ | ✔ | – | `"Snowflake"` |
| `researchDate` | ✔ | ✔ | ✔ | ✔ | `"September 2026"` |
| `deckFile` | – | – | – | optional | defaults to `<outputDir>/<filePrefix>_patterns_deck.json` |

### 10.4 Example — finish the AI family (Steps 3–4 only)
```json
ea-03-deck-markdown  {"family":"AI","filePrefix":"ai","outputDir":"OUTPUTS/ipaas",
  "capabilitiesFile":"OUTPUTS/ipaas/ai_capabilities_scoring_templates.md",
  "reportFiles":["OUTPUTS/ipaas/compare_agent_platform_vendors.md","OUTPUTS/ipaas/compare_agent_framework_vendors.md",
    "OUTPUTS/ipaas/compare_mcp_vendors.md","OUTPUTS/ipaas/compare_rag_vendors.md",
    "OUTPUTS/ipaas/compare_vector_search_vendors.md","OUTPUTS/ipaas/compare_ai_gateway_obs_vendors.md"],
  "platform":"Snowflake","researchDate":"September 2026"}
ea-04-deck-pptx  {"family":"AI","filePrefix":"ai","outputDir":"OUTPUTS/ipaas","researchDate":"September 2026"}
```

### 10.5 Example — a new family from scratch
```json
ea-01-pattern-capabilities {"family":"API Management","filePrefix":"api","outputDir":"OUTPUTS/ipaas",
  "patternsFile":"OUTPUTS/ipaas/api_patterns.md","platform":"Snowflake","researchDate":"October 2026"}
ea-02-vendor-compare {"family":"API Management","outputDir":"OUTPUTS/ipaas",
  "capabilitiesFile":"OUTPUTS/ipaas/api_capabilities_scoring_templates.md",
  "vendorListFile":"OUTPUTS/ipaas/api_vendor_list.md","platform":"Snowflake","researchDate":"October 2026"}
… then ea-03 and ea-04 as in §10.4
```

### 10.6 Operational notes
- **Cost.** Steps 1–2 spawn roughly 12 research agents each and are the most expensive steps; Steps 3–4 spawn about 9 and 2. Run them one at a time.
- **Rate limits.** Web-search budgets can run out mid-run. The agents fall back to direct page fetches. If a run stops, resume it with `resumeFromRunId`; finished agents are cached.
- **Cowork with a linked computer.** Agents run in the cloud and reach the project folder through the linked-computer file tools. Keep the desktop app online during a run.

---

## 11. Quality Gates (checklist before sharing)

- [ ] Step 1: 6 patterns × 10 capabilities; pillar weights total 100%; per-pattern bibliography; consolidated bibliography.
- [ ] Step 2:
  - [ ] Every vendor profiled with 10 evidence rows.
  - [ ] 2.1 and 2.2 agree, and totals are **re-computed by script**.
  - [ ] Ranks correct; Ref columns unranked.
  - [ ] Renames and M&A noted.
  - [ ] `(unverified)` tags present where needed.
  - [ ] ≥ 8 sources per vendor.
- [ ] Step 3: 15 slides in the fixed order; ❄ / ★ markers; Snowflake-fit and current-tech slides present.
- [ ] Step 4: `validate.py` passes; every slide visually checked; no overflow; pastel palette applied; speaker notes present.
- [ ] HIPAA/BAA claims are marked verified or unverified. None is presented as fact without a source.

---

## 12. Lessons Learned (Sept 2026 run)

| Topic | Lesson |
|---|---|
| Category mismatches | Vendor lists mix categories (e.g., Great Expectations, Soda and Monte Carlo under MDM; Snowflake Data Sharing under MFT; Openflow under Orchestration; gateways and observability tools in one list). Score them honestly and explain their complementary role. |
| Market churn | Expect renames and retirements. Recent examples: Azure AI Foundry → Microsoft Foundry; Vertex AI → Gemini Enterprise Agent Platform; Bedrock Agents → "Classic"; AutoGen + Semantic Kernel → Microsoft Agent Framework; TIBCO DV → Spotfire DV; GX Cloud discontinued. |
| M&A | Examples: Salesforce acquired Informatica, SAP acquired Reltio and Dremio, IBM acquired Confluent, Fivetran merged with dbt Labs. Note roadmap and renewal risk in the risk table. |
| Security history | MFT products (GoAnywhere, MOVEit, Cleo) had exploited zero-days. Always add a security-track-record row. |
| Oracle licensing | XStream-based CDC (Openflow, Debezium) can trigger GoldenGate licensing. Flag it for legal review. |
| HIPAA/BAA | Many SaaS vendors are "HIPAA ready" without a public BAA. Mark these `(unverified)` and put them on the PoC checklist. |
| Wide matrices | Up to about 10 vendor columns fit one widescreen slide if description columns are dropped and headers are 9–10 pt. |
| User edits | Users rename or move files between steps (e.g., `vendor_compare_data_virt.md` became `compare_dv_vendors.md`, and inputs moved into `OUTPUTS/ipaas`). Always re-list folders and re-read files rather than relying on cached copies. |

---

## 13. Prompt Library (original prompts, condensed)

1. **Capabilities (Step 1):** §6.2 verbatim, plus: *"provide the scoring templates one by one for each pattern … save this output as a markdown under OUTPUTS/ipaas."*
2. **Vendor comparison (Step 2):** *"… search on internet and company websites and reviews for following vendors … compare it with technologies used within the company … first section should arrange information gathered for each vendor on the 10-desired-features and also this vendor's pros and cons … separate section for comparison, use the matrix from Part 2/3 … provide your analysis on which vendors or current technologies are best fit … add the bibliography of all websites and resources."* The full log is in `INPUTS/snowflake_ai/prompt_vendor_compare.md`.
3. **Deck (Steps 3–4):** *"create a single markdown file first and then make the powerpoint … sequence: list of patterns, top-10 features of pattern 1, vendor comparison for pattern 1, … then your analysis on where Snowflake fits on each pattern … a separate page for current technologies stating where these can be leveraged in conjunction with Snowflake so that unnecessary vendor engagements are not made."*

---

## 14. Current Output Inventory (`OUTPUTS/ipaas`, 27 Sep 2026)

| Family | Step 1 | Step 2 (6 reports) | Step 3 deck md | Step 4 pptx |
|---|---|---|---|---|
| Data Integration | `data_integration_patterns.md` ✔ | ✔ (elt, cdc, dv, mdm, mft, pipe_orch) | `data_integration_patterns_deck.md` ✔ | `data_integration_patterns_deck.pptx` ✔ (navy theme; rebuild with ea-04 for the pastel theme) |
| AI | `ai_capabilities_scoring_templates.md` ✔ | ✔ (agent_platform, agent_framework, mcp, rag, vector_search, ai_gateway_obs) | ✘ pending → run ea-03 | ✘ pending → run ea-04 |

*End of spec.*
