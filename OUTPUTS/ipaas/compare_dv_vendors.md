# Data Virtualization Vendor Comparison — Healthcare Enterprise Integration Pattern

**Integration pattern:** Data Virtualization (DV), also called the logical data fabric.

**Evaluation basis** (from `INPUTS/snowflake_ai/data_integration_patterns.md`):
- *Part 1: Top 10 Features & Capabilities for Enterprise Data Virtualization*
- *Part 2: Strategic Pillar Weighting Model for Data Virtualization*
- *Part 3: Data Virtualization Feature Scoring Template (0 to 4 Scale)*

**Market vendors assessed:** Denodo · Starburst · Dremio · IBM Data Virtualization · TIBCO (now Spotfire) Data Virtualization

**Current enterprise technology:** None. The enterprise does not use any technology for this pattern today, so this is a greenfield selection.

**Research date:** September 2026. Sources were vendor docs and release notes, analyst press (Gartner, Forrester, ISG, BARC, Omdia via TechTarget), and reviews on PeerSpot, G2, TrustRadius and Gartner Peer Insights.

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
| Portability & Hybrid/Multi-Cloud | 20% |
| Functional Completeness | 20% |
| Query Performance & Optimization | 15% |
| Governance, Compliance & PHI Security | 15% |
| Complexity & Tech Rationalization | 15% |
| Operational Costs & FinOps | 15% |

In the Part 3 feature matrix, each of the 10 features is weighted **10%**.

> **How to read the scores:** They are starting points drawn from published research, not results from a proof of concept (PoC). Items with thin public evidence are flagged **(low confidence)** or marked `*`.
>
> **HIPAA/BAA:** A signed BAA could not be publicly confirmed for any vendor's **SaaS** offering (Denodo Agora, Starburst Galaxy, Dremio Cloud, IBM CPD as a Service). Confirm this with each vendor before any PHI workload.

---

## Section 1 — Vendor Profiles against the 10 Data Virtualization Features

The ten features, as defined in the input file:

1. Intelligent Query Pushdown
2. Smart Dynamic Caching
3. Enterprise Semantic Layer
4. Cloud-Native Portability
5. Dynamic PHI Masking & RBAC
6. AI-Driven Data Discovery
7. Universal API & SQL Publishing
8. Federated Cross-Source Joins
9. FinOps & Cost Governance
10. Lineage & Impact Analysis

---

### 1.1 Denodo Platform (v9.5; Agora cloud service)

**Context:**
- Privately held; TPG invested $336M in 2023.
- **Gartner MQ for Data Integration Tools:** a Leader for six consecutive years, through Dec 2025.
- **Forrester Enterprise Data Fabric Wave:** a Leader (Q1 2024).
- **PeerSpot:** ranked #1 in Data Virtualization (4.0/5; 95% would recommend).
- The only pure-play logical data management vendor in this set.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Intelligent Query Pushdown | The **ClearOptimizer** cost-based optimizer rewrites queries, pushes aggregations and joins down to the source, and can move data between sources. It can also offload work to an embedded MPP engine. The v9.4 **Lakehouse Accelerator** (built on Velox) claims queries up to 4× faster. Reviewers cite the optimizer as the main reason for good performance. | 4 |
| 2 | Smart Dynamic Caching | Offers partial and full cache modes, plus **Smart Query Acceleration using Summaries**: aggregate-aware materializations that the optimizer reuses transparently. **Automatic Summary Recommendations** mines query logs, but a person still approves what gets created. v9.5 improved Iceberg caching and added direct OneLake reads. | 3 |
| 3 | Enterprise Semantic Layer | The virtual semantic layer is Denodo's core strength. It includes a Data Catalog and Data Marketplace, and v9.5 adds **Metric Views**: governed, reusable KPI definitions shared by dashboards and AI agents. The v9.5 Marketplace can also catalog assets that Denodo does not manage. | 4 |
| 4 | Cloud-Native Portability | Official **Helm charts** for Denodo 9, with guides for EKS, AKS and OpenShift. Solution Manager handles cluster and license management. Runs on-prem or in any cloud. The SaaS option, **Agora**, is on AWS Marketplace (Azure availability not verified), and it is younger and less proven than the self-managed product. | 3 |
| 5 | Dynamic PHI Masking & RBAC | Role- and user-level privileges down to individual columns, row restrictions with masking, and **Global Security Policies** (tag-driven, ABAC-style, applied across all views). v9.3 added **Dynamic Access Controls**, which look up policies in real time. Every query is audited. BAA status for Agora is **unconfirmed**. | 4 |
| 6 | AI-Driven Data Discovery | Denodo Assistant generates tags, descriptions and embeddings automatically. The open-source **AI SDK** provides text-to-VQL and semantic metadata search across 12+ LLMs. **DeepQuery** is a multi-step research agent, and the Marketplace includes a reasoning agent. No ML-based relationship discovery or sensitive-data classification was found. | 3 |
| 7 | Universal API & SQL Publishing | Supports **JDBC, ODBC, ADO.NET, Arrow Flight SQL, REST (JSON/XML), OData 4.0, GraphQL and SOAP**. v9.4 builds in **MCP**, so AI agents can query under the same governance. This is the broadest set of publishing options among the five vendors. | 4 |
| 8 | Federated Cross-Source Joins | Connects to **150+ source types**: all major RDBMS (Oracle, SQL Server, Snowflake, Databricks, BigQuery), NoSQL, JSON/XML/CSV on S3/ADLS, Iceberg (with write-back), web services, SaaS APIs and vector databases. FHIR JSON can be read through JSON wrappers or an Iceberg path. Reviewers report some instability at very high volumes. | 4 |
| 9 | FinOps & Cost Governance | **Resource Manager** rules cap concurrency, memory and query time per user, role or application, and query timeouts are available. Self-managed licensing is per core: predictable, but high. Agora on AWS lists at **$180K to $900K per year**, plus $7.50 per credit for overage. There is no built-in showback per consumer. | 2 |
| 10 | Lineage & Impact Analysis | Design Studio and the Data Catalog show lineage and dependency trees from source through view to web service, which supports impact analysis. A Collibra Governance Bridge is available. Native OpenLineage support is **not confirmed**. | 3 |

**Pros**
- Mature, highly efficient optimizer and caching (PeerSpot).
- Strongest semantic and logical layer: Metric Views plus Data Marketplace (v9.5 release notes).
- Broadest set of publishing protocols, including OData, GraphQL, REST, Arrow Flight SQL and MCP (vendor docs).
- Centralized, tag-based governance with row and column masking and auditing (vendor docs).
- Consistent analyst leadership (Gartner, Forrester).
- Open-source AI tooling (AI SDK, DeepQuery) that works with multiple LLMs (GitHub).
- Faster to deliver than ETL; reviewers call it user-friendly (PeerSpot).

**Cons**
- Expensive: reviewers call it "very expensive," and Agora starts at $180K per year (PeerSpot; AWS Marketplace).
- Very large scans and deeply nested views perform poorly without cache layers (PeerSpot).
- Documentation and training materials are criticized (PeerSpot).
- Agora SaaS is younger, and its BAA status is unconfirmed.
- Needs skilled VQL and cache tuning; summary recommendations are advisory only.
- Advanced features (AI Assistant, MPP, semantics) are gated behind the Enterprise Plus bundle (vendor docs).

**Pricing:** Self-managed is an annual subscription per core, with feature bundles. Agora on AWS runs $180K–$900K per year, plus $7.50 per credit for overage.

---

### 1.2 Starburst (Starburst Galaxy SaaS / Starburst Enterprise Platform — Trino-based)

**Context:**
- Private and venture-backed; the main commercial steward of **Trino**.
- Valuation (about $3.4B) and annual recurring revenue (about $100M) come from third-party estimates only.
- In May 2026 it launched the **Enterprise Intelligence Platform**: AIDA GA, AI-ready data products, Managed Icehouse, and BYOC in preview.
- No current Gartner or Forrester DV placement could be confirmed.
- G2 rating: 4.3/5.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Intelligent Query Pushdown | Trino's cost-based optimizer uses dynamic filtering and pushes predicates, projections, aggregations and limits into connectors. Starburst Enterprise's enhanced connectors (Oracle, SQL Server, Snowflake) read in parallel. The architecture is compute-in-engine MPP: heavy joins run on Trino workers rather than at the source. | 3 |
| 2 | Smart Dynamic Caching | **Warp Speed** indexes and caches new data automatically on worker SSDs. It applies mainly to lake and object-store catalogs; coverage for RDBMS sources is **unverified**. Federated sources use materialized views and cached views, which must be configured. Icehouse LakeOps auto-tunes Iceberg tables. | 3 |
| 3 | Enterprise Semantic Layer | The Gravity catalog provides tags, descriptions and **Data Products** (curated datasets with owners and documentation), and AI-ready data products add business definitions. There is **no dedicated metrics or glossary layer**, so dbt, AtScale or Cube are typically added. | 2 |
| 4 | Cloud-Native Portability | Starburst Enterprise ships **Helm charts** (EKS, AKS, GKE, OpenShift) and runs on-prem. Galaxy is SaaS on **AWS, Azure and GCP**. **BYOC** is in preview, and hybrid Icehouse is available. This is the most flexible set of deployment options among the five. | 4 |
| 5 | Dynamic PHI Masking & RBAC | Enterprise has built-in roles, row filters and column masks, or Apache Ranger. Galaxy adds **tag-based ABAC** (Enterprise tier and above) and integrates with Immuta and Privacera. Query events are logged for audit. A Galaxy BAA is **unconfirmed**. | 3 |
| 6 | AI-Driven Data Discovery | Gravity includes **automatic data classification**: a fine-tuned DeBERTa model suggests about 22 PII tags from sampled data. **AIDA** (GA 2026) is a natural-language assistant that answers questions and builds visualizations. There is also a Starburst AI Agent and SQL AI functions. Omdia flags gaps in AI observability. | 3 |
| 7 | Universal API & SQL Publishing | Access is via JDBC, ODBC, the Trino HTTP protocol, Python/Go clients, and a **built-in read-only MCP server**. There is **no native OData, GraphQL or REST data-service publishing**; reviewers cite the lack of REST. | 2 |
| 8 | Federated Cross-Source Joins | **50+ connectors**: Oracle, SQL Server, Snowflake, Postgres, Teradata, MongoDB, Elasticsearch, Kafka, and Hive/Iceberg/Delta/Hudi on S3, ADLS or GCS. Excellent for FHIR JSON stored in the lake. SaaS and REST source coverage is thin. | 3 |
| 9 | FinOps & Cost Governance | Enterprise **resource groups** set concurrency and memory caps and queueing, plus query timeouts and limits. Galaxy adds auto-suspend, autoscaling, utilization monitoring and billing views. Credit pricing is transparent at **$0.50–$1.00 per credit**. Omdia flags that there is no cost control for AI workloads. | 3 |
| 10 | Lineage & Impact Analysis | Galaxy has **column-level lineage** (preview; direct lineage only; 30-day retention). Starburst Enterprise and Trino provide an **OpenLineage event listener** that feeds Marquez, DataHub or Collibra. Lineage through to consumers is limited. | 3 |

**Pros**
- Fast MPP performance at lake scale (G2's top theme).
- Built on open source (Trino, Iceberg), which keeps lock-in low (vendor; analysts).
- Most flexible deployment: three-cloud SaaS, self-managed Kubernetes, BYOC (vendor docs).
- Automatic PII classification plus tag-based ABAC (vendor blog).
- Strong agentic direction: AIDA, MCP, AI functions. BARC praises its data-product approach (TechTarget).
- Transparent pay-per-use credit pricing (pricing page).

**Cons**
- Slows down on complex, concurrent workloads; this is the most frequent G2 complaint.
- Complex setup, steep learning curve and thin documentation (G2).
- Weak semantic, metrics and API publishing layers: no OData, GraphQL or REST (PeerSpot; docs).
- Adding catalogs in Starburst Enterprise requires a cluster restart, and running it on Kubernetes needs skilled staff (PeerSpot).
- Omdia says AI observability and cost control are missing, and its performance against Databricks, Dremio and Snowflake is unproven (TechTarget).
- Costs escalate as clusters scale (G2).

**Pricing:**
- **Galaxy:** Free tier; Pro from $0.50 per credit; Enterprise from $0.75 per credit; Mission-Critical from $1.00 per credit.
- **Starburst Enterprise:** custom annual subscription.
- Cloud infrastructure is billed separately.

---

### 1.3 Dremio (Dremio Enterprise / Dremio Cloud)

**Context — major change:**
- **SAP acquired Dremio.** The deal was announced on 4 May 2026 and **closed on 6 Jul 2026**, and Dremio is being folded into SAP Business Data Cloud.
- Dremio says its Cloud, Enterprise and Community editions will continue.
- No detailed roadmap for non-SAP customers has been published, which is a **material roadmap risk**.
- Ratings: G2 4.6/5; PeerSpot 4.2/5.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Intelligent Query Pushdown | A cost-based optimizer built on Apache Calcite runs on an **Arrow-native vectorized engine**. Relational connectors push down filters, projections and aggregations, and pruning on Iceberg and Parquet is strongest. Reviewers report slow nested queries and correlated subqueries, and no recursive CTEs. | 3 |
| 2 | Smart Dynamic Caching | **Autonomous Reflections** (Dremio Cloud only) analyze the last 7 days of queries nightly, then create reflections, drop them and manage their lifecycle automatically. However, they apply **only to Iceberg, Parquet and views on them**. Federated RDBMS sources, and the self-managed Enterprise edition, need manual reflections (plus recommendations). *For a Cloud estate that is Iceberg-only, this would score 4.* | 3 |
| 3 | Enterprise Semantic Layer | The **AI Semantic Layer** is built from spaces and virtual datasets, with wikis and labels that AI can generate automatically, plus semantic search. No dedicated metric or KPI object is documented. | 3 |
| 4 | Cloud-Native Portability | Dremio Enterprise can be self-managed on Kubernetes with Helm, on-prem, or on AWS, Azure or GCP. **Dremio Cloud is AWS-only**; Azure is listed as "coming soon". Its Open Catalog (built on Apache Polaris) interoperates with Spark, Trino, Glue and Unity Catalog. | 3 |
| 5 | Dynamic PHI Masking & RBAC | RBAC plus **row-access and column-masking policies written as SQL UDFs**, not tag-based ABAC. Limits: only one mask per column, and restrictions when reflections involve masked columns. The Cloud compliance page claims HIPAA, SOC 2 Type II and ISO 27001; no BAA is stated. | 3 |
| 6 | AI-Driven Data Discovery | Built-in **AI Agent** for natural-language-to-SQL, exploration and charts. AI generates wikis and labels, and AI SQL functions can process PDFs and images. Autonomous Reflections and automatic Iceberg clustering handle tuning. An MCP server is available. **No automatic PII classification.** | 3 |
| 7 | Universal API & SQL Publishing | Access via **JDBC, ODBC, native Arrow Flight** (fast for Python and ML), REST API, an Iceberg REST catalog endpoint, and an **MCP server**. No OData or GraphQL. | 3 |
| 8 | Federated Cross-Source Joins | Connectors for Oracle, SQL Server, Snowflake, Postgres, MySQL, Redshift, MongoDB, Elasticsearch, files on S3/ADLS/GCS, and Iceberg catalogs. **Essentially no SaaS-application connectors.** Analysts say federation is weaker than its lakehouse core. | 2 |
| 9 | FinOps & Cost Governance | **Engines** give per-workload compute isolation and autoscaling, with queues, **engine routing rules**, timeouts and memory limits. Cloud pricing is simple at **$0.20 per DCU**. Job history can be attributed to each engine. | 3 |
| 10 | Lineage & Impact Analysis | **Dataset-level** lineage graph and Lineage API. Column-level lineage and native OpenLineage export are not documented. | 2 |

**Pros**
- The most automated acceleration: Autonomous Reflections on Iceberg need no tuning (vendor docs; BARC).
- Iceberg-native and open (Polaris catalog, Arrow Flight), so interoperable with low lock-in (vendor; TechTarget).
- The easiest to use of the five, with good Power BI and Tableau integration (G2 4.6/5).
- Fast Arrow Flight access for data science, ML and AI-agent workloads.
- Simple DCU pricing and per-workload engine isolation (pricing page).
- Claims HIPAA, SOC 2 Type II and ISO 27001 compliance for Dremio Cloud.

**Cons**
- **SAP ownership (July 2026).** Roadmap and pricing for non-SAP estates are uncertain (Futurum, ARC).
- Dremio Cloud is AWS-only.
- Autonomous acceleration does not cover federated RDBMS sources, and there are no SaaS connectors (vendor docs; TechTarget).
- Complex setup, slow support and thin documentation (G2).
- Gaps with complex nested SQL and with Delta/Databricks connectivity (PeerSpot).
- Masking is UDF-based rather than tag/ABAC-based, and lineage is only at dataset level.

**Pricing:** Dremio Cloud is **$0.20 per DCU**, consumption-based. Enterprise is priced by quote, and Community Edition is free. Expect SAP to repackage it inside Business Data Cloud.

---

### 1.4 IBM Data Virtualization (Cloud Pak for Data; watsonx.data / watsonx.data intelligence)

**Context:**
- **The product:** "Watson Query" has been renamed back to **IBM Data Virtualization**. It is a service in **Cloud Pak for Data (CPD)**; CPD 5.3 shipped in Dec 2025 and CPD 5.4 on 10 Jun 2026. It is also available as a managed service on IBM Cloud.
- **Related but separate products:** DV is a different engine from **watsonx.data**, IBM's Presto/Spark lakehouse; a DV connector to watsonx.data Presto was added in 5.3. Governance comes from **watsonx.data intelligence**, which includes Knowledge Catalog and Manta lineage.
- **Corporate direction:** IBM completed its acquisition of Confluent in March 2026.
- **Analyst view:** ISG warns of overlapping products and changing names; buyers should check exactly which offering includes which feature.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Intelligent Query Pushdown | An MPP federation engine derived from Db2/Big SQL, with a cost-based optimizer. Work is split across **agents placed near the data sources**. Recent additions: OLAP pushdown for Oracle, pushdown of common subexpressions, and better handling of large queries. CPD 5.3 improved scaling and concurrency. | 3 |
| 2 | Smart Dynamic Caching | **Autocaching** caches the most-queried data and evicts caches that are no longer used. A **cache recommendation engine** analyzes query workloads and ranks candidate caches. Caches are materialized query tables, and the docs list restrictions on which queries they can serve. | 3 |
| 3 | Enterprise Semantic Layer | **IBM Knowledge Catalog** provides the business glossary, governance artifacts, reference data, and **Knowledge Accelerators** (industry vocabularies, including healthcare). CPD 5.3 added versioning for glossary terms. Virtual objects are published to catalogs and linked to terms. There is no dedicated metrics layer. | 3 |
| 4 | Cloud-Native Portability | Runs **only on Red Hat OpenShift**: on-prem, ROSA (AWS), ARO (Azure) or IBM Cloud, plus a managed IBM Cloud service. CPD 5.4 added multitenancy. **Plain Kubernetes (EKS, AKS, GKE) and Helm are not supported.** The OpenShift footprint is heavy. | 3 |
| 5 | Dynamic PHI Masking & RBAC | Knowledge Catalog **data protection rules** trigger on user groups, classifications or business terms. They can redact, substitute, apply format-preserving obfuscation, or filter rows, and Data Source Definitions extend the rules to other services. CPD 5.3 added fuller audit capabilities. **Caution:** IBM has published a security bulletin and a 5.2.x known issue in which rules were **not enforced** on virtual objects, so regression-test HIPAA controls after every upgrade. | 3 |
| 6 | AI-Driven Data Discovery | Knowledge Catalog automatically classifies data and enriches metadata with generative AI. watsonx.data intelligence adds a natural-language assistant and text-to-SQL. **Agentic Data Intelligence** exposes catalog context, lineage and policies to AI agents over MCP; it is on SaaS since Apr 2026, with self-managed later in 2026. Cache recommendations handle tuning. | 3 |
| 7 | Universal API & SQL Publishing | JDBC and ODBC (Db2-compatible drivers), plus a REST API. Official MCP servers exist for watsonx.data and watsonx.data intelligence. There is **no native OData or GraphQL publishing** from DV; that would need API Connect/StepZen (unconfirmed). | 2 |
| 8 | Federated Cross-Source Joins | Broad relational coverage: Oracle, SQL Server, Snowflake, Db2, Netezza. Also object-store files (CSV, Parquet, ORC), REST APIs (connector added in 2025), and Cassandra and watsonx.data Presto (5.3). Satellite connectors and remote agents reach on-prem sources. SaaS coverage is thinner. | 3 |
| 9 | FinOps & Cost Governance | Db2-style query controls plus OpenShift resource quotas. Licensing is per Virtual Processor Core (VPC) and complex, and reviewers flag high cost and difficult budgeting. No native per-consumer chargeback. | 2 |
| 10 | Lineage & Impact Analysis | **IBM Manta Data Lineage** provides column-level lineage for DV. CPD 5.4 added lineage version comparison, OpenLineage monitoring and more scanners, and BI-tool scanners give lineage from source to view to dashboard. This is among the strongest lineage offerings in the market, **but Manta is licensed separately**; without it, lineage is roughly a 2. | 4* |

**Pros**
- A single stack for governance, catalog, lineage and virtualization, with rules enforced directly on virtual views (G2, PeerSpot).
- Automated metadata tagging and dynamic masking support compliance (G2).
- Hybrid and multi-cloud configuration described as "very seamless". PeerSpot ranks it #3 in Data Virtualization (8.2).
- MPP engine, autocaching and ranked cache recommendations (IBM docs).
- Market-leading lineage through Manta, now with OpenLineage (IBM).
- Agentic direction: MCP servers and Agent Skills (IBM 2026).
- ISG Buyers Guide rates IBM "Exemplary" (Sept 2025).

**Cons**
- Complex, slow setup that requires OpenShift and Kubernetes expertise (G2).
- Expensive, with complex licensing and a large infrastructure footprint (G2, PeerSpot).
- Hard-to-navigate UI and difficult documentation (G2).
- Upgrades disrupt workflows, and backup and restore are painful (G2).
- Overlapping products and frequent renaming (ISG).
- History of protection rules not being enforced on virtual objects (IBM security bulletin).
- No native OData or GraphQL publishing.

**Pricing:** Cloud Pak for Data is licensed per VPC, and DV is a CPD service. The IBM Cloud managed service offers Lite, Essentials and Standard plans. Manta and watsonx.data intelligence are extra. Pricing is by quote at enterprise levels.

---

### 1.5 TIBCO Data Virtualization — now **Spotfire Data Virtualization (SDV)**

**Context — major change:**
- **Rebranded and repackaged.** Under Cloud Software Group (the owner of TIBCO and Citrix), **Spotfire Data Virtualization replaced TIBCO DV on 1 Dec 2025**. It is sold **only through Spotfire Platform subscriptions** as the "Enterprise Advanced Data Services" add-on, and existing TDV licenses can no longer be renewed.
- **Latest release:** SDV 8.9.0 (Apr 2026) focused on security and Snowflake features. It added **no AI or cloud-native features**.
- **Market mindshare:** PeerSpot shows a fall from 18.6% to 11.4% year over year.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Intelligent Query Pushdown | Combines cost- and rule-based optimization with predicate pushdown and automatic join-strategy selection (data ship joins, semi-joins). 8.9 added Snowflake data ship join, top-N handling and multi-column IN rewrites. Some reviewers say heavy processing still lands on the DV server. | 3 |
| 2 | Smart Dynamic Caching | Caches refresh on a schedule, on events, manually or incrementally. Supports multi-table caching and parallel or native bulk load, and caches can be stored in Snowflake, Postgres or Greenplum. 8.9 added **Data Staging** with monitoring. Caches are defined by hand, with no workload-driven recommendations. | 3 |
| 3 | Enterprise Semantic Layer | Views are layered as physical, logical and business. **Business Directory** is a self-service catalog with search, categories and preview. There is no full glossary, stewardship or metrics layer. | 2 |
| 4 | Cloud-Native Portability | Supports Docker and Kubernetes (documented container orchestration) and runs on AWS, Azure or GCP VMs, or on-prem. No official Helm charts, OpenShift certification or SaaS option was found. | 2 |
| 5 | Dynamic PHI Masking & RBAC | Row-based policies and **column-based obfuscation** (e.g. masking SSNs). Authentication via LDAP, Kerberos, SAML and mutual TLS (8.9). Row policies are mostly written in SQL, with **no native ABAC or classification-driven policy**. Auditing relies on server logs. Reviewers call the permissions "very tedious to maintain." | 2 |
| 6 | AI-Driven Data Discovery | **No AI capabilities in SDV 8.9.** The older Studio "Discovery" feature finds relationships from sampled data. Spotfire Copilot is analytics-side only. | 1 |
| 7 | Universal API & SQL Publishing | Out of the box: JDBC, ODBC and ADO.NET, plus **SOAP, REST (JSON/XML) and OData** web services. Reviewers note that data can be exposed as REST "without additional coding." No GraphQL or MCP. | 3 |
| 8 | Federated Cross-Source Joins | 40+ adapters: relational databases (Oracle, SQL Server, Snowflake), big data, files (Excel, CSV, XML, JSON), and ERP, CRM and SaaS sources. Some native drivers are missing (Gartner Peer Insights). Nested FHIR JSON in object storage is limited. | 3 |
| 9 | FinOps & Cost Governance | **Workload Management rules** cap rows returned, memory, timeouts and requests per user or resource. No cost attribution. Pricing is predictable but now bundled with Spotfire. | 2 |
| 10 | Lineage & Impact Analysis | The Studio lineage panel and where-used analysis cover sources, views and published resources. No OpenLineage, no BI-consumer scanning, and integration with external catalogs is limited or custom. | 2 |

**Pros**
- A mature, proven federation engine with a good optimizer (Gartner Peer Insights 4.0/5).
- Strong, flexible caching that keeps a "live copy" of data (TrustRadius).
- Broad no-code publishing: REST, SOAP, OData, JDBC, ODBC and ADO.NET (TrustRadius; datasheet).
- Row-level, column-level and abstraction-based security (TrustRadius).
- Business Directory for self-service by business users (datasheet).
- 8.9 security improvements: mutual TLS, Kerberos delegation, Snowflake key-pair authentication (release notes).

**Cons**
- **Lock-in and product risk.** Since Dec 2025 SDV is sold only through Spotfire, and TDV licenses can't be renewed (TIBCO support notice).
- No AI, agent, MCP or natural-language-to-SQL roadmap visible (8.9 release notes).
- Limited cloud-native support: no SaaS, Helm or OpenShift certification.
- Tedious permissions management and a dated UI and IDE (TrustRadius).
- Memory problems and crashes under heavy load; struggles at TB/PB scale (TrustRadius).
- Small community, slow support, and gaps in documentation (Gartner Peer Insights; TrustRadius).
- Falling mindshare (PeerSpot).

**Pricing:** Subscription by quote, available **only** as a Spotfire Enterprise "Advanced Data Services" add-on.

---

## Section 2 — Comparison: Data Virtualization Feature Scoring Template (0 to 4 Scale)

This uses *Part 3: Data Virtualization Feature Scoring Template* from `data_integration_patterns.md`. Each feature has a **10% weight**. Weighted score = Score × 10%. Total = sum of weighted scores (maximum 4.0). Normalized % = Total ÷ 4.0.

### 2.1 Raw scores (0–4)

| # | Data Virtualization Feature | Description & Evaluation Focus | Weight | Denodo | Starburst | Dremio | IBM Data Virtualization | TIBCO / Spotfire DV |
|---|---|---|---|---|---|---|---|---|
| 1 | Intelligent Query Pushdown | Cost-based optimizer moving computation to source DBs | 10% | 4 | 3 | 3 | 3 | 3 |
| 2 | Smart Dynamic Caching | Automated policy-driven materialization | 10% | 3 | 3 | 3 | 3 | 3 |
| 3 | Enterprise Semantic Layer | Business glossaries and standard definitions | 10% | 4 | 2 | 3 | 3 | 2 |
| 4 | Cloud-Native Portability | Kubernetes-ready across multi-cloud and on-prem | 10% | 3 | 4 | 3 | 3 | 2 |
| 5 | Dynamic PHI Masking & RBAC | Row/column security, HIPAA guards | 10% | 4 | 3 | 3 | 3 | 2 |
| 6 | AI-Driven Data Discovery | ML relationship mapping, auto-classification, tuning | 10% | 3 | 3 | 3 | 3 | 1 |
| 7 | Universal API & SQL Publishing | REST, GraphQL, OData, SQL endpoints | 10% | 4 | 2 | 3 | 2 | 3 |
| 8 | Federated Cross-Source Joins | Relational, NoSQL, object storage | 10% | 4 | 3 | 2 | 3 | 3 |
| 9 | FinOps & Cost Governance | Resource tracking, concurrency caps, cost attribution | 10% | 2 | 3 | 3 | 2 | 2 |
| 10 | Lineage & Impact Analysis | Source-to-view-to-consumer traceability | 10% | 3 | 3 | 2 | 4* | 2 |

\* The IBM lineage score of 4 assumes IBM Manta Data Lineage is licensed; without it, score ~2.

### 2.2 Weighted scores (Score × Weight) and totals

| # | Data Virtualization Feature | Denodo | Starburst | Dremio | IBM Data Virtualization | TIBCO / Spotfire DV |
|---|---|---|---|---|---|---|
| 1 | Intelligent Query Pushdown | 0.40 | 0.30 | 0.30 | 0.30 | 0.30 |
| 2 | Smart Dynamic Caching | 0.30 | 0.30 | 0.30 | 0.30 | 0.30 |
| 3 | Enterprise Semantic Layer | 0.40 | 0.20 | 0.30 | 0.30 | 0.20 |
| 4 | Cloud-Native Portability | 0.30 | 0.40 | 0.30 | 0.30 | 0.20 |
| 5 | Dynamic PHI Masking & RBAC | 0.40 | 0.30 | 0.30 | 0.30 | 0.20 |
| 6 | AI-Driven Data Discovery | 0.30 | 0.30 | 0.30 | 0.30 | 0.10 |
| 7 | Universal API & SQL Publishing | 0.40 | 0.20 | 0.30 | 0.20 | 0.30 |
| 8 | Federated Cross-Source Joins | 0.40 | 0.30 | 0.20 | 0.30 | 0.30 |
| 9 | FinOps & Cost Governance | 0.20 | 0.30 | 0.30 | 0.20 | 0.20 |
| 10 | Lineage & Impact Analysis | 0.30 | 0.30 | 0.20 | 0.40 | 0.20 |
| **TOTALS** | **Sum of weighted scores (max 4.0)** | **3.40** | **2.90** | **2.80** | **2.90** | **2.30** |
| | **Normalized to 100%** | **85.0%** | **72.5%** | **70.0%** | **72.5%** | **57.5%** |
| | **Rank** | 1 | 2= | 4 | 2= | 5 |

### 2.3 Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Denodo | Starburst | Dremio | IBM DV | TIBCO / Spotfire DV |
|---|---|---|---|---|---|---|
| Tech Stack Consolidation | Can this retire point-to-point copy scripts and redundant data marts? | Low risk | Medium (weak API/semantic layer) | Medium (weak federation to SaaS/RDBMS) | Medium (needs CPD estate) | High |
| Vendor Lock-in Risk | If the core data platform changes in 3 years, how easily do virtual models move? | Medium (proprietary VQL) | Low (Trino, Iceberg) | Medium–High (SAP ownership) | High (OpenShift + CPD bundle) | High (Spotfire-only licensing) |
| Vendor / Roadmap Stability | Is the product's future clear for a non-bundled buyer? | Low risk | Low–Medium | High (SAP integration) | Medium (naming churn) | High (deprioritized, no AI roadmap) |
| Data Steward Adoption | Can non-technical clinical/finance analysts self-serve? | Pass (Marketplace, Metric Views) | Pass (data products, AIDA) | Pass (AI Agent, wikis) | Pass (Knowledge Catalog) | Partial (Business Directory) |
| HIPAA / BAA (SaaS) | Is a BAA confirmed for the managed offering? | Unconfirmed | Unconfirmed | Claims HIPAA; BAA unconfirmed | Unconfirmed | N/A (no SaaS) |

### 2.4 Analysis — Best Fit for the Data Virtualization Pattern

**Denodo is the clear best fit (85%)** for a logical data fabric in a multi-domain healthcare enterprise. It is the only vendor that scores 4 on all of these capabilities:
- Query pushdown
- Semantic layer (Metric Views)
- PHI masking (tag-driven Global Security Policies)
- API publishing (REST, OData, GraphQL, MCP)
- Federation breadth (150+ sources)

These are the capabilities that matter most for unifying clinical, claims and operational silos without copying data. It also has the most consistent analyst leadership. The trade-offs to negotiate are:
- High cost: licensing is per core, and Agora starts at $180K per year.
- Weak built-in FinOps.
- Unconfirmed BAA for the Agora SaaS. For PHI, the self-managed deployment on Kubernetes is the safer starting point.

**Starburst (72.5%)** is the best choice if the goal is really **lakehouse-scale federated SQL**: querying Iceberg/Delta data (including FHIR JSON) alongside Snowflake, Oracle and SQL Server at MPP scale. Its strengths are the most flexible deployment options, open Trino/Iceberg foundations, lowest lock-in and transparent credit pricing. It is weak as a business semantic layer and as an API/data-services publisher, so it would typically be paired with dbt or a metrics layer.

**IBM Data Virtualization (72.5%)** is compelling only if the enterprise already runs **Cloud Pak for Data on OpenShift**. In that case it brings Knowledge Catalog protection rules, healthcare Knowledge Accelerators and best-in-class Manta lineage. For a greenfield buyer, however:
- The OpenShift-only footprint, VPC licensing and product-naming churn add significant complexity.
- The published issue with rules not being enforced on virtual objects needs careful regression testing.

**Dremio (70%)** has excellent autonomous acceleration and ease of use on Iceberg. However, its federation to RDBMS and SaaS sources is weaker, Dremio Cloud is AWS-only, and the **July 2026 SAP acquisition** creates roadmap uncertainty for a non-SAP healthcare estate. Consider it only as a lakehouse query and acceleration layer, not as the enterprise DV standard.

**TIBCO / Spotfire DV (57.5%)** is **not recommended**. The engine is mature, but since Dec 2025 it is available only through Spotfire subscriptions, has no AI roadmap and no cloud-native/SaaS option, and its mindshare is falling.

**Recommendation.** Since there is no incumbent DV tool, adopt **Denodo (self-managed on Kubernetes)** as the enterprise logical data fabric and semantic/API layer, and shortlist **Starburst** as the alternative (or complement) for lake-scale federated analytics. Run a proof of concept (PoC) covering:
1. **Federated join test:** join Oracle claims data, SQL Server Clarity data and FHIR JSON in Iceberg, and measure pushdown behaviour and cache hit rates.
2. **PHI masking test:** check that masking is enforced consistently across SQL, REST and MCP consumers.
3. **BAA and deployment terms:** confirm each vendor's BAA and deployment model for PHI workloads.
4. **Cost comparison:** compare 3-year TCO, weighing Denodo's per-core licensing against Starburst's consumption-based credits.

Also consider how much DV overlaps with the Snowflake-centred direction in the earlier ELT and CDC reports. If most data will land in Snowflake anyway, the DV layer's main value shifts to the **semantic layer, PHI governance across non-Snowflake sources, and API/agent publishing** rather than raw federation.

---

## Section 3 — Bibliography

These are the websites and resources consulted for this analysis, grouped by subject.

### Input
- `INPUTS/snowflake_ai/data_integration_patterns.md` — Data Virtualization Part 1 (Top 10 features), Part 2 (Strategic pillar weighting), Part 3 (Feature scoring template)
- `OUTPUTS/ipaas/compare_elt_vendors.md`, `OUTPUTS/ipaas/compare_cdc_vendors.md` — prior pattern reports (format and qualitative risk template reused)

### Denodo
1. Denodo Community — New release notes — https://community.denodo.com/new-release/
2. Denodo press — Denodo Platform 9.4 accelerates path to agentic AI (Mar 2026) — https://www.denodo.com/en/press-release/2026-03-10/denodo-platform-94-accelerates-path-successful-agentic-ai-production
3. Denodo press — Denodo Platform 9.3 now available (Sept 2025) — https://www.denodo.com/en/press-release/2025-09-16/denodo-platform-93-now-available-breakthrough-support-ai-innovation
4. GitHub — Denodo AI SDK — https://github.com/denodo/denodo-ai-sdk
5. Denodo docs — Summary recommendations — https://community.denodo.com/docs/html/browse/9.2/en/vdp/administration/optimizing_queries/summary_views/summary_recommendations/summary_recommendations
6. Denodo docs — Platform feature packs — https://community.denodo.com/docs/html/browse/latest/en/platform/administration/denodo_platform_feature_packs/denodo_platform_feature_packs
7. Denodo tutorials — Data consumers (publishing protocols) — https://community.denodo.com/tutorials/browse/consumers/index
8. Denodo docs — Global Security Policies — https://community.denodo.com/docs/html/browse/latest/en/vdp/administration/databases_users_and_access_rights_in_virtual_dataport/global_security_policies/global_security_policies
9. Denodo docs — Denodo Platform 9 Helm Charts quick start guide — https://community.denodo.com/docs/html/document/9.0/en/Denodo%20Platform%209%20Helm%20Charts%20Quick%20Start%20Guide
10. AWS Marketplace — Denodo Agora listing — https://aws.amazon.com/marketplace/pp/prodview-ze2asxcox56o2
11. PeerSpot — Denodo pros and cons — https://www.peerspot.com/products/denodo-pros-and-cons
12. Denodo press — Leader in 2025 Gartner MQ for Data Integration Tools, six consecutive years — https://www.denodo.com/en/press-release/2025-12-11/denodo-named-leader-2025-gartnerr-magic-quadranttm-data-integration-tools-six-consecutive-years
13. Denodo press — TPG to invest $336 million in Denodo — https://www.denodo.com/en/press-release/2023-09-13/tpg-invest-336-million-denodo-accelerate-growth-data-management-leader

### Starburst
14. Starburst press — Starburst unveils Enterprise Intelligence Platform (May 2026) — https://www.starburst.io/press-releases/starburst-unveils-enterprise-intelligence-platform-giving-enterprises-a-faster-path-to-trusted-ai/
15. TechTarget — New Starburst platform extends AI to distributed data — https://www.techtarget.com/searchdatamanagement/news/366643641/New-Starburst-platform-extends-AI-to-distributed-data
16. Starburst blog — Starburst Enterprise AI and Iceberg release 477 — https://www.starburst.io/blog/starburst-enterprise-ai-iceberg-release-477/
17. Starburst — Pricing — https://www.starburst.io/pricing/
18. Starburst docs — Performance features (Warp Speed) — https://docs.starburst.io/introduction/performance-features.html
19. Starburst docs — Galaxy access control policy types — https://docs.starburst.io/starburst-galaxy/security-and-compliance/manage-data-access/access-control-policy-types.html
20. Starburst blog — Introducing automatic data classification — https://www.starburst.io/blog/introducing-automatic-data-classification/
21. Starburst docs — Galaxy data lineage — https://docs.starburst.io/starburst-galaxy/working-with-data/explore-data/data-lineage.html
22. Starburst docs — OpenLineage event listener — https://docs.starburst.io/latest/admin/event-listeners-openlineage.html
23. Starburst docs — Resource groups — https://docs.starburst.io/latest/admin/resource-groups.html
24. G2 — Starburst reviews — https://www.g2.com/products/starburst/reviews?qs=pros-and-cons
25. PeerSpot — Starburst Enterprise reviews — https://www.peerspot.com/products/starburst-enterprise-reviews

### Dremio
26. SAP News — SAP completes Dremio acquisition (Jul 2026) — https://news.sap.com/2026/07/sap-completes-dremio-acquisition/
27. Dremio blog — SAP intends to acquire Dremio — https://www.dremio.com/blog/sap-intends-to-acquire-dremio/
28. TechTarget — Dremio Cloud: an autonomous lakehouse powered by AI agents — https://www.techtarget.com/searchdatamanagement/news/366634167/Dremio-Cloud-An-autonomous-lakehouse-powered-by-AI-agents
29. Dremio docs — Autonomous Reflections — https://docs.dremio.com/dremio-cloud/admin/performance/autonomous-reflections/
30. Dremio docs — About Dremio Cloud — https://docs.dremio.com/dremio-cloud/about/
31. Dremio — Pricing — https://www.dremio.com/pricing/
32. Dremio docs — Row-access and column-masking policies — https://docs.dremio.com/dremio-cloud/manage-govern/row-column-policies/
33. Dremio docs — Wikis and labels — https://docs.dremio.com/dremio-cloud/manage-govern/wikis-labels/
34. Dremio docs — Lineage — https://docs.dremio.com/current/data-products/govern/lineage/
35. Dremio docs — Cloud security compliance — https://docs.dremio.com/cloud/security/compliance/
36. G2 — Dremio reviews — https://www.g2.com/products/dremio/reviews?qs=pros-and-cons
37. PeerSpot — Dremio pros and cons — https://www.peerspot.com/products/dremio-pros-and-cons

### IBM Data Virtualization
38. IBM — Data Virtualization (formerly Watson Query) product page — https://www.ibm.com/products/watson-query
39. IBM announcement — Cloud Pak for Data v5.3 — https://www.ibm.com/new/announcements/cloud-pak-for-data-v5-3-smarter-faster-and-built-for-scale
40. IBM announcement — Cloud Pak for Data 5.4 — https://www.ibm.com/new/announcements/ibm-cloud-pak-for-data-5-4-driving-business-value-from-trusted-data
41. IBM Community — Data Virtualization enhancements in Cloud Pak for Data — https://community.ibm.com/community/user/blogs/tina-chan/2025/04/25/data-virtualization-enhancements-in-cloud-pak-for
42. ISG — IBM enhances data intelligence and data integration — https://research.isg-one.com/analyst-perspectives/ibm-enhances-data-intelligence-and-data-integration
43. IBM announcement — Agentic Data Intelligence in watsonx.data intelligence software — https://www.ibm.com/new/announcements/agentic-data-intelligence-is-now-available-in-ibm-watsonx-data-intelligence-software
44. GitHub — IBM watsonx.data MCP server — https://github.com/IBM/ibm-watsonxdata-mcp-server
45. G2 — IBM Cloud Pak for Data reviews — https://www.g2.com/products/ibm-cloud-pak-for-data/reviews
46. PeerSpot — IBM Cloud Pak for Data vs TIBCO Data Virtualization — https://www.peerspot.com/products/comparisons/ibm-cloud-pak-for-data_vs_tibco-data-virtualization
47. IBM Newsroom — IBM completes acquisition of Confluent (Mar 2026) — https://newsroom.ibm.com/2026-03-17-ibm-completes-acquisition-of-confluent,-making-real-time-data-the-engine-of-enterprise-ai-and-agents
48. IBM Support — Security bulletin (data protection rules) — https://www.ibm.com/support/pages/node/6456033
49. IBM Docs — Known issue: data protection rules not enforced (CPD 5.2.x) — https://www.ibm.com/docs/en/cloud-paks/cp-data/5.2.x?topic=issues-data-protection-rules-are-not-enforced

### TIBCO / Spotfire Data Virtualization
50. TIBCO docs — TIBCO Data Virtualization product documentation — https://docs.tibco.com/products/tibco-data-virtualization
51. TIBCO docs — Spotfire Data Virtualization 8.9.0 release notes (PDF) — https://docs.tibco.com/pub/sdv/8.9.0/SPOT_sdv_8.9.0_relnotes.pdf
52. TIBCO Support — New Spotfire Data Virtualization product notice — https://support.tibco.com/external/article/137940/new-spotfire-data-virtualization-product.html
53. Spotfire blog — The future of TIBCO Data Virtualization: big changes ahead (Jun 2025) — https://www.spotfire.com/blog/2025/06/25/the-future-of-tibco-data-virtualization-big-changes-ahead/
54. Spotfire blog — Visual data science reimagined: new streamlined Spotfire offering — https://www.spotfire.com/blog/2025/03/03/visual-data-science-reimagined-new-streamlined-spotfire-offering/
55. Spotfire — Spotfire Data Virtualization solution page — https://www.spotfire.com/solutions/spotfire-data-virtualization
56. TIBCO docs — TDV container orchestration using Kubernetes (8.8.0) — https://docs.tibco.com/pub/tdv/8.8.0/doc/html/en-US/StudioHelp/Installation/TDV_Container_Orchestration_Using_Kubernetes.html
57. TIBCO docs — About column-based data obfuscation (8.7.0) — https://docs.tibco.com/pub/tdv/8.7.0/doc/html/en-US/StudioHelp/Administration/About_Column_Based_Data_Obfuscation.html
58. TIBCO Data Virtualization datasheet (hosted by StatSoft; date unknown) — https://media.statsoft.pl/pdf/ds-data-virtualization-final02.pdf
59. TrustRadius — TIBCO Data Virtualization reviews — https://www.trustradius.com/products/tibco-data-virtualization/reviews?qs=pros-and-cons
60. Gartner Peer Insights — TIBCO Data Virtualization reviews — https://www.gartner.com/reviews/market/data-integration-tools/vendor/tibco/product/tibco-data-virtualization
61. PeerSpot — TIBCO Data Virtualization reviews — https://www.peerspot.com/products/tibco-data-virtualization-reviews

---

*Prepared September 2026 for the Enterprise Architecture team. Scores are research-based estimates drawn from public sources. Before any selection decision, verify through a vendor PoC and contract review: every item marked \* or "low confidence", all SaaS HIPAA/BAA positions, and the post-acquisition roadmaps (Dremio/SAP, TIBCO/Spotfire).*
