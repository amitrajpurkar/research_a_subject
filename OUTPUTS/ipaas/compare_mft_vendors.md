# Managed File Transfer (MFT) Vendor Comparison — Healthcare Enterprise Integration Pattern

**Integration pattern:** Managed File/Data Transfer. Typical flows are X12 EDI claims files, batch billing extracts, DICOM archives, partner lab feeds, and HL7 over MLLP.

**Evaluation basis** (all from `INPUTS/snowflake_ai/data_integration_patterns.md`):
- *Part 1: Top 10 Features & Capabilities for Enterprise Managed Data Transfer*
- *Part 2: Strategic Pillar Weighting Model for Managed Data Transfer*
- *Part 3: Managed Data Transfer Feature Scoring Template (0 to 4 Scale)*

**Market vendors assessed:** IBM Sterling · GoAnywhere MFT (Fortra) · Kiteworks · Snowflake Secure Data Sharing ("DataShare") · AWS Transfer Family

**Current enterprise technology:** Secure FTP (SFTP). This is assessed as the typical self-managed OpenSSH SFTP servers plus cron/shell scripts.

**Research date:** September 2026. Sources: vendor docs and release notes, security advisories (Fortra, Microsoft, HHS HC3, Qualys, watchTowr), and reviews on PeerSpot and G2. Gartner no longer publishes an MFT Magic Quadrant, so no analyst ranking is cited.

> **Scoping note:** **Snowflake Secure Data Sharing is not a file-transfer tool.** It gives partners zero-copy, governed access to live tables, so no files move. It is scored honestly against the MFT criteria. Where it can *eliminate* file transfer altogether, that is covered in the analysis rather than in the scores.

**Scoring scale** (from the input file):

| Score | Meaning |
|---|---|
| 0 | Not supported |
| 1 | Basic / custom scripts |
| 2 | Configurable / out-of-the-box |
| 3 | Advanced / cloud-native |
| 4 | Fully automated / AI-driven market leader |

**Strategic pillars** (Part 2 of the input file), for context:

| Pillar | Weight |
|---|---|
| Security, Compliance & PHI Protection | 20% |
| Portability & Hybrid/Multi-Cloud | 20% |
| Reliability & Resiliency | 15% |
| Automation, AI & Orchestration | 15% |
| Complexity & Tech Rationalization | 15% |
| Operational Costs & FinOps | 15% |

The Part 3 feature matrix weights each of the 10 features at **10%**.

> **Security context for this pattern:** Self-managed MFT products have been prime ransomware targets. MOVEit, GoAnywhere and Cleo were all mass-exploited between 2023 and 2025. For that reason the **vendor security track record** is assessed separately, in the qualitative risk table (§2.3), in addition to the feature scores.

---

## Section 1 — Vendor & Technology Profiles against the 10 MFT Features

The ten features, as defined in the input file:

1. Cloud-Native & Containerization
2. FIPS & HIPAA Compliance
3. Resilient Checkpoint-Restart
4. Multi-Protocol Support
5. Event-Driven Orchestration
6. AI-Driven Monitoring & Copilots
7. Secure DMZ Edge Isolation
8. High-Speed Chunking & Throttling
9. Immutable Audit Trails
10. FinOps & Egress Governance

### Part A — Market Vendors

---

### 1.1 IBM Sterling

This covers B2B Integrator / File Gateway, Secure Proxy, Connect:Direct, and B2B Integration SaaS.

**Context:**
- A long-standing IBM product line, now marketed as "Sterling Data Exchange".
- B2B Integrator / File Gateway **v6.2.2.0** shipped on 3 Feb 2026, with Helm chart v3.2.0 for certified containers and the new SFG UI 2.0.
- IBM's agentic AI work (watsonx) is reaching Sterling first in the SaaS edition.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Cloud-Native & Containerization | Certified containers for B2Bi/SFG, Secure Proxy and Connect:Direct run on **OpenShift and Kubernetes via Helm**. B2B Integration **SaaS** is also available, as are on-prem and hybrid deployments. These are lifted-and-shifted Java stacks, not serverless, and they are resource-heavy. | 3 |
| 2 | FIPS & HIPAA Compliance | A **FIPS 140-3 mode** is documented for B2Bi 6.2.1. The product checks X12 HIPAA compliance and encrypts over SSL/SSH. There is no native PHI data-loss prevention or tokenization; that needs an ICAP scanner or IBM Transformation Extender (ITX). FedRAMP and HITRUST were not found. A BAA is available through the SaaS contract. | 3 |
| 3 | Resilient Checkpoint-Restart | **Connect:Direct checkpoint/restart** writes positioning records as it goes, so an interrupted transfer resumes where it stopped. v6.4 fixed restart collisions on load-balanced nodes. SFG adds auto-retry and redelivery. This is the **industry benchmark**. | 4 |
| 4 | Multi-Protocol Support | Supports **AS1–AS4**, SFTP/FTPS (client and server), HTTP/S, SMTP, web services, WebDAV and **Connect:Direct**. It has a full **X12/EDIFACT translation engine** (837/835/270/271 with 999/TA1 acknowledgements). HL7 over MLLP goes through the ITX MLLP adapter. | 4 |
| 5 | Event-Driven Orchestration | BPML business processes run on the B2Bi engine, with file-arrival routing, B2B REST APIs, and Partner Engagement Manager for partner onboarding. It scales to about 10M transactions a day. There is no native cloud event bus, so calling Lambda or Snowflake needs custom adapters. | 3 |
| 6 | AI-Driven Monitoring & Copilots | A watsonx-agent **Configuration Assistant** (Jan 2026) covers the **SaaS edition only** and is described as a "first step". SaaS Standard includes AI-enhanced anomaly detection. On-prem B2Bi/SFG has almost no AI. | 2 |
| 7 | Secure DMZ Edge Isolation | **Sterling Secure Proxy** stores no files, credentials or data on disk in the DMZ and needs **no inbound firewall holes**. It supports multi-factor authentication and proxies Connect:Direct, SFTP, HTTP and FTP/S, and it ships as a certified container. | 4 |
| 8 | High-Speed Chunking & Throttling | Connect:Direct supports parallel sessions and compression, and a UDP High-Speed Add-On exists (not re-verified in this research). It handles files of hundreds of GB. Reviewers report slowdowns under heavy workflow volume. | 3 |
| 9 | Immutable Audit Trails | SFG tracks every event with a correlation ID. Connect:Direct keeps statistics records, and Control Center Monitor forwards to SIEM. Reviewers call reporting weak, and logs are purged after 7 days by default. Logs are not natively tamper-evident. | 3 |
| 10 | FinOps & Egress Governance | On-prem licensing is PVU/VPC-based and hard to predict. SaaS has three editions, with Essentials from **$2,800/yr**. There is no per-partner cost or egress chargeback. | 2 |

**Pros**
- Strongest native EDI engine (X12 HIPAA validation and acknowledgements), ideal for 837/835 claims flows (IBM; PeerSpot).
- Connect:Direct is the de facto standard for payer, bank and clearinghouse bulk transfers (IBM; PeerSpot).
- Best-in-class DMZ design: Secure Proxy keeps no data at rest and needs no inbound holes (IBM).
- Very large scale (about 10M transactions a day) plus geo-HA via Global Mailbox (IBM).
- Flexible deployment: on-prem, OpenShift/Kubernetes containers, or SaaS (PeerSpot).
- Centralized partner management and broad protocol coverage (PeerSpot).

**Cons**
- Complex, specialist skill set (BPML, maps) with a steep learning curve and thin docs (PeerSpot).
- Expensive, with complex PVU licensing (PeerSpot).
- Weak reporting and audit visibility, with a 7-day purge by default (PeerSpot).
- Slow support (PeerSpot).
- Performance drops at high workflow volume (PeerSpot).
- AI features are SaaS-first and early (IBM Community).
- Steady 2025 security bulletins (DoS, information disclosure, XSS), though no mass-exploited zero-day (IBM Security Bulletins).

**Pricing:** On-prem is by custom PVU/VPC quote, perpetual or subscription, typically six to seven figures (estimate). SaaS Essentials starts at $2,800/yr; Standard and Premium are quoted.

---

### 1.2 GoAnywhere MFT (Fortra)

**Context:**
- Fortra is owned by private equity. The product started at Linoma Software.
- Current releases: 7.10.0 (Apr 2026), 7.10.1 (Jul 2026) and 7.10.2 (Sep 2026).
- **Security history (critical for a PHI buyer):**
  - **CVE-2023-0669:** a pre-auth RCE that **Clop exploited as a zero-day** in 2023. About 130 victims were claimed, including roughly 1M patient records at Community Health Systems, and it prompted an HHS HC3 healthcare alert.
  - **CVE-2025-10035:** a **CVSS 10.0 License Servlet deserialization** flaw, exploited from about 11 Sep 2025 by **Storm-1175 to deploy Medusa ransomware**, according to Microsoft. CISA added it to its Known Exploited Vulnerabilities list. Fortra patched it on 12–15 Sep but published the CVE only on 18 Sep, and its first advisory did not mention in-the-wild exploitation; watchTowr criticized this.
  - Both flaws were in the **admin console**. Fortra says exposure was limited to consoles reachable from the internet.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Cloud-Native & Containerization | Runs on Windows, Linux, AIX and IBM i, and is on the AWS/Azure marketplaces (bring your own licence). **MFTaaS** is a vendor-hosted SaaS, and a Docker base image exists. **No Kubernetes operator or Helm-first design was found.** | 2 |
| 2 | FIPS & HIPAA Compliance | 7.10.0 improved **FIPS 140-3** support (restricted algorithm sets). It markets HIPAA support, and MFTaaS is SOC 2 Type 2. DLP is available via ICAP. FedRAMP and HITRUST were not found. The breach history is a material risk offset; see §2.3. | 3 |
| 3 | Resilient Checkpoint-Restart | Resume is supported for SFTP/FTP(S), with retry settings on Project tasks and Agents. FileCatalyst provides resilient UDP transfers. It is not Connect:Direct-grade. | 3 |
| 4 | Multi-Protocol Support | Supports SFTP, FTPS, SCP, HTTPS, **AS2/AS3/AS4** (AS2 Drummond-certified), SMB, S3 and Azure Blob. It has **built-in X12/EDIFACT translation**. There is **no native MLLP and no Connect:Direct**. | 3 |
| 5 | Event-Driven Orchestration | Visual multi-step **Projects**, folder monitors, triggers, schedules, REST/SOAP APIs and remote Agents. Reviewers rate the automation well. Lambda and Snowflake calls go through REST or SQL tasks. | 3 |
| 6 | AI-Driven Monitoring & Copilots | **No AI features** appear in the 7.10.x release notes. Monitoring is dashboards and alerts. | 1 |
| 7 | Secure DMZ Edge Isolation | **GoAnywhere Gateway** acts as a DMZ reverse and forward proxy. The internal MFT server opens an outbound control channel, so no inbound ports are needed. Both exploited CVEs targeted the admin console, so **keeping the console off the internet is essential**. | 3 |
| 8 | High-Speed Chunking & Throttling | **GoFast UDP** acceleration and FileCatalyst integration, plus multithreaded Agent transfers and bandwidth limits. | 3 |
| 9 | Immutable Audit Trails | Detailed audit logs and reports, syslog/SIEM forwarding, and admin audit logs. Storage is database-backed and **not natively tamper-evident**. | 3 |
| 10 | FinOps & Egress Governance | **Modular, predictable licensing**, perpetual or subscription. MFTaaS offers flat-fee tiers. Reviewers find it cheaper than MOVEit or Sterling. | 3 |

**Pros**
- #1 in PeerSpot's MFT category (8.6/10; 99% would recommend), and easy to deploy.
- Cost-effective modular licensing that needs little professional services (PeerSpot).
- Strong no-code workflow automation (PeerSpot).
- The Gateway DMZ design needs no inbound ports (Fortra).
- Built-in X12 translation and Drummond-certified AS2 (Fortra).
- Broad platform support, including IBM i and AIX (Fortra).
- Active release cadence, including FIPS 140-3 and Entra ID support (Fortra release notes).

**Cons**
- **Two ransomware-exploited zero-days (2023 Clop; 2025 Storm-1175/Medusa), both touching healthcare incidents** (Microsoft; HHS HC3; CPO Magazine).
- **Concerns about disclosure transparency**: the CVE was published about 7 days after exploitation began (watchTowr; The Hacker News; Cyber Daily).
- No AI or copilot features (release notes).
- Dated UI and limited real-time monitoring (PeerSpot).
- No Kubernetes-native deployment (release notes; PeerSpot).
- Learning curve for complex setups (PeerSpot).
- No native MLLP or Connect:Direct (Fortra).

**Pricing:** Modular perpetual or annual licences. Entry is cited at about $4–5K/yr, but an enterprise deployment with Gateway, Agents and clustering costs much more. MFTaaS uses flat-fee tiers.

---

### 1.3 Kiteworks (Private Data Network)

**Context:**
- Formerly **Accellion**, renamed in 2021.
- Raised **$456M** in August 2024 (Insight Partners, Sixth Street) at a valuation above $1B, and acquired Zivver in 2025.
- **Legacy breach:** the old **Accellion FTA** appliance was hit by Clop-linked zero-days in 2020–21. About 25 customers were affected, and the company paid an $8.1M settlement. The current platform is a separate codebase.
- Recent CVEs have been high severity but not known to be exploited (e.g. CVE-2025-53939, fixed in 9.1.0).

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Cloud-Native & Containerization | A **hardened virtual appliance** that runs on any cloud or hypervisor, including air-gapped sites, with clustering. It is also available hosted, in a FedRAMP cloud, or single-tenant on AWS GovCloud. There is **no customer-managed Kubernetes or container distribution**. | 2 |
| 2 | FIPS & HIPAA Compliance | Encryption modules are **FIPS 140-3 Level 1 validated**, with AES-256-GCM and **TLS 1.3**. **FedRAMP Moderate** since 2017. FedRAMP High status conflicts across Kiteworks pages ("In Process" vs "Ready"). **Built-in DLP, antivirus and content disarm and reconstruction (CDR).** HIPAA is marketed; the BAA and HITRUST are unconfirmed. This is the strongest compliance posture of the six. | 4 |
| 3 | Resilient Checkpoint-Restart | MFT resumes from the point of interruption (the vendor cites a 16 TB transfer "doesn't restart from zero at 60%"). An Airflow-based engine handles retries. There is little third-party validation. | 3 |
| 4 | Multi-Protocol Support | Supports SFTP, FTPS, SMB/CIFS, HTTPS and **AS2** (Drummond-certified v9.4, 2Q26). There is **no AS4, no Connect:Direct, no X12 engine and no MLLP**, so claims and HL7 flows need a separate engine. | 2 |
| 5 | Event-Driven Orchestration | An **Apache Airflow-powered** workflow designer with connectors for S3, Azure, GCS, SharePoint, OneDrive and Box, plus REST APIs. There are **no native Snowflake or Lambda triggers**. | 2 |
| 6 | AI-Driven Monitoring & Copilots | A **Secure MCP Server and AI Data Gateway** let large language models act on governed files, with policy enforcement, full audit and post-quantum key exchange, plus a CISO Dashboard. The focus is AI data governance, not transfer SLA prediction. ML-based anomaly detection is unverified. | 3 |
| 7 | Secure DMZ Edge Isolation | Only the web tier is exposed in the DMZ. The appliance is CIS-hardened, with an embedded firewall, web application firewall and intrusion detection, and SSH is off by default. This is a *hardened exposed tier* rather than a separate outbound-only proxy like Sterling's or GoAnywhere's. | 3 |
| 8 | High-Speed Chunking & Throttling | Handles large files (multi-TB per vendor claims). **No UDP acceleration** and no documented parallel-stream or bandwidth-shaping controls. | 2 |
| 9 | Immutable Audit Trails | **Immutable audit logs** with SIEM integration, forming one consolidated chain of custody across email, file sharing, SFTP, MFT and AI access. This is a core differentiator. | 4 |
| 10 | FinOps & Egress Governance | No public pricing; G2 places it in the top price tier. Reviewers find the licensing confusing. There is no cost or egress chargeback. | 2 |

**Pros**
- Best compliance posture: FIPS 140-3 validated, FedRAMP Moderate, and FedRAMP High in progress (Kiteworks; FedRAMP Marketplace).
- One immutable audit trail across email, file sharing, MFT and SFTP (G2; Kiteworks).
- Built-in DLP, antivirus, CDR and web application firewall on a CIS-hardened appliance with a bug bounty (Kiteworks).
- Leading AI data governance through its MCP Server and AI Data Gateway (Kiteworks).
- Simple UI (PeerSpot 4.3/5; 100% would recommend).
- Handles large files and server-to-server automation (PeerSpot).

**Cons**
- Legacy **Accellion FTA breach** and settlement (Wikipedia; SecurityWeek).
- **Weak B2B/EDI**: no X12, MLLP, AS4 or Connect:Direct (Kiteworks).
- Expensive, with opaque licensing (G2; PeerSpot).
- Slow support in some regions (PeerSpot).
- Occasional bugs and lag (PeerSpot).
- Appliance-only, with no Kubernetes option.
- The Zivver acquisition drew scrutiny over EU data sovereignty.

**Pricing:** Custom enterprise quote only, in the premium tier; a free trial is available.

---

### 1.4 Snowflake Secure Data Sharing ("DataShare")

This covers Direct Shares, Listings, Marketplace, Reader Accounts, Auto-Fulfillment and Clean Rooms.

**Context:**
- This is **zero-copy data sharing, not MFT**. Partners query live, governed tables, and no files move.
- **Where it can replace file transfer:** any flow where the partner is on Snowflake, or is given a Reader Account that you pay for. Examples include batch billing and analytic extracts to payers, ACOs and data vendors, and Clean Room collaborations.
- **Where it cannot:** X12 EDI, AS2, MLLP/HL7, DICOM or other binary file delivery, and any partner that requires SFTP.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Cloud-Native & Containerization | Fully managed SaaS on **AWS, Azure and GCP**; nothing to deploy. **Cross-Cloud Auto-Fulfillment** replicates listings to consumer regions on a schedule. | 3 |
| 2 | FIPS & HIPAA Compliance | The **Business Critical** edition supports PHI with a **HIPAA BAA and HITRUST**, Tri-Secret Secure and private connectivity. Sharing to lower-tier accounts is **blocked by default**. The Trust Center auto-classifies PHI (GA April 2026). A FIPS 140-3 module is validated, though which endpoints use it is unconfirmed. | 3 |
| 3 | Resilient Checkpoint-Restart | Not applicable by design: no bytes move. Cross-region replication is a managed, incremental refresh. | 2 |
| 4 | Multi-Protocol Support | Only the Snowflake SQL/API channel. **No SFTP, FTPS, AS2, MLLP or X12.** | 1 |
| 5 | Event-Driven Orchestration | Listing refreshes can be triggered or scheduled, and consumers can build streams and tasks on shared data. There are no partner event notifications or cross-system workflows. | 2 |
| 6 | AI-Driven Monitoring & Copilots | Trust Center PHI/PII classification. Cortex AI works on the data, not on sharing operations. There is no SLA or anomaly copilot. | 2 |
| 7 | Secure DMZ Edge Isolation | **No DMZ, no inbound listener and no files at rest**, so the DMZ problem is removed entirely. Access is governed by Snowflake roles, network policies and private connectivity. This applies only to Snowflake-connected partners. | 3 |
| 8 | High-Speed Chunking & Throttling | Sharing within a region is instant because nothing moves. Cross-region replication is service-managed, with a 10 TB default product limit. There are no throttling controls. | 2 |
| 9 | Immutable Audit Trails | **`LISTING_ACCESS_HISTORY`** shows column-level consumer access, retained for 365 days with up to 2 days' lag. `ACCESS_HISTORY` records share lifecycle changes, and `GRANTS_TO_SHARES` records grants. The logs are Snowflake-managed and cannot be edited through DML. | 3 |
| 10 | FinOps & Egress Governance | Consumers pay their own compute, and the Egress Cost Optimizer charges egress only once. **However, the Egress Cost Optimizer is not available on Business Critical**, the edition PHI requires. Reader-account compute is billed to you. | 2 |

**Pros**
- Eliminates the extract → SFTP → reload cycle, with no stale copies on partner servers (Snowflake docs).
- Governed PHI sharing: Business Critical, BAA, HITRUST, and a default block on sharing to lower tiers (Snowflake docs).
- A 365-day column-level consumer audit plus share lifecycle audit (Snowflake docs; release notes).
- PHI auto-classification in the Trust Center (2026 release notes).
- Cross-cloud Auto-Fulfillment, and Clean Rooms for privacy-preserving joins (Snowflake docs).
- Consumers pay their own compute, and access can be revoked instantly (Snowflake docs).

**Cons**
- **Not MFT**: no SFTP, AS2, EDI or MLLP, and no file delivery (Snowflake docs).
- Only useful for Snowflake-connected partners. Reader accounts default to a maximum of 20 and their compute is billed to you (Snowflake docs).
- The Egress Cost Optimizer is unavailable on Business Critical (Snowflake docs).
- Sharing to non-HIPAA accounts requires an override, and BAAs remain your responsibility (Snowflake docs).
- Clean Rooms require the Enterprise edition for providers (Snowflake docs).
- The consumer access log lags by up to 2 days (Snowflake docs).

**Pricing:** No separate sharing fee. You pay for storage, cross-region replication (compute, storage and egress) and Reader Account compute. PHI requires the Business Critical edition, which has a higher credit rate.

---

### 1.5 AWS Transfer Family (with AWS B2B Data Interchange)

**Context:**
- Fully managed **SFTP, FTPS, FTP and AS2** endpoints that write directly to **S3 or EFS**.
- **SFTP connectors** push files to and pull files from partner servers.
- **AWS B2B Data Interchange (B2Bi)** translates X12 to and from JSON/XML.
- It fits best when S3 or Snowflake is the landing zone.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Cloud-Native & Containerization | **Fully managed, serverless, multi-availability-zone**, with nothing to run and an official Terraform module. It is **AWS-only**, with no on-prem or self-hosted Kubernetes option. | 3 |
| 2 | FIPS & HIPAA Compliance | Offers **FIPS security policies** (`TransferSecurityPolicy-FIPS-2025-03`, including hybrid post-quantum ML-KEM). **HIPAA-eligible** and in scope for PCI, SOC and FedRAMP, and B2Bi is HIPAA-eligible. FIPS endpoints exist only in some regions. TLS 1.3 support is unconfirmed. There is no built-in PHI scanning; Macie or GuardDuty on S3 can be added. | 3 |
| 3 | Resilient Checkpoint-Restart | Managed workflows handle partial uploads, and SFTP connectors survive credential rotation (Sept 2026). However, **resuming against S3 is unconfirmed**: only one connection is allowed per transfer and appends are restricted. EFS behaves like a normal file system. | 2 |
| 4 | Multi-Protocol Support | Supports **SFTP, FTPS, FTP and AS2**. AS2 is Drummond-certified, and asynchronous delivery receipts (MDNs) were added in March 2026. **B2Bi handles X12 4010–5010, including HIPAA 837/835/270/271.** HTTPS is available through web apps. **There is no MLLP/HL7.** | 3 |
| 5 | Event-Driven Orchestration | Every transfer emits an **EventBridge event**. Managed workflows (copy, tag, PGP decrypt, custom Lambda) include exception handling. Limits: 10 workflows per region, 8 steps each, and a 10 GB decrypt size, and workflows do not run on AS2 transfers. | 3 |
| 6 | AI-Driven Monitoring & Copilots | B2Bi offers **AI-assisted EDI mapping** (Claude via Bedrock; no data retained). There is no MFT copilot or anomaly detection; monitoring uses CloudWatch and CloudTrail. | 2 |
| 7 | Secure DMZ Edge Isolation | **No customer-run DMZ host.** Endpoints can be public or inside your VPC with security groups. Connector traffic can egress through your VPC via Transit Gateway or a firewall (Oct 2025), and client IPs are preserved behind a Network Load Balancer (Sept 2026). Files land directly in S3, so no PHI sits on a DMZ disk. | 3 |
| 8 | High-Speed Chunking & Throttling | **No parallel chunking or UDP acceleration.** S3-backed servers allow one connection per transfer. Connectors handle files up to 150 GB. For large DICOM archives, DataSync or Snowball is the better tool. | 2 |
| 9 | Immutable Audit Trails | Every file operation is logged to CloudWatch and EventBridge, and API calls to CloudTrail. Logs are immutable **only if configured** (S3 Object Lock, CloudTrail Lake). There is no built-in chain-of-custody report. | 3 |
| 10 | FinOps & Egress Governance | Pricing is **published and predictable**, and can be tagged and tracked in Cost Explorer. But each protocol endpoint bills continuously at about **$219/month**, and connector data costs **$0.40/GB**, ten times the server rate. There are no per-partner cost dashboards. | 2 |

**Pros**
- Fully managed, serverless and multi-AZ, with no OS patching, which removes the regreSSHion-style exposure (AWS docs).
- FIPS policies with post-quantum key exchange, and HIPAA/PCI/SOC/FedRAMP scope (AWS docs; AWS Security Blog).
- Native **AS2 plus X12 HIPAA 5010** via B2Bi, with AI-assisted mapping (AWS FAQ).
- Files land directly in **S3**, ready for Snowpipe or a Snowflake external stage (AWS docs).
- Native EventBridge and Lambda event hand-offs (AWS FAQ).
- Rapid 2026 feature cadence (What's New posts).

**Cons**
- **No MLLP/HL7**, so an interface engine is needed (AWS FAQ).
- Resume into S3 is unclear or limited (AWS docs; flagged).
- The always-on per-protocol endpoint fee and the $0.40/GB connector rate add up (pricing page).
- Hard limits on workflows (AWS docs).
- No MFT console: no partner portal, SLA dashboard or copilot, so you build them yourself.
- AWS lock-in, and FIPS endpoints only in some regions (AWS docs).

**Pricing:**

| Item | Price |
|---|---|
| Endpoint | $0.30 per protocol per endpoint-hour |
| SFTP/FTPS/FTP data | $0.04/GB |
| AS2 | $0.01 per message for the first 100k, then $0.005 |
| SFTP connectors | $0.001 per call plus $0.40/GB |
| Web apps | $0.50 per unit-hour |
| B2Bi | $8 per partnership per month plus $0.01 per document |

---

### Part B — Technology Currently Used in the Enterprise

---

### 1.6 Secure FTP (self-managed OpenSSH SFTP plus cron/shell scripts) — *current*

**Context:**
- This profile describes the **typical enterprise pattern**, not an audit of the actual environment:
  - RHEL VMs running OpenSSH `sftp-server`, often in a DMZ with chroot jails.
  - cron-driven bash scripts using `sftp -b` batch files for partner pushes and pulls.
- **OpenSSH itself is sound. The weaknesses are operational.**
- The proposed **HIPAA Security Rule update** would mandate encryption, MFA and asset inventory. It was still at the proposal stage as of April 2026, with a final rule expected in late 2026; its current status needs confirming. If it is finalized, pressure on this setup increases.

| # | Feature | Evidence | Score |
|---|---|---|---|
| 1 | Cloud-Native & Containerization | Hand-built VMs with no autoscaling or multi-AZ failover beyond what has been scripted. It could be containerized, but typically is not. | 1 |
| 2 | FIPS & HIPAA Compliance | **RHEL 9 FIPS mode** plus crypto policies can enforce FIPS-approved SSH algorithms. OpenSSH 10.0 defaults to post-quantum `mlkem768x25519`, but older enterprise builds lag. There is no encryption at rest unless added, no PHI scanning, and HIPAA controls are left to the enterprise. | 2 |
| 3 | Resilient Checkpoint-Restart | OpenSSH supports `reget`/`reput`/`-a` resume, but retry logic, checksums and duplicate prevention must be **hand-scripted**, and typical scripts simply re-run the `put`. | 1 |
| 4 | Multi-Protocol Support | **SFTP and SCP only.** FTPS needs a separate daemon, and there is no AS2, HTTPS portal, MLLP or X12. | 1 |
| 5 | Event-Driven Orchestration | **cron schedules or polling** (inotify hacks at best). There are no events, no dependency management and no SLA alerts. | 1 |
| 6 | AI-Driven Monitoring & Copilots | None. Monitoring is log grepping and failure emails from scripts. | 0 |
| 7 | Secure DMZ Edge Isolation | Typically **an internet-facing sshd in the DMZ that stores PHI on local disk**, protected only by chroot and firewall rules. **regreSSHion (CVE-2024-6387)**, an unauthenticated root RCE, left about 14M potentially vulnerable internet servers (Censys/Shodan). | 1 |
| 8 | High-Speed Chunking & Throttling | `-B`/`-R` buffer tuning and `-l` bandwidth limits are available. There is no native parallel chunking or acceleration. | 1 |
| 9 | Immutable Audit Trails | `sftp-server` logs file operations only when set to INFO/VERBOSE; **the default is ERROR, which means file operations are not logged at all**. Logs are local and can be tampered with unless forwarded to a SIEM with write-once storage. There is no partner → file → downstream chain of custody. | 1 |
| 10 | FinOps & Egress Governance | No metering or chargeback. Costs are hidden in VMs, RHEL subscriptions, firewall operations and engineering time spent on scripts and on-call. | 1 |

**Pros**
- Mature, universally understood standard that every partner supports.
- No licence cost and transparent open source.
- Strong transport cryptography when kept current (post-quantum key exchange in 10.x; RHEL FIPS mode).
- Native resume and bandwidth limiting in the client.
- Full control, with no cloud dependency.

**Cons**
- **No central management.** Every flow is a bespoke script, and support relies on a few people who know them (IBM; Kiteworks).
- **Thin, editable audit trails by default**, which makes HIPAA §164.312(b) evidence hard (sftp-server man page; OPSWAT).
- Internet-facing sshd requires constant patching, as regreSSHion showed (Qualys).
- Manual, often static key and credential management (OPSWAT).
- No AS2, X12, MLLP or HTTPS, and no event-driven orchestration.
- PHI sits on DMZ disks, typically unencrypted at rest and not scanned.
- Scaling and failover are manual.

*Vendor-bias note:* IBM, Kiteworks and OPSWAT all sell MFT, so their SFTP criticisms are partly marketing.

**Pricing:** The software is free. The real cost is RHEL, VM/hardware, DMZ network and firewall operations, SIEM ingestion, and engineering time for scripting and patching (no reliable public benchmark).

---

## Section 2 — Comparison: Managed Data Transfer Feature Scoring Template (0 to 4 Scale)

This uses *Part 3: Managed Data Transfer Feature Scoring Template* from `data_integration_patterns.md`. Each feature has a **10% weight**.
- Weighted score = Score × 10%.
- Total = sum of weighted scores (maximum 4.0).
- Normalized % = Total ÷ 4.0.

### 2.1 Raw scores (0–4)

| # | Managed Data Transfer Feature | Description & Evaluation Focus | Weight | IBM Sterling | GoAnywhere MFT | Kiteworks | Snowflake Data Sharing | AWS Transfer Family | Secure FTP *(current)* |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Cloud-Native & Containerization | Kubernetes/serverless elasticity across hybrid infrastructure | 10% | 3 | 2 | 2 | 3 | 3 | 1 |
| 2 | FIPS & HIPAA Compliance | AES-256, TLS 1.3, PHI tokenization guardrails | 10% | 3 | 3 | 4 | 3 | 3 | 2 |
| 3 | Resilient Checkpoint-Restart | Auto-retry and byte-level resume | 10% | 4 | 3 | 3 | 2 | 2 | 1 |
| 4 | Multi-Protocol Support | SFTP, AS2, HTTPS, MLLP for healthcare feeds | 10% | 4 | 3 | 2 | 1 | 3 | 1 |
| 5 | Event-Driven Orchestration | Invocation of downstream functions / ELT | 10% | 3 | 3 | 2 | 2 | 3 | 1 |
| 6 | AI-Driven Monitoring & Copilots | Autonomous troubleshooting, SLA forecasting | 10% | 2 | 1 | 3 | 2 | 2 | 0 |
| 7 | Secure DMZ Edge Isolation | Segmentation protecting core storage | 10% | 4 | 3 | 3 | 3 | 3 | 1 |
| 8 | High-Speed Chunking & Throttling | Parallel multi-threading, bandwidth controls | 10% | 3 | 3 | 2 | 2 | 2 | 1 |
| 9 | Immutable Audit Trails | Tamper-proof chain of custody | 10% | 3 | 3 | 4 | 3 | 3 | 1 |
| 10 | FinOps & Egress Governance | Cost attribution for multi-cloud transfers | 10% | 2 | 3 | 2 | 2 | 2 | 1 |

### 2.2 Weighted scores (Score × Weight) and totals

| # | Managed Data Transfer Feature | IBM Sterling | GoAnywhere MFT | Kiteworks | Snowflake Data Sharing | AWS Transfer Family | Secure FTP *(current)* |
|---|---|---|---|---|---|---|---|
| 1 | Cloud-Native & Containerization | 0.30 | 0.20 | 0.20 | 0.30 | 0.30 | 0.10 |
| 2 | FIPS & HIPAA Compliance | 0.30 | 0.30 | 0.40 | 0.30 | 0.30 | 0.20 |
| 3 | Resilient Checkpoint-Restart | 0.40 | 0.30 | 0.30 | 0.20 | 0.20 | 0.10 |
| 4 | Multi-Protocol Support | 0.40 | 0.30 | 0.20 | 0.10 | 0.30 | 0.10 |
| 5 | Event-Driven Orchestration | 0.30 | 0.30 | 0.20 | 0.20 | 0.30 | 0.10 |
| 6 | AI-Driven Monitoring & Copilots | 0.20 | 0.10 | 0.30 | 0.20 | 0.20 | 0.00 |
| 7 | Secure DMZ Edge Isolation | 0.40 | 0.30 | 0.30 | 0.30 | 0.30 | 0.10 |
| 8 | High-Speed Chunking & Throttling | 0.30 | 0.30 | 0.20 | 0.20 | 0.20 | 0.10 |
| 9 | Immutable Audit Trails | 0.30 | 0.30 | 0.40 | 0.30 | 0.30 | 0.10 |
| 10 | FinOps & Egress Governance | 0.20 | 0.30 | 0.20 | 0.20 | 0.20 | 0.10 |
| **TOTALS** | **Sum of weighted scores (max 4.0)** | **3.10** | **2.70** | **2.70** | **2.30** | **2.60** | **1.00** |
| | **Normalized to 100%** | **77.5%** | **67.5%** | **67.5%** | **57.5%** | **65.0%** | **25.0%** |
| | **Rank** | 1 | 2= | 2= | 5 | 4 | 6 |

### 2.3 Qualitative Architecture Risk & Fit Assessment

| Evaluation Domain | Key Architecture Question | IBM Sterling | GoAnywhere | Kiteworks | Snowflake Sharing | AWS Transfer Family | Secure FTP (current) |
|---|---|---|---|---|---|---|---|
| **Vendor Security Track Record** | Has the product been mass-exploited by ransomware? | Low risk (bulletins, no mass zero-day) | **High (2023 Clop + 2025 Medusa zero-days)** | Medium (legacy Accellion FTA breach; new codebase) | Low risk (managed SaaS) | Low risk (managed service) | Medium–High (regreSSHion exposure; patch-dependent) |
| Healthcare B2B Fit | Handles X12 claims, AS2 and Connect:Direct partners? | Pass (strongest) | Pass (X12, AS2; no Connect:Direct) | Fail (no X12, AS4 or Connect:Direct) | Fail (not a transfer protocol) | Pass (AS2 + B2Bi X12) | Fail |
| HL7 / MLLP | Native MLLP listener? | Via ITX adapter | No | No | No | No | No |
| Tech Stack Consolidation | Can it retire scattered SFTP servers and cron scripts? | Low risk | Low risk | Medium | Partial (Snowflake partners only) | Low risk | N/A |
| Vendor Lock-in Risk | How portable are flows if the platform changes? | Medium–High (BPML, proprietary) | Medium | Medium | High (Snowflake-only) | Medium–High (AWS-only) | Low (standard) |
| Ops Complexity | Can the team run it without specialists? | Fail (BPML/map skills) | Pass | Pass | Pass | Pass (but build-your-own portal/dashboards) | Fail (script sprawl) |

### 2.4 Analysis — Best Fit for the Managed File Transfer Pattern

**The current Secure FTP setup scores 25%, the lowest of all six options.** It has no central management, no reliable audit trail (file operations are not logged at the default log level), an exposed DMZ, and no AS2/X12 support. Every vendor assessed would be a material improvement. Replacing it is a clear rationalization win, and all the more so if the proposed HIPAA Security Rule update is finalized.

**IBM Sterling ranks first (77.5%).** It is the most complete healthcare B2B MFT platform:
- **Connect:Direct checkpoint/restart**, the benchmark for large transfers;
- a **native X12 HIPAA engine**;
- **Secure Proxy**, the benchmark DMZ design, which keeps no data in the DMZ;
- AS2/AS4, and an MLLP adapter via ITX.

It is the right choice where many **payer, clearinghouse or bank partners use Connect:Direct or AS2 with X12**. The trade-offs are complexity, cost, specialist skills, and AI features that are still limited to SaaS.

**AWS Transfer Family (65%) is the most pragmatic cloud-native way to retire SFTP**, especially if the enterprise lands data in **S3 → Snowflake**:
- serverless and multi-AZ, with no DMZ host to patch;
- FIPS policies;
- native AS2, plus X12 HIPAA 5010 through B2B Data Interchange;
- EventBridge/Lambda hand-offs into ELT pipelines.

Its gaps are uncertain resume into S3, no acceleration, no MLLP, and no partner portal or dashboards. Endpoint-hour and connector-GB costs need modelling.

**GoAnywhere (67.5%) scores well on features and cost.** However, it has had **two ransomware-exploited admin-console zero-days**, both in healthcare-relevant incidents, and a **slow disclosure in 2025**. It is therefore **not recommended** for a PHI-heavy enterprise unless strict compensating controls are guaranteed: the admin console never reachable from the internet, and aggressive patch SLAs.

**Kiteworks (67.5%)** has the **best compliance and audit posture** (FIPS 140-3, FedRAMP, built-in DLP/CDR, and unified immutable audit across email, file sharing and MFT). It is also strongest on **AI data governance** (MCP and AI Data Gateway). But it has **no X12, AS4, Connect:Direct or MLLP**. It fits **person-to-person and ad-hoc PHI exchange**, such as legal, HR, provider correspondence and secure email, better than it fits system-to-system claims EDI.

**Snowflake Secure Data Sharing (57.5%) is not an MFT replacement.** It is the best way to **eliminate** file transfers for Snowflake-connected partners: no files, no DMZ, and a 365-day consumer audit. Examples are analytic and billing extracts to payers, ACOs and data vendors, plus Clean Rooms. Watch the Business Critical requirement for PHI, the lack of an egress optimizer on that edition, and Reader-account compute costs.

**Recommendation — a layered target state to retire Secure FTP:**
1. **System-to-system MFT core.** Two options:
   - **AWS Transfer Family + B2B Data Interchange**, if the landing zone is AWS/S3 → Snowflake and the partner mix is mainly SFTP and AS2. This is lower-cost and faster to adopt.
   - **IBM Sterling**, if a large share of partners require Connect:Direct, AS2/AS4 and heavy X12 validation, or on-prem/OpenShift deployment is mandated.
2. **Data-product sharing:** move extract-style partner feeds to **Snowflake Secure Data Sharing** wherever the partner can consume them in Snowflake. This removes those flows entirely.
3. **Human-to-human PHI exchange:** consider **Kiteworks** if secure email and file sharing with a unified audit trail is also in scope.
4. **HL7 over MLLP:** route it to the enterprise **interface engine**, not to MFT. None of these products offers native MLLP apart from Sterling via ITX.
5. **Security guardrail:** whichever product is chosen, no management console should ever be reachable from the internet, audit logs should go to write-once storage or a SIEM, and patch SLAs should be contracted.

**Proof-of-concept checklist:**
- Test resume and restart on multi-GB DICOM and 837 files, especially AWS resume into S3.
- Run X12 837/835 round-trips with 999/TA1 acknowledgements.
- Validate the AS2 MDN flow with two real trading partners.
- Confirm BAA, FIPS and TLS 1.3 status for each vendor.
- Model 3-year TCO: Sterling PVU vs AWS endpoint-hours plus GB vs GoAnywhere modules vs Kiteworks quote.
- Estimate partner migration effort (key and credential rotation, IP allow-lists).

---

## Section 3 — Bibliography

The websites and resources consulted for this analysis are grouped by subject below.

### Input
- `INPUTS/snowflake_ai/data_integration_patterns.md`: Managed Data Transfer Part 1 (top 10 features), Part 2 (strategic pillar weighting), Part 3 (feature scoring template).
- `OUTPUTS/ipaas/compare_elt_vendors.md`, `compare_cdc_vendors.md`, `vendor_compare_data_virt.md`, `compare_mdm_vendors.md`: prior pattern reports. Their format and qualitative risk template are reused here.

### IBM Sterling
1. IBM Support — Sterling B2B Integrator v6.2.2.0 release notes — https://www.ibm.com/support/pages/ibm-sterling-b2b-integrator-v6220-release-notes-0
2. IBM — Sterling B2B Integrator product page — https://www.ibm.com/products/b2b-integrator
3. IBM — Sterling Secure Proxy product page — https://ibm.com/products/secure-proxy
4. IBM Docs — Connect:Direct 6.4 checkpoint/restart facility — https://www.ibm.com/docs/en/connect-direct/6.4.0?topic=facility-checkpointrestart-file
5. IBM Docs — FIPS 140-3 in Sterling B2B Integrator 6.2.1 (title/topic only; page returned 403) — https://www.ibm.com/docs/en/b2b-integrator/6.2.1?topic=fips-140-3-sterling-b2b-integrator
6. IBM Docs — Sterling Transformation Extender HL7 MLLP adapter — https://www.ibm.com/docs/en/ste/11.0.3?topic=adapters-hl7-mllp-adapter
7. IBM Community — Introducing the Configuration Assistant (AI) for B2B Integration SaaS (Jan 2026) — https://community.ibm.com/community/user/blogs/andre-ricardo-de-oliveira-marques/2026/01/12/introducing-the-configuration-assistant-ai
8. IBM — B2B Integration SaaS pricing — https://www.ibm.com/products/b2b-integration-saas/pricing
9. PeerSpot — IBM Sterling File Gateway pros and cons — https://www.peerspot.com/products/ibm-sterling-file-gateway-pros-and-cons
10. PeerSpot — GoAnywhere MFT vs IBM Sterling File Gateway — https://www.peerspot.com/products/comparisons/goanywhere-mft_vs_ibm-sterling-file-gateway
11. IBM Support — Security bulletin (Sterling B2B Integrator) — https://www.ibm.com/support/pages/node/7266520
12. IBM — Announcements at Think 2026 — https://www.ibm.com/new/announcements/ibm-announcements-at-think-2026

### GoAnywhere MFT (Fortra)
13. Fortra — Security advisory FI-2025-012 (CVE-2025-10035) — https://www.fortra.com/security/advisories/product-security/fi-2025-012
14. Microsoft Security Blog — Investigating active exploitation of CVE-2025-10035 GoAnywhere MFT (Oct 2025) — https://www.microsoft.com/en-us/security/blog/2025/10/06/investigating-active-exploitation-of-cve-2025-10035-goanywhere-managed-file-transfer-vulnerability/
15. The Hacker News — From detection to patch: Fortra reveals timeline — https://thehackernews.com/2025/10/from-detection-to-patch-fortra-reveals.html
16. Cyber Daily — Security expert questions Fortra's response to GoAnywhere vulnerability — https://www.cyberdaily.au/security/12713-security-expert-questions-fortra-s-response-to-latest-goanywhere-mft-vulnerability
17. watchTowr Labs — GoAnywhere CVE-2025-10035 analysis — https://labs.watchtowr.com/is-this-bad-this-feels-bad-goanywhere-cve-2025-10035/
18. CPO Magazine — Clop ransomware breaches 130 organizations, 1 million CHS patient records — https://www.cpomagazine.com/cyber-security/clop-ransomware-breaches-130-organizations-steals-1-million-chs-healthcare-patients-records/
19. HHS HC3 — Clop allegedly targeting healthcare industry (sector alert PDF) — https://www.hhs.gov/sites/default/files/clop-allegedly-targeting-healthcare-industry-sector-alert.pdf
20. Fortra — GoAnywhere MFT release notes — https://hstechdocs.helpsystems.com/releasenotes/Content/_ProductPages/GoAnywhere/GAMFT.htm
21. GoAnywhere — Gateway: how it works — https://www.goanywhere.com/products/goanywhere-gateway/how-it-works
22. Fortra — GoAnywhere MFT datasheet — https://www.fortra.com/resources/datasheets/goanywhere-mft
23. GoAnywhere — MFTaaS — https://www.goanywhere.com/products/mftaas
24. PeerSpot — GoAnywhere MFT pricing and cost experiences — https://www.peerspot.com/questions/what-is-your-experience-regarding-pricing-and-costs-for-fortra-s-goanywhere-mft

### Kiteworks
25. Kiteworks — FedRAMP authorization — https://www.kiteworks.com/platform/compliance/fedramp-authorization/
26. Kiteworks press — FedRAMP High Ready status for Secure Gov Cloud — https://www.kiteworks.com/company/press-releases/kiteworks-achieves-fedramp-high-ready-status-for-secure-gov-cloud-expanding-federal-security-capabilities/
27. Kiteworks — Managed file transfer solution — https://www.kiteworks.com/managed-file-transfer-solution/
28. Kiteworks — Hardened virtual appliance — https://www.kiteworks.com/platform/security/hardened-virtual-appliance/
29. Kiteworks — Secure MCP / AI integration — https://www.kiteworks.com/platform/security/mcp-ai-integration/
30. Kiteworks — HIPAA compliance — https://www.kiteworks.com/platform/compliance/hipaa-compliance/
31. LinkedIn (Kiteworks UK) — Secure MFT Server v9.4 Drummond AS2 certification — https://www.linkedin.com/posts/kiteworksuk_kiteworks-secure-mft-server-v94-just-earned-activity-7474737328935170049-Uzi3
32. Wikipedia — Kiteworks (Accellion history, FTA breach) — https://en.wikipedia.org/wiki/Kiteworks
33. TechCrunch — Kiteworks captures $456M at a $1B valuation (Aug 2024) — https://techcrunch.com/2024/08/14/kiteworks-captures-456m-at-a-1b-valuation-to-help-secure-sensitive-data/
34. Strix — CVE-2025-53939 (Kiteworks) — https://www.strix.ai/cve/CVE-2025-53939
35. PeerSpot — Kiteworks reviews — https://www.peerspot.com/products/kiteworks-reviews
36. G2 — Kiteworks pricing — https://g2.com/products/kiteworks/pricing

### Snowflake Secure Data Sharing
37. Snowflake docs — Introduction to Secure Data Sharing — https://docs.snowflake.com/en/user-guide/data-sharing-intro
38. Snowflake docs — Listings auto-fulfillment — https://docs.snowflake.com/en/collaboration/provider-listings-auto-fulfillment
39. Snowflake docs — Understanding auto-fulfillment costs — https://docs.snowflake.com/en/collaboration/provider-understand-cost-auto-fulfillment
40. Snowflake docs — Egress Cost Optimizer — https://docs.snowflake.com/en/collaboration/provider-listings-auto-fulfillment-eco
41. Snowflake docs — Override share restrictions — https://docs.snowflake.com/en/user-guide/override_share_restrictions
42. Snowflake docs — Snowflake editions — https://docs.snowflake.com/en/user-guide/intro-editions
43. Snowflake docs — Create reader accounts — https://docs.snowflake.com/en/user-guide/data-sharing-reader-create
44. Snowflake docs — LISTING_ACCESS_HISTORY view — https://docs.snowflake.com/en/sql-reference/data-sharing-usage/listing-access-history
45. Snowflake release notes — Listing observability GA (Feb 2026) — https://docs.snowflake.com/en/release-notes/2026/other/2026-02-02-listing-observability-ga
46. Snowflake release notes — Data security Trust Center GA (Apr 2026) — https://docs.snowflake.com/en/release-notes/2026/other/2026-04-24-data-security-trust-center-ga
47. Snowflake docs — Data Clean Rooms introduction — https://docs.snowflake.com/en/user-guide/cleanrooms/introduction
48. NIST CMVP — Snowflake FIPS Provider security policy (cert 4924) — https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4924.pdf

### AWS Transfer Family / B2B Data Interchange
49. AWS — Transfer Family pricing — https://aws.amazon.com/aws-transfer-family/pricing/
50. AWS — Transfer Family FAQs — https://aws.amazon.com/aws-transfer-family/faqs/
51. AWS docs — Transfer Family security policies (FIPS) — https://docs.aws.amazon.com/transfer/latest/userguide/security-policies.html
52. AWS docs — Transfer Family managed workflows — https://docs.aws.amazon.com/transfer/latest/userguide/transfer-workflows.html
53. AWS docs — SFTP connectivity issues (S3 single-connection note) — https://docs.aws.amazon.com/transfer/latest/userguide/sftp-connectivity-issues.html
54. AWS Security Blog — How Transfer Family can help you build a secure, compliant MFT solution — https://aws.amazon.com/blogs/security/how-transfer-family-can-help-you-build-a-secure-compliant-managed-file-transfer-solution/
55. AWS What's New — SFTP connectors VPC-based connectivity (Oct 2025) — https://aws.amazon.com/about-aws/whats-new/2025/10/aws-transfer-family-sftp-connectors-vpc-based-connectivity/
56. AWS What's New — SFTP credential rotation (Sept 2026) — https://aws.amazon.com/about-aws/whats-new/2026/09/transfer-family-sftp-credential-rotation/
57. AWS What's New — SFTP source IP preservation behind NLB (Sept 2026) — https://aws.amazon.com/about-aws/whats-new/2026/09/transfer-family-sftp-source-ip-nlb/
58. AWS What's New — AS2 asynchronous MDNs (Mar 2026) — https://aws.amazon.com/about-aws/whats-new/2026/03/aws-transfer-family-as2-mdns/
59. AWS — B2B Data Interchange FAQs — https://aws.amazon.com/b2b-data-interchange/faqs
60. AWS — B2B Data Interchange pricing — https://aws.amazon.com/b2b-data-interchange/pricing/

### Secure FTP (current state) and MFT-vs-SFTP background
61. OpenBSD man page — sftp(1) — https://man.openbsd.org/sftp
62. OpenBSD man page — sftp-server(8) — https://man.openbsd.org/sftp-server
63. OpenSSH — Post-quantum cryptography — https://www.openssh.org/pq.html
64. Red Hat docs — Switching RHEL 9 to FIPS mode — https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/security_hardening/switching-rhel-to-fips-mode_security-hardening
65. Qualys — regreSSHion: remote unauthenticated code execution in OpenSSH server (CVE-2024-6387) — https://blog.qualys.com/vulnerabilities-threat-research/2024/07/01/regresshion-remote-unauthenticated-code-execution-vulnerability-in-openssh-server
66. IBM Think — MFT vs SFTP — https://www.ibm.com/think/topics/mft-vs-sftp
67. Kiteworks — MFT vs SFTP security differences (vendor-authored) — https://www.kiteworks.com/managed-file-transfer/mft-vs-sftp-security-differences/
68. OPSWAT — Managed file transfer for healthcare (vendor-authored) — https://www.opswat.com/blog/managed-file-transfer-for-healthcare
69. ComplyCreate — 2026 HIPAA changes roundup — https://complycreate.com/updates/2026-hipaa-changes-roundup

---

*Prepared September 2026 for the Enterprise Architecture team. Scores are research-based estimates from public sources. Before any selection decision, verify the following through a vendor PoC, security review and contract review:*
- *items marked "unconfirmed" or "flag";*
- *all BAA, FIPS and TLS 1.3 positions;*
- *vendor security track records;*
- *the HIPAA Security Rule final-rule status.*
