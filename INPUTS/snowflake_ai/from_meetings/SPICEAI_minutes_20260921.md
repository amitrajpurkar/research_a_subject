# Spice.ai Session — Meeting Minutes

**Date:** September 21, 2026, 3:01 PM EDT
**Participants:**
- Spice.ai: Luke Kim (Founder & CEO), Vladislav Semenov (Founding Sales)
- EA team: Amit Rajpurkar and several team members

---

## 1. Spice.ai Background

- Luke Kim spent 13 years at Microsoft, most recently in the Azure CTO's office (Azure Incubations).
  - Built the infrastructure behind GitHub Actions, which launched to become the world's largest build system in its first week.
  - Built big data and AI platforms including Azure monitoring and Xbox/Windows telemetry systems.
- Founded Spice in 2021, motivated by work on next-gen platform architecture alongside the OpenAI partnership.

## 2. What Spice Does

- Core problem: enterprises have 100+ operational databases (MySQL, Postgres, MongoDB, etc.) served by slow pipelines (Spark, Airflow, Databricks, Snowflake).
  - One customer had 120 teams, each needing a separate pipeline taking 3 months to build, with 80+ still to go.
  - AI agents now need data 24/7 at low latency rather than on a daily batch cadence.
- Spice acts as a lightweight data lakehouse/trusted proxy between operational data and agent endpoints:
  - ~40 connectors to operational databases, file shares, FTP, CSVs, cloud and on-prem sources.
  - Federation (zero-copy pushdown) or real-time CDC replication directly off binlogs/WAL.
  - Declarative config (checked into Git) defines exactly what data each agent gets.
  - Accelerations: an optional embedded DB (DuckDB, SQLite, or Spice's own Vortex-based engine) for fast local working sets.
- Serves data via JDBC/ODBC, Arrow Flight SQL, HTTP, MCP server/client, OpenAI-compatible inference APIs, and hybrid search (BM25 + vector via Tantivy).
- Policy engine (Cedar policy, from AWS) is integrated directly into the query planner:
  - Row/column filtering enforced at the query plan level, unified across all back-end sources.
  - Policy features are enterprise-edition only; the core engine is open source.

## 3. Key Differentiators vs. Snowflake

- Lightweight enough to spin up one isolated instance per agent (physical isolation, not just RBAC) — one customer is deploying millions of agent instances.
- Runs anywhere: on-prem, air-gapped, cross-cloud, edge.
- Significantly more cost-effective than Snowflake.
- Observed shift from federation toward CDC replication (Twilio, a large customer, is making this move for data freshness).
- Catalog integration supported with Unity Catalog, Snowflake, and AWS Glue.

---

## Action Items

| Owner | Item | Due Date |
|---|---|---|
| Vladi Semenov | Coordinate scheduling a product demo for the EA team | Target: next week or the week after |
| Amit Rajpurkar | Have a team member reach out to confirm attendees for the demo | Not specified |

## Key Decisions

- No decisions were formally recorded in this session; this was a vendor introduction/overview meeting.

## Open Questions

- Who from the EA team will attend the product demo, and on which date (next week vs. the week after)?
- How would Spice.ai's policy engine and connector set map onto our existing operational databases and pipelines?
