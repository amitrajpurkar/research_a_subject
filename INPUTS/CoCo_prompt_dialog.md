# CoCo Research — Prompt & Dialog Record

**Project:** research_a_subject · **Topic:** Snowflake Cortex Code (CoCo)
**Date:** 2026-10-09 (America/New_York) · **Captured at:** ~19:25
**Deliverable produced:** `OUTPUTS/CoCo/CoCo_Complete_Learning_Guide.md`

> User messages are verbatim. Claude's turns are condensed summaries (the original session included many tool calls, which are summarized, not transcribed).

---

## 1. Initial prompt (verbatim) — 19:07

> today in this project i want you to do a deep research on the Snowflake product "Cortex Code" also known as CoCo; the link from snowflake is "https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code" ; i want you to search through user documentation, reference documents as well as developer documentation for CoCo Desktop and CoCo Snowsight; do the web research on websites from other researchers as well ; also check for helpful youtube videos; After doing the deep research, i want you to generate an exhaustive markdown file, which will help me to learn CoCo quickly, effectively and effciently; i need to upskill myself as a Data Analyst, System Analyst and Integration architect for a large enterprise ; i want you to create a sub-folder for CoCo in OUTPUTS folder; save this markdown file there, name it appropriately; later i will be also asking you to work on a study guide, a quick reference document, a cheat sheet, and also a slide deck to share knowledge with my co-workers and help them upskill quickly

**Standing preferences in effect (from user settings):** save deliverables under an `OUTPUTS/` subfolder per project; don't read `OUTPUTS/` or `TEMPLATES/` unless pointed to a file; if the brief is unclear, ask via AskUserQuestion rather than filling gaps.

---

## 2. Dialog

### Claude (opening)
Stated the plan: research Cortex Code (CoCo) across Snowflake docs, third-party write-ups and YouTube, then write the Markdown guide into a new `OUTPUTS/CoCo/` folder on the user's computer. Created a four-step task list (official docs → third-party/videos → write guide → verify).

### Claude — research phase 1 (official docs)
Fetched the hub page and learned CoCo has three surfaces (Snowsight, Desktop, CLI), all listed GA, with MCP/ACP/Plugins/Agent SDK listed as Preview. Then fetched, in batches: CLI page and CLI reference, Desktop hub, Snowsight page, Desktop and CLI release notes/changelog, cost controls, daily credit limits, observability, extensibility (skills/subagents/hooks/MCP), MCP, ACP, plugins, automations, Agent SDK, skill/plugin sharing, Snowsight skills & plugins, model settings, security (CLI + Desktop), managed settings, permission modes, cloud sandbox, agent/plan mode, and the Snowflake "CoCo Foundations" quickstart.

### Claude — progress note to user
> Still researching: I've covered the official CLI, Desktop, Snowsight, security, MCP, plugins, SDK and cost docs. Next are the Desktop feature pages, third-party blogs and YouTube videos. After that I'll write the guide.

### Claude — research phase 2 (third-party + videos)
Read analyses from Atlan, Digital Applied, DataEngineerHub, Kanerika, Atrium (CoCo vs Databricks Genie Code), a Snowflake-publication Medium article, and PromptArmor's security write-up. A YouTube search returned 10 candidate videos.

---

## 3. Mid-task user message (verbatim) — 19:10

> i also want you to collect and record each of the resources in a Bibliography section in the markdown

### Claude's response
Acknowledged and committed to adding a Bibliography listing every resource (docs, blogs, videos). Continued research.

### Claude — issue reported to user
> I couldn't read the YouTube watch pages. The fetch tool was rate-limited (HTTP 429) and its message said not to retry. I'll list the videos in the Bibliography using only the titles and links from search results, and mark them "not reviewed". I'm moving on to the remaining Desktop pages.

### Claude — research phase 3
Fetched the remaining Desktop pages (onboarding/auth, context, dbt, instruction files, data viz, FAQ, agents, memory, semantic code search, SQL Playground, notebooks, building apps, browser, skills, automations, MCP, plugins), the Snowflake AI pricing page, Snowflake's launch blog, and the Atrium/PromptArmor/Kanerika articles.

---

## 4. Writing and delivery

### Claude — progress notes to user
> Writing the guide now. Sections 1–9 (overview, surfaces, access, CLI/Desktop/Snowsight references) are drafted. Next are extensibility, security, cost, the three role playbooks, labs, prompts and the Bibliography, then I'll save it to OUTPUTS/CoCo/.

> The guide is written (about 945 lines). I'm saving it into OUTPUTS/CoCo/ on your computer and checking it.

### Actions
- Created `OUTPUTS/CoCo/` in the project folder on the user's computer.
- Assembled the guide from five parts, fixed citation IDs, delivered it, and committed it to `OUTPUTS/CoCo/CoCo_Complete_Learning_Guide.md`.
- Verification: file exists (≈98 KB, 945 lines, 19 top-level `##` headings) and every `[S#]/[B#]/[V#]/[R#]` citation in the text has a matching Bibliography row.

### Claude (final summary, condensed)
- The guide is built around three roles: Data Analyst, System Analyst, Integration Architect (playbooks in section 14).
- Contents: full reference for CLI, Desktop and Snowsight; extension points (skills, subagents, hooks, MCP, plugins, SDK, ACP); automations and cloud sandbox; security and admin; cost and observability; a 4-week learning path; prompt library; troubleshooting; glossary; Bibliography (section 18).
- Claims are tagged: 🟢 Snowflake docs · 🟡 third-party/vendor · 💡 my suggestion.
- **Caveats stated to the user:**
  - YouTube videos were not reviewed (titles/links only).
  - The 72.1% vs 65.1% ADE-Bench result and the "7,100 accounts" figure are vendor-reported and unreplicated.
  - CoCo token rates (Service Consumption Table PDF) were not read.
  - HIPAA/BAA/data-residency for CoCo is not addressed in any source read — confirm with Snowflake and Compliance.
  - A few pages were not read (listed in guide §17.3).
- Offered next deliverables: study guide, cheat sheet / quick reference, slide deck for co-workers, to be derived from the guide.

---

## 5. Second request (verbatim) — 19:23

> Can you next capture my initial prompt and our conversation on CoCo research work as a markdown in INPUTS foider; you can name it as CoCo_prompt_dialog.md

→ This file.

---

## 6. Sources used in this research (pointer)
The full, itemized list (S-, B-, V-, R- IDs with URLs and read/not-read status) is in **Section 18 (Bibliography)** of `OUTPUTS/CoCo/CoCo_Complete_Learning_Guide.md`.

## 7. Open items / next steps
- [ ] Study guide (derive from guide §6–7, 12–16)
- [ ] Quick-reference document / cheat sheet (derive from §3, 7, 12–13)
- [ ] Slide deck for co-workers
- [ ] Optional: review the 10 YouTube videos and update §18.4 with verified notes
- [ ] Optional: read the Service Consumption Table PDF for CoCo token rates

---

## 8. Third request (verbatim) — 19:28

> Can you next generate a Cheat-Sheet or reference card (few pages) in PDF format under OUTPUTS/CoCo ; i intend to use this as my active reference while working in CoCo at work

### Claude's response (condensed)
- Built a 4-page, two-column PDF cheat sheet from the learning guide (reportlab) and saved it as `OUTPUTS/CoCo/CoCo_Cheat_Sheet.pdf`.
- Fixed two layout problems along the way (code blocks overflowing column width; numbered-list bullet size).

---

## 9. Fourth request (verbatim) — 19:37

> next i want you to also generate an exhaustive slide deck to share knowledge with my co-workers; save it under OUTPUTS/CoCo and name it appropriately; for this task, additional context is that my team is group of four talented and highly experience Business Analysts who are SMEs with business process as well as the data that flows through different systems in the Enterprise; these ladies are not software developers or data engineers; Enterprise have recently migrated its matured and elaborate Data Lake with Medallian architecture into Snowflake and have activated Cortex Code as Streamlit as default features for all employees; we all are actively trying to upskill on this tool; i am myself an experienced software developer, data analyst and an Enterprise Architect; do keep capturing each of our conversation in INPUTS/CoCo_prompt_dialog.md

### Claude's response (condensed)
- Audience: four senior Business Analysts (SMEs, non-developers) on a Snowflake medallion data lake. Deck written in plain language, no code required.
- Built a 46-slide deck "CoCo for Business Analysts" in 7 sections: Welcome; Understand (what CoCo is, surfaces, agent loop, medallion, Streamlit); Get started (Snowsight, prompting recipe); 9 BA playbooks; Trust and safety (modes, risks, verification, cost); Level up (skills, AGENTS.md, sharing, automations, hand-off); Practice (3 labs, 30-60-90 plan, agreements, items to confirm). All slides have speaker notes.
- Published as a private Slides artifact. A Slides artifact cannot be written directly into `OUTPUTS/CoCo`, so the deck can be downloaded as .pptx or PDF from the deck menu and saved there.
- Assumption: "Cortex Code as Streamlit" was read as "Cortex Code and Streamlit enabled". Streamlit app building is documented for Desktop/CLI; availability in Snowsight is flagged to confirm with the admin.
- Caveats carried into the deck: vendor benchmark claims unreplicated; HIPAA/BAA/data residency unconfirmed (ask Compliance); YouTube videos not reviewed.

**Standing instruction:** keep appending each conversation exchange to this file.

---

## 10. Fifth request (verbatim) — 19:46

> the content and layout of the deck looks good; i noticed that many pages have HTML markup errors or issues; can you generate this deck and save it as a PPTX file under OUTPUTS/CoCo folder?

### Claude's response (condensed)
- Rebuilt the same 46 slides (content, order, speaker notes) as a native PowerPoint file with python-pptx: editable text, tables and shapes, Calibri/Consolas fonts.
- Saved as `OUTPUTS/CoCo/CoCo_for_Business_Analysts.pptx`.
- Checked by rendering all slides to images via LibreOffice; layout fits, minor uneven spacing on a few bullet slides.

---

## 11. Sixth request (verbatim) — 19:53

> i tried to verify the slide deck on my machine (MacBook Pro)  ; when i double click on the file from Finder app, it says file-format is invalid; the decks you have been generating earlier on other projects and even this one have been working well , even now; just this file "CoCo_for_Business_Analysts.pptx" is not opening

### Claude's response (condensed)
- Confirmed the file on his Mac was byte-identical to the one built here (same SHA-256), a valid zip with well-formed XML, so it was not corrupted in transfer.
- Found two structural defects in the python-pptx output: no `notesMasterIdLst` in `presentation.xml` (the deck has speaker notes) and a stale 4:3 `type` attribute on the 16:9 slide size. Fixed both, set document properties, rebuilt and re-committed the same filename.
- Could not test in PowerPoint/Keynote from here; also supplied `CoCo_for_Business_Analysts.pdf` as a fallback.
