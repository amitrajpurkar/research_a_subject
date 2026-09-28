# Snowflake Study Guide & Certification Roadmap

*Prepared for: Amit Rajpurkar — 25+ years of hands-on SQL across MS SQL Server, IBM DB2, PostgreSQL, Oracle, and MongoDB*
*Purpose: Build proficiency in the Snowflake AI Data Cloud, master its SQL dialect and built-in capabilities, learn its AI features (Cortex, CoWork), learn to build visualizations, and earn SnowPro certifications*
*Last updated: 2026-09-02*

---

## How to Use This Guide

You do not need to be taught what a `JOIN`, a transaction, or an index is — you've been writing production SQL since 1998. This guide is deliberately **not** a beginner SQL tutorial. It is organized around the questions that actually matter for someone with your background: *what is architecturally different about Snowflake, what is different (or missing) in its SQL dialect, what does it give you that Oracle/DB2/Postgres/Mongo don't, and what is the fastest credible path to being certified and productive?*

The guide has three parts:

1. **Part A — Study Guide**: the conceptual map of the platform, organized the way you'll actually use it (architecture → SQL & functions → certifications → AI capabilities → visualization).
2. **Part B — Annotated Resource List**: every link you supplied, organized by when to use it, plus a small number of supplementary sources I found that fill gaps (exam domain weightings, syntax comparisons, etc.).
3. **Part C — Study Plan with Milestones & Deliverables**: a week-by-week plan with concrete, checkable deliverables and a recommended certification sequence.

---

# Part A — Study Guide

## A1. Platform Fundamentals: What's Actually Different About Snowflake

Every RDBMS you've used — MS SQL, DB2, Oracle, Postgres — couples storage and compute on the same machine(s). Even Mongo, despite being distributed and schemaless, ties query execution to the nodes holding the data. Snowflake's foundational architectural decision is to **separate storage, compute, and cloud services into three independently scaling layers**, and almost everything else about the platform follows from that one decision.

- **Storage layer**: All data is stored compressed and columnar in Snowflake's own micro-partition format, sitting on cloud object storage (S3/Azure Blob/GCS depending on which cloud your account runs on). You never manage tablespaces, data files, or physical layout the way you would in DB2 or Oracle.
- **Compute layer — Virtual Warehouses**: A "warehouse" in Snowflake is not a data warehouse in the conceptual sense — it's a cluster of compute resources (a set of servers) that you spin up, size (X-Small to 6X-Large), suspend, and resume independently of the data. Multiple warehouses can query the same tables concurrently with zero contention, because each warehouse has its own compute — this is Snowflake's answer to the "one big box falls over during month-end close" problem you've lived with on other platforms. Multi-cluster warehouses can also auto-scale out horizontally to absorb concurrency spikes (many analysts querying at once), which is a different scaling axis than Oracle RAC or SQL Server Always On.
- **Cloud services layer**: Handles authentication, query parsing/optimization, metadata, and infrastructure management — this is why Snowflake needs almost no traditional DBA tuning (no index management, no statistics jobs, no physical tuning).

**Concepts that will feel genuinely new**, regardless of your RDBMS depth:
- **Micro-partitions & automatic clustering** — Snowflake automatically partitions and prunes data; you do not build indexes. You *can* define a clustering key on very large tables, but it's the exception, not the rule.
- **Time Travel** — query or restore a table as it existed up to 90 days ago (`SELECT ... AT(TIMESTAMP => ...)` or `UNDROP TABLE`), without a separate backup/restore process.
- **Zero-copy cloning** — `CREATE TABLE new CLONE old` (or clone a whole schema/database) creates an instant, metadata-only copy — no storage duplication until data diverges. This replaces the "restore prod backup to a dev/test environment" workflow you've had to script manually elsewhere.
- **Fail-safe** — a 7-day non-configurable disaster-recovery window behind Time Travel, Snowflake-managed only.
- **Secure Data Sharing & the Marketplace** — share live, query-ready data with another Snowflake account (or the public Marketplace) without copying or moving it. There's no ETL, no FTP, no replicated database — the consumer queries your data in place, governed by grants.
- **Semi-structured data as a first-class citizen** — the `VARIANT`, `OBJECT`, and `ARRAY` data types let you load raw JSON, XML, Avro, Parquet, or ORC without a rigid upfront schema, then query nested fields directly with dot/bracket notation (`payload:customer.address[0].zip::string`) alongside ordinary relational columns in the same `SELECT`. This is closer to what you're used to in Mongo, transplanted into a SQL engine — one of the more useful mental bridges for you specifically.
- **Editions** — Standard, Enterprise, Business Critical, and Virtual Private Snowflake, which gate features like multi-cluster warehouses, extended Time Travel, and enhanced security/compliance controls. Worth knowing which edition you're working in before you rely on a feature.

## A2. SQL on Snowflake — What Carries Over and What Doesn't

The good news: ANSI SQL fundamentals — `SELECT`, `JOIN`, `GROUP BY`, `CTE`s, window functions, subqueries — all work essentially as you'd expect. The differences that will actually trip up someone from your background cluster into a few buckets:

- **No traditional indexes, no `EXPLAIN PLAN` tuning the way Oracle/DB2 taught you.** Query performance tuning on Snowflake is about warehouse sizing, clustering keys on very large tables, result caching, and query pruning — not index selection. Unlearning "add an index" as the default reflex is the single biggest mental shift.
- **Transactions exist but concurrency control is different.** Snowflake supports standard `BEGIN`/`COMMIT`/`ROLLBACK` and ACID transactions on relational tables, but locking behavior differs from Oracle/DB2's row-level locking model — DML statements will queue rather than deadlock in most cases. There is no `SELECT ... FOR UPDATE` in the row-lock sense you're used to.
- **Multiple ways to write procedural code.** Snowflake Scripting (a `BEGIN...END` block extension to SQL, closest analog to PL/SQL/T-SQL) is the default for straightforward stored procedures. But you can also write stored procedures and UDFs in JavaScript, Python, Java, or Scala — all callable from plain SQL. For someone coming from PL/SQL or T-SQL, Snowflake Scripting will feel the most familiar starting point; Python UDFs/procedures (via Snowpark) are where you'll want to go next for anything involving libraries (pandas, scikit-learn, etc.) run *inside* Snowflake's compute rather than an external app server.
- **`MERGE` exists and is idiomatic** for upsert patterns (much like DB2/Oracle `MERGE`), and is commonly wrapped in stored procedures for dynamic, metadata-driven ETL.
- **No user-defined physical storage control** — no tablespaces, no partitioning syntax to hand-tune (clustering keys are the closest analog, and they're advisory, not physical).
- **Case sensitivity default differs**: unquoted identifiers are folded to uppercase by default (like Oracle/DB2), not lowercase (like Postgres) — worth knowing before your first `WHERE column_name` mismatch.
- **Semi-structured querying syntax** (`:`, `[]`, `LATERAL FLATTEN`) is new syntax with no direct analog in traditional RDBMS SQL, though conceptually similar to querying a Mongo document.

## A3. Built-In Functions & Platform Capabilities

Snowflake's SQL function library ([full alphabetical reference](https://docs.snowflake.com/en/sql-reference/functions-all), [functions by category](https://docs.snowflake.com/en/sql-reference/functions-categories)) is organized into these categories — worth treating as a checklist to work through rather than memorizing:

| Category | What it covers | Notes for your background |
|---|---|---|
| **Aggregate functions** | `SUM`, `COUNT`, `APPROX_COUNT_DISTINCT`, statistical aggregates | Mostly identical to what you know; approximate aggregates (`HLL`, `APPROX_PERCENTILE`) are the new, high-value additions for big-data speed/accuracy tradeoffs |
| **Window functions** | Ranking, moving aggregates, `LAG`/`LEAD`, frame clauses | Directly portable from Oracle/DB2/Postgres/SQL Server — same ANSI syntax |
| **Scalar — numeric, string, date/time** | Standard transformations | Mostly portable; watch for Snowflake-specific date/time functions (`DATEADD`, `DATEDIFF`, `TIME_SLICE`) and string functions (`SPLIT_PART`, `REGEXP_SUBSTR`) |
| **Conversion functions** | `TRY_CAST`, `TO_VARIANT`, explicit/implicit casting rules | `TRY_*` variants (return `NULL` instead of erroring) are used constantly in production Snowflake SQL — adopt this pattern early |
| **Semi-structured & structured data functions** | `FLATTEN`, `PARSE_JSON`, `OBJECT_CONSTRUCT`, `ARRAY_AGG` | This is genuinely new territory — budget real practice time here, it's a recurring exam and real-world topic |
| **Geospatial functions** | `GEOGRAPHY`/`GEOMETRY` types, `ST_*` functions | Niche unless your work touches location data, but appears on Advanced exams |
| **Table functions** | Functions returning row sets, `LATERAL` joins | Used heavily with `FLATTEN` and with Snowflake's information/metadata functions |
| **System / context / metadata functions** | `CURRENT_WAREHOUSE()`, `SYSTEM$CLUSTERING_INFORMATION()`, query history functions | Your DBA instincts will map naturally here — this is "administration via SQL" |
| **Data Metric Functions & Model Monitor functions** | Native data-quality checks and ML model monitoring | Newer additions (2025-2026 platform releases) worth a skim, not deep mastery, unless you move toward data engineering/governance work |
| **Cortex AI (AISQL) functions** | `AI_COMPLETE`, `AI_CLASSIFY`, `AI_SENTIMENT`, `AI_FILTER`, etc. | Covered in A5 below — these are SQL functions but conceptually a different animal (LLM inference inside a query) |

**Data types worth deliberately studying**: numeric precision/scale rules (`NUMBER(38,0)` default), `VARIANT`/`OBJECT`/`ARRAY` for semi-structured data, `TIMESTAMP_NTZ`/`_LTZ`/`_TZ` (a frequent source of bugs for people used to a single timestamp type), and the `GEOGRAPHY`/`GEOMETRY` spatial types.

## A4. Certification Path

Snowflake's certifications sit in two tiers. There is no formal "Associate" tier despite some third-party guides implying one — it's **Core**, then **five parallel Advanced tracks**, each requiring an active Core certification as a prerequisite.

### SnowPro Core (COF-C03) — start here regardless of specialization

| Attribute | Detail |
|---|---|
| Domains | (1) Snowflake AI Data Cloud Features & Architecture, (2) Account Management & Data Governance, (3) Data Loading, Unloading & Connectivity, (4) Performance Optimization, Querying & Transformation, (5) Data Collaboration |
| Format | 100 questions, multiple-choice/multiple-select, 115 minutes |
| Passing score | 750/1000 (scaled) |
| Cost | $175 USD |
| Prerequisites | None formally; ~6 months hands-on experience recommended |
| Validity | 2 years |
| Attempts | Up to 4 within 12 months |

### SnowPro Advanced tracks (choose based on your goals — all require active Core)

| Certification | Domains | Questions | Cost |
|---|---|---|---|
| **Advanced: Data Analyst** (DAA-C01) | Data Ingestion & Preparation; Data Transformation & Modeling; Data Analysis; Data Presentation & Visualization | 65, 115 min | $375 |
| **Advanced: Data Engineer** (DEA-C02) | Data Movement; Performance Optimization; Storage & Data Protection; Data Governance; Data Transformation | 65, 115 min | $375 |
| **Advanced: Architect** (ARA-C01) | Accounts & Security; Snowflake Architecture; Data Engineering; Performance Optimization | 65, 115 min | $375 |
| **Advanced: Data Scientist** | Data science principles/tools/methodologies on Snowflake (ML lifecycle, Snowpark ML, model deployment) | ~65, 115 min | $375 |
| **Advanced: Administrator** | Data cloud administration — account/security/cost management | ~65, 115 min | $375 |

**Recommended sequence for you specifically**: SnowPro **Core** first (validates the platform fundamentals in Part A1–A3), then **Advanced: Data Analyst** (directly matches your stated goals — SQL proficiency, functions, visualization) as your second certification. If your day-to-day work later shifts toward pipeline/ETL ownership, **Advanced: Data Engineer** is the natural third; **Architect** is the deepest and most demanding of the five and is worth targeting only after real production experience, not from study alone.

A note on the three official study-guide PDFs you linked: `learn.snowflake.com` blocks automated fetching of those specific PDF pages (robots.txt), so download them directly from your browser when you reach that stage of the plan — go to the certification's page on `learn.snowflake.com/en/certifications/`, and the "Study Guide" PDF link is on the page itself.

## A5. AI Capabilities — Cortex, Cortex Analyst/Search, and CoWork

This is the newest and fastest-moving part of the platform (the branding itself changed in 2026), so treat this section as directional rather than exam-precise, and verify current naming when you get there.

- **Cortex AI Functions (AISQL)** — plain SQL functions (`AI_COMPLETE`, `AI_CLASSIFY`, `AI_SENTIMENT`, `AI_SUMMARIZE_AGG`, `AI_FILTER`, `AI_REDACT`, etc.) that invoke LLM inference **row-by-row inside a normal `SELECT`**, without exporting data anywhere. This is the layer most directly useful to you day-to-day: classification, sentiment, summarization, and PII redaction become one more function call in a query you already know how to write.
- **Cortex Analyst** — converts natural-language business questions into SQL against a **semantic model** (a YAML file mapping business terms to your actual tables/columns/metrics). This is squarely a "data analyst" skill: the semantic model has to be built and curated by someone who understands the schema — that's you. Accuracy of natural-language querying is only as good as this model.
- **Cortex Search** — hybrid vector + keyword search over unstructured text (documents, PDFs, tickets) — the retrieval half of RAG chatbot patterns.
- **Cortex Code (CoCo)** — an AI pair-programmer embedded in Snowsight: writes/explains/debugs SQL, finds objects by description, answers cost/access questions, proposes diffs for your review.
- **Snowflake CoWork** (the 2026 rebrand/expansion of "Snowflake Intelligence") — a conversational agent for **business users**, sitting on top of Cortex Analyst/Search plus your semantic views: ask a plain-English question, get back an answer, chart, report, or automation ("turn this into a weekly report every Monday at 8am"). It also has a "Deep Research" mode that decomposes a complex question into cited sub-investigations. CoWork and CoCo share the same underlying agent infrastructure — CoWork is the business-user-facing surface, CoCo is the developer-facing surface.
- **Data products / Marketplace** — packaged, governed datasets (your own, or third-party via Snowflake Marketplace) that can be discovered and queried directly without ingestion pipelines — relevant to "data products" in your notes, and connects back to the Secure Data Sharing concept in A1.

The practical skill to build here isn't "prompt engineering" — it's **semantic modeling**: representing your schema's business meaning well enough that Cortex Analyst/CoWork answer correctly. That's a natural extension of the data modeling instincts you already have from 25+ years of relational design.

## A6. Building Visualizations

This is the one area where Snowflake's own native tooling is **mid-transition**, and it matters for your planning:

- **Snowsight** (`app.snowflake.com`) is the web UI that replaced the old Classic Console — you'll live here for query authoring (Workspaces, the modern SQL editor with Git integration), schema browsing (Catalog), and monitoring.
- **Legacy Dashboards** (simple SQL-driven charts/tiles inside Snowsight) exist today but Snowflake has announced their removal (mid-2026), with **Streamlit apps** as the recommended replacement.
- **Streamlit in Snowflake (SiS)** is therefore the strategically important skill for visualization: Python-based interactive apps/dashboards that run natively inside Snowflake's compute (no separate hosting, no data egress), reading data with ordinary SQL/Snowpark calls and rendering charts, filters, and layouts in pure Python. Given your SQL depth, the learning curve here is mostly "enough Python + Streamlit's simple widget API," not the data logic.
- **Snowflake Notebooks** support the same visual-storytelling pattern (SQL + Python + inline charts + markdown in one notebook) and are worth knowing as a lighter-weight alternative to a full Streamlit app for exploratory analysis.
- **Third-party BI tools** (Tableau, Power BI, Sigma, Looker) connect natively via Snowflake's connectors and remain the standard choice for enterprise dashboarding/self-service BI — worth knowing conceptually even if you focus your hands-on time on Streamlit.

---

# Part B — Annotated Resource List

### From Snowflake's own documentation and certification site (your links)

- [Databases, Tables & Views documentation overview](https://docs.snowflake.com/en/guides-overview-db) — covers table types (standard, temporary/transient, external, hybrid, Iceberg), view types (standard, secure, materialized), cloning, and storage cost considerations. **Read this first** — it's the backbone of Part A1.
- [Snowflake Certifications hub](https://learn.snowflake.com/en/certifications/) — the authoritative, always-current list of all six certifications (Core + 5 Advanced) and links to register/schedule exams.
- SnowPro Advanced study guides — [Data Analyst](https://learn.snowflake.com/en/certifications/snowpro-advanced-dataanalyst/?pdf_name=SnowProDataAnalystStudyGuide), [Data Engineer](https://learn.snowflake.com/en/certifications/snowpro-advanced-dataengineer-C02/?pdf_name=SnowProDataEngineerStudyGuide), [Architect](https://learn.snowflake.com/en/certifications/snowpro-advanced-architect/?pdf_name=SnowProArchitectStudyGuide) — download the PDFs directly from these pages when you reach the certification-prep phase; each is the official domain-by-domain syllabus.
- [Snowflake Resources hub](https://www.snowflake.com/en/resources/) — 350+ eBooks, whitepapers, webinars, and virtual hands-on labs; use it opportunistically for the AI-agent and semantic-layer whitepapers once you reach Part A5, and for instructor-led workshop listings if you want structured, scheduled training.

### YouTube videos you supplied

| Video | What it appears to be | Where it fits |
|---|---|---|
| ["What is Snowflake? Learn Snowflake in 30 Minutes"](https://www.youtube.com/watch?v=h78-o40MnRM) | Broad platform overview | Week 1 orientation |
| ["Learn Snowflake In 45 Mins \| Snowflake Tutorial \| Snowflake Explained"](https://www.youtube.com/watch?v=3BrL5S8Xg2s) | Broad platform/tutorial overview | Week 1 orientation (second opinion/reinforcement of the above) |
| [Video (nV1n06MAYM0)](https://www.youtube.com/watch?v=nV1n06MAYM0) | Could not be identified programmatically (YouTube blocked automated metadata lookups for this ID) | Preview it yourself early — likely another foundational/architecture video given its place in your list |
| ["Learn Snowflake – Full 1-Hour Crash Course for Complete Beginners"](https://www.youtube.com/watch?v=2t-ls6ekA8E) | Longer-form crash course | Week 1–2, as a more complete follow-up to the two shorter overview videos |
| [Snowflake Tutorial for Beginners playlist (edureka!)](https://www.youtube.com/playlist?list=PL9ooVrP1hQOFeNaSroVp1KJyTiUcvBl0E) | Structured beginner tutorial series | Weeks 1–3, work through alongside hands-on practice — good for filling gaps the overview videos skip |
| [Video (jdEOlWmkzjs)](https://www.youtube.com/watch?v=jdEOlWmkzjs) | Could not be identified programmatically | Preview early; likely a demo or feature-specific video |
| [Video (NXQUtwaS5A8)](https://www.youtube.com/watch?v=NXQUtwaS5A8) | Could not be identified programmatically | Preview early |
| ["Snowflake Cortex Analyst Tutorial — The 1 File That Makes or Breaks Your AI Agent (2026)"](https://www.youtube.com/watch?v=bZQqCzcVHac) | Hands-on Cortex Analyst / semantic-model tutorial | Directly maps to Part A5 — watch during the AI-capabilities week, ideally while building your own semantic model |
| [Video (zARMUTv_H5Y)](https://www.youtube.com/watch?v=zARMUTv_H5Y) | Could not be identified programmatically (search suggests it may be unavailable/region-restricted) | Check availability first; if unavailable, no substitute is needed given the depth of the other AI resources here |
| ["From Natural Language To Python: Advanced AI Data Analysis In Snowflake"](https://www.youtube.com/watch?v=8tBZ7ChYkvo) | Advanced Cortex/AI + Python data-analysis demo | Part A5/A6 crossover — natural language to analysis pipeline, watch after you're comfortable with Cortex Analyst basics |

*Four of the ten video links (`nV1n06MAYM0`, `jdEOlWmkzjs`, `NXQUtwaS5A8`, `zARMUTv_H5Y`) returned rate-limited or blocked responses from every method available in this session (direct fetch, YouTube oEmbed, and search) and could not be titled with confidence — rather than guess, they're flagged above so you can glance at them yourself in under a minute each and slot them into the plan.*

### Supplementary sources (found during research, not in your original list, filling specific gaps)

- [Summary of functions](https://docs.snowflake.com/en/sql-reference/intro-summary-operators-functions) and [Categories of functions](https://docs.snowflake.com/en/sql-reference/functions-categories) — official, authoritative structure behind the A3 table above.
- [All functions (alphabetical)](https://docs.snowflake.com/en/sql-reference/functions-all) — your day-to-day lookup reference once you're writing real queries.
- [Stored procedures overview](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview) and [Writing stored procedures in Snowflake Scripting](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-snowflake-scripting) — start here for A2's procedural-code section; closest analog to what you already know from T-SQL/PL-SQL.
- [certificationpractice.com exam-overview pages](https://certificationpractice.com/exam-overviews/) for [Core](https://certificationpractice.com/exam-overviews/snowflake-snowpro-core-quick-facts), [Data Analyst](https://certificationpractice.com/exam-overviews/snowflake-snowpro-advanced-data-analyst-quick-facts), [Data Engineer](https://certificationpractice.com/exam-overviews/snowflake-snowpro-advanced-data-engineer-quick-facts), and [Architect](https://certificationpractice.com/exam-overviews/snowflake-snowpro-advanced-architect-quick-facts) — third-party but consistent, structured source for the exam-format details in the A4 tables (Snowflake's own PDF study guides are the authoritative source for domain content — treat these as a fast-reference supplement, not a replacement).
- [Snowflake Cortex AI explained (Sqlism)](https://sqlism.com/snowflake-cortex-ai-explained) — the clearest single write-up found on Cortex Analyst / Search / AISQL / Cortex Code split, underlying Part A5.
- [Snowflake CoWork: what is it and how can I use it? (InterWorks)](https://interworks.com/blog/2026/08/13/snowflake-cowork-what-is-it-and-how-can-i-use-it/) and [Snowflake's own CoWork announcement](https://www.snowflake.com/en/blog/snowflake-cowork-personal-work-agent/) — direct source for the CoWork section of A5; also already referenced in this project's `INPUTS/snowflake_ai/research-references.md` from your earlier Snowflake AI architecture research.
- [What is Snowsight? (Coefficient)](https://coefficient.io/snowflake/what-is-snowsight) — source for the Dashboards-deprecation / Streamlit-migration note in A6.
- [Snowsight Dashboard in Streamlit](https://medium.com/snowflake/snowsight-dashboard-in-streamlit-7c3bb37d829f) and [A Guide to Visual Data Storytelling in Snowflake Notebooks](https://www.snowflake.com/en/developers/guides/visual-data-stories-with-snowflake-notebooks/) — practical starting points for the Streamlit-in-Snowflake hands-on deliverable in Part C.
- [Snowflake vs. Oracle vs. PostgreSQL architecture comparison](https://medium.com/@jramcloud1/snowflake-vs-oracle-vs-postgresql-a-deep-dive-into-architectures-7dd7218f1777) — background for the A1/A2 compute-model and extensibility comparisons.

---

# Part C — Study Plan with Milestones & Deliverables

Assumes roughly 5–7 hours/week. Adjust pacing freely — the milestones matter more than the calendar. Every phase ends with a **deliverable you can point to**, not just "watched videos," since that's the only reliable way to know the material actually stuck.

## Phase 1 (Weeks 1–2): Platform Orientation & Trial Account

- **Sign up for a free Snowflake trial account** (30 days, $400 credit) — do this on day one; everything else depends on having a hands-on environment.
- Read the [Databases, Tables & Views doc overview](https://docs.snowflake.com/en/guides-overview-db) (Part A1/B).
- Watch the two short overview videos plus the crash course (`h78-o40MnRM`, `3BrL5S8Xg2s`, `2t-ls6ekA8E`) and preview the four unidentified videos to slot them in.
- Start the edureka! beginner playlist alongside hands-on practice.
- **Milestone/Deliverable**: In your trial account, create a database, a schema, a standard table, a transient table, and a view; load a small semi-structured (JSON) sample and query one nested field with `:`/`FLATTEN`. Write up, in your own words (half a page is plenty), the storage/compute/cloud-services separation and one concrete way it changed how you'd approach a problem you've solved before in Oracle or SQL Server.

## Phase 2 (Weeks 3–4): SQL Mastery & Built-In Functions

- Work through Part A2 (SQL differences) and A3 (function categories) systematically — treat the function-category table as a checklist.
- Read [Stored procedures overview](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview) and write one procedure in Snowflake Scripting and one in Python.
- Deliberately practice: `MERGE`, window functions, `TRY_CAST`/`TRY_*` patterns, and at least one non-trivial `LATERAL FLATTEN` on nested JSON.
- **Milestone/Deliverable**: A small personal "cheat sheet" (one page) mapping 10–15 things you do routinely in Oracle/DB2/Postgres/SQL Server to their Snowflake equivalent — this becomes your fastest day-to-day reference and is genuinely useful exam prep for Core.

## Phase 3 (Week 5): SnowPro Core Certification

- Review the official Core domains (Part A4) against your Phase 1–2 notes; identify weak domains (governance and data sharing are the ones least like traditional DBA work — budget extra time there).
- Take 1–2 practice exams from a source of your choice.
- **Milestone/Deliverable**: Sit the SnowPro Core (COF-C03) exam.

## Phase 4 (Weeks 6–7): AI Capabilities — Cortex, Cortex Analyst, CoWork

- Read Part A5 and the Cortex/CoWork sources in Part B.
- Watch the Cortex Analyst tutorial (`bZQqCzcVHac`) and the natural-language-to-Python video (`8tBZ7ChYkvo`).
- Build a small **semantic model** (YAML) over 2–3 tables in your trial account and get Cortex Analyst answering natural-language questions correctly against it. Try at least one `AI_COMPLETE`/`AI_CLASSIFY`/`AI_SENTIMENT` call directly in a `SELECT`.
- **Milestone/Deliverable**: A working semantic model + a short list of 5 natural-language questions it answers correctly, plus one SQL query using an AISQL function on sample data.

## Phase 5 (Week 8): Visualization

- Read Part A6 and the Streamlit-in-Snowflake sources in Part B.
- Build one small Streamlit-in-Snowflake app that queries a table (or the semantic model data from Phase 4) and renders at least two chart types plus a filter widget.
- **Milestone/Deliverable**: A running Streamlit-in-Snowflake app you can demo, plus a one-paragraph note on when you'd reach for Streamlit vs. a third-party BI tool.

## Phase 6 (Weeks 9–10): SnowPro Advanced: Data Analyst Certification

- This track directly matches your stated goals (SQL proficiency + functions + visualization), and Phases 2–5 already cover most of its four domains.
- Focus remaining study time on **Data Presentation & Visualization** and **Data Analysis** domains specifically, since those are the least covered by Core-level study.
- Download the official [SnowPro Advanced Data Analyst study guide PDF](https://learn.snowflake.com/en/certifications/snowpro-advanced-dataanalyst/?pdf_name=SnowProDataAnalystStudyGuide) directly from the certifications site and work through it domain by domain.
- **Milestone/Deliverable**: Sit the SnowPro Advanced: Data Analyst (DAA-C01) exam.

## Ongoing / Optional Next Steps

- If your work shifts toward pipeline ownership: pursue **SnowPro Advanced: Data Engineer** next, leaning on the stored-procedure and data-movement material you already built in Phase 2.
- Track platform changes: Cortex/CoWork naming and capabilities are moving quickly in 2026 — re-check `snowflake.com/en/blog` and the certifications hub every few months rather than treating Part A5 as static.
- Recertification is required every 2 years for every SnowPro credential — put a calendar reminder now rather than discovering it later.

---

*This guide and its research notes live in the `research_a_subject` project. This document (`snowflake_rd_study_guide.md`) is saved under `OUTPUTS/`. It builds on and complements the earlier Snowflake AI architecture deep-dive already in this project (`OUTPUTS/snowflake_ai_research.pptx` and `OUTPUTS/from_prompt_to_data_snowflake_ai_architecture.pptx`), which covered the healthcare-migration and CoWork-vs-AWS-Bedrock scenario in depth — this document is the personal upskilling/certification companion to that research.*
