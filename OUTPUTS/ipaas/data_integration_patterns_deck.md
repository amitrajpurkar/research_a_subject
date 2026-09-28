# Enterprise Data Integration Patterns — Vendor Evaluation Deck (source content)

This file holds the content for `data_integration_patterns_deck.pptx`, in slide order. Sources: `data_integration_patterns.md` (top-10 features) and the six `compare_*_vendors.md` reports in this folder (score matrices, analysis). Research date: September 2026.

**Legend used in the deck:** ❄ = Snowflake offering · ★ = technology currently used in the enterprise · Ref = reference column (not a candidate).

---

## Slide 1 — Data Integration Patterns

1. **ELT / ETL** — Batch & micro-batch ingestion and transformation into the lakehouse
2. **CDC Replication** — Log-based change capture from operational databases
3. **Data Virtualization** — Zero-copy logical data fabric, semantic layer and data services
4. **Master Data Management** — Golden records for patient (EMPI), provider, member and facility
5. **Managed File Transfer** — Secure bulk file exchange: X12 EDI, extracts, DICOM, partner feeds
6. **Pipeline Orchestration** — Control plane across ELT, CDC, MDM, MFT and Snowflake jobs

---

## Slide 2 — ELT / ETL: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Hybrid & Multi-Cloud Portability | Kubernetes/Docker engine, Terraform, storage–compute separation | Move workloads on-prem ↔ cloud without lock-in |
| 2 | Healthcare Interoperability | Native HL7 v2/v3, FHIR and DICOM parsers and connectors | Nested clinical data without custom parsing scripts |
| 3 | AI-Assisted Pipelines | GenAI code generation, auto source-to-target mapping, legacy translation | Cuts build effort and rationalization tech debt |
| 4 | Automated PHI Compliance | PHI/PII discovery, dynamic masking, tokenization, lineage | HIPAA risk controlled at ingestion, with audit trail |
| 5 | Unified Stream & Batch | One control plane for streaming telemetry and nightly batch | Removes separate streaming vs batch tool sprawl |
| 6 | Intelligent FinOps | Cost attribution, auto-scaling, predictive compute sizing | Keeps cloud integration spend in check per domain |
| 7 | AI Data Observability | ML baselines, anomaly detection, proactive DQ alerts | Trusted data for clinical and executive reporting |
| 8 | Domain Isolation | Data-mesh / federated domains under shared guardrails | Domains scale independently of central IT |
| 9 | Open Table Formats | Native Iceberg / Delta / Hudi plus Python, Spark, SQL | Avoids proprietary storage lock-in |
| 10 | Low-Code / Pro-Code & CI/CD | Visual designer plus Git, VS Code and CI/CD pipelines | Serves analysts and engineers with SDLC discipline |

---

## Slide 3 — ELT / ETL: Vendor Comparison (0–4 scores, each feature 10%)

| # | Capability | Informatica IDMC | Azure Data Factory | AWS Glue | Fivetran | ❄ Snowflake Openflow | dbt | ★ Boomi (current) | ★ Ab Initio (current) | ★ PySpark OSS (current) | Ref: PySpark on Databricks |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Hybrid & Multi-Cloud Portability | 3 | 2 | 2 | 3 | 2 | 3 | 3 | 3 | 3 | 3 |
| 2 | Healthcare Interoperability | 3 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 1 | 2 |
| 3 | AI-Assisted Pipelines | 4 | 2 | 3 | 2 | 2 | 4 | 3 | 2 | 1 | 4 |
| 4 | Automated PHI Compliance | 4 | 2 | 3 | 2 | 3 | 2 | 2 | 3 | 1 | 3 |
| 5 | Unified Stream & Batch | 3 | 2 | 3 | 2 | 3 | 1 | 2 | 3 | 3 | 4 |
| 6 | Intelligent FinOps | 3 | 2 | 3 | 2 | 3 | 3 | 2 | 1 | 1 | 3 |
| 7 | AI Data Observability | 3 | 1 | 3 | 1 | 2 | 2 | 2 | 2 | 1 | 3 |
| 8 | Domain Isolation | 3 | 2 | 3 | 2 | 2 | 4 | 2 | 2 | 1 | 3 |
| 9 | Open Table Formats | 3 | 2 | 4 | 3 | 2 | 3 | 1 | 1 | 4 | 4 |
| 10 | Low-Code / Pro-Code & CI/CD | 3 | 3 | 3 | 3 | 3 | 4 | 3 | 2 | 2 | 4 |
| | **Weighted total** | **80.0%** | **50.0%** | **70.0%** | **52.5%** | **57.5%** | **67.5%** | **57.5%** | **50.0%** | **45.0%** | **82.5%** |

**Takeaway:** Best single platform: Informatica IDMC (80%), but costly and now Salesforce-owned. Best-fit pattern: Snowflake Openflow / Fivetran to land data, dbt to transform, PySpark retained for heavy lakehouse work. Boomi stays for app/HL7/X12 integration; Ab Initio is the prime retirement candidate.

*Source: `compare_elt_vendors.md`*

---

## Slide 4 — CDC Replication: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Log-Based Reading | Redo/WAL/binlog/transaction-log capture, no triggers | Near-zero load on EHR and claims databases |
| 2 | Transactional Integrity | Commit-order sequencing, exactly/at-least-once, drift handling | No orphaned or out-of-order clinical records |
| 3 | Hybrid Portability | Containerized engine deployable on-prem or any cloud | Replicate legacy on-prem DBs straight to cloud |
| 4 | AI Schema Evolution | Auto-detect and propagate source DDL changes | Pipelines survive admin-system schema changes |
| 5 | In-Flight PHI Masking | Tokenize / mask SSN, names, diagnoses before landing | PHI never lands unprotected in the lake |
| 6 | Streaming & Target Fit | Native push to Kafka, Event Hubs, Kinesis, Iceberg, Delta | Feeds both analytics and real-time operations |
| 7 | Zero-Downtime Snapshot | Lock-free multi-TB initial load alongside log capture | Onboard history with no maintenance window |
| 8 | Lag Observability | Latency, throughput, DLQ dashboards and alerts | Immediate visibility when streams fall behind |
| 9 | Bandwidth & FinOps | Rate limiting at peak hours, cost tracking | Protects hospital-to-cloud network links |
| 10 | RBAC & Audit | Pipeline-level permissions, immutable audit trail | Meets internal audit and cyber requirements |

---

## Slide 5 — CDC Replication: Vendor Comparison (0–4 scores, each feature 10%)

| # | Capability | Qlik Replicate | Debezium | Oracle GoldenGate | ❄ Snowflake Openflow | Fivetran HVR | ★ Cloudera CDP (current) |
|---|---|---|---|---|---|---|---|
| 1 | Log-Based Reading | 4 | 3 | 4 | 3 | 4 | 3 |
| 2 | Transactional Integrity | 3 | 3 | 4 | 2 | 3 | 2 |
| 3 | Hybrid Portability | 2 | 4 | 3 | 2 | 3 | 3 |
| 4 | AI Schema Evolution | 2 | 2 | 3 | 2 | 3 | 2 |
| 5 | In-Flight PHI Masking | 2 | 3 | 2 | 1 | 3 | 3 |
| 6 | Streaming & Target Fit | 3 | 4 | 4 | 2 | 3 | 3 |
| 7 | Zero-Downtime Snapshot | 3 | 4 | 3 | 2 | 3 | 3 |
| 8 | Lag Observability | 3 | 2 | 4 | 2 | 3 | 2 |
| 9 | Bandwidth & FinOps | 2 | 3 | 3 | 2 | 2 | 3 |
| 10 | RBAC & Audit | 3 | 2 | 4 | 3 | 3 | 3 |
| | **Weighted total** | **67.5%** | **75.0%** | **85.0%** | **52.5%** | **75.0%** | **67.5%** |

**Takeaway:** GoldenGate leads (85%) but is costly and Oracle-licence-risky. Two-lane standard: Fivetran HVR (or Qlik) for bulk DB → Snowflake; Debezium for Kafka event streaming, run inside Cloudera if retained. Openflow suits simple Snowflake-only sources; its Oracle connector needs XStream/GoldenGate licensing.

*Source: `compare_cdc_vendors.md`*

---

## Slide 6 — Data Virtualization: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Query Pushdown & Optimizer | Cost-based optimizer pushes compute to source systems | Lower egress and fast queries over big sources |
| 2 | Smart Caching | Policy-driven automatic materialization of hot views | Sub-second dashboards at high concurrency |
| 3 | Semantic Layer & Glossary | Standard business definitions (Patient, Encounter, Claim) | One version of the truth across domains |
| 4 | Cloud-Native Portability | Helm/Kubernetes across on-prem and multi-cloud | No lock-in as workloads shift |
| 5 | PHI Masking & RBAC/ABAC | Central row/column security and dynamic masking | HIPAA enforced at the virtual access point |
| 6 | AI Data Discovery | ML join suggestions, sensitive-data classification, tuning | Less effort to model a large estate |
| 7 | API & SQL Publishing | REST, GraphQL, OData, JDBC/ODBC endpoints instantly | Apps and partners consume without custom code |
| 8 | Federated Joins | Relational + NoSQL + files (e.g., Oracle with FHIR JSON) | Unifies silos without copying data |
| 9 | Query FinOps | Concurrency caps, timeouts, cost tags by domain | Stops runaway ad-hoc query spend |
| 10 | Lineage & Impact | Dashboard/API → view → source-table lineage | Safe change management during rationalization |

---

## Slide 7 — Data Virtualization: Vendor Comparison (0–4 scores, each feature 10%)

| # | Capability | Denodo | Starburst | Dremio | IBM Data Virtualization | TIBCO / Spotfire DV |
|---|---|---|---|---|---|---|
| 1 | Query Pushdown & Optimizer | 4 | 3 | 3 | 3 | 3 |
| 2 | Smart Caching | 3 | 3 | 3 | 3 | 3 |
| 3 | Semantic Layer & Glossary | 4 | 2 | 3 | 3 | 2 |
| 4 | Cloud-Native Portability | 3 | 4 | 3 | 3 | 2 |
| 5 | PHI Masking & RBAC/ABAC | 4 | 3 | 3 | 3 | 2 |
| 6 | AI Data Discovery | 3 | 3 | 3 | 3 | 1 |
| 7 | API & SQL Publishing | 4 | 2 | 3 | 2 | 3 |
| 8 | Federated Joins | 4 | 3 | 2 | 3 | 3 |
| 9 | Query FinOps | 2 | 3 | 3 | 2 | 2 |
| 10 | Lineage & Impact | 3 | 3 | 2 | 4 | 2 |
| | **Weighted total** | **85.0%** | **72.5%** | **70.0%** | **72.5%** | **57.5%** |

*Note: Snowflake was not scored in this pattern — see the Snowflake fit slide for native alternatives.*

**Takeaway:** Denodo is the clear leader (85%): strongest semantic layer, PHI policies and API publishing. Starburst (72.5%) for lake-scale federation. Dremio (now SAP) and TIBCO/Spotfire DV carry roadmap risk. With Snowflake as the platform, DV is needed mainly for non-Snowflake sources and API publishing — defer until a gap is proven.

*Source: `compare_dv_vendors.md`*

---

## Slide 8 — Master Data Management: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | AI Entity Resolution | ML / probabilistic fuzzy matching of patient and provider | Prevents duplicate records; clinical safety |
| 2 | Healthcare Domain Templates | Patient / Provider / Payer 360, NPI, FHIR models | Faster implementation than custom models |
| 3 | Cloud-Native Portability | Kubernetes deployment near source systems, any cloud | No lock-in; hub lives near data it syncs |
| 4 | Relationships & Hierarchies | Health system → hospital → dept → physician; employer → member | Accurate networks, contracts and affiliations |
| 5 | GenAI Stewardship | AI explains matches, summarizes conflicts, suggests fixes | Less steward fatigue and cost |
| 6 | Bi-Directional Sync | Real-time events + batch, write-back to EHRs | Golden record reaches ops and analytics |
| 7 | PHI Privacy & Consent | Attribute-level security, masking, consent tracking | HIPAA and state privacy compliance |
| 8 | Third-Party Enrichment | NPI registry, USPS, DEA, license verification | Validated identities before mastering |
| 9 | Graph Explorer & Lineage | Visual relationship graph and provenance | Transparent source-to-master data flow |
| 10 | Match FinOps | Independent scaling of match engine, usage tracking | Controls cost of heavy batch matching |

---

## Slide 9 — Master Data Management: Vendor Comparison (0–4 scores, each feature 10%)

| # | Capability | Reltio | Profisee | Informatica DQ | Great Expectations | Soda | Monte Carlo | Ref: Informatica DQ + MDM SaaS |
|---|---|---|---|---|---|---|---|---|
| 1 | AI Entity Resolution | 4 | 3 | 2 | 1 | 1 | 1 | 4 |
| 2 | Healthcare Domain Templates | 3 | 2 | 1 | 0 | 0 | 0 | 4 |
| 3 | Cloud-Native Portability | 3 | 4 | 3 | 2 | 3 | 3 | 3 |
| 4 | Relationships & Hierarchies | 4 | 3 | 1 | 1 | 1 | 1 | 3 |
| 5 | GenAI Stewardship | 4 | 3 | 3 | 1 | 3 | 3 | 3 |
| 6 | Bi-Directional Sync | 4 | 3 | 2 | 0 | 1 | 0 | 4 |
| 7 | PHI Privacy & Consent | 4 | 3 | 3 | 2 | 2 | 3 | 3 |
| 8 | Third-Party Enrichment | 3 | 2 | 3 | 0 | 0 | 0 | 4 |
| 9 | Graph Explorer & Lineage | 4 | 3 | 2 | 1 | 1 | 3 | 3 |
| 10 | Match FinOps | 2 | 3 | 3 | 1 | 2 | 3 | 3 |
| | **Weighted total** | **87.5%** | **72.5%** | **57.5%** | **22.5%** | **35.0%** | **42.5%** | **85.0%** |

*Note: Snowflake was not scored — it hosts the Gold-layer golden record but is not an MDM hub.*

**Takeaway:** Only Reltio and Profisee are true MDM hubs. Reltio leads (87.5%; SaaS-only, now SAP-owned); Informatica MDM SaaS + DQ is a close alternative (85% reference). Profisee (72.5%) for Kubernetes/on-prem or Microsoft Fabric. GX, Soda and Monte Carlo are complementary DQ/observability tools, not hubs.

*Source: `compare_mdm_vendors.md`*

---

## Slide 10 — Managed File Transfer: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Cloud-Native / Serverless | Kubernetes or serverless auto-scaling transfer nodes | No fixed hardware; portable across clouds |
| 2 | FIPS & HIPAA Guardrails | AES-256, TLS 1.3, FIPS 140-2/3, PHI scrubbing | Protects patient files from breach |
| 3 | Checkpoint-Restart | Byte-level resume and automatic retries | Reliable over unstable clinic/partner links |
| 4 | Multi-Protocol | SFTP, FTPS, AS2 (EDI), HTTPS, MLLP (HL7) | Connects every partner and clearinghouse |
| 5 | Event-Driven Hand-offs | File-landed triggers for ELT, Lambda, Functions | Turns file drops into live ingestion |
| 6 | AI Monitoring & Copilots | SLA forecasting, auto-triage of failed transfers | Prevents silent delivery failures |
| 7 | DMZ Edge Isolation | Decoupled edge proxy; no inbound holes to core | Hardens perimeter around PHI stores |
| 8 | Acceleration & Throttling | Parallel chunking, WAN acceleration, bandwidth windows | Fast genomics/imaging without clinical impact |
| 9 | Immutable Audit Trail | Tamper-proof chain of custody with checksums | Audit and legal non-repudiation |
| 10 | Egress FinOps | Transfer/egress cost attribution and alerts | No surprise multi-cloud transfer bills |

---

## Slide 11 — Managed File Transfer: Vendor Comparison (0–4 scores, each feature 10%)

| # | Capability | IBM Sterling | GoAnywhere MFT | Kiteworks | ❄ Snowflake Data Sharing | AWS Transfer Family | ★ Secure FTP (current) |
|---|---|---|---|---|---|---|---|
| 1 | Cloud-Native / Serverless | 3 | 2 | 2 | 3 | 3 | 1 |
| 2 | FIPS & HIPAA Guardrails | 3 | 3 | 4 | 3 | 3 | 2 |
| 3 | Checkpoint-Restart | 4 | 3 | 3 | 2 | 2 | 1 |
| 4 | Multi-Protocol | 4 | 3 | 2 | 1 | 3 | 1 |
| 5 | Event-Driven Hand-offs | 3 | 3 | 2 | 2 | 3 | 1 |
| 6 | AI Monitoring & Copilots | 2 | 1 | 3 | 2 | 2 | 0 |
| 7 | DMZ Edge Isolation | 4 | 3 | 3 | 3 | 3 | 1 |
| 8 | Acceleration & Throttling | 3 | 3 | 2 | 2 | 2 | 1 |
| 9 | Immutable Audit Trail | 3 | 3 | 4 | 3 | 3 | 1 |
| 10 | Egress FinOps | 2 | 3 | 2 | 2 | 2 | 1 |
| | **Weighted total** | **77.5%** | **67.5%** | **67.5%** | **57.5%** | **65.0%** | **25.0%** |

**Takeaway:** Current Secure FTP scores 25% — replace it. AWS Transfer Family + B2B Data Interchange is the pragmatic S3 → Snowflake path; IBM Sterling (77.5%) if Connect:Direct/AS2/X12 partners dominate. Use Snowflake Data Sharing to eliminate extract files for Snowflake-connected partners. GoAnywhere not recommended for PHI (exploited zero-days 2023, 2025).

*Source: `compare_mft_vendors.md`*

---

## Slide 12 — Pipeline Orchestration: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Dynamic DAGs / Code-as-Config | Python or YAML DAGs generated from metadata | Onboard hundreds of similar feeds quickly |
| 2 | Cloud-Native Portability | Tasks as Kubernetes pods, on-prem and multi-cloud | Run near on-prem EHR data or in cloud |
| 3 | AI Remediation & SLAs | Predictive SLA breach alerts, GenAI log triage | Fewer 2 a.m. pages for critical pipelines |
| 4 | Security, RBAC & Secrets | IAM/SSO, task-level access, Vault, log masking | No credentials or PHI leaking into logs |
| 5 | Event-Driven Triggers | Kafka, object-drop and webhook sensors | Process FHIR batches the moment they land |
| 6 | Idempotency & Backfill | Safe retries with backoff, historical re-runs | Correct claims history without corruption |
| 7 | OpenTelemetry Observability | Native OTel metrics, traces and lineage | Single pane across integration tools |
| 8 | Domain Isolation | Per-domain pipelines under central guardrails | Data-mesh agility without collisions |
| 9 | Ecosystem Operators | dbt, Snowflake, Databricks, Kafka, REST operators | No custom wrapper scripts to maintain |
| 10 | Compute FinOps | Worker autoscaling, idle spin-down, cost tags | Controls orchestration infrastructure spend |

---

## Slide 13 — Pipeline Orchestration: Vendor Comparison (0–4 scores, each feature 10%)

| # | Capability | Apache Airflow (OSS/Astro) | ❄ Snowflake Openflow | Prefect | Azure Data Factory | AWS Step Functions |
|---|---|---|---|---|---|---|
| 1 | Dynamic DAGs / Code-as-Config | 4 | 1 | 4 | 3 | 3 |
| 2 | Cloud-Native Portability | 4 | 2 | 4 | 2 | 2 |
| 3 | AI Remediation & SLAs | 3 | 1 | 2 | 1 | 2 |
| 4 | Security, RBAC & Secrets | 3 | 3 | 3 | 3 | 3 |
| 5 | Event-Driven Triggers | 3 | 3 | 3 | 3 | 3 |
| 6 | Idempotency & Backfill | 4 | 2 | 3 | 3 | 3 |
| 7 | OpenTelemetry Observability | 4 | 2 | 2 | 2 | 2 |
| 8 | Domain Isolation | 3 | 2 | 3 | 2 | 3 |
| 9 | Ecosystem Operators | 4 | 2 | 3 | 3 | 2 |
| 10 | Compute FinOps | 3 | 3 | 3 | 2 | 3 |
| | **Weighted total** | **87.5%** | **52.5%** | **75.0%** | **60.0%** | **65.0%** |

**Takeaway:** Apache Airflow (87.5%; 82.5% open-source only) is the enterprise control plane — Astronomer, MWAA or Google Managed Airflow. Prefect (75%) for Python/ML teams. Step Functions and ADF/Fabric for cloud-local sub-flows. Openflow is ingestion, not orchestration — Airflow triggers it; Snowflake Tasks/dbt run in-warehouse steps.

*Source: `compare_pipe_orch_vendors.md`*

---

## Slide 14 — Where Snowflake Fits (medallion lakehouse)

Context: Snowflake is the enterprise data platform (licences purchased), following a Bronze → Silver → Gold medallion lakehouse architecture.

| Pattern | Snowflake fit | Medallion layer | Snowflake-native capability | Gap / complement needed |
|---|---|---|---|---|
| ELT / ETL | **Strong** | Bronze → Silver → Gold | Openflow / Snowpipe / Snowpipe Streaming land Bronze; dbt Projects on Snowflake, Dynamic Tables and Snowpark build Silver & Gold; Horizon masking/tags; Iceberg tables | HL7/FHIR parsing, SaaS long-tail connectors → Boomi + VARIANT parsing, Fivetran only if needed |
| CDC Replication | **Partial** | Bronze | Openflow CDC connectors (Postgres, MySQL, SQL Server, Oracle via XStream) into Bronze journal tables; Streams & Tasks / Dynamic Tables merge to Silver | No in-flight PHI masking, Snowflake-only target, single-node Oracle/Postgres → Cloudera/Debezium for Kafka fan-out; HVR only for Epic-scale Oracle |
| Data Virtualization | **Partial** | Gold / Consumption | Zero-copy data sharing, Iceberg & catalog-linked databases, external tables, semantic views, Horizon row/column policies reduce the need for a DV layer | Federation over non-Snowflake sources and REST/OData publishing → defer DV purchase until a proven gap |
| Master Data Mgmt | **Gap** | Silver → Gold | Hosts golden records in Gold; Data Metric Functions for DQ; Horizon classification of PHI; hub integrations (Reltio zero-copy, Profisee connector) | No match/merge, survivorship, stewardship or EMPI → an MDM hub is a genuine net-new need |
| Managed File Transfer | **Partial** | Bronze (in) / Gold (out) | Outbound: Secure Data Sharing & listings replace extract files for Snowflake partners. Inbound: files land in cloud storage → Snowpipe to Bronze | No SFTP/AS2/X12/MLLP, DMZ or partner management → MFT platform still required to retire Secure FTP |
| Pipeline Orchestration | **Partial** | All layers | Snowflake Tasks & task graphs, dbt Projects on Snowflake, Dynamic Tables handle in-warehouse medallion scheduling | No cross-system DAGs (MFT → CDC → MDM → BI), backfill or external SLAs → Airflow as enterprise control plane |

---

## Slide 15 — Leveraging Current Technologies with Snowflake

Goal: reuse what the enterprise already runs, avoid unnecessary vendor engagements, and focus new spend on genuine gaps.

| Technology | Pattern | Role today | How to leverage with Snowflake | Disposition |
|---|---|---|---|---|
| ★ Boomi | ELT pattern | App/API integration, events, native X12 EDI and HL7 profiles | Feed Bronze via Boomi Snowflake connector / Data Integration; own HL7/X12 parsing before landing; do not extend into bulk warehouse ELT | **Keep & focus** |
| ★ Ab Initio | ELT pattern | High-volume batch ETL with strong field-level lineage | Use its Metadata Hub lineage to inventory graphs; re-platform Silver/Gold logic to dbt / Snowpark on Snowflake; sunset as licences renew | **Retire (phased)** |
| ★ PySpark | ELT pattern | Pro-code engine for heavy, streaming and lakehouse work | Write Iceberg tables Snowflake can read; move warehouse-bound transforms to Snowpark Python DataFrames to cut cluster cost | **Keep** |
| ★ Cloudera CDP | CDC pattern | Kafka, NiFi, Debezium CDC, Flink with SDX governance | Keep as streaming/Kafka + Debezium lane into Snowflake (Kafka connector / Snowpipe Streaming); migrate Hive/HDFS lake workloads to Snowflake medallion | **Reposition** |
| ★ Secure FTP | MFT pattern | Self-managed SFTP servers + cron scripts for partner files | Interim: land files to cloud storage → Snowpipe; replace with a managed MFT platform; shift extract feeds to Snowflake Data Sharing | **Retire** |

**Net-new vendor engagement actually needed:** MDM hub (Reltio / Informatica MDM SaaS / Profisee PoC), a managed MFT platform to retire Secure FTP (AWS Transfer Family or IBM Sterling), and an enterprise orchestrator (Apache Airflow — open source or managed).

**Avoid / defer new engagements:** separate ELT suite (Snowflake Openflow + dbt + Boomi + PySpark cover it), new CDC vendor unless Oracle volume demands HVR (Openflow + Cloudera/Debezium first), and a Data Virtualization platform until a non-Snowflake federation gap is proven.
