## AI Patterns — Top 10 Capabilities & Scoring Templates

 1. Agent Platforms
 2. Agent Frameworks
 3. MCP Ecosystems
 4. RAG Frameworks
 5. Vector Search
 6. Gateway, Observability
<br/><br/>

**Context:** This file is for a large healthcare enterprise that has run many AI proofs-of-concept and pilots and now wants to **standardize and scale**. Every capability and template is weighted toward the Enterprise Architecture team's high-value criteria:
- enterprise adaptability
- portability (cloud vendors vs on-premise)
- operational cost
- complexity
- functional completeness across domains
- value-realization potential

The enterprise has also adopted **Snowflake** as its data platform (medallion lakehouse). Snowflake-native AI services are therefore listed as candidates wherever relevant.

**Structure for each pattern** (mirrors `data_integration_patterns.md`):
- **Part 1** — Top 10 capabilities (*What to look for* / *Why it matters*)
- **Part 2** — Strategic pillar weighting model (totals 100%)
- **Part 3** — Feature scoring template (0–4 scale)
- **Part 4** — Qualitative architecture risk and fit assessment
- **Candidate solutions to score** — illustrative, not exhaustive. Verify product names and status at evaluation time, because this market changes quarterly.

**Scoring scale used by every template:**
```console
0 = Not Supported / Non-Existent
1 = Basic / Custom Scripting Required
2 = Out-of-the-Box / Configurable
3 = Advanced / Native Cloud Integration
4 = Fully Automated / AI-Driven Market Leader
```
Weighted score = Score × Weight. Total = sum of weighted scores (maximum 4.0). Normalized % = Total ÷ 4.0.

---

### Pattern 1: Agent Platforms

*Scope:* managed, enterprise-grade platforms to **build, deploy, govern and run AI agents at scale**. These are the "agent operating environment" where business and IT teams create agents that reason, call tools and act across enterprise systems.

#### Part 1: Top 10 Features & Capabilities for Enterprise Agent Platforms

1. Agent Lifecycle Management (Build → Test → Deploy → Retire)<br/>*What to look for:* A governed lifecycle for agents. That means versioning, environment promotion (dev/test/prod), approval gates, rollback, and a central agent inventory or catalog showing owner, purpose, data access and risk tier.<br/>*Why it matters:* Pilots create "agent sprawl." A single registry with lifecycle controls is what turns dozens of POCs into a governed, supportable portfolio, and it lets the enterprise retire duplicate or failed agents.
2. Model Choice & Portability (Model-Agnostic Runtime)<br/>*What to look for:* Support for multiple frontier and open-weight models across providers, with per-agent model selection, easy model swaps, and deployment options in your own cloud tenant/VPC or on-premise.<br/>*Why it matters:* Models change fast. Avoiding lock-in to one model vendor or cloud protects cost and negotiating leverage, and lets clinical, financial and operational use cases each use the best-fit model.
3. Enterprise Grounding & Healthcare Data Connectors<br/>*What to look for:* Native, permission-aware connectors to enterprise knowledge and systems of record. Examples: Snowflake, SharePoint/Confluence, CRM, ITSM, and healthcare sources such as FHIR APIs, EHR data extracts, claims and care-management platforms.<br/>*Why it matters:* An agent is only as useful as the data it can safely reach. Pre-built, governed connectors cut integration effort and speed up value realization across domains.
4. Open Tool & Agent Interoperability (MCP, A2A, OpenAPI)<br/>*What to look for:* First-class support for the **Model Context Protocol (MCP)** to consume and expose tools, **Agent-to-Agent (A2A)** or equivalent protocols for cross-platform agent collaboration, and OpenAPI/REST actions.<br/>*Why it matters:* Open protocols stop each platform from becoming a closed island. Tools built once can be reused by any agent, and agents on different platforms (e.g., CRM vs ITSM vs data platform) can work together.
5. Agent Identity, Delegated Authorization & Least Privilege<br/>*What to look for:* Agents treated as first-class identities in the enterprise IdP (e.g., Entra ID, Okta). "On-behalf-of" user delegation (OAuth), scoped per-tool permissions, secrets vaulting, and inheritance of source-system row/column security.<br/>*Why it matters:* In healthcare, an agent must never see or do more than the user it serves. Strong identity controls prevent PHI over-exposure and unauthorized actions, and they make access auditable.
6. Responsible-AI Guardrails & HIPAA/PHI Safety<br/>*What to look for:* Configurable input/output guardrails: PHI/PII detection and redaction, prompt-injection and jailbreak defense, topic and grounding checks, toxicity filters. Also a signed **BAA**, data-residency controls, and no training on customer data.<br/>*Why it matters:* Guardrails are what let a pilot pass privacy, security and compliance review for production. They reduce regulatory, clinical-safety and reputational risk.
7. Human-in-the-Loop Controls & Workflow Approvals<br/>*What to look for:* Built-in approval steps, confidence thresholds and escalation to humans for high-impact actions (e.g., prior-authorization decisions, member communications, claim adjustments). Configurable autonomy levels per agent.<br/>*Why it matters:* Healthcare needs graduated autonomy. HITL controls allow safe automation of low-risk steps while keeping clinicians and staff accountable for consequential decisions.
8. Evaluation, Testing & Quality Gates<br/>*What to look for:* Offline evaluation datasets, LLM-as-judge and rubric scoring, regression testing on model or prompt changes, red-teaming, and quality gates wired into CI/CD before promotion.<br/>*Why it matters:* Without systematic evaluation, scaling from pilot to production is guesswork. Evaluation evidence also gives the business measurable value and helps satisfy model-risk governance.
9. End-to-End Observability, Tracing & Audit Trail<br/>*What to look for:* Step-level traces of reasoning, tool calls, retrieved context, tokens, latency and cost, with **OpenTelemetry** export to enterprise monitoring. Also immutable audit logs of every action taken on behalf of a user.<br/>*Why it matters:* Operations teams need to debug failures and prove what an agent did and why. This is a core requirement for HIPAA audit, incident response and continuous improvement.
10. FinOps, Usage Metering & Multi-Tenant Domain Isolation<br/>*What to look for:* Cost attribution by agent, domain and department, budgets and quotas, model-cost optimization (routing, caching), and workspace-level isolation so Clinical, Claims, Member and Corporate domains can build independently under central guardrails.<br/>*Why it matters:* Agent costs are driven by consumption and can grow quickly at scale. Chargeback plus domain isolation makes the platform financially sustainable and supports federated adoption.

#### Part 2: Strategic Pillar Weighting Model for Agent Platforms

| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |
| --- | --- | --- |
| Governance, Security & PHI Compliance | 20% | Agent identity, guardrails, HIPAA/BAA, auditability of autonomous actions. |
| Enterprise Adaptability & Interoperability | 20% | MCP/A2A openness, connectors to EHR/claims/Snowflake, reuse across domains. |
| Portability (Model & Cloud) | 15% | Model-agnostic runtime; deployable across clouds / VPC; avoid lock-in. |
| Value-Realization Potential | 15% | Time from pilot to production; measurable business outcomes. |
| Complexity & Tech Rationalization | 15% | Consolidating fragmented pilot tooling into one governed platform. |
| Operational Costs & FinOps | 15% | Predictable consumption cost; chargeback by domain. |

#### Part 3: Agent Platform Feature Scoring Template (0 to 4 Scale)

| # | Agent Platform Feature / Capability | Description & Evaluation Focus | Weight | Vendor A Score | Vendor A Weighted | Vendor B Score | Vendor B Weighted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Agent Lifecycle Management | Versioning, dev/test/prod promotion, approvals, central agent catalog. | 10% |  |  |  |  |
| 2 | Model Choice & Portability | Multi-model, model swap, deploy in own tenant/VPC or on-prem. | 10% |  |  |  |  |
| 3 | Enterprise & Healthcare Connectors | Permission-aware connectors to Snowflake, FHIR/EHR, claims, CRM, ITSM. | 10% |  |  |  |  |
| 4 | Open Interoperability (MCP / A2A) | Consume/expose MCP tools; agent-to-agent collaboration; OpenAPI actions. | 10% |  |  |  |  |
| 5 | Agent Identity & Least Privilege | IdP-registered agents, on-behalf-of auth, scoped tool permissions. | 10% |  |  |  |  |
| 6 | Guardrails & HIPAA/PHI Safety | PHI redaction, prompt-injection defense, grounding checks, BAA. | 10% |  |  |  |  |
| 7 | Human-in-the-Loop Controls | Approval steps, autonomy levels, escalation for high-impact actions. | 10% |  |  |  |  |
| 8 | Evaluation & Quality Gates | Eval datasets, LLM-as-judge, regression tests, red-teaming in CI/CD. | 10% |  |  |  |  |
| 9 | Observability & Audit Trail | Step-level tracing, OpenTelemetry export, immutable action logs. | 10% |  |  |  |  |
| 10 | FinOps & Domain Isolation | Cost attribution, budgets/quotas, isolated domain workspaces. | 10% |  |  |  |  |
| TOTALS | Sum of (Score × Weight) normalized to 100% |  | 100% |  | [Total A] |  | [Total B] |

#### Part 4: Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Vendor A Status | Vendor B Status |
| --- | --- | --- | --- |
| Pilot Consolidation | Can this platform absorb the agents built across current POCs/pilots? | (e.g., Medium Risk) | (e.g., Low Risk) |
| Lock-in Risk | If we change model provider or cloud, can agents, tools and prompts move? | (e.g., High) | (e.g., Low) |
| Data Gravity Fit | Can agents act on Snowflake-governed data without copying PHI out? | (e.g., Pass) | (e.g., Pass) |
| Autonomy Risk | Are high-impact actions reliably gated by humans and audited? | (e.g., Pass) | (e.g., Fail) |

**Candidate solutions to score (illustrative):**
- Microsoft Copilot Studio / Azure AI Foundry Agent Service
- AWS Bedrock AgentCore
- Google Gemini Enterprise / Vertex AI Agent Builder
- Salesforce Agentforce
- ServiceNow AI Agents
- Databricks Agent Bricks
- **Snowflake Cortex Agents** (enterprise data platform)

---

### Pattern 2: Agent Frameworks

*Scope:* **code-first SDKs and libraries** that engineering teams use to build agent logic: orchestration graphs, tool use, memory, and multi-agent coordination. These are often deployed onto an agent platform or container runtime.

#### Part 1: Top 10 Features & Capabilities for Enterprise Agent Frameworks

1. Stateful Orchestration & Durable Execution<br/>*What to look for:* Explicit control flow (graphs or state machines), persistent checkpoints, resume-after-failure, long-running workflows, and deterministic replay of agent runs.<br/>*Why it matters:* Healthcare workflows such as prior authorization, care-gap outreach and appeals can take hours or days and must survive restarts. Durable, inspectable state is the difference between a demo and a production system.
2. Model-Agnostic Abstractions<br/>*What to look for:* Clean provider abstraction supporting major commercial and open-weight models, structured outputs, and streaming. Model changes should need configuration, not code rewrites.<br/>*Why it matters:* Protects the code investment as models and pricing change, and supports the portability pillar across clouds and on-prem inference.
3. Native Tool Calling with MCP & A2A Support<br/>*What to look for:* Built-in support for consuming MCP servers and exposing agents as MCP/A2A endpoints, typed tool schemas, parallel tool calls, and error handling and retries around tools.<br/>*Why it matters:* Standard protocols let framework-built agents plug into the enterprise tool ecosystem and other platforms without bespoke glue code.
4. Multi-Agent Patterns & Composition<br/>*What to look for:* First-class supervisor/worker, hand-off, hierarchical and parallel ("fan-out") patterns, with shared or isolated context between agents.<br/>*Why it matters:* Complex domains such as utilization management and revenue cycle are best decomposed into specialized agents. Reusable patterns reduce design complexity and defects.
5. Memory & Context Management<br/>*What to look for:* Short-term (thread) and long-term (cross-session) memory with pluggable stores (e.g., Postgres, Redis, vector stores, Snowflake), context-window management, summarization, and PHI-aware retention and purge policies.<br/>*Why it matters:* Good memory design improves answer quality and cost. PHI-aware retention keeps stored conversation state HIPAA-compliant.
6. Human-in-the-Loop Interrupts & Approvals<br/>*What to look for:* Native interrupt/resume primitives so a workflow can pause for human review, accept edits, and continue from the same state.<br/>*Why it matters:* Required for graduated autonomy on consequential healthcare actions, without writing custom state-handling code.
7. Testing, Evaluation & Debuggability<br/>*What to look for:* Unit/integration test harnesses, mocking of models and tools, eval hooks, local visual debugging of runs, and reproducible runs for regression.<br/>*Why it matters:* Engineering discipline (automated tests, CI gates) is how teams scale many agents safely and cut rework after model upgrades.
8. OpenTelemetry-Native Tracing<br/>*What to look for:* Built-in OTel spans using GenAI semantic conventions for model calls, tool calls and agent steps, exportable to any backend (Datadog, Grafana, Langfuse and others) without vendor-specific agents.<br/>*Why it matters:* Keeps observability portable and unified across frameworks, avoiding a separate monitoring silo for each team's stack.
9. Deployment Portability & Runtime Security<br/>*What to look for:* Runs as standard containers on Kubernetes, serverless or managed agent runtimes on any cloud or on-prem. Sandboxed code execution, secret injection from vaults, and dependency supply-chain hygiene.<br/>*Why it matters:* Lets agents run close to sensitive data (including on-prem EHR-adjacent systems) and meets security review requirements for production workloads.
10. Ecosystem Maturity, Governance & Long-Term Support<br/>*What to look for:* Size of community and integrations, open-source license (e.g., Apache 2.0/MIT), backing organization, release cadence, stable APIs, semantic versioning and commercial support options.<br/>*Why it matters:* The enterprise is choosing a *standard*. Framework churn and abandoned projects create expensive rewrites, so stability and support lower long-run cost and risk.

#### Part 2: Strategic Pillar Weighting Model for Agent Frameworks

| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |
| --- | --- | --- |
| Portability (Model, Cloud, On-Prem) | 20% | Framework code must outlive model/cloud choices. |
| Complexity & Developer Productivity | 20% | Standardizing teams on one framework; learning curve; maintainability. |
| Functional Completeness | 15% | Durable state, multi-agent, memory, HITL, tool protocols. |
| Governance, Security & Compliance | 15% | PHI-aware memory, sandboxing, secrets, auditability. |
| Value-Realization Potential | 15% | Speed from pilot code to production service. |
| Ecosystem Stability & Operational Cost | 15% | Community, LTS, support; runtime efficiency. |

#### Part 3: Agent Framework Feature Scoring Template (0 to 4 Scale)

| # | Agent Framework Feature / Capability | Description & Evaluation Focus | Weight | Vendor A Score | Vendor A Weighted | Vendor B Score | Vendor B Weighted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Stateful Orchestration & Durability | Graph/state control flow, checkpoints, resume, long-running runs. | 10% |  |  |  |  |
| 2 | Model-Agnostic Abstractions | Multi-provider models, structured outputs, config-only swaps. | 10% |  |  |  |  |
| 3 | MCP / A2A Tool Protocols | Consume MCP servers; expose agents via MCP/A2A; typed tools. | 10% |  |  |  |  |
| 4 | Multi-Agent Patterns | Supervisor, hand-off, hierarchical, parallel composition. | 10% |  |  |  |  |
| 5 | Memory & Context Management | Short/long-term memory, pluggable stores, PHI-aware retention. | 10% |  |  |  |  |
| 6 | Human-in-the-Loop Interrupts | Pause/resume for review and edits from saved state. | 10% |  |  |  |  |
| 7 | Testing & Debuggability | Mocks, eval hooks, visual debugging, reproducible runs. | 10% |  |  |  |  |
| 8 | OpenTelemetry-Native Tracing | GenAI semantic-convention spans exportable to any backend. | 10% |  |  |  |  |
| 9 | Deployment Portability & Security | Containers/K8s/serverless; sandboxed execution; vaulted secrets. | 10% |  |  |  |  |
| 10 | Ecosystem Maturity & LTS | License, backing, community, API stability, commercial support. | 10% |  |  |  |  |
| TOTALS | Sum of (Score × Weight) normalized to 100% |  | 100% |  | [Total A] |  | [Total B] |

#### Part 4: Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Vendor A Status | Vendor B Status |
| --- | --- | --- | --- |
| Standardization Fit | Can most existing pilot code be migrated to this framework with modest effort? | (e.g., Medium Risk) | (e.g., Low Risk) |
| Project Longevity | Is the project backed by a stable organization with a clear LTS/versioning policy? | (e.g., Pass) | (e.g., Fail) |
| Platform Coupling | Is the framework tied to one cloud/model vendor's runtime? | (e.g., High) | (e.g., Low) |
| Skills Availability | Can we hire and train Python/TypeScript engineers on it readily? | (e.g., Pass) | (e.g., Pass) |

**Candidate solutions to score (illustrative):**
- LangGraph (LangChain)
- Microsoft Agent Framework (successor to Semantic Kernel + AutoGen)
- OpenAI Agents SDK
- Google Agent Development Kit (ADK)
- Claude Agent SDK
- AWS Strands Agents
- CrewAI
- LlamaIndex Agents / Workflows
- Pydantic AI

---

### Pattern 3: MCP Ecosystems

*Scope:* the **Model Context Protocol** ecosystem is the standard way AI agents and assistants reach enterprise tools and data. It includes:
- MCP servers (tools and data connectors)
- MCP clients/hosts
- registries and catalogs
- MCP gateways that secure and govern agent-to-tool traffic

#### Part 1: Top 10 Features & Capabilities for Enterprise MCP Ecosystems

1. Specification Compliance & Transport Currency<br/>*What to look for:* Conformance to the current MCP specification: streamable HTTP transport for remote servers, the current authorization model (OAuth 2.1-based), structured tool outputs, resources, prompts and elicitation. Also a demonstrated cadence for keeping up with spec revisions.<br/>*Why it matters:* MCP is evolving quickly. Non-conformant or stale implementations break interoperability and security, which undermines the "build once, use from any agent" promise.
2. Enterprise Registry, Catalog & Discovery<br/>*What to look for:* A private, curated MCP registry. Each server entry should carry an owner, version, data classification, approved scopes and lifecycle status, and the registry should sync from or allowlist public registries.<br/>*Why it matters:* Prevents "shadow MCP" (unvetted servers wired into agents during pilots) and gives architects one inventory of which tools touch PHI.
3. Authentication, Delegated Authorization & Per-Tool Scopes<br/>*What to look for:* OAuth with enterprise IdP (Entra, Okta), on-behalf-of user tokens passed through to downstream systems, per-tool and per-resource scopes, and no shared static API keys.<br/>*Why it matters:* Ensures an agent's tool access is exactly the calling user's entitlements. This is essential for PHI minimum-necessary access and for audit.
4. Central MCP Gateway & Policy Enforcement<br/>*What to look for:* A gateway/proxy layer that routes MCP traffic and enforces policy: tool allowlists and denylists, parameter validation, rate limits, and data-loss prevention on responses. Policy should be defined as code.<br/>*Why it matters:* One control point for every agent-to-tool interaction. It is simpler and safer than securing every server and every agent individually.
5. MCP-Specific Threat Protection<br/>*What to look for:* Defenses against tool poisoning (malicious tool descriptions), indirect prompt injection through tool results, "rug-pull" tool definition changes, confused-deputy and token-passthrough abuse, and server impersonation. Also signature/pinning of server versions and sandboxed local servers.<br/>*Why it matters:* MCP opens a new attack surface in which a single compromised tool can exfiltrate PHI or trigger unauthorized actions. Healthcare threat models must cover it explicitly.
6. Healthcare & Enterprise Server Coverage<br/>*What to look for:* Availability and quality of first-party or vendor-supported MCP servers for core systems: **Snowflake**, FHIR servers/EHR APIs, claims and care-management platforms, ServiceNow, M365/SharePoint, Salesforce, GitHub, databases.<br/>*Why it matters:* Vendor-maintained servers remove custom connector work and speed up value realization. Gaps show where the enterprise must build and own servers itself.
7. Hosting Flexibility & Portability<br/>*What to look for:* Ability to run remote MCP servers as containers on Kubernetes, serverless, managed vendor hosting, or on-prem near sensitive systems. Local (stdio) servers should be controlled on endpoints.<br/>*Why it matters:* Satisfies portability and data-residency requirements and lets tools run close to on-prem EHR data rather than exposing it to the internet.
8. Tool-Call Observability & Immutable Audit<br/>*What to look for:* Logging of every tool invocation: agent, user, tool, parameters (with PHI masking), result size, latency and outcome. OpenTelemetry export and tamper-evident retention.<br/>*Why it matters:* Provides the chain of custody needed for HIPAA audits, incident investigation and usage analytics on which tools deliver value.
9. Server Development Lifecycle & Versioning<br/>*What to look for:* SDKs in enterprise languages, templates, contract testing, CI/CD pipelines, semantic versioning, deprecation policy, and wrapping of existing REST/OpenAPI services as MCP servers.<br/>*Why it matters:* Lets engineering teams turn existing APIs into governed MCP tools quickly and consistently, making the pattern repeatable across domains.
10. FinOps, Quotas & Usage Analytics<br/>*What to look for:* Per-tool, per-agent and per-domain usage metering, quotas, cost attribution of downstream calls (e.g., warehouse credits triggered by tools), and adoption dashboards.<br/>*Why it matters:* Agent-driven tool calls can create hidden downstream costs, such as runaway warehouse queries. Metering keeps scale economical and shows value by domain.

#### Part 2: Strategic Pillar Weighting Model for MCP Ecosystems

| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |
| --- | --- | --- |
| Security, Governance & PHI Protection | 25% | New attack surface; delegated auth; tool-level policy and audit. |
| Enterprise Adaptability & Coverage | 20% | Servers for Snowflake, EHR/FHIR, ITSM, CRM; reuse across all agents. |
| Portability & Hosting | 15% | Run servers in any cloud/on-prem; open standard, no lock-in. |
| Complexity & Tech Rationalization | 15% | Replace bespoke per-agent connectors with governed shared tools. |
| Value-Realization Potential | 15% | Speed to wire agents into systems of record. |
| Operational Costs & FinOps | 10% | Metering of tool usage and downstream cost. |

#### Part 3: MCP Ecosystem Feature Scoring Template (0 to 4 Scale)

| # | MCP Ecosystem Feature / Capability | Description & Evaluation Focus | Weight | Vendor A Score | Vendor A Weighted | Vendor B Score | Vendor B Weighted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Spec Compliance & Currency | Current MCP spec, streamable HTTP, OAuth-based auth, rapid spec updates. | 10% |  |  |  |  |
| 2 | Enterprise Registry & Discovery | Private curated registry with owner, version, data class, lifecycle. | 10% |  |  |  |  |
| 3 | Delegated Auth & Per-Tool Scopes | IdP OAuth, on-behalf-of tokens, scoped tools, no shared keys. | 10% |  |  |  |  |
| 4 | Central Gateway & Policy | Allow/deny lists, parameter validation, DLP, rate limits, policy-as-code. | 10% |  |  |  |  |
| 5 | MCP Threat Protection | Tool poisoning, prompt injection, rug-pull, confused deputy defenses. | 10% |  |  |  |  |
| 6 | Healthcare & Enterprise Servers | Supported servers for Snowflake, FHIR/EHR, claims, ITSM, CRM, M365. | 10% |  |  |  |  |
| 7 | Hosting Flexibility | Containers/K8s, serverless, managed, on-prem; controlled local servers. | 10% |  |  |  |  |
| 8 | Tool-Call Observability & Audit | Per-call logs with PHI masking, OTel export, tamper-evident retention. | 10% |  |  |  |  |
| 9 | Server Dev Lifecycle | SDKs, OpenAPI-to-MCP, contract tests, CI/CD, versioning/deprecation. | 10% |  |  |  |  |
| 10 | FinOps & Usage Analytics | Metering, quotas, downstream cost attribution, adoption dashboards. | 10% |  |  |  |  |
| TOTALS | Sum of (Score × Weight) normalized to 100% |  | 100% |  | [Total A] |  | [Total B] |

> Note: Part 2 weights security at 25%. To reflect that emphasis in the feature matrix, you can optionally raise features #3, #4 and #5 to 12% each and lower #7, #9 and #10 to 8% each; the total stays at 100%.

#### Part 4: Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Vendor A Status | Vendor B Status |
| --- | --- | --- | --- |
| Shadow-MCP Control | Can we discover and block unapproved MCP servers used in current pilots? | (e.g., Medium Risk) | (e.g., Low Risk) |
| PHI Exposure | Can tool responses containing PHI be masked or blocked per user entitlement? | (e.g., Pass) | (e.g., Fail) |
| Standards Lock-in | Does the offering add proprietary extensions that break portability? | (e.g., Low) | (e.g., High) |
| Snowflake Fit | Is there a governed MCP path to Snowflake data honoring Snowflake RBAC/masking? | (e.g., Pass) | (e.g., Pass) |

**Candidate solutions to score (illustrative):**
- Official MCP Registry and SDKs (reference servers)
- Snowflake managed MCP server
- Microsoft (Azure API Management MCP / Copilot Studio MCP)
- AWS (Bedrock AgentCore Gateway)
- Kong AI / MCP gateway
- Cloudflare remote MCP
- Docker MCP Catalog & Toolkit
- MuleSoft (MCP support)
- Vendor-native servers (ServiceNow, Salesforce, GitHub, Atlassian)

---

### Pattern 4: RAG Frameworks

*Scope:* frameworks and managed services for **Retrieval-Augmented Generation**: ingesting, parsing and indexing enterprise content, then retrieving grounded context to answer questions with citations. Examples include clinical policies, medical-necessity criteria, benefit documents, SOPs, contracts and knowledge bases.

#### Part 1: Top 10 Features & Capabilities for Enterprise RAG Frameworks

1. High-Fidelity Document Ingestion & Parsing<br/>*What to look for:* Robust parsing of PDFs, scanned documents (OCR), tables, forms, images, Office files and HTML. Layout-aware extraction, and handling of healthcare artifacts such as benefit summaries, clinical guidelines, fax-based referrals and CCD/C-CDA documents.<br/>*Why it matters:* Retrieval quality is capped by parsing quality. Healthcare content is table-heavy and often scanned, and poor extraction is the leading cause of wrong answers in pilots.
2. Flexible Chunking & Embedding Strategy<br/>*What to look for:* Configurable chunking (semantic, hierarchical, parent-child, table-aware), metadata enrichment, and pluggable embedding models, including domain-tuned and self-hosted embeddings.<br/>*Why it matters:* Lets teams tune retrieval per content type and domain, and avoids lock-in to one embedding provider as models improve.
3. Hybrid Retrieval, Filtering & Re-Ranking<br/>*What to look for:* Combined keyword (BM25) and vector search, metadata filters (e.g., plan, state, effective date), cross-encoder or LLM re-ranking, and query rewriting and decomposition.<br/>*Why it matters:* Healthcare questions depend on exact codes (CPT, ICD-10, NDC), plan identifiers and dates. Pure vector search misses these, and hybrid plus re-ranking greatly improves precision.
4. Permission-Aware Retrieval (Document & Row-Level Security)<br/>*What to look for:* Enforcement of source-system ACLs at query time (security trimming), identity propagation from the user, PHI-aware filtering, and sync of permission changes.<br/>*Why it matters:* A RAG system must never surface a document or member record the user is not entitled to see. This is the most common blocker when taking RAG pilots to production in healthcare.
5. Grounding, Citations & Hallucination Controls<br/>*What to look for:* Source citations down to the passage, answer-to-source faithfulness checks, confidence scores, "I don't know" behavior, and configurable refusal when context is insufficient.<br/>*Why it matters:* Clinicians, nurses and member-service staff need verifiable answers. Citations build trust and reduce the risk of acting on fabricated information.
6. RAG Evaluation & Continuous Quality Measurement<br/>*What to look for:* Built-in metrics for context precision and recall, faithfulness and answer relevance; golden datasets; A/B comparison of pipelines; and online feedback capture.<br/>*Why it matters:* Measurable quality lets the enterprise standardize configurations, justify scale-up, and detect regressions when content or models change.
7. Freshness & Incremental Indexing<br/>*What to look for:* Change-data-driven re-indexing, deletion propagation, versioned documents with effective dates, and SLAs on how quickly updates become searchable.<br/>*Why it matters:* Medical policies, formularies and benefits change often. Stale answers create compliance and member-experience risk.
8. Advanced & Agentic Retrieval (Multimodal, Structured, Graph)<br/>*What to look for:* Multi-step or agentic retrieval, text-to-SQL over structured data (e.g., Snowflake tables), knowledge-graph / GraphRAG support, and multimodal retrieval (images, diagrams).<br/>*Why it matters:* Many enterprise questions need both documents and structured data (e.g., "policy criteria + this member's claims history"). Advanced retrieval broadens coverage across domains.
9. Deployment Portability & Data-Platform Proximity<br/>*What to look for:* Model- and vector-store-agnostic design, deployment in any cloud or on-prem, and the option to run retrieval **inside the data platform** (e.g., Snowflake Cortex Search) so PHI does not leave governed boundaries.<br/>*Why it matters:* Keeping retrieval close to governed data lowers PHI risk and data-movement cost, while agnostic design avoids lock-in.
10. Cost & Performance Efficiency<br/>*What to look for:* Embedding and indexing cost controls, caching of retrievals and answers, token-efficient context assembly, latency SLAs, and usage/cost reporting by application or domain.<br/>*Why it matters:* RAG costs scale with corpus size and query volume. Efficiency features keep enterprise-wide rollout economical.

#### Part 2: Strategic Pillar Weighting Model for RAG Frameworks

| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |
| --- | --- | --- |
| Answer Quality & Trust | 20% | Parsing, hybrid retrieval, citations, evaluation — the core value driver. |
| Governance, Security & PHI Protection | 20% | Permission-aware retrieval; PHI never over-exposed. |
| Portability & Data-Platform Fit | 15% | Model/vector-store agnostic; runs close to Snowflake-governed data. |
| Functional Completeness (Domains) | 15% | Documents + structured data + multimodal across clinical, claims, member domains. |
| Complexity & Tech Rationalization | 15% | Replace per-pilot bespoke RAG stacks with a standard pipeline. |
| Operational Costs & FinOps | 15% | Indexing/embedding/token cost at enterprise corpus scale. |

#### Part 3: RAG Framework Feature Scoring Template (0 to 4 Scale)

| # | RAG Feature / Capability | Description & Evaluation Focus | Weight | Vendor A Score | Vendor A Weighted | Vendor B Score | Vendor B Weighted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Document Ingestion & Parsing | Layout-aware parsing of PDFs, scans/OCR, tables, forms, C-CDA. | 10% |  |  |  |  |
| 2 | Chunking & Embedding Flexibility | Semantic/hierarchical chunking, metadata, pluggable embeddings. | 10% |  |  |  |  |
| 3 | Hybrid Retrieval & Re-Ranking | BM25 + vector, metadata filters, re-rankers, query rewriting. | 10% |  |  |  |  |
| 4 | Permission-Aware Retrieval | Source ACL trimming, identity propagation, PHI-aware filters. | 10% |  |  |  |  |
| 5 | Grounding & Citations | Passage-level citations, faithfulness checks, safe refusal. | 10% |  |  |  |  |
| 6 | RAG Evaluation | Context precision/recall, faithfulness metrics, golden sets, A/B. | 10% |  |  |  |  |
| 7 | Freshness & Incremental Indexing | Change-driven re-index, deletes, versioned/effective-dated docs. | 10% |  |  |  |  |
| 8 | Advanced / Agentic Retrieval | Agentic multi-step, text-to-SQL, GraphRAG, multimodal. | 10% |  |  |  |  |
| 9 | Portability & Platform Proximity | Model/store agnostic; in-platform retrieval (e.g., Snowflake). | 10% |  |  |  |  |
| 10 | Cost & Performance Efficiency | Embedding/index cost, caching, token efficiency, latency SLAs. | 10% |  |  |  |  |
| TOTALS | Sum of (Score × Weight) normalized to 100% |  | 100% |  | [Total A] |  | [Total B] |

#### Part 4: Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Vendor A Status | Vendor B Status |
| --- | --- | --- | --- |
| Pilot Consolidation | Can this replace the separate RAG stacks built in current pilots? | (e.g., Medium Risk) | (e.g., Low Risk) |
| PHI Boundary | Does retrieval run inside governed boundaries (e.g., Snowflake) or copy PHI out? | (e.g., High Risk) | (e.g., Low Risk) |
| Quality Evidence | Can the vendor demonstrate measured faithfulness on our own documents? | (e.g., Pass) | (e.g., Fail) |
| Content Owner Adoption | Can policy/clinical content owners manage sources without engineering? | (e.g., Pass) | (e.g., Pass) |

**Candidate solutions to score (illustrative):**
- **Snowflake Cortex Search** (+ Cortex Agents / Document AI)
- Azure AI Search (agentic retrieval)
- Amazon Bedrock Knowledge Bases
- Google Vertex AI RAG Engine / Vertex AI Search
- Databricks (Mosaic AI Vector Search + Agent Bricks)
- LlamaIndex (+ LlamaParse)
- LangChain
- Haystack (deepset)
- Unstructured (parsing/ETL for RAG)

---

### Pattern 5: Vector Search

*Scope:* the **vector database / vector search engine** layer that stores embeddings and serves similarity search for RAG, semantic search, recommendations and agent memory. It can be a dedicated product or a capability embedded in a database or data platform.

#### Part 1: Top 10 Features & Capabilities for Enterprise Vector Search

1. Performance & Scale (ANN at Enterprise Volume)<br/>*What to look for:* Proven approximate-nearest-neighbor performance (recall vs latency) at hundreds of millions to billions of vectors, high QPS, horizontal scaling, and published benchmarks on comparable workloads.<br/>*Why it matters:* Enterprise-wide RAG and semantic search over clinical, claims and member content produces very large indexes. Performance at scale determines user experience and infrastructure cost.
2. Hybrid Search & Rich Metadata Filtering<br/>*What to look for:* Native combination of vector and keyword (BM25/sparse) search with fusion ranking, plus efficient pre/post filtering on metadata (plan, region, date, document type, sensitivity) without recall collapse.<br/>*Why it matters:* Healthcare retrieval depends on exact identifiers and filters. Hybrid search with correct filtering is what makes results accurate and compliant.
3. Security, Access Control & HIPAA Readiness<br/>*What to look for:* RBAC, namespace/collection and document-level security, encryption at rest and in transit with customer-managed keys, private networking (PrivateLink/VPC), audit logs, SOC 2/HITRUST, and a signed **BAA** for managed offerings.<br/>*Why it matters:* Embeddings and stored chunks can contain or reveal PHI, so the vector store must meet the same controls as any PHI data store.
4. Deployment Portability (Managed, Self-Hosted, In-Platform)<br/>*What to look for:* Options for managed SaaS, BYOC, self-hosted Kubernetes/on-prem, and vector capabilities native to existing platforms (e.g., Snowflake, Postgres/pgvector, Elasticsearch/OpenSearch).<br/>*Why it matters:* Portability avoids lock-in. Using vector search inside platforms the enterprise already governs (e.g., Snowflake) can remove a separate system entirely.
5. Multi-Tenancy & Domain Isolation<br/>*What to look for:* Efficient isolation of many tenants/indexes (by domain, application or client), per-tenant quotas, noisy-neighbor protection, and per-tenant backup/restore.<br/>*Why it matters:* Supports federated adoption across Clinical, Claims, Member and Corporate domains on a shared, standard service.
6. Index Types, Compression & Cost Efficiency<br/>*What to look for:* Multiple index types (HNSW, IVF, DiskANN), quantization (scalar, product, binary), tiered storage (memory, SSD, object store) and support for multi-vector or sparse embeddings.<br/>*Why it matters:* Compression and tiering can cut memory costs substantially with little recall loss, which is decisive for operating cost at scale.
7. Real-Time Ingestion, Updates & Deletes<br/>*What to look for:* Low-latency upserts and deletes, consistency guarantees, streaming or CDC ingestion from source systems, and re-embedding workflows when models change.<br/>*Why it matters:* Content freshness and the "right to delete" or retention obligations need deletions to take effect immediately and reliably.
8. Integrated Embedding & Ecosystem Integration<br/>*What to look for:* Built-in or pluggable embedding generation, SDKs, and native integrations with RAG and agent frameworks (LangChain, LlamaIndex), MCP servers and data pipelines (Snowflake, Kafka).<br/>*Why it matters:* Tight ecosystem integration reduces glue code and speeds delivery for engineering teams across domains.
9. Reliability, HA/DR & Operability<br/>*What to look for:* Replication, multi-AZ/region availability, backups and point-in-time restore, zero-downtime upgrades, uptime SLAs, and observability metrics (latency, recall, index health).<br/>*Why it matters:* Once RAG and agents move into clinical and member workflows, vector search becomes tier-1 infrastructure that must meet enterprise availability standards.
10. FinOps & Transparent Pricing<br/>*What to look for:* Clear pricing (storage, read/write units, compute), cost attribution per index or tenant, serverless scale-to-zero options, and forecasting tools.<br/>*Why it matters:* Vector workloads can grow unpredictably. Transparent, attributable cost supports chargeback and avoids budget surprises.

#### Part 2: Strategic Pillar Weighting Model for Vector Search

| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |
| --- | --- | --- |
| Portability & Hybrid/Multi-Cloud | 20% | Managed / self-hosted / in-platform choice; no proprietary lock-in. |
| Governance, Security & PHI Compliance | 20% | Embeddings and chunks treated as PHI; BAA; access control. |
| Performance & Retrieval Quality | 15% | Recall/latency at scale; hybrid search and filtering. |
| Operational Costs & FinOps | 15% | Compression, tiering, transparent pricing. |
| Complexity & Tech Rationalization | 15% | Consolidate per-pilot vector stores; prefer existing platforms. |
| Functional Completeness & Ecosystem | 15% | Multi-tenancy, real-time updates, framework integrations. |

#### Part 3: Vector Search Feature Scoring Template (0 to 4 Scale)

| # | Vector Search Feature / Capability | Description & Evaluation Focus | Weight | Vendor A Score | Vendor A Weighted | Vendor B Score | Vendor B Weighted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Performance & Scale | Recall/latency at 100M–1B+ vectors, QPS, horizontal scaling. | 10% |  |  |  |  |
| 2 | Hybrid Search & Filtering | Vector + BM25/sparse fusion; efficient metadata filtering. | 10% |  |  |  |  |
| 3 | Security & HIPAA Readiness | RBAC, doc-level security, CMK encryption, private networking, BAA. | 10% |  |  |  |  |
| 4 | Deployment Portability | Managed, BYOC, self-hosted K8s/on-prem, in-platform options. | 10% |  |  |  |  |
| 5 | Multi-Tenancy & Isolation | Many tenants/indexes, quotas, noisy-neighbor protection. | 10% |  |  |  |  |
| 6 | Index Types & Compression | HNSW/IVF/DiskANN, quantization, tiered storage, sparse/multi-vector. | 10% |  |  |  |  |
| 7 | Real-Time Updates & Deletes | Low-latency upserts/deletes, streaming/CDC ingest, re-embedding. | 10% |  |  |  |  |
| 8 | Embedding & Ecosystem Integration | Built-in embeddings; RAG/agent framework, MCP, pipeline integrations. | 10% |  |  |  |  |
| 9 | Reliability, HA/DR | Replication, backups/PITR, zero-downtime upgrades, SLAs. | 10% |  |  |  |  |
| 10 | FinOps & Pricing | Transparent pricing, per-index cost attribution, scale-to-zero. | 10% |  |  |  |  |
| TOTALS | Sum of (Score × Weight) normalized to 100% |  | 100% |  | [Total A] |  | [Total B] |

#### Part 4: Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Vendor A Status | Vendor B Status |
| --- | --- | --- | --- |
| Need for a Separate Store | Does this add a new system, or can Snowflake / existing databases meet the need? | (e.g., Medium Risk) | (e.g., Low Risk) |
| Lock-in Risk | Can indexes be rebuilt elsewhere from source + embeddings with modest effort? | (e.g., Low) | (e.g., High) |
| PHI Controls | Is document-level security enforced at query time with audit? | (e.g., Pass) | (e.g., Fail) |
| Scale Evidence | Has the vendor proven our expected corpus size and QPS in a PoC? | (e.g., Pass) | (e.g., Pass) |

**Candidate solutions to score (illustrative):**
- **Snowflake Cortex Search / native VECTOR data type**
- Pinecone
- Weaviate
- Milvus / Zilliz Cloud
- Qdrant
- Elasticsearch / OpenSearch vector search
- PostgreSQL pgvector (incl. managed Postgres)
- MongoDB Atlas Vector Search
- Azure AI Search
- Redis vector search

---

### Pattern 6: Gateway, Observability

*Scope:* the **AI control plane** in front of and around models and agents. It has two parts:
- An **AI/LLM gateway** for routing, security, quotas and cost control across model providers.
- An **AI observability/LLMOps** layer for tracing, evaluation, monitoring and audit of LLM, RAG and agent applications.

#### Part 1: Top 10 Features & Capabilities for Enterprise AI Gateway & Observability

1. Unified Multi-Model Access, Routing & Failover<br/>*What to look for:* One API across commercial and self-hosted models, with policy-based routing (by cost, latency, data sensitivity or use case), automatic fallback, load balancing and model version pinning.<br/>*Why it matters:* Decouples applications from model providers. This enables portability, resilience during provider outages, and cost optimization without code changes.
2. PHI/PII Guardrails & Content Safety at the Edge<br/>*What to look for:* Inline detection and redaction or tokenization of PHI/PII in prompts and responses, prompt-injection and jailbreak detection, output moderation, and policy enforcement before data reaches any model provider.<br/>*Why it matters:* Gives one enforceable HIPAA control point for all AI traffic instead of relying on each team's application code.
3. Identity, Access Control & Quotas<br/>*What to look for:* Enterprise SSO/IdP integration, virtual API keys per team/app, model allowlists by data classification, rate limits, token quotas and budget caps per domain.<br/>*Why it matters:* Stops unmanaged use of AI services, enforces which models may process PHI, and keeps consumption within approved limits.
4. Cost Attribution, Budgets & Optimization<br/>*What to look for:* Real-time token and cost tracking by application, team, domain and user; budgets and alerts; chargeback exports; and optimization levers such as cheaper-model routing and prompt compression.<br/>*Why it matters:* AI spend grows quickly after scale-up. Transparent attribution is essential for FinOps and for demonstrating ROI by domain.
5. Semantic & Response Caching<br/>*What to look for:* Exact and semantic caching with TTLs, PHI-safe cache scoping (per user or tenant), and cache hit analytics.<br/>*Why it matters:* Reduces latency and cost for repetitive queries (e.g., policy and benefit questions) while preventing cross-user PHI leakage through the cache.
6. End-to-End Tracing (OpenTelemetry GenAI Conventions)<br/>*What to look for:* Distributed traces across LLM calls, retrieval steps, tool/MCP calls and multi-agent hops, following **OpenTelemetry GenAI semantic conventions**, with correlation to application and infrastructure telemetry.<br/>*Why it matters:* Provides one view to debug complex agent and RAG flows across frameworks, with no separate monitoring silo per team.
7. Online & Offline Evaluation, Quality Monitoring<br/>*What to look for:* Automated evaluators (faithfulness, relevance, toxicity, PHI leakage, task success), human feedback capture, drift and regression detection, and dashboards per application and model version.<br/>*Why it matters:* Scaling requires evidence that quality holds in production. Continuous evaluation catches degradation after model, prompt or content changes before users are harmed.
8. Compliance-Grade Audit Logging & Retention<br/>*What to look for:* Immutable logs of prompts, responses, users and model versions with configurable PHI masking, retention policies, legal hold, and export to SIEM or the data platform (e.g., Snowflake).<br/>*Why it matters:* Supports HIPAA audit, incident response, model-risk management and emerging AI regulation, all of which require knowing who asked what, and what the AI answered.
9. Agent & MCP Traffic Governance<br/>*What to look for:* Visibility and policy over agent-to-tool (MCP) and agent-to-agent (A2A) traffic in addition to model calls: tool allowlists, anomaly detection on agent behavior, and loop and runaway-cost protection.<br/>*Why it matters:* As pilots become autonomous agents, the risk moves from single prompts to chains of actions. The control plane must govern the whole interaction, not just the model call.
10. Deployment Portability & Performance Overhead<br/>*What to look for:* Self-hostable (Kubernetes/VPC/on-prem) or BYOC options, open-source cores, high availability, and minimal added latency, with data never leaving enterprise boundaries unless configured.<br/>*Why it matters:* A gateway sits in the path of every AI request. It must be portable, resilient and fast, and able to keep PHI inside the enterprise perimeter.

#### Part 2: Strategic Pillar Weighting Model for Gateway & Observability

| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |
| --- | --- | --- |
| Governance, Security & PHI Compliance | 25% | Single enforcement and audit point for all AI traffic. |
| Portability & Hybrid/Multi-Cloud | 15% | Self-host / BYOC; model-provider agnostic. |
| Operational Costs & FinOps | 20% | Cost attribution, budgets, caching, routing optimization. |
| Reliability & Quality Assurance | 15% | Failover, tracing, continuous evaluation. |
| Complexity & Tech Rationalization | 15% | Replace per-team keys, loggers and eval scripts with one control plane. |
| Value-Realization Potential | 10% | Evidence of ROI and quality to justify scale-up. |

#### Part 3: Gateway & Observability Feature Scoring Template (0 to 4 Scale)

| # | Gateway / Observability Feature | Description & Evaluation Focus | Weight | Vendor A Score | Vendor A Weighted | Vendor B Score | Vendor B Weighted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Multi-Model Routing & Failover | One API, policy-based routing, fallback, load balancing, version pinning. | 10% |  |  |  |  |
| 2 | PHI Guardrails & Content Safety | Inline PHI redaction, prompt-injection detection, output moderation. | 10% |  |  |  |  |
| 3 | Identity, Access & Quotas | SSO, virtual keys per team, model allowlists by data class, limits. | 10% |  |  |  |  |
| 4 | Cost Attribution & Budgets | Token/cost by app/team/domain, budgets, alerts, chargeback. | 10% |  |  |  |  |
| 5 | Semantic Caching | Exact + semantic caching, PHI-safe scoping, hit analytics. | 10% |  |  |  |  |
| 6 | OTel GenAI Tracing | Traces across LLM, retrieval, tool/MCP and agent hops. | 10% |  |  |  |  |
| 7 | Evaluation & Quality Monitoring | Online/offline evaluators, feedback, drift/regression detection. | 10% |  |  |  |  |
| 8 | Audit Logging & Retention | Immutable prompt/response logs, PHI masking, SIEM/Snowflake export. | 10% |  |  |  |  |
| 9 | Agent & MCP Traffic Governance | Tool allowlists, agent anomaly detection, loop/runaway protection. | 10% |  |  |  |  |
| 10 | Deployment Portability & Overhead | Self-host/BYOC, open-source core, HA, low added latency. | 10% |  |  |  |  |
| TOTALS | Sum of (Score × Weight) normalized to 100% |  | 100% |  | [Total A] |  | [Total B] |

#### Part 4: Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Vendor A Status | Vendor B Status |
| --- | --- | --- | --- |
| Single Control Point | Can all pilot and production AI traffic be routed through this layer? | (e.g., Medium Risk) | (e.g., Low Risk) |
| PHI Egress | Can we guarantee PHI is redacted or restricted before reaching external models? | (e.g., Pass) | (e.g., Fail) |
| Gateway vs Observability Split | Does one product cover both, or do we need two integrated tools? | (e.g., Both) | (e.g., Observability only) |
| Telemetry Portability | Is trace/eval data exportable (OTel, Snowflake) without vendor lock-in? | (e.g., Pass) | (e.g., Pass) |

**Candidate solutions to score (illustrative):**
- *Gateways:*
  - LiteLLM
  - Kong AI Gateway
  - Portkey
  - Azure API Management (AI gateway)
  - AWS Bedrock (Guardrails + inference profiles)
  - Cloudflare AI Gateway
- *Observability / LLMOps:*
  - Langfuse
  - Arize (Phoenix / AX)
  - LangSmith
  - Datadog LLM Observability
  - Galileo
  - Weights & Biases Weave
  - Snowflake AI Observability (TruLens-based)

---

### How to Use These Templates

1. **Tailor the weights.** Keep each pattern's Part 3 feature weights at 10%, or re-weight them to mirror Part 2. The note under Pattern 3 shows how, and security-heavy patterns (MCP, Gateway) benefit most.
2. **Shortlist 3–5 candidates per pattern.** Always include the **Snowflake-native option** where one exists (Cortex Agents, Cortex Search / VECTOR, the Snowflake MCP server, AI Observability). This tests whether an existing licence meets the need before a new vendor is engaged.
3. **Score from evidence, not demos.** Base scores on PoC results against the enterprise's own documents, data and pilots, not on vendor slides. Record the evidence source for every score.
4. **Run Part 4 alongside the numbers.** A high score with a "High Risk" on PHI egress or lock-in should not win by default.
5. **Standardize.** Aim for one primary standard per pattern, plus an approved exception path. This converts the current pilot portfolio into a governed, scalable AI platform.

*Prepared September 2026 for the Enterprise Architecture team. Candidate lists are illustrative and must be verified at evaluation time, because product names, capabilities and ownership in the AI market change rapidly.*
