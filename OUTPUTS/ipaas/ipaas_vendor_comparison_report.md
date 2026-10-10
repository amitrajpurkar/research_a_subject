# iPaaS Platform Evaluation: Workato vs MuleSoft vs Boomi vs Informatica IDMC

_Context: large healthcare enterprise with a mature Snowflake medallion lakehouse (bronze, silver, gold), using Snowflake Cortex AI and Cortex Code (CoCo). Prepared 29 September 2026, Enterprise Architecture research brief._

## 1. Executive summary

This report compares four integration platform (iPaaS) candidates for a healthcare enterprise whose analytical core is already Snowflake (bronze, silver and gold layers) with Cortex AI and Cortex Code in use. Workato, MuleSoft and Boomi were specified; **Informatica IDMC (now Salesforce (Informatica))** was added as the fourth vendor from the 2026 Gartner Magic Quadrant for iPaaS [1]. The rationale for that choice is in section 4.

**Key findings**

- **The four platforms have different centres of gravity.** Workato is business-led orchestration and automation with an aggressive agentic (MCP, Agent Studio) roadmap. MuleSoft is API-led connectivity and API governance. Boomi is a broad hybrid platform with strong EDI/B2B and a low entry price. Informatica is a data-management platform (governance, quality, MDM, catalog) that also does integration.
- **Workato is the peer-satisfaction and vision leader on the evidence gathered, but not the deepest on healthcare standards or Snowflake data-layer integration.** Gartner Peer Insights shows Workato at 4.9/5 from 598 reviews against 4.7 for MuleSoft and Boomi and 4.4 for Informatica IDMC [2]. Workato's own materials claim eighth consecutive Leader placement and "Furthest in Vision" for the third year [4]. The Workato Snowflake pages reviewed list row and batch triggers, bulk load from stage, merge and custom SQL, but no CDC or Cortex-specific actions [17] [18].
- **On Snowflake and Cortex specifically, Informatica and Boomi have the most documented depth.** Informatica announced Cortex AI/MCP integration, Iceberg governance (GA April 2026) and row-level access policy propagation for Snowflake [33]. Boomi added Snowflake Cortex Agents governance to Agentstudio in June 2026 and cites 900+ joint Snowflake customers [28] [27].
- **On healthcare standards, MuleSoft and Informatica publish the most concrete assets.** MuleSoft ships an Accelerator for Healthcare (HL7 v2, FHIR R4, X12 and C-CDA to FHIR, Epic and Cerner APIs) [24]. Informatica documents parse/generate/validate/transform for HL7 2.x, FHIR and HIPAA X12 with MLLP support [37]. Boomi is strongest on X12/HL7/NCPDP EDI and trading-partner management [31]. Workato offers an HL7 connector (needs its on-prem agent) and FHIR record actions [19] [20].
- **Snowflake is absorbing part of the data-movement job.** Openflow (built on Apache NiFi) and the Cortex Code skill for Openflow reduce the need for an external tool for bulk and CDC ingestion into bronze [40] [42]. The iPaaS decision is therefore mostly about operational integration, healthcare messaging, B2B, API management and governed agent access, not about loading the lakehouse.

**Where Workato lands.** Workato fits best as the orchestration and agent-action layer around Snowflake: reacting to gold-layer or Cortex-derived signals and acting in operational systems with business-team ownership. It trails MuleSoft, Boomi and Informatica where the requirement is healthcare B2B/EDI depth, packaged HL7/FHIR accelerators, API governance or documented Snowflake data-layer depth. Section 9 sets this out in detail.

_Every "Leader" placement and rank claim above comes from the vendor's own announcement unless stated. The Gartner report itself is paywalled and was not read. Ratings in this report are a qualitative assessment built from the cited evidence, not Gartner or vendor scores._

## 2. Scope, method and evidence limits

Research was run on 29 September 2026 using web search and page fetches of vendor documentation, vendor announcements, Snowflake documentation, Gartner landing pages, independent and competitor comparisons, and pricing-data marketplaces. Each source is numbered in the bibliography (section 13) and cited in the text as [n], with a type label so vendor claims can be told apart from independent or competitor material.

**Limits the reader should weigh:**

- **YouTube:** the video pages could not be read (the fetch was rate-limited). Eight demo and explainer videos are listed in the bibliography as title/metadata only. No claim in this report relies on video content.
- **Gartner:** only the report landing page and vendor press claims were accessible. Quadrant positions for MuleSoft and Informatica in 2026 could not be independently confirmed. Informatica's 2026 iPaaS placement was not found; only its 2025 Leader placement is confirmed by its own release [8].
- **Conflicting claims:** Workato published that MuleSoft "is no longer even on the map" in the 2025 quadrant [9], while MuleSoft states it was recognised as a Leader for the tenth year in 2026 [6]. Treat the Workato piece as competitive marketing and check the Gartner report directly.
- **Pricing:** figures are third-party estimates (Vendr contract data and a negotiation-services vendor). They are indicative only and no vendor quote was obtained.
- **Competitor sources:** Frends, Integrate.io, Exalate and TechnologyMatch sell or broker competing products or services. Their criticisms are reported with that label and were not treated as established fact unless corroborated.
- **"Not listed" is not "not supported":** where a vendor page did not mention a capability (for example Cortex actions in the Workato Snowflake connector pages), the report says it was not evidenced, not that it is absent.

## 3. Target context and what the iPaaS needs to do

The organisation is a large healthcare enterprise with a mature Snowflake data lake organised as bronze (raw), silver (cleansed) and gold (curated) layers, and it uses Snowflake Cortex AI and Cortex Code (CoCo). Boomi is already in the estate for ELT/ETL work that is being rationalised. Snowflake now provides native integration (Openflow), a managed MCP server for Cortex Analyst, Search, Agents and SQL [39], and an AI coding agent with an Openflow skill [42]. Against that backdrop, the table below is the analyst's view of which workloads an iPaaS should own.

| Workload | Best home (analyst view) | Why |
|---|---|---|
| Bulk and CDC ingestion into bronze from databases and SaaS | Snowflake-native (Openflow) or the ELT tools under separate evaluation; iPaaS optional | Openflow offers dozens of managed connectors, BYOC and Snowflake-managed deployment [40]. Paying iPaaS transaction pricing for bulk loads is rarely efficient. |
| Real-time clinical and administrative messaging (HL7 v2, FHIR, C-CDA) | iPaaS | Needs MLLP listeners, transformation, routing, retries and healthcare accelerators that a lakehouse loader does not provide. |
| Claims and eligibility B2B (X12 837/835/270/271, NCPDP) | iPaaS with EDI and trading-partner management | Boomi and Informatica show the most concrete healthcare EDI evidence in this research. Workato guidance points complex EDI to a partner [49] (single, third-party source). |
| Acting on gold-layer or Cortex-derived signals in operational systems | iPaaS (orchestration and agent actions) | Snowflake triggers (new or updated rows, scheduled SQL) feeding workflows in ITSM, CRM, HRIS, EHR and payer systems is the core Workato use case [17]. |
| Governed tool access for AI agents (MCP) | iPaaS control layer plus Snowflake managed MCP server | All four vendors claim MCP support. Snowflake's own MCP connectors list only Atlassian, GitHub, Glean, Linear and Salesforce as pre-built external servers, not these four iPaaS vendors [38]. |
| Data quality, MDM, catalog and lineage | Data-management platform (Informatica) or the separate tools under evaluation | Informatica's heritage and 2026 Leader placements in data quality, MDM and governance are documented in its releases [33]. |

## 4. Market snapshot and choice of the fourth vendor

The 2026 Gartner Magic Quadrant for iPaaS was published on 16 March 2026 and evaluates 18 vendors: Amazon Web Services, Boomi, Celigo, Frends, Google, Huawei Cloud, IBM, Jitterbit, Microsoft, Oracle, Salesforce (Informatica), Salesforce (MuleSoft), SAP, SEEBURGER, SnapLogic, Tray.ai, Workato and Zapier [1]. Placements confirmed from vendor announcements:

| Vendor | Placement (source) | Vendor-stated highlights |
|---|---|---|
| Workato | Leader; 8th consecutive year; "Furthest in Vision" for the 3rd year [4] | Positions around "agentic orchestration": Workato ONE, Agent Studio, MCP Gateway. 4.8/5 across 42 Peer Insights reviews cited on its blog. |
| Boomi | Leader; 12th consecutive year; "highest for Ability to Execute" [5] | Agentstudio, Agent Control Plane, MCP connectors; 30,000+ customers; claims to be the only vendor named Leader in every iPaaS quadrant since inception. |
| Salesforce (MuleSoft) | Leader; 10th year [6] | Agent Fabric to discover, orchestrate, govern and observe agents; Anypoint positioned as the backbone for agentic lifecycle management. |
| Salesforce (Informatica) | Listed in the 2026 MQ [1]; placement not verified. Leader in 2025 [8] | Acquired by Salesforce, completed December 2025 [12]. Headless IDMC and MCP endpoints; Agent and Context Catalog [34]. |
| SnapLogic | Visionary [7] | Considered as a runner-up (see below). |

**Why Informatica IDMC as the fourth vendor.** Candidates from the quadrant were Informatica, Microsoft (Azure Integration Services; named a 2025 Leader [13]), SAP Integration Suite (five-time Leader through 2025 [14]) and SnapLogic (Visionary). Informatica was selected for four reasons: it was a Leader in the 2025 quadrant; it has the most documented Snowflake data-layer and Cortex/MCP integration of any candidate; it documents HL7, FHIR and HIPAA X12 processing for healthcare; and its governance, quality and MDM capabilities relate directly to the parallel MDM and data-quality pattern evaluations already under way.

**Two consequences to weigh.** First, Salesforce now owns both MuleSoft and Informatica, so two of the four candidates share a parent, and the two are being connected (the Agent Fabric Context Catalog links Informatica governance with MuleSoft Agent Fabric [34]). Second, IDMC is a wider data-management suite than an iPaaS, so its Peer Insights score (4.4) blends a broader product than the other three. If the enterprise is Azure-centric, Microsoft would be the natural alternate; SnapLogic is the alternate if a data-pipeline-friendly, Snowflake-adjacent platform is preferred.

## 5. Essential features of an iPaaS platform

The list below combines the capabilities Gartner describes for the iPaaS market (application, data and AI integration for technical and business users in hybrid environments [7]; AI-assisted mapping, hybrid and air-gapped deployment, vertical templates and pricing transparency as 2025 themes [10]) with what this healthcare and Snowflake context adds.

| # | Essential feature | What good looks like, and why it matters here |
|---|---|---|
| 1 | Connectivity breadth | Pre-built, maintained connectors for SaaS, ERP, databases, files and LLMs, plus an SDK or generic HTTP connector for gaps. Healthcare estates mix EHR, payer, ITSM, HRIS and finance systems. |
| 2 | Integration patterns | App-to-app, event-driven, batch/data, API-led and B2B/EDI in one platform, so teams avoid a separate tool per pattern. |
| 3 | API management and governance | Design, secure, throttle, version and publish APIs with a developer portal and policy enforcement. Needed for internal and partner APIs and for exposing agent tools safely. |
| 4 | Development experience | Low-code for business technologists and pro-code for engineers, reuse, versioning and testing. Determines who can own integrations and the long-run skills cost. |
| 5 | Hybrid deployment and runtime control | Cloud plus on-premises or private-network runtimes for systems behind the firewall (HL7 engines, mainframes, legacy EHR interfaces). |
| 6 | Snowflake and data-platform fit | Bulk load, merge, CDC, key-pair or OAuth authentication, Snowpipe or Snowpipe Streaming, Iceberg awareness, and clean hand-off to Cortex. |
| 7 | AI-assisted development | Natural-language pipeline and integration building, auto-mapping, self-healing, and copilots that reduce build time. |
| 8 | Agentic and MCP capability | Agent builders, MCP servers and clients with per-user authentication, rate limits, audit logs and central agent governance. Central to Cortex Agents and Cortex Code consumption. |
| 9 | Governance, observability and lifecycle | Environments, CI/CD, versioning, audit trails, monitoring, lineage and cataloguing across integrations and agents. |
| 10 | Security and compliance | HIPAA business associate agreement, SOC 2, ISO 27001, HITRUST where required, encryption, key management, SSO/RBAC, regional data residency, and FedRAMP for government-adjacent work. |
| 11 | Healthcare standards | HL7 v2 (MLLP), FHIR, C-CDA, X12 (837, 835, 270/271, 278), NCPDP, HL7-to-FHIR mapping, EHR accelerators, patient-matching and MDM hooks. |
| 12 | Commercial model and TCO | Predictable pricing that does not punish volume or fan-out, transparent overages, and realistic services and skills cost. |
| 13 | Ecosystem and proof | Partner and system-integrator depth, marketplaces, peer reviews and healthcare references. |

## 6. How the four platforms compare against the essential features

Ratings are the analyst's qualitative assessment from the cited evidence: **Strong** (documented depth), **Good** (solid, some gaps or thinner evidence), **Partial** (present with material gaps), **Limited / unverified** (not evidenced in accessible sources). Colour shading follows the same scale.

| Feature | Workato | MuleSoft (Anypoint) | Boomi | Informatica IDMC |
|---|---|---|---|---|
| **1. Connectivity breadth** | **Strong**<br>SaaS, on-prem ERPs, warehouses, databases, LLMs; HTTP connector for custom needs [21] [20]. Connector count not stated on pages reviewed. | **Strong**<br>1,500+ pre-built connectors including LLMs (vendor) [25]. | **Strong**<br>1,500+ connectors (as cited by a competitor) [50]; large ecosystem [48]. | **Good**<br>Broad data-platform and application connectivity; connector count not verified in this research. |
| **2. Integration patterns** | **Good**<br>Strong app-to-app, event and workflow automation; RPA included [21]. EDI described as limited by one broker source [49]. | **Strong**<br>API-led, event and system integration; mature enterprise pattern set [48]. | **Strong**<br>Integration, API, data integration/CDC, event streams, B2B/EDI and Data Hub in one platform [30]. | **Good**<br>Data integration plus application integration (CLAIRE Copilot for iPaaS) [8]; B2B not assessed. |
| **3. API management** | **Partial**<br>API Gateway included [21]; governance depth described as lighter than MuleSoft by a pricing source [46] (low confidence). | **Strong**<br>API Manager, Omni Gateway, governance and zero-trust policies [25]; full lifecycle with federated gateways [49]. | **Good**<br>API Management editions with developer portal and federated control [30]. | **Limited / unverified**<br>Not assessed in depth; not the platform's primary positioning in sources reviewed. |
| **4. Development experience** | **Strong**<br>Business-technologist-friendly recipes with automatic versioning [49]; a competitor says advanced work needs Ruby [51]. | **Good**<br>Pro-code strength (Studio, Code Builder, DataWeave) but demands sustained DataWeave skill [49]; steep learning curve [48]. | **Good**<br>Visual canvas suits mixed-skill teams; complex conditional logic strains it [49]; critics cite 3-10 engineers to run [50]. | **Good**<br>CLAIRE Copilot for natural-language integration and pipeline building [35]; complexity and specialist skills noted [48]. |
| **5. Hybrid deployment** | **Good**<br>Cloud plus On-Prem Agent (required for HL7 connector) [19]; nine data-centre regions [49]. | **Strong**<br>CloudHub, Runtime Fabric (Kubernetes), on-prem and multi-cloud [25]; Gov Cloud. | **Strong**<br>Atoms and Molecules run cloud, on-prem, edge or hybrid; suited to regulated on-prem execution [5] [49]. | **Good**<br>Cloud and hybrid runtime [48]. |
| **6. Snowflake fit** | **Partial**<br>Triggers on new/updated rows and scheduled SQL; bulk load from stage, merge, upsert, CSV export, custom SQL [17]. CDC and Cortex-specific actions not listed on pages reviewed [18]. | **Partial**<br>Connector 1.4: key-pair auth, bulk/continuous load, insert/update/delete/merge [23]. Snowpipe, stored procedures and Cortex not mentioned in the overview page. | **Good**<br>Connector supports query, CRUD, SnowSQL and bulk ops, key-pair auth; 1 MB request and 500 KB SnowSQL limits [32]. Partner page cites CDC replication and Cortex-connected agents; 900+ joint customers [27]. | **Strong**<br>Cortex AI connector (2025) [35]; early MCP integration with Cortex; Iceberg scanners GA Apr 2026; row-level access propagation GA [33]. |
| **7. AI-assisted development** | **Good**<br>AI-assisted recipe generation; MCP supported as of 2026 [48]. | **Good**<br>Dev Agent for integration design and Anypoint Code Builder [25]. | **Good**<br>Boomi AI agents for building and monitoring; video demos listed by title only [55]. | **Strong**<br>CLAIRE Copilot; Data Quality Agent said to produce about 200 rules a day versus 4-5 a week (vendor claim) [34]. |
| **8. Agentic and MCP** | **Strong**<br>Agent Studio; hosted, local and developer-API MCP servers; OAuth, verified-user access, rate limits and audit logs; MCP not offered in CN regions [15]. Workato ONE "enterprise control plane" [4]. | **Good**<br>Agent Fabric to discover, orchestrate, govern and observe agents; MCP support [6] [25]. | **Strong**<br>Agentstudio, Agent Control Tower, MCP Registry; governs native Snowflake Cortex Agents (June 2026) [28] [27]. | **Strong**<br>Headless IDMC exposing governance, integration, quality and MDM as MCP services; Agent and Context Catalog [34]. Headless Snowflake capability was Private Preview with GA targeted for summer 2026 [33]. |
| **9. Governance and lifecycle** | **Good**<br>Observability, governance controls, lifecycle management, audit trails [21]. | **Strong**<br>API governance and unified control centre [25]. | **Good**<br>Data Hub stewardship, catalog; critics cite limited version control and all-or-nothing batch error handling [50]. | **Strong**<br>Catalog, lineage, access management and MDM are core; 2026 Leader placements in governance, data quality and MDM (vendor) [33]. |
| **10. Security and compliance** | **Strong**<br>HIPAA (signs BAA), SOC 1/2/3, ISO 27001/27701/42001, PCI DSS L1, IRAP, NIST 800-171A. HITRUST and FedRAMP not listed on the page reviewed [16]. | **Good**<br>BAA available via Salesforce for named services (Runtime Manager, Monitoring, MQ, Object Store v2, Security, Platform on Hyperforce); excludes customer-premises components [26]. FedRAMP via Gov Cloud. | **Strong**<br>HIPAA/HITECH, SOC 1/2, ISO 27001/27017/27018/27701/42001, PCI, FedRAMP Moderate, FIPS 140-2, StateRAMP [29]. (One broker source says no FedRAMP [49]; Boomi's own page contradicts it.) | **Limited / unverified**<br>HIPAA compliance and ONC rules claimed for healthcare [36]; certification list not verified here. |
| **11. Healthcare standards** | **Partial**<br>HL7 connector (parse/send message, real-time trigger; needs On-Prem Agent; versions and MLLP not stated) [19]. FHIR create/update/delete/search and triggers [20]. No EHR accelerator found. | **Strong**<br>Accelerator for Healthcare: HL7 v2 and FHIR R4 APIs, HL7 v2-to-FHIR, X12-to-FHIR, CDA-to-FHIR, Epic and Cerner, Health Cloud references [24]. | **Good**<br>X12, HL7, NCPDP; 270/271 eligibility; claims and remittance; self-service trading-partner onboarding [31]. Dedicated HL7/FHIR connectors not confirmed. | **Strong**<br>Parse, generate, validate, transform HL7 2.x, FHIR and HIPAA X12; HL7-to-FHIR mapping; MLLP; AI parsing of HL7/FHIR to relational [37]. Provider and payer references [36]. |
| **12. Commercial model** | **Partial**<br>Tasks, recipes and connector-based consumption; overage 2-3x bundled rate; median contract about $64.5K a year (n=341) [43]. | **Partial**<br>vCore-based; production and non-production cores drive cost; median about $68.7K (n=72) [45]; premium reputation [48]. | **Good**<br>Edition and Atom-based subscription; median about $45.1K (n=143); 3-7% annual escalators; services 20-40% of year one [44]. | **Limited / unverified**<br>IPU consumption model [8]; one source quotes $0.50-$2.50 per IPU and $50K-$2.5M annual range [46] (low confidence). |
| **13. Ecosystem and proof** | **Strong**<br>Gartner Peer Insights 4.9/5 (598 reviews), Customers' Choice 2026 [2]; healthcare prior-authorisation case (partner-authored, 65% faster) [22]. | **Strong**<br>4.7/5 (150 reviews) [2]; deep systems-integrator ecosystem [48]. | **Strong**<br>4.7/5 (264 reviews) [2]; 30,000+ customers (vendor) [5]. | **Good**<br>4.4/5 (325 reviews; whole IDMC suite) [2]; healthcare customers named by vendor [36]. |

### Indicative commercial models

Figures are third-party estimates and should be replaced by vendor quotes. They come from procurement-data and benchmark sites, not from vendor price lists.

| Vendor | Pricing model | Indicative annual cost | Watch-outs |
|---|---|---|---|
| Workato | Consumption: tasks, recipes, workspaces, premium connectors [43] | Median about $64.5K; range $20K-$184K (Vendr, n=341). Enterprise deals cited at $150K-$400K+. | Volume forecasting; overage at 2-3x bundled rates; row-by-row processing scales cost non-linearly [49]. |
| MuleSoft | vCores by environment, plus API volume and support [45] | Median about $68.7K; range $8K-$281K (Vendr, n=72). A separate benchmark quotes $40K-$60K per production vCore at list [46]. | vCore metering penalises many small applications; services 20-40% of year one; premium connectors; skills cost. |
| Boomi | Edition and Atom-based subscription [30] [44] | Median about $45.1K; range $12K-$381K (Vendr, n=143). | Quote-only pricing; 3-7% annual escalators; transaction overages; engineering headcount [50]. |
| Informatica | IPU consumption [8] | $50K-$2.5M a year quoted by one low-confidence source [46]; MDM and quality modules extra. | IPU forecasting; module add-ons; roadmap changes after the Salesforce acquisition. |

_Vendr contract-value data is the most concrete evidence gathered but reflects buyers who used that marketplace. A Vendr page statement that Boomi can cost more than Workato at small scale conflicts with the medians above, which is why quotes matter._

## 7. Unique capabilities, pros and cons by vendor

### 7.1 Workato

#### Unique capabilities

- **Workato ONE and enterprise MCP.** Workato describes an "enterprise control plane" of orchestration, context, skills and trust, with Enterprise MCP servers (Workato-hosted, local and a developer API server) exposing governed "skills" to agents [4] [15].
- **User-level authentication for agents.** MCP servers can use verified end-user credentials for downstream calls instead of static tokens, with rate limiting and identity-tracked audit logs [15]. This matters for PHI-adjacent agent access.
- **One tool for integration, workflow, RPA and agents,** owned largely by business technologists, with a recipe model and automatic versioning [21] [49].
- **Peer-review leadership.** Highest rating of the four on Gartner Peer Insights (4.9 from 598 reviews) [2].

#### Pros

- Fast to build and easy for non-specialist teams to own; suited to citizen integrators and multi-tenant SaaS estates [49].
- Broad compliance set including HIPAA BAA and ISO 42001 (AI management) [16].
- Snowflake-triggered workflows (new or updated rows, scheduled SQL) map naturally to acting on gold-layer outputs [17].
- Strongest agentic story on vendor evidence, and competitive on entry price against MuleSoft [43].

#### Cons

- Consumption pricing (tasks) is hard to forecast for row-level or high-fan-out healthcare flows; overage at 2-3x [43] [49].
- EDI depth is limited according to one broker source, which says complex needs go to a partner [49]. No packaged X12 healthcare accelerators were found.
- HL7 requires the On-Prem Agent, and HL7 versions and MLLP support were not stated in the documentation reviewed [19]. No Epic/Cerner accelerators were found [20].
- Snowflake pages reviewed show no CDC or Cortex-specific actions [17] [18]; large-volume data movement is a reported weak spot by a competitor [51].
- Lighter API governance than MuleSoft per a low-confidence source [46]; MCP is not available in China regions [15].
- A broker source notes no published SLA percentage in legal documentation [49] (single source; verify in contract review).

### 7.2 MuleSoft (Salesforce)

#### Unique capabilities

- **API-led connectivity and API governance:** API Manager, Omni Gateway, governance and zero-trust policies under one control centre [25].
- **Accelerator for Healthcare:** HL7 v2 and FHIR R4 APIs, HL7 v2-to-FHIR conversion following the HL7 implementation guide, X12-to-FHIR, CDA-to-FHIR, Epic and Cerner APIs, and Salesforce Health Cloud references [24].
- **Agent Fabric:** discover, orchestrate, govern and observe agents deployed anywhere, plus MCP support and a Dev Agent [6] [25].
- **Runtime choice:** CloudHub, Runtime Fabric on Kubernetes, on-prem and multi-cloud [25].

#### Pros

- Most mature API lifecycle management and governance of the four; proven at global scale with a deep integrator ecosystem [48].
- The only vendor here with a published, standards-based healthcare accelerator for HL7 v2/FHIR/X12/CDA and named EHR targets [24].
- FedRAMP-ready Government Cloud option and a Salesforce-provided HIPAA BAA for named services [26].

#### Cons

- Steep learning curve and dependence on DataWeave expertise, a maintenance liability once consultants leave [49] [48].
- vCore pricing and premium contracts; small applications are penalised by vCore metering [49] [45].
- BAA scope is service-specific and excludes customer-premises components; the customer remains responsible for PHI minimisation and cryptography [26].
- Snowflake connector overview lists no Snowpipe, stored-procedure or Cortex support [23]; Snowflake's Cortex MCP connectors do not list MuleSoft [38].
- Strategic gravity toward Salesforce, now compounded by Informatica ownership. Workato claims a competitive decline [9] that MuleSoft's 2026 announcement contradicts [6].

### 7.3 Boomi

#### Unique capabilities

- **Single platform for the whole integration estate:** integration, API management, data integration with CDC, Data Hub (MDM), B2B/EDI, event streams and Agentstudio [30].
- **Snowflake-specific agent governance:** Agentstudio supports Snowflake Cortex Agents inside Agent Control Tower, combining real-time ELT with agent governance (announced 9 June 2026; general availability date not stated) [28]. Boomi cites 900+ joint customers [27].
- **Healthcare EDI:** X12, HL7 and NCPDP support, 270/271 eligibility, claims and remittance, and self-service trading-partner onboarding [31].
- **Compliance breadth:** HIPAA/HITECH, SOC 1/2, ISO 27001 family and 42001, FedRAMP Moderate, FIPS 140-2 and StateRAMP [29].

#### Pros

- Lowest median contract value of the four (about $45K) and connection-based licensing that rewards consolidation [44] [49].
- Already in the estate for ELT/ETL, so consolidation onto Boomi carries lower onboarding and vendor-management cost than a new vendor.
- Runtime flexibility (Atoms and Molecules) suits regulated on-prem execution [49].

#### Cons

- Quote-only pricing with 3-7% annual escalators; services often 20-40% of year-one cost [44] [50].
- Visual canvas strains under complex conditional logic; critics cite all-or-nothing batch error handling, limited version control and 3-10 engineers to operate (competitor source, unverified) [49] [50].
- Snowflake connector documents 1 MB request and 500 KB SnowSQL limits and no OAuth; Snowpipe not mentioned [32].
- Dedicated HL7/FHIR connectors were not confirmed in the reviewed material, only EDI-format support [31].
- Less specialised for deep on-prem integration according to one comparison [48].

### 7.4 Informatica IDMC (Salesforce)

#### Unique capabilities

- **Data management heritage:** catalog, governance, data quality, MDM and access management in the same suite as integration. Informatica reports 2026 Leader placements for data and analytics governance, augmented data quality and MDM [33].
- **Deepest Snowflake integration evidenced:** Cortex AI connector (2025), early MCP integration with Cortex, Iceberg table scanners (GA April 2026), row-level access policies pushed into Snowflake (GA) and headless IDMC calls from Cortex agent workflows (Private Preview, GA targeted summer 2026) [35] [33].
- **Healthcare data services:** parse, generate, validate and transform HL7 2.x, FHIR and HIPAA X12; pre-built HL7 2.x-to-FHIR mapping; MLLP and FHIR REST endpoints; real-time and batch; named payer and provider customers [37] [36].
- **Headless, agent-ready architecture:** services exposed as MCP endpoints and an Agent and Context Catalog that links to MuleSoft Agent Fabric [34].

#### Pros

- One vendor could cover integration, quality, MDM (a gap called out in parallel evaluations) and governance, with a golden patient record use case [36].
- Most concrete evidence of governing data into Snowflake, including Iceberg and row-level policies.
- Strong healthcare standards processing and AI parsing of HL7/FHIR into relational form [37].

#### Cons

- High complexity and operating cost; specialist skills needed for full capability [48].
- Lowest Peer Insights score of the four (4.4), though it covers the whole IDMC suite [2].
- IPU consumption pricing is hard to forecast, and MDM/quality modules are add-ons [46] (low confidence).
- Roadmap and packaging uncertainty after the Salesforce acquisition [12]; 2026 iPaaS quadrant placement not verified; headless GA status should be confirmed now that the summer 2026 target has passed.
- API management and app-integration depth were not assessed and are not its headline strength in the sources reviewed.

## 8. Snowflake, Cortex and CoCo fit

Snowflake has two relevant AI surfaces: a **managed MCP server** (generally available) exposing Cortex Analyst, Cortex Search, Cortex Agents and SQL/custom tools, with OAuth and role-based access [39], and **MCP connectors** that let Cortex Agents call external MCP servers, with OAuth the only authentication method and pre-built support limited to Atlassian, GitHub, Glean, Linear and Salesforce [38]. Cortex Code has a skill for Openflow that builds, monitors and troubleshoots CDC pipelines, which Snowflake suggests may reduce the number of external pipeline tools needed [42].

| Vendor | What the evidence supports for Snowflake, Cortex and Cortex Code |
|---|---|
| Workato | Snowflake as a trigger and action target (rows, scheduled SQL, bulk load, merge) [17]. Workato MCP servers can front Workato skills for MCP-capable clients [15]. No Cortex-specific actions or Cortex Code linkage evidenced. A Workato agent could call Snowflake's managed MCP server only if Workato's MCP client supports it, which was not verified. |
| MuleSoft | Snowflake connector for bulk/continuous load and DML [23]. Agent Fabric governs agents generally [6]. No Cortex-specific integration evidenced. |
| Boomi | Cortex-connected Platform Agents, continuous CDC to Snowflake, Agent Control Tower and MCP Registry governing native Cortex Agents [27] [28]. Closest documented match to a Cortex Agents governance need. |
| Informatica | Cortex AI connector, MCP integration with Cortex, metadata search and address verification callable from agent workflows (Private Preview at announcement), Iceberg governance and access-policy propagation [33]. Closest documented match to a governed-data-for-Cortex need. |

**Implication.** Nothing reviewed shows any of the four integrating with Cortex Code itself. The practical pattern is Snowflake-side agents and Cortex Code operating on governed data, with the iPaaS providing (a) trusted, governed feeds and metadata, (b) action tools that agents call through MCP, and (c) a central control plane for agents. That favours the vendors with agent-governance products (Boomi, Informatica, Workato, MuleSoft) and makes per-user authentication and audit, where Workato is explicit [15], a useful selection criterion.

## 9. How Workato is placed against the others

### 9.1 Position on each essential feature

| # | Feature | Workato relative to peers | Comment |
|---|---|---|---|
| 1 | Connectivity breadth | At par | All four have broad catalogs; count and fit should be tested against the actual system inventory. |
| 2 | Integration patterns | Behind on B2B/EDI | Leads on workflow and automation; Boomi and Informatica show deeper EDI. |
| 3 | API management | Behind | MuleSoft clearly leads; Boomi also offers a full API tier. |
| 4 | Development experience | Ahead for business users | Best for business-technologist ownership; MuleSoft favours engineers. |
| 5 | Hybrid deployment | At par | On-Prem Agent model; MuleSoft and Boomi offer more runtime choices. |
| 6 | Snowflake fit | Behind on documented depth | Informatica and Boomi show CDC, Cortex and governance features; Workato pages show row, bulk and merge actions. |
| 7 | AI-assisted development | At par | All offer copilots; evidence is largely vendor-stated. |
| 8 | Agentic and MCP | Ahead (vendor-stated) to at par | Explicit per-user auth, hosted and local MCP servers; Boomi and Informatica have comparable governance claims. |
| 9 | Governance and lifecycle | At par | Informatica leads on data governance; MuleSoft on API governance. |
| 10 | Security and compliance | At par | HIPAA BAA present; Boomi lists FedRAMP Moderate; HITRUST not evidenced for any of the four. |
| 11 | Healthcare standards | Behind | MuleSoft and Informatica publish concrete HL7/FHIR/X12 assets; Boomi leads EDI. |
| 12 | Commercial model | Mixed | Competitive entry price; consumption model is hardest to predict for high-volume flows. |
| 13 | Ecosystem and proof | Ahead on peer ratings | Highest Peer Insights score; healthcare proof is mostly partner case studies. |

### 9.2 Head-to-head

| Versus | Where Workato wins | Where Workato trails | Typical tie-breaker |
|---|---|---|---|
| MuleSoft | Faster delivery, lower skills bar, business ownership, agentic momentum, peer ratings. | API management and governance, packaged healthcare accelerators, runtime control, FedRAMP path. | API-first platform strategy and Epic/Cerner accelerators versus speed and business ownership. |
| Boomi | Business-friendly build experience, per-user MCP authentication, peer ratings. | EDI/B2B depth, MDM and data-integration modules, FedRAMP Moderate, Cortex Agents governance, incumbent status. | Whether B2B/EDI and consolidation onto an existing platform outweigh automation breadth. |
| Informatica | Ease of use, time to value, business-led automation, peer ratings. | Data governance, quality and MDM, documented Snowflake and Cortex depth, HL7/FHIR/X12 processing. | Whether the primary problem is governed data for AI (Informatica) or operational orchestration (Workato). |

### 9.3 Where Workato fits in this architecture

- **Strong fit:** the action layer after Snowflake. Gold-layer changes and Cortex-derived signals trigger governed workflows in ITSM, CRM, HRIS, finance and care-management tools, with business teams owning the recipes. The healthcare prior-authorisation case study shows the pattern, though it is a partner-authored piece [22].
- **Conditional fit:** governed agent tool access through Enterprise MCP, provided Workato's MCP client and server interoperate with Snowflake's managed MCP server and the enterprise's regions are supported [15].
- **Weak fit:** primary backbone for HL7 v2/FHIR/X12 exchange, bulk or CDC ingestion into bronze, or MDM and data-quality services. Boomi, Informatica or MuleSoft, or Snowflake-native tools, have stronger evidence there.

### 9.4 Decision guide

- **Choose Workato** when the priority is business-led automation and governed agent actions, and healthcare messaging and B2B stay with another tool.
- **Choose MuleSoft** when an API-led strategy, Epic/Cerner integration and API governance are decisive and the organisation can fund DataWeave skills.
- **Choose Boomi** when consolidating onto an incumbent, with EDI/B2B, on-prem runtimes, FedRAMP and predictable entry cost outweighing UI limits.
- **Choose Informatica** when governed, high-quality data for Cortex and MDM/quality consolidation are the core need, accepting complexity and Salesforce-driven roadmap risk.
- **A combination is credible:** for example Informatica or Snowflake-native tooling for the data layer and Workato or Boomi for operational orchestration, provided overlap and licensing are rationalised.

## 10. Suggested next steps

- **Run a scoped proof of concept** on three scenarios: an HL7 v2 ADT feed to Snowflake bronze and a FHIR write-back; a Snowflake gold-table change that triggers a multi-system workflow; and a Cortex Agent or MCP client calling a governed action with per-user authentication and audit.
- **Request written answers** on: Snowflake MCP client/server interoperability; Cortex Code and Openflow coexistence; HITRUST status; BAA scope by component; HL7 MLLP and version support (Workato); EDI transaction sets and partner onboarding (Workato, Informatica); general availability and pricing for Boomi's Cortex Agents support and Informatica's headless capabilities.
- **Get three-year cost models** from each vendor using the same volume assumptions (messages per day, fan-out, environments, EDI partners), including overage terms and renewal caps.
- **Confirm the Gartner positions** for Informatica and MuleSoft in the 2026 report through the enterprise's Gartner licence or vendor-supplied copies.
- **Decide the boundary with Snowflake-native tools** first (Openflow and Cortex Code for ingestion), because it changes how much iPaaS volume, and therefore consumption cost, is needed.

## 11. Open items and confidence

| Item | Status |
|---|---|
| Informatica 2026 iPaaS quadrant | Not confirmed. 2025 Leader confirmed by vendor release. |
| MuleSoft 2025/2026 placement dispute | Workato says MuleSoft dropped off the 2025 map; MuleSoft says Leader for a tenth year in 2026. Unresolved without the report. |
| Boomi FedRAMP | Boomi's trust page lists FedRAMP Moderate; one broker source says no FedRAMP. Boomi's own page is treated as authoritative, to be confirmed in diligence. |
| Informatica headless GA | Private Preview with a summer 2026 GA target at announcement (May 2026); current status not checked. |
| Workato HL7 and EDI details | HL7 versions, MLLP and EDI depth are not stated in accessible documentation. |
| Pricing | Third-party estimates only; no vendor quotes. |
| Video content | Not reviewed (fetch blocked). Titles only. |

## 12. Reading notes on source reliability

Sources fall into five groups, and the bibliography labels each one. **Vendor** material describes real features but selects flattering facts and rank claims. **Snowflake** documentation is authoritative for Snowflake behaviour but silent on third-party tools. **Analyst** pages (Gartner) are authoritative but were reachable only at landing-page level. **Competing-vendor and broker blogs** contain useful technical criticism but have a commercial motive. **Pricing marketplaces** offer real contract data with unstated sampling. Where a claim rests on one non-vendor source it is labelled as single-source in the text.

## 13. Bibliography

Numbers match the [n] citations in the text. "Video (title/metadata only)" means the page could not be read and no claim relies on its content. "Search-result level only" means the page was seen in search results but not fetched.

#### Gartner Magic Quadrant and market position

- **[1]** Gartner: Magic Quadrant for Integration Platform as a Service (2026, published 16 Mar 2026) _(Analyst (landing page only; full report is paywalled))_ <https://www.gartner.com/en/documents/7591233>
- **[2]** Gartner Peer Insights: Best Integration Platform as a Service Reviews 2026 _(Analyst / peer reviews)_ <https://www.gartner.com/reviews/market/integration-platform-as-a-service>
- **[3]** Frends: Discover the 18 vendors in Gartner's Magic Quadrant for iPaaS 2026 _(Competing vendor blog)_ <https://frends.com/insights/list-18-vendors-gartner-magic-quadrant-for-ipaas-2026?hs_amp=true>
- **[4]** Workato: Workato Named Gartner Magic Quadrant iPaaS Leader in 2026 _(Vendor)_ <https://www.workato.com/the-connector/gartner-magic-quadrant-2026/>
- **[5]** Boomi: Boomi Named a Leader | 2026 Gartner Magic Quadrant for iPaaS _(Vendor)_ <https://boomi.com/blog/gartner-magic-quadrant-ipaas-2026/>
- **[6]** MuleSoft: Salesforce (MuleSoft) Recognized for the 10th Year in the 2026 Gartner MQ for iPaaS _(Vendor)_ <https://blogs.mulesoft.com/news/mulesoft-recognized-in-gartner-magic-quadrant-for-ipaas/>
- **[7]** SnapLogic: Gartner Positions SnapLogic as a Visionary in 2026 MQ for iPaaS _(Vendor)_ <https://www.snaplogic.com/resources/analyst-reports/gartner-magic-quadrant-ipaas-2026>
- **[8]** Informatica: Informatica Named a Leader in the 2025 Gartner MQ for iPaaS (22 May 2025) _(Vendor)_ <https://www.informatica.com/about-us/news/news-releases/2025/05/20250522-informatica-named-a-leader-in-the-2025-gartner-magic-quadrant-for-ipaas.html>
- **[9]** Workato: MuleSoft Lost Its Leader Status in Gartner's Magic Quadrant _(Vendor (competitive claim, disputed))_ <https://www.workato.com/the-connector/mulesoft-gartner/>
- **[10]** Getint: Magic Quadrant for Integration Platform as a Service 2025 summary _(Competing vendor blog)_ <https://www.getint.io/blog/magic-quadrant-integration-platform-service-summary>
- **[11]** Vantagepoint: Workato Gartner iPaaS 2026: What CRM Teams Should Know _(Consultancy blog)_ <https://vantagepoint.io/blog/sf/workato-gartner-ipaas-2026>
- **[12]** Cloud Wars: Salesforce Completes Informatica Acquisition, Boosting Its Agentic AI Foundation (3 Dec 2025) _(Trade press)_ <https://cloudwars.com/cloud-wars-minute/salesforce-completes-informatica-acquisition-boosting-its-agentic-ai-foundation/>
- **[13]** Microsoft Azure Blog: Microsoft named a Leader in 2025 Gartner MQ for iPaaS (search-result level only) _(Vendor)_ <https://azure.microsoft.com/en-us/blog/microsoft-named-a-leader-in-2025-gartner-magic-quadrant-for-integration-platform-as-a-service/>
- **[14]** SAP News: Five-Time Leader in Gartner iPaaS MQ, SAP Integration Suite (search-result level only) _(Vendor)_ <https://news.sap.com/2025/05/five-time-leader-gartner-magic-quadrant-ipaas-sap-integration-suite/>

#### Workato

- **[15]** Workato Docs: MCP _(Vendor documentation)_ <https://docs.workato.com/mcp.html>
- **[16]** Workato Docs: Security compliance _(Vendor documentation)_ <https://docs.workato.com/security/security-compliance.html>
- **[17]** Workato: Snowflake integration and workflow automation _(Vendor)_ <https://www.workato.com/integrations/snowflake>
- **[18]** Workato: AI by Workato and Snowflake integration _(Vendor)_ <https://www.workato.com/integrations/open_ai_utility~snowflake>
- **[19]** Workato Docs: HL7 connector _(Vendor documentation)_ <https://docs.workato.com/connectors/hl7.html>
- **[20]** Workato: FHIR and HL7 integration _(Vendor)_ <https://www.workato.com/integrations/fhir~hl7>
- **[21]** Workato: Platform Features and Benefits _(Vendor)_ <https://www.workato.com/platform>
- **[22]** Quandary Consulting: AI Prior Authorization Automation with Workato _(Partner marketing case study)_ <https://www.quandarycg.com/case-study/workato-ai-reduce-prior-authorization-processing-time-by-65-for-regional-healthcare-provider>

#### MuleSoft

- **[23]** MuleSoft Docs: Snowflake Connector 1.4 _(Vendor documentation)_ <https://docs.mulesoft.com/snowflake-connector/latest/>
- **[24]** MuleSoft Docs: Accelerator for Healthcare _(Vendor documentation)_ <https://docs.mulesoft.com/healthcare/latest/>
- **[25]** MuleSoft: Enterprise Integration | Anypoint Platform _(Vendor)_ <https://www.mulesoft.com/platform/enterprise-integration>
- **[26]** Paubox: Can I use MuleSoft and be HIPAA compliant? (2026 update) _(Third-party vendor blog (relays Salesforce BAA terms))_ <https://www.paubox.com/blog/mulesoft-hipaa-compliance>

#### Boomi

- **[27]** Boomi: Snowflake partner page _(Vendor)_ <https://boomi.com/partners/snowflake/>
- **[28]** Business Wire: Boomi Adds Snowflake Cortex Agents Support to Agentstudio (9 Jun 2026) _(Vendor press release)_ <https://www.businesswire.com/news/home/20260609131798/en/Boomi-Adds-Snowflake-Cortex-Agents-Support-to-Agentstudio-to-Enable-Unified-AI-Agent-Governance>
- **[29]** Boomi: Security & Privacy Compliance _(Vendor)_ <https://boomi.com/compliance/>
- **[30]** Boomi: Enterprise Platform Pricing & Editions _(Vendor)_ <https://boomi.com/platform-services-and-pricing/>
- **[31]** Boomi: Guide to EDI in Healthcare _(Vendor)_ <https://boomi.com/blog/guide-to-edi-for-healthcare/>
- **[32]** Boomi Docs: Snowflake connector _(Vendor documentation)_ <https://help.boomi.com/docs/Atomsphere/Integration/Connectors/int-Snowflake_Connector_f551004c-1429-4fe1-85c1-b345d37ab73c>

#### Informatica

- **[33]** Informatica: Brings Headless Data Management and Iceberg Governance to Snowflake (20 May 2026) _(Vendor press release)_ <https://www.informatica.com/about-us/news/news-releases/2026/05/20260520-informatica-brings-headless-data-management-and-iceberg-governance-to-snowflake.html>
- **[34]** SiliconANGLE: Informatica expands agentic AI strategy with headless data services and unified agent governance (20 May 2026) _(Trade press)_ <https://siliconangle.com/2026/05/20/informatica-expands-agentic-ai-strategy-headless-data-services-unified-agent-governance/>
- **[35]** TechTarget: Informatica adds MCP support, spate of AI-fueled features (31 Jul 2025) _(Trade press)_ <https://www.techtarget.com/searchdatamanagement/news/366628006/Informatica-adds-MCP-support-spate-of-AI-fueled-features>
- **[36]** Informatica: Healthcare Data Management with IDMC _(Vendor)_ <https://www.informatica.com/solutions/industry-solutions/healthcare.html>
- **[37]** Informatica: HL7 and HIPAA Data Services with IDMC for Healthcare (data sheet) _(Vendor data sheet)_ <https://www.informatica.com/content/dam/informatica-com/en/collateral/data-sheet/hl7-and-hippa-data-services-with-the-informatica-intelligent-data-management-cloud-idmc-for-healthcare-and-life-sciences_data-sheet_4572en.pdf>

#### Snowflake

- **[38]** Snowflake Docs: MCP Connectors (Cortex Agents) _(Snowflake documentation)_ <https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp-connectors>
- **[39]** Snowflake Docs: Snowflake-managed MCP server _(Snowflake documentation)_ <https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp>
- **[40]** Snowflake: Openflow product page _(Snowflake)_ <https://www.snowflake.com/en/product/features/openflow/>
- **[41]** Snowflake Blog: Openflow Revolutionizes Data Movement for AI and Interoperability _(Snowflake)_ <https://www.snowflake.com/en/blog/openflow-revolutionizes-data-movement-ai/>
- **[42]** Snowflake Blog: Snowflake Openflow and Cortex Code, AI-Driven Data Integration _(Snowflake)_ <https://www.snowflake.com/en/blog/snowflake-openflow-cortex-code-integration/>

#### Pricing and independent or competitor comparisons

- **[43]** Vendr: Workato pricing 2026 _(Procurement-data marketplace)_ <https://www.vendr.com/marketplace/workato>
- **[44]** Vendr: Boomi pricing 2026 _(Procurement-data marketplace)_ <https://www.vendr.com/marketplace/boomi>
- **[45]** Vendr: MuleSoft pricing 2026 _(Procurement-data marketplace)_ <https://www.vendr.com/marketplace/mulesoft>
- **[46]** VendorBenchmark: iPaaS Pricing Benchmarks 2026 _(Negotiation-services vendor (low confidence))_ <https://vendorbenchmark.com/blog/ipaas-pricing-benchmark-enterprise-comparison>
- **[47]** Software Pricing Guide: MuleSoft vs Boomi vs Workato Pricing 2026 _(Blog (no quantified data; low confidence))_ <https://softwarepricingguide.com/mulesoft-vs-boomi-vs-workato-pricing-2026-the-real-cost-of-ipaas-apis-and-automation/>
- **[48]** Frends: 11 best iPaaS platforms in 2026, compared _(Competing vendor blog)_ <https://frends.com/insights/best-ipaas-platforms-2026-compared>
- **[49]** TechnologyMatch: Boomi vs MuleSoft vs Workato vs Celigo comparison _(Broker blog)_ <https://technologymatch.com/blog/boomi-vs-mulesoft-vs-workato-vs-celigo-ipaas-platform-comparison>
- **[50]** Integrate.io: Boomi Review 2026, Pros and Cons _(Competing vendor blog)_ <https://www.integrate.io/blog/boomi-review/>
- **[51]** Exalate: The Best Workato Alternatives in 2026 _(Competing vendor blog)_ <https://exalate.com/blog/workato-alternatives/>

#### YouTube videos (title/metadata only)

- **[52]** YouTube: Workato Enterprise MCP: Orchestration for the Agentic Era _(Video (title/metadata only))_ <https://www.youtube.com/watch?v=kzUcOjL4utU>
- **[53]** YouTube: Workato ONE: The Control & Execution Platform for Enterprise AI _(Video (title/metadata only))_ <https://www.youtube.com/watch?v=fGwpPX5lYJ8>
- **[54]** YouTube: Boomi Agentstudio Demo _(Video (title/metadata only))_ <https://www.youtube.com/watch?v=Bkh4YyY6Dpo>
- **[55]** YouTube: Boomi Control Tower and Agent Step Demo _(Video (title/metadata only))_ <https://www.youtube.com/watch?v=2u1Hs9cBITI>
- **[56]** YouTube: MuleSoft Agent Fabric Insights, Demo & Future Trends _(Video (title/metadata only))_ <https://www.youtube.com/watch?v=m-akcHO_YF0>
- **[57]** YouTube: Introducing MuleSoft Agent Fabric _(Video (title/metadata only))_ <https://www.youtube.com/watch?v=W6R-x7-wP6A>
- **[58]** YouTube: Informatica Superpipe for Snowflake _(Video (title/metadata only))_ <https://www.youtube.com/watch?v=b4xqEz2WL7g>
- **[59]** YouTube: How to Register Informatica IDMC with Snowflake using Free Trial _(Video (title/metadata only))_ <https://www.youtube.com/watch?v=ElI6EvavR28>