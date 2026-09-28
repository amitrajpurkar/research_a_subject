# Agent Platforms Vendor Comparison — Healthcare Enterprise AI Pattern

**AI pattern:** Pattern 1 — Agent Platforms (managed, enterprise-grade platforms to build, deploy, govern and run AI agents at scale)
**Evaluation basis:** `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md` — Pattern 1 (Part 1 top-10 capabilities, Part 2 pillar weighting, Part 3 scoring template, Part 4 qualitative risk)
**Vendor list source:** `OUTPUTS/ipaas/ai_vendor_list.md`
**Vendors assessed:** Microsoft Copilot Studio; Microsoft Foundry (formerly Azure AI Foundry) Agent Service; Amazon Bedrock AgentCore (with Amazon Bedrock Agents, now "Classic", as context); Google Gemini Enterprise Agent Platform (formerly Vertex AI / Vertex AI Agent Builder); plus a reference column, **Ref: Snowflake Cortex Agents** (not ranked)
**Research date:** September 2026 (sources: vendor documentation, release notes and blogs; Gartner Magic Quadrant for AI Application Development Platforms, 2026 Hype Cycle for Agentic AI, Gartner Peer Insights; The Forrester Wave: AI Platforms, Q3 2026; G2, PeerSpot; practitioner and trade-press articles. See Section 3)

**Scoring scale (0–4)**

| Score | Meaning |
|---|---|
| 0 | Not supported |
| 1 | Basic / custom scripting required |
| 2 | Out-of-the-box / configurable |
| 3 | Advanced / native cloud integration |
| 4 | Fully automated / AI-driven market leader |

**Strategic pillar weights (Pattern 1, Part 2)**

| Strategic Evaluation Pillar | Assigned Weight (%) | Focus Rationale |
|---|---|---|
| Governance, Security & PHI Compliance | 20% | Agent identity, guardrails, HIPAA/BAA, auditability of autonomous actions. |
| Enterprise Adaptability & Interoperability | 20% | MCP/A2A openness, connectors to EHR/claims/Snowflake, reuse across domains. |
| Portability (Model & Cloud) | 15% | Model-agnostic runtime; deployable across clouds / VPC; avoid lock-in. |
| Value-Realization Potential | 15% | Time from pilot to production; measurable business outcomes. |
| Complexity & Tech Rationalization | 15% | Consolidating fragmented pilot tooling into one governed platform. |
| Operational Costs & FinOps | 15% | Predictable consumption cost; chargeback by domain. |

**How to read the scores.** Each of the 10 capabilities carries an equal 10% weight in the numeric score (Section 2.1–2.2). The pillar weights above are not applied as multipliers; they frame the qualitative risk and fit assessment (Section 2.3) and the recommendation (Section 2.4), where governance/PHI and interoperability count most. A difference of 1–2 raw points (0.1–0.2 weighted) between vendors is within the error margin of desk research and must be confirmed in a proof of concept. Scores reflect generally available (GA) capability as of September 2026. Preview features are noted but get less credit, because Google's and others' BAAs exclude pre-GA features from PHI use [44].

**Scoping notes**

- **Microsoft has two products in scope, and they converge.** Copilot Studio (low-code, SaaS, Power Platform-based) and Microsoft Foundry Agent Service (pro-code, Azure PaaS) are scored separately. Since Build 2026 (June 2026), Microsoft positions them as "two front doors over one agent runtime": both use the A2A protocol, the Microsoft IQ knowledge layer and the Microsoft Agent Framework [13], and both are governed by Microsoft Agent 365 and Entra Agent ID [12][7].
- **Azure AI Foundry → Microsoft Foundry: confirmed.** Microsoft renamed Azure AI Foundry to **Microsoft Foundry** in November 2025 (Ignite) [22][23]. Microsoft's own documentation now uses the name "Microsoft Foundry Agent Service" and has moved to `learn.microsoft.com/azure/foundry/` [16]. This report uses "Microsoft Foundry" (or "Foundry"). The earlier path was Azure AI Studio → Azure AI Foundry (Nov 2024) → Microsoft Foundry (Nov 2025).
- **AWS: we score Amazon Bedrock AgentCore, not Bedrock Agents.** On **30 July 2026** AWS put Amazon Bedrock Agents into maintenance mode, renamed it "Bedrock Agents Classic" and closed it to new customers. `CreateAgent` returns HTTP 403 for accounts with no activity in the prior 12 months, the model catalog is frozen, and no new features are planned [33]. AgentCore (GA 13 Oct 2025 [26]) is the stated replacement, with a config-based "AgentCore Managed Harness" as the migration target [33]. A new standard cannot be built on Bedrock Agents Classic, so the AWS column is **"AWS Bedrock AgentCore"**. Classic facts appear only as context.
- **Google: Vertex AI Agent Builder is now part of "Gemini Enterprise Agent Platform".** On **22 April 2026** (Google Cloud Next '26), Google renamed Vertex AI to **Gemini Enterprise Agent Platform**. Google says future Vertex AI services and roadmap items will be delivered through Agent Platform [40][46][47]. Its parts are: **ADK** (open-source, code-first Agent Development Kit, unchanged by the rename) [48]; **Agent Studio** (low-code, exports to ADK); **Agent Runtime** (the renamed and revamped **Agent Engine**, the managed runtime); Memory Bank, Sessions, Agent Registry, Agent Identity, Agent Gateway, Model Armor, Agent Evaluation/Simulation/Observability [40]. **Gemini Enterprise** (formerly Agentspace) is the employee-facing app and front door. Agents built with ADK and deployed to Agent Runtime are registered there for employees to use [49][40]. The Google column scores the Agent Platform agent stack (ADK + Agent Runtime + governance services), with Gemini Enterprise as its delivery surface.
- **Snowflake Cortex Agents is a reference column.** Snowflake is the enterprise data platform, and its licences are already purchased. Cortex Agents is scored so that you can judge whether it is a "data agent" feeding the enterprise agent platform, not a replacement for one. It is not ranked.
- **Category mismatch to note.** Gartner's closest Magic Quadrant is **AI Application Development Platforms**. It covers Foundry, Bedrock/AgentCore and Gemini Enterprise Agent Platform/Vertex, but **not Copilot Studio**, a low-code SaaS product that Gartner covers in other markets (unverified), **nor Snowflake** [66][69].

---

## Section 1 — Vendor Profiles against the 10 Capabilities

The 10 capabilities (Pattern 1, Part 1):
1. Agent Lifecycle Management
2. Model Choice & Portability
3. Enterprise & Healthcare Connectors
4. Open Interoperability (MCP / A2A)
5. Agent Identity & Least Privilege
6. Guardrails & HIPAA/PHI Safety
7. Human-in-the-Loop Controls
8. Evaluation & Quality Gates
9. Observability & Audit Trail
10. FinOps & Domain Isolation

### 1.1 Microsoft Copilot Studio

**Context:** Copilot Studio is Microsoft's low-code agent builder. It runs as SaaS on the Power Platform/Dataverse substrate and publishes agents to Microsoft 365 Copilot, Teams, web and voice channels. In 2026 it gained GA A2A (April), GA computer-using agents and a new workflows designer (May), mandatory Entra Agent IDs for new agents (May–July), MCP server tooling, and a multi-vendor model line-up including Anthropic Claude and OpenAI GPT-5.x [3][4][7]. At Build 2026 (June 2–3) Microsoft previewed a rebuilt authoring model: four surfaces (Skills using `SKILL.md`, Tools, Knowledge, Connected agents), a new agentic orchestrator, and Foundry as the shared runtime. The classic experience remains supported [13]. Governance now runs through **Microsoft Agent 365** (GA 1 May 2026), a cross-platform agent registry and security control plane [12]. Gartner does not place Copilot Studio in the AI Application Development Platforms MQ. Peer reviews are positive on ease of use (G2 4.4/5 from 155 reviews [14]; PeerSpot 3.9/5, a small sample [15]).

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Agent Lifecycle Management | ALM uses Power Platform solutions, dev/test/prod environments, Power Platform Pipelines, Azure DevOps or GitHub Actions, and native Git integration [8]. Several settings are not solution-aware and must be reconfigured after each deployment: auth, channels, App Insights and sharing [8]. An agent inventory schema (May 2026) and Agent 365's registry give a tenant-wide catalog with owner and permission views [3][12]. Lifecycle visibility for approval, test and publish status was added in May 2026 [4]. | 3 |
| 2 | Model Choice & Portability | Makers can choose OpenAI GPT-5/5.5 and Anthropic Claude Sonnet 4.5/4.6/5 and Opus models (GA March–June 2026), and can bring Foundry-hosted models [3]. Deployment is SaaS only: no customer-VPC, other-cloud or on-prem runtime, and agents are stored in Dataverse. Portability of agent definitions outside Microsoft is limited, although the new `SKILL.md` skills can be imported from and exported to GitHub Copilot and Claude Code [13]. | 2 |
| 3 | Enterprise & Healthcare Connectors | Makers get the Power Platform connector catalog (1,000+ connectors; exact count unverified), SharePoint/Graph grounding, Microsoft IQ (Work IQ, Fabric IQ, Foundry IQ) knowledge (June 2026) and Dataverse [3][13]. Snowflake is reachable through a Power Platform connector (unverified) or an MCP server. No packaged FHIR/EHR or claims connectors were found; they would need custom connectors or MCP. Permission-aware grounding comes from Graph/SharePoint ACLs. | 3 |
| 4 | Open Interoperability (MCP / A2A) | A2A went GA in April 2026 for delegating to specialist agents, and in June 2026 other agents could be used as tools [3][4]. MCP servers can be added as tools, with a Microsoft certification path for MCP servers (July 2026) [3]. REST/OpenAPI custom connectors are long-standing. The Build 2026 rebuild makes "Connected agents" the multi-agent surface [13]. | 3 |
| 5 | Agent Identity & Least Privilege | Every new agent automatically gets a **Microsoft Entra Agent ID** (mandatory, no opt-out), created from a tenant "blueprint" principal. Connector permissions appear as API permissions and can be targeted by Conditional Access [7]. End-user authentication and per-connector connection references are supported [8]. The main risk is makers sharing agents that run on their own (maker) credentials. Agent 365 adds Entra network controls for agents [12]. | 3 |
| 6 | Guardrails & HIPAA/PHI Safety | Copilot Studio is covered under Microsoft's HIPAA BAA, with a "not a medical device" caveat [9]. Content moderation settings, Purview data protection for agent workflows, and Defender runtime protection via Agent 365 are available [12]. PHI-specific redaction is not a native, configurable Copilot Studio guardrail. It relies on Purview DLP and design (low confidence on depth). Geographic data residency must be managed per environment [9]. | 3 |
| 7 | Human-in-the-Loop Controls | The "Request information" action (Nov 2025) pauses for human input [3]. The new workflows designer includes **human-review nodes**, approvals and condition groups, and can embed agent nodes into deterministic flows [4][5][13]. Power Automate/Teams approvals are mature and familiar to business users. Autonomy levels are configured through workflow design rather than one per-agent "autonomy dial". | 3 |
| 8 | Evaluation & Quality Gates | Agent Evaluations went GA in March 2026 with customizable and multi-turn test sets, CSV import, activity maps, a REST API for automated evaluation, and a Power Automate connector (April 2026) [3]. There is no native LLM-as-judge rubric library comparable to Foundry's, and red-teaming comes from a Foundry-based sample, not a product feature (unverified depth). CI/CD gating is possible through the API but is not turnkey. | 2 |
| 9 | Observability & Audit Trail | Built-in analytics cover themes, custom metrics, and time and cost savings. Environment-level telemetry export to Application Insights arrived in July 2026 [3]. Audit comes through Purview/Entra logs, and Agent 365 correlates agent activity in Defender [12]. Step-level traces are less granular than Foundry's OpenTelemetry tracing, and reviewers criticise the analytics visuals [15]. | 2 |
| 10 | FinOps & Domain Isolation | Pricing is Copilot Credits: prepaid packs of 25,000 credits for about $200/month, or pay-as-you-go at about $0.01/credit through Azure. Actions are priced differently (generative answer 2 credits, agent action 5, tenant graph grounding 10) [10][11]. An agent usage estimator helps forecasting [5]. Environments give strong domain isolation, with capacity allocatable per environment. Chargeback is by environment rather than by agent. | 3 |

**Pros**
- Fastest path from idea to agent for business makers: low-code authoring plus Microsoft 365/Teams distribution (G2)
- Covered by Microsoft's HIPAA BAA, with a documented compliance posture (vendor docs)
- Entra Agent ID is mandatory for all new agents, and Conditional Access applies to connector permissions (vendor docs)
- Mature business approvals and human-review nodes inside the new workflows designer (vendor docs)
- A2A and MCP are both GA, and agents can call Foundry agents: "two front doors, one runtime" (practitioner blog)
- Environments plus Agent 365 give a tenant-wide agent inventory and domain isolation (vendor docs)

**Cons**
- Credit-based pricing is hard to forecast; costs vary widely with agent design (practitioner blog / G2)
- SaaS-only, so there is no customer-VPC, multi-cloud or on-prem runtime, and lock-in to Microsoft 365 and Power Platform is high (vendor docs)
- ALM gaps: auth, channels and App Insights settings are not solution-aware and must be reapplied per environment (vendor docs)
- Complex customization raises the learning curve, and reviewers report RAG accuracy concerns (G2 / PeerSpot)
- Platform churn: the June 2026 rebuild runs alongside the classic experience, so teams must plan a migration (practitioner blog)
- Weaker evaluation, red-teaming and trace depth than pro-code platforms (vendor docs)

**Pricing:** Copilot Credits: $200/month per 25,000-credit pack, or about $0.01/credit pay-as-you-go. Internal use by Microsoft 365 Copilot-licensed users is largely zero-rated [10][11]. Agent 365 costs $15/user/month or is included in M365 E7 [12].
**Healthcare / HIPAA note:** Covered under the Microsoft HIPAA BAA, not for use as a medical device [9]. Check that each connector, MCP server and third-party model (for example Anthropic via Microsoft) used with PHI is within BAA scope. Web/Bing grounding should be disabled for PHI agents (low confidence on formal exclusion).

### 1.2 Microsoft Foundry (formerly Azure AI Foundry) — Foundry Agent Service

**Context:** Foundry Agent Service is Microsoft's pro-code managed agent runtime within **Microsoft Foundry**, the name Azure AI Foundry took in November 2025 [22]. It offers three agent types: **prompt agents** (declarative), **workflow agents**, and **hosted agents** (containers running Microsoft Agent Framework, LangGraph, OpenAI Agents SDK, Anthropic SDK or custom code). Hosted agents run in per-session VM-isolated sandboxes, and each agent gets a dedicated Entra identity [16][17]. **Foundry Control Plane** provides fleet inventory, compliance policies, red-team scheduling and cost tracking across Foundry and non-Microsoft agents [18]. Agent 365 integration extends governance to Microsoft 365 [20]. Gartner named Microsoft a **Leader** in the 2025 MQ for AI Application Development Platforms, placed **furthest for Completeness of Vision**, citing Foundry Agent Service, Foundry IQ and Foundry Control Plane [67][69]. Microsoft was among the 15 vendors in The Forrester Wave: AI Platforms, Q3 2026; its placement was not visible in public sources [74].

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Agent Lifecycle Management | Automatic version snapshots let agents be promoted to stable, managed endpoints. The documented lifecycle is create → test → trace → evaluate → optimize → publish → monitor [16]. Control Plane "Assets" gives one searchable inventory of agents, models and tools, with versioned policies and bulk remediation [18]. Publishing to the Entra Agent Registry, Teams and M365 Copilot [16] adds agents to the Agent 365 catalog [20]. Formal approval gates depend on Azure DevOps/GitHub pipelines. | 3 |
| 2 | Model Choice & Portability | The Foundry catalog spans OpenAI, Anthropic Claude (Haiku/Sonnet/Opus), Llama, DeepSeek, Mistral and more, and a GA model router picks the model automatically [16][22][25]. Models can be swapped without code changes [16]. Hosted agents take any framework as a container [17]. Private networking uses BYO VNet and BYO storage/Search/Cosmos DB [16]. The runtime is Azure-only; Foundry Local covers on-device inference, not an on-prem agent runtime. | 3 |
| 3 | Enterprise & Healthcare Connectors | Foundry IQ provides permission-aware knowledge bases; there are SharePoint, Microsoft Fabric, Bing and Azure AI Search connections, and 1,000+ Azure Logic Apps connectors are available as tools [21][22]. Remote MCP servers can also be connected [16]. Healthcare-specific connectors (Azure Health Data Services FHIR) are possible through OpenAPI/MCP; we found no packaged FHIR tool (unverified). Snowflake connects via Logic Apps or Snowflake's managed MCP server [52]. | 3 |
| 4 | Open Interoperability (MCP / A2A) | Native MCP tools include remote MCP servers and Azure Functions MCP webhooks, with key, Entra and OAuth identity-passthrough auth [16]. **A2A v1.0 is GA**, alongside the OpenResponses, Invocations and M365 Activity protocols [16]. OpenAPI tools are supported. Toolboxes curate and version tool sets centrally [16]. Gartner cites Microsoft's focus on agent orchestration [69]. | 4 |
| 5 | Agent Identity & Least Privilege | Each agent automatically gets a dedicated **Microsoft Entra identity** with RBAC-scoped access [16][17]. OAuth 2.0 **On-Behalf-Of** is supported for user-invoked scenarios [17]. Secrets go in Key Vault and managed connections, not in images [17]. Agents appear in the Entra Agent Registry and Agent 365 with Conditional Access and Entra network controls [12][20]. | 4 |
| 6 | Guardrails & HIPAA/PHI Safety | Integrated content-safety filters mitigate prompt injection and cross-prompt injection (XPIA) [16]. Control Plane enforces enterprise-wide guardrail policies integrated with Azure Policy, Defender and Purview [18]. Azure OpenAI is covered by Microsoft's HIPAA BAA via the DPA. A Microsoft Q&A answer says partner models and the Agent Service are not explicitly listed, and recommends VNet + private endpoints and text-only PHI [24] (low confidence; confirm with Microsoft). PHI redaction is done through Purview or Azure AI Language PII (unverified). | 3 |
| 7 | Human-in-the-Loop Controls | Workflow agents support human-in-the-loop steps, and MCP tool calls can require approval before running (unverified detail). The AI Red Teaming Agent classifies "High-Risk (requires human-in-the-loop)" actions and tests whether agents respect them [19]. Business-user approval UX usually comes via Copilot Studio or Teams. | 3 |
| 8 | Evaluation & Quality Gates | Built-in evaluators cover task adherence, intent resolution, tool-call success, groundedness and jailbreak exposure. Continuous evaluation runs in Control Plane [18]. The **AI Red Teaming Agent** (PyRIT-based) tests agent-specific risks (prohibited actions, sensitive-data leakage, task adherence, indirect prompt injection) and produces Attack Success Rate scorecards [19]. The Agent Optimizer (preview) improves instructions automatically [16]. Evaluations can be run in CI via SDK/GitHub Actions (unverified packaging). | 4 |
| 9 | Observability & Audit Trail | End-to-end tracing covers every model call and tool invocation. OpenTelemetry traces go to Application Insights by default [16][17]. Control Plane correlates alerts, evaluation results and traces, and shows Defender and Purview alerts [18]. The immutable action audit relies on Azure Monitor/Purview retention configuration. | 3 |
| 10 | FinOps & Domain Isolation | Control Plane tracks quotas, token usage and cost anomalies. An AI Gateway (APIM-based) is needed to enforce token limits [18]. Foundry projects and Azure subscriptions and tags give domain isolation and chargeback through Azure Cost Management. There is no extra charge for prompt/workflow agents; hosted agents bill by container CPU/memory [21]. | 3 |

**Pros**
- Gartner Leader, furthest on Completeness of Vision in the AI Application Development Platforms MQ (Gartner, via vendor blog)
- The broadest model catalog of any hyperscaler, including OpenAI and Anthropic Claude, with a model router (vendor docs / trade press)
- A2A v1.0 GA plus MCP and OpenAPI; hosted agents accept any framework (vendor docs)
- Per-agent Entra identity with OBO, plus Agent 365 and Defender/Purview governance (vendor docs)
- Best-in-class evaluation and red-teaming tooling for agent-specific risks (vendor docs)
- Shares a runtime and governance with Copilot Studio, so low-code and pro-code agents can sit on one platform (practitioner blog)

**Cons**
- The runtime runs only on Azure; Foundry Local does not host production agents on-prem (vendor docs)
- HIPAA BAA coverage of partner models and Agent Service features is not explicitly documented (Microsoft Q&A / community)
- Two overlapping control planes (Foundry Control Plane and Agent 365) add governance-design complexity (vendor docs / trade press)
- Frequent rebrands and SDK churn (Azure AI Studio → AI Foundry → Microsoft Foundry) create documentation drift (practitioner blog)
- Red-teaming does not yet cover workflow agents, non-Foundry agents or function/browser tools (vendor docs)
- Enforcing costs needs an AI Gateway/APIM in addition to Control Plane dashboards (vendor docs)

**Pricing:** No additional charge for prompt and workflow agents. You pay for model tokens, hosted-agent container compute (per CPU/memory-hour), built-in tools (file-search storage, code interpreter sessions, web search per 1K) and connected services [21].
**Healthcare / HIPAA note:** Azure OpenAI is in scope of the Microsoft HIPAA BAA [24]. Before PHI flows, get written confirmation from Microsoft that Foundry Agent Service, hosted agents, memory and each partner model (for example Claude) are covered. Deploy with VNet isolation and private endpoints, and consider disabling abuse-monitoring data storage [24].

### 1.3 Amazon Bedrock Agents → Amazon Bedrock AgentCore (scored: **AgentCore**)

**Context:** Amazon Bedrock Agents (launched November 2023) was AWS's configuration-driven agent service [39]. On **30 July 2026** it entered maintenance mode as "Bedrock Agents Classic": closed to new customers, model catalog frozen, no new features, and no end-of-life date [33]. **Amazon Bedrock AgentCore** (GA 13 Oct 2025) replaces it [26]. AgentCore is a modular, framework- and model-agnostic set of services: Runtime (serverless microVM sessions of up to 8 hours), Gateway (MCP/tools), Identity, Memory, Browser, Code Interpreter, Observability, Policy (Cedar; GA March 2026; Bedrock Guardrails in Policy GA June 2026), Evaluations (GA 31 March 2026), and **AWS Agent Registry** (GA 31 Aug 2026) [26][29][30][31][38]. **This report scores AgentCore**, including the AgentCore Managed Harness for config-style agents [33]. Gartner named AWS a Leader in the 2025 AI Application Development Platforms MQ, citing guardrails and automated reasoning checks [69]. Forrester rated AWS a Leader in the AI Platforms Wave, Q3 2026, according to a partner summary [76]. Amazon Bedrock has 734 Gartner Peer Insights ratings (4.6/5, 2026 Customers' Choice) in AI Application Development Platforms [72].

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Agent Lifecycle Management | **AWS Agent Registry** (GA Aug 2026) catalogs agents, MCP servers, A2A agent cards and skills. It has role-based approval workflows, lifecycle states (draft, pending approval, approved, rejected, deprecated), version history and a CloudTrail audit [31][32]. Provisioning uses CloudFormation, Terraform and CDK; RAM enables cross-account sharing; runtime agents are detected automatically [31]. The registry proves only existence and approval, not correctness [80]. | 3 |
| 2 | Model Choice & Portability | Any model inside or outside Bedrock can be used: Claude, OpenAI, Gemini, Nova, Llama, Mistral [27]. Any framework can be used: Strands, LangGraph, CrewAI, LlamaIndex, Google ADK, OpenAI Agents SDK, Claude Agent SDK [27][33]. VPC connectivity and PrivateLink cover all AgentCore services [27]. Agent code stays in open frameworks, so it is portable to other runtimes. This is the most model- and framework-agnostic of the hyperscaler runtimes. | 4 |
| 3 | Enterprise & Healthcare Connectors | Gateway turns APIs and Lambda functions into MCP tools, and thousands of MCP servers can be connected [26][38]. Bedrock Knowledge Bases (unaffected by the Classic change [33]) provide RAG connectors. The registry integrates discovery of Amazon Quick connectors [31]. There is less of a packaged SaaS connector catalog than Microsoft offers. FHIR (for example AWS HealthLake) and Snowflake need Gateway/OpenAPI/MCP wiring (unverified packaged support). | 2 |
| 4 | Open Interoperability (MCP / A2A) | Gateway is a first-class MCP gateway [26]. A2A is supported in Runtime, with "broader A2A support across other AgentCore services coming soon" [27]. The registry validates records against MCP and A2A schemas and is itself exposed as an MCP server [31][80]. AG-UI protocol support was added in March 2026 [38]. | 3 |
| 5 | Agent Identity & Least Privilege | **AgentCore Identity** works with existing IdPs (Cognito, Microsoft Entra ID, Okta), supports OAuth 2LO/3LO (user-delegated), and keeps a secure token vault [26][27]. **AgentCore Policy** turns natural-language rules into Cedar policies enforced at the Gateway perimeter, outside agent code [30][38]. AWS's HIPAA reference architecture adds record-level authorization at the data layer [35]. | 4 |
| 6 | Guardrails & HIPAA/PHI Safety | **Bedrock Guardrails** can run inside AgentCore Policy (GA June 2026), checking the output of every authorized agent action and the input of every Gateway call for prompt injection and sensitive-information exposure [30]. Guardrails also offer PII masking and automated reasoning checks, which Gartner cited [69]. AgentCore is **HIPAA-eligible** and certified for SOC 2, ISO and FedRAMP. HITRUST is at the "internal assessment" stage, pending third-party audit [34]. Not all Bedrock models are HIPAA-eligible [37]. | 4 |
| 7 | Human-in-the-Loop Controls | There is no packaged approval UI. AWS's HIPAA guidance calls for "explicit user approval before consequential actions" and builds it with Cedar policy plus application logic or Step Functions [35]. Framework-level interrupts (for example Strands) handle pauses (unverified detail). Classic's "return of control" and user-confirmation features did not carry over as a managed feature (low confidence). | 2 |
| 8 | Evaluation & Quality Gates | **AgentCore Evaluations** (GA 31 March 2026) has 13 built-in evaluators covering quality, safety, task completion and tool use. It supports ground truth (reference answers, behavioral assertions, expected tool sequences), custom LLM-judge or Lambda code evaluators, online sampling of live traces, and on-demand runs for CI/CD regression [29][36]. There is no packaged red-teaming agent comparable to Foundry's. | 3 |
| 9 | Observability & Audit Trail | OpenTelemetry-compatible telemetry goes to CloudWatch dashboards and can be exported to Datadog, Dynatrace, Langfuse, LangSmith, Arize and others [26][27]. All policy decisions are logged [30]. The HIPAA reference architecture uses S3 Object Lock for immutable 6-year audit retention and log masking of PHI [35]. Model invocation logging does not capture every endpoint [37]. | 3 |
| 10 | FinOps & Domain Isolation | Consumption pricing charges for active CPU and memory only, with scale-to-zero and no minimums [27][38]. Resource tagging arrived at GA [26]. AWS Organizations, separate accounts per domain, and RAM sharing of registry records [31] give strong isolation and chargeback. There is no built-in per-agent budget console; teams use Cost Explorer or Budgets with tags. | 3 |

**Pros**
- Truly model- and framework-agnostic managed runtime, which gives the best agent-code portability (vendor docs)
- Policy enforced at the Gateway with Cedar plus Bedrock Guardrails, separate from agent code (vendor docs / Constellation Research)
- Strong identity integration with Entra ID or Okta and OAuth 3LO delegation (vendor docs)
- HIPAA-eligible, with a published AWS healthcare reference architecture for agents (vendor docs)
- A mature evaluation service with CI/CD hooks; a Gartner MQ Leader and a Forrester Wave Leader (Gartner / Forrester partner summary)
- Very large Bedrock peer-review base (734 ratings, 4.6/5) (Gartner Peer Insights)

**Cons**
- Bedrock Agents was deprecated about 2.5 years after launch, a roadmap-stability warning for enterprises (practitioner blog)
- The toolkit is modular and assembly-heavy, so it needs strong engineering teams; there is no low-code maker surface comparable to Copilot Studio or Agent Studio (practitioner blog)
- No packaged human-in-the-loop approval experience (vendor docs)
- A2A is not yet present across all AgentCore services (vendor docs)
- HITRUST is still pending third-party audit for AgentCore (vendor docs)
- Some features launch in only a few regions (for example Guardrails-in-Policy in five regions) (vendor docs)

**Pricing:** Consumption-based: Runtime charges per active vCPU and GB-hour, plus Gateway, Memory, Policy and Evaluations usage and model tokens. No upfront commitment [27].
**Healthcare / HIPAA note:** AgentCore is HIPAA-eligible under the AWS BAA [27][34]. Confirm that each model is eligible, because some Bedrock models are excluded [37]. Tools reached through the Gateway need their own BAA coverage. HITRUST inheritance for AgentCore is not yet audited [34].

### 1.4 Google Vertex AI Agent Builder → Gemini Enterprise Agent Platform

**Context:** On **22 April 2026** Google renamed Vertex AI to **Gemini Enterprise Agent Platform**. Vertex AI Agent Builder's capabilities now sit inside it: ADK, Agent Studio, Agent Runtime (formerly **Agent Engine**), Memory Bank, Agent Garden, Model Garden, and a new governance layer (Agent Identity, Agent Registry, Agent Gateway, Model Armor) [40][47][48]. On **29 July 2026** Google declared Agent Runtime, Memory Bank, Agent Identity, Agent Gateway, Agent Registry, Agent Evaluation and Agent Observability **GA** [41]. **ADK** is the open-source code-first framework (Python, Go, Java, TypeScript). Agents deployed to Agent Runtime are surfaced to employees through **Gemini Enterprise** (formerly Agentspace) [48][49]. Google originated the **A2A** protocol. Gartner named Google a Leader, **highest in Ability to Execute** (2025 MQ with an April 2026 mid-cycle update per Google), and ranked it #1 in all three Critical Capabilities use cases [68]. Google was a **Leader in The Forrester Wave: AI Platforms, Q3 2026**, with the highest Strategy score [75].

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Agent Lifecycle Management | **Agent Registry** (GA) is one library of agents, tools and skills. Agent Studio designs can be exported to ADK for code-based lifecycle. Agent Garden provides templates [40][41]. Registration in Gemini Enterprise controls employee distribution [49]. Promotion across dev/test/prod relies on Google Cloud projects plus CI/CD (Cloud Build); no packaged approval-gate workflow like AWS's registry was found (low confidence). | 3 |
| 2 | Model Choice & Portability | Model Garden offers 200+ models: Gemini 3.1, Gemma 4 open models, and Anthropic Claude Opus/Sonnet/Haiku [40][68]. ADK is open source and deployable anywhere; AgentCore even lists ADK as a supported framework [27]. Gartner highlighted support for **hybrid, on-premises and edge deployments** [69]. Sub-second cold starts and multi-day runtime workflows are supported [40]. | 4 |
| 3 | Enterprise & Healthcare Connectors | Native ecosystem integrations and 50+ Google-managed MCP servers are available [40][68]. BigQuery and Pub/Sub event-driven agents are supported [40]. Gemini Enterprise connectors reach Snowflake through Snowflake's managed MCP server with OAuth, and Snowflake publishes a quickstart for this [62]. Healthcare API/FHIR is available on Google Cloud; packaged agent tooling for it was not verified this cycle (unverified). | 3 |
| 4 | Open Interoperability (MCP / A2A) | Google authored **A2A**, and A2A orchestration is native. MCP is used for connections to systems of record, and **AP2** (Agent Payments Protocol) is supported [40]. Agent Gateway enforces policy over MCP and A2A traffic [45]. Gartner cited Google's agent interoperability work [69]. | 4 |
| 5 | Agent Identity & Least Privilege | **Agent Identity** (GA) gives each agent a unique cryptographic ID as a native IAM principal type, with least-privilege and non-repudiable auditing [41][45]. **Agent Gateway** (GA) applies IAM conditions and Model Armor at one control point [41]. User delegation to Gemini Enterprise uses Workforce Identity Federation and OAuth [49]. It is tied to Google IAM; Entra and Okta come in through federation. | 3 |
| 6 | Guardrails & HIPAA/PHI Safety | **Model Armor** protects against prompt injection and data leakage. Agent Anomaly Detection (LLM-as-judge on reasoning), Agent Threat Detection and a Security Command Center dashboard are also available [40]. **Gemini Enterprise Agent Platform, Gemini Enterprise and Agent Search are on Google's HIPAA covered-products list**. Pre-GA features must not be used with PHI [44]. PHI de-identification uses Sensitive Data Protection (unverified integration depth). | 3 |
| 7 | Human-in-the-Loop Controls | ADK supports tool-confirmation and long-running human-input patterns (unverified detail). Multi-day workflows running up to 7 days allow waiting for a human [41]. No packaged business approval inbox or per-agent autonomy setting was found; a practitioner guide notes HITL is not covered in the standard ADK → Gemini Enterprise path [49]. | 2 |
| 8 | Evaluation & Quality Gates | **Agent Simulation** tests against synthetic users and virtualized tools with automatic scoring. **Agent Evaluation** (GA) scores live traffic continuously with multi-turn autoraters. **Agent Optimizer** clusters failures and suggests instruction fixes [40][41]. Gartner's Critical Capabilities ranked Google #1 in all three use cases [68]. | 4 |
| 9 | Observability & Audit Trail | Agent Observability (GA) provides visual tracing of reasoning [40][41]. Agent Identity gives non-repudiable action audit [41]. Cloud Audit Logs and Security Command Center add audit and threat views [40]. OpenTelemetry export via Cloud Trace (unverified detail for Agent Runtime). | 3 |
| 10 | FinOps & Domain Isolation | Agent Runtime costs $0.085/vCPU-hour and $0.009/GiB-hour, billed in 30-second increments with idle time free. 1- and 3-year savings plans give 10%/20% off [43]. Agent Gateway billing started 13 July 2026, and Memory Bank, Sessions and Skill Registry billing started 1 Sept 2026 [43]. Projects and folders give domain isolation; billing labels give chargeback. The new meters add budgeting complexity. | 3 |

**Pros**
- Gartner MQ Leader highest in Ability to Execute; #1 in Critical Capabilities; Forrester AI Platforms Leader (Gartner / Forrester via vendor)
- Originator of A2A; strongest open-protocol posture, with an open-source multi-language ADK (vendor docs)
- The complete governance stack (Identity, Registry, Gateway, Model Armor) went GA in July 2026 (vendor docs)
- Leading evaluation loop: simulation, continuous evaluation and an optimizer (vendor docs)
- Model Garden includes Claude; hybrid and on-prem options were cited by Gartner (Gartner / vendor docs)
- Explicitly on Google's HIPAA covered-products list (vendor docs)

**Cons**
- Heavy rebranding (Agent Builder → Agent Platform; Agent Engine → Agent Runtime; Agentspace → Gemini Enterprise) creates confusion and deprecation risk for individual modules (practitioner blog)
- Many governance components became GA only in July 2026, so there is limited production track record (vendor docs)
- New billable meters (Gateway, Memory Bank, Sessions, Skill Registry) arrived in mid/late 2026 (vendor docs / trade press)
- Weaker Microsoft 365/Entra-centric employee reach unless Gemini Enterprise is adopted (practitioner blog)
- HITL is left to developers (practitioner blog)
- Few Peer Insights reviews under the new product name (2 ratings, 4.0 in Agent Dev Platforms) (Gartner Peer Insights)

**Pricing:** Consumption-based: Agent Runtime vCPU- and GiB-hours, with a free tier of 50 vCPU-h and 100 GiB-h per month. Gateway, Memory Bank, Sessions and Skill Registry are metered, plus model tokens. Gemini Enterprise seats are licensed separately [43].
**Healthcare / HIPAA note:** Gemini Enterprise Agent Platform, Gemini Enterprise and Agent Search are covered under Google's BAA. Use no pre-GA features with PHI, and use regional APIs for Agent Search [44]. A BAA does not stop PHI from being sent to a model unnecessarily; minimization and DLP remain the customer's responsibility [50].

### 1.5 Ref: Snowflake Cortex Agents (reference, not ranked)

**Context:** Cortex Agents is Snowflake's managed agent orchestration service. It plans across **Cortex Analyst** (text-to-SQL over semantic views), **Cortex Search** (unstructured retrieval), code execution, custom stored-procedure/UDF tools, and remote **MCP** connectors [51]. It powers **Snowflake Intelligence** (GA 4 Nov 2025) [63]. Snowflake-managed MCP servers are GA and expose agents, Analyst, Search, SQL and custom tools to external clients such as Gemini Enterprise, Copilot Studio or Claude via OAuth [52][62]. Since August 2026, agents and MCP servers can also ship inside Native Apps [58]. At Black Hat (28 July 2026) Snowflake announced the **Cortex AI Gateway** (from the Natoma acquisition, May 2026; private/public preview) and made **Agent Identity** GA [59][60]. Snowflake is not in Gartner's AI Application Development Platforms MQ or the Forrester AI Platforms Wave [69][74].

| # | Capability | Evidence | Score |
|---|---|---|---|
| 1 | Agent Lifecycle Management | Agents are schema-level objects governed by RBAC, and monitoring tracks "all agent versions" [51][56]. Snowflake CI/CD (Git, schema change) can promote them. There is no agent catalog or approval workflow beyond Snowflake object governance. | 2 |
| 2 | Model Choice & Portability | Claude (Opus/Sonnet/Haiku), OpenAI GPT-5 series and Gemini (including Gemini 3) are available, with an "auto" model option [51][61]. Snowflake runs on AWS, Azure and GCP, so agents are cloud-portable, but only within Snowflake. Cross-region inference may route prompts to other regions [54]. | 3 |
| 3 | Enterprise & Healthcare Connectors | It is the best native fit for data already in the Snowflake medallion lakehouse: semantic views plus Cortex Search, with row/column policies enforced [51]. External reach comes through MCP connectors (Jira, Salesforce, custom) [51]. There are no EHR or FHIR connectors; data must be landed in Snowflake first. | 3 |
| 4 | Open Interoperability (MCP / A2A) | The Snowflake-managed MCP server is GA (max 50 tools/server; not in gov regions) [52]. Agents consume remote MCP servers [51]. Inter-app agent-to-agent calls work inside Native Apps [58]. There is no A2A protocol support. | 3 |
| 5 | Agent Identity & Least Privilege | Access runs through Snowflake RBAC, `CORTEX_AGENT_USER` and tool execution context [51]. External OAuth works with Okta and Entra, and secondary roles are disabled by default [52]. Agent Identity is GA; Restricted Session Scope is "GA soon" [59]. Source row and column security is inherited natively. | 3 |
| 6 | Guardrails & HIPAA/PHI Safety | Cortex AI Guardrails detect prompt injection, jailbreaks and zero-day style attacks, but **not PII/PHI**, and they require cross-region inference [53]. Business Critical edition supports PHI under a signed BAA [57]. Whether cross-region inference is HIPAA-compatible is not documented [54]. | 2 |
| 7 | Human-in-the-Loop Controls | There are no agent-level approval steps. Multi-party approval exists only for destructive data changes [59]. HITL must be built in the calling application. | 1 |
| 8 | Evaluation & Quality Gates | Evaluations run in Snowsight or with `EXECUTE_AI_EVALUATION` using a Goal-Plan-Action framework. Answer correctness and logical consistency are GA; tool-selection and tool-execution accuracy are preview. Custom LLM-judge metrics are supported, and up to three runs can be compared [55]. | 2 |
| 9 | Observability & Audit Trail | Traces follow OpenTelemetry conventions ("one turn = one trace") and are stored in `AI_OBSERVABILITY_EVENTS`, with privilege-gated unredacted access [56]. They are exportable through SQL but not streamed natively to enterprise APM (low confidence). | 2 |
| 10 | FinOps & Domain Isolation | Per-token orchestration and Analyst charges, Search index charges and warehouse compute all bill in Snowflake credits. Resource budgets and per-user quotas are available [51][63]. Database, role and account isolation fits the existing domain model. | 3 |

**Pros**
- Agents run next to governed PHI in the medallion lakehouse, so the data is not copied out (vendor docs)
- Row and column security and RBAC are inherited natively (vendor docs)
- The managed MCP server exposes the governed "data agent" to any enterprise agent platform (vendor docs / Snowflake quickstart)
- Choice of Claude, GPT-5 and Gemini across three clouds (vendor docs / press)
- Existing licences and credit-based FinOps are already understood by the platform team (vendor docs)

**Cons**
- A data-agent scope, not a general enterprise agent platform: no HITL and no A2A (vendor docs)
- Guardrails lack PII/PHI detection and require cross-region inference (vendor docs)
- The Cortex AI Gateway is still in preview (vendor docs / trade press)
- Credit consumption at scale is hard to predict across tokens, search and warehouses (practitioner blog)
- Not evaluated by Gartner or Forrester in this category (Gartner / Forrester)

**Pricing:** Snowflake credits for orchestration and Analyst tokens, Cortex Search serving (about 6.3 credits/GB-month), and warehouse compute. One practitioner example put 10,000 queries/month on Claude Sonnet at about $1.46K [63].
**Healthcare / HIPAA note:** PHI requires Business Critical (or VPS) edition plus a signed BAA [57]. Before enabling guardrails, confirm with Snowflake whether cross-region inference and each model provider are in BAA scope [53][54].

---

## Section 2 — Comparison: Agent Platforms Feature Scoring Template (0 to 4 Scale)

All 10 capabilities are weighted equally at 10%. Weighted score = score × 0.10. Total = sum of weighted scores (max 4.00). Normalized % = Total ÷ 4. The Ref column is shown for context and is not ranked.

### 2.1 Raw scores (0–4)

| # | Capability | Description & Evaluation Focus | Weight | Copilot Studio | Microsoft Foundry Agent Service | AWS Bedrock AgentCore | Google Gemini Ent. Agent Platform | Ref: Snowflake Cortex Agents |
|---|---|---|---|---|---|---|---|---|
| 1 | Agent Lifecycle Management | Versioning, dev/test/prod promotion, approvals, central agent catalog. | 10% | 3 | 3 | 3 | 3 | 2 |
| 2 | Model Choice & Portability | Multi-model, model swap, deploy in own tenant/VPC or on-prem. | 10% | 2 | 3 | 4 | 4 | 3 |
| 3 | Enterprise & Healthcare Connectors | Permission-aware connectors to Snowflake, FHIR/EHR, claims, CRM, ITSM. | 10% | 3 | 3 | 2 | 3 | 3 |
| 4 | Open Interoperability (MCP / A2A) | Consume/expose MCP tools; agent-to-agent collaboration; OpenAPI actions. | 10% | 3 | 4 | 3 | 4 | 3 |
| 5 | Agent Identity & Least Privilege | IdP-registered agents, on-behalf-of auth, scoped tool permissions. | 10% | 3 | 4 | 4 | 3 | 3 |
| 6 | Guardrails & HIPAA/PHI Safety | PHI redaction, prompt-injection defense, grounding checks, BAA. | 10% | 3 | 3 | 4 | 3 | 2 |
| 7 | Human-in-the-Loop Controls | Approval steps, autonomy levels, escalation for high-impact actions. | 10% | 3 | 3 | 2 | 2 | 1 |
| 8 | Evaluation & Quality Gates | Eval datasets, LLM-as-judge, regression tests, red-teaming in CI/CD. | 10% | 2 | 4 | 3 | 4 | 2 |
| 9 | Observability & Audit Trail | Step-level tracing, OpenTelemetry export, immutable action logs. | 10% | 2 | 3 | 3 | 3 | 2 |
| 10 | FinOps & Domain Isolation | Cost attribution, budgets/quotas, isolated domain workspaces. | 10% | 3 | 3 | 3 | 3 | 3 |
| | **Sum of raw scores (max 40)** | | | **27** | **33** | **31** | **32** | **24** |

### 2.2 Weighted scores (Score × Weight) and totals

| # | Capability | Copilot Studio | Microsoft Foundry Agent Service | AWS Bedrock AgentCore | Google Gemini Ent. Agent Platform | Ref: Snowflake Cortex Agents |
|---|---|---|---|---|---|---|
| 1 | Agent Lifecycle Management | 0.30 | 0.30 | 0.30 | 0.30 | 0.20 |
| 2 | Model Choice & Portability | 0.20 | 0.30 | 0.40 | 0.40 | 0.30 |
| 3 | Enterprise & Healthcare Connectors | 0.30 | 0.30 | 0.20 | 0.30 | 0.30 |
| 4 | Open Interoperability (MCP / A2A) | 0.30 | 0.40 | 0.30 | 0.40 | 0.30 |
| 5 | Agent Identity & Least Privilege | 0.30 | 0.40 | 0.40 | 0.30 | 0.30 |
| 6 | Guardrails & HIPAA/PHI Safety | 0.30 | 0.30 | 0.40 | 0.30 | 0.20 |
| 7 | Human-in-the-Loop Controls | 0.30 | 0.30 | 0.20 | 0.20 | 0.10 |
| 8 | Evaluation & Quality Gates | 0.20 | 0.40 | 0.30 | 0.40 | 0.20 |
| 9 | Observability & Audit Trail | 0.20 | 0.30 | 0.30 | 0.30 | 0.20 |
| 10 | FinOps & Domain Isolation | 0.30 | 0.30 | 0.30 | 0.30 | 0.30 |
| **TOTALS** | **Sum of weighted scores (max 4.0)** | **2.70** | **3.30** | **3.10** | **3.20** | **2.40** |
| | **Normalized to 100%** | **67.5%** | **82.5%** | **77.5%** | **80.0%** | **60.0%** |
| | **Rank** | 4 | 1 | 3 | 2 | (reference) |

### 2.3 Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | Copilot Studio | Microsoft Foundry Agent Service | AWS Bedrock AgentCore | Google Gemini Ent. Agent Platform | Ref: Snowflake Cortex Agents |
|---|---|---|---|---|---|---|
| Pilot Consolidation | Can this platform absorb the agents built across current POCs/pilots? | **Medium risk** — absorbs low-code/M365 pilots well; code-first pilots belong in Foundry | **Low risk** — hosted agents take LangGraph, OpenAI SDK, Anthropic SDK or custom containers; prompt agents cover simple pilots | **Low risk** — any framework and any model; Managed Harness plus a migration tool for Bedrock Agents Classic | **Low–Medium risk** — ADK and Agent Studio are strong; non-ADK frameworks run on Runtime, but the Google-centric path is most mature | **High risk** — absorbs only data/analytics agents |
| Lock-in Risk | If we change model provider or cloud, can agents, tools and prompts move? | **High** — Dataverse/Power Platform definitions; SaaS only | **Medium** — open frameworks in containers; identity, IQ and Control Plane are Azure-bound | **Low–Medium** — open frameworks and any model; Gateway, Policy and Identity are AWS-bound | **Medium** — ADK is open source, A2A is open; runtime, identity and gateway are Google-bound | **Medium** — cloud-portable, but only within Snowflake |
| Data Gravity Fit | Can agents act on Snowflake-governed data without copying PHI out? | **Pass (conditional)** — via the Snowflake MCP server or connector; PHI still leaves Snowflake in responses | **Pass** — calls the Snowflake managed MCP server/Cortex Agent as a tool with OAuth | **Pass** — Gateway to the Snowflake MCP server; PrivateLink options | **Pass** — Gemini Enterprise ↔ Snowflake MCP pattern documented by Snowflake | **Pass (best)** — computation runs in place under RBAC and row/column policies |
| Autonomy Risk | Are high-impact actions reliably gated by humans and audited? | **Pass** — human-review nodes, approvals, Purview audit | **Pass (conditional)** — HITL in workflows and tool approval; red-teaming tests HITL adherence | **Conditional** — Cedar policy gating is strong; human approval must be custom-built | **Conditional** — identity and gateway gating are strong; HITL is developer-built | **Fail** — no agent-level HITL |
| HIPAA/BAA | Is the agent runtime explicitly in BAA scope? | **Pass** — explicitly covered [9] | **Conditional** — Azure OpenAI covered; Agent Service and partner-model coverage need written confirmation [24] | **Pass** — AgentCore HIPAA-eligible; check per-model eligibility [34][37] | **Pass** — Agent Platform on the covered list; GA features only [44] | **Conditional** — Business Critical + BAA; cross-region inference unclear [54][57] |
| Vendor/Roadmap Stability | Is the product stable enough to standardize on for 3+ years? | **Medium** — June 2026 rebuild in preview alongside classic | **Medium** — two renames in 2 years; APIs changed from v1 to the new Agent Service | **Medium** — Bedrock Agents deprecated after about 2.5 years; AgentCore is the strategic line | **Medium** — April 2026 platform rename; core governance GA only since July 2026 | **Medium–High** — fast-moving; AI Gateway in preview |
| Snowflake fit & FinOps predictability | Chargeback by domain; predictable cost | **Medium** — credits per environment; hard to forecast | **High** — Azure Cost Management, subscriptions and tags; token limits via AI Gateway | **High** — accounts and tags; scale-to-zero | **Medium–High** — projects and labels; new 2026 meters | **High** — existing credit governance and budgets |

### 2.4 Analysis — Best Fit & Recommendations

- **Best fit overall: Microsoft Foundry Agent Service (3.30 / 82.5%) as the pro-code agent runtime, paired with Copilot Studio as the governed low-code front door.** Foundry leads on interoperability (A2A v1.0 GA, MCP, OpenAPI), agent identity (per-agent Entra ID with OBO), and evaluation and red-teaming. It also shares Entra Agent ID, Agent 365 and the A2A runtime with Copilot Studio. That lets the enterprise consolidate both citizen-built and engineer-built pilots under one identity and governance plane, which is the Complexity & Tech Rationalization and Governance pillars' main goal. Its gaps are a lack of explicit BAA documentation for the Agent Service and partner models, and Azure-only runtime lock-in. Close both in contract and in the PoC.
- **Google Gemini Enterprise Agent Platform (3.20 / 80.0%) is a very close second.** It is the analyst favourite: highest Ability to Execute in Gartner's MQ, a Forrester Leader, and the originator of A2A. It has the most complete evaluation loop and explicit HIPAA coverage. Choose it as the primary standard only if Google Cloud is already a strategic cloud or Gemini Enterprise is the employee AI front door. Its governance GA history is short (since July 2026) and HITL is developer-built.
- **AWS Bedrock AgentCore (3.10 / 77.5%) is the portability and guardrail leader.** It is the most model- and framework-agnostic runtime, with Cedar policy enforced at the Gateway and Bedrock Guardrails that include PII masking. It is the natural exception path for AWS-hosted workloads, such as claims processing already on AWS. Do not start anything new on Bedrock Agents Classic. Its deprecation is a reminder to keep agent logic in open frameworks and tools behind MCP.
- **Copilot Studio (2.70 / 67.5%) is not a stand-alone enterprise standard, but it is the right maker surface** for Microsoft 365-centred member-services, HR and IT agents that need approvals. Its lower score reflects SaaS-only portability, thinner evaluation and trace depth, and credit-cost unpredictability, not unsuitability. Register all Copilot Studio agents in Agent 365 and route complex logic to Foundry via A2A.
- **Snowflake connection (Ref: Cortex Agents, 2.40 / 60.0%).** Cortex Agents should be the **governed data agent** for PHI in the lakehouse, not the enterprise agent platform. Expose curated Cortex Agents (claims analytics, care-gap lookup, member 360) through the **Snowflake-managed MCP server** with External OAuth (Entra/Okta), so that Foundry, Copilot Studio, AgentCore or Gemini agents call them as tools. Data then stays under Snowflake RBAC and row/column policies, and only minimal answers cross the boundary. Track the Cortex AI Gateway (preview) as a possible MCP governance layer for data-side tools.
- **Recommended target state.** *Primary standard:* Microsoft Foundry Agent Service (pro-code runtime, evaluation, Control Plane) plus Copilot Studio (low-code), governed by Entra Agent ID and Agent 365, with all tools published as MCP servers and all agents registered with A2A cards. *Data tier:* Snowflake Cortex Agents exposed via MCP. *Exception path:* AWS Bedrock AgentCore for workloads whose data or systems are AWS-resident, and Gemini Enterprise Agent Platform where Google-hosted data or Gemini Enterprise adoption applies, both registered in a common inventory (Agent 365 is adding AWS/Google agent sync in preview [12]). *Guardrail:* no new agents on Bedrock Agents Classic or on pre-GA features that handle PHI. If the enterprise's primary cloud is AWS or GCP rather than Azure, swap the primary runtime to AgentCore or Agent Platform. The score gap (0.10–0.20) is too small to override cloud alignment.
- **Proof-of-concept checklist (4–6 items).**
  1. **BAA scope letter:** get written confirmation from Microsoft (and from AWS/Google for exception paths) that the agent runtime, memory/state stores, evaluation services and each chosen model (including Claude) are in BAA scope.
  2. **Snowflake MCP round trip:** a Foundry agent and a Copilot Studio agent call a Cortex Agent via the managed MCP server using Entra OBO. Verify that row-level PHI policies apply per end user and that no PHI persists in agent memory or traces unredacted.
  3. **Pilot absorption:** migrate 3 existing pilots (one low-code, one LangGraph, one Bedrock Agents Classic) onto the target platform and measure effort in days.
  4. **HITL and autonomy:** build a prior-auth-style flow with a mandatory human-review node, and show that the red-teaming "prohibited/high-risk action" tests pass.
  5. **Eval gate in CI/CD:** add an evaluation suite (groundedness, task adherence, PHI leakage) as a blocking gate on model or prompt change, with OpenTelemetry traces in the enterprise APM.
  6. **FinOps chargeback:** run one month of Clinical, Claims and Member workloads in separate projects/environments, and reconcile per-domain cost (tokens + runtime + Copilot credits + Snowflake credits) against a forecast within ±15%.

---

## Section 3 — Bibliography

### Input files
1. Local — Report specification (SPEC.md) — `/tmp/claude-0/ai/SPEC.md`
2. Local — Pattern 1: Agent Platforms capability template (extract of `OUTPUTS/ipaas/ai_capabilities_scoring_templates.md`) — `/tmp/claude-0/ai/pattern1.md`

### Microsoft Copilot Studio
3. Microsoft Learn — What's new in Copilot Studio — https://learn.microsoft.com/en-us/microsoft-copilot-studio/whats-new
4. Microsoft Copilot Blog — What's new in Copilot Studio: May 2026 updates and features — https://www.microsoft.com/en-us/copilot/blog/copilot-studio/new-and-improved-computer-using-agents-a-new-workflows-experience-and-real-time-voice-experiences/
5. Microsoft Copilot Blog — What's new in Copilot Studio: April 2026 updates and features — https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/new-and-improved-agent-governance-intelligent-workflows-and-connected-app-experiences/
6. Microsoft Copilot Blog — What's new in Copilot Studio: Updates to multi-agent systems — https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/new-and-improved-multi-agent-orchestration-connected-experiences-and-faster-prompt-iteration/
7. Microsoft Learn — Manage Entra Agent IDs (Copilot Studio) — https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-use-entra-agent-identities
8. Microsoft Learn — Establish an Application Lifecycle Management (ALM) strategy — https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/alm
9. Microsoft Learn — Review ISO, SOC, and HIPAA compliance (Copilot Studio) — https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-certification
10. Microsoft — Microsoft Copilot Studio Plans and Pricing — https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/copilot-studio
11. CloudZero — Microsoft Copilot Studio Pricing in 2026: Credits, Plans, and What It Actually Costs at Scale — https://www.cloudzero.com/blog/copilot-studio-pricing/
12. Microsoft Security Blog — Microsoft Agent 365, now generally available, expands capabilities and integrations — https://www.microsoft.com/en-us/security/blog/2026/05/01/microsoft-agent-365-now-generally-available-expands-capabilities-and-integrations/
13. Holger Imbery (practitioner blog) — Multi-Agent Orchestration with Copilot Studio, Part 3: The Build 2026 Rebuild — https://holgerimbery.blog/copilot-studio-orchestration-part3
14. G2 — Microsoft Copilot Studio Reviews 2026 — https://www.g2.com/products/microsoft-microsoft-copilot-studio/reviews
15. PeerSpot — Microsoft Copilot Studio reviews 2026 — https://www.peerspot.com/products/microsoft-copilot-studio-reviews

### Microsoft Foundry (Azure AI Foundry) Agent Service
16. Microsoft Learn — What is Microsoft Foundry Agent Service? — https://learn.microsoft.com/en-us/azure/foundry/agents/overview
17. Microsoft Learn — Hosted agents in Foundry Agent Service — https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
18. Microsoft Learn — What is Microsoft Foundry Control Plane? — https://learn.microsoft.com/en-us/azure/foundry/control-plane/overview
19. Microsoft Learn — AI Red Teaming Agent (Microsoft Foundry) — https://learn.microsoft.com/en-us/azure/foundry/concepts/ai-red-teaming-agent
20. Microsoft Learn — Microsoft Agent 365 integration with Foundry — https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-365-integration
21. Microsoft Azure — Foundry Agent Service pricing — https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/
22. Directions on Microsoft — Foundry Gets New Name, Anthropic Models — https://www.directionsonmicrosoft.com/reports/foundry-gets-new-name-anthropic-models/
23. Schneider IT Management — Microsoft Foundry: The New Name for Azure AI Foundry — https://www.schneider.im/microsoft-foundry-the-new-name-for-azure-ai-foundry/
24. Microsoft Q&A (community answer) — HIPAA BAA Coverage for Azure OpenAI and Azure AI Foundry — https://learn.microsoft.com/en-us/answers/questions/5987507/hipaa-baa-coverage-for-azure-openai-and-azure-ai-f
25. TechTarget — Microsoft Foundry ties in with Agent 365 — https://www.techtarget.com/searchsoftwarequality/news/366634569/Microsoft-Azure-AI-Foundry-ties-in-with-Agent-365

### Amazon Bedrock Agents / Bedrock AgentCore
26. AWS What's New — Amazon Bedrock AgentCore is now generally available (Oct 2025) — https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available
27. AWS — Amazon Bedrock AgentCore FAQs — https://aws.amazon.com/bedrock/agentcore/faqs/
28. AWS What's New — Amazon Bedrock AgentCore now includes Policy (preview), Evaluations (preview) and more (Dec 2025) — https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-bedrock-agentcore-policy-evaluations-preview
29. AWS What's New — Amazon Bedrock AgentCore Evaluations is now generally available (Mar 2026) — https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available
30. AWS What's New — Amazon Bedrock AgentCore now supports Bedrock Guardrails in policy (Jun 2026) — https://aws.amazon.com/about-aws/whats-new/2026/06/amazon-bedrock-agentcore-policy-guardrails-generally-available/
31. AWS What's New — AWS Agent Registry is now generally available (Aug 2026) — https://aws.amazon.com/about-aws/whats-new/2026/08/aws-agent-registry-generally-available/
32. AWS Machine Learning Blog — Manage agents, tools and skills at scale with AWS Agent Registry — https://aws.amazon.com/blogs/machine-learning/manage-agents-tools-and-skills-at-scale-with-aws-agent-registry/
33. AWS Documentation — Amazon Bedrock Agents Classic maintenance mode — https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html
34. AWS Documentation — Compliance validation for Amazon Bedrock AgentCore — https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/compliance-validation.html
35. AWS Public Sector Blog — Architecting HIPAA-compliant AI agents to safeguard health data with AWS — https://aws.amazon.com/blogs/publicsector/architecting-hipaa-compliant-ai-agents-to-safeguard-health-data-with-aws/
36. Constellation Research — AWS adds AI agent policy, evaluation tools to Amazon Bedrock AgentCore — https://www.constellationr.com/insights/news/aws-adds-ai-agent-policy-evaluation-tools-amazon-bedrock-agentcore
37. Aptible — AWS Bedrock HIPAA compliance: what the BAA covers — https://www.aptible.com/hipaa-compliant-ai-tools/aws-bedrock-baa *(vendor-authored: compliance-hosting vendor)*
38. DEV Community — Amazon Bedrock AgentCore Guide: Production AI Agents (2026) — https://dev.to/akaranjkar08/amazon-bedrock-agentcore-guide-production-ai-agents-2026-2gl
39. Enterprise DNA — AWS Retires Bedrock Agents: AgentCore Is the New Path — https://enterprisedna.co/resources/news/amazon-bedrock-agents-classic-agentcore-enterprise-july-2026/

### Google Vertex AI Agent Builder / Gemini Enterprise Agent Platform
40. Google Cloud Blog — Introducing Gemini Enterprise Agent Platform — https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform
41. Google Cloud Blog — What's new in Gemini Enterprise Agent Platform — https://cloud.google.com/blog/products/ai-machine-learning/whats-new-in-gemini-enterprise-agent-platform
42. Google Cloud Documentation — Agent Platform overview — https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview
43. Google Cloud — Gemini Enterprise Agent Platform pricing — https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing
44. Google Cloud — HIPAA Compliance on Google Cloud (covered products) — https://cloud.google.com/security/compliance/hipaa
45. Infosecurity Magazine — Google Introduces Unique AI Agent Identities in New Gemini Enterprise — https://www.infosecurity-magazine.com/news/google-ai-agent-identities-gemini/
46. Virtualization Review — Google Cloud Next '26: Gemini Enterprise Agent Platform Leads AI-Centric News — https://virtualizationreview.com/articles/2026/04/24/google-cloud-next-26-gemini-enterprise-agent-platform-leads-ai-centric-news.aspx
47. Wikipedia — Gemini Enterprise Agent Platform — https://en.wikipedia.org/wiki/Gemini_Enterprise_Agent_Platform
48. Carly — Vertex AI Agent Builder: What It Was, What Replaced It — https://www.usecarly.com/blog/vertex-ai-agent-builder/ *(vendor-authored blog)*
49. Medium (Google Cloud Community) — From ADK to Gemini Enterprise: Building Production-Grade AI Agents on Google Cloud — https://medium.com/google-cloud/from-adk-to-gemini-enterprise-building-production-grade-ai-agents-on-google-cloud-e32f4977f05a
50. Strac — Is Gemini HIPAA Compliant? 2026 Guide — https://www.strac.io/blog/is-gemini-hipaa-compliant *(vendor-authored: DLP vendor)*

### Ref: Snowflake Cortex Agents
51. Snowflake Documentation — Cortex Agents — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents
52. Snowflake Documentation — Snowflake-managed MCP server — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp
53. Snowflake Documentation — Cortex AI Guardrails — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-ai-guardrails
54. Snowflake Documentation — Cross-region inference — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cross-region-inference
55. Snowflake Documentation — Cortex Agent evaluations — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-evaluations
56. Snowflake Documentation — Monitor Cortex Agent requests — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-monitor
57. Snowflake Documentation — Snowflake editions — https://docs.snowflake.com/en/user-guide/intro-editions
58. Snowflake Release Notes — Aug 7, 2026: Snowflake Native Apps: Cortex Agents and MCP servers (GA) — https://docs.snowflake.com/en/release-notes/2026/other/2026-08-07-native-apps-agents-mcp-ga
59. Snowflake Blog — Snowflake Launches Cortex AI Gateway and Advanced AI Security at Black Hat 2026 — https://www.snowflake.com/en/blog/enterprise-ai-security-agentic-mcp-governance/
60. Technology Magazine — Snowflake Announces Cortex AI Gateway Control Layer — https://technologymagazine.com/articles/snowflake-announces-cortex-ai-gateway-control-layer
61. Snowflake Press Release — Snowflake Enables Enterprise-Ready AI by Bringing Google's Gemini 3 to Snowflake Cortex AI — https://www.snowflake.com/en/news/press-releases/snowflake-enables-enterprise-ready-ai-by-bringing-google-s-gemini-3-to-snowflake-cortex-ai/
62. Snowflake Developers — Agentic AI for Your Lakehouse: Snowflake Cortex and Gemini Enterprise on Iceberg — https://www.snowflake.com/en/developers/guides/quickstart-iceberg-cortex-gemini/
63. Flexera — Snowflake Intelligence 101: A Complete Overview (2026) — https://www.flexera.com/blog/finops/snowflake-intelligence/ *(vendor-authored: FinOps vendor)*
64. GitHub — Snowflake-Labs/mcp: MCP Server for Snowflake — https://github.com/Snowflake-Labs/mcp
65. CRN Asia — Snowflake expands Google Cloud partnership around data and AI — https://www.crnasia.com/news/2026/artificial-intelligence/snowflake-expands-google-cloud-partnership-around-data-and-a

### Analyst research (Gartner / Forrester / IDC)
66. Gartner — Magic Quadrant for AI Application Development Platforms — https://www.gartner.com/en/documents/7188230
67. Microsoft Azure Blog — Microsoft named a Leader in Gartner Magic Quadrant for AI Application Development Platforms — https://azure.microsoft.com/en-us/blog/microsoft-named-a-leader-in-gartner-magic-quadrant-for-ai-application-development-platforms/ *(vendor-authored)*
68. Google Cloud Blog — Google Named a Leader in the Gartner Magic Quadrant (AI Application Development Platforms) — https://cloud.google.com/blog/products/ai-machine-learning/google-named-a-leader-in-the-gartner-magic-quadrant *(vendor-authored)*
69. Virtualization Review — Research: IBM Joins Cloud Giants as Leaders in AI AppDev Platforms — https://virtualizationreview.com/articles/2025/12/18/research-ibm-joins-cloud-giants-as-leaders-in-ai-appdev-platforms.aspx
70. Gartner — 2026 Hype Cycle for Agentic AI (article) — https://www.gartner.com/en/articles/hype-cycle-for-agentic-ai
71. Gartner — Hype Cycle for Agentic AI, 2026 (research document) — https://www.gartner.com/en/documents/7671861
72. Gartner Peer Insights — Best AI Application Development Platforms Reviews 2026 — https://www.gartner.com/reviews/market/ai-application-development-platforms
73. Gartner Peer Insights — Best AI Agent Development Platforms Reviews 2026 — https://www.gartner.com/reviews/market/ai-agent-development-platforms
74. Forrester — The Forrester Wave: AI Platforms, Q3 2026 Is Live: Prepare To Recalibrate — https://www.forrester.com/blogs/the-forrester-wave-ai-platforms-q3-2026-is-live-prepare-to-recalibrate/
75. Google Cloud Blog — Google named a Leader in The Forrester Wave: AI Platforms, Q3 2026 — https://cloud.google.com/blog/products/ai-machine-learning/google-named-a-leader-in-the-forrester-wave-ai-platforms *(vendor-authored)*
76. Softprom — Google and AWS in The Forrester Wave AI Platforms Q3 2026 — https://softprom.com/forrester-wave-ai-platforms-q3-2026 *(partner-authored: Google/AWS distributor)*
77. Forrester — Launching The Agentic Development Platforms Vendor Landscape, Q3 2026 — https://www.forrester.com/blogs/launching-the-agentic-development-platforms-vendor-landscape-q3-2026/

### Comparisons, reviews & practitioner articles
78. Al Rafay Consulting — Microsoft AI Foundry vs AWS Bedrock vs Google Vertex AI — https://alrafayglobal.com/blog/azure-foundry-vs-aws-bedrock-vs-google-vertex-ai/ *(partner-authored: Microsoft Solutions Partner)*
79. Promact Infotech — AWS Retired Bedrock Agents Classic: The AgentCore Shift and the Lock-In Lesson — https://promactinfo.com/blogs/aws-retired-bedrock-agents-classic-the-agentcore-shift-and-the-lock-in-lesson-every-enterprise-should-learn/
80. Atlan — AWS Agent Registry: What It Governs, What It Doesn't [2026] — https://atlan.com/know/ai-agent/aws/what-is-aws-agent-registry/ *(vendor-authored: context-layer vendor)*

*Scores are research-based estimates as of September 2026, drawn from public vendor documentation, analyst press releases and practitioner sources. Validate them through a structured proof of concept and vendor BAA confirmations before any standardization decision.*
