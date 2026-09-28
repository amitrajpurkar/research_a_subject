# Agent Frameworks Vendor Comparison — Healthcare Enterprise AI Pattern

**AI pattern:** Pattern 2 — Agent Frameworks (code-first SDKs and libraries used by engineering teams to build agent logic: orchestration graphs, tool use, memory and multi-agent coordination; usually deployed onto an agent platform or container runtime)
**Evaluation basis:** `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` — Pattern 2 (Part 1 top-10 capabilities, Part 2 pillar weighting, Part 3 scoring template, Part 4 qualitative risk)
**Vendor list source:** `OUTPUTS/ipaas/ai_vendor_list.md`
**Vendors assessed:** Microsoft AutoGen; Microsoft Semantic Kernel; LangGraph (LangChain, Inc.); CrewAI (CrewAI, Inc.); LlamaIndex Agents / Agent Workflows (LlamaIndex, Inc.). Sidebar: Microsoft Agent Framework (successor to AutoGen and Semantic Kernel), not ranked.
**Research date:** September 2026 (sources: vendor GitHub repositories and release pages, vendor documentation and blogs, Microsoft devblogs and Microsoft Learn, LangChain/CrewAI/LlamaIndex pricing and trust pages, Gartner document pages and vendor press coverage of Gartner placements, InfoQ, Visual Studio Magazine, SiliconANGLE, practitioner comparisons (N-iX, Turing, Towards AI, CrewClaw), third-party trust aggregators (AIFOXX))

### Scoring scale

| Score | Meaning |
|---|---|
| 0 | Not supported |
| 1 | Basic / custom scripting required |
| 2 | Out-of-the-box / configurable |
| 3 | Advanced / native cloud integration |
| 4 | Fully automated / AI-driven market leader |

Each of the 10 capabilities is weighted **10%**. Weighted score = score × 0.10; Total = sum of weighted scores (max 4.00); Normalized % = Total ÷ 4.

### Strategic pillar weights (Part 2 — used to frame the qualitative analysis)

| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |
| --- | --- | --- |
| Portability (Model, Cloud, On-Prem) | 20% | Framework code must outlive model/cloud choices. |
| Complexity & Developer Productivity | 20% | Standardizing teams on one framework; learning curve; maintainability. |
| Functional Completeness | 15% | Durable state, multi-agent, memory, HITL, tool protocols. |
| Governance, Security & Compliance | 15% | PHI-aware memory, sandboxing, secrets, auditability. |
| Value-Realization Potential | 15% | Speed from pilot code to production service. |
| Ecosystem Stability & Operational Cost | 15% | Community, LTS, support; runtime efficiency. |

### How to read the scores

The numeric score (Section 2) uses the flat 10 × 10% capability model required by the scoring template. The pillar weights above are applied qualitatively in Section 2.3 and 2.4, where they shape the recommendation — especially **Ecosystem Stability** (which dominates the AutoGen and Semantic Kernel verdicts) and **Portability**. A score reflects what the framework (plus its vendor's directly attached commercial tooling, where noted) delivers **today**, not the roadmap. Healthcare-specific gaps — PHI-aware memory retention, BAA coverage of hosted services — are called out explicitly because no framework in this set solves them natively.

### Scoping notes (read first)

1. **Microsoft has merged AutoGen and Semantic Kernel into the Microsoft Agent Framework (MAF).** MAF 1.0 reached general availability in early April 2026 (Microsoft's own posts give 2 April and 3 April; sources differ by a day) for .NET and Python, with "stable APIs, and a commitment to long-term support." Microsoft describes it as unifying Semantic Kernel's enterprise foundations with AutoGen's orchestration patterns, and publishes migration guides from both.
2. **AutoGen is in maintenance mode.** The `microsoft/autogen` README states: "AutoGen is now in maintenance mode. It will not receive new features or enhancements and is community managed going forward," and directs new users to MAF. The notice dates from MAF's public preview in October 2025 (Atlan gives 2 October 2025) and was reinforced at MAF GA. A separate community fork, **AG2** (formerly AutoGen, led by original AutoGen creators, Apache 2.0), is a *different* project and is not scored here.
3. **Semantic Kernel is feature-frozen but supported.** Microsoft committed (October 2025) to continue fixing critical bugs and security issues in Semantic Kernel v1.x "for at least one year after Microsoft Agent Framework reaches General Availability" — i.e., to at least ~April 2027 — while "the majority of new features will be built for Microsoft Agent Framework." The repository README now opens with "Semantic Kernel is now Microsoft Agent Framework!"
4. **What this means for anyone choosing either one today:** neither AutoGen nor Semantic Kernel should be selected as a *new* enterprise standard. Existing pilots on either should plan migration to MAF (or to the chosen standard). They are scored **as they stand** in September 2026, per the brief; MAF gets a short, unranked sidebar after the Semantic Kernel profile.
5. **LlamaIndex scope:** scored as the agent layer only — `llama-index-workflows` (Workflows 1.0+, now a standalone package, v2.24.1 as of 20 Sep 2026), `AgentWorkflow`/`FunctionAgent`, and the **LlamaAgents** serving/deployment stack (`llama-agents-server`, `llamactl`). LlamaIndex's retrieval and LlamaParse document products are relevant context, not scored. Note that LlamaIndex's own README now states its "current focus … is to build the best AI-powered engine for document parsing and extraction" — a strategic signal for Pattern 2.
6. **Commercial add-ons:** LangSmith (LangChain), CrewAI AMP and LlamaCloud are commercial platforms attached to the OSS frameworks. Where a capability is only available through the paid platform, the evidence says so.

---

## Section 1 — Vendor Profiles against the 10 Capabilities

Capabilities (Pattern 2, Part 1/Part 3):
1. Stateful Orchestration & Durability
2. Model-Agnostic Abstractions
3. MCP / A2A Tool Protocols
4. Multi-Agent Patterns
5. Memory & Context Management
6. Human-in-the-Loop Interrupts
7. Testing & Debuggability
8. OpenTelemetry-Native Tracing
9. Deployment Portability & Security
10. Ecosystem Maturity & LTS

### 1.1 Microsoft AutoGen

**Context:** AutoGen originated at Microsoft Research as a pioneer of conversation-driven multi-agent systems; the v0.4 rewrite introduced a layered design (Core event-driven runtime, AgentChat high-level API, Extensions), and the line reached python-v0.7.x (v0.7.5 is the latest release shown on GitHub; release dates on the page are low confidence). It is **in maintenance mode**: no new features, community-managed, with Microsoft directing all new work to Microsoft Agent Framework. The repository remains very popular (~60.4k stars, ~9.1k forks; one analyst blog cites 559 contributors), but popularity no longer implies momentum. There is no Gartner or Forrester placement for AutoGen itself; Microsoft's Gartner recognition (Leader, 2025 Magic Quadrant for AI Application Development Platforms, December 2025) attaches to Microsoft Foundry, and Microsoft's own Gartner-submission story referenced MAF, not AutoGen. Practitioners describe the maintenance announcement as "the first major agent framework sunset" and frame the current choice as MAF vs. the AG2 community fork.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Stateful Orchestration & Durability | AgentChat teams and `GraphFlow` (directed graph of agents, with concurrent execution and callable edge conditions added in 0.7.x) provide explicit control flow; teams and agents support `save_state()`/`load_state()` for resume. There is no built-in pluggable checkpointer that persists every step automatically, and no deterministic replay; durability is application-managed. | 2 |
| 2 | Model-Agnostic Abstractions | `ChatCompletionClient` abstraction with extensions for OpenAI, Azure OpenAI, Anthropic (thinking-mode support added in 0.7.5), Ollama and others; structured output and streaming supported. Model swap is mostly configuration via declarative component config. New models will receive only community updates going forward. | 3 |
| 3 | MCP / A2A Tool Protocols | `McpWorkbench` consumes MCP servers (streamable HTTP transport and tool-name/description overrides added in 0.7.x). No native way to expose an AutoGen agent as an MCP server or A2A endpoint; A2A was never added before the freeze. | 2 |
| 4 | Multi-Agent Patterns | The richest *pattern catalogue* in this set: `RoundRobinGroupChat`, `SelectorGroupChat` (central selector), `Swarm` (tool-based hand-off), `GraphFlow`, and Magentic-One. These patterns were carried into MAF. Scored 3 rather than 4 because no further evolution is coming and practitioners report conversation loops and high token use. | 3 |
| 5 | Memory & Context Management | `Memory` protocol with `ListMemory`, ChromaDB, Redis (fixes in 0.7.4/0.7.5) and Mem0 extensions; model-context classes (e.g., buffered/limited contexts) manage context windows. No PHI-aware retention/purge policies; conversational context accumulates fastest of the frameworks reviewed (N-iX). | 2 |
| 6 | Human-in-the-Loop Interrupts | `UserProxyAgent` blocks for input; `HandoffTermination` and `max_turns` pause a team so the application can collect feedback and resume from saved state. Works, but there is no first-class interrupt/resume-at-node primitive with edit-in-place of state. | 2 |
| 7 | Testing & Debuggability | AutoGen Studio offers a visual builder/playground but is documented as "a research prototype and is not meant to be used in a production environment." AutoGen Bench exists for benchmarking; replay/mocked chat-completion clients enable unit testing. Turing's comparison notes the lack of a verbose debugging mode. | 2 |
| 8 | OpenTelemetry-Native Tracing | Built-in OpenTelemetry instrumentation of the Core runtime, following OTel semantic conventions and the (in-development) GenAI semantic conventions; export to any OTel backend (Jaeger, Zipkin, etc.); GenAI-convention traces for agents and tools added in 0.7.x. | 3 |
| 9 | Deployment Portability & Security | Pure Python library that runs in any container; Docker-based and local code executors for sandboxed code execution; an experimental distributed (gRPC) runtime. No managed runtime, no secret-vault integration beyond what the host provides, and no ongoing supply-chain patching beyond security fixes. | 2 |
| 10 | Ecosystem Maturity & LTS | MIT (code) / CC-BY-4.0 (docs), Microsoft-owned but now "community managed"; never reached 1.0 and underwent a breaking 0.2→0.4 rewrite. Only bug/security fixes remain. Large community, but the direction of that community is split between MAF and the AG2 fork. | 1 |

**Pros**
- Pioneering and still very capable multi-agent conversation patterns (Selector, Swarm, GraphFlow, Magentic-One) (vendor docs).
- Built-in OpenTelemetry tracing with GenAI semantic conventions (vendor docs).
- Large installed base and body of examples (~60k GitHub stars) (GitHub).
- Clean layered architecture (Core/AgentChat/Extensions) that maps conceptually onto MAF, easing migration (practitioner blog).
- Official Microsoft migration guide to MAF exists (GitHub / vendor docs).
- MCP consumption via `McpWorkbench` (GitHub release notes).

**Cons**
- Maintenance mode: "will not receive new features or enhancements" (GitHub).
- Never reached a 1.0 stable API; history of breaking rewrites (practitioner blog).
- AutoGen Studio is explicitly not for production (vendor docs).
- Conversational model accumulates context fastest, with highest token cost (N-iX practitioner comparison).
- Prone to conversation loops; limited debugging (Turing practitioner comparison).
- Community split between MAF migration and the AG2 fork (Apache 2.0, ~4.9k stars) creates ambiguity for a "standard" choice (GitHub / N-iX).

**Pricing:** Free and open source (MIT). No commercial support offering from Microsoft for AutoGen; costs are model/infra only.
**Healthcare / HIPAA note:** A library, so no BAA applies to AutoGen itself; HIPAA coverage depends on the model endpoint (e.g., Azure OpenAI under Microsoft's BAA) and hosting. The frozen dependency tree is a growing security-review liability for PHI workloads.

### 1.2 Semantic Kernel

**Context:** Semantic Kernel (SK) is Microsoft's MIT-licensed enterprise SDK for .NET, Python and Java (Java lags on agent features), with ~28.4–28.6k GitHub stars (28,574 on 18 Sep 2026 per Atlan) and ~4.7k forks. Releases continue on the v1.x line (dotnet-1.80.x and python-1.44.x are the latest shown; exact dates low confidence), focused on bug and security fixes, dependency bumps and a few items taken to GA. Microsoft calls MAF effectively "Semantic Kernel v2.0," built by the same team, and has committed to support SK v1.x for at least one year after MAF GA (≈ April 2027). SK's agent orchestration patterns and Process Framework are still labelled **experimental** in Microsoft Learn — and will now mature in MAF rather than SK. There is no separate Gartner placement for SK; Microsoft's Leader position in the December 2025 Gartner Magic Quadrant for AI Application Development Platforms is for Microsoft Foundry.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Stateful Orchestration & Durability | The Process Framework (event-driven steps, reusable processes, OTel audit) is marked "experimental … subject to change until it moves to preview and GA." Agent orchestrations are also experimental. No GA checkpoint/resume or deterministic replay; durable graph workflows arrived only in MAF. | 2 |
| 2 | Model-Agnostic Abstractions | Mature connector model for Azure OpenAI, OpenAI, Google (Gemini connector honours `FunctionChoiceBehavior` as of dotnet-1.80.0), Hugging Face, Ollama/ONNX and others; `FunctionChoiceBehavior` gives a consistent function-calling abstraction; structured outputs and streaming supported. Strongest in .NET. | 3 |
| 3 | MCP / A2A Tool Protocols | MCP consumption via `MCPStdioPlugin` and `MCPStreamableHttpPlugin` (Python); MCP tool-approval callback added for Azure AI Agent (python-1.44.1). C#/Java MCP docs are incomplete (Atlan). A2A and exposing SK agents as MCP servers are samples rather than first-class features; OpenAPI plugins are strong. | 2 |
| 4 | Multi-Agent Patterns | Five orchestration patterns — Concurrent, Sequential, Handoff, Group Chat, Magentic — with a uniform API, but all "in the experimental stage" and not available in Java. | 2 |
| 5 | Memory & Context Management | Broad vector-store connector abstraction (Azure AI Search, Elasticsearch, Postgres, Redis, Qdrant and more; .NET providers migrated to CommunityToolkit packages in dotnet-1.79.0), chat-history reducers for context-window management, and vector search exposed as plugins. No PHI-aware retention policies. | 3 |
| 6 | Human-in-the-Loop Interrupts | Function-invocation and auto-function-invocation **filters** let an app intercept and approve tool calls; orchestrations accept a human-response callback. No native durable pause/resume-from-saved-state primitive in GA. | 2 |
| 7 | Testing & Debuggability | Dependency-injection-friendly design makes services and plugins easy to mock in unit tests (.NET especially); OTel output supports debugging. No visual graph debugger or built-in eval harness (Microsoft steers evals to Foundry). | 2 |
| 8 | OpenTelemetry-Native Tracing | Native logs, metrics (e.g., `semantic_kernel.function.invocation.duration`, token-usage metrics) and traces via the `Microsoft.SemanticKernel` activity source, adhering closely to the (experimental) GenAI semantic conventions; exportable to console or any APM. Java pending. | 3 |
| 9 | Deployment Portability & Security | A library that runs anywhere .NET/Python/Java runs (containers, App Service, on-prem); no managed runtime of its own. Sandboxed code execution relies on external services (e.g., Azure Container Apps sessions); secrets come from the host (e.g., Key Vault). Portable, but Azure-leaning samples. | 2 |
| 10 | Ecosystem Maturity & LTS | MIT, Microsoft-backed, SemVer v1 with stable GA APIs, large .NET enterprise user base. However, feature development has moved to MAF, support is guaranteed only to ≈ April 2027, and a community discussion reports that "PRs remain a long time open." | 2 |

**Pros**
- Best-in-class .NET/C# developer experience and enterprise patterns (DI, filters, telemetry) (vendor docs).
- Stable v1 GA APIs; not a pre-1.0 project (GitHub).
- Native OpenTelemetry logs/metrics/traces (vendor docs).
- Broad vector-store and model-connector ecosystem (vendor docs / Atlan).
- Microsoft support commitment through at least April 2027 and official migration path to MAF (vendor blog).
- Microsoft Foundry is a Gartner MQ Leader, and SK code migrates naturally onto that stack (Gartner via VS Magazine).

**Cons**
- Feature-frozen: new capabilities go to MAF (vendor blog).
- Orchestration and Process Framework remain experimental (vendor docs).
- No durable checkpoint/resume or native HITL interrupt (vendor docs).
- Java lags (no agent orchestration; observability pending) (vendor docs).
- Community reports slow PR handling and uncertainty about support level (GitHub discussion).
- Practitioners cite memory limits with default volatile stores and an LLM-centric design (Turing practitioner comparison).

**Pricing:** Free and open source (MIT). Commercial support only indirectly, via Microsoft Unified/Azure support contracts (low confidence on scope for OSS SDK issues).
**Healthcare / HIPAA note:** Library only; HIPAA posture comes from the model and hosting services (Azure OpenAI / Foundry are covered under Microsoft's BAA when configured in-scope). Choose SK today only for short-horizon .NET work that will migrate to MAF.

#### Sidebar — Microsoft Agent Framework (successor; not scored or ranked)

- **Status:** 1.0 GA in early April 2026 for **.NET and Python** after release candidates rc1–rc6 from 19 February 2026; Go SDK in public preview; some packages (e.g., `agent_framework.orchestrations`) stayed in preview longer than core. ~12.6k GitHub stars, ~2.1k forks.
- **What it merges:** SK's enterprise foundations (connectors, filters/middleware, telemetry) plus AutoGen's multi-agent patterns (sequential, concurrent, handoff, group chat, Magentic-One), in a graph-based workflow engine with **checkpointing and hydration**, **human-in-the-loop approvals and pause/resume**, **MCP** and **A2A** (A2A 1.0 support was "coming soon" at GA), AG-UI, OpenAPI, declarative YAML agents, pluggable memory and OpenTelemetry. Multi-provider: Azure OpenAI, OpenAI, Anthropic, AWS Bedrock, Ollama.
- **2026 additions:** At Build (3 June 2026) Microsoft announced the **Agent Harness** (context compaction, file memory, shell, web search, tool approval, built-in OTel), **Foundry Hosted Agents** (scale-to-zero, per-session VM isolation) and **CodeAct** (alpha; model-generated code in Hyperlight micro-VMs). InfoQ reported the Harness and Hosted Agents reached GA in August 2026, with connectors to run GitHub Copilot SDK and Claude Agent SDK loops inside MAF workflows.
- **Implication:** For a Microsoft/.NET-centric shop, MAF — not AutoGen or SK — is the Microsoft option to evaluate against LangGraph. Its main risks are youth (months since GA), a strong pull toward Foundry for hosting/observability, and Atlan's observation that MAF "solves how agents run, but not what they know" (governed data context remains out of scope).

### 1.3 LangGraph

**Context:** LangGraph is LangChain, Inc.'s low-level, MIT-licensed orchestration framework for stateful agents (Python and JavaScript), with ~38.1k GitHub stars and ~6.4k forks. **LangGraph 1.0 and LangChain 1.0 shipped on 22 October 2025**, billed as "the first stable major release in the durable agent framework space," with a commitment of **no breaking changes until 2.0** (only `langgraph.prebuilt` deprecated). On 20 October 2025 LangChain raised a **$125M Series B at a $1.25B valuation**, led by IVP with Sequoia, Benchmark, Amplify, CapitalG and Sapphire (plus ServiceNow, Workday, Cisco, Datadog and Databricks venture arms); it reported 90M combined monthly downloads and use by 35% of the Fortune 500. The commercial LangSmith platform bundles observability, evaluation and **LangSmith Deployment** (the renamed LangGraph Platform). A secondary source reports Gartner's April 2026 Hype Cycle for Agentic AI naming LangChain as an example of open-source innovation (low confidence — Gartner document not directly accessed); no Magic Quadrant covers frameworks.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Stateful Orchestration & Durability | Explicit `StateGraph` with typed state, cycles, branching and subgraphs; checkpointers (`InMemorySaver`, `SqliteSaver`, `PostgresSaver`/`AsyncPostgresSaver`) persist state at every super-step, so threads resume after failure; "time travel" lets you inspect and fork prior states. Interrupted threads consume only storage. Market reference for durable agent execution. | 4 |
| 2 | Model-Agnostic Abstractions | Uses LangChain 1.0 chat-model integrations (OpenAI, Anthropic, Azure, Bedrock, Google, Ollama, vLLM and many more), `init_chat_model` for config-driven swaps, standard tool-calling and structured-output interfaces. LangGraph itself is model-neutral (nodes can call any client). Some practitioners find LangChain abstractions leaky. | 3 |
| 3 | MCP / A2A Tool Protocols | `langchain-mcp-adapters` converts MCP server tools into LangChain tools; the LangSmith Agent Server exposes every deployed graph at a `/mcp` Streamable-HTTP endpoint (langgraph-api ≥ 0.2.3). A2A is not documented on that page; community issues request A2A adapters (A2A status low confidence). | 3 |
| 4 | Multi-Agent Patterns | Supervisor, swarm/hand-off (`Command` goto), hierarchical subgraphs, and map-reduce fan-out via `Send`; shared or isolated state per subgraph. Snowflake's own developer guide builds a hub-and-spoke supervisor over Cortex Agents with LangGraph. | 4 |
| 5 | Memory & Context Management | Short-term memory = thread checkpoints; long-term memory = `Store` for cross-thread data (user preferences, shared knowledge) with semantic search; LangMem/summarization utilities for context management. Postgres is the production store; PHI retention/purge policies are the application's job. | 3 |
| 6 | Human-in-the-Loop Interrupts | `interrupt()` pauses anywhere in a node with a JSON payload; `Command(resume=…)` continues from the checkpoint; documented approve/reject and review-and-edit patterns. Requires a persistent checkpointer and thread ID. Best-in-class primitive. | 4 |
| 7 | Testing & Debuggability | LangGraph Studio (visual graph debugger with state inspection and replay), time-travel for reproducible reruns, and LangSmith datasets/evaluations and Insights Agent. Practitioners single out LangGraph's step-level tracing (N-iX). Full value depends on LangSmith (commercial) or a substitute such as Langfuse. | 4 |
| 8 | OpenTelemetry-Native Tracing | Tracing is LangSmith-first; LangSmith added end-to-end OpenTelemetry support (ingest and export) for LangChain/LangGraph apps, and third parties (OpenLLMetry, Langfuse) instrument LangGraph. The OSS library does not emit GenAI-convention OTel spans on its own without the LangSmith SDK or third-party instrumentation. | 2 |
| 9 | Deployment Portability & Security | Plain Python/JS in any container; LangSmith Deployment offers cloud, hybrid and **self-hosted** (Enterprise) Agent Server with Postgres/Redis, task queues and cron. No built-in code sandbox in core LangGraph; secrets from the host. | 3 |
| 10 | Ecosystem Maturity & LTS | MIT; 1.0 with no breaking changes until 2.0; well-funded vendor ($1.25B valuation); the largest integration ecosystem and hiring pool; commercial support SLAs on Enterprise. | 4 |

**Pros**
- Most complete durable-execution + HITL model (checkpointers, `interrupt()`, time travel) (vendor docs).
- 1.0 stability contract: no breaking changes until 2.0 (vendor blog).
- Largest ecosystem: 90M monthly downloads with LangChain; 35% of Fortune 500 (vendor blog).
- Best debugging/eval tooling via Studio and LangSmith (N-iX practitioner comparison).
- Deterministic, auditable control flow suited to regulated workflows (N-iX / Towards AI practitioner).
- Documented Snowflake Cortex integration (`langchain-snowflake`, `SnowflakeCortexAgent`) and a Snowflake-authored LangGraph + TruLens guide (Snowflake developer guide).
- Well capitalised: $125M Series B, Oct 2025 (SiliconANGLE / vendor blog).

**Cons**
- Steep learning curve and slower prototyping than role-based frameworks (N-iX / Turing practitioner).
- Observability and deployment value tied to commercial LangSmith; native OTel is secondary (vendor docs).
- A2A not first-class (GitHub issues).
- LangChain abstraction churn in earlier years left a reputation for breaking changes (practitioner blog, Towards Data Science).
- Self-hosted Agent Server is Enterprise-only (vendor pricing page).
- HIPAA/BAA terms for LangSmith SaaS require sales confirmation (vendor docs).

**Pricing:** LangGraph OSS free (MIT). LangSmith Developer $0 (1 seat, 5k base traces/mo), Plus $39/seat/mo (10k traces, 1 free small serverless deployment), Enterprise custom (self-hosted/hybrid, SSO/RBAC/ABAC, SLA); usage metered in LCUs ($1.50) and LSUs ($1.00).
**Healthcare / HIPAA note:** LangSmith docs state it is SOC 2 Type 2 certified and "HIPAA compliant," with US regions on GCP and AWS; BAA availability is not published on the pricing page and should be confirmed with LangChain (likely Enterprise; **unverified**). Self-hosting LangSmith/Agent Server inside the enterprise VPC avoids sending PHI traces to SaaS.

### 1.4 CrewAI

**Context:** CrewAI (founded by João Moura; first PyPI release December 2023) is an MIT-licensed Python framework independent of LangChain, with ~59k GitHub stars and ~8.6k forks and a claim of 100,000+ developers certified via its courses. It pairs **Crews** (role-based autonomous agent teams) with **Flows** (event-driven, stateful workflows). Its enterprise offering, **CrewAI AMP (Agent Management Platform)** — launched as "AOP" and previously "CrewAI Enterprise" — adds deployment, a control plane, observability with OTel export, RBAC/audit, Crew Studio (no-code) and a tool repository; **CrewAI Factory** (May 2025) is the self-hosted form on Kubernetes/OpenShift, VPC or air-gapped. CrewAI raised $18M seed + Series A (Boldstart, Insight Partners) in October 2024; a later Series B is referenced on LinkedIn but amount/date were not verifiable (**unverified**). The same secondary source on Gartner's April 2026 Hype Cycle for Agentic AI names CrewAI as an open-source example (low confidence).

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Stateful Orchestration & Durability | Flows (`@start`, `@listen`, `@router`) with structured (Pydantic) or unstructured state; `@persist` saves flow state across restarts (SQLite default) and supports resume and fork. Crews themselves are not checkpointed step-by-step, and community threads and third parties (Diagrid) show teams adding their own checkpointing for long-running work. | 2 |
| 2 | Model-Agnostic Abstractions | Broad provider support (OpenAI, Anthropic, Azure, Bedrock, Gemini, local via Ollama/LM Studio) through its `LLM` class; a community PR adds Snowflake Cortex as a native LLM provider. Structured outputs via Pydantic task outputs. | 3 |
| 3 | MCP / A2A Tool Protocols | README lists MCP and A2A support; MCP servers are consumed via `MCPServerAdapter`/agent MCP configuration, and A2A delegation is supported for agent-to-agent calls. Typed tools via Pydantic schemas; large tool repository in AMP. | 3 |
| 4 | Multi-Agent Patterns | Crews with sequential and hierarchical (manager-agent) processes, delegation between role-based agents, and Flows to compose multiple crews with routing and parallel listeners. Intuitive "team staffing" model; less fine-grained control than graphs (N-iX). | 3 |
| 5 | Memory & Context Management | Unified memory system (short-term, long-term, entity) and knowledge sources accessible from Crews and Flows; default local stores (e.g., SQLite/embedded vector store) with pluggable providers. PHI retention/purge controls not native. | 2 |
| 6 | Human-in-the-Loop Interrupts | `@human_feedback` decorator pauses a Flow to collect feedback; task-level `human_input`; AMP exposes a REST resume operation for HITL on deployed crews; AMP markets "human-in-the-loop checkpoints." | 3 |
| 7 | Testing & Debuggability | `crewai test` and training commands, Flow `plot()` for interactive HTML diagrams, AMP execution traces. Limited first-class mocking of models/tools; debugging multi-agent role interplay is a common practitioner complaint (N-iX: less determinism). | 2 |
| 8 | OpenTelemetry-Native Tracing | AMP exports traces and logs to any OTLP collector (Grafana, Honeycomb, New Relic, Datadog) following **OTel GenAI semantic conventions**. The OSS framework relies on OpenInference/Langfuse instrumentation for export, and ships **anonymous telemetry to CrewAI enabled by default** (disable with `OTEL_SDK_DISABLED`) — a review item for PHI environments. | 2 |
| 9 | Deployment Portability & Security | OSS runs in any container; CrewAI Factory deploys via Helm on EKS, AKS, GKE and OpenShift, on AWS Fargate/Azure Container Apps in private VPCs, or air-gapped, with Entra ID/Auth0 SSO; CrewAI states support for SOC 2, HIPAA and FedRAMP High standards. Docker-based code execution tooling. | 3 |
| 10 | Ecosystem Maturity & LTS | MIT, ~59k stars, venture-backed vendor with paid support tiers (up to dedicated team) and marquee customers (DocuSign, Experian, PepsiCo, IBM cited by vendor). Smaller company than LangChain; fast release cadence with occasional API churn. | 3 |

**Pros**
- Fastest path from idea to working multi-agent prototype; lowest learning curve (N-iX / CrewClaw practitioner).
- Clear role/task mental model that business SMEs can follow (vendor docs).
- Flows add structured state, `@persist`, routing and HITL for production control (vendor docs).
- Strong enterprise deployment story: Factory on K8s/OpenShift/air-gapped (vendor blog).
- AMP OTel export using GenAI semantic conventions to any backend (vendor docs).
- SOC 2 Type 2 and a HIPAA audit report (Feb 2026) listed on the trust center (AIFOXX, from trust.crewai.com).
- Snowflake integration in AMP and a Snowflake Cortex LLM provider PR (vendor docs / GitHub).

**Cons**
- Less deterministic, harder-to-audit control in Crews than graph frameworks (N-iX practitioner).
- Durable checkpointing is shallower than LangGraph; teams build their own (community / Diagrid).
- Anonymous telemetry on by default in OSS (GitHub / community).
- Best observability and governance features sit behind AMP (vendor docs).
- BAA not publicly documented; must be confirmed with sales (AIFOXX).
- Turing notes rate-limit and truncated-output issues and earlier sequential-only orchestration (Turing practitioner comparison).
- Paid AMP tiers are execution-capped and can be costly at scale (ZenML pricing analysis).

**Pricing:** OSS free. AMP tiers (per ZenML's analysis; confirm with vendor): Basic $99/mo (100 executions), Standard $6k/yr, Pro $12k/yr, Enterprise $60k/yr (10k executions, 50 live crews), Ultra $120k/yr (500k executions, VPC); Factory by quote.
**Healthcare / HIPAA note:** Trust center shows SOC 2 Type 2 and a "HIPAA Audit Report – Feb 2026"; Factory claims HIPAA-supporting controls. BAA availability is **not publicly documented** — obtain one before any PHI touches AMP SaaS; prefer Factory in the enterprise VPC.

### 1.5 LlamaIndex Agents (Agent Workflows / Workflows)

**Context:** LlamaIndex, Inc. maintains the MIT-licensed LlamaIndex framework (~52.3k stars, ~8.2k forks, 300+ integrations). Its agent layer is **Workflows** — split into a standalone package with Workflows 1.0 (`llama-index-workflows`, `@llamaindex/workflow-core`), now at v2.24.1 (20 Sep 2026) — plus **AgentWorkflow** (Jan 2025; `FunctionAgent`, `ReActAgent`, hand-offs) and **LlamaAgents** (`llama-agents-server`, `llamactl`) for serving and deploying workflows to LlamaCloud or self-hosted infrastructure; the `workflows-py` repository itself has only ~453 stars. The commercial **LlamaCloud** (LlamaParse, LlamaExtract, Classify, agent deployment) is credit-priced with SOC 2 Type 2 and Enterprise-only BAAs. LlamaIndex raised a $19M Series A led by Norwest (with Greylock) in March 2025 ($27.5M total). The README now states the company's focus is "the best AI-powered engine for document parsing and extraction," positioning LlamaAgents as **document agents** rather than a general-purpose framework. No Gartner/Forrester placement found.

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Stateful Orchestration & Durability | Event-driven, async-first steps with branching, looping and parallelism; typed workflow state. Durability is opt-in: serialize `Context.to_dict()` and snapshot on `StepStateChanged` events (a manual "checkpoint loop"), or use the **DBOS** runtime plugin to journal state automatically. In-flight steps re-run on recovery, so idempotency is required. | 2 |
| 2 | Model-Agnostic Abstractions | Very broad LLM integrations (OpenAI, Anthropic, Azure, Bedrock, Vertex, Ollama, vLLM and more); structured outputs via Pydantic programs; streaming events. `FunctionAgent` needs function-calling models; `ReActAgent` works with any LLM. | 3 |
| 3 | MCP / A2A Tool Protocols | `llama-index-tools-mcp` consumes MCP servers as tools; workflows can be **exposed as MCP servers**; LlamaCloud services (LlamaParse/LlamaExtract) are available as MCP servers. No documented first-class A2A. | 3 |
| 4 | Multi-Agent Patterns | `AgentWorkflow` supports hand-offs between specialized agents with shared context; orchestrator-with-agents-as-tools and custom planner patterns are documented; parallelism via workflow events. Fewer prebuilt patterns (no group chat/Magentic equivalents). | 2 |
| 5 | Memory & Context Management | `Memory` with short-term chat history plus long-term memory blocks (static, fact-extraction, vector); retrieval is first-class with 40+ vector stores — the framework's core strength (CrewClaw: "retrieval is first-class, not bolted on"). No PHI-aware retention policies. | 3 |
| 6 | Human-in-the-Loop Interrupts | `InputRequiredEvent`/`HumanResponseEvent` and `ctx.wait_for_event` pause a workflow for human input; combined with context serialization the workflow can be resumed later from saved state; LlamaAgents docs list human-in-the-loop review. | 3 |
| 7 | Testing & Debuggability | Workflow visualisation (draw all/most-recent execution), event streaming for step-level inspection, hot reload in `llamactl`, and the LlamaIndex evaluation modules. No mature visual debugger/time-travel equivalent to LangGraph Studio. | 2 |
| 8 | OpenTelemetry-Native Tracing | `llama-index-instrumentation` provides dispatcher-based spans/events with OpenTelemetry export and Arize Phoenix integration; workflows are auto-instrumented. | 3 |
| 9 | Deployment Portability & Security | `llama-agents-server` wraps workflows as REST APIs with streaming and persistence; `llamactl` deploys to LlamaCloud, AWS Bedrock or custom infra, with GitHub Actions CD. Young stack; no built-in code sandbox; LlamaCloud Enterprise offers VPC/hybrid. | 2 |
| 10 | Ecosystem Maturity & LTS | MIT, large LlamaIndex community and 300+ integrations, but the agent/workflow repo is small, the package moved quickly from 1.x to 2.x within about a year, and the vendor's stated strategic focus is document parsing. Smaller funding base ($27.5M). | 2 |

**Pros**
- Best-in-class retrieval and document ingestion, ideal for knowledge-heavy agents (CrewClaw / Turing practitioner).
- Lightweight, async, event-driven design with typed state (vendor blog).
- Consume and expose MCP; LlamaCloud services available as MCP servers (vendor docs).
- DBOS integration offers true durable execution without custom checkpointing (vendor docs).
- OTel/Phoenix instrumentation built in (vendor blog).
- LlamaParse is strong for clinical documents, faxes and PDFs in prior-auth/appeals pipelines (vendor blog).

**Cons**
- Durability is opt-in or manual (vendor docs).
- Fewer multi-agent patterns than LangGraph/CrewAI/AutoGen (vendor docs / practitioner).
- Vendor strategy centred on document parsing; agent framework is secondary (GitHub README).
- Small workflows repo (~453 stars) and rapid major-version churn (GitHub / PyPI).
- Turing notes a narrow search/retrieval focus and limited context retention for complex scenarios (Turing practitioner comparison).
- BAA only on LlamaCloud Enterprise (AIFOXX).

**Pricing:** OSS free. LlamaCloud: Free (10k credits), Starter $50/mo (40k credits), Pro $500/mo (400k credits), Enterprise custom (VPC/hybrid, SSO); 1,000 credits = $1.25.
**Healthcare / HIPAA note:** LlamaCloud lists SOC 2 Type 2 (2025), GDPR and HIPAA; BAAs are "only available for customers on the Enterprise plan." OSS workflows run in the enterprise's own environment with no vendor BAA needed.

---

## Section 2 — Comparison: Agent Framework Feature Scoring Template (0 to 4 Scale)

All 10 capabilities carry equal 10% weight. Weighted = Score × 0.10; Total = Σ weighted (max 4.00); Normalized % = Total ÷ 4.

### 2.1 Raw scores (0–4)

| # | Capability | Description & Evaluation Focus | Weight | Microsoft AutoGen | Semantic Kernel | LangGraph | CrewAI | LlamaIndex Agents |
|---|---|---|---|---|---|---|---|---|
| 1 | Stateful Orchestration & Durability | Graph/state control flow, checkpoints, resume, long-running runs. | 10% | 2 | 2 | 4 | 2 | 2 |
| 2 | Model-Agnostic Abstractions | Multi-provider models, structured outputs, config-only swaps. | 10% | 3 | 3 | 3 | 3 | 3 |
| 3 | MCP / A2A Tool Protocols | Consume MCP servers; expose agents via MCP/A2A; typed tools. | 10% | 2 | 2 | 3 | 3 | 3 |
| 4 | Multi-Agent Patterns | Supervisor, hand-off, hierarchical, parallel composition. | 10% | 3 | 2 | 4 | 3 | 2 |
| 5 | Memory & Context Management | Short/long-term memory, pluggable stores, PHI-aware retention. | 10% | 2 | 3 | 3 | 2 | 3 |
| 6 | Human-in-the-Loop Interrupts | Pause/resume for review and edits from saved state. | 10% | 2 | 2 | 4 | 3 | 3 |
| 7 | Testing & Debuggability | Mocks, eval hooks, visual debugging, reproducible runs. | 10% | 2 | 2 | 4 | 2 | 2 |
| 8 | OpenTelemetry-Native Tracing | GenAI semantic-convention spans exportable to any backend. | 10% | 3 | 3 | 2 | 2 | 3 |
| 9 | Deployment Portability & Security | Containers/K8s/serverless; sandboxed execution; vaulted secrets. | 10% | 2 | 2 | 3 | 3 | 2 |
| 10 | Ecosystem Maturity & LTS | License, backing, community, API stability, commercial support. | 10% | 1 | 2 | 4 | 3 | 2 |
| | **Raw total (max 40)** | | | **22** | **23** | **34** | **26** | **25** |

### 2.2 Weighted scores (Score × Weight) and totals

| # | Capability | Microsoft AutoGen | Semantic Kernel | LangGraph | CrewAI | LlamaIndex Agents |
|---|---|---|---|---|---|---|
| 1 | Stateful Orchestration & Durability | 0.20 | 0.20 | 0.40 | 0.20 | 0.20 |
| 2 | Model-Agnostic Abstractions | 0.30 | 0.30 | 0.30 | 0.30 | 0.30 |
| 3 | MCP / A2A Tool Protocols | 0.20 | 0.20 | 0.30 | 0.30 | 0.30 |
| 4 | Multi-Agent Patterns | 0.30 | 0.20 | 0.40 | 0.30 | 0.20 |
| 5 | Memory & Context Management | 0.20 | 0.30 | 0.30 | 0.20 | 0.30 |
| 6 | Human-in-the-Loop Interrupts | 0.20 | 0.20 | 0.40 | 0.30 | 0.30 |
| 7 | Testing & Debuggability | 0.20 | 0.20 | 0.40 | 0.20 | 0.20 |
| 8 | OpenTelemetry-Native Tracing | 0.30 | 0.30 | 0.20 | 0.20 | 0.30 |
| 9 | Deployment Portability & Security | 0.20 | 0.20 | 0.30 | 0.30 | 0.20 |
| 10 | Ecosystem Maturity & LTS | 0.10 | 0.20 | 0.40 | 0.30 | 0.20 |
| **TOTALS** | **Sum of weighted scores (max 4.0)** | **2.20** | **2.30** | **3.40** | **2.60** | **2.50** |
| | **Normalized to 100%** | **55.0%** | **57.5%** | **85.0%** | **65.0%** | **62.5%** |
| | **Rank** | 5 | 4 | 1 | 2 | 3 |

### 2.3 Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Microsoft AutoGen | Semantic Kernel | LangGraph | CrewAI | LlamaIndex Agents |
|---|---|---|---|---|---|---|
| Standardization Fit | Can most existing pilot code be migrated to this framework with modest effort? | **High Risk** — frozen; any standard built on it must itself be migrated to MAF or AG2. | **Medium-High Risk** — fine for short-lived .NET pilots; not a long-term target. | **Low-Medium Risk** — low-level graph can wrap most pilot logic (including LangChain, raw SDK, even CrewAI/LlamaIndex components as nodes); learning curve is the cost. | **Medium Risk** — easy to port simple role-based pilots; complex deterministic flows need Flows re-design. | **Medium Risk** — natural home for RAG/document pilots; weaker for general multi-agent pilots. |
| Project Longevity | Is the project backed by a stable organization with a clear LTS/versioning policy? | **Fail** — maintenance mode, community-managed. | **Conditional Pass** — Microsoft support to ≥ ~Apr 2027, then successor MAF. | **Pass** — 1.0 with no breaking changes until 2.0; $1.25B-valued vendor. | **Pass (watch)** — funded startup, commercial support; smaller than LangChain. | **Conditional** — funded vendor, but agent layer secondary to document-parsing focus; fast major versions. |
| Platform Coupling | Is the framework tied to one cloud/model vendor's runtime? | Low (library), but future is Microsoft-only via MAF. | Medium — Azure-leaning samples, steers to Foundry. | Low for OSS; Medium if LangSmith Deployment/observability becomes mandatory. | Low for OSS; Medium with AMP. | Low for OSS; Medium with LlamaCloud. |
| Skills Availability | Can we hire and train Python/TypeScript engineers on it readily? | Declining — skills will migrate. | Pass (.NET strongest); declining for SK specifically. | **Pass** — largest talent pool, LangChain Academy. | **Pass** — 100k+ certified developers claimed; easy onboarding. | Pass for RAG skills; thinner for Workflows specifically. |
| Vendor / Roadmap Stability | Is there a credible roadmap for the next 3 years? | Fail — roadmap is MAF. | Fail for SK itself — roadmap is MAF. | Pass. | Pass (watch funding). | Watch — strategy pivoted to document AI. |
| HIPAA / BAA | Can hosted components be covered by a BAA? | N/A (library); model/hosting BAA needed. | N/A (library); Azure BAA covers Azure OpenAI/Foundry. | LangSmith states HIPAA compliance; BAA to confirm (unverified); self-host option. | SOC 2 + HIPAA audit report; BAA not public; Factory self-host. | BAA on LlamaCloud Enterprise only; OSS self-host. |
| Snowflake Fit | How well does it integrate with the Snowflake lakehouse and Cortex? | Custom tools only. | Custom connectors; no Snowflake vector connector found. | **Strong** — `langchain-snowflake` (Cortex Agents, Cortex Search), Snowflake-authored LangGraph + TruLens guide. | Good — AMP Snowflake integration; Cortex LLM provider PR. | Moderate — Snowflake readers/vector integrations in LlamaIndex ecosystem (not verified in this research). |

### 2.4 Analysis — Best Fit & Recommendations

**Best fit — LangGraph (3.40 / 85.0%).** LangGraph leads on the capabilities that separate production healthcare workflows from demos: durable checkpointed state (prior auth, appeals and care-gap outreach can run for days), a first-class `interrupt()`/resume primitive for graduated autonomy, and the most mature debug/eval loop (Studio + LangSmith). Its 1.0 no-breaking-changes-until-2.0 contract and LangChain's $125M Series B make it the lowest-risk *standard* on the Ecosystem Stability pillar, and its broad model integrations serve the Portability pillar. Its weak spot is OTel: tracing is LangSmith-first, so the standard should mandate OTel export (LangSmith OTel or OpenInference) to keep observability vendor-neutral.

**Where the others fit.**
- **CrewAI (2.60)** — the best *productivity* option for role-based, collaborative agent teams and business-led prototypes, with a credible self-hosted enterprise platform (Factory). Use it as a sanctioned exception for low-risk, back-office multi-agent automation, preferably with Flows for control and telemetry to CrewAI disabled.
- **LlamaIndex Agents (2.50)** — the right choice for **document-centric agents** (clinical documents, faxed prior-auth packets, policy manuals). Use LlamaIndex retrieval and LlamaParse as *components* inside LangGraph nodes, or Workflows for self-contained document pipelines.
- **Semantic Kernel (2.30)** and **AutoGen (2.20)** — do **not** select for new work. SK is acceptable only to maintain existing .NET pilots through ≈ April 2027; AutoGen pilots should be migrated now. Microsoft's forward option is **Microsoft Agent Framework**, which should be evaluated as the .NET exception path (it combines SK's enterprise features with AutoGen's patterns and adds checkpointing, HITL, MCP/A2A and OTel), accepting its youth and Foundry pull.

**Snowflake connection.** The framework is the *orchestration* layer; Snowflake is the governed *data and context* layer. Agents should reach PHI through governed interfaces — Snowflake Cortex Agents, Cortex Search and Cortex Analyst over Semantic Views (exposed as MCP tools or via `langchain-snowflake`) — rather than direct SQL from agent code. Long-term memory and audit data (checkpoints, traces, eval results) can land in Postgres/Snowflake with retention policies defined by the enterprise, which also closes the "PHI-aware retention" gap none of the frameworks solve natively. Snowflake's own LangGraph + TruLens guide stores evaluation results natively in Snowflake — a useful reference pattern.

**Recommended target state.**
- **Primary standard:** LangGraph 1.x (Python first; JS where needed), with LangSmith *self-hosted or under BAA* for tracing/evals, OTel export to the enterprise backend, Postgres checkpointer, and MCP as the tool contract (Snowflake Cortex and enterprise APIs exposed as MCP servers).
- **Exception path 1:** CrewAI (Factory, self-hosted) for role-based collaborative automations with lower risk.
- **Exception path 2:** Microsoft Agent Framework for .NET teams and Microsoft 365/Foundry-integrated agents (replacing SK/AutoGen).
- **Component, not framework:** LlamaIndex/LlamaParse for document ingestion and retrieval inside the standard.
- **Interop rule:** cross-framework agents communicate via MCP/A2A, so exception paths do not fork the tool ecosystem.

**Proof-of-concept checklist.**
1. Build a multi-day prior-authorization workflow in LangGraph with a Postgres checkpointer; kill the pod mid-run and verify resume and `interrupt()`-based clinician approval with edits.
2. Wire Snowflake Cortex Search/Analyst as MCP tools and confirm RBAC/row-access policies are enforced end to end for PHI.
3. Export GenAI-convention OTel traces to the enterprise backend (Datadog/Grafana) *and* LangSmith; confirm PHI redaction in traces.
4. Obtain written BAA terms from LangChain (and CrewAI/LlamaIndex if exception paths are used), or validate fully self-hosted deployment in the VPC.
5. Port one existing AutoGen or SK pilot to LangGraph and to MAF; compare effort, token cost and test coverage.
6. Run a CI regression suite with mocked models/tools and LangSmith (or open-source) evals across a model upgrade to measure rework.

---

## Section 3 — Bibliography

### Input files
1. Internal — Report specification (SPEC.md) — `/tmp/claude-0/ai/SPEC.md`
2. Internal — Pattern 2 Agent Frameworks capability template (pattern2.md; from `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md`) — `/tmp/claude-0/ai/pattern2.md`

### Microsoft AutoGen
3. Microsoft (GitHub) — microsoft/autogen repository and maintenance-mode notice — https://github.com/microsoft/autogen
4. Microsoft (GitHub) — AutoGen releases (python-v0.7.3–v0.7.5) — https://github.com/microsoft/autogen/releases
5. Microsoft — AgentChat User Guide — https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html
6. Microsoft — AgentChat Tracing and Observability — https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tracing.html
7. Microsoft — AgentChat Human-in-the-Loop tutorial — https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tutorial/human-in-the-loop.html
8. Microsoft — AutoGen Studio User Guide ("research prototype") — https://microsoft.github.io/autogen/stable/user-guide/autogenstudio-user-guide/index.html
9. AgentMarketCap — Microsoft Retires AutoGen: The First Major Agent Framework Sunset — https://agentmarketcap.ai/blog/2026/04/13/microsoft-autogen-maintenance-mode-agent-framework-sunset-2026
10. DEV Community — AutoGen Is in Maintenance Mode — Migrating to Agent Framework — https://dev.to/felipejac/autogen-is-in-maintenance-mode-migrating-to-agent-framework-39co
11. Analytics Insight — Microsoft AutoGen vs Agent Framework: What Changed? — https://www.analyticsinsight.net/artificial-intelligence/microsoft-autogen-explained-building-multi-agent-ai-systems
12. AG2 (GitHub) — ag2ai/ag2 community fork (formerly AutoGen) — https://github.com/ag2ai/ag2

### Semantic Kernel
13. Microsoft (GitHub) — microsoft/semantic-kernel repository ("Semantic Kernel is now Microsoft Agent Framework") — https://github.com/microsoft/semantic-kernel
14. Microsoft (GitHub) — Semantic Kernel releases (dotnet-1.79–1.80.x, python-1.43–1.44.x) — https://github.com/microsoft/semantic-kernel/releases
15. Microsoft Agent Framework blog — Semantic Kernel and Microsoft Agent Framework (support commitment) — https://devblogs.microsoft.com/agent-framework/semantic-kernel-and-microsoft-agent-framework/
16. Microsoft (GitHub Discussions) — What does the new Microsoft Agent Framework mean for Semantic Kernel? #13215 — https://github.com/microsoft/semantic-kernel/discussions/13215
17. Atlan — Microsoft Semantic Kernel: Features, Status & Successor in 2026 — https://atlan.com/know/ai-agent/microsoft/semantic-kernel/
18. Microsoft Learn — Semantic Kernel Agent Orchestration — https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/
19. Microsoft Learn — Handoff Agent Orchestration — https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/handoff
20. Microsoft Learn — Observability in Semantic Kernel — https://learn.microsoft.com/en-us/semantic-kernel/concepts/enterprise-readiness/observability/
21. Microsoft Learn — Process Framework — https://learn.microsoft.com/en-us/semantic-kernel/frameworks/process/process-framework
22. Microsoft Agent Framework blog — Semantic Kernel: Multi-agent Orchestration — https://devblogs.microsoft.com/agent-framework/semantic-kernel-multi-agent-orchestration/
23. Start Debugging — Migrate a Semantic Kernel App to Microsoft Agent Framework 1.0 — https://startdebugging.net/2026/07/migrate-a-semantic-kernel-app-to-microsoft-agent-framework-1-0/
24. Medium (B. Koya) — Migrating from Semantic Kernel Agents to Microsoft Agent Framework in .NET — https://medium.com/@bhargavkoya56/migrating-from-semantic-kernel-agents-to-microsoft-agent-framework-in-net-42f8236327dc

### Microsoft Agent Framework (sidebar)
25. Microsoft Agent Framework blog — Microsoft Agent Framework Version 1.0 — https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/
26. Microsoft Agent Framework blog — Microsoft Agent Framework at BUILD 2026 — https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-at-build-2026-announce/
27. InfoQ — Microsoft Agent Framework Harness and Hosted Agents Reach General Availability — https://www.infoq.com/news/2026/08/agent-framework-harness-ga/
28. Microsoft (GitHub) — microsoft/agent-framework repository — https://github.com/microsoft/agent-framework
29. Microsoft (GitHub Discussions) — Roadmap and planned release schedule for MAF (Python) #4262 — https://github.com/microsoft/agent-framework/discussions/4262
30. Atlan — Microsoft Agent Framework: Features, Status & Gaps in 2026 — https://atlan.com/know/ai-agent/microsoft/agent-framework/
31. Visual Studio Magazine — Microsoft Ships Production-Ready Agent Framework 1.0 for .NET and Python — https://visualstudiomagazine.com/articles/2026/04/06/microsoft-ships-production-ready-agent-framework-1-0-for-net-and-python.aspx
32. Microsoft Community Hub — The Future of Agentic AI: Inside Microsoft Agent Framework 1.0 — https://techcommunity.microsoft.com/blog/azuredevcommunityblog/the-future-of-agentic-ai-inside-microsoft-agent-framework-1-0/4510698
33. Alex Bevilacqua — Two Lineages, One Framework: How AutoGen and Semantic Kernel Became the Microsoft Agent Framework — https://alexbevi.com/blog/2026/06/18/two-lineages-one-framework-how-autogen-and-semantic-kernel-became-the-microsoft-agent-framework/
34. European AI & Cloud Summit — Microsoft Agent Framework: the production-ready convergence of AutoGen and Semantic Kernel — https://cloudsummit.eu/blog/microsoft-agent-framework-production-ready-convergence-autogen-semantic-kernel

### LangGraph (LangChain)
35. LangChain (GitHub) — langchain-ai/langgraph repository — https://github.com/langchain-ai/langgraph
36. LangChain — LangChain and LangGraph Agent Frameworks Reach v1.0 Milestones — https://www.langchain.com/blog/langchain-langgraph-1dot0
37. LangChain Forum — We launched 1.0 versions of LangChain and LangGraph — https://forum.langchain.com/t/we-launched-1-0-versions-of-langchain-and-langgraph/1904
38. LangChain — LangChain raises $125M to build the platform for agent engineering — https://www.langchain.com/blog/series-b
39. SiliconANGLE — AI agent tooling provider LangChain raises $125M at $1.25B valuation — https://siliconangle.com/2025/10/20/ai-agent-tooling-provider-langchain-raises-125m-1-25b-valuation/
40. LangChain — LangSmith Plans and Pricing — https://www.langchain.com/pricing
41. LangChain Docs — Persistence (LangGraph) — https://docs.langchain.com/oss/python/langgraph/persistence
42. LangChain Docs — Interrupts (LangGraph) — https://docs.langchain.com/oss/python/langgraph/interrupts
43. LangChain Docs — MCP endpoint in Agent Server — https://docs.langchain.com/langsmith/server-mcp
44. LangChain (GitHub) — langchain-mcp-adapters — https://github.com/langchain-ai/langchain-mcp-adapters
45. LangChain (GitHub issue) — langchain-a2a-adapters #35724 — https://github.com/langchain-ai/langchain/issues/35724
46. LangChain — Introducing End-to-End OpenTelemetry Support in LangSmith — https://www.langchain.com/blog/end-to-end-opentelemetry-langsmith
47. LangChain Docs — Trace with OpenTelemetry — https://docs.langchain.com/langsmith/trace-with-opentelemetry
48. LangChain Docs — Regions FAQ (SOC 2 Type 2, HIPAA, regions) — https://docs.langchain.com/langsmith/regions-faq
49. LangChain — Trust Center — https://trust.langchain.com/
50. LangChain — LangSmith Deployment — https://www.langchain.com/langsmith/deployment
51. Snowflake — Build and Evaluate Multi-Agent Systems with Snowflake and LangGraph — https://www.snowflake.com/en/developers/guides/build-and-evaluate-agents-with-langgraph-and-snowflake/
52. LangChain Reference — langchain_snowflake SnowflakeCortexAgent — https://reference.langchain.com/python/langchain-snowflake/agents/base/SnowflakeCortexAgent

### CrewAI
53. CrewAI (GitHub) — crewAIInc/crewAI repository — https://github.com/crewAIInc/crewAI
54. CrewAI — CrewAI AMP: The Agent Management Platform (blog) — https://crewai.com/blog/crewai-amp---the-agent-management-platform
55. CrewAI — Agent Management Platform (product page) — https://crewai.com/agent-management-platform
56. CrewAI Docs — CrewAI AMP introduction — https://docs-platform.crewai.com/platform/en/introduction
57. CrewAI Docs — Flows — https://docs.crewai.com/en/concepts/flows
58. CrewAI Docs — OpenTelemetry Export (AMP) — https://docs-platform.crewai.com/platform/en/guides/capture_telemetry_logs
59. CrewAI — Unlocking agent-native transformation with CrewAI Factory and NVIDIA — https://blog.crewai.com/unlocking-agent-native-transformation-with-crewai-factory-and-nvidia/
60. CrewAI — Trust Center — https://trust.crewai.com/
61. AIFOXX — CrewAI, Inc. Security & Compliance (SOC 2, HIPAA) — https://aifoxx.com/trust/crewai
62. ZenML — CrewAI Pricing Guide (competitor-adjacent tooling vendor) — https://www.zenml.io/blog/crewai-pricing
63. Wikipedia — CrewAI — https://en.wikipedia.org/wiki/CrewAI
64. CrewAI Docs — Snowflake Integration (AMP) — https://docs.crewai.com/en/enterprise/integrations/snowflake
65. CrewAI (GitHub PR) — feat: add Snowflake Cortex as native LLM provider #4965 — https://github.com/crewAIInc/crewAI/pull/4965
66. CrewAI Community — How to save Flow state and restart from checkpoint? — https://community.crewai.com/t/how-to-save-flow-state-and-restart-from-checkpoint/4640
67. CrewAI Community — Disable Telemetry for production — https://community.crewai.com/t/disable-telemetry-for-production/4989
68. LinkedIn (J. Owyang) — CrewAI Series B reinvestment post (details unverified) — https://www.linkedin.com/posts/jowyang_we-are-thrilled-to-reinvest-in-crewai-for-activity-7487900581643173888-f101

### LlamaIndex Agents (Workflows / AgentWorkflow / LlamaAgents)
69. LlamaIndex (GitHub) — run-llama/llama_index repository — https://github.com/run-llama/llama_index
70. LlamaIndex (GitHub) — run-llama/workflows-py (LlamaAgents) — https://github.com/run-llama/workflows-py
71. PyPI — llama-index-workflows — https://pypi.org/project/llama-index-workflows/
72. LlamaIndex — Announcing Workflows 1.0 — https://www.llamaindex.ai/blog/announcing-workflows-1-0-a-lightweight-framework-for-agentic-systems
73. LlamaIndex — Introducing AgentWorkflow — https://www.llamaindex.ai/blog/introducing-agentworkflow-a-powerful-system-for-building-ai-agent-systems
74. LlamaIndex Docs — LlamaAgents Overview — https://developers.llamaindex.ai/python/llamaagents/overview/
75. LlamaIndex Docs — Writing durable workflows — https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/
76. LlamaIndex Docs — DBOS Durable Execution — https://developers.llamaindex.ai/python/llamaagents/workflows/dbos/
77. LlamaIndex Docs — Model Context Protocol (MCP) — https://developers.llamaindex.ai/python/framework/module_guides/mcp/
78. LlamaIndex — LlamaAgents Open Preview: Build Document Agents — https://www.llamaindex.ai/blog/llamaagents-build-serve-and-deploy-document-agents
79. LlamaIndex — Pricing (LlamaCloud / LlamaParse) — https://www.llamaindex.ai/pricing
80. LlamaIndex — Series A and LlamaCloud/LlamaParse GA announcement — https://www.llamaindex.ai/blog/announcing-our-series-a-and-llamacloud-general-availability
81. PR Newswire — LlamaIndex Secures $19 Million Series A — https://www.prnewswire.com/news-releases/llamaindex-secures-19-million-series-a-to-power-enterprise-grade-knowledge-agents-302390936.html
82. AIFOXX — LlamaIndex, Inc. Security & Compliance (SOC 2, GDPR, HIPAA) — https://aifoxx.com/trust/llamaindex

### Analyst research (Gartner / Forrester / IDC)
83. Gartner — Innovation Insight: AI Agent Development Frameworks (27 Aug 2025) — https://www.gartner.com/en/documents/6888866
84. Gartner — Innovation Insight for the AI Agent Platform Landscape — https://www.gartner.com/en/documents/6300015
85. Solace (vendor-authored) — AI Agent Development Frameworks: Takeaways from Gartner Innovation Insight — https://solace.com/blog/ai-agent-dev-frameworks-gartner/
86. xpander.ai (vendor-authored) — Gartner's Hype Cycle for Agentic AI: What It Means for AI Agent Development Platforms — https://xpander.ai/blog/gartner-hype-cycle-for-agentic-ai-what-it-means-for-ai-agent-development-platforms
87. Microsoft Azure Blog (vendor-authored) — Microsoft named a Leader in Gartner Magic Quadrant for AI Application Development Platforms — https://azure.microsoft.com/en-us/blog/microsoft-named-a-leader-in-gartner-magic-quadrant-for-ai-application-development-platforms/
88. Visual Studio Magazine — Microsoft Again Named a Leader in AI AppDev Platforms Research (Dec 2025) — https://visualstudiomagazine.com/articles/2025/12/18/microsoft-again-named-a-leader-in-ai-application-development-platforms-research.aspx

### Comparisons, reviews & practitioner articles
89. N-iX — LangGraph vs CrewAI vs AutoGen 2026: Full comparison — https://www.n-ix.com/langgraph-vs-crewai-vs-autogen/
90. Turing — A Detailed Comparison of Top 6 AI Agent Frameworks in 2026 — https://www.turing.com/resources/ai-agent-frameworks
91. CrewClaw (competitor-authored; no-code agent builder) — CrewAI vs LangGraph vs AutoGen vs LlamaIndex Agents (2026) — https://crewclaw.com/blog/crewai-vs-langgraph-vs-autogen-2026
92. LangChain (vendor-authored) — LangChain vs. AutoGen in 2026: What the Maintenance Announcement Changed — https://www.langchain.com/resources/langchain-vs-autogen
93. LangChain (vendor-authored) — The best AI agent frameworks in 2026 — https://www.langchain.com/resources/ai-agent-frameworks
94. Towards AI — LangGraph vs CrewAI vs AutoGen: Which AI Agent Framework Should Your Enterprise Use in 2026? — https://pub.towardsai.net/langgraph-vs-crewai-vs-autogen-which-ai-agent-framework-should-your-enterprise-use-in-2026-3a9ebb407b09?gi=8ff4feb18a77
95. Towards Data Science — Lessons Learned from Upgrading to LangChain 1.0 in Production — https://towardsdatascience.com/lessons-learnt-from-upgrading-to-langchain-1-0-in-production/
96. Diagrid (vendor-authored) — How do I handle persistent checkpointing for my CrewAI agent workflows? — https://www.diagrid.io/faq/agent-frameworks-integration/how-do-i-handle-persistent-checkpointing-for-my-crewai-agent-workflows
97. Langfuse (vendor-authored) — Observability for CrewAI with Langfuse Integration — https://langfuse.com/docs/integrations/crewai
98. Firecrawl — The best open source frameworks for building AI agents in 2026 — https://www.firecrawl.dev/blog/best-open-source-agent-frameworks

*Scores are research-based estimates as of September 2026, drawn from public documentation, analyst press coverage and practitioner sources; they should be validated through a hands-on proof of concept against the enterprise's own healthcare workflows, security review and BAA negotiations before any standardization decision.*
