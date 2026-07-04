Here are the primary references for each:

## arc42

| Resource | Link | What it's for |
|---|---|---|
| Main site | https://arc42.org | Overview, philosophy, "12 sections" summary |
| Documentation portal | https://docs.arc42.org | The full manual — tips per section, examples from real systems, FAQ |
| Download page (docx/markdown/AsciiDoc/Confluence/etc.) | https://arc42.org/download | Get the actual template file in your format of choice |
| GitHub source | https://github.com/arc42/arc42-template | AsciiDoc source, Docker build for generating HTML/PDF, good if you want to fork/customize |
| Examples gallery | https://docs.arc42.org/examples/ | Real-world filled-out arc42 docs — useful to see how much detail is "enough" |
| Software Architecture Canvas (lighter-weight companion) | https://canvas.arc42.org | A one-page version if full arc42 is too heavy for smaller systems |

Created in 2005 by Gernot Starke and Peter Hruschka, free/open-source, tool-agnostic — works whether you write it in Markdown, AsciiDoc, or Word.

## dbt docs

| Resource | Link | What it's for |
|---|---|---|
| Docs concept overview | https://docs.getdbt.com/docs/build/documentation | How `description:` fields in YAML + `dbt docs generate` work |
| Generate & view command reference | https://docs.getdbt.com/docs/explore/build-and-view-your-docs | `dbt docs generate` / `dbt docs serve` walkthrough |
| dbt-docs GitHub repo | https://github.com/dbt-labs/dbt-docs | The actual static-site generator source, if you want to self-host |
| Main dbt docs hub | https://docs.getdbt.com | Everything else (models, tests, lineage) |

Note: dbt Labs is mid-transition — "dbt Docs" (the free, static-site, lineage-graph generator you'd use with dbt Core) is being layered under a newer paid "Catalog" feature in the dbt platform. If you're running dbt Core standalone (most likely for your case), `dbt docs generate && dbt docs serve` is still the relevant command — that's the free, self-hosted path.

## SchemaSpy

| Resource | Link | What it's for |
|---|---|---|
| GitHub repo | https://github.com/schemaspy/schemaspy | Source, releases, JAR/Docker downloads |
| Official site | https://schemaspy.org | Overview + link to sample output |
| Sample output | http://schemaspy.org/sample/index.html | See the generated HTML/ER-diagram report before committing |
| Read the Docs manual | https://schemaspy.readthedocs.io/en/v6.2.0/index.html | Installation, config, command-line args, JDBC driver setup |
| Docker Hub image | `schemaspy/schemaspy` on Docker Hub | Fastest way to run it — no local Java/driver setup needed |

Practical note for your case (Jiva/Care Connect/EIS): SchemaSpy needs a JDBC driver for whatever DB engine each system uses (it ships MySQL/MariaDB/Postgres/MSSQL drivers in the Docker image; anything else you supply your own driver jar via `-dp`). It's a good fit for a CI job that regenerates the ER diagram + HTML doc set on a schedule and commits/publishes the output — that's the "always current, zero manual redrawing" pattern from the earlier doc.

