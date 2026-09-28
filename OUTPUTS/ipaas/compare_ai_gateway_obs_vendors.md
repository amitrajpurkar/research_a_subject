# Gateway, Observability Vendor Comparison — Healthcare Enterprise AI Pattern

**AI pattern:** Pattern 6 — Gateway, Observability. This is the AI control plane that sits in front of and around models and agents. It has two parts: (a) an **AI/LLM gateway** that handles routing, security, quotas and cost control across model providers; and (b) an **AI observability / LLMOps** layer that handles tracing, evaluation, monitoring and audit of LLM, RAG and agent applications.
**Evaluation basis:** `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` — Pattern 6 (Part 1 top-10 capabilities, Part 2 pillar weighting, Part 3 scoring template, Part 4 qualitative risk)
**Vendor list source:** `OUTPUTS/ipaas/ai_vendor_list.md`
**Vendors assessed:** Azure AI Foundry (now **Microsoft Foundry**) + Azure API Management AI gateway; Amazon Bedrock (Guardrails, inference profiles, CloudWatch GenAI observability, AgentCore Gateway/Observability/Policy); Kong AI Gateway; LangSmith (LangChain); Arize AI (Arize AX + Phoenix); Fiddler AI (AI Observability & Security / AI Control Plane). Reference column (not ranked): **Ref: Snowflake Cortex AI (AI Observability + Cortex Guard)**.
**Research date:** September 2026. Sources: vendor documentation, release notes and blogs (Microsoft Learn, AWS docs and What's New, Kong docs and blog, LangChain docs and changelog, Arize docs and changelog, Fiddler docs and changelog, Snowflake docs); Gartner (Market Guide for AI Gateways, Oct 2025; Market Overview for AI Gateways, May 2026; Market Guide for AI Evaluation and Observability Platforms, Feb 2026; Magic Quadrant for API Management, 2025; Market Guide for AI TRiSM, 2025; Peer Insights); G2; PeerSpot; practitioner blogs; competitor-authored comparisons (marked as such).

**Scoring scale (0–4)**

| Score | Meaning |
|---|---|
| 0 | Not supported |
| 1 | Basic / custom scripting required |
| 2 | Out-of-the-box / configurable |
| 3 | Advanced / native cloud integration |
| 4 | Fully automated / AI-driven market leader |

**Strategic pillar weights (Part 2 — used in the qualitative analysis; capability scoring uses 10% per capability)**

| Strategic Evaluation Pillar | Weight | Focus Rationale |
|---|---|---|
| Governance, Security & PHI Compliance | 25% | Single enforcement and audit point for all AI traffic. |
| Portability & Hybrid/Multi-Cloud | 15% | Self-host / BYOC; model-provider agnostic. |
| Operational Costs & FinOps | 20% | Cost attribution, budgets, caching, routing optimization. |
| Reliability & Quality Assurance | 15% | Failover, tracing, continuous evaluation. |
| Complexity & Tech Rationalization | 15% | Replace per-team keys, loggers and eval scripts with one control plane. |
| Value-Realization Potential | 10% | Evidence of ROI and quality to justify scale-up. |

**How to read the scores.** Each of the 10 capabilities carries equal weight (10%), and the maximum total is 4.00. Pattern 6 covers **two product categories**, so no single product is expected to score well everywhere:
- Gateways score low on evaluation (capability 7).
- Observability tools score 0 on routing (1) and caching (5).

The ranking therefore shows **breadth across the whole control plane**. It is not a quality ranking within a category. The decision that matters is the **combination** in §2.4. Look at the per-capability rows and the "Gateway vs Observability Split" row in §2.3 as well as the totals.

**Scoping notes**
- **Product category of each vendor.** These categories are used throughout the report.
  - **Gateway:** Kong AI Gateway.
  - **Hyperscaler suite (gateway + observability):** Azure (API Management AI gateway + Foundry observability) and Amazon Bedrock (Guardrails/inference profiles + CloudWatch/AgentCore). Bedrock is a model-access plane for Bedrock-hosted models, not a neutral multi-provider gateway.
  - **Observability (with a beta gateway):** LangSmith, whose LLM Gateway has been in public beta since July 2026.
  - **Observability:** Arize AX/Phoenix.
  - **Observability + security/guardrails (no traffic gateway):** Fiddler, which enforces inline through gateways the customer already runs.
  - **Data-platform-native observability + output guardrail (not a gateway):** Snowflake Cortex AI.
- **Renames.** Microsoft renamed **Azure AI Foundry to Microsoft Foundry at Ignite 2025**, and older documentation now appears under "Foundry (classic)". Fiddler's **Trust Models are now "Fiddler Centor Models"**. They are the models behind the guardrails service that Fiddler used to market as the "Trust Service", and that service now sits under the "Fiddler AI Control Plane" brand. **"Arize AI Studio" is not a current Arize product name.** Arize's products are **Arize AX** (the managed/enterprise platform, which includes the Alyx agent and Signal) and **Phoenix** (the source-available OSS product). Both are scored together as "Arize".
- **What is scored for the hyperscalers.**
  - Azure = API Management (the AI gateway policies) + Microsoft Foundry observability, evaluations, tracing, guardrails and Content Safety.
  - AWS = Bedrock runtime + Guardrails + cross-region/application inference profiles + IAM-principal cost allocation + CloudWatch GenAI observability + AgentCore Gateway/Observability/Policy/Evaluations.
- Scores reflect **GA or public-beta** capability as of September 2026. Preview or beta features are named and generally scored one notch lower.

---

## Section 1 — Vendor Profiles against the 10 Capabilities

1. Unified Multi-Model Access, Routing & Failover
2. PHI/PII Guardrails & Content Safety at the Edge
3. Identity, Access Control & Quotas
4. Cost Attribution, Budgets & Optimization
5. Semantic & Response Caching
6. End-to-End Tracing (OpenTelemetry GenAI Conventions)
7. Online & Offline Evaluation, Quality Monitoring
8. Compliance-Grade Audit Logging & Retention
9. Agent & MCP Traffic Governance
10. Deployment Portability & Performance Overhead

### 1.1 Azure AI Foundry (Microsoft Foundry) + Azure API Management AI Gateway — *Category: Hyperscaler suite (Gateway + Observability)*

**Context:**
- **Ownership and naming.** Microsoft owns both products. Azure AI Foundry was renamed **Microsoft Foundry** at Ignite 2025 and repositioned as an "AI app and agent factory" alongside Microsoft 365 and Fabric.
- **Gateway.** The AI gateway is a set of **Azure API Management (APIM)** policies. The core policies are GA: `llm-token-limit`, `llm-emit-token-metric`, `llm-semantic-cache-*` and `llm-content-safety`, plus the backend load balancer and circuit breaker. The **Unified Model API** and the **Foundry–APIM integration** (quotas, agent and MCP registration from inside Foundry) are still **preview**.
- **Observability.** Foundry **evaluations, monitoring and tracing reached GA on 17 March 2026**.
- **Analyst position.** Microsoft is recognized in Gartner's 2025 Magic Quadrant for API Management (placement not verified in this pass) and in the 2025/2026 iPaaS Magic Quadrants. We found no evidence that Azure is a named representative vendor in Gartner's AI Gateway Market Guide **(unverified)**.
- **Recent change.** The June 2026 update extended multi-provider support to Anthropic Messages and Google Vertex APIs.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Unified Multi-Model Access, Routing & Failover | The APIM backend load balancer (GA) supports round-robin, weighted, priority and session-aware routing, and the circuit breaker (GA) honors `Retry-After`. APIM fronts Foundry models, Amazon Bedrock, Anthropic Messages, Google Vertex AI and self-hosted endpoints. The Unified Model API (one OpenAI-compatible endpoint) is still preview. Foundry Model Router adds automated per-task model selection within Foundry. | 3 |
| 2 | PHI/PII Guardrails & Content Safety at the Edge | `llm-content-safety` (GA) applies Azure AI Content Safety at the gateway. Foundry guardrails provide Prompt Shields (direct and indirect attacks, GA) and protected-material detection (GA). The **PII** and **Task Adherence** risks are **preview**, and PII supports only *annotate* or *annotate-and-block*, with no in-line redaction. Masking PHI before egress needs a custom APIM policy that calls Azure AI Language PII. | 3 |
| 3 | Identity, Access Control & Quotas | Native Entra ID integration, managed identity (keyless backend access), OAuth credential manager, APIM products and subscriptions as per-team keys. `llm-token-limit` enforces TPM and quotas per subscription, IP or custom key. This is mature enterprise API-management identity. | 4 |
| 4 | Cost Attribution, Budgets & Optimization | `llm-emit-token-metric` sends token counts to Application Insights with custom dimensions (API, user, team). Foundry monitoring tracks token consumption. Chargeback and budgets rely on Azure Cost Management plus custom dashboards, so there is no turnkey per-team dollar budget at the gateway. | 3 |
| 5 | Semantic & Response Caching | `llm-semantic-cache-lookup` and `-store` are GA and back onto Azure Managed Redis or RediSearch. Scoping by `vary-by` expressions allows per-user or per-tenant partitions, which supports PHI-safe design. Cache hit analytics come through APIM or App Insights metrics. | 3 |
| 6 | End-to-End Tracing (OTel GenAI) | Foundry tracing uses OpenTelemetry GenAI semantic conventions and Application Insights. It covers LLM calls, tool invocations and agent decisions for LangChain/LangGraph, OpenAI Agents SDK and Microsoft Agent Framework (GA March 2026). It correlates with Azure Monitor infrastructure telemetry. | 3 |
| 7 | Online & Offline Evaluation, Quality Monitoring | Built-in evaluators cover quality (coherence, fluency), RAG (groundedness, relevance), safety (hate, violence, protected material) and agents (intent resolution, task adherence, tool-call accuracy). Also available: continuous evaluation, scheduled red teaming via the AI Red Teaming Agent (PyRIT), cluster analysis and Azure Monitor alerts. | 3 |
| 8 | Compliance-Grade Audit Logging & Retention | APIM logs prompts and completions to Azure Monitor / Log Analytics, with a built-in dashboard "for billing and compliance auditing". Retention and immutability use Log Analytics and Storage immutability policies. Defender and Purview integration are available for AI posture and DLP. Export to Snowflake needs a pipeline (Event Hub or Storage to Snowpipe). | 3 |
| 9 | Agent & MCP Traffic Governance | APIM governs remote and self-hosted **MCP servers** and **A2A agent APIs**. Foundry guardrails intervene at *tool call* and *tool response* points for agents (preview). The Foundry Control Plane and APIM integration register agents and MCP tools for central governance (preview). | 3 |
| 10 | Deployment Portability & Performance Overhead | APIM runs multi-region with scale units. The self-hosted gateway container exists, but Foundry, evaluations and Content Safety are Azure-only services. Parity of AI policies across the self-hosted gateway and sovereign clouds should be confirmed **(unverified)**. Lock-in to Azure is high. | 2 |

**Pros**
- One vendor covers both halves of the pattern: the APIM gateway plus Foundry tracing and evaluations, with GA core policies (vendor docs).
- Enterprise identity is best in class: Entra ID, managed identity, and products/subscriptions as virtual keys (vendor docs).
- Semantic caching and token limits are GA policies, not custom code (vendor docs; practitioner blog).
- Agent-aware guardrails are available at tool-call and tool-response intervention points (vendor docs).
- The HIPAA BAA is included by default through the Microsoft Product Terms and DPA, with no separate signature (vendor docs).
- The evaluation catalog is rich, including agent-specific evaluators and a scheduled red-teaming agent (vendor docs).

**Cons**
- The PII guardrail is **preview** and blocks or annotates rather than redacting. There is a public feature request for PII input filtering (vendor docs; GitHub discussion).
- The Unified Model API and the Foundry–APIM integration are still preview (vendor docs).
- A global TPM limit set too low throttles every consumer, and IP counter keys are blunt behind NAT, so a tiered design is needed (practitioner blog).
- The Foundry and observability stack is Azure-only, which gives weak portability to AWS/GCP/on-prem (vendor docs).
- HIPAA coverage for **non-Microsoft partner/community models** in Foundry, and for non-text modalities, is not explicitly confirmed (Microsoft Q&A).
- The PaaS surface is large (APIM + Foundry + App Insights + Content Safety + Redis), which increases operational complexity (practitioner blog).

**Pricing:**
- APIM: by tier/units (Basic v2, Standard v2, Premium v2).
- Foundry evaluations: consumption billing.
- App Insights / Log Analytics: ingestion charges.
- Content Safety: per-1K-records charges.

**Healthcare / HIPAA note:** The Microsoft HIPAA BAA applies automatically to covered entities through the Product Terms/DPA. Azure OpenAI (text) is confirmed as covered. Coverage for third-party and community Foundry models and for image/real-time audio modalities is **not explicitly confirmed** (Microsoft Q&A, Aug 2026). The HITRUST-inherited controls are strong. Confirm that APIM, Content Safety and App Insights appear in the "cloud services in audit scope" list for the chosen regions **(unverified for this pass)**.

### 1.2 Amazon Bedrock (Guardrails, Inference Profiles, CloudWatch GenAI Observability, AgentCore) — *Category: Hyperscaler suite (model-access plane + guardrails + observability; tool gateway for agents)*

**Context:**
- **Scope of the "gateway".** Bedrock is AWS's managed model service. Its control-plane pieces are Guardrails, cross-region and application inference profiles, and cost allocation. It is **not a neutral multi-provider LLM gateway**, because routing covers Bedrock-hosted models only.
- **AgentCore (GA 13 Oct 2025).** It adds **AgentCore Gateway**, which turns APIs, Lambda functions and MCP servers into agent tools, along with Identity and **Observability** (OTel to CloudWatch).
- **Recent GA features.**
  - CloudWatch generative-AI observability: GA the same day as AgentCore.
  - **AgentCore Policy** (Cedar; intercepts Gateway tool calls): GA 3 March 2026.
  - **AgentCore Evaluations**: GA 31 March 2026.
- **Cost allocation.** **IAM-principal cost allocation** arrived in April 2026 and was extended to the `bedrock-mantle` endpoint in August 2026.
- **Analyst and reviews.** Amazon Bedrock AgentCore is listed in Gartner Peer Insights' AI Gateways market (4.0, 1 rating). Bedrock rates 4.0/5 on PeerSpot.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Unified Multi-Model Access, Routing & Failover | The Converse API unifies Bedrock models (Anthropic, Meta, Mistral, Amazon and others). System-defined **cross-region (geo and global) inference profiles** spread load across regions for resilience and throughput. There is no native routing or fallback to non-Bedrock providers (Azure OpenAI, Vertex, self-hosted), so cross-provider failover needs a third-party gateway. | 2 |
| 2 | PHI/PII Guardrails & Content Safety at the Edge | **Guardrails** provide content filters, prompt-attack detection, denied topics, **sensitive-information filters (block or mask PII + custom regex)**, contextual grounding, **Automated Reasoning checks** and code-domain protections. The **ApplyGuardrail API** can protect non-Bedrock models and agent frameworks. There are no dedicated clinical/PHI entity types beyond PII and regex **(low confidence)**. | 3 |
| 3 | Identity, Access Control & Quotas | IAM and SCPs give precise model allowlists per role or account. Application inference profiles carry per-team identity. Federation works through Okta or Entra. Per-team **token quotas and budgets are not native**: service quotas apply per account and region, so throttling per team needs a gateway or custom code. | 3 |
| 4 | Cost Attribution, Budgets & Optimization | **Application inference profiles** carry cost-allocation tags into Cost Explorer and CUR (one profile per model). **IAM-principal cost allocation** (Apr 2026) attributes spend to the calling user or role in CUR 2.0 with no extra resources. Per-request metadata tagging with invocation logs is also available. AWS Budgets provides alerts. The finest billed granularity is per usage type per day. | 3 |
| 5 | Semantic & Response Caching | Bedrock offers **prompt caching** (provider-side prefix caching) but no managed **semantic** response cache. A semantic cache has to be built with ElastiCache/MemoryDB vector search or supplied by a third-party gateway. | 1 |
| 6 | End-to-End Tracing (OTel GenAI) | **AgentCore Observability** emits OTel-compatible spans, metrics and logs to CloudWatch. **CloudWatch GenAI observability** (GA Oct 2025) gives dashboards for latency, tokens and errors across Runtime, Gateway, Memory and Identity. It works with Strands, LangChain and LangGraph, and can monitor agents running on-prem or in other clouds. It interoperates with Datadog, Dynatrace, Phoenix, LangSmith and Langfuse. | 3 |
| 7 | Online & Offline Evaluation, Quality Monitoring | **AgentCore Evaluations** (GA Mar 2026) provides built-in evaluators (correctness, faithfulness, helpfulness, harmfulness, stereotyping, tool-selection and tool-parameter accuracy), online evaluation of production traffic and CloudWatch alerts. Bedrock model evaluation covers offline and LLM-as-judge comparisons. | 3 |
| 8 | Compliance-Grade Audit Logging & Retention | Model invocation logging goes to S3 and CloudWatch, and CloudTrail records API activity. S3 Object Lock provides immutability. Landing to S3 makes Snowflake ingestion (Snowpipe/external tables) straightforward. Caveat: invocation logging covers only the `bedrock-runtime` path, which leaves gaps for other endpoints. | 3 |
| 9 | Agent & MCP Traffic Governance | **AgentCore Gateway** mediates MCP and tool traffic with OAuth/IAM. **Policy** (Cedar, authored in natural language) intercepts each tool call and defaults to deny. It now integrates with Guardrails (June 2026). A2A support was introduced at GA. This is scoped to agents built on or registered with AgentCore. | 3 |
| 10 | Deployment Portability & Performance Overhead | Managed and AWS-only; there is no self-hosted Bedrock or Guardrails. AgentCore Observability can ingest telemetry from agents outside AWS, but enforcement lives in AWS. VPC and PrivateLink are supported. Cross-region inference needs data-residency review. | 1 |

**Pros**
- Guardrails are broad, and the **ApplyGuardrail API** works for non-Bedrock models, so it can serve as a shared PII/safety service (vendor docs).
- IAM-principal and inference-profile cost allocation give strong FinOps with no gateway required (vendor docs; practitioner blog).
- AgentCore Policy (Cedar) adds deterministic, auditable tool-call authorization for agents (vendor docs; practitioner blog).
- CloudWatch GenAI observability costs nothing beyond standard CloudWatch pricing and accepts OTel (vendor docs).
- One AWS BAA covers Bedrock and AgentCore, both HIPAA-eligible, with HITRUST in scope (vendor docs; Aptible).
- Invocation logs in S3 are easy to land in Snowflake (vendor docs).

**Cons**
- It is not a multi-provider gateway: there is no routing or fallback to Azure OpenAI, Vertex or on-prem models (vendor docs).
- There is no managed semantic cache, and per-team token quotas are not native (vendor docs).
- Reviewers report complex multi-service setup, integration difficulty and documentation gaps (PeerSpot).
- Cost opacity and "unexpected charges" appear in reviews (PeerSpot).
- The capability is spread across many services (Bedrock, Guardrails, CloudWatch, AgentCore, CUR), which adds to the rationalization burden (practitioner blog).
- Cross-region inference may process PHI outside the home region, so residency must be validated (Aptible).

**Pricing:**
- Pay-per-token by model; Guardrails per text unit per policy.
- AgentCore: consumption-based.
- CloudWatch: standard telemetry pricing.
- Cost allocation features: no extra charge.

**Healthcare / HIPAA note:** Bedrock and **AgentCore are HIPAA-eligible** under the standard AWS BAA, and AgentCore also lists SOC, ISO, FedRAMP and HITRUST. Caveats:
- Some newer models may be excluded from BAA coverage (per Aptible; verify against the AWS HIPAA Eligible Services list).
- Cross-region routing expands PHI processing locations.
- Invocation-logging gaps.
- Tools that agents call may need their own BAAs.

### 1.3 Kong AI Gateway — *Category: Gateway (LLM + MCP + A2A "full AI data path")*

**Context:**
- **Company and product.** Kong Inc. is privately held and was valued at about $2B in 2024 per a third-party review. Kong AI Gateway is a set of plugins on Kong Gateway, managed through **Kong Konnect** (a SaaS control plane with self-hosted, hybrid or dedicated data planes).
- **Releases.**
  - **3.13** (18 Dec 2025): MCP tool-level ACLs, Lakera guardrails and circuit breakers.
  - **3.14** (14 Apr 2026): **Kong Agent Gateway** (A2A), RFC 8693 token exchange, scope-based MCP tool filtering, model aliases and per-model token budgets.
- **Analyst position.**
  - Named a **Leader in the Gartner 2025 Magic Quadrant for API Management** for the sixth straight year, positioned furthest on Completeness of Vision.
  - Distributes Gartner's **Market Overview for AI Gateways** (May 2026). That report calls MCP gateway support "a mandatory feature" and predicts the market will grow from under $250M to $1B by 2028.
  - Kong's inclusion as a *representative vendor* in the Oct 2025 **Market Guide for AI Gateways** is **unverified**.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Unified Multi-Model Access, Routing & Failover | AI Proxy Advanced offers one API across OpenAI, Anthropic (native SDK), Azure, Bedrock, Vertex/Gemini, Databricks, DeepSeek, xAI, Cerebras and self-hosted **vLLM**. It supports semantic load balancing with classification-aware failover, least-connections, circuit breakers (3.13) and **model aliases** such as "cheap" or "powerful" (3.14). | 4 |
| 2 | PHI/PII Guardrails & Content Safety at the Edge | **AI PII Sanitizer** (Enterprise) redacts 18+ types, including **medical identifiers**, SSN and custom regex, in requests *and* responses, using placeholder or synthetic replacement. It runs as a local container, so data does not leave for detection. Also available: AI Prompt Guard, Semantic Prompt Guard and Semantic Response Guard, plus plugins for **AWS Guardrails, Azure Content Safety, GCP Model Armor and Lakera**. Fiddler lists Kong as a guardrail integration. Clinical PHI recall needs PoC validation. | 3 |
| 3 | Identity, Access Control & Quotas | Kong provides OIDC/OAuth2, JWT, consumers and consumer groups, and ACLs. **AI Rate Limiting Advanced** sets token budgets per consumer, per model and globally (e.g., "1M tokens/day, max 200K on GPT-4o"). OAuth2 scope-based tool filtering and RFC 8693 token down-scoping cover agents. | 4 |
| 4 | Cost Attribution, Budgets & Optimization | Konnect analytics dashboards show token usage, latency and cost. Kong also offers token-based metering and billing, per-agent token cost allocation (Agent Gateway), hard token budgets, the **AI Prompt Compressor**, and cheap-model routing through aliases. | 3 |
| 5 | Semantic & Response Caching | **AI Semantic Cache** (Enterprise) does exact and semantic caching on Redis/Valkey (8.0+) or pgvector, with TTL through cache-control headers and hit/miss/bypass headers. Per-consumer cache scoping is not explicit in the docs, so it must be designed carefully for PHI **(low confidence)**. | 3 |
| 6 | End-to-End Tracing (OTel GenAI) | The OpenTelemetry plugin emits **gen_ai span attributes and OTLP metrics** for AI traffic across LLM, MCP and A2A hops, and adds the gateway hop to distributed traces. Kong is a telemetry *source*, not a trace-analysis or debugging backend. | 2 |
| 7 | Online & Offline Evaluation, Quality Monitoring | There are no native quality evaluators (faithfulness, relevance, task success). Operational metrics (latency, errors, tokens) are available, and response guards act as policy rather than evaluation. An observability or evaluation layer is required. | 1 |
| 8 | Compliance-Grade Audit Logging & Retention | AI audit logs can include payloads, and log plugins (HTTP, Kafka, Datadog, file, syslog) feed a SIEM or Snowflake through Kafka/Snowpipe Streaming. The Agent Gateway provides "full audit logging for compliance". Immutability and retention depend on the sink. | 3 |
| 9 | Agent & MCP Traffic Governance | **MCP Gateway** features: autogenerating MCP from APIs, MCP OAuth2, tool-level ACLs and scope-based filtering, and an MCP Registry in Konnect. The **Agent Gateway (A2A)** adds identity, prompt-injection inspection, per-agent cost and zero-trust token exchange across hops. Among assessed vendors, this is the most complete coverage of LLM, MCP and A2A. | 4 |
| 10 | Deployment Portability & Performance Overhead | Kong has an OSS core and data planes that run anywhere (Kubernetes, VMs, on-prem, any cloud) with a Konnect or self-managed control plane. Kong's own benchmark (Jul 2025, a competitor-comparison run with no policies) reports about 65% lower P95/P99 latency than Portkey and about 86% lower than LiteLLM. A third party cites sub-10 ms overhead. | 4 |

**Pros**
- It covers the full AI data path (LLM + MCP + A2A) in one runtime, which matches Gartner's view that MCP support is mandatory (vendor docs; Gartner).
- Deployment is the most portable in the set: self-hosted data planes keep PHI inside the enterprise perimeter on any cloud or on-prem (vendor docs).
- The AI PII Sanitizer runs locally, and native plugins front AWS, Azure and GCP guardrails, so one control point can serve multiple clouds (vendor docs).
- Throughput and latency are high, with a large plugin ecosystem (vendor benchmark; nolist.ai review).
- It is a Gartner MQ Leader for API management, so enterprise API and AI governance can converge on one platform (Gartner via Kong press release).
- Token budgets can be set per model, and compression and aliases support FinOps (vendor docs).

**Cons**
- Most AI plugins (PII Sanitizer, Semantic Cache, AI Rate Limiting Advanced, load balancing) are **Enterprise/Konnect-only**, not in the OSS core (vendor docs; Kosmoy — competitor).
- It adds no evaluation and only emits tracing, so it needs a separate observability tool (vendor docs).
- A reviewer calls it "heavyweight compared to purpose-built AI proxies", and it requires Lua and declarative-config skills (nolist.ai review; TrueFoundry — competitor).
- Request-based pricing can inflate costs for chatty agent workloads (TrueFoundry — competitor).
- It governs only the traffic that passes through it, with no AI inventory or EU AI Act evidence (Kosmoy — competitor).
- The public HIPAA/BAA posture is not documented; the trust center does not list it publicly (vendor trust center; Kong Nation).

**Pricing:**
- Konnect Plus: per gateway per month; includes AI Gateway token rate limiting and semantic caching.
- Enterprise: custom annual pricing. Third parties estimate about $105/service/month plus about $34/1M requests on Konnect, and self-hosted enterprise contracts often above $50K/year (TrueFoundry — competitor).

**Healthcare / HIPAA note:** We found **no public confirmation that Kong signs a BAA for Konnect** **(unverified)**. With **self-hosted data planes**, prompts and responses stay in the enterprise VPC and only configuration and analytics metadata reach the Konnect SaaS, which limits PHI exposure. Disable payload logging to Konnect analytics or use a self-managed control plane. Confirm with Kong whether a BAA is offered and what telemetry leaves the data plane.

### 1.4 LangSmith (LangChain) — *Category: Observability / LLMOps (with a beta LLM Gateway)*

**Context:**
- **Company.** LangChain Inc. raised a **$125M Series B at a $1.25B valuation (Oct 2025, led by IVP)** and released LangChain/LangGraph 1.0 plus the LangSmith **Insights Agent**.
- **Product.** LangSmith is framework-agnostic tracing, evaluation, monitoring and deployment, with SDKs in Python, TypeScript, Go and Java plus OTel ingestion.
- **LLM Gateway.** Announced **May 2026** and in **public beta since 30 July 2026**. It offers one key across providers, spend limits, PII and secrets redaction, and traces. Self-hosted gateway support is "coming".
- **Analyst and reviews.** Gartner Peer Insights lists LangSmith in the **AI Evaluation and Observability Platforms** market (4.4/5, 25 ratings). G2 rates it 4.4/5 (79 reviews). Inclusion in the Feb 2026 Gartner Market Guide is **unverified**.
- **Recent changes.** Extended trace retention in SaaS was **capped at 180 days** (Sep 2026), and gateway traces stopped capturing content by default (Aug 2026).

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Unified Multi-Model Access, Routing & Failover | The **LLM Gateway (beta)** translates OpenAI Chat Completions, Anthropic Messages and OpenAI Responses formats and switches providers by model ID. Bedrock IAM roles have been supported since Aug 2026. Policy-based routing, fallback and load balancing are not documented. | 1 |
| 2 | PHI/PII Guardrails & Content Safety at the Edge | The gateway (beta) detects and redacts PII and secrets before requests reach models *or traces*. The GA path is client-side SDK masking (`hide_inputs/outputs`, regex anonymizer, Presidio, Amazon Comprehend), which needs developer code. There is no prompt-injection or moderation enforcement. | 1 |
| 3 | Identity, Access Control & Quotas | SSO/SAML, RBAC, workspaces and service keys are available, and service keys can no longer grant admin (Sep 2026). The gateway (beta) adds hard spend caps and rate limits at org, workspace, user or API-key level. There are no model allowlists by data class. | 2 |
| 4 | Cost Attribution, Budgets & Optimization | Per-trace token and cost tracking with dashboards; the gateway (beta) adds real-time spend by workspace, user or key with hard caps. Alerts go to webhooks or PagerDuty. There are no routing or compression levers. | 3 |
| 5 | Semantic & Response Caching | Not offered. | 0 |
| 6 | End-to-End Tracing (OTel GenAI) | This is a category leader for agent tracing: step-level trace waterfalls, multi-agent and LangGraph trajectories, and the SmithDB trace store. It **ingests OTel GenAI semantic-convention attributes** through OTLP and has native SDKs for OpenAI, Anthropic, Vercel AI, LlamaIndex and Claude SDK. Tracing is asynchronous and adds no request latency. | 4 |
| 7 | Online & Offline Evaluation, Quality Monitoring | Datasets, experiments, online LLM-as-judge evaluators, annotation queues (new APIs Aug 2026), trajectory evaluations, and the **Insights** agent for unsupervised clustering of failure modes. Reviewers consistently call evaluation and dataset workflows a strength. | 4 |
| 8 | Compliance-Grade Audit Logging & Retention | Extended retention is now capped at 180 days in SaaS. Admin-action audit logs are available (and a gateway audit log). Data export exists, but logs are not immutable and there is no legal hold. Long-term HIPAA retention requires export to Snowflake or S3. | 2 |
| 9 | Agent & MCP Traffic Governance | Deep *visibility* into agent tool calls and trajectories, and gateway policy violations surface as traceable events through LangSmith Engine. There is no inline MCP tool allowlisting or A2A enforcement. | 2 |
| 10 | Deployment Portability & Performance Overhead | SaaS instances run on GCP (US, EU, APAC) and AWS US. **BYOC and self-hosted on Kubernetes** are available on the Enterprise plan only. Async tracing keeps overhead low. The product is proprietary and not OSS. | 3 |

**Pros**
- Among the best-rated tracing and debugging for agents, which "saved me from hours of blind debugging" (G2; Gartner Peer Insights).
- The evaluation workflow is strong: datasets, experiments, online judges and annotation queues (vendor docs; Gartner Peer Insights).
- It ingests OTel GenAI conventions, so it is not tied to the LangChain framework (vendor docs).
- The company is financially strong after the $1.25B Series B, and 35% of the Fortune 500 use LangChain services (vendor blog).
- Self-hosted and BYOC options keep PHI in the customer environment (vendor docs).
- The LLM Gateway beta could later merge gateway spend control and tracing (vendor blog).

**Cons**
- The gateway is **beta**, with no documented fallback, caching or MCP gateway, and no self-hosted support yet (vendor docs).
- There is a steep learning curve with many concepts (projects, runs, datasets, experiments) (G2; Gartner Peer Insights).
- Costs rise with trace volume and seats (G2; Inference.net).
- SaaS extended retention is capped at 180 days, which is too short for HIPAA audit without export (vendor changelog).
- Self-hosting is available only on the custom-priced Enterprise plan (Inference.net).
- It is perceived as LangChain-centric, and competitors position against it on openness and cost (Langfuse — competitor; SigNoz — competitor).

**Pricing:**
- Developer: free (1 seat, 5K base traces).
- Plus: $39/seat/month.
- Traces: base $2.50/1K (14-day retention); extended $5.00/1K (400-day, now capped at 180 days in SaaS).
- Enterprise: custom.

**Healthcare / HIPAA note:** The LangSmith docs state the service is **"HIPAA compliant"** and SOC 2 Type 2 certified, and a LangChain post announced HIPAA compliance. BAA availability and which regions or plans it covers are not stated publicly, so confirm with LangChain; the BAA is most likely Enterprise-only **(unverified)**. Self-hosted Enterprise is the lowest-risk option for PHI traces.

### 1.5 Arize AI (Arize AX + Phoenix) — *Category: Observability / Evaluation*

**Context:**
- **Naming.** Arize AI was founded in 2020. The user's term "Arize AI Studio" does not match any current product. The products are **Arize AX**, the enterprise platform (which includes the **Alyx** AI-engineering agent, **Signal** issue detection and the **adb** trace datastore), and **Phoenix**, which is source-available under the Elastic License 2.0, has 10K+ GitHub stars and is built on **OpenInference/OpenTelemetry**.
- **Funding.** Arize raised a **$70M Series C in February 2025**.
- **2026 releases.** Signal and managed agents became GA (Jul 2026). Agent-as-a-Judge and voice-agent observability arrived in June 2026. OTLP project routing and prompt-cache-aware cost tracking arrived in August 2026. Alyx long-term memory arrived in September 2026.
- **Analyst position.** Arize is widely cited as an AI evaluation and observability leader, but its inclusion in the Feb 2026 Gartner Market Guide is **unverified** in this pass.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Unified Multi-Model Access, Routing & Failover | Not a gateway. REST API v2 can call Bedrock, Vertex, NIM and OpenAI-compatible endpoints *for evaluations and playground only*. | 0 |
| 2 | PHI/PII Guardrails & Content Safety at the Edge | No inline enforcement point. PII and toxicity evaluators, plus span masking in OpenInference instrumentation, provide detection after the fact. Guardrail integrations exist through partners **(low confidence)**. | 1 |
| 3 | Identity, Access Control & Quotas | Enterprise SSO, advanced RBAC, multiple orgs and spaces, and service keys bound to several orgs (Jul 2026). These govern access to the *platform*, not to AI traffic, and there are no quotas or model allowlists. | 1 |
| 4 | Cost Attribution, Budgets & Optimization | Per-span token and cost tracking, including prompt-cache read/write breakdown (Aug 2026), with dashboards and custom metrics. There is no budget enforcement. | 2 |
| 5 | Semantic & Response Caching | Not offered. | 0 |
| 6 | End-to-End Tracing (OTel GenAI) | **OpenInference** is OTel-native, and Arize maintains an open instrumentation standard for 40+ frameworks and providers. Generic OTLP/HTTP ingestion supports header-based project routing, and traces are multimodal (image, voice, PDF). Phoenix and AX share the same instrumentation, so dev and prod stay portable. | 4 |
| 7 | Online & Offline Evaluation, Quality Monitoring | Online evaluations (AX), span, trace and session evals, Agent-as-a-Judge, experiments, annotation queues, **Signal** (ranked production issues with proposed fixes) and the **Alyx** agent that automates debugging. It also carries drift and bias monitoring from Arize's ML heritage. | 4 |
| 8 | Compliance-Grade Audit Logging & Retention | Enterprise gets flexible retention and audit logs. The **adb datastore integrates natively with Snowflake, Databricks and BigQuery**, and the SDK/REST can export traces (`client.traces.list`, Aug 2026). Immutability and legal hold are not documented. | 2 |
| 9 | Agent & MCP Traffic Governance | Agent graph and trajectory visualization, session-level evals and tool-selection evaluation. There is no inline tool allowlisting or loop protection. | 2 |
| 10 | Deployment Portability & Performance Overhead | Phoenix is self-hosted (Docker/Kubernetes) and free under ELv2. **AX Enterprise offers SaaS *or self-hosted* deployment**. Tracing is asynchronous. The adb scale claims ("1 trillion spans") are vendor-published. | 3 |

**Pros**
- Its open, OTel-native instrumentation (OpenInference) gives the lowest telemetry lock-in of the observability vendors (vendor docs; AppSec Santa review).
- The Phoenix OSS to AX upgrade path lets pilots use free tooling and production use the same traces (Atlan; vendor docs).
- The adb datastore integrates natively with **Snowflake**, which fits the enterprise data platform (vendor site).
- Evaluation depth is strong: online evals, Agent-as-a-Judge, Signal and Alyx (vendor changelog).
- It has broad compliance: SOC 2 Type II, ISO 27001, HIPAA and PCI (vendor trust center).
- Unlimited users on every plan avoids seat-based cost growth (vendor pricing).

**Cons**
- It offers no gateway, enforcement, caching or quotas, so it needs a separate gateway (vendor docs).
- Reviewers describe an engineer-centric UI and a steep learning curve (Voiceflow).
- Enterprise pricing is opaque, with third-party estimates of $50K–$100K+ per year (Voiceflow; AppSec Santa).
- Its scale claims are vendor-published and not independently benchmarked (AppSec Santa).
- The Phoenix ELv2 license forbids offering it as a managed service, which is fine for internal use but is not OSI open source (Atlan).
- The HIPAA certification post dates from 2022, so current BAA terms must be confirmed (vendor blog).

**Pricing:**
- Phoenix: free.
- AX Free: 25K spans/month, 15-day retention.
- AX Pro: $50/month (50K spans, 30-day retention).
- AX Enterprise: custom; self-hosted deployment, SSO, audit logs and HIPAA are Enterprise-only.

**Healthcare / HIPAA note:** The Arize trust center lists **HIPAA compliance** (plus SOC 2 Type II, ISO 27001, PCI and GDPR), and HIPAA-grade compliance is limited to the **Enterprise** plan. BAA signature is implied but not stated publicly, so confirm it. Self-hosted AX or Phoenix keeps PHI traces inside the perimeter.

### 1.6 Fiddler AI (AI Observability & Security / AI Control Plane) — *Category: Observability + Security/Guardrails (enforces inline through third-party gateways)*

**Context:**
- **Company and positioning.** Fiddler AI is a privately held company with ML-monitoring roots. It now positions itself as **"the AI Control Plane for enterprises"**, combining evaluations, agentic observability, guardrails (policy enforcement) and AI GRC.
- **Guardrail models.** The guardrails and evaluators run on **Fiddler Centor Models** (formerly Trust Models, previously marketed as the Trust Service). They are small, fine-tuned models that run **inside the customer environment** with **<80 ms** latency and cover 35+ PII entities plus HIPAA-specific PHI entities.
- **2026 releases.** Guardrails for AgentGateway with in-place masking (Aug 2026), a Fiddler MCP Server and 140+ semantic mappings (Aug 2026), multi-application OTel trace routing (Sep 2026), and a Claude Code plugin (private preview).
- **Analyst position.** Fiddler cites **Gartner's Market Guide for AI Evaluation and Observability Platforms (Feb 2026)**, **Forrester's Agentic Control Plane Solutions Landscape (Q2 2026)** and **IDC's GenAI Governance Platforms (2025)**. These come from the vendor site and were not independently verified.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Unified Multi-Model Access, Routing & Failover | Not a traffic gateway. Its "LLM Gateway catalog" is the model list used to run evaluators, not an application routing plane. | 0 |
| 2 | PHI/PII Guardrails & Content Safety at the Edge | Guardrails cover jailbreak and prompt injection ("99% precision" vendor claim), toxicity and safety, faithfulness, secrets, and **PII + PHI (medications, conditions, insurance IDs) + custom entities**, with <80 ms latency and **zero data egress**. They enforce inline on requests *and* responses, including tool responses, through the customer's gateway (Kong and AgentGateway integrations, with in-place masking). This is the most PHI-specific detection in the set. | 4 |
| 3 | Identity, Access Control & Quotas | RBAC and SSO for the platform only; no traffic quotas, virtual keys or model allowlists. | 1 |
| 4 | Cost Attribution, Budgets & Optimization | Token and cost data come in through OTel attributes and the **LiteLLM integration** ("unified LLM cost tracking"). Centor models cut *evaluation* cost ("up to 98%" vendor claim). There are no budgets or chargeback features. | 1 |
| 5 | Semantic & Response Caching | Not offered. | 0 |
| 6 | End-to-End Tracing (OTel GenAI) | Native OTel ingestion aligned with GenAI conventions (`gen_ai.agent.*`, `gen_ai.conversation.id`), with application → session → agent → trace → span hierarchy. Dedicated LangGraph and Strands SDKs, plus Bedrock and Google ADK support. Multi-app trace routing arrived Sep 2026. | 3 |
| 7 | Online & Offline Evaluation, Quality Monitoring | 80+ out-of-the-box metrics (hallucination, faithfulness, toxicity, PII leakage), LLM-as-judge and bring-your-own-judge, experiments, RAG health metrics, span annotations (preview), alerts and backtesting. Drift monitoring carries over from its ML-observability heritage. | 3 |
| 8 | Compliance-Grade Audit Logging & Retention | "Auditable governance" with evidence trails aligned to **HIPAA, SR 11-7, NAIC and the EU AI Act**. Human approval gates are available, and on-prem deployment keeps logs in the enterprise. The Snowflake integration is **ingest-only** (Snowflake → Fiddler), so export to Snowflake needs a pipeline. | 3 |
| 9 | Agent & MCP Traffic Governance | Agentic alerts and root-cause analysis, guardrails at tool-response points, and "MCP boundary enforcement extending to IDEs and CLIs" (vendor claim). Enforcement relies on the gateway integration. | 2 |
| 10 | Deployment Portability & Performance Overhead | SaaS, **VPC, on-prem and AWS GovCloud** deployments, with in-environment guardrail models (<80 ms, no egress). The product is proprietary, with no OSS core. | 3 |

**Pros**
- It has **PHI-specific** detection, including medical and insurance entities, running inside the VPC with no data egress, which is the strongest PHI-at-the-edge story (vendor docs).
- The guardrails work with the gateway you already run (Kong, AgentGateway), so they complement rather than replace a gateway (vendor changelog).
- It deploys on-prem, in a VPC and in GovCloud, which suits regulated industries (vendor site).
- In-environment evaluator models lower eval cost and keep PHI out of external LLM judges (vendor docs).
- One platform covers ML, LLM and agent monitoring, which helps with model-risk management (SR 11-7) (vendor docs).
- It is recognized in Gartner, Forrester and IDC landscapes, per the vendor's own site (vendor site).

**Cons**
- It has no routing, caching or quotas, and depends on a third-party gateway for enforcement (vendor docs).
- Cost attribution is basic and relies on a LiteLLM integration (vendor docs).
- The Snowflake connector is ingest-only; telemetry export to Snowflake has to be built (vendor docs).
- It has a smaller developer community and less third-party review volume than LangSmith or Arize, with few G2/PeerSpot data points found (research gap).
- The heavy product rebranding (Trust Service → Trust Models → Centor; Observability → Control Plane) makes it harder to evaluate (vendor site).
- Accuracy claims (99% precision, 66% fewer incorrect responses) are vendor-published (vendor site).

**Pricing:**
- Free guardrails tier.
- Developer: $0.002 per trace (SaaS).
- Enterprise: custom pricing (VPC/on-prem, enterprise guardrails).
- A TCO calculator is available.

**Healthcare / HIPAA note:** The Fiddler security page lists **SOC 2 Type II, HIPAA compliance and BAA**, plus ISO and FedRAMP mentions. Customer-VPC and on-prem deployment means PHI need never leave the enterprise. It is explicitly marketed to healthcare. Confirm the BAA scope for SaaS versus self-managed deployment.

### 1.7 Ref: Snowflake Cortex AI (AI Observability + Cortex Guard) — *Reference only, not ranked. Category: Data-platform-native observability + output guardrail (not a gateway)*

**Context:**
- **What it offers.** Snowflake Cortex AI runs models (Anthropic, OpenAI, Meta, Mistral and others) "inside Snowflake's security and governance perimeter".
- **AI Observability** is built on **TruLens**. It stores traces in `AI_OBSERVABILITY_EVENTS`, auto-logs Cortex Agents threads and spans, and supports batch evaluations. External apps can stream telemetry into the account through TruLens and External Agent objects.
- **Cortex Guard** is the `guardrails` option on `AI_COMPLETE` and filters unsafe responses. Snowflake now groups it under "Cortex AI Guardrails". The underlying model is Llama Guard **(unverified)**.
- **AI_REDACT** (GA) redacts 12 PII categories but no health categories.
- **Cross-region inference** is controlled by `CORTEX_ENABLED_CROSS_REGION`.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Unified Multi-Model Access, Routing & Failover | Multi-provider models through one SQL/REST surface, with cross-region routing by account parameter. There is no policy-based fallback, and it covers only models hosted by Snowflake. | 2 |
| 2 | PHI/PII Guardrails & Content Safety at the Edge | Cortex Guard filters harmful outputs, and AI_REDACT covers PII without clinical entities. It does not govern non-Snowflake traffic. | 2 |
| 3 | Identity, Access Control & Quotas | Snowflake RBAC (the `CORTEX_USER` and `AI_FUNCTIONS_USER` roles, `USE AI FUNCTIONS`), a model allowlist parameter **(unverified)**, and resource budgets. | 3 |
| 4 | Cost Attribution, Budgets & Optimization | `CORTEX_AI_FUNCTIONS_USAGE_HISTORY` and `CORTEX_AGENT_USAGE_HISTORY` views, per-request cost in observability, plus budgets and alerts. | 3 |
| 5 | Semantic & Response Caching | No LLM semantic cache documented. | 0 |
| 6 | End-to-End Tracing (OTel GenAI) | TruLens (OTel-based) traces for Snowflake-hosted and external apps, plus Cortex Agents spans. It is not a general-purpose, cross-stack trace backend. | 2 |
| 7 | Online & Offline Evaluation, Quality Monitoring | Batch evaluations (TruLens RAG triad: context relevance, groundedness, answer relevance) and an Agents Evaluations tab. Online evaluation is limited. | 2 |
| 8 | Compliance-Grade Audit Logging & Retention | Traces and usage land natively in governed Snowflake tables (Horizon governance, retention and Time Travel), so this is the natural long-term audit sink for every other vendor. | 3 |
| 9 | Agent & MCP Traffic Governance | Cortex Agents only, with no cross-platform MCP or A2A policy. | 1 |
| 10 | Deployment Portability & Performance Overhead | Runs on AWS, Azure and GCP through Snowflake, with no self-hosting. Inference payloads stay transient in the processing region. | 2 |

**Profile:** Snowflake is **not a replacement** for the gateway or the enterprise observability layer. Its strategic role is as **(a)** the governed telemetry and audit sink (capability 8) and **(b)** the native observability for Cortex Agents and Cortex AI workloads. **HIPAA:** Snowflake signs BAAs for Business Critical edition accounts **(unverified in this pass)**, and GA Cortex AI functions are "Covered AI Features". Do not enable `ANY_REGION` cross-region inference for PHI workloads without a residency review.

---

## Section 2 — Comparison: Gateway, Observability Feature Scoring Template (0 to 4 Scale)

Each capability is weighted 10%. Weighted score = score × 0.10. Total = sum of weighted scores (max 4.00). Normalized % = Total ÷ 4.

### 2.1 Raw scores (0–4)

| # | Capability | Description & Evaluation Focus | Weight | Azure (APIM + Foundry) | Amazon Bedrock | Kong AI Gateway | LangSmith | Arize (AX + Phoenix) | Fiddler AI | Ref: Snowflake Cortex AI |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Multi-Model Routing & Failover | One API, policy-based routing, fallback, load balancing, version pinning. | 10% | 3 | 2 | 4 | 1 | 0 | 0 | 2 |
| 2 | PHI Guardrails & Content Safety | Inline PHI redaction, prompt-injection detection, output moderation. | 10% | 3 | 3 | 3 | 1 | 1 | 4 | 2 |
| 3 | Identity, Access & Quotas | SSO, virtual keys per team, model allowlists by data class, limits. | 10% | 4 | 3 | 4 | 2 | 1 | 1 | 3 |
| 4 | Cost Attribution & Budgets | Token/cost by app/team/domain, budgets, alerts, chargeback. | 10% | 3 | 3 | 3 | 3 | 2 | 1 | 3 |
| 5 | Semantic Caching | Exact + semantic caching, PHI-safe scoping, hit analytics. | 10% | 3 | 1 | 3 | 0 | 0 | 0 | 0 |
| 6 | OTel GenAI Tracing | Traces across LLM, retrieval, tool/MCP and agent hops. | 10% | 3 | 3 | 2 | 4 | 4 | 3 | 2 |
| 7 | Evaluation & Quality Monitoring | Online/offline evaluators, feedback, drift/regression detection. | 10% | 3 | 3 | 1 | 4 | 4 | 3 | 2 |
| 8 | Audit Logging & Retention | Immutable prompt/response logs, PHI masking, SIEM/Snowflake export. | 10% | 3 | 3 | 3 | 2 | 2 | 3 | 3 |
| 9 | Agent & MCP Traffic Governance | Tool allowlists, agent anomaly detection, loop/runaway protection. | 10% | 3 | 3 | 4 | 2 | 2 | 2 | 1 |
| 10 | Deployment Portability & Overhead | Self-host/BYOC, open-source core, HA, low added latency. | 10% | 2 | 1 | 4 | 3 | 3 | 3 | 2 |
| | **Sum of raw scores (max 40)** | | | **30** | **25** | **31** | **22** | **19** | **20** | **20** |

### 2.2 Weighted scores (Score × Weight) and totals

| # | Capability | Azure (APIM + Foundry) | Amazon Bedrock | Kong AI Gateway | LangSmith | Arize (AX + Phoenix) | Fiddler AI | Ref: Snowflake Cortex AI |
|---|---|---|---|---|---|---|---|---|
| 1 | Multi-Model Routing & Failover | 0.30 | 0.20 | 0.40 | 0.10 | 0.00 | 0.00 | 0.20 |
| 2 | PHI Guardrails & Content Safety | 0.30 | 0.30 | 0.30 | 0.10 | 0.10 | 0.40 | 0.20 |
| 3 | Identity, Access & Quotas | 0.40 | 0.30 | 0.40 | 0.20 | 0.10 | 0.10 | 0.30 |
| 4 | Cost Attribution & Budgets | 0.30 | 0.30 | 0.30 | 0.30 | 0.20 | 0.10 | 0.30 |
| 5 | Semantic Caching | 0.30 | 0.10 | 0.30 | 0.00 | 0.00 | 0.00 | 0.00 |
| 6 | OTel GenAI Tracing | 0.30 | 0.30 | 0.20 | 0.40 | 0.40 | 0.30 | 0.20 |
| 7 | Evaluation & Quality Monitoring | 0.30 | 0.30 | 0.10 | 0.40 | 0.40 | 0.30 | 0.20 |
| 8 | Audit Logging & Retention | 0.30 | 0.30 | 0.30 | 0.20 | 0.20 | 0.30 | 0.30 |
| 9 | Agent & MCP Traffic Governance | 0.30 | 0.30 | 0.40 | 0.20 | 0.20 | 0.20 | 0.10 |
| 10 | Deployment Portability & Overhead | 0.20 | 0.10 | 0.40 | 0.30 | 0.30 | 0.30 | 0.20 |
| **TOTALS** | **Sum of weighted scores (max 4.0)** | **3.00** | **2.50** | **3.10** | **2.20** | **1.90** | **2.00** | **2.00** |
| | **Normalized to 100%** | **75.0%** | **62.5%** | **77.5%** | **55.0%** | **47.5%** | **50.0%** | **50.0%** |
| | **Rank** | 2 | 3 | 1 | 4 | 6 | 5 | (reference) |

*Arithmetic check:*
- Kong: 4+3+4+3+3+2+1+3+4+4 = 31 → 3.10 → 77.5%
- Azure: 3+3+4+3+3+3+3+3+3+2 = 30 → 3.00 → 75.0%
- Bedrock: 2+3+3+3+1+3+3+3+3+1 = 25 → 2.50 → 62.5%
- LangSmith: 1+1+2+3+0+4+4+2+2+3 = 22 → 2.20 → 55.0%
- Fiddler: 0+4+1+1+0+3+3+3+2+3 = 20 → 2.00 → 50.0%
- Arize: 0+1+1+2+0+4+4+2+2+3 = 19 → 1.90 → 47.5%
- Snowflake (ref): 2+2+3+3+0+2+2+3+1+2 = 20 → 2.00 → 50.0%

**Combination view (best score per capability across a gateway + observability pair).** This is more meaningful for Pattern 6 than single-product ranks.

| Pairing | Per-capability max (1–10) | Sum | Total | % |
|---|---|---|---|---|
| Kong + LangSmith | 4,3,4,3,3,4,4,3,4,4 | 36 | 3.60 | 90.0% |
| Kong + Arize | 4,3,4,3,3,4,4,3,4,4 | 36 | 3.60 | 90.0% |
| Kong + Fiddler | 4,4,4,3,3,3,3,3,4,4 | 35 | 3.50 | 87.5% |
| Azure APIM + Arize | 3,3,4,3,3,4,4,3,3,3 | 33 | 3.30 | 82.5% |
| Azure (single suite) | — | 30 | 3.00 | 75.0% |

### 2.3 Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Azure (APIM + Foundry) | Amazon Bedrock | Kong AI Gateway | LangSmith | Arize (AX + Phoenix) | Fiddler AI | Ref: Snowflake Cortex AI |
|---|---|---|---|---|---|---|---|---|
| Single Control Point | Can all pilot and production AI traffic be routed through this layer? | **Medium risk.** Yes for Azure and many external providers through APIM; weaker for on-prem/AWS-native traffic. | **High risk.** Only Bedrock-hosted models; tools through AgentCore Gateway. | **Low risk.** Any provider, any cloud, including MCP and A2A. | **High risk.** Gateway is beta; observes only instrumented apps. | **N/A (high).** Observability only. | **N/A (medium).** Enforces through the customer's gateway. | **High risk.** Snowflake-hosted AI only. |
| PHI Egress | Can we guarantee PHI is redacted or restricted before reaching external models? | **Partial.** Content Safety GA; PII filter preview and block-only; redaction needs custom policy. | **Pass (with config).** Guardrails mask PII; ApplyGuardrail works for any model; watch cross-region. | **Pass (with PoC).** Local PII Sanitizer redacts requests and responses; plugs into cloud and Fiddler guardrails. | **Partial.** Beta gateway redaction; SDK masking relies on developers. | **Fail (not in path).** Detection only. | **Pass (via gateway).** PHI-specific in-VPC detection and masking <80 ms. | **Partial.** Data stays in perimeter; AI_REDACT has no PHI categories. |
| Gateway vs Observability Split | Does one product cover both, or do we need two integrated tools? | **Both** (two Azure services). | **Both** (several AWS services). | **Gateway only.** | **Observability** (+ beta gateway). | **Observability only.** | **Observability + guardrails** (no gateway). | **Observability** (Snowflake workloads) + output guardrail. |
| Telemetry Portability | Is trace/eval data exportable (OTel, Snowflake) without vendor lock-in? | **Medium.** OTel in, App Insights store; export to Snowflake via pipeline. | **Pass.** OTel + S3/CloudWatch; easy Snowpipe. | **Pass.** OTel gen_ai emitter; log plugins to Kafka/Snowflake. | **Medium.** OTel ingest; proprietary store; 180-day SaaS cap. | **Pass.** OpenInference/OTel; adb ↔ Snowflake native. | **Medium.** OTel in; Snowflake connector ingest-only. | **Pass.** Data already in Snowflake. |
| Vendor / Roadmap Stability | Is the vendor durable and is the roadmap aligned? | **Low risk.** Frequent renames and preview churn. | **Low risk.** Fast AgentCore cadence. | **Low risk.** API-management leader; strong AI cadence. | **Low–medium.** $1.25B valuation; fast-moving. | **Medium.** $70M Series C; focused. | **Medium.** Smaller vendor; heavy rebranding. | **Low risk.** |
| HIPAA / BAA | Is a BAA available for the scoped services? | **Yes** (default via DPA); third-party Foundry models unconfirmed. | **Yes** (AWS BAA; Bedrock + AgentCore eligible). | **Unverified**; self-hosted data plane limits exposure. | **HIPAA compliant per docs**; BAA terms to confirm. | **HIPAA on Enterprise**; BAA to confirm. | **BAA listed**; on-prem/VPC option. | **Yes** (Business Critical; unverified). |
| Lock-in | How hard is it to exit? | **High** (Azure-only observability). | **High** (AWS-only). | **Low–medium** (OSS core; Enterprise plugins proprietary). | **Medium.** | **Low** (OpenInference + Phoenix OSS). | **Medium.** | **Medium** (but the enterprise's strategic platform). |
| Snowflake Fit | How well does it align with Snowflake as the data platform? | Pipeline required. | Good (S3 landing). | Good (Kafka/Snowpipe Streaming). | Export required. | **Best** (adb native integration). | Ingest-only today. | Native. |

### 2.4 Analysis — Best Fit & Recommendations

**Best fit — recommended combination: Kong AI Gateway (gateway) + Arize AX with Phoenix (observability).**
- **Kong ranks #1 on its own (3.10 / 77.5%).** It is the only assessed product that is a neutral, **self-hostable** gateway across every model provider *and* across MCP and A2A traffic. That directly serves the enterprise priorities of portability and a single control point.
- **Kong's gaps are evaluation and trace analysis (capabilities 6–7), and Arize covers both at 4/4.** Together they reach **3.60 / 90%** in the combination view.
- **Arize ties LangSmith on combined score.** It is preferred for this healthcare enterprise for three reasons:
  - Its **OpenInference/OTel instrumentation and Phoenix OSS** give the lowest telemetry lock-in across the many frameworks used in the enterprise's POCs and pilots.
  - Its **adb datastore integrates natively with Snowflake**, the enterprise's system of record for audit.
  - Its unlimited-user pricing suits federated domain teams.

**Where each other vendor fits.**
- **Azure (APIM + Foundry, #2, 3.00)** is the strongest *single-vendor* option and the right **exception path for Azure-resident workloads**. For example, use Foundry evaluators and red teaming for Azure OpenAI apps, with APIM as a regional gateway behind or beside Kong.
- **Amazon Bedrock (#3, 2.50)** should be used *through* the control plane, not as the control plane:
  - Invoke Bedrock models through Kong.
  - Reuse **Bedrock Guardrails (ApplyGuardrail)** as a PII/safety service.
  - Use **IAM-principal cost allocation** for AWS-side FinOps.
  - Use **AgentCore Policy** for AWS-hosted agents.
- **LangSmith (#4, 2.20)** is the alternative observability choice where LangGraph dominates. Revisit its LLM Gateway once it leaves beta and supports self-hosting.
- **Fiddler (#5, 2.00)** has the best **PHI-specific guardrails** (in-VPC, <80 ms, clinical entities) and integrates with Kong. Keep it as the **named alternative or add-on** if Kong's AI PII Sanitizer, plus cloud guardrails, falls short on PHI recall in the PoC.

**Snowflake connection.** Snowflake should be the **long-term audit and analytics sink** for the control plane, not the control plane itself:
- **Kong** streams AI audit logs (prompt/response metadata with PHI masked, tokens, cost, consumer, model) through Kafka into Snowpipe Streaming.
- **Arize** traces and evaluation results join them through adb's Snowflake integration.
- **Bedrock and Azure** logs land through S3 or Event Hub pipelines.

Snowflake Horizon then provides retention, legal hold (Time Travel/Fail-safe plus governance) and chargeback reporting by domain. **Snowflake Cortex AI Observability** remains the native monitor for Cortex Agents and Cortex AI workloads (the reference column scores 2.00), and its telemetry already lives in the platform.

**Recommended target state.**
- **Primary standard:** all AI traffic from all clouds and on-prem flows through **Kong AI Gateway**.
  - Data planes are self-hosted in enterprise VPCs, with the Konnect or self-managed control plane.
  - Kong enforces identity, token budgets, the PII/PHI sanitizer and guardrail plugins, semantic cache, MCP/A2A policy and OTel emission.
  - **Arize AX** (self-hosted or VPC, Enterprise plan) provides tracing and evaluation. **Phoenix** is the free developer and pilot tier.
- **Exception path:** Azure-native or AWS-native teams may use **APIM + Foundry** or **Bedrock + AgentCore** controls inside their cloud, provided that:
  - (a) egress to external models still traverses Kong, or an approved equivalent guardrail;
  - (b) telemetry is exported through OTel to Arize and Snowflake.
- **Retire:** per-team provider keys, bespoke loggers and ad-hoc eval scripts.

**Proof-of-concept checklist.**
1. **PHI redaction efficacy.** Replay a de-identified and synthetic PHI test set (member IDs, diagnoses, medications, claim numbers) through Kong's AI PII Sanitizer versus Fiddler Guardrails versus Bedrock ApplyGuardrail. Measure recall, precision and added P95 latency.
2. **BAA and telemetry boundary.** Get written BAA terms from Kong (Konnect), Arize (AX Enterprise) and any SaaS component. Confirm that no prompt or response payload leaves self-hosted data planes when analytics are enabled.
3. **Failover and cost routing.** Simulate a provider outage (Azure OpenAI → Bedrock Claude → self-hosted vLLM). Verify per-domain token budgets, model aliases and chargeback figures against provider invoices.
4. **Semantic cache safety.** Test per-member or per-tenant cache partitioning on benefit/policy FAQ flows. Confirm there is no cross-user leakage and measure the hit rate and savings.
5. **Agent/MCP governance.** Put one pilot agent's MCP tools behind Kong (scope-based tool ACLs, A2A token exchange). Trace the full chain in Arize with OTel GenAI conventions and run online faithfulness and tool-selection evals.
6. **Snowflake audit pipeline.** Land Kong logs and Arize traces in Snowflake. Show an auditor query ("who asked what, which model answered, what did it cost") over a 30-day window with PHI masked.

---

## Section 3 — Bibliography

### Input files
1. Internal — Report specification (SPEC.md) — `/tmp/claude-0/ai/SPEC.md`
2. Internal — Pattern 6 capability template (pattern6.md; source `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md`) — `/tmp/claude-0/ai/pattern6.md`

### Azure AI Foundry (Microsoft Foundry) + Azure API Management
3. Microsoft Learn — AI gateway capabilities in Azure API Management — https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities
4. Microsoft Community Hub — New AI gateway capabilities in Azure API Management — https://techcommunity.microsoft.com/blog/integrationsonazureblog/new-ai-gateway-capabilities-in-azure-api-management/4524604
5. GitHub — Azure/API-Management releases — https://github.com/Azure/API-Management/releases
6. Microsoft Community Hub — Generally available: evaluations, monitoring and tracing in Microsoft Foundry — https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/generally-available-evaluations-monitoring-and-tracing-in-microsoft-foundry/4502760
7. Microsoft Community Hub — Microsoft Foundry Observability: How to Trace, Evaluate, Monitor, and Secure AI Agents — https://techcommunity.microsoft.com/blog/azurearchitectureblog/microsoft-foundry-observability-how-to-trace-evaluate-monitor-and-secure-ai-agen/4555846
8. Microsoft Learn — Observability in Generative AI (Microsoft Foundry) — https://learn.microsoft.com/en-us/azure/foundry/concepts/observability
9. Microsoft Learn — Agent tracing overview (Microsoft Foundry) — https://learn.microsoft.com/en-us/azure/foundry/observability/concepts/trace-agent-concept
10. Microsoft Learn — Guardrails and controls overview in Microsoft Foundry — https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview
11. Microsoft Learn — Prompt Shields in Microsoft Foundry — https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/content-filter-prompt-shields
12. Microsoft Learn — HIPAA (US) compliance offering — https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-hipaa-us
13. Microsoft Q&A — HIPAA BAA Coverage for Azure OpenAI and Azure AI Foundry — https://learn.microsoft.com/en-us/answers/questions/5987507/hipaa-baa-coverage-for-azure-openai-and-azure-ai-f
14. GitHub (microsoft-foundry discussions) — Feature Request: PII input filtering in Foundry content filter — https://github.com/orgs/microsoft-foundry/discussions/203
15. Medium (D. Govaerdhanan) — Azure AI Foundry is now Microsoft Foundry: What Changed and Why It Matters — https://medium.com/microsoft-azure-in-practice/azure-ai-foundry-is-now-microsoft-foundry-what-changed-and-why-it-matters-c65756317bd8
16. Cloud Perspectives (S. Wiggers) — Azure API Management Token Limit Policy — https://sjwiggers.com/2026/05/11/azure-api-management-token-limit-policy-ai/
17. James Westall — Azure AI Content Safety for Agents: Task Adherence, Prompt Shields, and PII Filters — https://jameswestall.com/2026/01/13/content-safety-agents-task-adherence-prompt-shields/

### Amazon Bedrock
18. AWS — Amazon Bedrock Guardrails — https://aws.amazon.com/bedrock/guardrails/
19. AWS Docs — Remove PII using sensitive information filters — https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html
20. AWS Docs — Application inference profiles (cost management) — https://docs.aws.amazon.com/bedrock/latest/userguide/cost-mgmt-application-inference-profiles.html
21. AWS Docs — Set up a model invocation resource using inference profiles — https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles.html
22. AWS ML Blog — Introducing granular cost attribution for Amazon Bedrock — https://aws.amazon.com/blogs/machine-learning/introducing-granular-cost-attribution-for-amazon-bedrock/
23. AWS What's New — Amazon Bedrock expands IAM principal cost allocation to the bedrock-mantle endpoint — https://aws.amazon.com/about-aws/whats-new/2026/08/amazon-bedrock-expands-iam-principal-cost-allocation-bedrock-mantle/
24. AWS What's New — Amazon Bedrock AgentCore is now generally available — https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available
25. AWS Docs — Observe your agent applications on AgentCore Observability — https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html
26. AWS ML Blog — Monitor on-premises and multi-cloud AI agents with AgentCore Observability — https://aws.amazon.com/blogs/machine-learning/monitor-on-premises-and-multi-cloud-ai-agents-with-agentcore-observability/
27. AWS What's New — Generative AI observability now generally available for Amazon CloudWatch — https://aws.amazon.com/about-aws/whats-new/2025/10/generative-ai-observability-amazon-cloudwatch
28. AWS News Blog — AgentCore adds quality evaluations and policy controls — https://aws.amazon.com/blogs/aws/amazon-bedrock-agentcore-adds-quality-evaluations-and-policy-controls-for-deploying-trusted-ai-agents/
29. AWS What's New — Policy in Amazon Bedrock AgentCore is now generally available — https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/
30. DevelopersIO (Classmethod) — AgentCore Policy now supports Amazon Bedrock Guardrails — https://dev.classmethod.jp/en/articles/20260617-amazon-bedrock-agentcore-policy-guardrails/
31. AWS Docs — Compliance validation for Amazon Bedrock AgentCore — https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/compliance-validation.html
32. AWS — HIPAA Eligible Services Reference — https://aws.amazon.com/compliance/hipaa-eligible-services-reference/
33. Aptible — AWS Bedrock HIPAA compliance: what the BAA covers — https://www.aptible.com/hipaa-compliant-ai-tools/aws-bedrock-baa
34. PeerSpot — Amazon Bedrock: Pros and Cons 2026 — https://www.peerspot.com/products/amazon-bedrock-pros-and-cons

### Kong AI Gateway
35. Kong — Move More Agentic Workloads to Production with AI Gateway 3.13 — https://konghq.com/blog/product-releases/ai-gateway-3-13
36. Kong — Govern the Full AI Data Path with Kong AI Gateway 3.14 — https://konghq.com/blog/product-releases/kong-ai-gateway-3-14
37. Kong — Kong Agent Gateway Is Here — https://konghq.com/blog/product-releases/kong-agent-gateway
38. PR Newswire — Kong AI Gateway Now Supports Agent-to-Agent Traffic — https://www.prnewswire.com/news-releases/kong-ai-gateway-now-supports-agent-to-agent-traffic-becoming-the-most-comprehensive-ai-gateway-for-the-agentic-era-302741741.html
39. Kong Docs — AI PII Sanitizer plugin — https://developer.konghq.com/plugins/ai-sanitizer/
40. Kong Docs — AI Semantic Cache plugin — https://developer.konghq.com/plugins/ai-semantic-cache/
41. Kong Docs — AI Gateway overview — https://developer.konghq.com/ai-gateway/
42. Kong — Securing, Observing, and Governing MCP Servers with Kong AI Gateway — https://konghq.com/blog/product-releases/securing-observing-governing-mcp-servers-with-ai-gateway
43. Kong — AI Gateway benchmark: Kong vs Portkey vs LiteLLM (vendor-authored comparison) — https://konghq.com/blog/engineering/ai-gateway-benchmark-kong-ai-gateway-portkey-litellm
44. Kong — Kong Named a Leader in the Gartner Magic Quadrant for API Management for the Sixth Consecutive Year — https://konghq.com/company/press-room/press-release/kong-named-a-leader-in-the-gartner-magic-quadrant-for-api-management-for-the-sixth-consecutive-year
45. Kong — Gartner Market Overview for AI Gateways (complimentary report page) — https://konghq.com/resources/reports/gartner-complimentary-report
46. Kong — Pricing — https://konghq.com/pricing
47. Kong — Trust Center — https://trust.konghq.com/
48. Kong Nation — HIPAA compliance with Kong (community thread) — https://discuss.konghq.com/t/is-this-hipaa-compliance-is-able-to-add-with-kong-and-how-much-it-costs/11112
49. TrueFoundry — Kong Gateway Latest Pricing Explained for 2026 (competitor-authored) — https://www.truefoundry.com/blog/kong-gateway-pricing-architecture-an-analysis-for-ai-teams-2026-edition
50. Kosmoy — Kong AI Gateway Alternatives (2026) (competitor-authored) — https://www.kosmoy.com/resources/blog/kong-ai-gateway-alternatives/
51. nolist.ai — Kong AI Gateway Review (Score 75/100) — https://nolist.ai/item/kong-ai-gateway

### LangSmith (LangChain)
52. LangChain — LangSmith: Agent & LLM Observability Platform — https://www.langchain.com/langsmith/observability
53. LangChain Blog — LangSmith LLM Gateway: runtime governance built into the agent lifecycle — https://www.langchain.com/blog/introducing-llm-gateway
54. LangChain Docs — LLM Gateway — https://docs.langchain.com/langsmith/llm-gateway
55. LangChain Docs — Regions FAQ (HIPAA, SOC 2 statements) — https://docs.langchain.com/langsmith/regions-faq
56. LangChain Docs — Prevent logging of sensitive data in traces — https://docs.langchain.com/langsmith/mask-inputs-outputs
57. LangChain Docs — Trace with OpenTelemetry — https://docs.langchain.com/langsmith/trace-with-opentelemetry
58. LangChain Blog — LangChain raises $125M (Series B) — https://www.langchain.com/blog/series-b
59. Releases.sh — LangSmith Release Notes & Changelog — https://releases.sh/langchain/langsmith
60. Inference.net — LangSmith Pricing Explained (2026) — https://inference.net/content/langsmith-pricing/
61. G2 — LangSmith Reviews 2026 — https://www.g2.com/products/langsmith/reviews
62. Gartner Peer Insights — LangSmith Reviews & Ratings — https://www.gartner.com/reviews/product/langsmith
63. LinkedIn (LangChain) — "LangSmith is now HIPAA compliant" (post; content not retrievable) — https://www.linkedin.com/posts/langchain_langsmith-is-now-hipaa-compliant-activity-7206345422808764417-aloQ
64. Langfuse — LangSmith Alternative: Langfuse vs. LangSmith (competitor-authored) — https://langfuse.com/resources/engineering/langsmith-alternative
65. SigNoz — LangSmith Alternatives 2026 (competitor-authored) — https://signoz.io/comparisons/langsmith-alternatives/

### Arize AI (AX + Phoenix)
66. Arize — Agent Observability, Evaluation & Improvement Platform (home) — https://arize.com/
67. Arize — Phoenix — https://arize.com/phoenix/
68. Arize — Pricing — https://arize.com/pricing/
69. Arize — Trust Center — https://arize.com/trust-center/
70. Arize Docs — Changelog (Arize AX) — https://arize.com/docs/ax/release-notes
71. Arize Blog — Arize Receives Certifications Validating Health Information Security for HIPAA Compliance (2022) — https://arize.com/blog/arize-receives-certifications-validating-health-information-security-for-hipaa-compliance/
72. Arize Blog — Arize AI Raises $70M Series C — https://arize.com/blog/arize-ai-raises-70m-series-c-to-build-the-gold-standard-for-ai-evaluation-observability/
73. PR Newswire — Arize AI Secures $70M Series C — https://www.prnewswire.com/news-releases/arize-ai-secures-70m-series-c-to-fix-ais-biggest-problem-making-llms-and-ai-agents-work-in-the-real-world-302381601.html
74. Atlan — Arize AI Explained: AX vs. Phoenix for LLM Observability [2026] — https://atlan.com/know/ai-agent/ai-agent-observability/what-is-arize/
75. AppSec Santa — Arize AI Review 2026 — https://appsecsanta.com/arize-ai
76. Voiceflow — What Is Arize AI? Pricing, Pros and Alternatives (2026) (competitor-adjacent) — https://www.voiceflow.com/blog/what-is-arize-ai
77. Laminar — Arize Phoenix Alternatives 2026 (competitor-authored) — https://laminar.sh/article/arize-phoenix-alternatives-2026

### Fiddler AI
78. Fiddler — The AI Control Plane for enterprises (home) — https://www.fiddler.ai/
79. Fiddler — Guardrails — https://www.fiddler.ai/guardrails
80. Fiddler — AI Control Plane — https://www.fiddler.ai/control-plane
81. Fiddler — Centor Models (formerly Trust Models) — https://www.fiddler.ai/centor-models
82. Fiddler — Agentic Observability — https://www.fiddler.ai/agentic-observability
83. Fiddler — Pricing — https://www.fiddler.ai/pricing
84. Fiddler — Security — https://www.fiddler.ai/security
85. Fiddler Docs — Product Releases changelog — https://docs.fiddler.ai/changelog/product-releases.md
86. Fiddler Docs — Guardrails: PII/PHI — https://docs.fiddler.ai/developers/tutorials/guardrails/guardrails-pii.md
87. Fiddler Docs — OpenTelemetry Integration — https://docs.fiddler.ai/integrations/agentic-ai/opentelemetry-integration.md
88. Fiddler Docs — Snowflake integration — https://docs.fiddler.ai/integrations/data-platforms/snowflake-integration.md
89. Fiddler Docs — Documentation index (llms.txt) — https://docs.fiddler.ai/llms.txt
90. Fiddler Docs — Documentation home — https://docs.fiddler.ai/

### Ref: Snowflake Cortex AI
91. Snowflake Docs — AI Observability in Snowflake Cortex — https://docs.snowflake.com/en/user-guide/snowflake-cortex/ai-observability
92. Snowflake Docs — COMPLETE / AI_COMPLETE (guardrails option, Cortex Guard) — https://docs.snowflake.com/en/sql-reference/functions/complete-snowflake-cortex
93. Snowflake Docs — Cross-region inference — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cross-region-inference
94. Snowflake Docs — AI_REDACT — https://docs.snowflake.com/en/sql-reference/functions/ai_redact
95. Snowflake Docs — Cortex AI Functions (AISQL) — https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql
96. Snowflake Docs — AI features overview — https://docs.snowflake.com/en/guides-overview-ai-features

### Analyst research (Gartner / Forrester / IDC)
97. Gartner — Market Guide for AI Gateways (Oct 2025) — https://www.gartner.com/en/documents/7051698
98. Gartner — Market Overview for AI Gateways (May 2026) — https://www.gartner.com/en/documents/7855181
99. Gartner — Market Guide for AI Evaluation and Observability Platforms (Feb 2026) — https://www.gartner.com/en/documents/7387730
100. Gartner — Magic Quadrant for API Management (2025) — https://www.gartner.com/en/documents/7020998
101. Gartner — Market Guide for AI Trust, Risk and Security Management — https://www.gartner.com/en/documents/6185655
102. Gartner Peer Insights — Best AI Gateways Reviews 2026 — https://www.gartner.com/reviews/market/ai-gateways
103. Gartner Peer Insights — Best AI Evaluation and Observability Platforms Reviews 2026 — https://www.gartner.com/reviews/market/ai-evaluation-and-observability-platforms
104. TrueFoundry — Gartner Market Guide for AI Gateways 2025 insights (vendor-authored) — https://www.truefoundry.com/blog/building-the-enterprise-ai-control-plane-gartner-r-insights-and-truefoundrys-approach
105. Business Wire — TrueFoundry Recognized as a Representative Vendor in Gartner Market Guide for AI Gateways (vendor press release) — https://www.businesswire.com/news/home/20260220396246/en/CORRECTING-and-REPLACING-TrueFoundry-Recognized-as-a-Representative-Vendor-in-Gartner-Market-Guide-for-AI-Gateways
106. Gravitee — Gravitee in Gartner Market Guide for AI Gateways (vendor-authored) — https://www.gravitee.io/blog/gravitee-in-gartner-market-guide-for-ai-gateways
107. Comet — Recognized in 2026 Gartner Market Guide for AI Evaluation and Observability Platforms (vendor-authored) — https://www.comet.com/site/blog/gartner-market-guide-february2026/
108. Weights & Biases — Gartner 2026 Market Guide for AI Evaluation and Observability Platforms (vendor-hosted) — https://wandb.ai/site/resources/whitepapers/gartner-ai-evaluation-observability-platforms/
109. Credo AI — Featured in 2025 Gartner Market Guide for AI TRiSM (vendor-authored) — https://www.credo.ai/blog/credo-ai-featured-in-2025-gartner-market-guide-for-ai-trust-risk-and-security-management-ai-trism
110. Agent Security — Gartner Market Guide: Top 8 AI Gateways (third-party summary; low confidence) — https://agentsecurity.com/benchmarks/gartner-top-8-ai-gateways

### Comparisons, reviews & practitioner articles
111. TrueFoundry — A Definitive Guide to AI Gateways in 2026: Competitive Landscape Comparison (competitor-authored) — https://www.truefoundry.com/blog/a-definitive-guide-to-ai-gateways-in-2026-competitive-landscape-comparison
112. Zuplo — Best API Gateways for AI and LLM Workloads (2026) (competitor-authored) — https://zuplo.com/learning-center/best-api-gateways-ai-llm-workloads-2026
113. Maxim AI — Top 5 AI Gateways with Semantic Caching for LLM Cost Reduction (competitor-authored) — https://www.getmaxim.ai/articles/top-5-ai-gateways-with-semantic-caching-for-llm-cost-reduction/
114. Kosmoy — Best LLM Evaluation Platforms in 2026 (competitor-authored) — https://www.kosmoy.com/resources/blog/best-llm-evaluation-platforms-2026/
115. Lyzr — 12 Best AI Agent Observability Tools in 2026 (competitor-authored) — https://www.lyzr.ai/blog/best-ai-agent-observability-tools
116. Medium (N. Sharma) — Building an Enterprise AI Gateway with Azure API Management — https://medium.com/@nitin.r.sharma/building-an-enterprise-ai-gateway-with-azure-api-management-efbd5f7d4b1c
117. hidekazu-konishi.com — Amazon Bedrock AgentCore Policy Implementation Guide — https://hidekazu-konishi.com/entry/amazon_bedrock_agentcore_policy_implementation_guide.html
118. AWS Builder Center — FinOps Meets IAM: Granular Cost Attribution in Bedrock — https://builder.aws.com/content/3GZK1d1NipEk0LV3s5eQFPR7y0F/finops-meets-iam-how-aws-finally-delivered-granular-cost-attribution-in-bedrock

*Scores are research-based estimates from public documentation, analyst summaries and reviews as of September 2026. Validate them in a proof of concept with PHI-representative test data and signed BAA terms before any standardization decision.*
