# Prompt — Vendor Comparison per Data Integration Pattern

**Saved:** 2026-09-24
**Outputs produced:** `OUTPUTS/ipaas/compare_elt_vendors.md` (ELT/ETL), `OUTPUTS/ipaas/compare_cdc_vendors.md` (CDC Replication), `OUTPUTS/ipaas/vendor_compare_data_virt.md` (Data Virtualization), `OUTPUTS/ipaas/compare_mdm_vendors.md` (Master Data Management), `OUTPUTS/ipaas/compare_mft_vendors.md` (Managed File Transfer), `OUTPUTS/ipaas/compare_pipe_orch_vendors.md` (Pipeline Orchestration)
**Input used:** `INPUTS/snowflake_ai/data_integration_patterns.md`
**Reusable for:** CDC Replication, Data Virtualization, Master Data Management, Managed File Transfer, Pipeline Orchestration (swap the pattern name, section headers and output file name)

---

## 1. Original prompt (user, verbatim)

> i have added a markdown file under INPUTS/snowflake_ai/data_integration_patterns.md; i want you to read this file and use it as input for the task; from this file read the section
>
> ```markdown
> #### Part 1: Top 10 Features & Capabilities for Enterprise ELT/ETL
> ```
>
> and the ten features listed, described that defines what top 10 capabilities are expected from an Enterprise ELT, ETL platform; using these definitions, i want you to search on internet and company websites and reviews for following vendors: Informatica IDMC, Azure Data Factory, AWS Glue, Fivetran, Snowflake OpenFlow, dbt and also compare it with technologies used within the company which are Boomi,  AbInitio and Py Spark (3 technologies);  you should save this report as compare_elt_vendors.md in OUTPUTS/ipaas folder; have in this file following sections: first section should arrange information gathered for each vendor on the 10-desired-features and also this vendors pro's and con's as found on internet research, arrange this info per vendor sequentially and also provide similar for the 3 technologies used in the enterprise currently; after this have a separate section for comparison, for this make use of  the matrix from this section
>
> ```markdown
> #### Part 2: Feature-Specific Scoring Matrix (The Top 10 Capabilities)
> ```
>
> from the data_integration_patterns file and provide the tabular comparison; in a separate line below this table provide your analysis on which of this vendors or current technologies are best fit in this Integration pattern; i also want you to save our current conversation into a separate prompt markdown file under "INPUTS/snowflake_ai" and name it as prompt_vendor_compare_elt.md; after doing this task i will be asking you to repeat the same for remaining Data Integration patterns : CDC Replication, Data Virtualization, Master Data Management, Managed File Transfer and Pipeline Orchestration; details of each of these and their comparison matrices are provided in the same input file, data_integration_patterns.md; for now complete this task for "ELT ETL data integration" ; after you complete this task i will as you to repeat the prompt for the next data integration pattern.

## 2. Follow-up instruction (user, mid-task, verbatim)

> in the above prompt, please add a bibliography of every website, resource that you found and used for your analysis in the output file

---

## 3. How Claude executed it (for repeatability)

1. **Read the input file.**
   - Extracted Part 1, the 10 ELT/ETL features.
   - Extracted the 0–4 scoring scale.
   - Extracted Part 1 of the weighting model: the strategic pillars.
   - Extracted Part 2, the feature scoring matrix, where each feature is weighted 10%.
   - Extracted Part 3, the qualitative risk template.
2. **Researched in parallel** with three research agents, each covering three products:
   - Informatica IDMC, Azure Data Factory (with a note on Fabric), AWS Glue.
   - Fivetran, Snowflake Openflow, dbt.
   - Boomi, Ab Initio, PySpark (the current enterprise technologies).

   For every product, each agent returned:
   - Evidence for each of the 10 features, with a 0–4 score.
   - 5–7 pros and 5–7 cons drawn from PeerSpot, G2, TrustRadius, Gartner and practitioner blogs.
   - A one-line pricing model.
   - The source URLs it used.

   The research drew on vendor docs and release notes current to September 2026.
3. **Wrote `OUTPUTS/ipaas/compare_elt_vendors.md`** with these sections:
   - **Section 1 — Profiles.** One subsection per market vendor, in sequence, followed by one per current enterprise technology. Each has a 10-feature evidence table with scores, then pros, cons and pricing.
   - **Section 2 — Comparison.**
     - 2.1: raw score matrix in the Part 2 format.
     - 2.2: weighted-score matrix with totals, normalized percentages and rank.
     - 2.3: qualitative risk and fit table in the Part 3 format.
     - 2.4: best-fit analysis.
   - **Section 3 — Bibliography.** Every URL used, grouped by vendor.
4. **Verified the arithmetic with a script.** The weighted score is score × 0.10, the total is the sum of the weighted scores (maximum 4.0), and the normalized percentage is total ÷ 4.
5. **Saved the files.** The output went to `OUTPUTS/ipaas/`, and this prompt file to `INPUTS/snowflake_ai/`.

**Conventions used:**
- Items with thin public evidence are flagged `*` / "low confidence".
- For PySpark, the score reflects the open-source engine run by the enterprise itself. A reference column, "PySpark on Databricks", is also included.
- Fabric Data Factory is noted within the ADF section, not scored separately.

---

## 4. Template prompt for the next pattern

Replace the items in `<>`:

> Read `INPUTS/snowflake_ai/data_integration_patterns.md`. Use the section `#### Part 1: Top 10 Features & Capabilities for Enterprise <PATTERN>` as the definition of the 10 desired capabilities, and the 0–4 scale.
>
> Research these on the internet, including vendor websites, docs, release notes, analyst coverage and reviews: `<VENDOR LIST>`. Also compare them with the technologies currently used in the enterprise: `<CURRENT TECH LIST>`.
>
> Save the report as `OUTPUTS/ipaas/<compare_xxx_vendors.md>` with these sections:
> 1. **Per-vendor profiles**, in sequence, then the current technologies. For each one: evidence and a score for each of the 10 features, then pros and cons from research.
> 2. **Comparison**, using `#### Part 3: <PATTERN> Feature Scoring Template (0 to 4 Scale)` from the input file (with that pattern's feature weights), as a tabular comparison with weighted totals. Below the table, give an analysis of which vendor or current technology best fits this integration pattern.
> 3. **Bibliography** of every website and resource used.
>
> Save this conversation as `INPUTS/snowflake_ai/prompt_vendor_compare_<xxx>.md`.

**Header names in the input file for each remaining pattern:**

| Pattern | Features header | Scoring matrix header |
|---|---|---|
| CDC Replication | `Part 1: Top 10 Features & Capabilities for Enterprise CDC Replication` | `Part 3: CDC Feature Scoring Template (0 to 4 Scale)` |
| Data Virtualization | `Part 1: Top 10 Features & Capabilities for Enterprise Data Virtualization` | `Part 3: Data Virtualization Feature Scoring Template (0 to 4 Scale)` |
| Master Data Management | `Part 1: Top 10 Features & Capabilities for Enterprise MDM` | `Part 3: MDM Feature Scoring Template (0 to 4 Scale)` |
| Managed File Transfer | `Part 1: Top 10 Features & Capabilities for Enterprise Managed Data Transfer` | `Part 3: Managed Data Transfer Feature Scoring Template (0 to 4 Scale)` |
| Pipeline Orchestration | `Part 1: Top 10 Features & Capabilities for Enterprise Pipeline Orchestration` | `Part 3: Pipeline Orchestration Feature Scoring Template (0 to 4 Scale)` |

> Note: for ELT/ETL the matrix is labelled "Part 2". For the other patterns it is labelled "Part 3", and "Part 2" there is the pillar weighting model.

---
---

# Pattern 2 — CDC Replication (2026-09-24)

## 5. Prompt (user, verbatim)

> please rename the above prompt file to "prompt_vendor_compare.md" removing the elt suffix; after this repeat the earlier prompt for the next data integration pattern, CDC Replication; i want you to compare the following vendors for this pattern: Qlik Replicate, Debezium, Oracle GoldenGate, Snowflake OpenFlow, Fivetran HVR and compare the current technology used Cloudera Data Platform ; save the output file for this into OUTPUTS/ipaas folder as compare_cdc_vendors.md; again here as well add the bibliography of all websites and resources at the end of the output file

## 6. How Claude executed it

1. **Renamed the file.** `prompt_vendor_compare_elt.md` became `prompt_vendor_compare.md`, which is this file. Both patterns are now logged here.
2. **Read the CDC sections of `data_integration_patterns.md`:**
   - Part 1: the top 10 CDC features.
   - Part 2: the strategic pillar weighting.
   - Part 3: the CDC feature scoring template, with each feature weighted 10%.
3. **Researched in parallel with two agents:**
   - Agent 1: Qlik Replicate, Debezium, Oracle GoldenGate.
   - Agent 2: Snowflake Openflow (CDC connectors), Fivetran HVR, and Cloudera Data Platform (the current technology).

   Each agent returned evidence and a 0–4 score for every feature, plus pros, cons, pricing and source URLs.
4. **Checked scores for consistency.** Cloudera's CDC is built on Debezium, so its log-reading and snapshot scores were aligned with Debezium's. They are flagged as low confidence because Cloudera's bundled versions lag upstream.
5. **Wrote `OUTPUTS/ipaas/compare_cdc_vendors.md`:**
   - Section 1: profiles of the five market vendors, then Cloudera.
   - Section 2: raw scores (2.1), weighted scores and totals (2.2), qualitative risk (2.3), and best-fit analysis (2.4).
   - Section 3: bibliography of 67 URLs plus the input files.
6. **Verified the arithmetic with a script.**

**Result:**

| Rank | Tool | Score |
|---|---|---|
| 1 | GoldenGate | 85% |
| 2= | Fivetran HVR | 75% |
| 2= | Debezium | 75% |
| 4= | Qlik Replicate | 67.5% |
| 4= | Cloudera CDP | 67.5% |
| 6 | Openflow | 52.5% |

**Recommendation:** a two-lane CDC standard.
- **Bulk replication:** HVR, or Qlik where mainframe sources exist, with GoldenGate only for Oracle-to-Oracle.
- **Event streaming:** Debezium, run inside Cloudera if Cloudera stays strategic.

## 7. Remaining patterns

Data Virtualization, Master Data Management, Managed File Transfer, and Pipeline Orchestration. Use the template in section 4 and the header table above.

---
---

# Pattern 3 — Data Virtualization (2026-09-24)

## 8. Prompt (user, verbatim)

> now repeat the prompt for the data integration pattern of "Data Virtualization" ; the vendors for comparison are Denodo, Starburst, Dremio, IBM Data Virtualization, TIBCO data virtualization; there is not technology used within the enterprise for this pattern; use the same input file; append additional updates to the prompt file under INPUT/snowflake_ai and save the output file under OUTPUTS/ipaas as vendor_compare_data_virt.md; do add the bibliography section here as well; it should be on each of the output files.

## 9. How Claude executed it

1. **Read the input.** From the Data Virtualization sections of `data_integration_patterns.md`: Part 1 (top 10 DV features), Part 2 (strategic pillars) and Part 3 (DV feature scoring template, with each feature weighted 10%).
2. **Researched with two agents in parallel.**
   - Agent 1 covered Denodo, Starburst and Dremio.
   - Agent 2 covered IBM Data Virtualization (Cloud Pak for Data / watsonx) and TIBCO DV (now Spotfire DV).
   - Each returned evidence and a 0–4 score per feature, pros and cons, pricing, corporate context and source URLs.
3. **No current enterprise technology.** Section 1 profiles only market vendors, and the analysis treats the choice as greenfield.
4. **Wrote the report.** Output is `OUTPUTS/ipaas/vendor_compare_data_virt.md`:
   - **Section 1:** a profile of each vendor.
   - **Section 2:** raw scores (2.1), weighted scores and totals (2.2), a qualitative risk table (2.3, with added vendor-stability and SaaS BAA rows) and a best-fit analysis (2.4).
   - **Section 3:** a bibliography of 61 URLs plus the input files.
5. **Checked the arithmetic** with a script.

**Results**

| Rank | Vendor | Score |
|---|---|---|
| 1 | Denodo | 85% |
| 2 (tie) | Starburst | 72.5% |
| 2 (tie) | IBM DV | 72.5% |
| 4 | Dremio | 70% |
| 5 | TIBCO/Spotfire DV | 57.5% |

**Recommendation:** Adopt Denodo, self-managed on Kubernetes, as the logical data fabric and the semantic/API layer. Shortlist Starburst for lake-scale federation.

**Notable market changes found:**
- SAP acquired Dremio (closed July 2026).
- TIBCO DV became Spotfire DV (December 2025) and is sold only through Spotfire.

**Convention:** Every output file ends with a Bibliography section.

## 10. Remaining patterns

Master Data Management, Managed File Transfer and Pipeline Orchestration.

---
---

# Pattern 4 — Master Data Management (2026-09-24)

## 11. Prompt (user, verbatim)

> now repeat the prompt for the data integration pattern of "Master Data Management" ; the vendors for comparison are Informatica DQ, Great Expectations, Soda, Monte Carlo, Reltio, Profisee; there is no technology used within the enterprise for this pattern; use the same input file; append additional updates to the prompt file under INPUT/snowflake_ai and save the output file under OUTPUTS/ipaas as compare_mdm_vendors.md; do add the bibliography section here as well;

## 12. How Claude executed it

1. **Read the MDM sections of `data_integration_patterns.md`:**
   - Part 1: the top 10 MDM features.
   - Part 2: the strategic pillars.
   - Part 3: the MDM feature scoring template, with each feature weighted 10%.
2. **Flagged a scoping issue.** Only Reltio and Profisee are MDM hubs. Informatica DQ, Great Expectations and Soda are data-quality tools, and Monte Carlo is a data observability tool. All six were scored against the MDM framework as requested. Each non-MDM tool also got a "Role alongside MDM" note.
3. **Added a reference column.** Informatica DQ was scored as named. A reference column shows how the score changes when Informatica MDM SaaS (Healthcare 360) is licensed alongside it.
4. **Researched in parallel with two agents:**
   - Agent 1: Reltio, Profisee, and Informatica DQ (including the MDM SaaS context).
   - Agent 2: Great Expectations, Soda and Monte Carlo.
5. **Wrote the output file** `OUTPUTS/ipaas/compare_mdm_vendors.md`:
   - Section 1 profiles the MDM hubs first, then the DQ and observability tools.
   - Section 2 covers raw scores (2.1), weighted scores and totals (2.2), the qualitative risk table (2.3, including a row on whether each product is actually an MDM hub) and the best-fit analysis (2.4).
   - Section 3 is the bibliography: 63 URLs plus the input files.
6. **Verified the arithmetic with a script.**

**Results:**

| Product | Score |
|---|---|
| Reltio | 87.5% |
| *Reference: Informatica DQ + MDM SaaS* | *85%* |
| Profisee | 72.5% |
| Informatica DQ alone | 57.5% |
| Monte Carlo | 42.5% |
| Soda | 35% |
| Great Expectations | 22.5% |

**Recommendation:**
- Run a head-to-head PoC of Reltio against Informatica MDM SaaS, with Profisee as the portable/Fabric alternative.
- Use Soda (or dbt tests) for data contracts and Monte Carlo for observability. These complement the MDM hub rather than replace it.

**Notable market changes found:**
- SAP acquired Reltio (closed May 2026).
- GX Cloud was sold to FICO and discontinued on 1 June 2026. Fivetran now stewards the open-source GX Core.

## 13. Remaining patterns

- Managed File Transfer
- Pipeline Orchestration

---
---

# Pattern 5: Managed File Transfer (2026-09-24)

## 14. Prompt (user, verbatim)

> now repeat the prompt for the data integration pattern of "Managed File Transfer" ; the vendors for comparison are IBM Sterling, GoAnywhere MFT, Kiteworks, Snowflake DataShare, AWS Transfer Family; within the enterprise we use Secure FTP as the technology for this pattern; use the same input file; append additional updates to the prompt file under INPUT/snowflake_ai and save the output file under OUTPUTS/ipaas as compare_mft_vendors.md; do add the bibliography section here as well;

## 15. How Claude executed it

1. **Read the input.** Took the Managed Data Transfer sections of `data_integration_patterns.md`: Part 1 (the top 10 features), Part 2 (the strategic pillars) and Part 3 (the scoring template, with each feature weighted at 10%).
2. **Researched in parallel with two agents.**
   - Agent 1 covered IBM Sterling, GoAnywhere MFT (including its CVE history) and Kiteworks.
   - Agent 2 covered AWS Transfer Family (plus B2B Data Interchange), Snowflake Secure Data Sharing, and the current Secure FTP setup (typical self-managed OpenSSH plus cron scripts).
3. **Flagged scope issues in the report.**
   - Snowflake "DataShare" is zero-copy data sharing, not MFT. It was scored honestly against the MFT criteria, and the analysis positions it as a way to remove file transfers entirely for partners who are on Snowflake.
   - Each vendor's security track record was added as a separate qualitative risk row, alongside the feature scores.
4. **Wrote `OUTPUTS/ipaas/compare_mft_vendors.md`.**
   - Section 1: profiles of the 5 market vendors, then the current Secure FTP setup.
   - Section 2: raw scores (2.1), weighted scores and totals (2.2), a qualitative risk table (2.3) and the best-fit analysis (2.4).
   - Section 3: a bibliography of 69 URLs plus the input files.
5. **Checked the arithmetic** with a script.

**Result**

| Option | Score |
|---|---|
| IBM Sterling | 77.5% |
| GoAnywhere | 67.5% |
| Kiteworks | 67.5% |
| AWS Transfer Family | 65% |
| Snowflake Sharing | 57.5% |
| Secure FTP (current) | 25% |

**Recommendation: retire Secure FTP in layers.**
- Core system-to-system MFT: AWS Transfer Family plus B2B Data Interchange if the stack is AWS/S3 → Snowflake, or IBM Sterling if Connect:Direct, AS2 and X12 dominate.
- Snowflake Sharing for Snowflake-connected partners.
- Kiteworks for person-to-person PHI exchange.
- HL7 over MLLP goes to the interface engine.
- GoAnywhere is not recommended for PHI, because ransomware groups exploited admin-console zero-days in 2023 and again in 2025.

## 16. Remaining patterns

- Pipeline Orchestration

---
---

# Pattern 6: Pipeline Orchestration (2026-09-25)

## 17. Prompt (user, verbatim)

> now repeat the prompt for the data integration pattern of "Pipeline Orchestration" ; the vendors for comparison are Apache Airflow, Snowflake OpenFlow, Prefect, Azure Data Factory, AWS Step Functions; there is no technology used within the enterprise for this pattern; use the same input file; append additional updates to the prompt file under INPUT/snowflake_ai and save the output file under OUTPUTS/ipaas as compare_pipe_orch_vendors.md; do add the bibliography section here as well;

## 18. How Claude executed it

1. **Read the input.** Took the Pipeline Orchestration sections of `data_integration_patterns.md`: Part 1 (the top 10 features), Part 2 (the strategic pillars) and Part 3 (the scoring template, with each feature weighted 10%).
2. **Researched in parallel with two agents.**
   - Agent 1: Apache Airflow (open-source 3.x plus Astronomer, MWAA and Google Managed Airflow), Prefect, and Snowflake Openflow scored as an orchestrator.
   - Agent 2: Azure Data Factory (including the deprecation of its managed Airflow and its relationship to Fabric) and AWS Step Functions.
3. **Flagged scoping points in the report.**
   - Openflow is an ingestion service built on NiFi, not a general DAG orchestrator.
   - Airflow's AI remediation score of 3 applies only with Astronomer (open-source alone would total 82.5%).
   - ADF's Workflow Orchestration Manager has not accepted new instances since 1 Jan 2026.
4. **Wrote `OUTPUTS/ipaas/compare_pipe_orch_vendors.md`.**
   - Section 1: a profile of each vendor.
   - Section 2: raw scores (2.1), weighted scores and totals (2.2), a qualitative risk table (2.3) and a best-fit analysis (2.4).
   - Section 3: a bibliography of 53 URLs plus the input files.
5. **Verified the arithmetic** with a script.

**Result:**

| Vendor | Score |
|---|---|
| Airflow | 87.5% |
| Prefect | 75% |
| Step Functions | 65% |
| ADF | 60% |
| Openflow | 52.5% |

**Recommendation:**
- Use Airflow 3.x on Astronomer as the enterprise control plane, with MWAA or Google Managed Airflow as alternatives.
- Use Step Functions or ADF/Fabric for cloud-local sub-flows.
- Openflow and Snowflake Tasks/dbt should be triggered or watched by Airflow.

## 19. Status

All six data integration patterns are complete:

- ELT/ETL
- CDC
- Data Virtualization
- MDM
- MFT
- Pipeline Orchestration
