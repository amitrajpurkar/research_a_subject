# Snowflake as the Benchmark: XtremeData, Spice.ai, K2View and In-House Build

**Date:** September 28, 2026
**Prepared by / for:** Enterprise Architecture (EA) team
**Question:** Snowflake is our enterprise data platform, and we subscribe to its AI capabilities (Cortex and CoCo). Which additional vendors, if any, are **must-have**? Which are only **nice-to-have** gaps that our in-house development teams can bridge?

**Inputs used:**
- `INPUTS/snowflake_ai/from_meetings/XtremeData_vs_SpiceAI_vs_Snowflake_vs_InHouse_20260921.md` (prior comparison, extended here)
- Vendor meeting minutes: `XTREMEDATA_CONNECT_minutes_20260921.md`, `SPICEAI_minutes_20260921.md`, `K2VIEW_minutes_20260922.md`
- EA evaluation criteria and platform context: `INPUTS/snowflake_ai/SPEC_pattern_vendor_evaluation.md`
- Web research, September 2026 (sources in §12)

> **How to read this report.** Snowflake is the **baseline**. Every other option is judged by one question: *what does it add that Snowflake, as licensed, cannot do, and can our own engineers close that gap instead?* Scores and verdicts are EA judgement based on vendor sessions and public sources. They should be confirmed with a proof of concept (POC) before any contract.

---

## 1. Executive Summary

**Bottom line: none of the three vendors is a must-have today.** Snowflake, with Cortex, CoCo, CoWork, Openflow and Horizon, already covers most of what the vendors pitched. It does so inside a platform we have already paid for and are standardizing on.

| Option | Niche it owns | Overlap with Snowflake | EA verdict | Can in-house bridge the gap? |
|---|---|---|---|---|
| **Snowflake** (+ Cortex, CoCo, CoWork) | Unified, governed data and AI platform | Baseline | **Anchor platform. Maximize use before adding vendors** | n/a |
| **K2View** | Real-time, per-entity operational data products (Member 360 in milliseconds, with write-back) plus test data management (TDM), masking and synthetic data | **Low**: Snowflake is analytics-first | **Conditional must-have.** Becomes must-have only if a real-time member-facing use case or an enterprise TDM mandate is committed. Run a POC | **Partly.** Moderate-latency Member 360 is buildable; per-entity micro-databases and cross-system TDM are not practical to build |
| **XtremeData** | 100% full-fidelity data profiling and "data reality grounding" across source systems before data lands | **Medium**: Snowflake data quality (DMFs), profiling, semantic views, Cortex Sense (preview) | **Nice-to-have (tactical).** Useful for migrations and source-system data quality. Not a platform component | **Largely yes**, using Snowflake native features plus open-source profilers |
| **Spice.ai** | Lightweight, open-source federation and CDC acceleration sidecar per AI agent; runs anywhere | **High**: Openflow CDC, Snowflake Postgres, managed MCP, Cortex Search | **Nice-to-have. Defer.** Reconsider only in the Data Virtualization pattern decision | **Yes.** The core is Apache 2.0, and Snowflake already covers most needs |
| **In-house build** | Glue: MCP servers, profiling scripts, caching and FHIR façades on top of Snowflake | n/a | **Use for targeted gaps only** | n/a |

**Why this matters for EA's core values:** Adding a fourth data plane next to Snowflake works against *cost efficient*, *predictable* and *frictionless*. The one exception with real potential is K2View. Its niche, real-time per-member operational data, is something Snowflake does not target. It could directly serve the CIO's "N-of-1" personalized member-experience vision, so EA should prove it before buying it.

---

## 2. Evaluation Lens

### 2.1 EA evaluation criteria (from the pattern-evaluation spec)
1. Enterprise adaptability
2. Portability between cloud vendors and on-premise
3. Operating costs
4. Complexity and technology rationalization
5. Functional completeness across enterprise domains
6. Value-realization potential

This report adds a seventh criterion that decides this question: **7. Distinct gap filled beyond Snowflake.**

### 2.2 CIO core values for EA
Predictable · Cost efficient · Stability · Future proof · Frictionless (people/technology) · **High velocity**.
*"EA is the business enabler delivering value quickly at the right time in a secure and cost-efficient way."*

### 2.3 Definition of "must-have"
A vendor is a **must-have** only if all four conditions hold:
1. **Committed business need.** A funded, business-critical use case depends on it.
2. **Snowflake cannot meet it.** Not with generally available (GA) features, and not on a credible roadmap within about 2 quarters.
3. **In-house cannot bridge it.** Not at acceptable cost, risk and time-to-value.
4. **Enterprise-ready.** A signed HIPAA BAA, a security review, and a viable vendor.

If a vendor fails any condition, it is **nice-to-have** or **not needed**.

---

## 3. Snowflake as the Unified Data Platform (the Benchmark)

### 3.1 What the platform covers today

| Layer | Snowflake capability | Status (Sept 2026) | Relevance to the three vendors |
|---|---|---|---|
| **Ingestion and CDC** | **Openflow** (batch and streaming integration, CDC connectors), Snowpipe Streaming, **Zero-Copy Integrations** (SAP, Salesforce, Workday, etc.), **Datastream** (Kafka-compatible) | Openflow GA; Zero-copy GA; Datastream private preview | Overlaps Spice.ai CDC and K2View sync |
| **Open storage** | Apache **Iceberg v3** tables, Snowflake storage for Iceberg; medallion lakehouse (Bronze → Silver → Gold) | GA | Reduces lock-in concerns; lets other engines read the same data |
| **Operational and low-latency** | **Hybrid tables** (Unistore; fast key-based row reads and writes, roughly 16K ops/sec per database cited), **Snowflake Postgres** (managed Postgres, CDC mirroring into Iceberg), **interactive warehouses** | Hybrid tables GA; Snowflake Postgres available; interactive zero-copy GA (Sept 14, 2026) | Partial answer to K2View / Spice.ai low-latency serving |
| **Governance (Horizon)** | Sensitive-data classification, masking and row-access policies, lineage, **Horizon Context** (business semantics), **AI Agent Identity**, Trust Center AI security posture | Most GA; Horizon Context announced; AI Security Posture public preview | Overlaps K2View runtime PII governance and Spice.ai Cedar policies, for data **inside Snowflake** |
| **Data quality** | **Data Metric Functions** (about 40 system DMFs), expectations, anomaly detection (row count, freshness), **Cortex Data Quality** (AI-suggested checks), Snowsight profiling | GA / preview | Overlaps XtremeData, but only for data **inside Snowflake** |
| **Privacy and test data** | Dynamic masking, **GENERATE_SYNTHETIC_DATA** (join-key consistency, privacy filter), data clean rooms | Synthetic data GA (Enterprise Edition); limits: 5 tables per call, 100 columns, 14M rows | Partial overlap with K2View TDM/synthetic data |
| **AI: Cortex** | Cortex AI SQL functions, **Cortex Search** (hybrid search), **Cortex Analyst** plus semantic views, **Cortex Agents**, **Snowflake-managed MCP server**, **Cortex Sense** (runtime context layer), Cortex Training (fine-tuning), frontier models (e.g., Anthropic Claude) | Search, Analyst, Agents and MCP GA; Sense private preview; Training announced | Overlaps Spice.ai hybrid search/MCP and XtremeData "grounding" |
| **AI agents** | **CoCo** (formerly Cortex Code): data-native coding agent in Snowsight, Desktop, VS Code, Excel and **Claude Code**; **CoWork** (formerly Snowflake Intelligence): knowledge-worker agent with Deep Research, Skills, Artifacts and MCP connectors; **Managed Agents** | CoCo GA (7,100+ accounts at launch); CoWork shipping | No vendor in this comparison offers an equivalent |
| **Compute and cost** | **Adaptive Compute** (auto-sizing), consumption credits | "GA soon" | Cost predictability remains the top review complaint |

### 3.2 What our Cortex and CoCo subscription gives us
- **CoCo**: data engineers and analysts get schema-, RBAC- and lineage-aware generation of SQL, dbt, Airflow and ML pipelines. It works inside the tools our team already uses, including a **Claude Code plugin**. This largely removes the case for building a developer copilot in-house.
- **Cortex Search, Analyst and Agents plus the managed MCP server**: governed retrieval-augmented generation (RAG), text-to-SQL and agent access to Snowflake data, with Horizon policies inherited automatically. This covers most of the "AI agents need governed data" pitch that Spice.ai makes.
- **CoWork**: the business-user agent layer. It is the hardest piece to build in-house, and none of the three vendors has an equivalent.
- **Pricing caution:** Cortex and CoCo are **consumption (credit) based**. Public sources say CoCo pricing is not fully disclosed. Confirm with the Snowflake account team exactly which Cortex, CoCo and CoWork entitlements are in our contract, and at what rates.

### 3.3 Where Snowflake is weaker: the gaps niche vendors target

| # | Gap | Why it exists | Who targets it |
|---|---|---|---|
| G1 | **Millisecond per-entity operational serving with write-back** to systems of record (e.g., live Member 360 for a call-center agent or member app) | Snowflake is analytics-first. Hybrid tables and Snowflake Postgres help, but neither is an entity-centric operational data hub with write-back to source systems | **K2View** |
| G2 | **Data quality and profiling *before* data lands**, on Oracle, DB2, Teradata, SQL Server and files | DMFs and profiling reach only Snowflake objects | **XtremeData** |
| G3 | **Live federation over operational databases without replication**; edge, air-gapped or per-agent isolated runtimes | Snowflake is managed SaaS, and data generally needs to land in it | **Spice.ai** |
| G4 | **Enterprise TDM**: subsetting, masking and synthetic data across many source systems with referential integrity | Snowflake synthetic data is capped (5 tables, 100 columns, 14M rows) and covers only Snowflake data | **K2View** (about half its business) |
| G5 | **Cost predictability and lock-in** | Consumption pricing; proprietary stack (reduced by Iceberg) | Spice.ai (open source), in-house |

---

## 4. Vendor Profiles, Benchmarked Against Snowflake

### 4.1 K2View (new in this comparison)

**Who they are:** A data product platform about 16 years old, serving large enterprises. Named customers in the session: AT&T, Verizon, Walmart, TJX and Charles Schwab. Revenue splits roughly 50/50 between (a) test data, synthetic data, anonymization and AI-agent evaluation, and (b) real-time agentic and operational use cases. The vendor states explicitly: **"not an analytics platform."** Raised $15M from Trinity Capital (June 2025). K2View reports being named a *Visionary* in Gartner's 2025 Magic Quadrant for Data Integration Tools.

**Core architecture: the micro-database.**
- One micro-database per business entity (member, policy, claim). For example, 30M members means 30M micro-databases, each compressed about 90–95% and stored on S3 or Azure Blob.
- On query, the blob loads into RAM in 1–2 ms. Demo query times were **1–18 ms**, with no large table scans.
- **Per-entity encryption keys** (e.g., 40M members = 40M keys, even in memory).
- Schema changes deploy in under 1 second through a lazy upgrade. **Historical versioning** reconstructs a member's data as of any past date.

**Sync and freshness:** Four modes per object (cached, forced, delta, on-demand). Streams from GoldenGate, Debezium, Kafka or nightly batch. Predictive pre-fetch. **Write-back** to systems of record.

**Delivery:** SQL, REST, **MCP** (each data product is exposed as an MCP server), RAG, **HL7, FHIR**, Kafka and JSON push. Natural-language, low-code creation of data products. Runtime governance controls which PII reaches LLMs versus end users.

**Healthcare fit:** "Member 360" fits the architecture well. It handles real-time entity resolution and can **use existing Trillium batch matching output** instead of replacing it. **FHIR examples with health-insurance customers are still pending** from K2View. Its public healthcare page lists no FHIR or payer references.

**Deployment and pricing:** Consumption pricing for the cloud edition (micro-DB reads and writes, storage). Production environments start at about **$8K/month**. The Enterprise edition adds hybrid clusters, VPC isolation and **HIPAA/PCI/FIPS compliance support**. Also available on-premises, in private cloud, and on bring-your-own Kubernetes, with AWS, Azure and GCP marketplace billing.

**Reviews:** **4.8/5 on Gartner Peer Insights (132 ratings)** and **4.6/5 on G2 (55 reviews)**. Reviewers praise the micro-DB approach, referential integrity, real-time sync and masking. They criticize the **steep learning curve**, **long and complex implementation**, "exhaustive" production maintenance, and gaps between presales promises and POC results.

**Against the Snowflake benchmark:**
- **Fills G1 and G4**, which Snowflake does not target.
- **Duplicates** part of Snowflake governance and ingestion, and would introduce a second copy of member data to govern.
- **Not a replacement** for any Snowflake analytics capability.

### 4.2 XtremeData

**Niche:** "Data reality grounding." A zero-copy engine that scans **100% of data** (no sampling), computes 50+ statistics per column plus value patterns and outliers, and feeds that "what the data actually contains" metadata to AI and to data pipelines. It augments semantic layers and catalogs rather than replacing them.

**Strengths shown (Sept 21 demo):** 29M rows profiled in about 25 seconds on one $1.69/hr instance; 1B records processed for under $1. Schema and data drift detection. Byte-level anomaly detection. Query-level profiling as an audit trail. Broad source coverage (Oracle, SQL Server, Teradata, DB2, SAP HANA, Snowflake, Databricks and others). Deployable behind the firewall. 400+ APIs.

**Gaps and risks:** HIPAA/industry **classification is roadmap only**. No agent product. No public user reviews. Very early market presence. Pricing not published.

**Against the Snowflake benchmark:**
- **Fills G2**, profiling at the source before migration or ingestion. That is useful for legacy-to-Snowflake migrations and for "consolidation readiness" (e.g., customer address health across systems).
- **Inside Snowflake**, DMFs, Cortex Data Quality, semantic views and the upcoming **Cortex Sense** and **Horizon Context** already address grounding and quality. That shrinks XtremeData's unique value over time.

### 4.3 Spice.ai

**Niche:** An open-source (Apache 2.0), Rust-based SQL federation, acceleration and AI-grounding runtime. It is light enough to run **one isolated instance per agent**, anywhere, including on-premises, air-gapped and edge.

**Updates since the prior report:** **Spice v2.0 stable (June 5, 2026)** added native CDC (Postgres WAL, MongoDB change streams, durable Kafka offsets), **Cayenne accelerator GA** (MERGE INTO, partitioning), **distributed query GA** (Ballista), MCP streamable HTTP, and **Cedar-based row and column authorization** (enterprise edition). It also added new connectors, including Cosmos DB, Elasticsearch and DuckLake, plus Snowflake catalog discovery.

**Against the Snowflake benchmark:**
- **Fills G3 and G5**: live federation without landing data, run-anywhere deployment, and low cost.
- **High overlap** with Openflow CDC, Snowflake Postgres, Cortex Search and the managed MCP server.
- Adopting it would add a **parallel data plane**, which runs against our rationalization goal. It also belongs in the separate **Data Virtualization** pattern decision (Denodo, Starburst, Dremio, etc.), not here.

### 4.4 In-house build

Our engineering teams can assemble federation (DataFusion/Trino), caching (DuckDB/Redis), MCP servers, profiling (Great Expectations, Soda, ydata-profiling) and FHIR façades on Snowflake Postgres or hybrid tables.

- **Good at:** glue and targeted gaps.
- **Poor at:** a CoWork-equivalent agent layer, per-entity encrypted micro-database technology, enterprise TDM across dozens of source systems, and very-large-scale full-fidelity profiling. These are multi-year product efforts with ongoing maintenance.

---

## 5. Capability Matrix: Snowflake Baseline vs. Others

**Legend:** **▲** exceeds Snowflake · **=** roughly on par or overlapping · **▼** below Snowflake · **—** not offered

| Capability | Snowflake (baseline) | XtremeData | Spice.ai | K2View | In-house |
|---|---|---|---|---|---|
| Analytics / lakehouse at scale | Market leader (medallion, Iceberg v3) | — | ▼ lightweight lakehouse | — (explicitly not analytics) | ▼ |
| Batch and streaming ingestion / CDC | Openflow, Snowpipe Streaming | — | = native CDC (v2.0) | = GoldenGate/Debezium/Kafka sync | ▼ build on Debezium |
| Live federation without landing data | Limited (zero-copy for select SaaS; Iceberg) | ▲ reads at source (for profiling only) | **▲** core strength | = virtualization in data products | = Trino/DataFusion |
| Millisecond per-entity operational serving | Hybrid tables / Postgres (moderate) | — | = local acceleration | **▲** 1–18 ms micro-DB | ▼ Redis + Postgres |
| Write-back to systems of record | — | — | — | **▲** | ▼ custom |
| Data quality and profiling | DMFs, Cortex DQ (in Snowflake only) | **▲** 100% scan, any source, drift | — | ▼ | ▼ OSS profilers |
| AI grounding / semantic context | Cortex Analyst, semantic views, Cortex Sense (preview) | = statistical "reality" metadata | = hybrid search, text-to-SQL | = entity-scoped context for LLMs | ▼ |
| Hybrid / vector search | Cortex Search | — | = BM25 + vector | = RAG over data products | = pgvector/OpenSearch |
| MCP exposure for agents | Managed MCP server (GA) | ▼ APIs | = MCP server/client | = every data product as MCP | = custom MCP |
| Developer agent (CoCo) | **Yes** (incl. Claude Code) | — | — | ▼ NL data-product builder | ▼ |
| Business-user agent (CoWork) | **Yes** | — | — | — | ▼ heavy lift |
| Governance, PII, masking | Horizon (classification, masking, row access, agent identity) | = RBAC; classification on roadmap | = Cedar policy (enterprise) | **▲** per-entity keys, runtime LLM PII control | ▼ |
| TDM / synthetic data | Synthetic data (5 tables, 100 cols, 14M rows) | ▼ de-identification module | — | **▲** core business line | ▼ |
| Healthcare interoperability (HL7/FHIR) | Via partners / custom | — | — | = claims HL7/FHIR; **proof pending** | = custom FHIR façade |
| Deployment portability | Managed SaaS (AWS/Azure/GCP) | ▲ cloud, on-prem, K8s | ▲ anywhere, air-gapped | ▲ cloud, on-prem, hybrid, K8s | ▲ |
| Cost model | Consumption credits (top complaint: spikes) | Low compute cost; pricing undisclosed | OSS free; Cloud/Enterprise tiers | Consumption; prod from ~$8K/mo + implementation | Engineering FTE + run cost |
| Market proof / reviews | G2 4.6 (762), Gartner 4.7 (458) | No reviews yet | AIChief 4.6 | Gartner 4.8 (132), G2 4.6 (55) | n/a |

---

## 6. Niche Focus Areas and Healthcare Use Cases

| Vendor | Special / niche area | Healthcare use case where it could shine | Snowflake-native alternative first |
|---|---|---|---|
| **K2View** | Entity-centric real-time operational data products; TDM and synthetic data | Real-time **Member 360** for care-management and call-center agents (Jiva, Care Connect); member app personalization ("N-of-1"); **production-like masked test data** for claims and care systems | Hybrid tables or Snowflake Postgres serving layer; `GENERATE_SYNTHETIC_DATA` for smaller datasets |
| **XtremeData** | Full-fidelity profiling, drift detection, and grounding metadata across heterogeneous sources | Profiling legacy claims and enrollment sources **before** migration to Snowflake; regulator-grade audit trail of reporting queries; claims data quality at source | DMFs, Cortex Data Quality, semantic views after landing |
| **Spice.ai** | Per-agent isolated federation and acceleration runtime; run anywhere | Agents needing live reads across many small operational databases without building pipelines; edge or air-gapped sites | Openflow CDC into Snowflake plus managed MCP / Cortex Agents |

---

## 7. Scoring Against EA Criteria (0–4, equal weights)

Scale: 0 = none · 1 = weak · 2 = adequate · 3 = strong · 4 = best-in-class. The vendor scores reflect the **incremental** value of adding each option to our Snowflake estate.

| # | Criterion | Snowflake (baseline) | K2View | XtremeData | Spice.ai | In-house |
|---|---|---|---|---|---|---|
| 1 | Enterprise adaptability | 4 | 3 | 2 | 3 | 3 |
| 2 | Portability (cloud / on-prem) | 2 | 4 | 4 | 4 | 4 |
| 3 | Operating costs | 2 | 2 | 3 | 4 | 2 |
| 4 | Complexity and rationalization | 4 | 2 | 3 | 1 | 2 |
| 5 | Functional completeness | 4 | 3 | 1 | 2 | 2 |
| 6 | Value-realization potential | 4 | 3 | 2 | 2 | 2 |
| 7 | **Distinct gap filled beyond Snowflake** | n/a | **3** | 2 | 1 | 2 |
| | **Total (criteria 1–6, max 24)** | **20** | **17** | **15** | **16** | **15** |
| | **Total incl. criterion 7 (max 28)** | n/a | **20** | **17** | **17** | **17** |

**Reading the scores:** Snowflake leads on everything except portability and cost. **K2View** scores highest among the add-ons because it fills gaps Snowflake does not target (G1, G4). **Spice.ai** scores well on cost and portability but low on rationalization, because it duplicates Snowflake. **XtremeData** is cheap and non-invasive but narrow.

---

## 8. Must-Have vs. Nice-to-Have: Applying the Test

| Test (§2.3) | K2View | XtremeData | Spice.ai |
|---|---|---|---|
| 1. Committed business need? | **Not yet.** Member 360 real-time and TDM are candidate use cases, not funded commitments | No committed need; useful during migrations | No committed need |
| 2. Snowflake cannot meet it? | **True** for millisecond per-entity serving with write-back and cross-system TDM | Partly. True only for pre-landing source profiling | Mostly false. Openflow, Postgres, MCP and Cortex cover most of it |
| 3. In-house cannot bridge it? | Partly true. Moderate-latency 360 is buildable; micro-DB and TDM are not | False. OSS profilers plus DMFs bridge most of it | False. Its OSS core *is* the in-house path |
| 4. Enterprise-ready (BAA, viability)? | Likely. Enterprise edition lists HIPAA support; **confirm BAA and FHIR references** | Unproven. Early-stage; HIPAA classification on roadmap | OSS is mature; enterprise tier SOC 2; **confirm BAA** |
| **Verdict** | **Conditional must-have → POC** | **Nice-to-have (tactical)** | **Nice-to-have → defer** |

---

## 9. Can In-House Development Bridge the Gaps?

| Gap | Snowflake-native first step | In-house bridge | Effort | Verdict |
|---|---|---|---|---|
| G1: Real-time Member 360 | Hybrid tables or Snowflake Postgres serving layer, fed by Openflow CDC | Member API/FHIR façade + Redis cache + entity-resolution service (reuse Trillium output) | **L** for sub-50 ms at 30M+ members with write-back | **Partial.** OK for seconds-level freshness and read-only; K2View needed for millisecond latency, per-entity encryption and write-back at scale |
| G2: Source-system profiling | DMFs and Cortex DQ after landing | Great Expectations / Soda / ydata-profiling jobs against sources; drift checks in pipelines | **S–M** | **Yes.** Scale and 100% fidelity are lower than XtremeData, but adequate |
| G3: Live federation / per-agent runtime | Openflow CDC + managed MCP + Cortex Agents | Spice.ai OSS or Trino in a sandbox, only where replication is not allowed | **M** | **Yes** |
| G4: Enterprise TDM | `GENERATE_SYNTHETIC_DATA` + masking policies for Snowflake-resident data | Subsetting and masking scripts per source system | **L**, with a high risk of referential-integrity errors and PHI leakage into non-prod | **Weak.** Buy if TDM becomes an enterprise mandate (K2View or a dedicated TDM tool) |
| Developer copilot | **CoCo** (subscribed; Claude Code plugin) | Custom MCP servers | S | Use CoCo. Don't build |
| Business-user agent | **CoWork** | Multi-agent orchestration | XL | Use CoWork. Don't build |

---

## 10. Alignment with CIO Core Values

| Core value | Implication for this decision |
|---|---|
| **High velocity** | Turn on the Snowflake capabilities we already pay for (CoCo, CoWork, Cortex Search/Analyst, DMFs, synthetic data) before starting new vendor onboarding |
| **Cost efficient** | Avoid parallel data planes (Spice.ai) and narrow point tools (XtremeData) that duplicate Snowflake spend. Put the K2View spend behind a proven use case |
| **Predictable** | One governed platform with Horizon policies. Each new vendor adds its own policy engine (Cedar, per-entity keys, RBAC) that must be kept consistent |
| **Stability** | K2View reviews flag complex implementation and maintenance. Budget for it, or don't start |
| **Future proof** | Iceberg v3 and MCP keep options open. A vendor can be added later without re-platforming |
| **Frictionless** | CoCo already lives in our developers' tools (Claude Code, VS Code). CoWork gives business users direct, governed access |

---

## 11. Recommendations and Next Steps

### Now (0–30 days)
1. **Maximize the Snowflake subscription.** Confirm Cortex, CoCo and CoWork entitlements and rates with the Snowflake account team. Ask for roadmap dates for **Cortex Sense** and **Horizon Context**, and request cost guardrails (budgets, Adaptive Compute).
2. **K2View follow-up (already an action item).** Hold the ~45-minute session on **TDM, synthetic data and masking**, and obtain **FHIR examples with health-insurance customers**.
3. **Define the trigger use cases in writing:** (a) real-time Member 360 for care management and call-center agents, with a latency SLA; (b) enterprise TDM for claims and care systems. No committed use case means no K2View purchase.

### Next (30–90 days)
4. **K2View POC**, time-boxed to about 6–8 weeks. Scope: 1–5M members, sourcing from 3 systems (e.g., CRM, claims, Jiva), with FHIR/MCP delivery. Run a **Snowflake-native baseline** (hybrid tables/Postgres) side by side. Success criteria: p95 latency, freshness, write-back, PII controls, implementation effort, and total cost vs. baseline.
5. **XtremeData: optional tactical pilot** only if a legacy-to-Snowflake migration needs source-side profiling. License per engagement, not as a platform. Require the HIPAA classification roadmap date first.
6. **Spice.ai: no contract.** Attend the scheduled demo for awareness, and carry its findings into the **Data Virtualization** pattern decision. The in-house team may prototype the OSS core in a sandbox if a no-replication requirement appears.

### Later (90+ days)
7. Make a **go / no-go on K2View** based on the POC and a committed business case. Otherwise, close the gap with the Snowflake-native plus in-house serving layer.
8. Publish **reference patterns**: "Snowflake-first data for AI agents" (Cortex Agents + managed MCP + Horizon), and "Operational Member 360" (the chosen option).

### Open questions
- Which Cortex, CoCo and CoWork features are in our contract, and what is the credit consumption forecast?
- Will a HIPAA BAA be signed by K2View, XtremeData and Spice.ai (Cloud/Enterprise) for PHI workloads?
- What latency SLA does the business actually need for Member 360: seconds or milliseconds?
- Is enterprise TDM funded, and who owns non-production data privacy today?

### Carried-over meeting action items
| Vendor | Item | Owner |
|---|---|---|
| K2View | Follow-up session on test data, synthetic data and masking | Amit / team |
| K2View | FHIR API examples with health insurance customers | K2View |
| XtremeData | Natural-language SQL demo on grounded metadata | Jay Desai; next steps via Marc |
| Spice.ai | EA product demo; confirm attendees | Vladi Semenov; Amit |

---

## 12. Sources

**Meeting minutes and prior work (local):** `K2VIEW_minutes_20260922.md`, `SPICEAI_minutes_20260921.md`, `XTREMEDATA_CONNECT_minutes_20260921.md`, `XtremeData_vs_SpiceAI_vs_Snowflake_vs_InHouse_20260921.md` (includes earlier sources on XtremeData, Spice.ai reviews and Snowflake ratings).

**K2View**
- [Gartner Peer Insights: K2view Data Product Platform](https://www.gartner.com/reviews/product/k2view-data-product-platform)
- [G2: K2View reviews](https://www.g2.com/products/k2view/reviews)
- [K2View pricing](https://www.k2view.com/platform/pricing)
- [K2View MCP integration](https://www.k2view.com/solutions/mcp-integration/)
- [K2View healthcare solutions](https://www.k2view.com/solutions/healthcare/)
- [K2view secures $15M (June 2025)](https://www.k2view.com/news-blog/k2view-secures-15m-to-fuel-the-next-generation-of-agentic-ai-powered-by-ai-ready-data)

**Snowflake**
- [Flexera: Snowflake Summit 2026 recap](https://www.flexera.com/blog/perspectives/snowflake-summit-2026/)
- [Atlan: Snowflake CoCo explained](https://atlan.com/know/snowflake/snowflake-coco/)
- [Snowflake CoWork product page](https://www.snowflake.com/en/product/snowflake-cowork/)
- [Claude plugin: Snowflake Cortex Code](https://claude.com/plugins/snowflake-cortex-code)
- [Seemore Data: Cortex Code features and pricing](https://seemoredata.io/blog/snowflake-cortex-code-complete-guide-to-features-pricing-implementation-2026/)
- [Snowflake docs: synthetic data](https://docs.snowflake.com/en/user-guide/synthetic-data)
- [Snowflake docs: managed MCP server](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp)
- [Snowflake docs: interactive zero-copy GA (Sept 14, 2026)](https://docs.snowflake.com/en/release-notes/2026/other/2026-09-14-interactive-zero-copy-ga)
- [Snowflake docs: hybrid tables](https://docs.snowflake.com/en/user-guide/tables-hybrid)
- [InterWorks: Snowflake Postgres (Sept 2026)](https://interworks.com/blog/2026/09/25/bridging-transactional-and-analytical-worlds-with-snowflake-postgres)
- [Ataccama: Snowflake native data quality and limits](https://www.ataccama.com/blog/snowflake-data-quality-explained-from-native-capabilities-to-estate-wide-data-trust-with-ataccama)

**Spice.ai**
- [Spice v2.0-stable release notes (June 5, 2026)](https://spiceai.org/releases/v2.0-stable)
- [Spice.ai GitHub](https://github.com/spiceai/spiceai)
