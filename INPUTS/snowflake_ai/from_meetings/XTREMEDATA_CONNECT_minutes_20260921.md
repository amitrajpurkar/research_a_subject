# XtremeData Connect Vndr Eval — Meeting Minutes

**Date:** September 21, 2026, 11:01 AM EDT
**Participants:**
- Vendor: Jay Desai (co-founder, XtremeData)
- ECMS team: Paul Patterson, Courtney Williams, Tye Murphy
- InterOp team: Joseph Magish
- EA team: Marc, Raj, Duane, Satya, Neeraj, Don, Darshika, Aaron, Sameer

---

## 1. XtremeData Background

- Jay Desai has 35 years in data; previously founded Night Screen Solutions (data warehousing, 750 people), sold to HP and became HP's BI business.
- XtremeData is focused on foundational capability for moving and understanding data at scale.

## 2. Core Problem: Data Reality Grounding

- "The most expensive error is a wrong answer that looks right."
- AI today uses assumption-driven reasoning on enterprise data, producing results that are syntactically correct but semantically wrong (e.g., a query for "active high credit risk customers in NJ" returned 317 vs. the correct count due to status code and state abbreviation variance).
- Data reality grounding is a new architectural layer that auto-discovers actual data content before AI reasons over it:
  - Not authored by humans, not sampled — scans 100% of data.
  - Computes 50+ statistical attributes per column plus thousands of value patterns, most common values, and outliers.
  - Augments (does not replace) existing semantic layer and catalog tools.

## 3. Engine Capabilities and Architecture

- Zero copy: streams data, computes metadata on the fly, nothing stored in XtremeData's system.
- Zero data retention option: metadata can be rolled back after discovery.
- Single scan, full fidelity: every value examined, no sampling.
- Cross-platform coverage:
  - Cloud: AWS, Azure, GCP
  - Databases: Oracle, SQL Server, Teradata, Snowflake, Databricks, DB2, SAP HANA, Redshift, Postgres, MySQL, Spark, Presto, Starburst (federated)
  - File formats: CSV, Parquet, Avro, TXT (gzip supported)
- Respects existing auth/authz — streams only what the user's permissions allow.
- Role-based access control on both source and metadata sides.
- Deployable behind firewall: cloud, on-prem, or containerized (Red Hat Linux, VMs, Kubernetes).
- 400+ APIs available with full programmatic access; a no-code UI is also available.

## 4. Live Demo Highlights

- Profiled a 29M-record S3 taxi dataset (18 columns) in ~25 seconds on a single m8i.8xlarge ($1.69/hr on-demand).
- Profiled a 26M-record Azure Blob CSV dataset (8 columns) in ~28 seconds.
- Postgres database scan: 6M records profiled in ~18 seconds.
- Query-level profiling: joined tables profiled without materializing output, creating an audit trail for regulated reporting.
- Drift detection:
  - Schema drift: flags precision changes, type changes, and positional shifts across dataset versions.
  - Data drift: tracks cardinality, null/blank shifts, and value distribution changes over time.
- Byte-level anomaly detection surfaced embedded control characters in a promo code column (420 of 15,260 records affected, 12 distinct patterns).
- Benchmark: 1B records (1M files × 1K records, 16 columns) processed for under $1 on a reserved instance.

## 5. Key Use Cases and Discussion

- AI grounding: injects data reality metadata into LLM context to eliminate hallucinations and wrong query results.
- Pipeline monitoring: profiles data before/after each stage and detects drift without custom queries.
- Data quality at source: scans transaction/claims systems directly to fix issues earlier in the lifecycle.
- Migration: a no-code rules engine can migrate data from source to data lake while scanning for correctness.
- Governance and audit: metadata retained as an audit trail for regulators; RBAC controls who sees what.
- De-identification: a separate module applies policies to produce de-identified output from production to authorized storage; both datasets can then be profiled to compare entropy/distribution. Note: de-identification and synthetic data are distinct regulatory use cases.
- Customer data health across systems: profiling customer address data across multiple databases to assess consolidation readiness (e.g., customer 360).
- Classification (HIPAA/industry taxonomy): currently on the roadmap; fingerprint-based LLM classification is coming but not yet in the product.

---

## Action Items

| Owner | Item | Due Date |
|---|---|---|
| Jay Desai | Schedule a natural language SQL demo with a colleague, using grounded metadata | Not specified |
| Marc | Share initial thoughts and confirm next steps with Jay | Not specified |

## Key Decisions

- No decisions were formally recorded in this session; this was a vendor evaluation/demo meeting.

## Open Questions

- How and when will HIPAA/industry taxonomy classification (fingerprint-based LLM classification) be delivered on the roadmap?
- What are the next steps and timeline following Marc's follow-up with Jay?
