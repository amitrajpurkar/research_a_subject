# AI Patterns — Capabilities & Vendor Evaluation Deck (source content)

Source content for `ai_patterns_deck.pptx`, in slide order. Sources: `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` and the vendor comparison reports listed per slide. Research date: September 2026.

**Legend:** ❄ = Snowflake offering · ★ = technology currently used in the enterprise · Ref = reference column (not ranked).

---

## Slide 1 — AI Patterns

1. **Agent Platforms** — Governed agent lifecycle, PHI guardrails, HITL for clinical and claims
2. **Agent Frameworks** — Durable, model-agnostic orchestration for multi-step prior-auth and care workflows
3. **MCP Ecosystems** — Governed tool access to EHR, FHIR, Snowflake with least privilege
4. **RAG Frameworks** — Permission-aware, cited answers over medical policies, benefits, clinical content
5. **Vector Search** — Secure embedding search for RAG, semantic search and agent memory
6. **Gateway, Observability** — AI control plane: model routing, cost control, tracing, HIPAA audit

---

## Slide 2 — Agent Platforms: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Agent Lifecycle Management | Versioning, dev/test/prod promotion, approval gates, rollback, central agent catalog | Turns pilot sprawl into a governed portfolio |
| 2 | Model Choice & Portability | Multi-provider models, per-agent selection, easy swaps, own-tenant/VPC deployment | Avoids model lock-in; protects cost and leverage |
| 3 | Enterprise & Healthcare Connectors | Permission-aware connectors: Snowflake, SharePoint, CRM, ITSM, FHIR/EHR, claims | Governed data access cuts integration effort |
| 4 | Open Interoperability (MCP/A2A) | Consume/expose MCP tools, A2A agent collaboration, OpenAPI/REST actions | Reusable tools; agents collaborate across platforms |
| 5 | Agent Identity & Least Privilege | IdP-registered agents, OAuth on-behalf-of, scoped tool permissions, vaulted secrets | Prevents PHI over-exposure; makes access auditable |
| 6 | Guardrails & HIPAA/PHI Safety | PHI redaction, prompt-injection defense, grounding checks, signed BAA, residency | Lets pilots pass privacy and compliance review |
| 7 | Human-in-the-Loop Controls | Approval steps, confidence thresholds, escalation, per-agent autonomy levels | Safe automation; humans own consequential decisions |
| 8 | Evaluation & Quality Gates | Eval datasets, LLM-as-judge, regression tests, red-teaming, CI/CD gates | Evidence-based scaling; supports model-risk governance |
| 9 | Observability & Audit Trail | Step-level traces, tokens/cost/latency, OpenTelemetry export, immutable action logs | Debug failures; prove actions for HIPAA audit |
| 10 | FinOps & Domain Isolation | Cost attribution by agent/domain, budgets, quotas, isolated domain workspaces | Keeps consumption costs sustainable; enables federated adoption |

*Source: `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` — Pattern 1*

---

## Slide 3 — Agent Platforms: Vendor Comparison (0–4 scores, each capability 10%)

| # | Capability | Copilot Studio | Microsoft Foundry Agent Service | AWS Bedrock AgentCore | Google Gemini Ent. Agent Platform | ❄ Ref: Snowflake Cortex Agents |
|---|---|---|---|---|---|---|
| 1 | Agent Lifecycle Management | 3 | 3 | 3 | 3 | 2 |
| 2 | Model Choice & Portability | 2 | 3 | 4 | 4 | 3 |
| 3 | Enterprise & Healthcare Connectors | 3 | 3 | 2 | 3 | 3 |
| 4 | Open Interoperability (MCP/A2A) | 3 | 4 | 3 | 4 | 3 |
| 5 | Agent Identity & Least Privilege | 3 | 4 | 4 | 3 | 3 |
| 6 | Guardrails & HIPAA/PHI Safety | 3 | 3 | 4 | 3 | 2 |
| 7 | Human-in-the-Loop Controls | 3 | 3 | 2 | 2 | 1 |
| 8 | Evaluation & Quality Gates | 2 | 4 | 3 | 4 | 2 |
| 9 | Observability & Audit Trail | 2 | 3 | 3 | 3 | 2 |
| 10 | FinOps & Domain Isolation | 3 | 3 | 3 | 3 | 3 |
| | **Weighted total** | **67.5%** | **82.5%** | **77.5%** | **80.0%** | **60.0%** |

**Takeaway:** Microsoft Foundry Agent Service (82.5%) is the best fit as the pro-code runtime, paired with Copilot Studio as the governed low-code front door under shared Entra Agent ID and Agent 365 governance. Google Gemini Enterprise Agent Platform (80.0%) and AWS Bedrock AgentCore (77.5%, portability and guardrail leader) are close alternatives and exception paths; the small gap means cloud alignment should decide. Key risks are unconfirmed BAA scope for Foundry Agent Service and partner models, Azure runtime lock-in, and roadmap churn across all vendors.

*Source: `OUTPUTS/ipaas/compare_agent_platform_vendors.md`*

---

## Slide 4 — Agent Frameworks: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Stateful Orchestration & Durability | Graphs/state machines, checkpoints, resume-after-failure, long runs, deterministic replay | Multi-day healthcare workflows must survive restarts |
| 2 | Model-Agnostic Abstractions | Multi-provider models, structured outputs, streaming; config-only model swaps | Protects code investment as models and pricing change |
| 3 | MCP / A2A Tool Protocols | Consume MCP servers, expose agents via MCP/A2A, typed tools | Plugs into enterprise tools without bespoke glue |
| 4 | Multi-Agent Patterns | Supervisor/worker, hand-off, hierarchical, parallel fan-out composition | Decomposes complex domains; reusable patterns cut defects |
| 5 | Memory & Context Management | Short/long-term memory, pluggable stores, summarization, PHI-aware retention | Improves quality and cost; keeps state HIPAA-compliant |
| 6 | Human-in-the-Loop Interrupts | Native interrupt/resume to pause for review, edits, continue | Enables graduated autonomy on consequential healthcare actions |
| 7 | Testing & Debuggability | Test harnesses, model/tool mocks, eval hooks, visual debugging, reproducibility | Scales many agents safely; cuts rework after upgrades |
| 8 | OpenTelemetry-Native Tracing | GenAI-convention OTel spans exportable to any backend | Portable, unified observability; no per-team monitoring silo |
| 9 | Deployment Portability & Security | Containers/K8s/serverless anywhere; sandboxed execution; vaulted secrets; supply-chain hygiene | Runs near sensitive data; passes security review |
| 10 | Ecosystem Maturity & LTS | Community, license, backing, release cadence, stable APIs, commercial support | Avoids costly rewrites from churn or abandonment |

*Source: `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` — Pattern 2*

---

## Slide 5 — Agent Frameworks: Vendor Comparison (0–4 scores, each capability 10%)

| # | Capability | Microsoft AutoGen | Semantic Kernel | LangGraph | CrewAI | LlamaIndex Agents |
|---|---|---|---|---|---|---|
| 1 | Stateful Orchestration & Durability | 2 | 2 | 4 | 2 | 2 |
| 2 | Model-Agnostic Abstractions | 3 | 3 | 3 | 3 | 3 |
| 3 | MCP / A2A Tool Protocols | 2 | 2 | 3 | 3 | 3 |
| 4 | Multi-Agent Patterns | 3 | 2 | 4 | 3 | 2 |
| 5 | Memory & Context Management | 2 | 3 | 3 | 2 | 3 |
| 6 | Human-in-the-Loop Interrupts | 2 | 2 | 4 | 3 | 3 |
| 7 | Testing & Debuggability | 2 | 2 | 4 | 2 | 2 |
| 8 | OpenTelemetry-Native Tracing | 3 | 3 | 2 | 2 | 3 |
| 9 | Deployment Portability & Security | 2 | 2 | 3 | 3 | 2 |
| 10 | Ecosystem Maturity & LTS | 1 | 2 | 4 | 3 | 2 |
| | **Weighted total** | **55.0%** | **57.5%** | **85.0%** | **65.0%** | **62.5%** |

*Note: Snowflake is the governed data and context layer rather than an agent framework: agents should reach PHI via Cortex Agents, Cortex Search and Cortex Analyst (as MCP tools or through langchain-snowflake), with checkpoints, traces and eval results landing in Snowflake.*

**Takeaway:** LangGraph is the best fit (85.0%), leading on durable checkpointed state, native interrupt/resume for human approval, debug/eval tooling and a stable 1.x API, and should be the primary standard. CrewAI (65.0%) is a sanctioned exception for low-risk role-based automation, LlamaIndex is used as a document/retrieval component, and Microsoft Agent Framework replaces Semantic Kernel and AutoGen (neither should be chosen for new work) as the .NET path. Key risk: LangGraph tracing is LangSmith-first, so the standard must mandate OTel export and secure BAA or self-hosted LangSmith.

*Source: `OUTPUTS/ipaas/compare_agent_framework_vendors.md`*

---

## Slide 6 — MCP Ecosystems: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Spec Compliance & Currency | Current MCP spec, streamable HTTP, OAuth 2.1 auth, fast spec updates | Stale implementations break interoperability and security |
| 2 | Enterprise Registry & Discovery | Private curated registry: owner, version, data class, scopes, lifecycle | Prevents shadow MCP; one inventory of PHI tools |
| 3 | Delegated Auth & Scopes | IdP OAuth, on-behalf-of tokens, per-tool scopes, no static keys | Agent access matches user entitlements for PHI, audit |
| 4 | Central Gateway & Policy | Gateway enforcing allow/deny lists, parameter validation, rate limits, DLP | One control point for all agent-to-tool traffic |
| 5 | MCP Threat Protection | Defenses for tool poisoning, prompt injection, rug-pull, confused deputy | One compromised tool can exfiltrate PHI |
| 6 | Healthcare & Enterprise Servers | Supported servers for Snowflake, FHIR/EHR, claims, ServiceNow, M365, CRM | Removes custom connector work; reveals build gaps |
| 7 | Hosting Flexibility | Kubernetes, serverless, managed or on-prem hosting; controlled local servers | Portability, data residency, tools near on-prem EHR |
| 8 | Tool-Call Observability & Audit | Per-call logs with PHI masking, OpenTelemetry export, tamper-evident retention | Chain of custody for HIPAA audits, investigations |
| 9 | Server Dev Lifecycle | SDKs, templates, contract tests, CI/CD, versioning, OpenAPI-to-MCP wrapping | Turns existing APIs into governed tools repeatably |
| 10 | FinOps & Usage Analytics | Per-tool/agent metering, quotas, downstream cost attribution, adoption dashboards | Controls hidden downstream costs; shows value by domain |

*Source: `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` — Pattern 3*

---

## Slide 7 — MCP Ecosystems: Vendor Comparison (0–4 scores, each capability 10%)

| # | Capability | Custom MCP Servers | GitHub MCP Server | Microsoft MCP | AWS Bedrock AgentCore | ❄ Ref: Snowflake-managed MCP |
|---|---|---|---|---|---|---|
| 1 | Spec Compliance & Currency | 4 | 3 | 3 | 4 | 2 |
| 2 | Enterprise Registry & Discovery | 2 | 2 | 3 | 3 | 2 |
| 3 | Delegated Auth & Scopes | 2 | 3 | 3 | 3 | 3 |
| 4 | Central Gateway & Policy | 1 | 2 | 3 | 4 | 2 |
| 5 | MCP Threat Protection | 1 | 2 | 2 | 3 | 2 |
| 6 | Healthcare & Enterprise Servers | 1 | 1 | 3 | 2 | 3 |
| 7 | Hosting Flexibility | 4 | 3 | 3 | 2 | 2 |
| 8 | Tool-Call Observability & Audit | 1 | 1 | 3 | 3 | 2 |
| 9 | Server Dev Lifecycle | 3 | 1 | 3 | 3 | 2 |
| 10 | FinOps & Usage Analytics | 1 | 1 | 3 | 3 | 3 |
| | **Weighted total** | **50.0%** | **47.5%** | **72.5%** | **75.0%** | **57.5%** |

**Takeaway:** Best fit is a cloud MCP gateway ecosystem, with AWS Bedrock AgentCore (75.0%) and Microsoft (72.5%) effectively tied; pick the one matching the primary hyperscaler and identity estate. Custom MCP Servers are the build standard for FHIR/claims domain servers and GitHub MCP Server is a sanctioned SDLC server, but both must sit behind the gateway and private registry. Key risks are shadow MCP, PHI leakage through tool responses (APIM cannot inspect streaming bodies) and MCP-specific threats like tool poisoning.

*Source: `OUTPUTS/ipaas/compare_mcp_vendors.md`*

---

## Slide 8 — RAG Frameworks: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Document Ingestion & Parsing | Layout-aware parsing of PDFs, scans/OCR, tables, forms, C-CDA | Parsing quality caps retrieval quality |
| 2 | Chunking & Embedding Flexibility | Semantic/hierarchical chunking, metadata enrichment, pluggable embedding models | Tune per content type; avoid embedding lock-in |
| 3 | Hybrid Retrieval & Re-Ranking | BM25 plus vector, metadata filters, re-rankers, query rewriting | Exact codes and dates need keyword precision |
| 4 | Permission-Aware Retrieval | Source ACL trimming, identity propagation, PHI-aware filters, permission sync | Never surface records users cannot see |
| 5 | Grounding & Citations | Passage-level citations, faithfulness checks, confidence, safe refusal | Verifiable answers build clinician trust |
| 6 | RAG Evaluation | Context precision/recall, faithfulness metrics, golden sets, A/B tests | Measured quality justifies scale-up, catches regressions |
| 7 | Freshness & Incremental Indexing | Change-driven re-index, delete propagation, effective-dated versions, SLAs | Stale policy answers create compliance risk |
| 8 | Advanced / Agentic Retrieval | Agentic multi-step, text-to-SQL, GraphRAG, multimodal retrieval | Questions span documents and structured data |
| 9 | Portability & Platform Proximity | Model/store agnostic; in-platform retrieval like Snowflake Cortex Search | Keeps PHI governed and avoids lock-in |
| 10 | Cost & Performance Efficiency | Embedding/index cost controls, caching, token efficiency, latency SLAs | Keeps enterprise-wide rollout economical |

*Source: `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` — Pattern 4*

---

## Slide 9 — RAG Frameworks: Vendor Comparison (0–4 scores, each capability 10%)

| # | Capability | LangChain | LlamaIndex | Semantic Kernel | Haystack | Azure AI Search | ❄ Ref: Snowflake Cortex Search |
|---|---|---|---|---|---|---|---|
| 1 | Document Ingestion & Parsing | 2 | 4 | 1 | 3 | 3 | 3 |
| 2 | Chunking & Embedding Flexibility | 3 | 3 | 2 | 3 | 3 | 2 |
| 3 | Hybrid Retrieval & Re-Ranking | 3 | 3 | 2 | 3 | 4 | 3 |
| 4 | Permission-Aware Retrieval | 1 | 2 | 1 | 1 | 3 | 2 |
| 5 | Grounding & Citations | 2 | 3 | 2 | 2 | 3 | 2 |
| 6 | RAG Evaluation | 3 | 2 | 1 | 3 | 2 | 3 |
| 7 | Freshness & Incremental Indexing | 2 | 2 | 1 | 2 | 3 | 3 |
| 8 | Advanced / Agentic Retrieval | 4 | 3 | 2 | 3 | 3 | 3 |
| 9 | Portability & Platform Proximity | 4 | 3 | 3 | 4 | 1 | 3 |
| 10 | Cost & Performance Efficiency | 2 | 3 | 2 | 3 | 2 | 3 |
| | **Weighted total** | **65.0%** | **70.0%** | **42.5%** | **67.5%** | **67.5%** | **67.5%** |

**Takeaway:** LlamaIndex (70.0%) is the best-fit RAG framework standard thanks to its best-in-class parsing of table-heavy and scanned healthcare documents, with Snowflake Cortex Search recommended as the default governed retrieval index for PHI content. Haystack (alternative framework for sovereign/on-prem use) and Azure AI Search (exception path for SharePoint-centric, permission-critical corpora) tie at 67.5%, while LangChain/LangGraph serves as the agent-orchestration layer and Semantic Kernel should not be a new standard. Key risk: permission-aware retrieval is weak across most frameworks, and Azure AI Search copies PHI out of Snowflake and relies on Preview ACL features.

*Source: `OUTPUTS/ipaas/compare_rag_vendors.md`*

---

## Slide 10 — Vector Search: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Performance & Scale | Proven ANN recall/latency at 100M–1B+ vectors, high QPS, scaling | Large indexes drive user experience and infrastructure cost |
| 2 | Hybrid Search & Filtering | Vector plus BM25/sparse fusion; metadata filtering without recall collapse | Exact identifiers and filters make results accurate, compliant |
| 3 | Security & HIPAA Readiness | RBAC, doc-level security, CMK encryption, private networking, audit, BAA | Embeddings and chunks can reveal PHI |
| 4 | Deployment Portability | Managed SaaS, BYOC, self-hosted/on-prem, and in-platform vector options | Avoids lock-in; in-platform search removes separate systems |
| 5 | Multi-Tenancy & Isolation | Per-tenant isolation, quotas, noisy-neighbor protection, per-tenant backup/restore | Enables federated domain adoption on a shared service |
| 6 | Index Types & Compression | HNSW/IVF/DiskANN, quantization, tiered storage, sparse/multi-vector support | Compression and tiering cut memory cost at scale |
| 7 | Real-Time Updates & Deletes | Low-latency upserts/deletes, consistency, streaming/CDC ingest, re-embedding | Freshness and right-to-delete need immediate, reliable deletes |
| 8 | Embedding & Ecosystem Integration | Built-in embeddings, SDKs, LangChain/LlamaIndex, MCP, Snowflake/Kafka integrations | Less glue code, faster delivery across domains |
| 9 | Reliability, HA/DR | Replication, multi-AZ/region, backups/PITR, zero-downtime upgrades, SLAs, observability | Vector search becomes tier-1 clinical infrastructure |
| 10 | FinOps & Pricing | Clear pricing, per-index/tenant cost attribution, scale-to-zero, forecasting | Supports chargeback and avoids budget surprises |

*Source: `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` — Pattern 5*

---

## Slide 11 — Vector Search: Vendor Comparison (0–4 scores, each capability 10%)

| # | Capability | Azure AI Search | Elasticsearch | Amazon OpenSearch | Pinecone | Weaviate | Qdrant | ❄ Ref: Snowflake Cortex Search / VECTOR |
|---|---|---|---|---|---|---|---|---|
| 1 | Performance & Scale | 3 | 4 | 4 | 4 | 3 | 4 | 2 |
| 2 | Hybrid Search & Filtering | 4 | 4 | 3 | 3 | 4 | 4 | 3 |
| 3 | Security & HIPAA Readiness | 4 | 3 | 4 | 3 | 3 | 3 | 3 |
| 4 | Deployment Portability | 1 | 4 | 3 | 2 | 4 | 4 | 2 |
| 5 | Multi-Tenancy & Isolation | 2 | 2 | 3 | 3 | 4 | 4 | 3 |
| 6 | Index Types & Compression | 3 | 4 | 4 | 2 | 4 | 4 | 1 |
| 7 | Real-Time Updates & Deletes | 3 | 3 | 3 | 3 | 3 | 3 | 2 |
| 8 | Embedding & Ecosystem Integration | 4 | 4 | 3 | 4 | 3 | 3 | 3 |
| 9 | Reliability, HA/DR | 2 | 4 | 3 | 3 | 3 | 3 | 2 |
| 10 | FinOps & Pricing | 2 | 2 | 3 | 3 | 3 | 3 | 3 |
| | **Weighted total** | **70.0%** | **85.0%** | **82.5%** | **75.0%** | **85.0%** | **87.5%** | **60.0%** |

**Takeaway:** Qdrant (87.5%) is the best fit as the portable enterprise vector standard, with Elasticsearch (85.0%) as co-leader where hybrid lexical search and query-time document-level security matter most; the Tier 1 choice between them should be settled by PoC. Amazon OpenSearch and Azure AI Search remain sanctioned exceptions for AWS-native Bedrock and M365/SharePoint RAG, Weaviate fits heavily multi-tenant use but has limited HIPAA scope, and Pinecone carries the highest lock-in and corporate uncertainty. Snowflake Cortex Search should be the Tier 0 default for Snowflake-resident corpora; the key risks are PHI leakage without query-time trimming and lock-in, mitigated by keeping chunks and embeddings in Snowflake as the system of record.

*Source: `OUTPUTS/ipaas/compare_vector_search_vendors.md`*

---

## Slide 12 — Gateway, Observability: Top 10 Capabilities

| # | Capability | What to look for | Why it matters |
|---|---|---|---|
| 1 | Multi-Model Routing & Failover | One API, policy-based routing, fallback, load balancing, version pinning | Decouples apps from providers; resilience and cost savings |
| 2 | PHI Guardrails & Content Safety | Inline PHI/PII redaction, prompt-injection detection, output moderation | One enforceable HIPAA control point for AI traffic |
| 3 | Identity, Access & Quotas | SSO, virtual keys per team, model allowlists, rate/token limits | Stops unmanaged AI use; controls PHI-eligible models |
| 4 | Cost Attribution & Budgets | Real-time token/cost by app/team/domain, budgets, alerts, chargeback | Essential for FinOps and domain ROI |
| 5 | Semantic & Response Caching | Exact and semantic caching, PHI-safe scoping, hit analytics | Cuts latency and cost without cross-user PHI leakage |
| 6 | End-to-End OTel Tracing | Traces across LLM, retrieval, tool/MCP, agent hops; OTel GenAI | One view to debug agent and RAG flows |
| 7 | Evaluation & Quality Monitoring | Automated evaluators, human feedback, drift and regression detection | Proves production quality holds; catches degradation early |
| 8 | Audit Logging & Retention | Immutable prompt/response logs, PHI masking, retention, SIEM/Snowflake export | Supports HIPAA audit, incident response, AI regulation |
| 9 | Agent & MCP Traffic Governance | MCP/A2A policy, tool allowlists, anomaly detection, runaway-cost protection | Governs chains of agent actions, not just calls |
| 10 | Deployment Portability & Overhead | Self-host/BYOC, open-source core, HA, minimal added latency | In every request path; must keep PHI in-perimeter |

*Source: `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` — Pattern 6*

---

## Slide 13 — Gateway, Observability: Vendor Comparison (0–4 scores, each capability 10%)

| # | Capability | Azure (APIM + Foundry) | Amazon Bedrock | Kong AI Gateway | LangSmith | Arize (AX + Phoenix) | Fiddler AI | ❄ Ref: Snowflake Cortex AI |
|---|---|---|---|---|---|---|---|---|
| 1 | Multi-Model Routing & Failover | 3 | 2 | 4 | 1 | 0 | 0 | 2 |
| 2 | PHI Guardrails & Content Safety | 3 | 3 | 3 | 1 | 1 | 4 | 2 |
| 3 | Identity, Access & Quotas | 4 | 3 | 4 | 2 | 1 | 1 | 3 |
| 4 | Cost Attribution & Budgets | 3 | 3 | 3 | 3 | 2 | 1 | 3 |
| 5 | Semantic & Response Caching | 3 | 1 | 3 | 0 | 0 | 0 | 0 |
| 6 | End-to-End OTel Tracing | 3 | 3 | 2 | 4 | 4 | 3 | 2 |
| 7 | Evaluation & Quality Monitoring | 3 | 3 | 1 | 4 | 4 | 3 | 2 |
| 8 | Audit Logging & Retention | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 9 | Agent & MCP Traffic Governance | 3 | 3 | 4 | 2 | 2 | 2 | 1 |
| 10 | Deployment Portability & Overhead | 2 | 1 | 4 | 3 | 3 | 3 | 2 |
| | **Weighted total** | **75.0%** | **62.5%** | **77.5%** | **55.0%** | **47.5%** | **50.0%** | **50.0%** |

**Takeaway:** Best fit is Kong AI Gateway (#1, 77.5%) as the neutral, self-hosted control point for all model, MCP and A2A traffic, paired with Arize AX + Phoenix for tracing and evaluation (combined 90%), with Snowflake as the audit and analytics sink. Azure APIM + Foundry (#2, 75%) is the strongest single-suite exception path for Azure workloads, Bedrock should be consumed through Kong, LangSmith is the alternative observability choice, and Fiddler is the named PHI-guardrail add-on. Key risk is PHI redaction efficacy and unverified BAA terms for Kong and Arize, which the PoC must confirm.

*Source: `OUTPUTS/ipaas/compare_ai_gateway_obs_vendors.md`*

---

## Slide 14 — Where Snowflake Fits (medallion lakehouse)

Context: Snowflake is the enterprise data platform (Bronze → Silver → Gold). Goal: maximize the platform and minimize point/niche vendors.

| Pattern | Snowflake fit | Medallion layer | Snowflake-native capability | Gap → complement (reuse first) |
|---|---|---|---|---|
| Agent Platforms | **Partial** | Gold / Consumption | Cortex Agents orchestrate Cortex Analyst (semantic views) and Cortex Search over governed Gold data. Snowflake Intelligence (GA) is the business UI. RBAC, masking and row policies are inherited, Agent Identity is GA, and evaluations and OTel traces are stored in AI_OBSERVABILITY_EVENTS. | Covers data agents only: no HITL, no A2A, no PHI guardrails. Complement: one agent platform on the primary cloud (Foundry + Copilot Studio on the existing Entra/M365 estate), which calls Cortex Agents through MCP. |
| Agent Frameworks | **Gap** | Consumption | Snowflake is not an orchestration framework. It supplies governed tools through langchain-snowflake (SnowflakeCortexAgent) and Cortex Search/Analyst as MCP tools. It can hold checkpoints, traces and TruLens evaluation results with enterprise retention policies. | Standardize on open-source LangGraph (no vendor contract), with Microsoft Agent Framework for .NET. Use LangSmith only self-hosted or under a BAA. Otherwise send OTel to the chosen observability tool. |
| MCP Ecosystems | **Partial** | Gold / Consumption | The GA Snowflake-managed MCP server exposes Cortex Agents, Analyst, Search, SQL and UDF/procedure tools under RBAC, masking, row policies and Entra/Okta OAuth. Native Apps (GA) package and distribute governed MCP servers. | No enterprise gateway or registry for non-Snowflake servers. Tools only, one spec revision behind. Complement: reuse the Pattern 6 gateway (Kong, or APIM + API Center / AgentCore Gateway) instead of adding an MCP-only vendor. |
| RAG Frameworks | **Strong** | Silver → Gold | AI_PARSE_DOCUMENT (OCR/LAYOUT, 2,000 pages) and AI_EXTRACT parse into Silver. SPLIT_TEXT chunking and Cortex Search hybrid retrieval with incremental TARGET_LAG refresh run on Gold. Cortex Agents combine Search with Analyst. TruLens RAG-triad evaluation is built in. | Owner's-rights permission trimming, a limited embedding catalog, and SharePoint/ECM content must be landed first. Complement: open-source LlamaIndex for complex parsing. Azure AI Search only for permission-critical SharePoint corpora. |
| Vector Search | **Partial** | Gold | Cortex Search does managed hybrid vector + keyword + rerank (up to 400M rows per service). The native VECTOR type supports similarity functions, with Arctic/Voyage embeddings via EMBED_TEXT. Chunks and embeddings stay in Snowflake as the system of record under the BAA. | Default 20 QPS per service, no index or quantization control, minute-level lag, owner's rights. Complement: one portable Tier 1 engine (prefer Elasticsearch if already run; otherwise Qdrant), only where the PoC shows the ceilings are hit. |
| Gateway, Observability | **Partial** | All layers (audit sink) / Consumption | Cortex AI Observability (TruLens traces and evaluations), Cortex AI Guardrails, AI_REDACT, Cortex usage-history views and budgets. Horizon-governed tables serve as the long-term audit, retention and chargeback sink for all AI telemetry. | No cross-platform model/MCP/A2A gateway, semantic cache or clinical PHI guardrails. Complement: Kong AI Gateway plus Arize (Phoenix OSS first), both streaming telemetry into Snowflake. |

---

## Slide 15 — Consolidation Guidance with Snowflake

No current enterprise technologies were listed for this family.

- Snowflake covers RAG natively (Strong): AI_PARSE_DOCUMENT/AI_EXTRACT feed Silver, Cortex Search indexes Gold, and Cortex Agents combine documents with claims data via Analyst. Make it the default governed retrieval path for PHI.
- Make Snowflake the Tier 0 vector store and the system of record for chunks and embeddings. Any Tier 1 engine is a rebuildable derived index, which limits lock-in and vendor count.
- Expose all governed data to agents only through Snowflake-managed MCP servers and Cortex Agents, so every agent platform and framework inherits RBAC, masking and row policies instead of querying data directly.
- Buy one vendor per remaining gap: a single gateway that serves both model and MCP traffic, a single agent platform aligned to the primary cloud, and a single observability tool. LangGraph is open source and needs no contract.
- Land all AI telemetry, costs and evaluation results in Snowflake (Snowpipe Streaming) so audit, retention and domain chargeback use existing Horizon governance and credit FinOps instead of a separate analytics tool.

**Engage — genuine net-new needs:**
- One AI gateway / control plane (Kong AI Gateway, or Azure APIM + API Center if Azure-first) that also acts as the MCP/A2A gateway and private registry: one vendor covers Patterns 3 and 6.
- One general-purpose agent platform matched to the primary hyperscaler (Microsoft Foundry Agent Service + Copilot Studio on the existing Entra/M365 estate), used for HITL, A2A and non-data agents, with Cortex Agents as the governed data agent behind it via MCP.
- One trace/evaluation vendor under a BAA: Arize AX with Phoenix OSS first, or self-hosted LangSmith if LangGraph dominates. Pick one, not both, and export all traces to Snowflake.
- Conditional: one Tier 1 vector engine (Elasticsearch if already licensed for logs/SIEM, otherwise Qdrant), only if the PoC shows Cortex Search QPS, scale or document-level trimming limits are hit.

**Avoid / defer — already covered:**
- Pinecone, Weaviate and per-pilot vector databases: Cortex Search and the native VECTOR type cover Tier 0 retrieval inside the lakehouse with no data copy and no new BAA.
- Separate commercial RAG platforms, and Azure AI Search as a default index: Cortex Search + AI_PARSE_DOCUMENT/AI_EXTRACT cover governed RAG. LlamaIndex/Haystack are used as open-source libraries, not contracts.
- Paid framework platforms (CrewAI Enterprise/Factory, LlamaAgents) and AutoGen/Semantic Kernel for new work: LangGraph OSS is the standard, with Microsoft Agent Framework only as the .NET path.
- Stand-alone MCP gateway vendors, and Fiddler as a separate purchase: defer until the PoC shows the chosen gateway's PII sanitizer plus cloud guardrails (Bedrock Guardrails, AI_REDACT) fall short on PHI recall.
