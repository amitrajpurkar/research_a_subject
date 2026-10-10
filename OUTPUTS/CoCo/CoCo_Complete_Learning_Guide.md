# Snowflake CoCo (Cortex Code) — The Complete Learning Guide

**Audience:** Amit — upskilling as a **Data Analyst**, **System Analyst** and **Integration Architect** in a large enterprise (healthcare platform context)
**Research date:** 2026-10-09 · **Product status per docs:** CoCo in Snowsight, CoCo Desktop and CoCo CLI are all listed as *Generally Available*; the Agent SDK, MCP, ACP and Plugins are listed as *Preview* on the hub page (see [S1]).
**Primary source:** <https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code>

> **How to read this guide**
> - Citations like **[S1]**, **[B3]**, **[V2]** point to the **Bibliography (Section 18)**.
> - 🟢 = stated in Snowflake docs · 🟡 = third-party / vendor claim · 💡 = my suggestion or analysis (not from a source) — validate before relying on it.
> - Product names: *Cortex Code* was renamed **CoCo** (sources say at Snowflake Summit on June 2, 2026 [B1][B2]); the docs now use "CoCo" while many commands, parameters and paths still say `cortex` / `CORTEX_CODE_*`.
> - This is a fast-moving product (CLI went from 1.0.x to 1.1.87 and Desktop to 1.21.6 within roughly 8 months [S6][S7]). Re-check the changelog before presenting anything to others.

---

## Table of Contents

1. [Executive Summary (TL;DR)](#1-executive-summary-tldr)
2. [What CoCo Is — Naming, Timeline, Mental Model](#2-what-coco-is)
3. [The Three Surfaces Compared](#3-the-three-surfaces-compared)
4. [Prerequisites, Access, Roles, Regions](#4-prerequisites-access-roles-regions)
5. [Getting Started (per surface)](#5-getting-started)
6. [Core Concepts & Building Blocks](#6-core-concepts--building-blocks)
7. [CLI Reference (commands, flags, slash commands, files)](#7-cli-reference)
8. [Desktop Reference](#8-desktop-reference)
9. [Snowsight Reference](#9-snowsight-reference)
10. [Extensibility: Skills, Subagents, Hooks, MCP, Plugins, ACP, SDK](#10-extensibility)
11. [Automations & Cloud Sandbox (unattended work)](#11-automations--cloud-sandbox)
12. [Security, Governance & Admin](#12-security-governance--admin)
13. [Cost, Billing & Observability](#13-cost-billing--observability)
14. [Role Playbooks: Data Analyst · System Analyst · Integration Architect](#14-role-playbooks)
15. [Hands-on Learning Path & Labs](#15-hands-on-learning-path--labs)
16. [Prompt Library](#16-prompt-library)
17. [Market View, Limitations, Open Questions, Troubleshooting, Glossary](#17-market-view-limitations-open-questions-troubleshooting-glossary)
18. [Bibliography](#18-bibliography)

---

## 1. Executive Summary (TL;DR)

- **CoCo is Snowflake's AI coding/agent product for data work.** It is an autonomous agent (plans → asks approval → executes → iterates) that runs *inside your Snowflake identity* — it respects **RBAC**, sees schemas/lineage/tags/masking policies you can see, and runs SQL as you [S1][S3].
- **Three front doors, one brain:** *Snowsight* (browser panel, nothing to install), *Desktop* (standalone AI IDE for macOS/Windows), *CLI* (`cortex` — terminal agent, scriptable, best for CI/automation) [S1].
- **What makes it different from a generic coding agent:** native Snowflake tools (SQL execution, object search, lineage, semantic-model validation, dbt, Dynamic Tables, Cortex Agents), Snowflake-governed models, usage billed in Snowflake credits, and admin controls expressed as Snowflake objects/parameters (roles, `ALTER ACCOUNT` parameters, Account Usage views) [S1][S12][S13].
- **Extensibility is open and Claude-Code-compatible in many places:** `SKILL.md` skills, subagents (Markdown), hooks, MCP servers, plugins (`plugin.json`), `AGENTS.md`/`CLAUDE.md` instruction files, ACP for editors, Agent SDK (Python/TypeScript) [S8][S9][S10][S11][S14].
- **Governance is a first-class theme:** three approval modes (confirm / plan / bypass), Restricted Session Scope (RSS), managed settings (org policy file/MDM), sandboxing, per-user daily credit limits per surface, budgets/quotas, observability event table and usage views [S5][S12][S13][S15].
- **Caveats to remember:** performance claims (e.g., 72.1% vs 65.1% on ADE-Bench) are vendor-reported and unreplicated [B2][B3]; context ends at the Snowflake boundary [B1][B2]; a prompt-injection/sandbox-escape flaw was found and fixed in early 2026 (CLI 1.0.25) [B6]; several pages are marked Preview; automations have an hourly minimum and 2-month retention [S10].
- **For your three hats:**
  - *Data Analyst* → Snowsight panel + Desktop (SQL Playground, charts, notebooks), semantic models, Cortex Analyst Q&A.
  - *System Analyst* → catalog/lineage/tag discovery, requirement-to-spec workflows (PRD→plan skill pattern), documentation via `AGENTS.md`, dbt lineage, impact analysis.
  - *Integration Architect* → MCP/ACP/SDK/plugins/skills as the integration surface, managed settings + RSS + RBAC as the control plane, Cloud sandbox/automations for unattended jobs, cost + audit design.

---

## 2. What CoCo Is

### 2.1 One-paragraph definition
🟢 "CoCo is an AI agent built into the Snowflake platform for data engineering, analytics, machine learning, and agent-building. It uses an autonomous agent framework to work directly in your Snowflake environment and is aware of role-based access control (RBAC), schemas, and best practices." [S1]

### 2.2 Naming & timeline (sources differ — noted)
| Date | Event | Source |
|---|---|---|
| Nov 2025 | Atlan says Cortex Code "launched" (likely CLI/preview) | [B1] 🟡 |
| Feb 2–3, 2026 | Product launch dates quoted as Feb 2 (PromptArmor) / Feb 3 (DigitalApplied); Snowsight preview release note dated Feb 2, 2026 | [B6][B2][R3] |
| Feb 28, 2026 | CLI 1.0.25 ships fix for prompt-injection / sandbox bypass | [B6] |
| Mar 16, 2026 | Public disclosure of that vulnerability | [B6][B2] |
| Jun 2, 2026 | Rebrand "Cortex Code" → **CoCo** at Snowflake Summit; Desktop, Automations, Cloud Agents announced | [B1][B2][B4] |
| Aug–Sep 2026 | Desktop 1.21.x, CLI 1.1.65–1.1.87 (see §17.5 timeline) | [S6][S7] |

💡 Takeaway: when searching, use **both** terms — "Cortex Code" (older blogs, parameter names) and "CoCo" (current docs/marketing).

### 2.3 Mental model: the agent loop
🟡 Atlan/DigitalApplied describe a loop: **interpret intent against the catalog (with your RBAC) → select tools & build a plan → show plan for review → execute while keeping session state** [B1][B2]. The docs' own phrasing: CoCo "shows its reasoning and actions in the terminal and may ask for information. In plan mode, it asks you to confirm each action" [S2].

```
 You (natural language, @-mentions, files, tables)
        │
        ▼
 ┌───────────────────────── CoCo agent loop ───────────────────────────┐
 │ context: instruction files (AGENTS.md…), memory, skills, session     │
 │ tools : sql_execute, object search, bash/read/write/edit, browser,   │
 │         notebook, dbt, semantic-view/agent skills, MCP tools          │
 │ gates : approval mode · RSS · managed settings · hooks · sandbox      │
 └───────────────────────────────┬──────────────────────────────────────┘
                                 ▼
        Snowflake (your role/RBAC, warehouses, Cortex models, Horizon)
```
💡 (diagram is my synthesis of the documented pieces.)

### 2.4 What you can ask it to do (documented examples)
From the CLI page [S2] and Snowsight page [S3]:
- Discovery/governance: "What databases do I have access to?", "List every table tagged PII = TRUE in ANALYTICS_DB", "Show the lineage from RAW_DB.ORDERS to downstream dashboards".
- SQL: "Write a query for top 10 customers by revenue", "Add a 7-day moving average", "Explain why this query is slow and optimize it".
- Apps/pipelines: "Build a Streamlit dashboard on SALES_MART.REVENUE with filters for date and region", "Create a dbt project to transform raw sales data".
- Semantic models: "Use the @models/revenue.yaml semantic model to answer 'What was revenue last month?'", "Debug my semantic model at @models/revenue.yaml".
- Admin: credit consumption, high-cost warehouses/queries, user/role access, PII tables [S3].
- Notebooks/ML: EDA, churn modeling, CNN on MNIST; dbt Projects on Snowflake [S3].

---

## 3. The Three Surfaces Compared

| Dimension | **CoCo in Snowsight** | **CoCo Desktop** | **CoCo CLI** |
|---|---|---|---|
| Form factor | Side panel in Snowsight (Workspaces, admin pages) | Standalone AI IDE (VS Code-based: Command Palette, settings like `chat.agent.sandbox.enabled`) | Terminal agent `cortex` |
| Install | None | Download installer (macOS, Windows) | `curl … install.sh` / PowerShell script |
| Status (docs) | GA | GA | GA |
| Accounts | Commercial (non-Gov), FedRAMP Moderate/High, DoD, KSA sovereign; cross-region inference on | Commercial (non-Gov, VPS, Sovereign); cross-region inference on | Same as Desktop |
| Local files / Git / dbt local | No (workspace files only) | Yes | Yes |
| Modes | Chat + diff view | Agent / Editor *view*; Agent / Plan *mode*; Ask / Edit / Agent picker | Confirm / Plan / Bypass |
| Unique strengths | Zero-install, catalog `@` mentions, inline SQL suggestions, Fix button, admin Q&A, notebooks in Workspaces | Parallel agents, SQL Playground, charts, agentic browser & notebook, app building, dbt UI/lineage, memory, local automations, semantic code search | Scripting (`exec`, `-p`), CI/CD, cloud sandbox `--cloud`, worktrees, ACP server, automation CLI, `managed-settings` |
| Billing | Per token (existing accounts) | Subscription or pay-as-you-go | Subscription or pay-as-you-go |
| Daily limit parameter | `CORTEX_CODE_SNOWSIGHT_DAILY_EST_CREDIT_LIMIT_PER_USER` | `CORTEX_CODE_DESKTOP_DAILY_EST_CREDIT_LIMIT_PER_USER` | `CORTEX_CODE_CLI_DAILY_EST_CREDIT_LIMIT_PER_USER` |

Sources: [S1][S3][S5][S13]. Other delivery modes mentioned by third parties (🟡): VS Code extension, Claude Code plugin, Excel extension, Slack ("coming soon") [B1][B2][B4]; Snowflake's own blog lists Slackbot and mobile as "coming soon" and does not mention VS Code/Claude Code/Excel [S16] — **treat these as unverified roadmap items.**

**Recommended hybrid workflow** 🟡 (Medium author): explore in Snowsight, move to CLI when you need local file persistence, Git or CI/CD [B5]. 💡 Add Desktop for visual/iterative work (charts, apps, notebooks).

---

## 4. Prerequisites, Access, Roles, Regions

### 4.1 Account & platform
- **Account types:** see table in §3. Standard trial accounts (trial.snowflake.com) are **not supported** for the CLI; trial accounts have AI features **off by default** until an admin adds a credit card (doesn't end the trial) [S2][S3][S5].
- **Cross-region inference must be enabled** (ACCOUNTADMIN) for models not available in your region [S1][S5]. Example: `ALTER ACCOUNT SET CORTEX_ENABLED_CROSS_REGION = 'AWS_US';` (other values include `ANY_REGION`) [B5][S14][S20].
- **Platforms (CLI):** macOS arm64/x64; Linux x64/arm64; Windows WSL on x64, native on x64 [S2]. **Desktop:** macOS & Windows (WSL optional, PowerShell default shell) [S5][S21].
- **Legacy Copilot:** if the account opted out of / disabled Snowflake Copilot (legacy), CoCo in Snowsight is also disabled — contact your account team [S3].

### 4.2 Roles & privileges (the part admins always ask about)
| Need | Object / privilege | Notes |
|---|---|---|
| Use CoCo (CLI/Desktop) | `SNOWFLAKE.CORTEX_USER` **or** `SNOWFLAKE.CORTEX_AGENT_USER` database role | `CORTEX_USER` is granted to `PUBLIC` by default; `CORTEX_AGENT_USER` is **not** (least-privilege option) [S2][S5] |
| Use CoCo in Snowsight | `SNOWFLAKE.COPILOT_USER` (all users) **plus** one of the above | Grant with `GRANT DATABASE ROLE` [S3] |
| Restrict | Revoke `CORTEX_USER` from `PUBLIC`, grant to selected roles | Also removes other Cortex AI functions (e.g., `AI_COMPLETE`) [S5] |
| Switch off for account | Set the surface's `*_DAILY_EST_CREDIT_LIMIT_PER_USER` to `0` | User-level value overrides account-level [S3][S13] |
| Automations | `EXECUTE AGENT TASK` on account (default to `PUBLIC`) | Revoke from PUBLIC then grant to a role to limit [S10] |
| Observability table | `SNOWFLAKE.AI_OBSERVABILITY_READER` application role; `IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE` for usage joins | `AI_OBSERVABILITY_ADMIN` for retention deletes [S19] |
| Model defaults | ACCOUNTADMIN to create `CORTEX_CODE.CONFIG.DEFAULT` agent | See §6.4 [S20] |

**Access requires BOTH** a qualifying database role **and** a non-zero daily credit limit [S13].

### 4.3 Models
- Models available depend on Cortex models granted to your active role and regional availability/cross-region inference. List them: `SHOW CORTEX BASE MODELS IN SCHEMA SNOWFLAKE.MODELS` [S2][S5].
- Families named in docs: **Claude, OpenAI GPT, Gemini, Grok** — "the in-product list is authoritative" [S3][S5].
- **Auto options:** *Auto* (Snowflake selects), *Auto Intelligent* (highest capability and cost), *Auto Efficient* (lowest cost, may be worse on hard tasks) [S2][S3][S5].
- Agent SDK doc lists model IDs (as of fetch): `claude-opus-5`, `claude-opus-4-8/4-7/4-6/4-5`, `claude-sonnet-5`, `claude-sonnet-4-6/4-5`, `claude-4-sonnet`, `openai-gpt-5.5`, `openai-gpt-5.4`, `openai-gpt-5.2`; `auto` recommended [S14]. 💡 This list changes often.
- Snowsight also exposes an **effort level** (Low/Medium/High) per chat for supported models [S3]; CLI has `--effort minimal|low|medium|high|max` [S2a]; Desktop 1.21.x added a thinking-effort control [S6].
- **Org default model:** an ACCOUNTADMIN can set `models.orchestration` via a settings agent (§6.4) [S20].

---

## 5. Getting Started

### 5.1 Snowsight (fastest, zero install)
1. Confirm roles (§4.2). 2. Open Snowsight → click the **CoCo icon, lower-right**; the panel opens on the right [S3]. 3. Try: "What databases do I have access to?" [S3][B7]. 4. Use `@` to attach tables/schemas/views; `/` for skills; highlight SQL for Quick Edit / Format / Add to Chat / Explain [S3].
- CoCo starts with your **default role**; ask it to switch roles or fix the default via `ALTER USER` if you hit permission errors [S3].
- Optional: web search must be enabled by ACCOUNTADMIN under **AI/ML > Agents > Settings** [S3].

### 5.2 CLI
**Install**
```bash
# macOS / Linux / WSL
curl -LsS https://ai.snowflake.com/static/cc-scripts/install.sh | sh
# if ~/.curlrc interferes:
curl -qLsS https://ai.snowflake.com/static/cc-scripts/install.sh | sh
# Windows PowerShell
irm https://ai.snowflake.com/static/cc-scripts/install.ps1 | iex
```
Installs `cortex` to `~/.local/bin` (Windows: `%LOCALAPPDATA%\cortex`) and edits PATH [S2]. Verify: `cortex --version`. Update: `cortex update` [S2a].

**Connection** — CoCo reads the Snowflake CLI connection file(s): `~/.snowflake/connections.toml` (also `config.toml` per the quickstart) [S2][B7]. Minimal example (from the quickstart [B7]):
```toml
default_connection_name = "DEMO"

[connections.DEMO]
account   = "<YOUR_ACCOUNT>"
user      = "<YOUR_USERNAME>"
password  = "<YOUR_PAT>"      # prefer browser/OAuth auth, see §12
role      = "<YOUR_ROLE>"
```
```bash
chmod 600 ~/.snowflake/connections.toml   # docs recommend 600 files / 700 dirs [S12a]
cortex                 # first run launches a setup wizard
cortex -c DEMO         # use a named connection
```
First prompt: "What can I do with Cortex Code?" [S2].

**Corporate-laptop workaround** 🟡: the Snowflake quickstart suggests **GitHub Codespaces** when local installs are restricted (x64 only) [B7].

### 5.3 Desktop
1. Download from Snowflake's CoCo downloads page (macOS/Windows). Windows: **User installer** (recommended, no admin, auto-update works) or **System installer** (admin, IT-managed) [S5a].
2. First-run flow: Welcome → **Connect** (auto-detects `~/.snowflake/connections.toml`; or Add connection) → choose **Agent** or **Editor** view → theme [S5a].
3. Add-connection fields: account identifier (`orgname-accountname`), connection name, username, authentication (**Local OAuth recommended**, External browser SSO, Password; Key-pair via editing TOML) [S5a].
4. Sample TOML (OAuth) from docs:
```toml
[my-connection]
account = "myorg-myaccount"
user = "myuser"
authenticator = "oauth_authorization_code"
client_store_temporary_credential = true
```
Key-pair: `authenticator = "snowflake_jwt"`, `private_key_path = "~/.ssh/snowflake_rsa_key.p8"` (+ `private_key_passphrase`) [S5a]. Credentials are stored in macOS Keychain / Windows DPAPI / libsecret [S5a][S11a].
5. Connection menu (top bar): manage/view/refresh connections, **Change Role**, **Default Warehouse**, **Private Mode** [S5a]. `/connections` also works in chat.
6. Logs: macOS `~/Library/Application Support/Cortex Code/logs/<timestamp>/main.log`; Windows `%APPDATA%\Cortex Code\logs\<timestamp>\main.log`; **Reset Onboarding** in Command Palette [S5a].


---

## 6. Core Concepts & Building Blocks

### 6.1 Approval / permission modes
| Surface | Modes | How to switch | Notes |
|---|---|---|---|
| CLI | **Confirm** (blue ⏵⏵, default) · **Plan** (orange ⏸) · **Bypass** (red >>) | `Shift-Tab` cycles; `/plan`, `/plan-off`, `/bypass`, `/bypass-off`; `Ctrl+P` plan (quickstart) | Bypass "disables all confirmation prompts" [S12a][B7] |
| Desktop | **Default Approvals** (shield) · **Bypass Approvals** (warning) — machine-wide; plus *Agent / Plan / Edit / Ask* chat modes | Picker bottom-left of chat input; `Shift+Tab` toggles Agent↔Plan | Org can block bypass via `permissions.dangerouslyAllowAll` [S26][S27][S15] |
| Snowsight | Diff view: accept/reject suggested changes | in panel | [S3] |
| ACP | `standard` · `plan` · `bypass` | session config option | [S25] |

**Plan mode (Desktop):** read-only research; allowed = read files, read-only commands (`ls`, `git log/status`, `find`), read-only SQL (`SELECT/SHOW/DESCRIBE`), web search, clarifying questions, read-only sub-agents. Not allowed = create/edit/delete files, installs/builds/commits, DDL/DML, notebook edits. Output = plan card (context, 3–8 steps, verification, 3–5 critical files) saved to `.snowflake/cortex/plans/`; **Build** (⌘⇧B) executes it; plan file is editable before build [S27].

**CLI risk classification (experimental):** SAFE (`ls`,`cat`,`grep`) auto-approved → LOW → MEDIUM (edits) prompts → HIGH (`rm`,`curl`,`wget`,`sudo`) always prompts → CRITICAL (`rm -rf`) extra confirmation. SQL: READ_ONLY auto-approved; WRITE and USE_ROLE prompt [S12a]. Permission types: EXECUTE_COMMAND, FILE_READ, FILE_WRITE, FILE_EDIT, WEB_ACCESS [S12a].

### 6.2 Context
- **Instruction files** (persistent context injected at start of each session). Desktop recognizes (case-insensitive) `AGENTS.md`, `CLAUDE.md`, `CORTEX.md`, `SNOWFLAKE.md`, `RULES.md`, `.cursorrules`, `.cursor/rules/*.mdc`, `.claude/rules/*.md`, and `.github/instructions/*.instructions.md` (with `applyTo` globs). Workspace-level beats user-level (`~/.snowflake/cortex/`, `~/`, `~/.claude/`) beats profile; total cap ≈ **100,000 characters** [S28]. Snowsight also honours `AGENTS.md` at workspace root [S3]; CLI supports `AGENTS.md` and Agent Skills [S1].
- **@-mentions:** Snowsight `@` searches tables/schemas/views [S3]; CLI examples use `@models/revenue.yaml` and `@src/auth.py` [S2][S8].
- **Context window:** Desktop shows a *context ring*; `/compact` summarizes history; large tool results are offloaded to disk; most-used tools load up front and others are discovered on demand [S29]. CLI 1.1.87: summarization keeps the Snowflake thread attached; `/compact` starts a fresh thread [S7].
- **Memory (Desktop):** Markdown files in `~/.snowflake/cortex/memory/` with global and per-project `MEMORY.md` indexes; toggle/browse/reset under Agent Settings > Personalization > Memory [S30]. CLI has `enableMemory` setting (1.1.8) and conversation recall via `cortex conversations search` (1.1.87) [S7].
- **Semantic code search (`tgrep`, Desktop):** meaning-based search using the `snowflake-arctic-embed-l-v2.0` embedding model; opt-in per workspace; not available on remote/virtual workspaces [S31].
- **Conversation history:** `~/.snowflake/cortex/conversations/` (CLI/Desktop/ACP). `cortex --private` disables saving; `cortex conversations delete <id>`; `/clear` only clears the screen [S12a][S11a].

### 6.3 Restricted Session Scope (RSS)
A governance control that narrows what a chat/session can do. In CLI: `/guardrails` → *Restrict this session* (apply an existing RSS or read-only), or *Create new restricted session scope* (role restrictions + read-only; stored in `USER$<username>.RSS`); `/guardrails status`; start with `cortex --with-restricted-session-scope=READONLY_PM`. Desktop: **+ → Restrict this session → Read only / Restrict by role** (allow-list / block-list). Snowsight: restrict the chat to read-only or selected roles. **Once active, you can switch to another RSS but cannot remove or relax it — start a new session/chat** [S2][S3][S5]. RSS and child-session support became on-by-default in CLI 1.1.87 [S7]. Not supported with `--cloud` [S22]. Reference: <https://docs.snowflake.com/user-guide/restricted-session-scope>.

### 6.4 Organization default model (admin)
```sql
CREATE DATABASE IF NOT EXISTS CORTEX_CODE;
CREATE SCHEMA  IF NOT EXISTS CORTEX_CODE.CONFIG;
CREATE OR REPLACE AGENT CORTEX_CODE.CONFIG.DEFAULT
  FROM SPECIFICATION $$ models: { orchestration: auto } $$;   -- docs show multi-line YAML
GRANT USAGE ON DATABASE CORTEX_CODE TO ROLE PUBLIC;
GRANT USAGE ON SCHEMA   CORTEX_CODE.CONFIG TO ROLE PUBLIC;
GRANT USAGE ON AGENT    CORTEX_CODE.CONFIG.DEFAULT TO ROLE PUBLIC;
ALTER ACCOUNT SET CORTEX_ENABLED_CROSS_REGION = 'ANY_REGION';
```
Only key supported: `models.orchestration` (default `auto`; or pin e.g. `claude-opus-4-7`). Grant USAGE to specific roles to scope. Applies at session start; plan mode cannot be set account-wide [S20].

### 6.5 Skills, subagents, hooks, MCP, plugins — one-line definitions
| Building block | What it is | Where it lives (CLI) |
|---|---|---|
| **Skill** | Folder with `SKILL.md` (+ scripts/templates); instructions injected when invoked (`$skill-name` in CLI, `/skill` in Desktop/Snowsight) | `.cortex/skills/`, `.claude/skills/`, `~/.snowflake/cortex/skills/` |
| **Subagent** | Specialized agent with own context/tools/model; foreground or background | `.cortex/agents/`, `~/.snowflake/cortex/agents/` |
| **Hook** | Script/prompt at lifecycle events (PreToolUse, PostToolUse, …) that can block or modify | `settings.json`, `hooks.json` |
| **MCP server** | External tools/data via Model Context Protocol (stdio/http/sse) | `~/.snowflake/cortex/mcp.json` |
| **Plugin** | Bundle of skills + subagents + commands + hooks + MCP servers | `.cortex-plugin/plugin.json` |
| **Profile** | Team/connection-level baseline (skills stage, plugins, MCP) | `~/.snowflake/cortex/profiles/` |
| **Automation** | Scheduled unattended prompt | Snowflake `AGENT TASK` (hosted) / local scheduler (Desktop) |
Details in §10–11.

---

## 7. CLI Reference

### 7.1 Starting & options [S2a]
```bash
cortex                       # interactive
cortex -c production         # named connection
cortex -w /path/to/project   # working dir
cortex --continue            # resume most recent
cortex --resume <session_id> # or: -r last
cortex --cloud               # run tools in Snowflake-managed container (§11.2)
```
| Option | Purpose |
|---|---|
| `-c, --connection <name>` | Snowflake connection |
| `-w, --workdir <path>` | Working directory |
| `-m, --model <name>` | Model (`--model auto` valid) |
| `--mode <standard\|code>` | Tool set; `code` = lean coding set |
| `--plan` | Require approval before all actions |
| `--auto-accept-plans` | Auto-accept plan requests/confirmations |
| `--bypass` / `--dangerously-allow-all-tool-calls` | Auto-approve everything |
| `--allowed-tools "Bash(git *)"` | Run listed tools without prompting |
| `--disallowed-tools` | Remove tools from model context |
| `-p, --print "<prompt>"` | Print response and exit (batch) |
| `--output-format stream-json` | JSON output for scripting |
| `--effort minimal\|low\|medium\|high\|max` | Thinking effort |
| `--max-turns <n>` | Max agentic turns |
| `--private` | No history saved, no server-side logging |
| `--with-restricted-session-scope <name>` | Apply named RSS |
| `--cloud [<workspace>]`, `--no-workspace`, `--github <secret>` | Cloud sandbox (§11.2) |
| `--sql-read-only` | Read-only SQL (1.0.77; `/sql-writes` toggles) [S7] |
| `--mcp-wait`, `--only-explicit-mcp-servers`, `--only-explicit-plugins`, `--only-explicit-skills`, `--plugin-dir <path>` | Control what loads (1.1.x) [S7][S11] |
| `--fork` | Open shared conversation (1.1.87) [S7] |

**Subcommands:** `cortex update [version]`; `cortex exec "<prompt>"` / `--file <f>` / `--file -` (CI/CD; plan mode off; interactive prompts rejected); `cortex mcp list|add|get|remove|reconnect|start`; `cortex completion install|generate`; `cortex skill list|add|update|publish|remove|sync`; `cortex plugin install|uninstall|enable|disable|list|validate|update`; `cortex profile publish`; `cortex automation create|list|describe|doctor|execute|suspend|resume|drop`; `cortex conversations list|search|delete|transcript`; `cortex workspace` / `cortex ws`; `cortex acp serve`; `cortex auth login|status`; `cortex managed-settings`; `cortex agent-studio`; `cortex secret`; `cortex browser`; `cortex search object --types`. (Compiled from [S2a][S7][S8][S10][S11][S15][S25]; run `cortex --help` for the authoritative list.)

### 7.2 Slash commands (interactive only) [S2a]
- **Session:** `/help`, `/clear` (`/cls` clears screen only since 1.1.65 — `/clear` starts a new conversation) [S7], `/new`, `/rename`, `/quit`, `/resume` (`/r`, `/sessions`), `/rewind`, `/fork`
- **Model/mode:** `/model`, `/plan`, `/plan-off`, `/bypass`, `/bypass-off`, `/status`
- **Snowflake/data:** `/sql <query> [--limit n]`, `/table [<file>]` (`/csv`), `/connections` (`/conn`; add/edit/delete), `/guardrails`, `/guardrails status`
- **Development:** `/sh` or `! cmd`, `/diff` (`/changes`, `/review`), `/worktree create|list|switch|delete`, `/fdbt`, `/lineage`
- **Config:** `/settings`, `/theme`, `/sandbox`, `/workspace` (cloud), `/add-dir <path>`
- **Extensibility:** `/skill` (`/skills`), `/skill new`, `/mcp`, `/hooks`, `/commands`, `/agents`, `/plugin`
- **Utilities:** `/bashes` (`/tasks`), `/feedback` (local .tgz), `/update`, `/changelog`, `/stats`, `/restart`, `/monitors`, `/compact`, `/index`, `/docs`, `/automation(s)`, `/import-claude-config`, `/wipe-session`, `/share-skill-and-plugin`, `/find-skill-and-plugin` (from [S7][S10][S23][S25])

### 7.3 Keyboard shortcuts [S2a][S7]
`Ctrl+C` cancel · `Ctrl+C ×2` exit · `Ctrl+L` clear screen · `↑/↓` history · `Tab` complete · `Ctrl+J` newline · `Ctrl+T` table viewer · `Shift-Tab` cycle modes · `Ctrl+P` plan (quickstart) · `Ctrl+B` monitor agents · `Esc-u` undo last `/rewind` · `Ctrl+Q` open prompt in `$EDITOR` · `ESC+C` copy input.

### 7.4 Files & locations [S2a][S8][S9]
```
~/.snowflake/connections.toml        # connections (chmod 600)
~/.snowflake/cortex/
  settings.json  mcp.json  hooks.json  permissions.json  mcp-disabled.json
  conversations/  skills/  agents/  commands/  profiles/  plugins/  cache/  logs/  mcp_oauth/
.cortex/ (project): skills/ agents/ plugins/ settings.json settings.local.json mcp.json
.claude/ is also read for skills/agents/plugins/hooks (Claude-compat)
```
Note: `.claude/settings.json` is no longer read as project settings (1.1.47); MCP servers from `~/.claude.json` are merged and `/import-claude-config` imports theme + permission rules once (1.1.53) [S7]. `settings.json` key `"autoUpdate": false` disables auto-update [S2a].

### 7.5 Sandboxing (CLI) [S2a]
`/sandbox on|off|status`; `/sandbox runtime on|off` (OS sandbox: macOS sandboxing / Linux namespaces); `/sandbox mode auto|regular`; container sandbox uses Docker; VM sandbox is installed/maintained automatically since 1.1.65 [S7]. Managed settings can force sandbox on (`forceSandboxEnabled`, `forceSandboxMode`) — described as experimental [S15].

### 7.6 Example CLI session patterns (from the docs)
```text
> What databases do I have access to?
> List every table tagged PII = TRUE in ANALYTICS_DB
> Explain why this query is slow and optimize it
> Use the @models/revenue.yaml semantic model to answer "What was revenue last month?"
> $dynamic-tables Review SILVER_AP_INVOICES            # bundled skill from the quickstart [B7]
```
Exit codes: `0` success, non-zero failure; errors on stderr [S2a].

---

## 8. Desktop Reference

### 8.1 Views & modes [S5][S27][S5a]
- **Agent view** (optimized for parallel agent sessions across workspaces) vs **Editor view** (file-centric with agents alongside); toggle ⌘E. Chat modes: **Ask / Edit / Agent**, with **Plan** as a sub-mode of Agent.
- Navigation, Command Palette (⌘⇧P), "Universal Navigator" (1.17.0) [S6].

### 8.2 Feature map (sub-pages under `/cortex-code-desktop/`) [S5]
| Feature | Key facts |
|---|---|
| **Agents** | Bundled / plugin / custom agents; parallel agents with cards and transcripts; create under Agent Settings → Agents (model: auto, auto-small, inherit, pinned); no numeric limits stated [S32] |
| **Building apps** | **Streamlit in Snowflake** (single `streamlit_app.py`, Snowpark live queries, deploy `snow streamlit deploy`) or **Snowflake App Runtime** (Node 22+, `app.yml`, `snow app deploy`, Owner's vs Caller's Rights); Apps view lists local/deployed apps; live preview in agentic browser; manage via natural language (status, logs, restart, rollback for App Runtime) [S33] |
| **Data visualization** | Line, area, bar, stacked bar, scatter, pie/donut, metric cards; auto-suggested charts on ≥3 rows; "Visualize Data" control; ≤500 rows per viz; Desktop-only; exploratory, **not** BI dashboards/scheduling [S34] |
| **SQL Playground** | Monaco scratch editor in right panel; Run (⌘/Ctrl+Enter) / Run All; Results (Table/Chart) + Query History; sheets stored at `~/.snowflake/cortex/sql/<workspace-id>/`; **Fix** button returns rewrite as diff (Keep/Undo) [S35] |
| **dbt integration** | Discovers `dbt_project.yml` (≤5 levels); **Local** mode (your dbt CLI) or **Snowflake-managed** (`EXECUTE DBT PROJECT FROM WORKSPACE`, needs personal databases, `profiles.yml`/`dbt_projects_profiles.yml`); lineage DAG with "Add to Chat"; settings `dbt.executionMode`, `dbt.snowflakeManaged.executionTimeout` (default 14400 s); project folders ≤100,000 files [S36] |
| **Agentic browser** | Navigate/read/click/fill/screenshot, works on `localhost`; toolbar with Select Element/Screenshot/DevTools; cross-origin interactions need approval [S37] |
| **Agentic notebook** | Works on `.ipynb` with bundled Python, conda, local Jupyter or remote Jupyter kernels; Keep/Undo per cell; inspects pandas/polars/PySpark/Snowpark DataFrames; doesn't cover Snowflake Notebooks [S38] |
| **Automations (local)** | Saved prompts on a schedule (Manual/Hourly/Daily/Weekdays/Weekly/Custom); run only while app open + machine awake; last missed run caught up; 50-run history; runs pause for approvals unless bypass [S39] |
| **Skills** | Packaged, project, local, plugin, GitHub, Snowflake stage, Skills Catalog (`snow://skill_catalog/…@version`); publish to stage/catalog; shares `~/.snowflake/cortex/skills.json` with CLI [S40] |
| **Plugins** | Plugins Catalog (Cortex Extension objects), local, GitHub; bundled plugins read-only & disabled by default; "not cryptographically signed or verified by Snowflake" [S41] |
| **Hooks / MCP** | Agent Settings > MCP form/JSON; global + workspace `mcp.json`; `${input:id}` secrets prompts; MCP protocol `2025-11-25`; 50 KB result cap, 60 s default timeout, 64-char tool names [S42] |
| **Instruction files / Personalization / Memory** | §6.2 [S28][S30] |
| **Permission modes / Security / Managed settings / FAQ** | §12 [S26][S11a][S15][S21] |

### 8.3 Desktop-only facts worth remembering
- Approvals: *Allow once / Allow for session / Always allow / Reject*; `CALL` statements may re-prompt even after "Always allow"; **Reset Tool Confirmations** in Command Palette clears remembered approvals [S26].
- Always-prompt tools regardless of mode: `browser_evaluate`, `browser_run_code`, `browser_read_clipboard`, subagents and some destructive tools [S26].
- Agent terminal sandbox (experimental): `"chat.agent.sandbox.enabled": "on"` — wraps only agent-initiated Bash, not file edits, SQL or MCP [S26][S11a].
- Workspace Trust gate: until trusted, hooks, MCP, subagents, project skills, instruction files stay disabled [S11a].
- Extensions: Snowflake-curated Open VSX allowlist; high-risk/competing extensions blocked [S11a].
- Data privacy: "Snowflake never uses your Customer Data to train models made available to our customer base" [S21].
- Release highlights: Plugins & App Gallery (1.14.0, May 2026); SSH remote workspaces, Memory (1.16.0, Jun); Plan Mode refresh, Plugins Catalog (1.17.0); semantic code search & `/compact` (1.18.0, Jul); tool search/offload token efficiency (1.19.0); Enterprise MDM enforcement on macOS (1.21.0, Aug); new chart types, local-or-cloud automations (1.21.2); isolated Snowflake sessions for agent SQL, session search, thinking effort (1.21.3, Sep); grouped model picker with thinking effort (1.21.6) [S6].

---

## 9. Snowsight Reference [S3]

- **Open:** CoCo icon lower-right. **Roles:** `COPILOT_USER` + (`CORTEX_USER` | `CORTEX_AGENT_USER`). **Default role** used at session start.
- **Workspaces features:** agentic coding (generate/modify/review/explain SQL), diff view, `@` catalog context, quick actions on highlighted SQL, **Fix** button on failed SQL, inline gray-text suggestions (Tab accepts; configure under Settings > User preferences), `AGENTS.md`, skills via `/` (personal skills in `.snowflake/cortex/skills` — usable only in the workspace where created).
- **Discovery:** plain-language schema search; documentation Q&A; Marketplace + Internal Marketplace search; responses may include tags, masking policies, lineage.
- **Admin:** user/role access, data ownership, PII tables, credit consumption, costly warehouses/queries; optional web search (ACCOUNTADMIN).
- **Notebooks:** create/manage notebooks in Workspaces, edit SQL/Python/Markdown cells, generate visualization code, run cells. **dbt Projects on Snowflake:** source exploration, scaffolding, DAGs/metrics, tests, incremental models, dbt command execution, docs.
- **Skills & plugins page:** needs an active warehouse; built-in skills via `/`; personal skills (upload file/folder or **+ Create Skill**); catalog under **AI & ML > Skills and plugins** (Horizon Catalog governance; rolling out) [S24]. Sharing: `share-skill` skill → `snow://skill_catalog/DB.SCHEMA.EXT` link; `find-skill` to discover; plugins not shareable from Snowsight [S23][S24].
- **Observability/feedback:** thumbs up/down go to Snowflake as product feedback (request ID + comment only); prompt traces land in `SNOWFLAKE.LOCAL.AI_OBSERVABILITY_EVENTS` [S3][S19].
- **CoCo vs. CoWork vs. legacy Copilot:** CoCo = SQL authoring/exploration/docs/admin in Snowsight; **Snowflake CoWork** = natural-language analysis via its own UI and Cortex Agents API; legacy Copilot is deprecated in favor of CoCo [S3].
- **Cloud Agents in Snowsight** (isolated Snowflake-managed container per session) are described by Snowflake's blog; the CLI `--cloud` flag is "the CLI equivalent" [S16][S22].


---

## 10. Extensibility

### 10.1 Skills [S8][S40][S23]
**Format** — directory with `SKILL.md`:
```markdown
---
name: database-admin
description: Database administration tasks
tools:
- sql_execute
- snowflake_object_search
---
# When to Use / What This Skill Provides / Instructions / Best Practices / Examples
```
- Tool names are **case-sensitive runtime IDs** (`bash`, `read`, `write` lowercase). The CLI SQL tool is `sql_execute` (renamed from `snowflake_sql_execute` in CLI 1.1.8); Desktop still uses `snowflake_sql_execute` → list both for cross-surface skills [S8][S7].
- **Precedence (high→low):** Project (`.cortex/skills/` or `.claude/skills/`) → User (`~/.snowflake/cortex/skills/` or `~/.claude/skills/`) → Global → Session → Remote (git cache) → Bundled. Also `.agents/skills` discovery (1.0.77) [S8][S7].
- **Invoke:** CLI `> $my-skill do X` (compose several: `$code-review … following $security-guidelines`); Desktop/Snowsight `/skill`; descriptions drive auto-invocation [S8][S40].
- **Manage:** `/skill`, `/skill list`, `/skill add <path|git|tarball|stage>`, `/skill sync <name>`; `cortex skill list|add|update|publish|remove` [S8].
- **Share:** (a) **Skill Catalog** (account-wide, governed; `/share-skill-and-plugin my-skill`, link `snow://skill_catalog/DB.SCHEMA.EXT[/versions/version$1]`); (b) **Git** (`/skill add https://github.com/org/my-skills.git`); (c) **Snowflake stage** (`cortex skill publish ./my-skills --to-stage @DB.SCH.STAGE/skills/`; needs `READ` to load, `WRITE` to publish; `WRITE` requires `READ`); (d) **Snowflake Git repository** [S8][S23].
- **Catalog governance:** objects are `CORTEX EXTENSION`s; versions start at 1; unversioned URI = latest *certified* else latest; ACCOUNTADMIN certifies/changes access/visibility/owner/deletes; same-account only; **no security scanning yet** [S23].
```sql
CREATE CORTEX EXTENSION new_db.new_schema.new_ext FROM 'snow://skill_catalog/old_db.old_schema.old_ext';
GRANT READ ON CORTEX EXTENSION new_db.new_schema.new_ext TO ROLE PUBLIC;
ALTER CORTEX EXTENSION new_db.new_schema.new_ext VERSION VERSION$1
  SET TAG snowflake.core.certification_status = 'CERTIFIED';   -- ACCOUNTADMIN
```
- **Bundled skills seen in sources:** `$dynamic-tables`, `$skill-development`, `$semantic-view` (create/audit/debug; VQR testing), `$cortex-agent`, `$agent-optimize` (create/test/debug/optimize), `plugin-creator`, `find-skill`, `share-skill`, `introduce-coco-desktop` [B7][S40][S24]. Run `/skill list` for your version.
- **Best practices:** be specific, give examples/edge cases, keep each skill to one domain [S8].
- **Troubleshooting:** skill not activating → use purpose-specific language, name it explicitly, check `/skill list`; "No SKILL.md found" → exact filename, avoid hidden folders [S8][S40].

### 10.2 Subagents [S8][S32]
- Built-ins: `general-purpose`, `explore` (quick/medium/very thorough), `plan`, `feedback`; plus a `data-discovery` subagent (CLI 1.1.65) [S7].
- Custom subagent = Markdown with frontmatter (`name`, `description`, `tools` (lowercase!), `model: claude-sonnet-4-5 | auto | inherit`) + system-prompt body; locations `.cortex/agents/`, `.claude/agents/`, `~/.snowflake/cortex/agents/`, `~/.claude/agents/` [S8].
- ⚠️ "Unrecognized entries are skipped silently, so an all-capitalized tool list yields an agent with no tools and no error." [S8]
- Background agents: ID returned; `/agents` or Ctrl-B to monitor; "kill agent <id>"; resume retains context; **max 50 concurrent background agents**; background agents can't spawn background agents; worktree isolation → branch `agent/<agentId>`; "swarms" = multiple agents in one prompt [S8].
- Team mode for collaborative multi-agent workflows (CLI 1.1.41) [S7].

### 10.3 Hooks [S8][S15]
- **Events:** PreToolUse✋, PostToolUse, PermissionRequest✋, UserPromptSubmit, SessionStart, SessionEnd, PreCompact, Stop, SubagentStop, Notification, Setup (✋ = can block).
- **Config priority:** Local (`.cortex|.claude/settings.local.json`) > Project (`settings.json`) > User (`~/.claude/settings.json`) > Global (`~/.snowflake/cortex/hooks.json`).
```json
{ "hooks": { "PreToolUse": [ { "matcher": "bash",
   "hooks": [ { "type": "command", "command": "bash .claude/hooks/validate-bash.sh", "timeout": 60 } ] } ] } }
```
- Types: `command` or `prompt` (`"Is this command safe? $ARGUMENTS"`). Matchers are regexes on **case-sensitive** tool names (`bash`, `edit|write`, `mcp__.*`, `.*sql.*`).
- I/O: JSON on stdin; stdout JSON can return `decision`, `systemMessage`, `hookSpecificOutput.updatedInput|additionalContext|permissionDecision`. **Exit 0 = don't block; exit 2 = block.** Env: `CORTEX_PROJECT_DIR`, `CORTEX_CODE_REMOTE`, `CORTEX_ENV_FILE`. Remote hook scripts can be sourced from a git repo (`"source": "github:org/hooks-repo/scripts/validate.sh"`). Default timeout 60 s [S8].
- 💡 Enterprise use: PreToolUse hook on `sql_execute` to reject DDL against PROD, log all SQL to a SIEM, or require a ticket ID in the prompt.

### 10.4 MCP (Model Context Protocol) [S9][S8][S42]
- **Transports:** `stdio`, `http` (streamable HTTP), `sse`.
- **Add:** `cortex mcp add <name> <commandOrUrl> [args]` with `-t/--transport`, `-e KEY=val`, `-H "Name: value"`, `--timeout ms`. Examples: `cortex mcp add git-server uvx mcp-server-git`; `cortex mcp add api-server https://api.example.com --type http`.
- **Config:** `~/.snowflake/cortex/mcp.json` → `mcpServers.<name>` with `type`, `command`, `args`, `cwd`, `url`, `env`, `headers`, `timeout` (default 60,000 ms), `oauth`. Env expansion `${VAR}`, `${VAR:-default}`, `$VAR`.
- **OAuth (http):** `client_id` (else Dynamic Client Registration), `client_name`, `redirect_port` (default 8585), `scope`, `authorization_server_url`; browser login on first connect; tokens in OS keychain (`mcp_oauth_<server>`); headless/remote machines supported via pasted redirect URL (1.1.47).
- **Snowflake-aware auth:** HTTP/SSE servers can authenticate with a `snowflake_connection` field in `mcp.json` or `cortex mcp add` (1.1.65) [S7].
- **Secrets:** values from `-e`/`-H` move to the OS keychain on first connection and `mcp.json` is rewritten without them [S9]. (Desktop notes Authorization headers in `mcp.json` can be plaintext on disk — prefer `${input:…}` prompts [S11a].)
- **Tool naming/permissions:** `mcp__<server>__<tool>` (≤64 chars, alnum/underscore/hyphen); allow/deny/ask lists in `permissions.json` (wildcards like `mcp__*`).
- **Precedence (later wins):** admin-enforced → connection-profile → user `mcp.json` (if admin allows) → plugin servers → admin URL allow-list filter [S9].
- **Limits:** result 50 KB (truncated), tool timeout 60 s (`COCO_MCP_TOOL_TIMEOUT_MS`), `cortex mcp start` waits ≤300 s (`--mcp-wait`, `COCO_MCP_WAIT_TIMEOUT_MS`), OAuth port 8585.
- **Admin:** `areUserMcpServersAllowed: false`; URL allow-list; enforced base `mcp.json` [S9][S15].
- Hub page examples of useful MCP integrations: GitHub, Jira, databases [S1]; third-party list adds Google Workspace [B3].

### 10.5 Plugins [S11][S41]
- Layout: `my-plugin/.cortex-plugin/plugin.json` (or `.claude-plugin/`; `.cortex-plugin` wins) + `skills/`, `commands/`, `agents/`, `hooks/hooks.json`, `.mcp.json`, optional `activation.md`.
- Manifest keys: `name` (required, kebab-case), `description`, `version`, `author`, `commands`, `skills`, `agents`, `hooks`, `mcpServers`, `requiresSandbox`.
- Commands: `cortex plugin install <marketplace-name|owner/repo|git-url> [--inactive]`, `uninstall`, `enable`, `disable`, `list`, `validate [target]`, `update [name]`; in-session `/plugin list|info|install|…|reload`. Dev loop: `cortex plugin validate ./my-plugin` → `cortex --plugin-dir ./my-plugin`.
- Discovery order (first wins): `--plugin-dir` → connection profile → `settings.json` `plugins` array → managed registry `~/.snowflake/cortex/plugins/` (`registry.json`) → project `.cortex/plugins/` & `.claude/plugins/` → bundled (active) → bundled external (inactive).
- Trust: hooks from plugins rank below project/local/profile hooks; plugin MCP servers rank below user/profile; **no signature verification or code review is described** [S11][S41].

### 10.6 ACP — Agent Client Protocol (editor integration) [S25]
- Lets editors run CoCo as a local agent subprocess (ndjson over stdio). Supported: **Zed, JetBrains IDEs, Neovim**, other ACP clients. **VS Code → use the Snowflake extension, not ACP.**
- Launch: `cortex acp serve -c <connection> [--bypass] [-m model] [-w workdir] [--plugin-dir …]`.
- Generic client config: `{"command":"cortex","args":["acp","serve","-c","my_connection"]}`. Zed: `agent_servers → "Cortex Code"`; JetBrains: `~/.jetbrains/acp.json` (absolute path to `cortex` required).
- Gotchas: no auth prompts in ACP mode (authenticate first with `cortex auth login`); anything written to stdout by shell init files corrupts the protocol; slash commands aren't first-class; session files in `~/.snowflake/cortex/conversations/`; `bypass` may be blocked by admin policy.
- Clients can inject **client tools** via `_meta.clientTools` (names must not start with `mcp__`).

### 10.7 Agent SDK (Python / TypeScript) [S14] — *Preview*
```bash
curl -LsS https://ai.snowflake.com/static/cc-scripts/install.sh | sh   # CLI is a prerequisite
npm install cortex-code-agent-sdk      # Node.js ≥ 22
pip install cortex-code-agent-sdk      # Python ≥ 3.10
```
- Uses Snowflake CLI connections (`connection` option / `default_connection_name`); set `CORTEX_CODE_CLI_PATH` if the CLI isn't on PATH.
- Built-in tools: Read, Write, Edit, Bash, Glob, Grep, **SQL**. `allowed_tools=["SQL"]` auto-approves SQL.
- Features: multi-turn sessions (`createCortexCodeSession`, `CortexCodeSDKClient`), continue/fork, MCP custom tools, hooks (`PreToolUse`, `PostToolUse`, `Stop`, `UserPromptSubmit`…), structured output (`outputFormat: json_schema`), streaming, system prompts, `maxTurns`, `effort`, `plugins`, `settingSources`, abort controllers.
- Sub-pages: Quickstart (bug-finding agent), *Build a data copilot*, TS/Python references, streaming input/output, MCP custom tools, system prompts, user-input/approvals, structured output, hooks.
- 💡 Integration-architect angle: wrap CoCo inside internal services/CI (e.g., nightly data-contract checks emitting JSON), but governance (service identity, RBAC, approvals) must be designed explicitly.

---

## 11. Automations & Cloud Sandbox

### 11.1 Automations (hosted; CLI + Snowsight) — *public preview* [S10]
- A saved prompt run on a schedule in a **Snowflake-managed sandbox**, as the creating user; each run creates a Cortex thread. Stored as an **`AGENT TASK`** in `USER$.PUBLIC` (internal name prefix `COCO_ROUTINE_`). **No warehouse required**; runs use the user's *default* role and secondary roles (not the role active at creation).
- Create/manage:
```bash
cortex automation create --name pipeline_health \
  --prompt "Summarize failed pipeline runs in the last 24h" \
  --schedule "every 60 minutes"
cortex automation create --name nightly --prompt-file p.md --schedule "daily at 9am" \
  --timezone America/New_York --pre-run-hook "test -s /workspace/input/latest.csv"
cortex automation list | describe <n> | doctor <n> | execute <n> [--wait] | suspend <n> | resume <n> | drop <n>
cortex conversations transcript <thread_id>
```
- Schedules: `every 60 minutes`, `every 4 hours`, `daily`, `daily at 9am`, `every Tuesday at 1:15pm`, multi-weekly; time-of-day schedules need an IANA `--timezone`. Options: `--workspace <stage>`, `--no-workspace`, `--mcp db.schema.name`, `--model`, `--github <secret_fqn>`, `--no-email`, `--dry-run`, run hooks (pre-run timeout default 60 s / max 300; post-run 30 s).
- **Privilege:** `EXECUTE AGENT TASK` (default to PUBLIC): `REVOKE … FROM ROLE PUBLIC; GRANT … TO ROLE automation_user;`.
- **Security model:** caller's rights; RBAC, row-access and masking policies apply; **interactive tool prompts are disabled for unattended runs → least-privilege default role is critical.**
- **Limits:** min frequency hourly; history & threads kept 2 months; fixed time schedules only (no event triggers); no local files or local MCP servers (use mounted stages + attached MCP servers); not in government/FedRAMP/DoD/VPS/China regions. Cost = standard task billing + CoCo tokens per run.
- **Desktop local automations** are a different mechanism (§8.2) [S39].

### 11.2 Cloud sandbox: `cortex --cloud` — *GA* [S22]
- Runs agent tools in a Snowflake-managed container; terminal remains the UI. Mounts a **workspace** at `/workspace` (default `USER$<user>.PUBLIC.DEFAULT$`); only `/workspace` persists; no local files visible.
- Flags: `--cloud [DB.SCHEMA.WORKSPACE]`, `--no-workspace` (ephemeral), `--github DB.SCHEMA.SECRET` (PAT stored as a Snowflake secret and injected server-side only on GitHub requests).
- Egress restricted (Snowflake + package registries by default); others need external access integrations; `ALTER ACCOUNT SET COCO_CLOUD_AGENTS_NON_SNOWFLAKE_EGRESS_DISABLED = TRUE;` blocks all non-Snowflake egress.
- Unsupported with `--cloud`: `--sql-read-only`, RSS, locally-installed skills/plugins; ≤5 images per message; switching workspaces needs `/clear`. Billing not described on that page.

---

## 12. Security, Governance & Admin

### 12.1 The layered control model (what protects what)
| Layer | Control | Where documented |
|---|---|---|
| Identity | Runs as *you* — Snowflake RBAC, row-access & masking policies still apply | [S1][S10] |
| Entitlement | `CORTEX_USER` / `CORTEX_AGENT_USER` / `COPILOT_USER` database roles; model RBAC | [S3][S5] |
| Spend | Daily per-surface limits, budgets, per-user quotas | [S12][S13] |
| Session scope | Restricted Session Scope (read-only / role limits) | [S2][S3][S5] |
| Action approval | Confirm / Plan / Bypass; permission rules; hooks | [S12a][S26] |
| Organization policy | Managed settings file or MDM; admin-enforced MCP; minimum CLI version | [S15][S7] |
| Execution isolation | CLI sandbox (OS/Docker/VM); Desktop terminal sandbox; Cloud sandbox | [S2a][S11a][S22] |
| Audit | `AI_OBSERVABILITY_EVENTS`, usage history views, query tags (`COCO_ADDITIONAL_QUERY_TAGS`) | [S19][S7] |

### 12.2 Managed settings (organization policy) [S15]
File locations — macOS `/Library/Application Support/Cortex/managed-settings.json`; Linux/WSL `/etc/cortex/managed-settings.json`; Windows `%ProgramData%\Cortex\managed-settings.json`. Invalid file ⇒ restrictive fallback ("Enforcement config error - restricted mode"). Verify with `cortex managed-settings`.
```
version: "1.0" (required)
permissions: onlyAllow[], deny[], defaultMode(allow|deny), dangerouslyAllowAll(false)
settings:    forceNoHistoryMode, forceSandboxEnabled, forceSandboxMode(regular|autoAllow)
required:    minimumVersion
defaults:    connectionName, profileName, theme       (suggestions, user may override)
files:       connectionsFile, mcpFile                 (absolute paths)
ui:          showManagedBanner, bannerText, hideDangerousOptions
```
Patterns: `read|write|edit|grep|glob`, `bash`, `bash(git:*)`, `sql_execute`, `mcp(*)`/`mcp(<URL glob>)`, `skill(bundled:*|profile:*|user:*|project:*|remote:*)`, `plugin(*)`, `account(<glob>)` (CLI-enforced). **Evaluation order:** managed deny → profile deny → managed onlyAllow → profile onlyAllow → defaultMode. Profiles can only further restrict. Deploy via Jamf/Intune/SCCM/Ansible/Chef/Puppet; for tamper-resistance of account/auth/version controls, use MDM profile keys ("Enforce CoCo policy with MDM": <https://docs.snowflake.com/user-guide/cortex-code/mdm-policy>) [S15]. CLI 1.1.65 added `cortex managed-settings` plus enforcement of allowed accounts, auth methods and min CLI version; Desktop 1.21.0 added MDM enforcement on macOS [S7][S6].
Desktop vs CLI: `permissions`, `forceNoHistoryMode`, `ui.*` apply to both; sandbox, `minimumVersion`, `files.*`, `defaults.*`, and `account()` enforcement are CLI-only [S15].

### 12.3 Credential & data-handling best practices (CLI doc) [S12a]
- Prefer browser auth (`externalbrowser`); PATs scoped to a role with ≤90-day expiry; `chmod 600` files / `700` dirs; env-var references (`${VAR}`) not literals; never ACCOUNTADMIN for routine work; role-per-environment (`[prod_readonly] role="ANALYST"`).
- Conversation history may contain file contents, tool output and SQL — protect `~/.snowflake/cortex/conversations`; use `--private` for sensitive work; org can force no-history.
- Permission cache TTL env `CORTEX_PERMISSION_CACHE_TTL_SECONDS`; `COCO_DANGEROUS_MODE_REQUIRE_SQL_WRITE_PERMISSION=true` forces SQL-write prompts even in Bypass.
- **If a PAT leaks:** revoke in Snowsight → new token in an env var → review `INFORMATION_SCHEMA.QUERY_HISTORY_BY_USER` / `SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY` (≤45 min latency).
- Desktop: tokens in OS credential store; recommended auth `oauth_authorization_code`; builds notarized (macOS) / DigiCert-signed (Windows); auto-update verifies signatures; prompt-injection defenses include server-side I/O guardrails, Cortex AI Guardrails, approval gates, no auto-exec of MCP/skills/hooks on workspace open; **known limitation: fetched web content enters the main context** [S11a].

### 12.4 Security incident to know (use it in risk reviews) [B6]
PromptArmor showed a poisoned README in an untrusted repo could make the CLI run a script **outside the sandbox without approval** (cached Snowflake credentials used to exfiltrate/drop tables in the demo). Causes: unvalidated commands inside process substitution `<()`; a model-settable `dangerously_disable_sandbox` flag; context loss across nested subagents. Timeline: disclosed Feb 5 → validated Feb 12 → **fixed in CLI 1.0.25 on Feb 28** → public Mar 16, 2026; success rate ~50% (non-deterministic). Lessons: untrusted content is an attack vector; approval/sandbox rely on perfect parsing; agents shouldn't control their own sandbox flags; workspace trust matters; scope credentials. (A search result also lists a Tenable CVE entry "CVE-2026-6442"; I did **not** verify it refers to this issue.) Subsequent 1.1.87 fixed a Windows untrusted-directory binary-hijack issue [S7].

### 12.5 Admin checklist (💡 consolidated from the above)
- [ ] Decide who gets `CORTEX_AGENT_USER` vs `CORTEX_USER`; revoke `CORTEX_USER` from PUBLIC if needed (side-effects on AI functions!) [S5]
- [ ] Set default daily limits per surface; override for power users; set 0 for blocked [S13]
- [ ] Budgets (tag users) + per-user quotas for enforcement [S12]
- [ ] Enable cross-region inference deliberately (data residency review) [S1]
- [ ] Publish `managed-settings.json` via MDM: disable bypass, set min version, restrict accounts & MCP URLs, hide dangerous options [S15]
- [ ] Define RSS patterns (e.g., `READONLY_PM`) for analysts [S2]
- [ ] Decide on `EXECUTE AGENT TASK` and automations policy [S10]
- [ ] Grant observability roles to audit team; build usage dashboards [S19]
- [ ] Governance for the Skill Catalog: who certifies; remember no security scanning [S23]
- [ ] Confirm sovereign/gov restrictions per feature [S1][S10][S22]

---

## 13. Cost, Billing & Observability

### 13.1 Billing facts
- **CLI & Desktop:** individuals → 30-day free trial with fixed allowance, then paid subscription (access blocked once monthly allowance exceeded); existing Snowflake customers (on-demand or capacity) → **pay-as-you-go per token**. **Snowsight:** per token for existing accounts. Warehouse/storage billed separately at standard rates [S1].
- Snowflake AI pricing page: CoCo is billed in **AI Credits**; AI Credit = **$2.00 (global routing) / $2.20 (regional routing)**; "no per-seat fees"; capacity discounts don't apply to AI Credits; per-model token rates are in Table 6 of the Service Consumption Table (PDF — **not read** by me) [S43][S1].
- 🟡 Kanerika: repeated context is cached from second turn; CoCo also incurs Cloud Services compute for metadata queries; fewer, longer, focused sessions are cheaper than many short ones [B4]. Atlan/DigitalApplied give no pricing [B1][B2]. 
- Automations: standard task billing + tokens per run [S10].

### 13.2 Three native cost controls [S12][S13]
| Control | Purpose | Enforcement |
|---|---|---|
| **Budgets** (tag users, add CoCo as shared resource) | Team/cost-center tracking, notifications, custom actions on thresholds | Periodic evaluation, not immediate |
| **Per-user quotas** | Monthly/weekly/daily per-user limits across CLI/Desktop/Snowsight (+ other AI features) | Auto-block or run custom stored procedure; lifts on reset/raise |
| **Daily credit usage limits** | Rolling-24h cap **per surface** | Hard block with "Daily credit usage limit reached" |
```sql
-- defaults: -1 = unlimited, 0 = blocked, N = block when est. usage in past 24h > N
ALTER ACCOUNT SET CORTEX_CODE_CLI_DAILY_EST_CREDIT_LIMIT_PER_USER = 20;
ALTER USER power_user SET CORTEX_CODE_CLI_DAILY_EST_CREDIT_LIMIT_PER_USER = 50;
ALTER ACCOUNT SET CORTEX_CODE_DESKTOP_DAILY_EST_CREDIT_LIMIT_PER_USER = 0;       -- block all …
ALTER USER   allowed_user SET CORTEX_CODE_DESKTOP_DAILY_EST_CREDIT_LIMIT_PER_USER = 20; -- … except one
ALTER USER restricted_user SET CORTEX_CODE_SNOWSIGHT_DAILY_EST_CREDIT_LIMIT_PER_USER = 0;
ALTER USER power_user UNSET CORTEX_CODE_CLI_DAILY_EST_CREDIT_LIMIT_PER_USER;     -- back to account value
```
(Syntax pattern and values from [S13]; user names are illustrative.) Requires ACCOUNTADMIN or sufficient privileges. Gaps in docs: how "estimated credit usage" is computed, how quickly changes apply, whether active sessions are interrupted [S13].

### 13.3 Observability [S19]
| Object | Purpose |
|---|---|
| `SNOWFLAKE.LOCAL.AI_OBSERVABILITY_EVENTS` | OpenTelemetry-style spans; each user prompt = one turn/trace; `CodingAgentRun` (turn) and `CodingAgent.Step-0` (model call: prompt, response, tokens, tools, latency, `request_id`) |
| `SNOWFLAKE.ACCOUNT_USAGE.SNOWFLAKE_COCO_USAGE_HISTORY` | Credits & tokens, all surfaces (`INTERFACE` = snowsight/desktop/cli; join on `REQUEST_ID`) |
| `…CORTEX_CODE_SNOWSIGHT_USAGE_HISTORY` / `…CORTEX_CODE_DESKTOP_USAGE_HISTORY` / `…CORTEX_CODE_CLI_USAGE_HISTORY` | Per-surface usage |
```sql
-- Credits per turn (verbatim pattern from docs)
SELECT obs.TRACE['trace_id']::STRING AS trace_id,
       obs.RESOURCE_ATTRIBUTES['snow.user.name']::STRING AS user_name,
       COUNT(*) AS step_count, SUM(usage.TOKEN_CREDITS) AS total_credits
FROM SNOWFLAKE.LOCAL.AI_OBSERVABILITY_EVENTS obs
JOIN SNOWFLAKE.ACCOUNT_USAGE.SNOWFLAKE_COCO_USAGE_HISTORY usage
  ON obs.RECORD_ATTRIBUTES['snow.ai.observability.agent.planning.request_id']::STRING = usage.REQUEST_ID
WHERE obs.RECORD_TYPE = 'SPAN' AND obs.RECORD:name::STRING = 'CodingAgent.Step-0'
GROUP BY 1, 2 ORDER BY total_credits DESC;
```
Grants: `GRANT APPLICATION ROLE SNOWFLAKE.AI_OBSERVABILITY_READER TO ROLE <r>;` and `GRANT IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE TO ROLE <r>;`. **Use the usage views — not the event table — as the source of truth for credits/tokens** (trace delivery is best-effort). Retention period not stated in the page. Desktop redacts event content by default and needs an explicit grant to view [S11a]. Product feedback (thumbs) is not stored in your account [S19]. The Medium article's `CORTEX_AGENT_USAGE_HISTORY` view reference is from the early preview — prefer the CoCo views above [B5][S19].


---

## 14. Role Playbooks

> 💡 Everything in this section is **my synthesis** applying the documented features to your three roles. Feature facts carry citations; workflow suggestions do not. Validate in a sandbox account first.

### 14.1 Data Analyst

**Where you'll live:** Snowsight panel (zero install) → Desktop for charting/notebooks/apps.

| Task | How CoCo helps | Surface | Docs hook |
|---|---|---|---|
| Find the right table | Plain-language schema search; `@` attach; tags/lineage in answers | Snowsight | [S3] |
| Write/explain/optimize SQL | Generate, refine, explain, Quick Edit/Format; **Fix** on errors; inline suggestions (Tab) | Snowsight, Desktop SQL Playground | [S3][S35] |
| Profile & EDA | Notebook cells generated and run; DataFrame inspection | Snowsight Workspaces notebooks; Desktop agentic notebook | [S3][S38] |
| Charts | "Visualize Data" → line/bar/area/scatter/pie/metric cards (≤500 rows) | Desktop only | [S34] |
| Business Q&A on governed metrics | Use a Cortex Analyst **semantic model** (YAML or semantic view): "Use @models/revenue.yaml to answer…"; `$semantic-view` skill to create/audit/debug | CLI/Desktop/Snowsight | [S2][S3][B7] |
| Lightweight apps | Streamlit dashboard from a prompt, deploy with `snow streamlit deploy` | Desktop / CLI | [S33][S2] |
| Cost awareness | Ask for top credit-consuming services with a visualization | Snowsight | [S3] |
| Safety | Run in RSS **read-only** while exploring production | all | [S2][S3][S5] |

**Analyst good habits (💡):**
1. Always use fully qualified names `DB.SCHEMA.TABLE` (also advised by [B5]).
2. Ask CoCo to **show the SQL and assumptions** (grain, filters, time zone) with every answer — the quickstart's agent pattern does exactly this [B7].
3. Review diffs before accepting; verify row counts independently (reconcile against a known report).
4. Use read-only RSS for exploration of PHI-bearing schemas; request masking-policy-aware queries (CoCo inherits masking/row policies [S10]).
5. Keep a personal skill for your recurring report pattern (e.g., monthly claims summary) — personal Snowsight skills live in `.snowflake/cortex/skills` of the workspace [S3].
6. Treat charts as exploratory; formal dashboards live elsewhere (BI/Streamlit) [S34].

**Starter prompts**
```text
What databases and schemas can I read that contain claims or member data?
Describe tables in ANALYTICS.CLAIMS_MART in one line each; which have PII tags or masking policies?
Write a query: monthly paid amount and claim count by line of business for the last 12 months; show assumptions.
Explain this query line by line and propose a faster version; show the EXPLAIN-based reasoning.
Profile column null rates, distinct counts and outliers for @CLAIMS_FACT; list data-quality issues.
Chart the result as a line chart with 3-month moving average.
```

### 14.2 System Analyst

**Where you'll live:** CLI/Desktop with local repos + Snowflake metadata; instruction files; skills for repeatable analysis.

| Task | How CoCo helps | Docs hook |
|---|---|---|
| Current-state discovery | `data-discovery` subagent explores databases/schemas/tables; `cortex search object --types` (streams, stages, tasks, pipes); `/lineage` | [S7][S2a] |
| Impact analysis | Lineage: "Show lineage from RAW_DB.ORDERS to downstream dashboards"; dbt lineage view with "Add to Chat" | [S2][S36] |
| Data dictionary / documentation | Generate docs, dbt docs, markdown artifacts saved in the repo (quickstart pattern: "keep the result in the project") | [B7][S3] |
| Requirements → design | The quickstart's **PRD-to-Silver skill** pattern: read requirement CSV/XLSX, produce mapping summary, open questions, assumptions, DDL delta plan, validation queries | [B7] |
| Source-to-target mapping | Compare schemas (e.g., SAP vs Oracle AP invoices) → equivalent fields, type normalization, open questions | [B7] |
| Standards enforcement | `AGENTS.md` conventions, hooks that block non-compliant SQL, custom subagents (reviewer) | [S28][S8] |
| Test & validation | dbt tests, proof queries saved to files | [S3][B7] |
| Change handoff | Ask for a markdown handoff list: artifacts, how to rerun checks | [B7] |

**Documented worked example you should replicate (Snowflake quickstart, "CoCo Foundations") [B7]:** 3 demos on an Accounts-Payable invoice pipeline — (1) discover & compare bronze tables, plan-mode → create `SILVER_AP_INVOICES` Dynamic Table, use `$dynamic-tables` skill for runbook (TARGET_LAG, refresh history); (2) ingest a business-requirements CSV set, scaffold a custom `prd-to-silver` skill, produce a change plan + updated SQL + handoff notes; (3) build a semantic view `SV_AP_ANALYTICS` and a Cortex Agent `AP_ANALYTICS_ASSISTANT` and audit them. Lab scripts: `00_snowday_setup.sql`, `00_sample_data.sql`, `01_demo_reset.sql` (in the Snowflake-Labs `sfquickstarts` repo path referenced by the guide).

**System-analyst `AGENTS.md` starter (💡):**
```markdown
# Project conventions
- All SQL uses fully-qualified names; no SELECT *; Snowflake dialect.
- Every change ships with: (1) DDL/DML, (2) validation queries, (3) rollback note, (4) assumptions/open questions.
- Never run write SQL against PROD_* databases; propose scripts instead.
- Document source-to-target mappings in docs/mappings/<system>.md using the table template.
- PHI: never print raw identifiers in chat output; sample with masking roles only.
```

### 14.3 Integration Architect

**Your lens:** CoCo is both (a) a *consumer* of integrations (MCP, plugins, skills, SDK, stages, secrets) and (b) a *platform component* with identity, network, audit and cost properties to design around.

#### 14.3.1 Integration surface map
| Mechanism | Direction | Typical enterprise use | Controls | Maturity per docs |
|---|---|---|---|---|
| **MCP servers** (stdio/http/sse, OAuth, `snowflake_connection` auth) | CoCo → external tools | Jira/GitHub/Confluence/ticketing/CMDB, internal APIs | `mcp.json` precedence, admin URL allow-list, `areUserMcpServersAllowed`, `permissions.json` | Preview (hub) [S1][S9] |
| **Skills / Skill Catalog / stages / Git** | Org knowledge → CoCo | Standards, runbooks, mapping templates, interface specs | Catalog certification, stage `READ/WRITE`, managed `skill(...)` patterns | Catalog rolling out; no scanning [S23][S24] |
| **Plugins** | Bundle distribution | Team baseline (skills+hooks+MCP), profile-shipped | `plugin(...)` patterns, discovery order, trust boundaries | Preview [S1][S11] |
| **Hooks** | Policy/audit injection | Block risky SQL, log to SIEM, enrich prompts | Priority order across scopes | Documented [S8] |
| **Agent SDK** (Py/TS) | Your code → CoCo | CI bots, internal copilots, scheduled analyses | `allowedTools`, `settingSources`, connection | Preview [S14] |
| **ACP** | Editor → CoCo | Zed/JetBrains/Neovim teams | Connection fixed at launch; bypass policy | Preview [S25] |
| **CLI `exec`** | Pipeline → CoCo | CI/CD steps, headless jobs | `--allowed-tools`, `--sql-read-only`, exit codes, `--private` | GA [S2a] |
| **Automations (hosted)** | Scheduler → CoCo | Daily checks/digests inside Snowflake | `EXECUTE AGENT TASK`, default-role least privilege, stages/MCP attached | Public preview [S10] |
| **Cloud sandbox** | Terminal → managed container | Long builds, dbt runs without local laptop | Egress controls, secrets for GitHub | GA [S22] |
| **Snowflake-managed app deploy** | CoCo → Snowflake apps | Streamlit / App Runtime with Caller's vs Owner's Rights | RBAC on app role | Documented [S33] |
| **dbt (local / Snowflake-managed)** | CoCo ↔ dbt | Pipeline code | EAI for `deps`; personal DB required for managed mode | Documented [S36] |

#### 14.3.2 Identity, network & trust-boundary checklist (💡 questions to take to your security architects)
1. **Identity:** Which authenticator for each use? Docs recommend OAuth/SSO for humans, key-pair (`snowflake_jwt`) for automation, PATs scoped & ≤90 days [S5a][S12a]. Who owns service identities used by SDK/CI?
2. **Least privilege:** Role-per-environment connection profiles; read-only RSS for analysts; separate roles for automations (they use the *default role + default secondary roles* [S10]).
3. **Data residency:** Cross-region inference is mandatory for many features [S1] — what does your data classification/PHI policy say about inference location? (Docs here don't discuss HIPAA/BAA — confirm with Snowflake and Compliance.)
4. **Egress:** Cloud sandbox default egress list and the account parameter to block non-Snowflake egress [S22]; Desktop per-URL approvals + allow-list [S26][S11a]; MCP URL allow-lists [S9].
5. **Supply chain:** Skills/plugins/MCP are not signed [S41][S11a]; pin Git refs/stage paths; certify in Catalog; consider managed `skill(remote:*)` blocking [S15].
6. **Prompt-injection posture:** Treat repo files, web pages, tool output as untrusted; require workspace trust; keep approval gates on; use sandbox/containers for CLI in regulated settings (Kanerika suggests Docker + explicit egress) [B4][B6][S11a].
7. **Audit & forensics:** Event table + usage views + query tags; conversation files on disk (`~/.snowflake/cortex/conversations`) contain data — endpoint DLP/retention policy needed [S11a][S19][S7].
8. **Cost governance:** Budgets + quotas + per-surface daily limits; attribution via user tags [S12][S13].
9. **Change control:** Pin/minimum CLI version through managed settings; auto-update posture (`autoUpdate:false` available, but outdated Desktop builds are force-updated) [S15][S2a][S5a].
10. **Availability:** Features unavailable in gov/FedRAMP/DoD/VPS/China for automations & cloud sandbox [S10][S22].

#### 14.3.3 Reference patterns (💡 design suggestions)
- **Pattern A — "Governed analyst copilot":** Snowsight CoCo for analysts; roles = `COPILOT_USER` + `CORTEX_AGENT_USER`; RSS read-only default; daily limit e.g. 10 credits; observability dashboard for FinOps.
- **Pattern B — "Engineer workstation baseline":** Desktop/CLI with MDM-pushed `managed-settings.json` (no bypass, min version, `account(...)` allow-list, MCP URL allow-list, `forceNoHistoryMode` if data-sensitive), shared plugin via profile (skills + hooks + approved MCP), Skill Catalog for standards.
- **Pattern C — "Unattended jobs":** Hosted Automations for in-Snowflake checks (hourly+); `cortex exec --cloud … --allowed "Read"` for CI-triggered tasks; dedicated low-privilege automation user with its own default role; post-run hooks to notify; remember **no event triggers** and 2-month history.
- **Pattern D — "Tooling integration hub":** MCP servers for ITSM/CMDB/API-catalog; OAuth; admin allow-list; secrets via keychain/`${input:}`; evaluate Snowflake-hosted vs self-hosted MCP.
- **Pattern E — "Embed in internal platform":** Agent SDK behind an internal service (structured JSON output, `maxTurns`, `allowedTools`), per-request connection scoped to the end user's role (design identity propagation carefully).

#### 14.3.4 Decision matrix: when to choose which surface (💡)
| Need | Choose |
|---|---|
| No install, governed access for many analysts | Snowsight |
| Local repo + visual iteration + apps/charts | Desktop |
| Scripting, CI, headless, SSH servers, strict reproducibility | CLI |
| Long-running without laptop | Cloud sandbox / hosted automation |
| Non-Snowflake editor (JetBrains/Zed/Neovim) | ACP |
| VS Code | Snowflake extension (per ACP doc) |
| Build your own agent product | Agent SDK + Cortex Agents |

#### 14.3.5 ADR prompts for your architecture board (💡)
- Decision: *Approved surfaces and versions*; *model policy (Auto vs pinned)*; *Bypass prohibited?*; *MCP allow-list*; *Skill Catalog governance*; *automation policy*; *telemetry retention*; *cost ceiling model*; *incident response for prompt-injection*.
- Evidence to gather: pilot results on **your own repos** (all third-party sources urge this rather than trusting the 72.1% headline [B2][B3][B4]).

---

## 15. Hands-on Learning Path & Labs

### Week 1 — Foundations (Snowsight + CLI)
1. Admin/you: confirm roles + cross-region + model list (`SHOW CORTEX BASE MODELS IN SCHEMA SNOWFLAKE.MODELS`).
2. Snowsight: 10 discovery prompts; practice `@`, Quick Edit, Fix, diff view.
3. Install CLI; make connection; run `cortex -c <conn>`; ask "What can I do with Cortex Code?"; try `/sql`, `/status`, `/model`, `/plan`.
4. Do **Demo 1** of the *CoCo Foundations* quickstart [B7].
5. Write your own `AGENTS.md` (§14.2).

### Week 2 — Governance & cost
1. Create an RSS (`/guardrails`) and test that writes are blocked.
2. Practice the three modes; observe SQL READ_ONLY/WRITE prompts.
3. As admin (sandbox account): set per-surface daily limits; run the audit script idea; query `SNOWFLAKE_COCO_USAGE_HISTORY` joined to events (§13.3).
4. Try `managed-settings.json` locally and run `cortex managed-settings` to see validation output.

### Week 3 — Extensibility
1. Build a project skill (`.cortex/skills/<name>/SKILL.md`), then publish it to a stage and add it from the stage in a second session.
2. Add an MCP server (git or an internal HTTP API with OAuth) and set `permissions.json` allow/deny.
3. Write a PreToolUse hook that blocks `DROP`/`TRUNCATE` in `sql_execute`.
4. Package skill+hook+MCP as a plugin; `cortex plugin validate` → `--plugin-dir`.

### Week 4 — Unattended & integration
1. Create a hosted automation (hourly pipeline-health summary) with `--dry-run` first; inspect with `doctor`; read the thread transcript.
2. `cortex --cloud` session on a dbt repo with `--github` secret; test egress block parameter.
3. Python Agent SDK quickstart: profile a table with `allowed_tools=["SQL"]` and structured output.
4. Desktop: build a Streamlit app from a semantic view, deploy, share to a role.
5. Produce a 1-page ADR using §14.3.5.

### Self-check questions
1. Which two database roles gate CoCo and which is least-privilege? 2. Why can a user have a role yet still be blocked? 3. What can RSS never do after activation? 4. Where do managed settings live on macOS/Windows/Linux? 5. Which events can hooks block and what exit code blocks? 6. How are Desktop and CLI SQL tool names different? 7. What stays persisted in a cloud sandbox? 8. What are the minimum frequency and retention for hosted automations? 9. Which source of truth do you use for credits? 10. Name three prompt-injection mitigations.

<details><summary>Answers</summary>

1. `CORTEX_USER` / `CORTEX_AGENT_USER` (agent-user is least-privilege; Snowsight additionally needs `COPILOT_USER`). 2. Daily limit `0` (or exhausted) — access needs role **and** non-zero limit. 3. Be removed or relaxed (can only switch to another RSS; start a new session). 4. `/Library/Application Support/Cortex/…`, `%ProgramData%\Cortex\…`, `/etc/cortex/…`. 5. PreToolUse, PermissionRequest; exit code 2 (or JSON decision block). 6. CLI `sql_execute`, Desktop `snowflake_sql_execute`. 7. Only `/workspace`. 8. Hourly; 2 months. 9. Account Usage views (`SNOWFLAKE_COCO_USAGE_HISTORY`), not the event table. 10. Workspace trust/approval gates, sandbox, guardrails, no auto-exec of MCP/skills/hooks, least-privilege roles, RSS.
</details>

---

## 16. Prompt Library (💡 patterned on documented examples)

**Discovery & governance**
- "What databases do I have access to?" · "List every table tagged PII = TRUE in ANALYTICS_DB" · "Which roles can read SCHEMA X and who owns it?" [S2][S3]
**SQL**
- "Write a query for top 10 customers by revenue; add a 7-day moving average and show results." · "Explain why this query is slow and optimize it." · "Generate synthetic data for table T (500 rows) respecting constraints." [S2][S3]
**Pipelines / dbt**
- "Create a dbt project to transform raw sales data." · "Add incremental logic and data-quality tests to model M." · "Compare BRONZE_A and BRONZE_B; list equivalent fields, type normalization needs, open questions." [S2][S3][B7]
**Plan-first (Ctrl+P / Shift+Tab)**
- "Plan a Dynamic Table named SILVER_X combining A and B; wait for my approval." [B7]
**Semantic layer / agents**
- "Audit semantic view SV_X against best practices." · "Create a Cortex Agent over SV_X that always returns (1) answer, (2) SQL used, (3) assumptions; ask a clarifying question when grain is ambiguous." [B7]
**Admin / FinOps (Snowsight)**
- "Top credit-consuming service types last 30 days with a chart." · "Which warehouses/queries are most expensive?" [S3]
**Unattended (automation prompt)**
- "Summarize pipeline failures from the last 24 hours; list top 5 by impact; propose fixes; do not modify objects." (read-only wording is 💡 — pair with least-privilege role since prompts are disabled unattended [S10])


---

## 17. Market View, Limitations, Open Questions, Troubleshooting, Glossary

### 17.1 How third parties position CoCo (read critically)
| Claim | Source | Reliability note |
|---|---|---|
| 72.1% pass rate on dbt Labs' **ADE-Bench** vs 65.1% for Claude Code and OpenAI Codex; 51% fewer tokens, 8% faster (vs Claude Code on Opus 4.7) | Snowflake blog [S16], repeated by [B1][B2][B3][B4] | **Vendor-run, not independently replicated** (as of Jun 7, 2026 per [B2]); measures analytics-engineering tasks only [B3] |
| >7,100 customer accounts (~50% of customers) ~4 months after launch | [S16][B1][B2] | Vendor-stated |
| "3x–4x better accuracy with Cortex Sense context" | [B2] | Methodology unpublished; Cortex Sense is private preview [B1] |
| "3x SQL accuracy" | [B1] | Atlan's own study of Atlan-enriched vs schema-only context — not CoCo vs competitors |
| Custom perf skill cut a dbt model from ~10 h to <2 h | [B4] | Anecdote |

**Comparisons**
- *Claude Code / Cursor / Copilot:* CoCo = native warehouse context + RBAC + Snowflake operators; others = broader ecosystems, polyglot, repo-centric; the trade-off is **governance vs portability** [B2][B3]. Kanerika: pair CoCo with a general-purpose agent [B4]. Note that CoCo reuses many Claude-Code conventions (SKILL.md, `.claude/` dirs, `CLAUDE.md`, `/import-claude-config`) so skills can be shared across tools [S7][S8][S28].
- *Databricks Genie Code (Atrium, a Snowflake partner):* CoCo = SQL-first, Snowflake RBAC, AI Credits; Genie = notebooks/Spark/Python, Unity Catalog ABAC, DBUs; author favored CoCo for consistency in tests but advises validating in your own environment [B8].
- *dbt:* complementary — CoCo generates/tests/deploys dbt models [B1].

### 17.2 Limitations & caveats (consolidated)
- **Snowflake perimeter:** no native business glossary, cross-system lineage (Fivetran/Tableau/Airflow), or non-Snowflake ownership data [B1][B2].
- **Preview/maturity:** MCP, ACP, Plugins, Agent SDK marked Preview on hub [S1]; automations public preview [S10]; Skill Catalog rolling out [S24]; sandbox features "experimental" [S15][S11a]; command risk classification "experimental" [S12a].
- **Availability gaps:** Desktop/CLI not for Gov/VPS-sovereign accounts [S1]; automations & cloud sandbox not in gov/FedRAMP/DoD/VPS/China [S10][S22]; trial accounts limited [S2][S3].
- **Desktop charts** are exploratory, ≤500 rows, Desktop-only [S34]. **Desktop dbt-managed mode** needs personal databases [S36]. **tgrep** not on remote workspaces [S31].
- **Cost:** pricing at scale unclear in third-party analyses [B3]; docs leave "estimated credit usage" undefined [S13]; Table 6 of the Consumption Table not reviewed here.
- **Security:** Nondeterministic LLM + shell + SQL = treat like a privileged service account [B2]; supply-chain items unsigned [S41]; Desktop notes web-fetch content enters main context [S11a].
- **Doc drift:** some pages differ (e.g., Medium's `snow cortex-code`/`pip install snowflake-cli` flow [B5] vs the `cortex` installer in current docs [S2]; launch date Nov 2025 vs Feb 2026 [B1][B2][B6]).

### 17.3 Things I could not verify (research gaps)
- **YouTube videos:** the fetch tool was rate-limited (HTTP 429), so I could **not** read video pages, transcripts, durations or dates. Videos below are listed from search results only (V1–V10).
- Not read: Snowflake Service Consumption Table PDF (CoCo token rates), `cross-region-inference`, `mdm-policy`, `restricted-session-scope`, the Desktop `hooks`, `personalization`, `navigation`, `agent-view-and-editor-view`, `managed-settings` (Desktop) pages, Agent SDK sub-pages, the Desktop "Usage history" SQL reference, `llms.txt` (blocked from the shell), and Snowflake webinars/Udemy course.
- Healthcare/HIPAA suitability, data-residency specifics and BAA coverage for CoCo: **not addressed in any source I read** → raise with Snowflake account team and Compliance.
- Exact retention of `AI_OBSERVABILITY_EVENTS` (not stated in [S19]).

### 17.4 Troubleshooting quick table
| Symptom | Likely cause / fix | Source |
|---|---|---|
| CLI install script fails | Re-run with `curl -q…` (ignore `~/.curlrc`) | [S2][S2a] |
| `cortex: command not found` | Add `~/.local/bin` to PATH; `chmod +x ~/.local/bin/cortex` | [S2a] |
| Connection errors | Check `~/.snowflake/connections.toml`; `cortex -c <name>` | [S2a] |
| "Daily credit usage limit reached" | Parameter ≥ usage or 0; admin adjusts/UNSETs | [S13] |
| Snowsight CoCo missing | Missing `COPILOT_USER`/Cortex role, limit =0, Copilot opted out, trial w/o card | [S3] |
| Permission error in Snowsight | Default role lacks privileges → `ALTER USER … SET DEFAULT_ROLE` or ask CoCo to switch roles | [S3] |
| Model not in region | ACCOUNTADMIN enables cross-region inference | [S5] |
| Skill not activating | Specific wording, name it, `/skill list`; exact `SKILL.md` name | [S8][S40] |
| Subagent has no tools | Capitalized tool names (`Bash`) — use lowercase | [S8] |
| MCP not connecting | `/mcp`, `cortex mcp start <s>`, check env vars, logs in `~/.snowflake/cortex/logs/` | [S9] |
| MCP OAuth fails | `cortex mcp remove` + re-add; free port 8585 | [S9] |
| ACP agent exits / garbled output | Run `cortex acp serve -c <conn>` in terminal; remove stdout writes from shell init | [S25] |
| Hosted automation "succeeded" but did nothing | Inspect thread tool calls; hooks can fail silently | [S10] |
| Desktop sign-in browser doesn't open | Use "Browser didn't open?" link; set default browser | [S5a] |
| Python interpreter invalid (Desktop) | Set `python.languageServer` to Jedi; reload window | [S21] |
| Managed settings "restricted mode" banner | JSON invalid → fix; verify with `cortex managed-settings` | [S15] |

### 17.5 Version timeline (selected, for "what changed when")
**CLI (changelog [S7]):** 1.0.6 (Feb 4 '26) `cortex secret`, worktrees → 1.0.7 (Feb 6) session search, `/docs` → 1.0.9 (Feb 9) instruction settings, `/fork`/`/rewind` → 1.0.10 (Feb 11) Airflow plugin → 1.0.11 (Feb 12) versioned skills, GitHub plugins → 1.0.17 (Feb 19) Windows, permission rules → 1.0.28 (Mar 2) `cortex browser`, swarms → 1.0.59 `cortex acp serve`, Postgres → 1.0.65 plugin registry → 1.0.77 `--sql-read-only`, `.agents/skills`, GPT 5.5 → 1.1.8 `cortex exec`, workspaces, RSS SQL guardrails → 1.1.27 named RSS, FIPS 140 → 1.1.41 Team mode → 1.1.47 MCP OAuth headless, `/monitors` → 1.1.52 subagent `model: inherit` → 1.1.53 `--private`, Claude config reuse → 1.1.65 (Aug 11) `data-discovery` subagent, `managed-settings`, `snowflake_connection` MCP auth → 1.1.78 (Sep 7) skill catalog default, `/restart` → 1.1.87 (Sep 14) conversation recall, `/stats`, `--mcp-wait`, RSS default-on.
**Desktop ([S6]):** 1.14.0 plugins/App Gallery (May) → 1.15 Remote-SSH, dbt Cloud mode, hierarchical SQL permissions, Mermaid → 1.16 Personalization, Memory, Brave web search → 1.17 Plugins Catalog, Plan Mode refresh → 1.18 semantic search, `/compact` → 1.19 token efficiency, WSL → 1.20 deep-link sharing of skills/plugins → 1.21.0 MDM, 1.21.1 monthly automations/HTML report publishing, 1.21.2 four chart types/local-or-cloud automations → 1.21.3 isolated SQL sessions → 1.21.6 (Sep) grouped model picker with thinking-effort.

### 17.6 Glossary
- **CoCo / Cortex Code** — Snowflake's AI coding & data agent. **Agent mode / Plan mode / Bypass** — action vs read-only planning vs no-prompt execution. **RSS** — Restricted Session Scope. **RBAC** — role-based access control. **Cross-region inference** — routing AI requests to regions hosting models. **AI Credit** — billing unit for AI features. **MCP** — Model Context Protocol (tools/data for agents). **ACP** — Agent Client Protocol (editor ↔ agent). **Skill** — packaged instructions (`SKILL.md`). **Subagent** — delegated specialist agent. **Hook** — lifecycle script that can allow/block/modify. **Plugin** — bundle of skills/agents/commands/hooks/MCP. **Profile** — shared baseline config. **Cortex Extension** — Snowflake object type storing shared skills/plugins. **Horizon Catalog** — Snowflake governance catalog (skills & plugins governance UI). **Cortex Analyst / Semantic view** — NL-to-SQL service and its governed metric/dimension definitions. **Cortex Agent** — Snowflake-hosted agent object. **Dynamic Table** — declarative, auto-refreshing table with `TARGET_LAG`. **Workspace** — Snowsight file/notebook workspace; also the Cloud sandbox filesystem. **AGENT TASK** — task object backing hosted automations. **EAI** — external access integration. **ADE-Bench** — dbt Labs analytics-data-engineering benchmark. **CoWork** — separate Snowflake NL-analysis product/UI (distinct from CoCo) [S3].

### 17.7 Official documentation map (bookmark these)
- Hub <https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code> · CLI <…/cortex-code-cli> · CLI reference <…/cli-reference> · Desktop <…/cortex-code-desktop> (+ sub-pages) · Snowsight <…/cortex-code-snowsight> · Automations <…/cortex-code-automations> · Changelog <…/changelog> · Observability <…/observability> · Cost controls <…/cost-controls> · Credit limits <…/credit-usage-limit> · Managed settings <…/managed-settings> · Security <…/security> · Cloud sandbox <…/cloud-sandbox> · Model settings <…/configure-model-settings> · MCP <…/cortex-code-mcp> · ACP <…/cortex-code-acp> · Plugins <…/cortex-code-plugins> · Share skills/plugins <…/cortex-code-skill-plugin-sharing> · Agent SDK <https://docs.snowflake.com/user-guide/cortex-code-agent-sdk/cortex-code-agent-sdk> · Restricted Session Scope <https://docs.snowflake.com/user-guide/restricted-session-scope>

---

## 18. Bibliography

> Access date for all items: **2026-10-09**. "Read" = page content retrieved and used. "Title only" = appeared in search results; content **not** reviewed. Third-party items are labeled with their commercial relationship where known.

### 18.1 Official Snowflake documentation (read)
| ID | Title / topic | URL |
|---|---|---|
| S1 | Overview of Snowflake CoCo (hub) | <https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code> |
| S2 | CoCo CLI (install, connection, usage, RSS, prerequisites, models) | <https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code-cli> |
| S2a | CoCo CLI reference (options, slash commands, shortcuts, files, sandbox) | <https://docs.snowflake.com/user-guide/cortex-code/cli-reference> |
| S3 | CoCo in Snowsight | <https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code-snowsight> |
| S5 | CoCo Desktop (hub page) | <https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code-desktop> |
| S5a | Desktop: Installation, onboarding & authentication | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/onboarding-and-authentication> |
| S6 | Desktop release notes | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/release-notes> |
| S7 | CoCo (CLI) changelog | <https://docs.snowflake.com/user-guide/cortex-code/changelog> |
| S8 | CLI extensibility (skills, subagents, hooks, MCP, profiles) | <https://docs.snowflake.com/en/user-guide/cortex-code/extensibility> |
| S9 | CLI MCP support | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-mcp> |
| S10 | Automations in CLI and Snowsight | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-automations> |
| S11 | CLI plugins | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-plugins> |
| S11a | Desktop security | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/security> |
| S12 | Cost controls for CoCo | <https://docs.snowflake.com/user-guide/cortex-code/cost-controls> |
| S12a | Security best practices for CLI | <https://docs.snowflake.com/user-guide/cortex-code/security> |
| S13 | Daily credit usage limits | <https://docs.snowflake.com/user-guide/cortex-code/credit-usage-limit> |
| S14 | CoCo Agent SDK | <https://docs.snowflake.com/user-guide/cortex-code-agent-sdk/cortex-code-agent-sdk> |
| S15 | Managed settings (organization policy) | <https://docs.snowflake.com/en/user-guide/cortex-code/managed-settings> |
| S19 | Observability | <https://docs.snowflake.com/user-guide/cortex-code/observability> |
| S20 | Configuring default model settings | <https://docs.snowflake.com/user-guide/cortex-code/configure-model-settings> |
| S21 | Desktop FAQ | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/faq> |
| S22 | CLI cloud sandbox | <https://docs.snowflake.com/user-guide/cortex-code/cloud-sandbox> |
| S23 | Share skills and plugins | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-skill-plugin-sharing> |
| S24 | Snowsight: Skills and plugins | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-snowsight/skills-and-plugins> |
| S25 | CLI Agent Client Protocol (ACP) support | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-acp> |
| S26 | Desktop: Permission modes | <https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code-desktop/permission-modes> |
| S27 | Desktop: Agent mode and Plan mode | <https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code-desktop/agent-mode-and-plan-mode> |
| S28 | Desktop: Instruction files | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/instruction-files> |
| S29 | Desktop: Context management | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/context-management> |
| S30 | Desktop: Memory | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/memory> |
| S31 | Desktop: Semantic code search | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/semantic-code-search> |
| S32 | Desktop: Agents | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/agents> |
| S33 | Desktop: Building apps | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/building-apps> |
| S34 | Desktop: Data visualization | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/data-visualization> |
| S35 | Desktop: SQL Playground | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/sql-playground> |
| S36 | Desktop: dbt integration | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/dbt-integration> |
| S37 | Desktop: Agentic browser | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/agentic-browser> |
| S38 | Desktop: Agentic notebook | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/agentic-notebook> |
| S39 | Desktop: Automations | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/automations> |
| S40 | Desktop: Skills | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/skills> |
| S41 | Desktop: Plugins | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/plugins> |
| S42 | Desktop: MCP support | <https://docs.snowflake.com/user-guide/cortex-code/cortex-code-desktop/mcp-support> |
| S43 | Snowflake AI pricing (CoCo = AI Credits; credit price) | <https://docs.snowflake.com/en/user-guide/snowflake-cortex/pricing> |

### 18.2 Official Snowflake non-docs (read)
| ID | Title | URL |
|---|---|---|
| S16 | Blog — "Snowflake CoCo: The Coding Agent Built for Data Now Available Where You Work" | <https://www.snowflake.com/en/blog/snowflake-coco-ai-coding-agent-modern-data-stack/> |
| B7 | Snowflake Developer Guide — "Snowflake CoCo Foundations" (hands-on quickstart) | <https://www.snowflake.com/en/developers/guides/coco-foundations/> |
| B5 | Medium (Snowflake publication) — "Getting Started with Cortex Code: A Data Engineer's Guide" (early-preview era) | <https://medium.com/snowflake/getting-started-with-cortex-code-a-data-engineers-guide-b79811c44969> |

### 18.3 Third-party / research sites (read)
| ID | Title | Publisher & note | URL |
|---|---|---|---|
| B1 | Snowflake CoCo (Cortex Code): What It Is and How It Works | Atlan (sells a context layer — product-adjacent) | <https://atlan.com/know/snowflake/snowflake-coco/> |
| B2 | Snowflake CoCo: The Coding Agent in Your Warehouse (2026 analysis) | Digital Applied (independent-style analysis; no pricing) | <https://www.digitalapplied.com/blog/snowflake-coco-warehouse-coding-agent-2026-analysis> |
| B3 | Snowflake CoCo Desktop: What Data Teams Need to Know | DataEngineerHub blog | <https://dataengineerhub.blog/articles/snowflake-coco-desktop> |
| B4 | Snowflake CoCo explained for data and AI teams | Kanerika (Snowflake partner — promotional elements) | <https://kanerika.com/blogs/snowflake-coco-explained-for-data-and-ai-teams/> |
| B6 | Snowflake Cortex Code CLI sandbox escape and RCE | PromptArmor (security research) | <https://www.promptarmor.com/resources/snowflake-cortex-code-sandbox-escape-and-rce> |
| B8 | Snowflake CoCo vs. Databricks Genie Code: A Friendly Face-Off | Atrium (Snowflake consulting partner) | <https://atrium.ai/resources/snowflake-coco-cortex-code-vs-databricks-genie-code-a-friendly-face-off-of-ai-powered-data-assistants/> |

### 18.4 YouTube videos — **title and link only (pages could not be fetched; content/length/date NOT verified)**
| ID | Title (as returned by search) | URL |
|---|---|---|
| V1 | Snowflake Cortex Code Full Demo | <https://www.youtube.com/watch?v=2ezCNChIaHo> |
| V2 | Snowflake Cortex Code (CoCo) 🤖 usage hacks 2026 | <https://www.youtube.com/watch?v=0xnrk_0qMq0> |
| V3 | Snowflake AI: Cortex Code & Custom Skill | <https://www.youtube.com/watch?v=80NqX8XPP9A> |
| V4 | Snowflake AI: Cortex Code and Hooks | <https://www.youtube.com/watch?v=n-32sVYxvPA> |
| V5 | Snowflake Cortex: Engineering the Enterprise AI Lifecycle — Coco is Alive | <https://www.youtube.com/watch?v=boTKukT9mAc> |
| V6 | Behind the Cape — Cortex Code for Performance Optimization & AI Insights | <https://www.youtube.com/watch?v=AhmGNdoUDps> |
| V7 | Snowflake AI: Snowflake CoCo Desktop & its key features | <https://www.youtube.com/watch?v=TpkU7xoC4fU> |
| V8 | Snowflake Rebrands: Cowork & Coco Explained (#shorts) | <https://www.youtube.com/shorts/EOxOvRj5L2Y> |
| V9 | Snowflake Cortex Code Tutorial — Testing AI-Powered PII Detection Walkthrough | <https://www.youtube.com/watch?v=SQITbKjl844> |
| V10 | From One Prompt to Production: Building with Snowflake CoCo | <https://www.youtube.com/watch?v=08kFtNOV9xE> |

💡 Suggested viewing order for your goals: V7 (Desktop overview) → V1 (full demo) → V3 & V4 (custom skills, hooks) → V9 (PII/governance) → V6 (performance) → V10 (end-to-end). Skim titles before investing time; I haven't watched them.

### 18.5 Other resources surfaced by search but **not read** (title/URL only)
| ID | Title | URL |
|---|---|---|
| R1 | Snowflake CoCo Desktop: The Data-Native AI Coding Agent Gets Its Own Editor (Medium, Pascal Pfäffle) | <https://medium.com/@pascalpfffle/snowflake-coco-desktop-the-data-native-ai-coding-agent-gets-its-own-editor-48462b87b8d8> |
| R2 | Meet Snowflake Cortex Code: …AI Coding Assistant That Actually Gets Work Done (Medium/Snowflake) | <https://medium.com/snowflake/meet-snowflake-cortex-code-snowflakes-ai-coding-assistant-that-actually-gets-work-done-12aace1ff5e6> |
| R3 | Release note — Feb 02, 2026: Cortex Code in Snowsight (Preview) | <https://docs.snowflake.com/en/release-notes/2026/other/2026-02-02-cortex-code-snowsight> |
| R4 | Webinar — Cortex Code: Your AI Coding Assistant in Snowsight (virtual hands-on lab, 2026-04-01) | <https://www.snowflake.com/en/webinars/virtual-hands-on-lab/cortex-code-your-ai-coding-assistant-in-snowsight-2026-04-01/> |
| R5 | Snowflake webinars "Intro to Snowflake's Cortex Code" (UHG series, Jun–Aug 2026) | <https://www.snowflake.com/webinars/uhg-intro-to-snowflakes-cortex-code-20260609/> |
| R6 | Cortex Code tutorial (skills.sh / Snowflake-Labs sfguides) | <https://www.skills.sh/snowflake-labs/sfguides/cortex-code-tutorial> |
| R7 | Udemy — Snowflake Cortex Code Masterclass | <https://www.udemy.com/course/snowflake-cortex-code-masterclass> |
| R8 | Simon Willison — link blog, 18 Mar 2026 (Snowflake Cortex AI sandbox escape) | <https://simonwillison.net/2026/mar/18/snowflake-cortex-ai> |
| R9 | PromptArmor — "Snowflake AI escapes sandbox and executes malware" | <https://promptarmor.com/resources/snowflake-ai-escapes-sandbox-and-executes-malware> |
| R10 | Tenable — CVE-2026-6442 (relation to the above **unverified**) | <https://www.tenable.com/cve/CVE-2026-6442> |
| R11 | TechTimes — "Snowflake agentic AI beats Claude Code on its own benchmark: what that means" | <https://www.techtimes.com/articles/318625/20260618/snowflake-agentic-ai-beats-claude-code-its-own-benchmark-what-that-means.htm> |
| R12 | HFS Research item on CoCo | <https://www.hfsresearch.com/?p=205882> |
| R13 | Snowflake pricing explainers: Finout, Espresso AI, Coefficient, Medium "Breaking Down Snowflake's AI Pricing Overhaul" | <https://www.finout.io/blog/snowflake-cortex-pricing> · <https://espresso.ai/guides/snowflake-cortex-pricing> · <https://medium.com/towards-data-engineering/breaking-down-snowflakes-ai-pricing-overhaul-credits-caching-and-cost-strategy-bde56f48f53f> |
| R14 | Snowflake Service Consumption Table (PDF, CoCo token rates) | <https://www.snowflake.com/legal-files/CreditConsumptionTable.pdf> |
| R15 | Cross-region inference; Restricted Session Scope; MDM policy docs | <https://docs.snowflake.com/user-guide/snowflake-cortex/cross-region-inference> · <https://docs.snowflake.com/user-guide/restricted-session-scope> · <https://docs.snowflake.com/user-guide/cortex-code/mdm-policy> |
| R16 | Downloads / trial sign-up | <https://www.snowflake.com/en/product/snowflake-coco/downloads/> · <https://signup.snowflake.com/cortex-code> |

### 18.6 Method note
Searches used: about 40 official Snowflake docs pages fetched via WebFetch; WebSearch for third-party analyses, YouTube, security research and pricing. Where sources disagree, both are noted. Vendor or partner-authored items are flagged. No project documents were attached to this research task.

---
*Next deliverables you mentioned (not yet created): study guide, quick-reference/cheat sheet, slide deck for co-workers. This file is structured so each can be derived from sections 3, 6–7, 12–16.*
