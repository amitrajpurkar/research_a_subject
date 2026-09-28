# Master Data Management (MDM) Vendor Comparison — Healthcare Enterprise Integration Pattern

**Integration pattern:** Master Data Management. This covers the Enterprise Master Patient Index (EMPI), Provider Data Management, Payer/Member 360 and facility hierarchies.

**Evaluation basis** (all from `INPUTS/snowflake_ai/data_integration_patterns.md`):
- *Part 1: Top 10 Features & Capabilities for Enterprise MDM*
- *Part 2: Strategic Pillar Weighting Model for MDM*
- *Part 3: MDM Feature Scoring Template (0 to 4 Scale)*

**Vendors assessed:** Informatica Data Quality · Great Expectations · Soda · Monte Carlo · Reltio · Profisee

**Current enterprise technology:** None. The enterprise does not use any technology for this pattern today, so this is a greenfield selection.

**Research date:** September 2026. Sources: vendor docs and release notes, analyst press (Gartner MDM and Augmented DQ Magic Quadrants, IDC, BARC via TechTarget), and reviews on PeerSpot and G2.

> **Important scoping note — two different product categories.** Only **Reltio** and **Profisee** are MDM hubs. An MDM hub persists golden records and provides match/merge, survivorship, hierarchies, stewardship and data distribution.
>
> The other four products belong to adjacent categories:
> - **Informatica Data Quality**, **Great Expectations** and **Soda** are **data-quality / data-contract** tools.
> - **Monte Carlo** is a **data observability** platform.
>
> All six are scored honestly against the MDM framework, so the four non-MDM tools score low on hub capabilities (#1, 2, 4, 6, 8) by design. That low score does not mean they are poor products. Each has a *"Role alongside MDM"* note.
>
> For Informatica, a **reference column** shows the score if **Informatica MDM SaaS (Customer/Healthcare 360)** is licensed with DQ. That combination is Informatica's actual MDM offering.

**Scoring scale** (from the input file):

| Score | Meaning |
|---|---|
| 0 | Not supported |
| 1 | Basic / custom scripts |
| 2 | Configurable / out-of-the-box |
| 3 | Advanced / cloud-native |
| 4 | Fully automated / AI-driven market leader |

**Strategic pillars** (Part 2 of the input), for context:

| Pillar | Weight |
|---|---|
| Entity Resolution & Data Quality | 20% |
| Portability & Hybrid/Multi-Cloud | 20% |
| Functional Completeness | 15% |
| Governance, Compliance & PHI | 15% |
| Complexity & Tech Rationalization | 15% |
| Operational Costs & FinOps | 15% |

The Part 3 feature matrix weights each of the 10 features at **10%**.

> **EMPI caution:** None of the six is marketed as a *certified clinical EMPI*. Before committing any of them to patient identity, run matching on real patient data that includes known duplicates, twins, newborns and aliases. Also confirm a signed **HIPAA BAA** with every vendor. HITRUST is publicly confirmed only for Reltio.

---

## Section 1 — Vendor Profiles against the 10 MDM Features

The ten features, as defined in the input file:

1. AI-Powered Entity Resolution
2. Healthcare Domain Templates
3. Cloud-Native Portability
4. Multi-Tier Relationships & Hierarchies
5. GenAI-Assisted Stewardship
6. Bi-Directional Sync
7. PHI Privacy & Compliance
8. Third-Party Enrichment
9. Graph Explorer & Lineage
10. FinOps & Resource Scaling

### Part A — MDM Hubs

---

### 1.1 Reltio (Context Intelligence Platform, formerly Connected Data Platform)

**Context:**
- **SAP acquired Reltio.** The deal was announced on 27 Mar 2026 and closed on **7 May 2026**. SAP's announcement cites "SAP and non-SAP enterprise data", but gives no standalone roadmap or pricing commitment.
- Reltio is a **Leader in the April 2026 Gartner MDM Magic Quadrant**, placed furthest for Completeness of Vision.
- Note that SAP also acquired Dremio (see the Data Virtualization report).

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | AI-Powered Entity Resolution | **FERN** (Flexible Entity Resolution Networks) is an ML matching engine with pretrained Individual and Organization models, used alongside rule-based match and cleanse. Release 2026.1 added three FERN modes and an **Identity Builder** that uses reference data. The AgentFlow **Resolver** agent recommends match decisions with an audit trail, and the **Unmerger** agent detects bad merges. It is not certified as a clinical EMPI. | 4 |
| 2 | Healthcare Domain Templates | A Healthcare velocity pack provides Patient, Practitioner, Provider Organization, Plan, Payer and Household models. It also ships HCP–HCO affiliation relationship types, prebuilt match and survivorship configurations, and an NPI data-as-a-service dataset. **FHIR mappings are not documented.** | 3 |
| 3 | Cloud-Native Portability | Multi-tenant SaaS on AWS, GCP and Azure (the vendor cites 25B profiles and 138B relationships in production). It is **SaaS only**: there is no on-prem or customer-managed Kubernetes option. | 3 |
| 4 | Multi-Tier Relationships & Hierarchies | The data model is **graph-native**, with typed relationships. Release 2026.1 added **Materialized Hierarchy** for large multi-level hierarchies with future-dated and historical views. This suits IDN, facility and provider-network trees. | 4 |
| 5 | GenAI-Assisted Stewardship | **AgentFlow** ships 8 agents: Resolver, Unmerger, Data Explorer (natural-language queries over entities), Work Assigner, Address Enricher, Profiler, Segmenter and Product Recommender. Release 2026.1 adds **Agent Builder**, and an **MCP Server** gives third-party agents governed access. This is the broadest set of shipped AI agents among the six products. | 4 |
| 6 | Bi-Directional Sync | Supports real-time REST APIs and **Lightspeed Data Delivery** (reads in 50 ms or less), with **Confluent Kafka streaming** added in 2026.1. For Snowflake there is a **Data Pipeline for Snowflake** (outbound) and **Zero Copy** federation. The Integration Hub offers 1,000+ connectors. Write-back to EHRs (HL7/FHIR into Epic or Cerner) is custom integration work. | 4 |
| 7 | PHI Privacy & Compliance | The vendor states **HITRUST certification**, HIPAA compliance and SOC 2. The platform provides masking, RBAC, audit logs and **consent capture and maintenance** across systems. Confirm the BAA and any contract changes under SAP ownership. | 4 |
| 8 | Third-Party Enrichment | Built-in enrichment covers **NPI** (data-as-a-service plus HCP attributes), **D&B Data Blocks**, **USPS CASS-certified address cleansing** and IQVIA datasets. DEA and state-license verification are not documented and would come from partner feeds. | 3 |
| 9 | Graph Explorer & Lineage | A visual relationship graph plus **attribute-level crosswalks** show which source contributed each value, with full history and unmerge. Reviewers rate the UI above Informatica's and Stibo's. | 4 |
| 10 | FinOps & Resource Scaling | Priced as a subscription on **consolidated profiles**, billed annually in advance, with tenant usage reports. The vendor manages scaling, so customers cannot scale the match engine independently. Pricing is opaque, and renewal pricing under SAP is uncertain. | 2 |

**Pros**
- Matching accuracy is "highly effective compared to other tools" (PeerSpot).
- The UI and dashboards are stronger than Informatica's and Stibo's (PeerSpot).
- Cloud-native SaaS scales well and syncs in real time (PeerSpot; vendor).
- Leader in the 2026 Gartner MDM MQ, rated furthest on vision.
- Broadest shipped agentic AI: 8 AgentFlow agents plus an MCP server (vendor docs).
- Healthcare pack includes HCP–HCO relationships, NPI data and HITRUST (vendor).

**Cons**
- Uncertainty after the SAP acquisition: roadmap, 2027 renewal pricing, and non-SAP customers possibly becoming an "edge case" (Data Ladder, a competitor and therefore biased).
- No on-prem or self-managed deployment (vendor docs).
- Technical complexity and slow support for workflow deployments (PeerSpot).
- Maintenance downtime and job queuing under heavy load (PeerSpot).
- API throughput limits on large operations (PeerSpot; may predate the 2026 releases).
- Opaque pricing, with six-figure starting licences and 3-year TCO often in the millions (third-party estimate from a competitor).

**Pricing:** Annual SaaS subscription based on consolidated profiles and tier (Entity Resolution, Multidomain MDM, or Intelligent 360). Starting licences are six figures per year (third-party estimate).

---

### 1.2 Profisee (Profisee MDM — SaaS, PaaS/Kubernetes, and Microsoft Fabric-native)

**Context:**
- An independent, privately held company. It reported 37% ARR CAGR in FY2026.
- A **Leader in the 2026 Gartner MDM Magic Quadrant**, with a 100% willingness-to-recommend score in the 2025 Gartner Voice of the Customer.
- Announced end-to-end MDM as a native **Microsoft Fabric** workload at FabCon in March 2026.
- The most Microsoft-aligned vendor in the set.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | AI-Powered Entity Resolution | Release 2026.R1 rebuilt the matching engine and added **AI Vector Matching**, which matches records by semantic similarity using embeddings, on top of fuzzy, probabilistic and deterministic matching and survivorship. There is **no pretrained patient or EMPI model**, so match strategies must be built and tuned. | 3 |
| 2 | Healthcare Domain Templates | The healthcare page lists provider credentials and specialties, patient identity, facility, member and medical coding (ICD-10, CPT, SNOMED). Named customers include Mass General Brigham, MD Anderson, Ochsner and BCBS. **No out-of-box NPI model or FHIR mappings are documented**; implementations use the FastStart approach and partner accelerators. | 2 |
| 3 | Cloud-Native Portability | Deployment options are SaaS (on Azure), PaaS or IaaS on **Azure, AWS or GCP**, on-prem, hybrid, or a **native Fabric workload**. There is a public **Helm/Kubernetes** repo for AKS, EKS and GKE. It depends on SQL Server. This is the **broadest deployment choice** of the six. | 4 |
| 4 | Multi-Tier Relationships & Hierarchies | Supports straight-line hierarchies built from attributes and recursive parent–child hierarchies, with a **graph visualizer** that allows in-place edits. This is adequate for provider, group and facility trees but less graph-native than Reltio. | 3 |
| 5 | GenAI-Assisted Stewardship | Release 2026.R1 added the **"Aisey" AI assistant**, AI Data Quality and Enrichment agents (the vendor claims 30–50% less manual work, with audit trails), an **MCP Server** (for Copilot, Claude and Gemini), and a Microsoft 365 Copilot agent. **No natural-language explanation of individual match decisions** is documented. | 3 |
| 6 | Bi-Directional Sync | A native **two-way Snowflake connector** supports continuous, scheduled and CDC exports. **Fabric Open Mirroring** delivers near-real-time Delta output to OneLake. REST API, Power Platform and ADF integrations are available. Kafka and event streaming were **not confirmed**. | 3 |
| 7 | PHI Privacy & Compliance | SaaS is marketed as HIPAA/HITECH and SOC 2 Type II compliant with 99.8% availability. RBAC, audit history and Purview sensitivity labels show in the steward UI. **HITRUST is not documented**, and native masking, tokenization and consent management were not evident. Confirm the BAA. | 3 |
| 8 | Third-Party Enrichment | Native **Melissa Personator** address verification, plus D&B and Loqate. **NPI registry, DEA and licence verification are not out-of-box** and would need custom or partner connectors. | 2 |
| 9 | Graph Explorer & Lineage | A relationship graph visualizer and **two-way Microsoft Purview integration** (models and match/survivorship rules are published, with lineage via ADF). However, reviewers say it "lacks transparent tracking of data origins." | 3 |
| 10 | FinOps & Resource Scaling | **Priced by record volume, with unlimited domains and attributes**, which the vendor markets as predictable. On PaaS or Kubernetes the customer controls its own infrastructure scaling. Billing for the Fabric deployment is not documented. | 3 |

**Pros**
- Gartner MQ Leader, with 100% willingness to recommend (Gartner).
- Most deployment flexibility: SaaS, Kubernetes on any cloud, on-prem, or Fabric (vendor; GitHub).
- Predictable volume-based pricing with unlimited domains (vendor).
- Responsive support and strong training via Profisee Academy (PeerSpot).
- Matching and merging are well regarded (PeerSpot).
- Deep integration with Microsoft Purview, Fabric, Copilot and Power Platform (vendor; Microsoft Learn).

**Cons**
- Thinner out-of-box healthcare, NPI and FHIR assets than Reltio or Informatica (vendor healthcare page).
- Reviewers call lineage weak (PeerSpot).
- Version upgrades have disrupted workflows, for example v7.1 (PeerSpot).
- Security setup lengthens implementation, and legacy integration is manual (PeerSpot).
- Heavily centred on Microsoft and SQL Server, though a Snowflake connector exists.
- Training content is hard to navigate (PeerSpot).

**Pricing:** Annual subscription based on record volume, with Application and Enterprise editions available as SaaS or PaaS. No public list prices.

---

### Part B — Data Quality & Observability Tools (adjacent to MDM)

---

### 1.3 Informatica Data Quality (Cloud Data Quality on IDMC), with an Informatica MDM SaaS reference

**Context:**
- **Salesforce completed its roughly $8B acquisition of Informatica on 18 Nov 2025.** Informatica is now branded "Salesforce (Informatica)".
- Gartner positions it as a **Leader** in:
  - the **2026 Augmented Data Quality Magic Quadrant** (18th time);
  - the **2026 MDM Magic Quadrant** (7th consecutive time).
- In May 2026 it announced **headless IDMC** (APIs and MCP) and an Agent & Context Catalog.
- Newer features lean toward Salesforce Data 360 and Agentforce.

**How to read this profile:** Cloud Data Quality is a **data-quality tool, not an MDM hub**. It profiles, cleanses, standardizes, verifies and deduplicates data inside pipelines, but it has **no persistent golden record, cross-reference or steward match workflow**. The final column shows the effect of adding **Informatica MDM SaaS (Healthcare 360)**.

| # | Feature | Evidence | DQ alone | *Ref: DQ + MDM SaaS* |
|---|---|---|---|---|
| 1 | AI-Powered Entity Resolution | DQ has **Deduplicate** (identity and field matching, scoring, consolidation), which runs in batch with no persistent golden record. MDM SaaS adds **CLAIRE ML matching** that learns from steward feedback, plus a continuous match/merge service. | 2 | 4 |
| 2 | Healthcare Domain Templates | DQ has only generic rule specifications. MDM SaaS **Customer 360 for Healthcare** provides 14 business entities, 100+ reference entities and 30+ relationship types (patient, member, provider). **Data Services for Healthcare** adds HL7 2.x and FHIR parsing, making this the strongest HL7/FHIR offering of the six. | 1 | 4 |
| 3 | Cloud-Native Portability | IDMC is SaaS, with a Secure Agent that runs on-prem or in any cloud, or on Kubernetes (advanced clusters or self-service clusters on your own Kubernetes). Legacy on-prem IDQ still exists. MDM SaaS itself is SaaS only. | 3 | 3 |
| 4 | Multi-Tier Relationships & Hierarchies | DQ has none. MDM SaaS adds multidomain hierarchies and 30+ healthcare relationship types. | 1 | 3 |
| 5 | GenAI-Assisted Stewardship | The **CLAIRE Data Quality Agent** (GA Spring 2026) generates DQ rules from natural language; the vendor cites customers going from about 5 rules a week to 200 a day. CLAIRE GPT is also available. MDM SaaS adds **CLAIRE Copilot for Data Stewards** (recommended actions), record timelines and Workflow Builder. | 3 | 3 |
| 6 | Bi-Directional Sync | DQ runs inside CDI/CAI pipelines (including real-time APIs) and pushes down to Snowflake, but has no golden record to publish. MDM SaaS adds real-time APIs, business events, Snowflake integration and MuleSoft/Data 360 sync. | 2 | 4 |
| 7 | PHI Privacy & Compliance | The Trust Center lists SOC 2 Type 2, HIPAA/HITECH, **FedRAMP Moderate ATO** and ISO 27001. **HITRUST is not listed.** Masking comes from the separate Cloud Data Masking service. | 3 | 3 |
| 8 | Third-Party Enrichment | The **Verifier** (formerly AddressDoctor) handles global and USPS address verification. MDM SaaS for healthcare adds out-of-box **NPPES (NPI)** and **MedPro** provider enrichment. DEA is not confirmed. | 3 | 4 |
| 9 | Graph Explorer & Lineage | Lineage comes from the separate Cloud Data Governance & Catalog (strong scanners). DQ has no entity graph. MDM SaaS adds relationship visualizations and record-history timelines. | 2 | 3 |
| 10 | FinOps & Resource Scaling | Priced by **IPU consumption** (Standard IPUs expire monthly, Flex annually; volume tiers apply). Metering dashboards by service and sub-organization support chargeback, and elastic clusters scale independently. Reviewers say costs are hard to predict. | 3 | 3 |

**Pros**
- Gartner Leader in both Augmented Data Quality (18 times) and MDM (7 consecutive times).
- The broadest suite: DQ, integration, catalog/lineage, MDM and HL7/FHIR services on one platform under one IPU contract.
- The CLAIRE DQ Agent greatly speeds up rule authoring (vendor anecdote; SiliconANGLE).
- Real-time DQ monitoring and fast out-of-box profiling (PeerSpot).
- FedRAMP Moderate plus HIPAA/HITECH (Trust Center).
- Flexible runtime near EHR data, via the Secure Agent or your own Kubernetes (vendor docs).

**Cons**
- **DQ alone is not MDM.** A patient or provider golden record requires MDM SaaS at significant extra cost.
- Steep learning curve, and rules need developers to build them (TechRepublic; PeerSpot).
- Expensive, with hard-to-predict IPU costs (PeerSpot; TechRepublic).
- Reviewers say the cloud version is less stable than on-prem, and logs are hard to analyse (PeerSpot).
- CAI API volume limits of about 500 records or 500 MB (PeerSpot).
- Uncertain direction under Salesforce, with no public post-acquisition MDM roadmap.
- HITRUST is not listed.

**Pricing:** IDMC IPU consumption (Standard or Flex, with volume tiers), quoted through sales. Enterprise commitments typically run six figures per year or more (third-party estimate).

**Role alongside MDM:** Informatica DQ can be the **cleansing, standardization and verification layer that feeds any MDM hub**. If Informatica MDM SaaS is chosen, it becomes a native single-vendor stack.

---

### 1.4 Great Expectations (GX Core open source — GX Cloud discontinued)

**Context — major change:**
- **FICO acquired GX Cloud.** The announcement came on 6 May 2026, and **GX Cloud stopped being publicly available on 1 June 2026**.
- **Fivetran became steward of the open-source GX Core** on 13 May 2026. Fivetran itself merged with dbt Labs.
- The AI features (ExpectAI, GX Agent) were Cloud-only and are now gone.
- The only GX option still available is the Apache-2.0 open-source library.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | AI-Powered Entity Resolution | There is no probabilistic or ML matching. Deterministic **uniqueness** expectations (single or compound columns) can flag exact duplicate MRNs or NPIs, but cannot link fuzzy records. | 1 |
| 2 | Healthcare Domain Templates | No healthcare models, NPI validators or FHIR support. | 0 |
| 3 | Cloud-Native Portability | A Python library that runs anywhere, including containers, Kubernetes jobs, on-prem and any cloud, over Pandas, Spark or SQL. It needs an external orchestrator. There is no longer a managed SaaS. | 2 |
| 4 | Multi-Tier Relationships & Hierarchies | No hierarchy modelling. Referential integrity can only be checked with custom or multi-column expectations. | 1 |
| 5 | GenAI-Assisted Stewardship | ExpectAI (generated expectations and natural-language SQL) was a GX Cloud feature and was **discontinued on 1 June 2026**. Core has no AI and no stewardship workflow. | 1 |
| 6 | Bi-Directional Sync | None. Validation is read-only, and checkpoint actions can only send notifications or publish Data Docs. | 0 |
| 7 | PHI Privacy & Compliance | Self-hosted, so PHI stays within your perimeter. There is **no vendor SOC 2 or BAA and no RBAC**, and Data Docs can expose sample "unexpected values" unless configured carefully. | 2 |
| 8 | Third-Party Enrichment | None. | 0 |
| 9 | Graph Explorer & Lineage | No native lineage. Data Docs are validation reports only. | 1 |
| 10 | FinOps & Resource Scaling | No licence fee; validations run on your own compute. There is no cost-monitoring capability. | 1 |

**Pros**
- 300+ expectation types over SQL, Pandas and Spark (modern-datatools).
- Apache 2.0 with no lock-in; runs fully inside the PHI perimeter.
- Data Docs produce human-readable validation reports.
- Strong orchestrator integration (Airflow, Dagster, Prefect).
- Large community (~11.4k GitHub stars; v1.16.1 in April 2026), now with Fivetran/dbt stewardship.
- "pytest for data" is a model engineers like.

**Cons**
- **The commercial product is gone.** There is no vendor SaaS, support or AI features since 1 June 2026.
- Steep learning curve and heavy configuration: Data Contexts, Stores and Checkpoints.
- Every table needs a hand-written suite, which is a heavy maintenance load at enterprise scale.
- No anomaly detection, lineage or catalog in Core.
- No scheduler of its own; it needs an orchestrator.
- The long-term direction under Fivetran/dbt is uncertain and overlaps with dbt tests.

**Pricing:** GX Core is free under Apache 2.0. GX Cloud tiers are **no longer sold**.

**Role alongside MDM:** A code-first **validation gate** in pipelines that feed or publish from the MDM hub. Examples: EMPI ID and NPI uniqueness, NPI format and non-null rules, provider–organization referential integrity, and schema drift in FHIR-flattened extracts. It is only a sensible choice if the enterprise is comfortable owning an open-source tool.

---

### 1.5 Soda (Soda Core OSS, Soda Cloud, SodaCL / data contracts, Soda AI)

**Context:**
- An independent, venture-backed company that has raised about $28M in total, including a $14M round in July 2024.
- **Soda 4.0** (January 2026) brought:
  - an open-source contracts engine;
  - **Contract Copilot** and **Contract Autopilot**;
  - **record-level anomaly detection**;
  - a **Diagnostics Warehouse**.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | AI-Powered Entity Resolution | No probabilistic or EMPI matching. There are duplicate and uniqueness checks, and **Record Level Resolution** agents that find duplicate or invalid records and propose fixes for steward approval. This is DQ remediation, not survivorship. | 1 |
| 2 | Healthcare Domain Templates | None. NPI and payer-ID rules would be custom checks. | 0 |
| 3 | Cloud-Native Portability | Offers a Soda-hosted runner, a **self-hosted Kubernetes runner in AWS, GCP or Azure** (Enterprise only, so data stays in-network), and an open-source Python library or Go CLI for in-pipeline checks. | 3 |
| 4 | Multi-Tier Relationships & Hierarchies | Referential and cross-dataset checks only; no hierarchy management. | 1 |
| 5 | GenAI-Assisted Stewardship | **Contract Autopilot** drafts contracts by profiling data. **Contract Copilot** edits contracts from plain English. Smart anomaly treatment learns from feedback, record-level agents propose steward-approved fixes, and an MCP server is available. This is the **most MDM-like steward workflow** of the three DQ/observability tools. | 3 |
| 6 | Bi-Directional Sync | No publishing of master records. Marketing claims that approved fixes are "applied at source" — **verify this in a PoC**. Ticketing and alerting integrations are available. | 1 |
| 7 | PHI Privacy & Compliance | SOC 2 Type II and SOC 3. SSO, audit logs and RBAC on Enterprise. The self-hosted runner and Diagnostics Warehouse keep failed rows in *your* warehouse, and AI works on metadata only. **No public HIPAA/BAA statement** was found. | 2 |
| 8 | Third-Party Enrichment | None. | 0 |
| 9 | Graph Explorer & Lineage | No native field-level lineage; it relies on catalog integrations (Atlan, Collibra). | 1 |
| 10 | FinOps & Resource Scaling | Consumption pricing in **Soda Processing Units (SPUs)**, and checks push down to the warehouse. There is no warehouse cost monitoring. | 2 |

**Pros**
- Easy, intuitive UI; G2 rating 4.4/5.
- Flexible YAML/SodaCL contracts that are version-controlled in Git.
- Deployment options (open source, SaaS, self-hosted Kubernetes runner) that suit PHI boundaries.
- AI contract generation plus steward-approved record fixes.
- Responsive Slack and community support (G2).
- The vendor claims its anomaly engine beats Prophet by 70% (unverified).

**Cons**
- The Cloud edition is seen as expensive compared with open-source alternatives (G2).
- YAML/SodaCL adoption has a learning curve (G2; Sifflet, a competitor).
- No field-level lineage or root-cause tracing.
- Key features are Enterprise-only: collaboration on data contracts, record-level anomaly detection, RBAC and the self-hosted runner.
- Documentation gaps for some connectors (G2).
- A small vendor (about $28M raised), which raises viability questions for a large enterprise.

**Pricing:** Free tier, then Team at about $750/month plus SPUs. Enterprise is custom-priced (third-party figures, Aug 2026).

**Role alongside MDM:** A **data-contract and "stewardship-lite" layer around the hub**. Soda can apply contracts to inbound EHR, claims and credentialing feeds and to published golden-record tables, catching DQ exceptions *before* match/merge, with PHI kept in-house through the self-hosted runner.

---

### 1.6 Monte Carlo (Data + AI Observability — "Agent Trust Platform")

**Context:**
- A private company, valued at $1.6B at its 2022 Series D; no later round was verified.
- **Observability Agents** launched in April 2025 (a Monitoring Agent and a Troubleshooting Agent), and **Agent Observability** followed in March 2026.
- Healthcare and life-sciences customers include **Highmark, Ensemble Health Partners, Accolade, Roche, Takeda and Amgen**.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | AI-Powered Entity Resolution | No matching. ML monitors and SQL rules can alert when duplicate or uniqueness rates rise in master tables. | 1 |
| 2 | Healthcare Domain Templates | None. The healthcare solution page is marketing and customer logos only. | 0 |
| 3 | Cloud-Native Portability | SaaS, with **customer-hosted agents on AWS, Azure or GCP** (EKS, AKS, GKE, Kubernetes, Docker Compose). Row-level data can be stored in the customer's own object storage. There is no on-prem control plane. | 3 |
| 4 | Multi-Tier Relationships & Hierarchies | No entity hierarchies. Its lineage graph shows *table* dependencies, not organizational relationships. | 1 |
| 5 | GenAI-Assisted Stewardship | The **Monitoring Agent** recommends monitors (vendor cites 60% acceptance). The **Troubleshooting Agent** tests hundreds of root-cause hypotheses (vendor cites 80% faster resolution). It also has incident triage workflows. It is pipeline-focused, not record-level. | 3 |
| 6 | Bi-Directional Sync | None. The agents are read-only, and it only sends alerts to Slack, Jira and PagerDuty. | 0 |
| 7 | PHI Privacy & Compliance | SOC 2 Type II and ISO 27001, with RBAC, SSO/SCIM, **PII filtering, and the option to disable sampling**. Customer data is never used for training. It serves major payer customers. **No public HIPAA/BAA statement** was found. | 3 |
| 8 | Third-Party Enrichment | None. | 0 |
| 9 | Graph Explorer & Lineage | **Automated field-level lineage from warehouse to BI**, with impact analysis. It is the market leader for *pipeline* lineage but has no MDM entity graph. | 3 |
| 10 | FinOps & Resource Scaling | **Performance** features alert on rising query and warehouse credits, show slow queries and highlight dbt/Airflow bottlenecks. Its own credit-based pricing is opaque. | 3 |

**Pros**
- The most mature ML anomaly detection with minimal setup; G2 rating 4.3/5 from about 548 reviews.
- Best-in-class field-level lineage and root-cause analysis (G2).
- Its agentic monitoring was called "right on target" by IDC and BARC (TechTarget).
- Proven with regulated healthcare and payer customers such as Highmark and Ensemble.
- Enterprise security: SOC 2 II, ISO 27001, SCIM, PII filtering and customer-hosted agents.
- Warehouse cost and performance monitoring.

**Cons**
- Alert fatigue and false positives early on, so tuning is needed (G2; IDC).
- Opaque credit pricing that is hard to predict at scale (G2).
- Limited control over ML thresholds (G2).
- Complex UI across many modules (G2).
- Customer-hosted deployment is less supported, per the vendor's own warning.
- Its focus is shifting toward AI-agent observability.

**Pricing:** Credit-based across the Start, Scale, Enterprise and Business Critical tiers. There is no public list price; deals are typically six figures (unverified).

**Role alongside MDM:** The **reliability and observability layer over the whole MDM data supply chain**. It can monitor the freshness, volume, schema and distribution of source feeds and golden-record outputs, for example a sudden spike in unmatched EMPI records or a provider-directory table that goes stale. Its lineage traces downstream impact into claims, analytics and AI agents.

---

## Section 2 — Comparison: MDM Feature Scoring Template (0 to 4 Scale)

This section applies *Part 3: MDM Feature Scoring Template* from `data_integration_patterns.md`. Each of the 10 features carries a **10% weight**:

- **Weighted score** = Score × 10%.
- **Total** = the sum of the weighted scores, out of a maximum of 4.0.
- **Normalized %** = Total ÷ 4.0.

### 2.1 Raw scores (0–4)

| # | MDM Feature / Capability | Description & Evaluation Focus | Weight | Reltio | Profisee | Informatica DQ | Great Expectations | Soda | Monte Carlo | *Ref: Informatica DQ + MDM SaaS* |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | AI-Powered Entity Resolution | Probabilistic/deterministic matching for EMPI and provider identity | 10% | 4 | 3 | 2 | 1 | 1 | 1 | 4 |
| 2 | Healthcare Domain Templates | OOB models for NPI, FHIR mappings, health-system structures | 10% | 3 | 2 | 1 | 0 | 0 | 0 | 4 |
| 3 | Cloud-Native Portability | Kubernetes-ready across multi-cloud and on-prem | 10% | 3 | 4 | 3 | 2 | 3 | 3 | 3 |
| 4 | Multi-Tier Relationships | Hierarchies for provider networks and payer structures | 10% | 4 | 3 | 1 | 1 | 1 | 1 | 3 |
| 5 | GenAI-Assisted Stewardship | AI conflict explanation, match summaries, resolution workflows | 10% | 4 | 3 | 3 | 1 | 3 | 3 | 3 |
| 6 | Bi-Directional Sync | Real-time streaming + batch with operational EHRs | 10% | 4 | 3 | 2 | 0 | 1 | 0 | 4 |
| 7 | PHI Privacy & Compliance | HIPAA guardrails, tokenization, masking, consent | 10% | 4 | 3 | 3 | 2 | 2 | 3 | 3 |
| 8 | Third-Party Enrichment | NPI registries, postal checkers, license databases | 10% | 3 | 2 | 3 | 0 | 0 | 0 | 4 |
| 9 | Graph Explorer & Lineage | Visual relationship mapping and provenance | 10% | 4 | 3 | 2 | 1 | 1 | 3 | 3 |
| 10 | FinOps & Resource Scaling | Compute optimization and cost attribution for matching | 10% | 2 | 3 | 3 | 1 | 2 | 3 | 3 |

### 2.2 Weighted scores (Score × Weight) and totals

| # | MDM Feature / Capability | Reltio | Profisee | Informatica DQ | Great Expectations | Soda | Monte Carlo | *Ref: Informatica DQ + MDM SaaS* |
|---|---|---|---|---|---|---|---|---|
| 1 | AI-Powered Entity Resolution | 0.40 | 0.30 | 0.20 | 0.10 | 0.10 | 0.10 | 0.40 |
| 2 | Healthcare Domain Templates | 0.30 | 0.20 | 0.10 | 0.00 | 0.00 | 0.00 | 0.40 |
| 3 | Cloud-Native Portability | 0.30 | 0.40 | 0.30 | 0.20 | 0.30 | 0.30 | 0.30 |
| 4 | Multi-Tier Relationships | 0.40 | 0.30 | 0.10 | 0.10 | 0.10 | 0.10 | 0.30 |
| 5 | GenAI-Assisted Stewardship | 0.40 | 0.30 | 0.30 | 0.10 | 0.30 | 0.30 | 0.30 |
| 6 | Bi-Directional Sync | 0.40 | 0.30 | 0.20 | 0.00 | 0.10 | 0.00 | 0.40 |
| 7 | PHI Privacy & Compliance | 0.40 | 0.30 | 0.30 | 0.20 | 0.20 | 0.30 | 0.30 |
| 8 | Third-Party Enrichment | 0.30 | 0.20 | 0.30 | 0.00 | 0.00 | 0.00 | 0.40 |
| 9 | Graph Explorer & Lineage | 0.40 | 0.30 | 0.20 | 0.10 | 0.10 | 0.30 | 0.30 |
| 10 | FinOps & Resource Scaling | 0.20 | 0.30 | 0.30 | 0.10 | 0.20 | 0.30 | 0.30 |
| **TOTALS** | **Sum of weighted scores (max 4.0)** | **3.50** | **2.90** | **2.30** | **0.90** | **1.40** | **1.70** | ***3.40*** |
| | **Normalized to 100%** | **87.5%** | **72.5%** | **57.5%** | **22.5%** | **35.0%** | **42.5%** | ***85.0%*** |
| | **Rank** | 1 | 2 | 3 | 6 | 5 | 4 | *(reference)* |

### 2.3 Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Reltio | Profisee | Informatica DQ (+MDM) | Great Expectations | Soda | Monte Carlo |
|---|---|---|---|---|---|---|---|
| Product Category Fit | Is this an MDM hub (golden record, match/merge, survivorship)? | Yes | Yes | DQ only; **Yes with MDM SaaS** | No (DQ tests) | No (DQ contracts) | No (observability) |
| Tech Stack Consolidation | Can it retire custom matching scripts and siloed identity apps? | Low risk | Low risk | Low risk (with MDM SaaS) | N/A | N/A | N/A |
| Vendor Lock-in / Ownership | Is the product's independent future clear? | Medium–High (SAP, May 2026) | Low (independent) | Medium (Salesforce) | High (commercial product discontinued) | Medium (small vendor) | Low–Medium |
| Deployment for PHI | Can it run near source systems / inside the perimeter? | SaaS only | SaaS, Kubernetes, on-prem, Fabric | SaaS + on-prem agent | Self-hosted | Self-hosted runner (Enterprise) | Customer-hosted agent |
| HIPAA / HITRUST | Publicly confirmed? | HIPAA + **HITRUST** | HIPAA (SaaS) | HIPAA + FedRAMP Moderate | N/A (OSS) | BAA unconfirmed | BAA unconfirmed |

### 2.4 Analysis — Best Fit for the MDM Pattern

**Reltio is the strongest MDM hub (87.5%).** It leads on the features that matter most for healthcare golden records:
- ML entity resolution (FERN) and a graph-native hierarchy model;
- the broadest set of shipped AI stewardship agents;
- real-time and Kafka synchronization, plus Snowflake zero-copy;
- **HITRUST** certification.

Its risks are deployment and ownership:
- It is **SaaS only**.
- It came under **SAP ownership in May 2026**, so renewal pricing and the roadmap for non-SAP customers should be protected contractually. SAP now also owns Dremio.

**Informatica MDM SaaS with Data Quality is a close alternative (85%, reference column).** It is the best choice if HL7/FHIR handling and one-vendor consolidation matter most. It offers:
- the richest out-of-box healthcare 360 model;
- **NPPES and MedPro** enrichment;
- HL7/FHIR data services;
- FedRAMP Moderate.

It also shares the IDMC contract with the ELT platform that led the earlier ELT/ETL report. The trade-offs are:
- IPU cost that is hard to predict;
- uncertain direction under Salesforce;
- HITRUST not listed.

**Informatica DQ on its own (57.5%) is not an MDM solution.** It only makes sense as part of the Informatica stack, or as the cleansing and verification feed into another hub.

**Profisee (72.5%)** is the most **portable and cost-predictable** hub. It runs on Kubernetes on any cloud, on-prem, or natively in Microsoft Fabric, is priced by record volume, and is independently owned. Its healthcare templates and NPI/FHIR support are thinner, so expect more build effort. It is the best fit for an **Azure/Fabric-first** estate or where the hub must run on-prem next to legacy systems.

**Great Expectations (22.5%), Soda (35%) and Monte Carlo (42.5%) are not MDM candidates.** They should be considered as **complementary layers**:
- **Monte Carlo** for observability and lineage across the MDM supply chain, with proven healthcare payer customers.
- **Soda** (or dbt tests, now in the Fivetran/dbt stack) for data contracts on inbound feeds and golden-record outputs.
- **Great Expectations** only if the enterprise wants to own an open-source validation library. Its commercial product was discontinued in June 2026.

**Recommended target architecture:**
1. **MDM hub:** shortlist **Reltio** and **Informatica MDM SaaS (Healthcare 360)** for a head-to-head proof of concept. Keep **Profisee** as the alternative if on-prem or Kubernetes deployment, Microsoft alignment, or independence from a large acquirer is required.
2. **Data quality on inbound feeds:** use the hub's native DQ, or Informatica DQ if Informatica is chosen. Add **Soda** contracts or dbt tests where engineering teams own pipelines.
3. **Observability:** add **Monte Carlo** across feeds, golden-record tables and downstream consumers.

**Proof-of-concept checklist:**
- Run EMPI matching on real patient data with known duplicates, twins, newborns and aliases.
- Test provider/NPI enrichment and HCP–HCO hierarchies.
- Test golden-record write-back to the EHR (HL7/FHIR), which is custom for every vendor.
- Get a signed BAA, and confirm HITRUST where required.
- Model 3-year TCO: Reltio profile-based pricing vs Informatica IPUs vs Profisee record volume.
- **Dedicated EMPI:** if clinical-grade patient identity is the main driver, consider adding a healthcare-specialist EMPI vendor to the evaluation, since none of the six is certified for clinical EMPI.

---

## Section 3 — Bibliography

The websites and resources consulted for this analysis are grouped by subject below.

### Input
- `INPUTS/snowflake_ai/data_integration_patterns.md`: MDM Part 1 (top 10 features), Part 2 (strategic pillar weighting) and Part 3 (feature scoring template).
- `OUTPUTS/ipaas/compare_elt_vendors.md`, `compare_cdc_vendors.md` and `vendor_compare_data_virt.md`: earlier pattern reports, whose format and qualitative risk template are reused here.

### Reltio
1. SAP News — SAP completes acquisition of Reltio (May 2026) — https://news.sap.com/2026/05/sap-completes-acquisition-of-reltio/
2. Reltio blog — 2026 Gartner Magic Quadrant for MDM — https://www.reltio.com/resources/blog/2026-gartner-magic-quadrant-mdm/
3. Reltio — Context Intelligence Platform — https://www.reltio.com/context-intelligence-platform/
4. Reltio blog — Reltio 2026.1: accelerate agentic transformation with trusted context — https://www.reltio.com/resources/blog/reltio-2026-1-accelerate-agentic-transformation-with-trusted-context/
5. Reltio — AgentFlow — https://www.reltio.com/products/agentflow/
6. Reltio — Reltio for Healthcare Organizations (solution brief PDF) — https://www.reltio.com/wp-content/uploads/2024/12/Reltio-for-Healthcare-Organizations-SB.pdf
7. Reltio docs — Available pretrained FERN models — https://docs.reltio.com/en/applications/console/configuration-applications/ai-powered-flexible-entity-resolution-network-fern-model-based-matching-at-a-glance/fern-based-matching/available-pretrained-fern-models
8. Reltio docs — Zero Copy integration with Snowflake — https://docs.reltio.com/en/applications/data-integrations/zero-copy-integration-at-a-glance/reltio-zero-copy-integration-with-snowflake-at-a-glance
9. PeerSpot — Reltio pros and cons — https://www.peerspot.com/products/reltio-cloud-pros-and-cons
10. Data Ladder — SAP is acquiring Reltio: what customers need to know (competitor-authored) — https://dataladder.com/sap-is-acquiring-reltio-here-is-what-reltio-customers-need-to-know/
11. Manch — Reltio pricing (third-party estimate) — https://manchtech.com/en/Comparison-Blogs-Section/reltio-pricing/

### Profisee
12. Profisee press — AI leadership in MDM with 2026.R1 release — https://profisee.com/press-release/profisee-establishes-ai-leadership-in-master-data-management-with-2026-r1-release/
13. Profisee press — End-to-end MDM in Microsoft Fabric at FabCon 2026 — https://profisee.com/press-release/profisee-brings-end-to-end-master-data-management-fully-into-microsoft-fabric-at-fabcon-2026-adds-fabric-open-mirroring-support-and-copilot-connectivity-via-profisee-mcp-server/
14. Profisee press — Profisee ends FY2026 growing AI-fueled MDM — https://profisee.com/press-release/profisee-ends-fy2026-growing-ai-fueled-mdm/
15. Profisee press — Leader in 2026 Gartner MQ for MDM — https://profisee.com/press-release/profisee-named-a-leader-in-the-2026-gartner-magic-quadrant-for-master-data-management-solutions/
16. Profisee — Pricing — https://profisee.com/pricing/
17. Profisee — Healthcare industry solutions — https://profisee.com/solutions/industries/healthcare/
18. GitHub — Profisee Kubernetes deployment — https://github.com/Profisee/kubernetes
19. Profisee — MDM for Snowflake — https://profisee.com/platform/integration/profisee-mdm-for-snowflake/
20. Profisee — Relationship management — https://profisee.com/platform/relationship-management/
21. Profisee — Address matching and verification — https://profisee.com/platform/address-matching-verification/
22. Microsoft Learn — Purview data governance with Profisee MDM — https://learn.microsoft.com/en-us/purview/data-governance-master-data-management-profisee
23. PeerSpot — Profisee pros and cons — https://www.peerspot.com/products/profisee-pros-and-cons

### Informatica Data Quality / MDM SaaS
24. Salesforce — Salesforce completes acquisition of Informatica (Nov 2025) — https://www.salesforce.com/news/press-releases/2025/11/18/salesforce-completes-acquisition-of-informatica/
25. Informatica press — Leader in 2026 Gartner MQ for Augmented Data Quality (18th time) — https://www.informatica.com/about-us/news/news-releases/2026/02/20260217-salesforce-informatica-named-a-leader-in-the-2026-gartner-magic-quadrant-for-augmented-data-quality-solutions-for-the-18th-time.html
26. Informatica blog — 2026 Gartner MQ for MDM: recognized as a Leader — https://www.informatica.com/blogs/2026-gartner-magic-quadrant-for-mdm-solutions-salesforce-informatica-is-recognized-as-a-leader.html
27. Informatica blog — New capabilities in IDMC Spring 2026 release — https://www.informatica.com/blogs/activate-enterprise-data-with-trusted-context-new-capabilities-in-idmcs-spring-2026-release.html
28. SiliconANGLE — Informatica expands agentic AI strategy with headless data services (May 2026) — https://siliconangle.com/2026/05/20/informatica-expands-agentic-ai-strategy-headless-data-services-unified-agent-governance/
29. Informatica — Industry Solutions for Healthcare Providers (data sheet PDF) — https://www.informatica.com/content/dam/informatica-com/en/collateral/data-sheet/industry-solutions-for-healthcare-providers_data-sheet_5025en.pdf
30. Informatica — Multidomain MDM SaaS (data sheet PDF) — https://www.informatica.com/content/dam/informatica-com/en/collateral/data-sheet/informatica-multidomain-mdm-saas_data-sheet_4305en.pdf
31. Informatica Trust Center — Certifications, assessments and standards — https://www.informatica.com/trust-center/certifications-assessments-standards.html
32. Informatica blog — Volume tier pricing and Flex IPU consumption pricing — https://www.informatica.com/blogs/announcing-volume-tier-pricing-and-flex-ipu-consumption-based-pricing-for-informatica-intelligent-data-management-cloud.html
33. PeerSpot — Informatica Data Quality pros and cons — https://www.peerspot.com/products/informatica-data-quality-pros-and-cons
34. TechRepublic — Informatica Data Quality review — https://www.techrepublic.com/article/informatica-data-quality-review/
35. Informatica docs — Self-service clusters (advanced clusters) — https://docs.informatica.com/cloud-common-services/administrator/current-version/advanced-clusters/advanced-clusters/self-service-clusters.html

### Great Expectations
36. Great Expectations blog — An update from Great Expectations (FICO / GX Cloud) — https://greatexpectations.io/blog/an-update-from-great-expectations/
37. Fivetran press — Fivetran to become steward of the Great Expectations open-source community and GX Core — https://www.fivetran.com/press/fivetran-to-become-steward-of-the-great-expectations-open-source-community-and-gx-core-project
38. Great Expectations blog — Secure AI-powered data quality: ExpectAI for the Agent — https://greatexpectations.io/blog/secure-ai-powered-data-quality-expectai-for-the-agent/
39. Great Expectations blog — GX ExpectAI — https://greatexpectations.io/blog/gx-expectai/
40. GX docs — Expectations overview — https://docs.greatexpectations.io/docs/cloud/expectations/expectations_overview/
41. Modern Data Tools — Great Expectations profile — https://www.modern-datatools.com/tools/great-expectations
42. Great Expectations — Pricing (historical) — https://greatexpectations.io/pricing/
43. TechCrunch — Superconductive raises $40M (Feb 2022) — https://techcrunch.com/2022/02/10/superconductive-creators-of-great-expectations-raises-40m-to-launch-a-commercial-version-of-its-open-source-data-quality-tool/

### Soda
44. Soda blog — Introducing Soda 4.0 — https://soda.io/blog/introducing-soda-4.0
45. Soda — Soda AI — https://soda.io/product/soda-ai
46. Soda — Agentic data cleansing — https://soda.io/product/agentic-data-cleansing
47. Soda docs — Deployment options — https://docs.soda.io/deployment-options.md
48. Soda Trust Center — https://trust.soda.io/
49. Modern Data Tools — Soda pricing — https://www.modern-datatools.com/tools/soda/pricing
50. G2 — Soda reviews — https://www.g2.com/products/soda/reviews
51. Sifflet — Soda review (competitor-authored) — https://www.siffletdata.com/blog/soda-review
52. SiliconANGLE — AI data reliability startup Soda raises $14M (Jul 2024) — https://siliconangle.com/2024/07/11/ai-data-reliability-startup-soda-data-raises-14m/
53. GitHub — soda-core — https://github.com/sodadata/soda-core

### Monte Carlo
54. Monte Carlo blog — Observability Agents — https://montecarlo.ai/blog-monte-carlo-observability-agents
55. TechTarget — Monte Carlo launches first agents for data observability — https://www.techtarget.com/searchdatamanagement/news/366622933/Monte-Carlo-launches-first-agents-for-data-observability
56. BigDATAwire — Monte Carlo's new Agent Observability — https://www.hpcwire.com/bigdatawire/this-just-in/monte-carlos-new-agent-observability-delivers-end-to-end-visibility-across-context-performance-behavior-and-outputs/
57. Monte Carlo docs — Security and compliance overview — https://docs.getmontecarlo.com/docs/security-compliance-overview
58. Monte Carlo docs — Data collector / agent deployment — https://docs.getmontecarlo.com/docs/data-collector
59. Monte Carlo — Request for pricing — https://montecarlo.ai/request-for-pricing/
60. Monte Carlo — Performance monitoring — https://montecarlo.ai/performance-monitoring
61. Monte Carlo — Healthcare and life sciences — https://montecarlo.ai/solutions/healthcare-and-life-sciences
62. G2 — Monte Carlo reviews — https://www.g2.com/products/monte-carlo/reviews
63. Gunderson Dettmer — Monte Carlo reaches $1.6B valuation with $135M Series D — https://www.gunder.com/news/monte-carlo-reaches-1-6b-valuation-with-135m-series-d-financing/

---

*Prepared September 2026 for the Enterprise Architecture team. Scores are research-based estimates from public sources. Items noted as unconfirmed need verification through a vendor PoC and contract review before any selection decision. These include:*
- *all HIPAA BAA and HITRUST positions;*
- *EMPI matching accuracy on real patient data;*
- *post-acquisition roadmaps: Reltio/SAP, Informatica/Salesforce and GX/FICO-Fivetran.*
