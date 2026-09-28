# EA Pattern & Vendor Evaluation — Workflows

Full specification: `INPUTS/snowflake_ai/SPEC_pattern_vendor_evaluation.md` (§10 lists every workflow argument).

Run the workflows **in order**, and review each step's output before starting the next one.

| # | Workflow | Output |
|---|---|---|
| 1 | `ea-01-pattern-capabilities` | `<prefix>_capabilities_scoring_templates.md` |
| 2 | `ea-02-vendor-compare` | `compare_<slug>_vendors.md` × 6 |
| 3 | `ea-03-deck-markdown` | `<prefix>_patterns_deck.md` + `.json` |
| 4 | `ea-04-deck-pptx` | `<prefix>_patterns_deck.pptx` (light pastel) |

**Claude Code (started in the project root):** first copy these scripts into `.claude/workflows/` (`mkdir -p .claude/workflows && cp INPUTS/snowflake_ai/workflows/ea-0*.js .claude/workflows/`). Then ask Claude to *"run workflow ea-01-pattern-capabilities with args {…}"*. Claude Code finds the workflows by name in `.claude/workflows/`.

**Claude Cowork / other hosts:** ask Claude to run the workflow using `scriptPath` pointing to the file in this folder. If the project folder is on a linked computer, the agents reach it through the linked-computer tools.

If a run stops partway (for example, because of a rate limit), resume it with `resumeFromRunId`. Agents that already finished are cached and won't run again.
