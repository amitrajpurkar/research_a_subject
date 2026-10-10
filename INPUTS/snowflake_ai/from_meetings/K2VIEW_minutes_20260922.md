# K2View Session — Meeting Minutes

**Date:** September 22, 2026, 1:58 PM EDT
**Participants:** Amit Rajpurkar; K2View team

---

## 1. K2View Overview

- 16-year-old data product platform serving large enterprises (Telco: AT&T, Verizon; Retail: Walmart, TJX; Finance: Charles Schwab).
- Two core use cases, roughly 50/50 revenue split:
  - Test data, synthetic data, anonymization, AI agent evaluation.
  - Agentic/operational real-time use cases (focus of this session).
- Explicitly not an analytics platform — no BigQuery/Snowflake-style slice-and-dice.

## 2. Microdatabase Architecture

- Core concept: one micro database per business entity (member, policy, claim, etc.).
  - Example: 30M members = 30M micro databases, each holding only that entity's data.
  - 1M–10M data points per instance; compressed ~90–95% and stored on S3/Azure Blob.
- On query, the compressed blob loads into RAM in 1–2ms as a fully in-memory database.
  - Query times shown in the demo: 1–18ms.
  - No large table scans, no I/O bottlenecks.
- Each micro database is encrypted with its own unique key (e.g., 40M members = 40M distinct encryption keys, even in RAM).
- Schema changes deploy in under 1 second via lazy upgrade.
  - On read, the system checks version and upgrades that instance dynamically.
  - Historical versioning available — can reconstruct a member's data as of any past point.

## 3. Data Synchronization and Freshness

- Four sync modes per object: cached (use what's stored), forced (fetch live now), delta (sync only changes), on-demand.
- Supports stream ingestion via GoldenGate, Debezium, Kafka, and nightly batch.
- Predictive sync: system learns query patterns and pre-fetches likely next data points (e.g., a balance query triggers proactive sync of credit limit and recent transactions).
- Write-back supported: changes propagate to underlying systems of record, not just the micro database.

## 4. Fit for Member 360 Use Case

- Architecture is well-suited to member-centric operational queries — the "member 360" framing resonated.
- Structured as a tree rooted at the business entity, pulling from CRM, claims, policies, etc.
- Supports structured, semi-structured (JSON, XML), and unstructured (PDFs, documents) data.
- Handles real-time entity resolution well; batch fuzzy matching remains Trillium's strength.
  - K2View can integrate with existing Trillium output rather than replace it.
  - K2View adds value where real-time correlation to the right member is needed on an event.

## 5. Platform Capabilities and Delivery

- Data product creation via natural-language chat interface; visual tooling auto-generated.
  - Low/no-code: describe the questions you want answered, system recommends data product and sync config.
- Exposure formats: SQL, REST, MCP, RAG, HL7, FHIR, Kafka, JSON push.
- Multi-mode delivery: push to data lake, marketing DB, or any downstream consumer.
- Runtime governance: controls what PII is shared with LLMs vs. end users.
- Business indicators: per-entity analytics stored alongside raw data for reuse.

---

## Action Items

| Owner | Item | Due Date |
|---|---|---|
| Amit / team | Schedule a ~45-minute follow-up session with K2View on test data, synthetic data, and masking capabilities (~50% of K2View's revenue, not covered today) | Not specified |
| K2View | Provide examples of FHIR API usage with health insurance customers (team specifically asked about FHIR) | Not specified |

## Key Decisions

- No firm decisions were made; the session was informational/exploratory, focused on evaluating fit for the member 360 use case.

## Open Questions

- FHIR API usage examples with health insurance customers — pending from K2View.
- Test data / synthetic data / masking capabilities not yet reviewed — to be covered in the follow-up session.
