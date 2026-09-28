# RAG Frameworks Vendor Comparison — Healthcare Enterprise AI Pattern

**AI pattern:** Pattern 4 — RAG Frameworks. These are frameworks and managed services that ingest, parse and index enterprise content, then retrieve grounded context to answer questions with citations. Target content includes clinical policies, medical-necessity criteria, benefit documents, SOPs, contracts and knowledge bases.
**Evaluation basis:** `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` — Pattern 4 (Part 1 top-10 capabilities, Part 2 pillar weighting, Part 3 scoring template, Part 4 qualitative risk)
**Vendor list source:** `OUTPUTS/ipaas/ai_vendor_list.md`
**Vendors assessed:** LangChain (with LangGraph and LangSmith); LlamaIndex (with LlamaParse and LlamaCloud); Semantic Kernel (RAG and vector store abstractions, and the move to Microsoft Agent Framework); Haystack (deepset, with Haystack Enterprise Platform, formerly deepset AI Platform/Studio); Azure AI Search Integrations (integrated vectorization, skillsets, semantic ranker, agentic retrieval / knowledge bases / Foundry IQ, and LangChain/LlamaIndex/Haystack connectors). Reference column: **Ref: Snowflake Cortex Search** (with AI_PARSE_DOCUMENT and Cortex Agents).
**Research date:** September 2026 (sources: vendor documentation, release notes and blogs; GitHub repository pages, fetched September 2026; Gartner press releases, research abstracts and vendor-published placement announcements; a vendor-published Forrester Wave announcement; PeerSpot and G2; practitioner and third-party comparison articles; a third-party security research blog)

**Scoring scale (0–4)**

| Score | Meaning |
|---|---|
| 0 | Not supported |
| 1 | Basic / custom scripting required |
| 2 | Out-of-the-box / configurable |
| 3 | Advanced / native cloud integration |
| 4 | Fully automated / AI-driven market leader |

**Strategic pillar weights (Pattern 4, Part 2)**

| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |
|---|---|---|
| Answer Quality & Trust | 20% | Parsing, hybrid retrieval, citations, evaluation — the core value driver. |
| Governance, Security & PHI Protection | 20% | Permission-aware retrieval; PHI never over-exposed. |
| Portability & Data-Platform Fit | 15% | Model/vector-store agnostic; runs close to Snowflake-governed data. |
| Functional Completeness (Domains) | 15% | Documents + structured data + multimodal across clinical, claims, member domains. |
| Complexity & Tech Rationalization | 15% | Replace per-pilot bespoke RAG stacks with a standard pipeline. |
| Operational Costs & FinOps | 15% | Indexing/embedding/token cost at enterprise corpus scale. |

**How to read the scores:** Each of the 10 capabilities carries an equal 10% weight in the numeric score (Section 2). The pillar weights above are used qualitatively, mainly in the risk and fit assessment (2.3) and the recommendation (2.4). A "4" means market-leading and largely automated. A "1" means the capability is possible but the enterprise must build it. When a framework (library) is compared with a managed service, a framework usually gets credit for *flexibility*: it can call any parser, reranker or store. It loses points where the enterprise would have to build, run and govern the capability itself, such as ACL sync or incremental indexing.

**Scoping notes**
- **Category mismatch.** LangChain, LlamaIndex, Semantic Kernel and Haystack are *developer frameworks* with commercial companion platforms. Azure AI Search is a *managed retrieval service*. Snowflake Cortex Search is an *in-platform managed retrieval service*. Frameworks and services are complementary: all four frameworks ship Azure AI Search connectors. So the scores reflect "what the enterprise gets as a RAG standard when adopting this option," not like-for-like products.
- **What is scored per vendor:**
  - **LangChain** = `langchain` 1.x OSS + LangGraph runtime + LangSmith (evaluation/observability).
  - **LlamaIndex** = `llama_index` OSS + LlamaParse / LlamaCloud Index v2 (the documentation now presents these under a "LlamaParse Platform" umbrella; the formal renaming of LlamaCloud is **(low confidence)**).
  - **Semantic Kernel** = SK 1.x plus the `Microsoft.Extensions.VectorData` abstractions and their successor path in Microsoft Agent Framework (MAF) 1.0.
  - **Haystack** = Haystack OSS 3.x + Haystack Enterprise Platform (renamed from "deepset AI Platform" in December 2025).
  - **Azure AI Search** = the service plus integrated vectorization, skillsets, semantic ranker and agentic retrieval / knowledge bases (surfaced in Microsoft Foundry as "Foundry IQ").
- **Renames:**
  - Azure Cognitive Search → Azure AI Search.
  - deepset Cloud / deepset AI Platform → Haystack Enterprise Platform.
  - Semantic Kernel → succeeded by Microsoft Agent Framework (GA April 3, 2026).
  - Snowflake recommends moving from Cortex Analyst to Cortex Agents (August 28, 2026).
- **Snowflake reference column** is profiled and scored for comparison but **not ranked**, per the SPEC.

---

## Section 1 — Vendor Profiles against the 10 Capabilities

1. High-Fidelity Document Ingestion & Parsing
2. Flexible Chunking & Embedding Strategy
3. Hybrid Retrieval, Filtering & Re-Ranking
4. Permission-Aware Retrieval (Document & Row-Level Security)
5. Grounding, Citations & Hallucination Controls
6. RAG Evaluation & Continuous Quality Measurement
7. Freshness & Incremental Indexing
8. Advanced & Agentic Retrieval (Multimodal, Structured, Graph)
9. Deployment Portability & Data-Platform Proximity
10. Cost & Performance Efficiency

### 1.1 LangChain

**Context:** LangChain, Inc. publishes the MIT-licensed LangChain and LangGraph frameworks and the commercial LangSmith platform. LangChain 1.0 and LangGraph 1.0 went GA in October 2025. That release introduced a unified `create_agent` API, middleware hooks and standardized content blocks. Under the release policy, 1.x is LTS until 2.0, and 0.3 is in maintenance through December 2026. In October 2025 the company raised a $125M Series B at a $1.25B valuation (IVP-led; CapitalG and Sapphire new). It reports 90M monthly downloads across LangChain and LangGraph, with 35% of the Fortune 500 using its services. The GitHub repository has about 146.9k stars and 24.6k forks (September 2026), the largest community in this category. PeerSpot ranks LangChain #2 in AI Orchestration Frameworks at 22.3% mindshare. LangChain has no Gartner Magic Quadrant placement as a framework; Gartner's 2025 AI Hype Cycle places the underlying AI-agent trend at the Peak of Inflated Expectations.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Document Ingestion & Parsing | The retrieval docs describe document loaders for many sources (Google Drive, Slack, Notion, etc.) returning standard `Document` objects. Layout-aware and OCR parsing is delegated to third-party loaders and integrations (e.g., Unstructured, Docling, Azure Document Intelligence) rather than a first-party parser. Quality therefore depends on which integration each team picks, which recreates the per-pilot variance the enterprise wants to remove. | 2 |
| 2 | Chunking & Embedding Flexibility | Text splitters (recursive, token, markdown/header-aware, semantic) and a very large catalogue of embedding integrations, including self-hosted and domain-tuned models via HuggingFace. Snowflake Arctic embed models are documented integrations. Parent-child and multi-vector patterns are supported through retrievers. | 3 |
| 3 | Hybrid Retrieval & Re-Ranking | Ensemble retrievers (RRF fusion of BM25 and vector), metadata filtering via the underlying vector store, and query rewriting / multi-query and self-query retrievers. Cross-encoder and hosted rerankers (e.g., Cohere, Flashrank) are available as integrations. Hybrid quality depends on the chosen store; for example, native hybrid with Azure AI Search's semantic ranker. In LangChain 1.0 many classic retrievers and chains moved to `langchain-classic`, so standardization needs care. | 3 |
| 4 | Permission-Aware Retrieval | No framework-level ACL model. Security trimming is implemented by passing per-user metadata filters to the vector store, or by delegating to a store that enforces ACLs (e.g., Azure AI Search with `x-ms-query-source-authorization`). LangSmith Enterprise adds RBAC/ABAC for the *platform*, not for document retrieval. | 1 |
| 5 | Grounding & Citations | Citations are a pattern rather than a feature: structured-output and content-block standardization in 1.0 make "answer + source IDs" straightforward, and middleware can add guardrails (e.g., PII redaction). Faithfulness checks and safe refusal are implemented as prompt, grader or LangGraph "hybrid RAG" validation steps described in the docs. | 2 |
| 6 | RAG Evaluation | LangSmith offers datasets, offline and online evaluation, LLM-as-judge (reference-free and reference-based), pairwise comparison and annotation queues with rubrics. These cover golden sets, A/B comparison of pipelines and production feedback capture. RAG-specific metrics (groundedness, retrieval relevance) are implemented as evaluator prompts rather than fixed metrics. | 3 |
| 7 | Freshness & Incremental Indexing | The `langchain_core.indexing` API with a RecordManager supports `incremental`, `full` and `scoped_full` cleanup modes. These give hash-based deduplication, skip unchanged docs and delete stale ones. Scheduling, change-data capture and effective-date versioning are the team's responsibility. | 2 |
| 8 | Advanced / Agentic Retrieval | This is its strongest area. LangGraph 1.0 provides durable, checkpointed agent graphs for multi-step and agentic RAG, with human-in-the-loop. SQL agents and toolkits cover text-to-SQL (including Snowflake via SQLAlchemy). Graph integrations cover Neo4j/GraphRAG, MCP is first-class, and multimodal content blocks are supported. | 4 |
| 9 | Portability & Platform Proximity | MIT OSS that runs anywhere (any cloud, on-prem, air-gapped) with the broadest model and vector-store neutrality in the market. LangSmith is offered as cloud (US/EU; GCP and AWS US regions), hybrid (SaaS control plane, self-hosted data plane) or fully self-hosted. It can call Snowflake-resident retrieval, but no first-party Cortex Search retriever was found in the LangChain docs (only SnowflakeLoader and Arctic embeddings). | 4 |
| 10 | Cost & Performance Efficiency | No licence cost for OSS. LLM caches and embedding caches (CacheBackedEmbeddings) exist. However, practitioners report framework overhead (~10 ms per call) and token inefficiency versus hand-written pipelines ("roughly 2.7x fewer tokens" for hand-rolled code in one analysis) **(low confidence)**. LangSmith adds per-seat ($39 Plus) and usage (LCU/LSU) charges. | 2 |

**Pros**
- Largest community and integration ecosystem (146.9k GitHub stars, 90M monthly downloads), so talent and examples are easy to find (vendor docs / GitHub).
- LangGraph 1.0 gives durable, checkpointed, human-in-the-loop agentic RAG, a good fit for complex prior-authorization and appeals flows (practitioner blog).
- 1.0 brought semantic versioning and an LTS commitment, reducing the historic churn risk (vendor docs).
- LangSmith is a mature evaluation and observability product with online evaluation, pairwise comparison and annotation queues (vendor docs).
- Fully self-hostable framework plus self-hosted or hybrid LangSmith, which fits PHI boundary requirements (vendor docs).
- Strong funding ($1.25B valuation) and enterprise adoption reduce vendor-viability risk (vendor docs / press).
- Ranked #2 in AI Orchestration Frameworks mindshare on PeerSpot (PeerSpot).

**Cons**
- RAG building blocks (parsing, ACL, re-index scheduling) are assembled from integrations; there is no opinionated "enterprise RAG" product (practitioner blog).
- Abstraction and dependency sprawl remain; tracing failures needs LangSmith or Langfuse (practitioner blog).
- Many 0.x retrievers and chains moved to `langchain-classic`, so legacy pilot code needs migration (practitioner blog).
- No native document-level security trimming (vendor docs).
- Token and latency overhead versus lean pipelines has been reported (practitioner blog).
- PeerSpot shows no verified peer reviews yet; its comparison is based on product overviews (PeerSpot).

**Pricing:** OSS free (MIT). LangSmith Developer $0 (5k traces/mo); Plus $39/seat/mo (10k traces, then pay-as-you-go); Enterprise custom (self-hosted/hybrid, SSO, RBAC/ABAC). Usage billed at $1.50/LCU and $1.00/LSU.
**Healthcare / HIPAA note:** The framework runs inside enterprise infrastructure, so HIPAA scope follows the chosen LLM and vector store (e.g., Azure OpenAI or Snowflake under their BAAs). LangSmith docs state it is "SOC 2 Type 2 certified and … HIPAA compliant." BAA terms for LangSmith Cloud should be confirmed contractually **(unverified)**. Self-hosted LangSmith avoids sending PHI-bearing traces to a SaaS.

### 1.2 LlamaIndex (including LlamaParse and LlamaCloud)

**Context:** LlamaIndex, Inc. maintains the MIT-licensed `llama_index` framework (about 52.3k GitHub stars and 8.2k forks, September 2026). Its commercial document platform is LlamaParse / LlamaCloud. The company raised a $19M Series A (Norwest, Greylock; $27.5M total) in March 2025 and made LlamaParse/LlamaCloud GA as SaaS and on-prem at the same time. Customers named include Rakuten, Carlyle, Salesforce and KPMG. The company has openly repositioned as "the document processing platform for AI": the README says priorities have shifted toward LlamaParse ("agentic OCR, parsing, extraction, indexing"). LlamaParse v2 (December 2025) simplified the tiers. Index v2 (GA to all tiers August 2026) replaced the configurable pipeline model with managed directories and indexes. LlamaIndex has no Gartner MQ placement. PeerSpot ranks it #9 in AI Orchestration Frameworks at 7.0% mindshare, up from 1.6% a year earlier.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Document Ingestion & Parsing | LlamaParse v2 is the category's best-known layout-aware parser. It has four tiers: Fast 1 credit/page, Cost Effective 3, Agentic 10, Agentic Plus 45. It handles tables, charts, images and complex layouts, and can pin to a parser version date for reproducibility. August 2026 added enriched forms with field-level bounding boxes, and LlamaSheets/Extract handle spreadsheets. Healthcare-specific C-CDA handling is not documented **(unverified)**. | 4 |
| 2 | Chunking & Embedding Flexibility | The OSS framework offers many node parsers (sentence, semantic, hierarchical, markdown) and 300+ integration packages for embeddings and stores. The managed Index v2, however, uses fixed settings ("sentence-based, 1024 tokens per chunk, 200-token overlap" with managed embeddings). Custom strategies therefore mean OSS plus export to your own store. | 3 |
| 3 | Hybrid Retrieval & Re-Ranking | OSS supports hybrid retrieval via stores, fusion retrievers, metadata filters, node postprocessors / rerankers and query transformations (sub-question, HyDE). Index v2's `retrieve` runs hybrid semantic search with optional reranking and filtering. | 3 |
| 4 | Permission-Aware Retrieval | LlamaCloud's SharePoint connector natively syncs SharePoint ACLs into chunk metadata (e.g., `allowed_siteUser_ids`) and re-syncs on permission change. The application then filters by user. This is out-of-the-box for SharePoint only; other sources need custom metadata. Index v2 connectors are limited to SharePoint, Google Drive and S3. | 2 |
| 5 | Grounding & Citations | Citation query engines in OSS. Index v2 / LlamaParse return page screenshots and bounding boxes for visual citations. Field-level bounding boxes (Aug 2026) support "click-to-verify" review, a strong fit for UM nurses checking criteria text. Faithfulness gating and refusal are app-level. | 3 |
| 6 | RAG Evaluation | The OSS evaluation module (faithfulness, relevancy, correctness, retrieval MRR/hit-rate) plus integrations with third-party evaluation tools **(unverified in this research; not re-fetched)**. There is no managed evaluation or A/B product in LlamaCloud comparable to LangSmith or the deepset platform. | 2 |
| 7 | Freshness & Incremental Indexing | Index v1's automatic `sync_interval` became *manual* in v2: teams "trigger syncs" via `POST /api/v1/indexes/{id}/sync` and schedule with cron or Kubernetes. OneDrive, Box, Confluence and Jira connectors were dropped in v2. OSS ingestion pipelines support docstore-based deduplication and upserts. | 2 |
| 8 | Advanced / Agentic Retrieval | PropertyGraphIndex provides GraphRAG with LLM path extractors and a `TextToCypherRetriever` over Neo4j, FalkorDB and others. Workflows and LlamaAgents support multi-step document agents. Index v2 exposes filesystem-style agent tools (retrieve, find, read, grep; July 2026 legal-kb reference app). Multimodal parsing is included; text-to-SQL is available in the OSS framework. | 3 |
| 9 | Portability & Platform Proximity | OSS runs anywhere. LlamaParse deploys as managed SaaS (NA/EU), single-tenant SaaS, BYOC (Azure, AWS, GCP) or self-hosted Kubernetes. The v2 managed vector store reduces store-neutrality unless you export. There is no native in-Snowflake execution; parsed output must be written to Snowflake for Cortex Search. | 3 |
| 10 | Cost & Performance Efficiency | Transparent per-page credit tiers let teams route simple documents to 1-credit Fast and reserve Agentic tiers for complex policies. v2 cut Agentic Plus pricing by 50%. Practitioner benchmarks show low framework overhead (~6 ms) **(low confidence)**. The Extract "Turbo" tier (beta, Aug 2026) lowers latency. | 3 |

**Pros**
- Best-in-class parsing for table-heavy, scanned and complex documents, which is the #1 cause of wrong answers in healthcare pilots (vendor docs / practitioner blog).
- Visual citations with page screenshots and bounding boxes support clinical and UM verification workflows (vendor docs).
- Native SharePoint ACL sync into chunk metadata (vendor docs).
- Flexible deployment, including BYOC and self-hosted Kubernetes, with a BAA available for Enterprise (vendor docs).
- Practitioners consistently rate it the fastest path to a working production RAG pipeline (practitioner blog).
- Strong GraphRAG (PropertyGraphIndex, TextToCypher) and agentic document tooling (vendor docs).
- PeerSpot mindshare grew from 1.6% to 7.0% year over year (PeerSpot).

**Cons**
- Strategic focus has shifted to the commercial document platform; OSS framework investment may slow (GitHub / vendor docs).
- Index v2 removed configurable chunking, embedding and external vector-store sinks, and made sync manual (vendor docs).
- Several v1 connectors were removed (OneDrive, Box, Confluence, Jira) (vendor docs).
- Frequent API and product churn: Sheets API deprecated, Classify v1 removed, Index v1 migration (vendor docs).
- A smaller company ($27.5M raised as of 2025) creates vendor-viability risk for a strategic standard (vendor docs).
- No managed evaluation product; teams need LangSmith, Langfuse or similar (practitioner blog).

**Pricing:** OSS free (MIT). LlamaParse credits per page by tier (1 / 3 / 10 / 45 credits); dollar value per credit and plan pricing are plan-dependent **(unverified)**. Enterprise plans include BYOC and self-hosting.
**Healthcare / HIPAA note:** Docs state a "HIPAA-compliant processing pipeline is available for Enterprise customers, with a Business Associate Agreement (BAA) available on request." SOC 2 Type II. Prefer BYOC or self-hosted in the enterprise's own Azure/AWS tenant so PHI documents are not sent to multi-tenant SaaS.

### 1.3 Semantic Kernel (RAG and vector store abstractions; Microsoft Agent Framework transition)

**Context:** Semantic Kernel (SK) is Microsoft's MIT-licensed SDK for .NET, Python and Java (about 28.4k GitHub stars). The repository now states that Microsoft Agent Framework (MAF) is "the enterprise-ready successor to Semantic Kernel." MAF 1.0 went GA on April 3, 2026 for .NET and Python, with Go in preview. It has about 12.6k GitHub stars and merges SK's enterprise foundations with AutoGen orchestration. SK 1.x continues to get critical bug and security fixes for at least one year after MAF GA. Microsoft advises new builds to use MAF. The vector store abstraction `Microsoft.Extensions.VectorData.Abstractions` went GA in May 2025 and is shared by SK and MAF. SK's own connector implementations remained in preview at that point. Microsoft was named a Leader, and furthest for Completeness of Vision, in the 2025 Gartner Magic Quadrant for AI Application Development Platforms (December 2025). That placement covers Foundry rather than SK specifically.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Document Ingestion & Parsing | No first-party document parser. RAG samples expect content already chunked in a vector store or search index, so parsing is delegated to Azure AI Search skillsets / Document Intelligence or custom code. | 1 |
| 2 | Chunking & Embedding Flexibility | Pluggable `IEmbeddingGenerator` (Microsoft.Extensions.AI) and record-model-based vector collections. Chunking utilities are basic (text chunker), and advanced strategies are app-built. The abstraction itself is clean and strongly typed. | 2 |
| 3 | Hybrid Retrieval & Re-Ranking | `HybridSearchAsync` / `hybrid_search()` combining vector and full-text is in **Preview** and implemented only by connectors such as Azure AI Search and Qdrant. Sparse-vector hybrid is not supported. LINQ and typed filters are supported. There is no built-in reranker abstraction. | 2 |
| 4 | Permission-Aware Retrieval | Filters (e.g., `r => r.TenantId == 5`) allow security trimming if the app injects user claims. Native ACL enforcement only arrives when the backing store provides it (e.g., Azure AI Search token-based trimming). | 1 |
| 5 | Grounding & Citations | MAF's `TextSearchProvider` injects retrieved context before invocation or on demand as a function tool, with configurable `ContextPrompt` / `CitationsPrompt` so the model cites sources. There are no built-in faithfulness checks. | 2 |
| 6 | RAG Evaluation | No RAG evaluation in SK or MAF itself. Evaluation relies on Microsoft Foundry evaluations or third-party tools; MAF has OpenTelemetry observability and "AF Labs" benchmarking experiments. | 1 |
| 7 | Freshness & Incremental Indexing | Upsert and delete APIs on collections only. There is no change tracking, record manager or scheduler; freshness is fully the application's job, or is handled by Azure AI Search indexers. | 1 |
| 8 | Advanced / Agentic Retrieval | MAF supports agentic RAG via tools, multi-agent workflows (sequential, concurrent, handoff), MCP, and a Neo4j GraphRAG context provider. Text-to-SQL and multimodal retrieval are not first-class RAG features. | 2 |
| 9 | Portability & Platform Proximity | Model-agnostic (OpenAI, Azure OpenAI, HuggingFace, NVIDIA, Ollama/ONNX locally) and store-agnostic (Azure AI Search, Qdrant, PostgreSQL/pgvector, Redis, SqliteVec, Elasticsearch, Oracle, etc.). It runs anywhere .NET, Python or Java runs, and is the only option with first-class .NET and Java. No Snowflake vector connector was found. | 3 |
| 10 | Cost & Performance Efficiency | Free SDK with a thin runtime. There are no RAG-specific cost features such as semantic caching, token budgets or usage-by-domain reporting beyond OpenTelemetry. | 2 |

**Pros**
- First-class .NET (and Java) support, which suits enterprise application teams on the Microsoft stack (vendor docs).
- The GA `Microsoft.Extensions.VectorData` abstraction gives a clean, store-neutral contract carried into MAF (vendor docs).
- Microsoft backing; the successor MAF 1.0 is GA with a documented migration guide (vendor docs).
- `TextSearchProvider` makes simple RAG agents concise, with configurable citation prompts (vendor docs / practitioner blog).
- Broad connector ecosystem, including partner-built connectors such as Oracle AI Database for MAF (vendor blog).
- Microsoft is a Gartner MQ Leader for AI Application Development Platforms (Gartner via vendor).

**Cons**
- SK is in sustain mode, so a new standard on SK would carry migration debt to MAF (vendor docs / practitioner blog).
- No parsing, chunking strategies, evaluation or incremental indexing; it is an abstraction layer, not a RAG framework (vendor docs).
- Hybrid search is still Preview and limited to a few connectors (vendor docs).
- The strongest capabilities assume Azure AI Search / Foundry behind it, so portability in practice is lower than on paper (practitioner blog).
- Python parity has lagged .NET in some areas **(low confidence)** (practitioner blog).

**Pricing:** Free (MIT). Costs come from the underlying model, embedding and search services.
**Healthcare / HIPAA note:** A library with no hosted component, so HIPAA scope is determined by the backing services (e.g., Azure OpenAI covered by the Microsoft BAA through the Product Terms/DPA). There is no independent BAA concern, but also no PHI controls of its own.

### 1.4 Haystack (deepset, including Haystack Enterprise Platform, formerly deepset AI Platform/Studio)

**Context:** deepset GmbH (Berlin) maintains the Apache-2.0 Haystack framework, with about 26.2k GitHub stars and 3.0k forks. Haystack 3.0 shipped on July 20, 2026, followed by 3.1 (August) and 3.2 (September 24, 2026). 3.0 unified sync and async `Pipeline`, added agent hooks, token and step accounting, and safer pipeline deserialization. It also moved 30+ components (embedders, OCR, etc.) into separate integration packages. In December 2025 deepset renamed its commercial offering from "deepset AI Platform" (Studio) to **Haystack Enterprise Platform**. It also introduced **Haystack Enterprise Starter** (OSS plus support) and positions itself as a "sovereign AI platform." Named users include Apple, Meta, Databricks, Netflix, Airbus and European Commission initiatives. No Gartner MQ placement for deepset was found in this research **(unverified)**.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Document Ingestion & Parsing | Converter components cover PDF, DOCX, HTML, etc. The Docling integration (`DoclingConverter`) provides layout- and table-aware parsing with chunk, markdown or JSON export. Azure OCR / Document Intelligence and Unstructured converters are also available. The Enterprise Platform adds managed file-processing pipelines. | 3 |
| 2 | Chunking & Embedding Flexibility | `DocumentSplitter` / `RecursiveDocumentSplitter`, Docling hybrid chunking, and metadata enrichment components. Many embedder integrations (Sentence Transformers, OpenAI, Azure, Cohere, NVIDIA, Ollama) support self-hosted domain models. Embedders moved to integration packages in 3.0. | 3 |
| 3 | Hybrid Retrieval & Re-Ranking | Explicit hybrid pipelines combine BM25 retriever + embedding retriever → `DocumentJoiner` (RRF) → cross-encoder ranker (e.g., `bge-reranker`). The hybrid tutorial notes keyword methods "often outperform dense retrieval" in healthcare. Rich metadata filters work across stores; the Azure AI Search integration offers embedding, BM25 and hybrid retrievers plus semantic ranking. | 3 |
| 4 | Permission-Aware Retrieval | The platform provides RBAC, audit logs and governance for users and pipelines. Document-level trimming is done via metadata filters injected per user; no native source-ACL sync was found **(unverified)**. | 1 |
| 5 | Grounding & Citations | `AnswerBuilder` returns answers with referenced documents. Prompt templates can enforce citation and refusal, and 3.0 hooks (`before_llm`, `after_tool`, `on_exit`) allow guardrails and human-in-the-loop checks. Faithfulness gating at runtime is custom. | 2 |
| 6 | RAG Evaluation | The richest built-in OSS evaluator set: FaithfulnessEvaluator, ContextRelevanceEvaluator, DocumentMRR/MAP/NDCG/Recall, SAS, AnswerExactMatch and a general LLMEvaluator. The Enterprise Platform adds prompt comparison, run history, tracing and stakeholder prototype sharing for feedback. | 3 |
| 7 | Freshness & Incremental Indexing | `DocumentWriter` duplicate policies (overwrite/skip) and indexing pipelines can be scheduled on the platform. There is no native CDC or ACL sync; deletion propagation and effective dating are app-level. | 2 |
| 8 | Advanced / Agentic Retrieval | 3.0 Agent with hooks, tool-result offloading and `SkillToolset` progressive disclosure. Pipelines support cycles for agentic loops. `SnowflakeTableRetriever` runs SQL against Snowflake, and multimodal components are included. GraphRAG is via integrations rather than a first-party index. | 3 |
| 9 | Portability & Platform Proximity | Apache-2.0, model- and store-agnostic (100+ integrations). YAML-serializable pipelines are version-controllable. The Enterprise Platform runs as managed cloud or self-hosted, positioned for sovereign and on-prem use. Snowflake access is via `snowflake-haystack` (password, JWT key-pair or OAuth). | 4 |
| 10 | Cost & Performance Efficiency | 3.2 adds "token budget guardrails" and smart compaction. 3.0 tracks `token_usage` and `tool_call_counts` so pipelines can "route to cheaper approaches past budget thresholds." Practitioners measured the lowest framework overhead (~5.9 ms) **(low confidence)**. The platform provides usage reports. | 3 |

**Pros**
- Explicit, typed, YAML-serializable pipelines are auditable and version-controllable, a strong fit for regulated change control (practitioner blog).
- Most complete built-in RAG evaluator library of the OSS frameworks (vendor docs).
- New 3.x cost controls: token budgets, compaction, usage tracking (vendor docs).
- Apache-2.0 with self-hosted, sovereign-positioned Enterprise Platform; SOC 2 Type II, ISO 27001, CSA STAR Level 1 (vendor docs).
- Low runtime overhead and stable production track record since 2.0 (practitioner blog).
- deepset provides forward-deployed engineers for production enablement (vendor docs).

**Cons**
- The 3.0 breaking changes (removed generators, moved components, lifecycle changes) require pilot code migration (vendor docs).
- Smaller community than LangChain or LlamaIndex (26.2k stars); fewer ready-made enterprise connectors (GitHub / practitioner blog).
- No native source-ACL synchronization (vendor docs).
- Parsing quality depends on the chosen converter (Docling, Azure DI) rather than a first-party parser (practitioner blog).
- Enterprise Platform pricing is not public, and US healthcare references are limited **(unverified)** (vendor docs).

**Pricing:** OSS free (Apache-2.0). Enterprise Starter (support subscription) and Enterprise Platform are priced on request.
**Healthcare / HIPAA note:** The platform page states support for "GDPR and HIPAA compliance requirements." BAA availability must be confirmed with deepset **(unverified)**. Self-hosting the OSS or platform in the enterprise tenant keeps PHI inside existing boundaries.

### 1.5 Azure AI Search Integrations

**Context:** Azure AI Search (formerly Azure Cognitive Search) is Microsoft's managed search and retrieval service and the engine behind **Foundry IQ**, a preview announced at Ignite 2025 as "pre-configured knowledge bases and agentic retrieval in a single API … respecting user permissions."
- **Agentic retrieval status:** knowledge bases with minimal, extractive retrieval reached GA in REST API `2026-04-01`. LLM query planning, answer synthesis, higher reasoning effort and multi-turn remain Preview (`2026-08-01-preview`).
- **SDKs:** the May 2026 SDK wave (v12.0.0) shipped `KnowledgeBaseRetrievalClient`.
- **Framework connectors:** there are first-party or partner connectors for LangChain, LlamaIndex, Haystack (`azure-ai-search-haystack`) and SK/MAF.
- **MCP:** knowledge bases expose an MCP endpoint (`knowledge_base_retrieve`), so Claude, LangChain and MAF agents can use them.
- **Analyst coverage:** Microsoft was named a Leader in the 2025 Gartner MQ for AI Application Development Platforms (Foundry). The reference sample `azure-search-openai-demo` has 7.7k stars and 5.5k forks.
- **Retirement:** the legacy "Azure OpenAI On Your Data" path is reported as retiring October 14, 2026 **(unverified)**.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Document Ingestion & Parsing | Indexers crack PDFs and Office files. The **Document Layout skill** (Document Intelligence layout model) outputs markdown by heading depth or chunked text and extracts images with location metadata for PDF, images, DOCX, XLSX, PPTX and HTML up to 2,000 pages / 500 MB. It has a 5-minute processing timeout. An Azure Content Understanding skill is also available. | 3 |
| 2 | Chunking & Embedding Flexibility | Text Split skill, layout-based section chunking and **index projections** (parent/child secondary indexes). Embeddings via AzureOpenAIEmbedding (ada-002, 3-small, 3-large), Azure Vision multimodal, the AML skill (Foundry model catalog) or a Custom Web API for self-hosted models. Query-time vectorizers must match. | 3 |
| 3 | Hybrid Retrieval & Re-Ranking | Market-leading: BM25 + vector fused with RRF, then the **semantic ranker** (Bing-derived cross-encoder, 0–4 reranker score over the top 50) with captions, extractive answers and **query rewrite** (up to 10 variants, typo correction). Rich OData metadata filters. Agentic retrieval adds LLM query decomposition across sources. | 4 |
| 4 | Permission-Aware Retrieval | **Security filters (GA)**, plus Preview token-based trimming via `x-ms-query-source-authorization`. The Preview trimming covers ADLS Gen2/Blob POSIX ACLs and RBAC scopes, **SharePoint ACLs** (incl. site groups, 2026-05-01-preview) and **Purview sensitivity labels** (Nov 2025). Since `2025-11-01-preview`, ACL filters apply even with admin keys. Limits: sync lag, 32 ACL entries per ADLS item, nested groups not expanded. | 3 |
| 5 | Grounding & Citations | Semantic captions and extractive answers are verbatim. Agentic retrieval returns merged content with source references and optional citation-backed **answer synthesis** (Preview). Extractive "minimal" mode supports strict grounding; refusal behaviour is app-level. | 3 |
| 6 | RAG Evaluation | The search service itself provides relevance scores (`@search.rerankerScore`) and debug modes, but no RAG evaluation harness. Evaluation comes from Microsoft Foundry evaluations or frameworks (e.g., the demo repo's evaluation tooling) **(unverified detail)**. | 2 |
| 7 | Freshness & Incremental Indexing | Scheduled indexers with change detection, deletion-detection policies and built-in retry on embedding throttling. "End-to-end automation — changes propagate from source through chunking, vectorization, to indexing." SharePoint inherited-permission changes need an explicit refresh. | 3 |
| 8 | Advanced / Agentic Retrieval | Knowledge bases span up to 10 sources: indexed (Blob, OneLake, search index; Azure SQL, SharePoint, upload in preview) and remote (SharePoint via Copilot Retrieval API, Bing web, Fabric data agents, MCP). Adds parallel subqueries, reasoning effort levels and multimodal image assets. There is no native Snowflake knowledge source, and no GraphRAG index. | 3 |
| 9 | Portability & Platform Proximity | Azure-only managed service; no on-prem or other-cloud deployment. PHI must be copied out of Snowflake into an Azure index. The MCP endpoint and framework connectors reduce *consumer* lock-in, but not data-plane lock-in. | 1 |
| 10 | Cost & Performance Efficiency | Dedicated tiers (Basic–S3, L1/L2) are billed hourly, and Serverless (Preview) scales to zero. Semantic ranker and agentic retrieval tokens are billed separately with free monthly allowances; query planning and synthesis add Azure OpenAI tokens (Microsoft example ≈ $4.32 for a sample workload). Practitioners and competitors cite cost at scale and complex pricing. | 2 |

**Pros**
- Best-in-class hybrid retrieval plus semantic reranking and query rewrite, which directly addresses CPT/ICD/NDC exact-match needs (vendor docs).
- Only option with native, token-based document-level security trimming across ADLS, SharePoint and Purview labels (vendor docs).
- Fully managed ingestion (indexers + skillsets + integrated vectorization) removes per-pilot pipeline code (vendor docs).
- Agentic retrieval / Foundry IQ gives a shared knowledge layer that many agents can reuse via API or MCP (vendor docs / practitioner blog).
- Microsoft Gartner MQ Leader positioning (AI App Dev Platforms) and enterprise support (Gartner via vendor).
- Covered by the Microsoft HIPAA BAA via Product Terms/DPA for in-scope services (vendor docs).

**Cons**
- Azure lock-in, and PHI leaves the Snowflake governance boundary (vendor docs).
- Key differentiators (native ACLs, Purview labels, query planning, answer synthesis) are still **Preview**, which is a problem for PHI production (vendor docs).
- Costs stack: tier + semantic ranker + agentic tokens + Azure OpenAI + Document Intelligence (vendor docs / competitor blog).
- Complex configuration and index-management friction is reported by users (G2 via competitor blog).
- Knowledge bases are limited to 10 sources and a single search service (practitioner blog).
- The G2 review base for the product is small (10 reviews, 3.8/5) and of low relevance (G2).

**Pricing:** Hourly per search unit by tier (Free, Basic, S1–S3, L1–L2) or Serverless (Preview). Semantic ranker and agentic retrieval are pay-as-you-go beyond free allowances. Azure OpenAI and Document Intelligence are billed separately.
**Healthcare / HIPAA note:** The Microsoft HIPAA BAA is included by default via the Product Terms/DPA for in-scope services. Azure AI Search is generally listed in audit scope, but this should be confirmed on the "Cloud services in audit scope" list **(unverified in this research)**. Community guidance cautions that Preview features and non-Microsoft Foundry models lack explicit BAA confirmation. Use Private Endpoints and Entra ID.

### 1.6 Ref: Snowflake Cortex Search (with AI_PARSE_DOCUMENT / Document AI and Cortex Agents) — reference, not ranked

**Context:** Snowflake Cortex Search is a managed hybrid search service created with `CREATE CORTEX SEARCH SERVICE` over Snowflake tables. It runs inside the Snowflake perimeter. It was announced in 2024 with a claimed ">12% retrieval boost" over vector-only search and 200–300 ms latency. In 2026, AI_PARSE_DOCUMENT gained GA image extraction and a 2,000-page limit (April 30, 2026) and OCR quality improvements (May 4, 2026). Snowflake recommended moving from Cortex Analyst to **Cortex Agents** (August 28, 2026); Cortex Agents orchestrates Cortex Search, Cortex Analyst (text-to-SQL), code execution, MCP connectors and web search. Business Critical edition supports PHI under a BAA. Because Snowflake is the enterprise data platform (licences already purchased), this column shows the "retrieval next to governed data" baseline.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Document Ingestion & Parsing | AI_PARSE_DOCUMENT offers OCR and LAYOUT modes. LAYOUT extracts tables and structure, image extraction is GA, documents can be up to 2,000 pages, and page splitting and page ranges are supported. AI_EXTRACT handles schema-based extraction including checkboxes and handwriting. All of this runs in SQL on staged files. | 3 |
| 2 | Chunking & Embedding Flexibility | Chunking uses SQL functions such as SPLIT_TEXT_RECURSIVE_CHARACTER. Embeddings are limited to a curated set (Arctic Embed m-v1.5, l-v2.0, l-v2.0-8k, Voyage multilingual). Multi-index services accept *custom vector embeddings*. Hierarchical and semantic chunking are app-built. | 2 |
| 3 | Hybrid Retrieval & Re-Ranking | Built-in vector + keyword + semantic reranking with `ATTRIBUTES` filters (`@eq` etc.) and multi-column indexes. No explicit query decomposition in the service (Cortex Agents adds planning). | 3 |
| 4 | Permission-Aware Retrieval | Services run with **owner's rights**; per-user trimming is implemented with server-side filters (e.g., `CURRENT_ROLE()` against an indexed attribute). Cyera showed that a service created by a highly privileged role can expose masked data to anyone with USAGE (disclosed April 2025). Snowflake updated docs and committed to caller's-rights options. | 2 |
| 5 | Grounding & Citations | Returns source rows and columns for citation. Cortex Agents "reflect and respond" orchestration and AI Guardrails provide app-level grounding. Passage-level citation formatting is left to the app **(low confidence)**. | 2 |
| 6 | RAG Evaluation | AI Observability (TruLens-based) supports the RAG triad (context relevance, groundedness, answer relevance), tracing, and Snowsight evaluations for Cortex Agents. Account Usage views provide cost per request. | 3 |
| 7 | Freshness & Incremental Indexing | `TARGET_LAG`-driven refresh; services with primary keys refresh only changed rows. Deletes propagate from the source table. Freshness is automatic for any content already landed in the lakehouse. | 3 |
| 8 | Advanced / Agentic Retrieval | Cortex Agents combine Cortex Search (documents) and Cortex Analyst (semantic views → SQL over claims and member tables) in one plan. This directly addresses "policy criteria + this member's claims history." Images come from AI_PARSE_DOCUMENT; no GraphRAG. | 3 |
| 9 | Portability & Platform Proximity | Maximum proximity: retrieval runs where PHI is already governed (Business Critical, RBAC, masking), with no data copy. It is Snowflake-locked but multi-cloud (AWS, Azure, GCP). Some models need cross-region inference. | 3 |
| 10 | Cost & Performance Efficiency | Serverless, with no index infrastructure to run. Cost components: warehouse refresh (only when changes are detected), EMBED_TEXT tokens, serving per GB/month, storage. Auto-suspend of idle serving is in Preview; Account Usage views give FinOps attribution. | 3 |

**Pros**
- Retrieval stays inside the governed PHI boundary on already-licensed infrastructure (vendor docs).
- Unifies documents and structured claims/member data via Cortex Agents + Analyst (vendor docs).
- Automatic incremental freshness from lakehouse tables (vendor docs).
- Built-in RAG-triad evaluation and cost telemetry (vendor docs / practitioner blog).
- No separate vendor, BAA or security review (vendor docs).

**Cons**
- Owner's-rights model requires careful role design; a documented masking-bypass risk exists if misconfigured (third-party security blog).
- Limited embedding and chunking choices compared with frameworks (vendor docs).
- Content from SharePoint, fax and ECM systems must first be landed in Snowflake stages (vendor docs).
- Serving cost accrues per GB/month even when idle unless auto-suspend (Preview) is used (vendor docs).

**Pricing:** Consumption credits (warehouse, embedding tokens, serving per GB/month, storage); AI_PARSE_DOCUMENT billed per page **(rate unverified)**.
**Healthcare / HIPAA note:** Business Critical (or VPS) edition with a signed BAA supports PHI. Confirm that the Cortex models used are in the BAA scope and that cross-region inference is disabled or approved for PHI **(unverified)**.

---

## Section 2 — Comparison: RAG Frameworks Feature Scoring Template (0 to 4 Scale)

Each capability is weighted 10%. Weighted score = score × 0.10; Total = sum of weighted scores (max 4.00); Normalized % = Total ÷ 4. The Snowflake reference column is scored but not ranked.

### 2.1 Raw scores (0–4)

| # | Capability | Description & Evaluation Focus | Weight | LangChain | LlamaIndex | Semantic Kernel | Haystack | Azure AI Search | Ref: Snowflake Cortex Search |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Document Ingestion & Parsing | Layout-aware parsing of PDFs, scans/OCR, tables, forms, C-CDA. | 10% | 2 | 4 | 1 | 3 | 3 | 3 |
| 2 | Chunking & Embedding Flexibility | Semantic/hierarchical chunking, metadata, pluggable embeddings. | 10% | 3 | 3 | 2 | 3 | 3 | 2 |
| 3 | Hybrid Retrieval & Re-Ranking | BM25 + vector, metadata filters, re-rankers, query rewriting. | 10% | 3 | 3 | 2 | 3 | 4 | 3 |
| 4 | Permission-Aware Retrieval | Source ACL trimming, identity propagation, PHI-aware filters. | 10% | 1 | 2 | 1 | 1 | 3 | 2 |
| 5 | Grounding & Citations | Passage-level citations, faithfulness checks, safe refusal. | 10% | 2 | 3 | 2 | 2 | 3 | 2 |
| 6 | RAG Evaluation | Context precision/recall, faithfulness metrics, golden sets, A/B. | 10% | 3 | 2 | 1 | 3 | 2 | 3 |
| 7 | Freshness & Incremental Indexing | Change-driven re-index, deletes, versioned/effective-dated docs. | 10% | 2 | 2 | 1 | 2 | 3 | 3 |
| 8 | Advanced / Agentic Retrieval | Agentic multi-step, text-to-SQL, GraphRAG, multimodal. | 10% | 4 | 3 | 2 | 3 | 3 | 3 |
| 9 | Portability & Platform Proximity | Model/store agnostic; in-platform retrieval (e.g., Snowflake). | 10% | 4 | 3 | 3 | 4 | 1 | 3 |
| 10 | Cost & Performance Efficiency | Embedding/index cost, caching, token efficiency, latency SLAs. | 10% | 2 | 3 | 2 | 3 | 2 | 3 |
| | **Sum of raw scores (max 40)** | | | **26** | **28** | **17** | **27** | **27** | **27** |

### 2.2 Weighted scores (Score × Weight) and totals

| # | Capability | LangChain | LlamaIndex | Semantic Kernel | Haystack | Azure AI Search | Ref: Snowflake Cortex Search |
|---|---|---|---|---|---|---|---|
| 1 | Document Ingestion & Parsing | 0.20 | 0.40 | 0.10 | 0.30 | 0.30 | 0.30 |
| 2 | Chunking & Embedding Flexibility | 0.30 | 0.30 | 0.20 | 0.30 | 0.30 | 0.20 |
| 3 | Hybrid Retrieval & Re-Ranking | 0.30 | 0.30 | 0.20 | 0.30 | 0.40 | 0.30 |
| 4 | Permission-Aware Retrieval | 0.10 | 0.20 | 0.10 | 0.10 | 0.30 | 0.20 |
| 5 | Grounding & Citations | 0.20 | 0.30 | 0.20 | 0.20 | 0.30 | 0.20 |
| 6 | RAG Evaluation | 0.30 | 0.20 | 0.10 | 0.30 | 0.20 | 0.30 |
| 7 | Freshness & Incremental Indexing | 0.20 | 0.20 | 0.10 | 0.20 | 0.30 | 0.30 |
| 8 | Advanced / Agentic Retrieval | 0.40 | 0.30 | 0.20 | 0.30 | 0.30 | 0.30 |
| 9 | Portability & Platform Proximity | 0.40 | 0.30 | 0.30 | 0.40 | 0.10 | 0.30 |
| 10 | Cost & Performance Efficiency | 0.20 | 0.30 | 0.20 | 0.30 | 0.20 | 0.30 |
| **TOTALS** | **Sum of weighted scores (max 4.0)** | **2.60** | **2.80** | **1.70** | **2.70** | **2.70** | **2.70** |
| | **Normalized to 100%** | **65.0%** | **70.0%** | **42.5%** | **67.5%** | **67.5%** | **67.5%** |
| | **Rank** | 4 | 1 | 5 | 2 (tie) | 2 (tie) | (reference) |

*Tie note:* Haystack and Azure AI Search tie at 2.70 but with opposite profiles. Haystack is strong on portability, evaluation and cost control. Azure AI Search is strong on retrieval quality, security trimming and managed freshness, but scores 1 on portability. Using the Part 2 pillars as a tie-breaker, Azure AI Search leads on Governance/PHI (20%) and Haystack leads on Portability/Data-Platform Fit (15%).

### 2.3 Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | LangChain | LlamaIndex | Semantic Kernel | Haystack | Azure AI Search | Ref: Snowflake Cortex Search |
|---|---|---|---|---|---|---|---|
| Pilot Consolidation | Can this replace the separate RAG stacks built in current pilots? | Medium Risk — most pilots likely already use it, but 0.x→1.0/`langchain-classic` migration and no opinionated RAG product | Low–Medium Risk — opinionated parse→index→retrieve path; Index v2 migration and connector cuts | High Risk — abstraction only; SK→MAF transition | Medium Risk — clean pipelines, but 3.0 breaking changes and smaller talent pool | Low Risk (Azure-hosted content) — managed indexers/skillsets replace custom ingestion | Low Risk (Snowflake-resident content) — SQL-native; High for SharePoint/ECM content |
| PHI Boundary | Does retrieval run inside governed boundaries (e.g., Snowflake) or copy PHI out? | Low Risk if self-hosted; depends on chosen store | Medium Risk — SaaS parse unless BYOC/self-hosted; BAA on request | Low Risk (library); depends on backends | Low Risk — self-hosted/sovereign platform | Medium–High Risk — copies PHI from Snowflake into Azure index (BAA-covered) | Low Risk — in-platform, Business Critical + BAA; owner's-rights config risk |
| Quality Evidence | Can the vendor demonstrate measured faithfulness on our own documents? | Pass — LangSmith datasets, LLM-judge, pairwise | Partial — strong parsing and visual citations; evaluation needs third party | Fail — no built-in evaluation | Pass — built-in faithfulness/context/retrieval metrics + platform | Partial — reranker scores; evaluation via Foundry | Pass — AI Observability RAG triad |
| Content Owner Adoption | Can policy/clinical content owners manage sources without engineering? | Fail — developer-only (Agent Builder no-code preview only) | Pass — LlamaCloud UI, directories, dashboard index creation | Fail — developer SDK | Pass (platform) — visual builder, prototype sharing | Pass — portal wizards, Foundry IQ knowledge bases (portal is Preview) | Partial — Snowsight/SQL; needs data-engineering landing |
| Vendor / Roadmap Stability | Is the product line stable for a 3–5 year standard? | Low Risk — $1.25B valuation, LTS policy | Medium Risk — small company; product churn toward document platform | Medium Risk — successor (MAF) is GA but migration required | Medium Risk — stable OSS, smaller vendor, breaking 3.0 | Low Risk — Microsoft; but key features Preview | Low Risk — strategic platform already licensed |
| HIPAA / BAA | Is a BAA available for all hosted components? | Partial — LangSmith states HIPAA compliance; BAA to confirm | Yes (Enterprise, on request) | N/A (library) | Partial — "supports HIPAA"; BAA to confirm | Yes — Microsoft DPA; Preview features caution | Yes — Business Critical + BAA |
| Lock-in / Snowflake Fit | How locked-in and how well does it use Snowflake? | Low lock-in; Snowflake via loaders/SQL, no native Cortex retriever | Low–Medium; must write parsed output to Snowflake | Low; no Snowflake vector connector | Low; `SnowflakeTableRetriever` for SQL | High lock-in; Snowflake data must be copied | Native (but Snowflake-locked) |

### 2.4 Analysis — Best Fit & Recommendations

- **Best fit (ranked): LlamaIndex (2.80 / 70.0%).** It leads on the capability Gartner and practitioners identify as the main failure driver: parsing quality. Gartner says poor data quality "produces … failed retrieval augmented generation (RAG) implementations" and predicts 60% of AI projects without AI-ready data will be abandoned through 2026. LlamaParse's tiered, version-pinnable parsing, visual bounding-box citations, SharePoint ACL sync, BYOC/self-hosting and an available BAA make it the strongest *framework* standard for table-heavy benefit documents, medical policies and scanned referrals. Mitigate its risks by contracting BYOC, keeping OSS pipelines able to write to Snowflake or Azure stores (avoid hard dependency on the Index v2 managed store), and pairing it with an external evaluation tool.
- **Haystack (2.70, tie)** is the best alternative framework where auditability, sovereign or on-prem deployment and built-in evaluation matter most. Its YAML pipelines and evaluator set suit a governed "RAG reference pipeline." **Azure AI Search (2.70, tie)** is the best *retrieval engine* for Microsoft-resident content. Its native SharePoint/ADLS ACL and Purview-label trimming is unique in this set, but several of those features are still Preview, and it copies PHI out of Snowflake.
- **LangChain (2.60)** is the best agent-orchestration layer (LangGraph, LangSmith) rather than the RAG standard itself. Use it where RAG is one step in a multi-step agent (e.g., prior-auth packet assembly), calling LlamaIndex, Cortex Search or Azure AI Search as tools. Gartner's February 2026 GraphRAG research says "most RAG initiatives fail when high thresholds of accuracy are required." LangGraph and LlamaIndex PropertyGraphIndex are the practical routes to GraphRAG. **Semantic Kernel (1.70)** should not be a new standard. Keep it only for existing .NET applications, plan migration to Microsoft Agent Framework, and use `Microsoft.Extensions.VectorData` as the .NET contract over Azure AI Search.
- **Snowflake connection.** The Snowflake reference column scores 2.70, level with the #2 vendors, while keeping PHI inside the governed perimeter on already-licensed infrastructure. Cortex Agents also combine document retrieval with text-to-SQL over claims and member data. The pattern should therefore land parsed, chunked content in the medallion lakehouse (a Silver "document chunks" table with metadata such as plan, state, effective date and ACL groups). Serve it via Cortex Search wherever possible, with frameworks providing parsing and orchestration rather than a separate vector store.
- **Recommended target state.**
  - *Primary standard:* Snowflake Cortex Search as the default governed retrieval index for PHI-bearing and lakehouse-resident content.
  - *Framework layer:* LlamaIndex (with LlamaParse in BYOC or self-hosted mode) as the standard for ingestion, parsing and RAG application code. LangGraph is the approved orchestration layer for multi-step agents, and LangSmith (self-hosted) or Snowflake AI Observability is the evaluation standard.
  - *Exception path:* Azure AI Search / Foundry IQ for Microsoft 365 / SharePoint-centric, non-PHI or permission-critical corpora where native ACL trimming is required. Approve it once the ACL features are GA or risk-accepted. Haystack is the approved alternative framework for sovereign or on-prem use cases.
- **Proof-of-concept checklist:**
  1. Parse a golden set of 200 representative documents (scanned faxes, benefit grids, medical policies, C-CDA) with LlamaParse (Cost Effective vs Agentic), AI_PARSE_DOCUMENT LAYOUT and the Azure Document Layout skill. Score table fidelity and cost per page.
  2. Build the same golden Q&A set (with CPT/ICD/NDC and effective-date questions) and compare Cortex Search and Azure AI Search hybrid + rerank on context precision/recall, faithfulness and latency, using LangSmith or Haystack evaluators and Snowflake AI Observability.
  3. Prove permission trimming. Test Cortex Search with least-privilege owner roles plus server-side role filters against the Cyera scenario, and test Azure AI Search `x-ms-query-source-authorization` with SharePoint ACLs. Include a permission-change propagation test.
  4. Freshness test: update and retire a medical policy and measure time-to-searchable and deletion propagation (Cortex `TARGET_LAG` vs indexer schedule vs LlamaCloud manual sync).
  5. Cost model at scale: 1M pages indexed and 50k queries/day, covering parse, embed, serve and LLM tokens for each option, with FinOps attribution per domain.
  6. Contract check: signed BAAs for LlamaParse (BYOC), LangSmith (if SaaS) and deepset (if used); confirm Azure AI Search and the Cortex models used are in BAA scope.

---

## Section 3 — Bibliography

### Input files
1. Enterprise Architecture — Report specification (SPEC) — `/tmp/claude-0/ai/SPEC.md`
2. Enterprise Architecture — Pattern 4: RAG Frameworks capability template — `/tmp/claude-0/ai/pattern4.md`

### LangChain
3. LangChain — LangChain raises $125M to build the platform for agent engineering — https://www.langchain.com/blog/series-b
4. SiliconANGLE — AI agent tooling provider LangChain raises $125M at $1.25B valuation — https://siliconangle.com/2025/10/20/ai-agent-tooling-provider-langchain-raises-125m-1-25b-valuation/
5. LangChain Docs — Release policy — https://docs.langchain.com/oss/python/release-policy
6. LangChain Docs — Retrieval — https://docs.langchain.com/oss/python/langchain/retrieval
7. LangChain Reference — langchain_core indexing API — https://reference.langchain.com/python/langchain-core/indexing/api
8. LangChain Docs — LangSmith evaluation concepts — https://docs.langchain.com/langsmith/evaluation-concepts
9. LangChain Docs — LangSmith Regions FAQ (SOC 2 / HIPAA) — https://docs.langchain.com/langsmith/regions-faq
10. LangChain — Pricing — https://www.langchain.com/pricing
11. LangChain Docs — Snowflake integrations — https://docs.langchain.com/oss/python/integrations/providers/snowflake
12. GitHub — langchain-ai/langchain — https://github.com/langchain-ai/langchain
13. LangChain Forum — We launched 1.0 versions of LangChain and LangGraph — https://forum.langchain.com/t/we-launched-1-0-versions-of-langchain-and-langgraph/1904

### LlamaIndex (LlamaParse / LlamaCloud)
14. LlamaIndex — Series A funding and LlamaCloud general availability — https://www.llamaindex.ai/blog/announcing-our-series-a-and-llamacloud-general-availability
15. LlamaIndex — Introducing LlamaParse v2: simpler, better, cheaper — https://www.llamaindex.ai/blog/introducing-llamaparse-v2-simpler-better-cheaper
16. LlamaIndex Developer Docs — Changelog: August 2026 — https://developers.llamaindex.ai/llamaparse/changelog/2026-08/
17. LlamaIndex Developer Docs — Migration Guide: Index v1 to v2 — https://developers.llamaindex.ai/llamaparse/cloud-index-v2/migration-v1-to-v2/
18. LlamaIndex Developer Docs — Compliance — https://developers.llamaindex.ai/llamaparse/general/enterprise-readiness/compliance/
19. LlamaIndex Developer Docs — Enterprise Readiness — https://developers.llamaindex.ai/llamaparse/general/enterprise-readiness/
20. LlamaIndex — Permissions-aware content retrieval with SharePoint and LlamaCloud — https://www.llamaindex.ai/blog/permissions-aware-content-retrieval-with-sharepoint-and-llamacloud
21. LlamaIndex Developer Docs — Property Graph Index guide — https://developers.llamaindex.ai/python/framework/module_guides/indexing/lpg_index_guide/
22. LlamaIndex — Newsletter: Looking back on 2025 — https://www.llamaindex.ai/blog/llamaindex-newsletter-2025-12-30
23. MarkTechPost — LlamaIndex 'legal-kb': agentic retrieval over Index v2 — https://www.marktechpost.com/2026/07/05/llamaindex-legal-kb-agentic-retrieval-over-index-v2-with-retrieve-find-read-and-grep-tools/
24. GitHub — run-llama/llama_index — https://github.com/run-llama/llama_index

### Semantic Kernel / Microsoft Agent Framework
25. Microsoft Learn — Agent Framework: RAG — https://learn.microsoft.com/en-us/agent-framework/agents/rag
26. Microsoft Learn — Migration guide from Semantic Kernel to Agent Framework — https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel/
27. Microsoft Learn — Semantic Kernel vector store connectors — https://learn.microsoft.com/en-us/semantic-kernel/concepts/vector-store-connectors/
28. Microsoft Learn — Semantic Kernel hybrid search — https://learn.microsoft.com/en-us/semantic-kernel/concepts/vector-store-connectors/hybrid-search
29. Microsoft Dev Blogs — Vector Data Extensions are now Generally Available — https://devblogs.microsoft.com/agent-framework/vector-data-extensions-are-now-generally-available-ga/
30. GitHub — microsoft/semantic-kernel — https://github.com/microsoft/semantic-kernel
31. GitHub — microsoft/agent-framework — https://github.com/microsoft/agent-framework
32. Atlan — Microsoft Semantic Kernel: features, status & successor in 2026 — https://atlan.com/know/ai-agent/microsoft/semantic-kernel/
33. Jamie Maguire — Microsoft Agent Framework: adding RAG using TextSearchProvider — https://jamiemaguire.net/index.php/2026/02/21/microsoft-agent-framework-adding-rag-to-your-ai-agent-using-textsearchprovider-and-in-memory-vector-store/
34. Oracle Developers Blog — Oracle AI Database vector store connector support for Microsoft Agent Framework (vendor-authored) — https://blogs.oracle.com/developers/announcing-oracle-ai-database-vector-store-connector-support-for-microsoft-agent-framework

### Haystack (deepset)
35. deepset — Haystack release notes — https://haystack.deepset.ai/release-notes
36. deepset — Haystack 3.0.0 release notes — https://haystack.deepset.ai/release-notes/3.0.0
37. deepset — Introducing Haystack Enterprise Platform — https://www.deepset.ai/blog/introducing-haystack-enterprise-platform
38. deepset — Haystack Enterprise Platform — https://www.deepset.ai/haystack-platform
39. deepset — Haystack Enterprise Platform release notes — https://docs.cloud.deepset.ai/docs/whats-new
40. Haystack Docs — Evaluators API — https://docs.haystack.deepset.ai/reference/evaluators-api
41. Haystack — Tutorial: Hybrid retrieval — https://haystack.deepset.ai/tutorials/33_hybrid_retrieval
42. Haystack — Docling integration — https://haystack.deepset.ai/integrations/docling
43. Haystack — Azure AI Search integration — https://haystack.deepset.ai/integrations/azure-ai-search
44. Haystack — Snowflake integration — https://haystack.deepset.ai/integrations/snowflake
45. GitHub — deepset-ai/haystack — https://github.com/deepset-ai/haystack
46. Future AGI — What is Haystack? deepset's RAG and agents framework in 2026 — https://futureagi.com/blog/what-is-haystack-2026/

### Azure AI Search
47. Microsoft Learn — Agentic retrieval overview — https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview
48. Microsoft Learn — Integrated vectorization — https://learn.microsoft.com/en-us/azure/search/vector-search-integrated-vectorization
49. Microsoft Learn — Document Layout skill — https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-document-intelligence-layout
50. Microsoft Learn — Semantic ranking overview — https://learn.microsoft.com/en-us/azure/search/semantic-search-overview
51. Microsoft Learn — Document-level access control — https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview
52. Microsoft Learn — Query-time ACL and RBAC enforcement — https://learn.microsoft.com/en-us/azure/search/search-query-access-control-rbac-enforcement
53. Microsoft Tech Community — Purview sensitivity labels and SharePoint ACLs in Azure AI Search — https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/sensitivity-labels-preservation-and-sharepoint-acls-in-azure-ai-search/4471216
54. Microsoft Azure Blog — Azure at Microsoft Ignite 2025: all the intelligent cloud news explained — https://azure.microsoft.com/en-us/blog/azure-at-microsoft-ignite-2025-all-the-intelligent-cloud-news-explained/
55. Microsoft Azure — Azure AI Search pricing — https://azure.microsoft.com/en-us/pricing/details/search/
56. Microsoft Learn — HIPAA (Azure compliance offering) — https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-hipaa-us
57. Microsoft Q&A — HIPAA BAA coverage for Azure OpenAI and Azure AI Foundry (community) — https://learn.microsoft.com/en-us/answers/questions/5987507/hipaa-baa-coverage-for-azure-openai-and-azure-ai-f
58. Jannik Reinhard — Foundry IQ deep dive: knowledge bases for AI agents — https://jannikreinhard.com/foundry-iq-knowledge-bases/
59. GitHub — Azure-Samples/azure-search-openai-demo — https://github.com/Azure-Samples/azure-search-openai-demo
60. NTCompatible — Azure SDK May 2026 update: agentic AI Search — https://www.ntcompatible.com/story/azure-sdk-may-2026-update-rust-ga-agentic-ai-search-and-agent-server-preview
61. Meilisearch — Best Azure AI Search alternatives in 2026 (competitor-authored) — https://www.meilisearch.com/blog/azure-ai-search-alternatives
62. G2 — Azure Cognitive Search reviews (small sample; low relevance) — https://www.g2.com/products/microsoft-azure-cognitive-search/reviews

### Ref: Snowflake Cortex Search
63. Snowflake Docs — Cortex Search overview — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview
64. Snowflake Docs — Cortex Search costs — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-costs
65. Snowflake Developers — Getting started with access controls for RAGs (Cortex Search) — https://www.snowflake.com/en/developers/guides/getting-started-with-access-controls-for-cortex-search/
66. Snowflake Docs — AI_PARSE_DOCUMENT — https://docs.snowflake.com/en/sql-reference/functions/ai_parse_document
67. Snowflake Docs — Cortex AI Functions: Documents — https://docs.snowflake.com/en/user-guide/snowflake-cortex/ai-documents
68. Snowflake Docs — Apr 30, 2026: AI_PARSE_DOCUMENT increased page limit to 2,000 pages — https://docs.snowflake.com/en/release-notes/2026/other/2026-04-30-ai-parse-document-2000-pages
69. Snowflake Docs — Apr 30, 2026: AI_PARSE_DOCUMENT image extraction (GA) — https://docs.snowflake.com/en/release-notes/2026/other/2026-04-30-ai-parse-document-image-extraction-ga
70. Snowflake Docs — May 04, 2026: AI_PARSE_DOCUMENT OCR quality improvements — https://docs.snowflake.com/en/release-notes/2026/other/2026-05-04-ai-parse-document-ocr-improvements
71. Snowflake Docs — Cortex Agents — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents
72. Snowflake Docs — Aug 28, 2026: Snowflake recommends transitioning from Cortex Analyst to Cortex Agents — https://docs.snowflake.com/en/release-notes/2026/other/2026-08-28-cortex-analyst-transition-cortex-agents
73. Snowflake Docs — AI Observability with Snowflake Cortex — https://docs.snowflake.com/en/user-guide/snowflake-cortex/ai-observability
74. Snowflake Docs — Snowflake editions (Business Critical, HIPAA/BAA) — https://docs.snowflake.com/en/user-guide/intro-editions
75. Snowflake Blog — Cortex Search: state-of-the-art hybrid search for RAG — https://www.snowflake.com/en/blog/cortex-search-ai-hybrid-search/
76. Cyera — Unexpected behavior in Snowflake's Cortex AI (third-party security research) — https://www.cyera.com/blog/unexpected-behavior-in-snowflakes-cortex-ai
77. Aimpoint Digital — Foundations of RAG evaluation in Snowflake — https://www.aimpointdigital.com/blog/foundations-of-rag-evaluation-in-snowflake

### Analyst research (Gartner / Forrester / IDC)
78. Gartner — Lack of AI-ready data puts AI projects at risk (press release, Feb 2025) — https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk
79. Gartner — Gartner predicts 30% of generative AI projects will be abandoned after proof of concept by end of 2025 (press release) — https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025
80. Gartner — The latest Hype Cycle for Artificial Intelligence — https://www.gartner.com/en/articles/hype-cycle-for-artificial-intelligence
81. Gartner — Hype Cycle for Generative AI, 2025 (abstract) — https://www.gartner.com/en/documents/6719134
82. Gartner — Top trends in D&A for 2026: handling complex use cases with GraphRAG (abstract, Feb 2026) — https://www.gartner.com/en/documents/7444326
83. Gartner — Why half of GenAI projects fail — https://www.gartner.com/en/articles/genai-project-failure
84. Gartner — Magic Quadrant for AI Application Development Platforms (abstract) — https://www.gartner.com/en/documents/7188230
85. Microsoft Azure Blog — Microsoft named a Leader in Gartner Magic Quadrant for AI Application Development Platforms (vendor-authored) — https://azure.microsoft.com/en-us/blog/microsoft-named-a-leader-in-gartner-magic-quadrant-for-ai-application-development-platforms/
86. Elastic — Elastic named a Leader in The Forrester Wave: Cognitive Search Platforms, Q4 2025 (vendor-authored; context only) — https://www.elastic.co/blog/forrester-leader-cognitive-search-platforms-2025

### Comparisons, reviews & practitioner articles
87. DEV Community — LangChain vs LlamaIndex vs Haystack 2026: which to use — https://dev.to/jovan_chan_9500711396d4e6/langchain-vs-llamaindex-vs-haystack-2026-which-to-use-119d
88. Nutrient — LlamaIndex vs LangChain vs Haystack for RAG (vendor-authored; document-SDK vendor) — https://www.nutrient.io/blog/llamaindex-vs-langchain-vs-haystack/
89. Agentailor — Is LangChain worth it in 2026? — https://blog.agentailor.com/posts/is-langchain-worth-it-2026
90. Kunal Ganglani — LangChain vs LlamaIndex 2026: which to pick — https://www.kunalganglani.com/blog/langchain-vs-llamaindex-2026
91. ClickIT — LangChain 1.0 vs LangGraph 1.0: which one to use in 2026 — https://www.clickittech.com/ai/langchain-1-0-vs-langgraph-1-0/
92. PeerSpot — Compare LangChain vs LlamaIndex — https://www.peerspot.com/products/comparisons/langchain_vs_llamaindex

*Scores are research-based estimates as of September 2026, drawn from public documentation, analyst summaries and practitioner sources; they should be validated through a proof of concept on the enterprise's own documents, identities and Snowflake environment before any standardization decision.*
