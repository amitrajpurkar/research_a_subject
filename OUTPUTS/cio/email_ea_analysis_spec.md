# Specification: Leadership Communication Analysis for Enterprise Architecture

**Version:** 1.0 (2026-09-28)
**Owner:** Amit (Enterprise Architecture)
**Reference outputs:** `cio_email_ea_analysis.md` (report) and `cio_email_ea_summary.pptx` (deck) in this folder

---

## 1. Purpose

This spec lets anyone on the EA team get a consistent, repeatable analysis of a leadership communication (for example, the CIO's technology strategy email) from an AI assistant. The analysis is always done through the lens of the **EA core values** set by the CIO and new leadership.

Running the prompt produces two outputs:

1. **An analysis report** (Markdown): what the message says, what it likely means for EA, how it maps to EA core values, and what EA should do.
2. **A summary deck** (about 10 slides) built from that report.

---

## 2. Before You Run It

- **Use an enterprise-approved AI tool only.** The email is an internal communication. Do not paste it into a personal or public AI account. (The CIO email itself stresses using AI safely and responsibly.)
- **Save the email as plain text.** Copy the full email body into a `.txt` file, including the subject line, sender, and date if available. Check that nothing is cut off. The original run worked from screenshots, and a missing section had to be flagged as a gap.
- **Review before sharing.** The "underlying intent" section is interpretation, not fact. Read it critically before forwarding it to anyone outside the EA team.

---

## 3. Inputs

| # | Input | Required | Example / default |
|---|---|---|---|
| 1 | **Email text file** | Yes | `INPUTS/cio/cio_email.txt` |
| 2 | **EA core values and mission** | Yes | Use the block in §3.1 as written unless leadership changes it |
| 3 | **Team's in-flight initiatives** | Optional | Recommendations can then refer to existing work, e.g. "AI pattern standardization; data integration rationalization" |
| 4 | **Output format for the deck** | Optional | Default: PowerPoint (.pptx) |

### 3.1 EA core values context (paste as written)

```
Core values expected from the Enterprise Architecture team by the CIO and new leadership:
- Predictable
- Cost efficient
- Stability
- Future proof
- Frictionless (people / technology)
- HIGH VELOCITY

EA mission, in one sentence:
"EA is the business enabler delivering value quickly at the right time in a secure and cost-efficient way."
```

---

## 4. Analysis Rules (What the AI Must Do)

1. **Stay faithful to the source.** Summarize and quote only what is in the email text. Quote exact phrases in double quotes when citing evidence.
2. **Separate fact from interpretation.** Clearly label anything inferred ("our reading", "likely intent"). Never present an inference as something the email says.
3. **Do not invent people, titles, dates, or numbers.** If a name or title is incomplete or unclear, say so.
4. **Flag gaps.** If the text looks truncated or a section seems to be missing, add a "Source gap" note at the top of the report.
5. **Note what is not said.** Absences (no named leader, no metrics, no timeline) are useful signals. Report them as observations, not conclusions.
6. **Use the core values as the lens.** Every recommendation should be traceable to at least one core value.
7. **Name the tensions.** Point out where the email's mandate and the core values pull in different directions (for example, governance vs. velocity), and propose how to resolve them.
8. **Write in business-outcome language.** Use terms like time saved, cost avoided, risk reduced, and experiences enabled, not architecture jargon for its own sake.
9. **Keep it plain.** Use short sentences, active voice, no filler, and tables where they help comparison.

---

## 5. Output 1: Analysis Report (Markdown)

**File name:** `<topic>_ea_analysis.md`
**Length:** about 1,500–2,500 words

Required sections, in order:

| # | Section | What it must contain |
|---|---|---|
| 0 | **Header** | Source (sender, subject, date if known), audience (EA team), date prepared, and a source-gap note if needed |
| 1 | **Executive summary** | 1 paragraph on the email's thesis, 3 numbered points on what it means for EA, and a 2–3 sentence statement of the underlying intent |
| 2 | **What the email says** | Table: *Section / Key message / Named leader*. One row per email section, faithful to the source |
| 3 | **Reading between the lines** | 4–6 short subsections on underlying intent (e.g., the organizing theme, how EA is positioned, speed expectations, cost and consolidation, collaboration), followed by a "What is *not* said" list |
| 4 | **Mapping to EA core values** | Table: *Core value / Evidence in the email (quoted) / What EA must deliver*. One row per core value, plus "Secure" from the mission sentence. Then name the main tension and any secondary tension, with a proposed resolution for each |
| 5 | **Implications for EA** | 4–6 numbered implications, each one sentence to two sentences |
| 6 | **Recommended actions** | Three horizons: **Now (0–30 days)**, **Next (30–90 days)**, **Later (90+ days)**. 3–5 actions each. Refer to in-flight initiatives (Input 3) where relevant |
| 7 | **Proposed EA scorecard** | Table: *Core value / Metric*. At least one measurable metric per value |
| 8 | **Open questions for leadership** | 4–6 questions EA should clarify (mandate, decision rights, scope, measures, ownership) |
| 9 | **Bottom line** | 2–3 sentences ending with the EA mission statement |

---

## 6. Output 2: Summary Deck

**File name:** `<topic>_ea_summary.pptx` (or the format chosen in Input 4)
**Length:** 8–10 slides, one main message per slide
**Source:** built only from the report in Output 1, with no new claims

| Slide | Title (adapt as needed) | Content |
|---|---|---|
| 1 | Title slide | A headline that captures the core insight (e.g., "Making the safe path the fast path") and a subtitle |
| 2 | What the leader said | The vision statement plus one card per email section. Highlight the EA section |
| 3 | EA's explicit mandate | The exact EA quote from the email, with the focus areas it names |
| 4 | Reading between the lines | 4–6 intent statements, each with a one-line explanation. Add a footnote on what was not said |
| 5 | Mapping to EA core values | The condensed values table from the report |
| 6 | The tension to resolve | Two sides (e.g., email mandate vs. leadership values) with the resolution between them |
| 7 | Recommended actions | Now / Next / Later timeline |
| 8 | Proposed EA scorecard | One tile per core value with its metric |
| 9 | Open questions for leadership | Numbered questions |
| 10 | Bottom line | Closing message and the EA mission statement |

**Design guidance:** Use a clean, professional look with dark title and closing slides and light content slides. Give every slide a visual element (icon, table, timeline, or cards) and avoid text-only bullet slides. Put the source-gap note and other caveats in the speaker notes.

---

## 7. Acceptance Checklist

Before sharing, confirm:

- [ ] Every quote in the report appears word for word in the email text file
- [ ] No names, titles, or figures appear that are not in the source
- [ ] Inferences are labeled as such
- [ ] All six core values plus "Secure" are mapped, each with evidence and an EA deliverable
- [ ] At least one tension is named, with a resolution
- [ ] Every recommended action traces to a core value
- [ ] The scorecard has a measurable metric for each value
- [ ] The deck says nothing the report does not
- [ ] Any source gaps are flagged in both the report and the deck notes

---

## 8. The Prompt (Copy and Paste)

Attach or paste the email text file, fill in the `{{placeholders}}`, and run.

```
You are a senior enterprise architecture advisor. Analyze the leadership
communication below for the Enterprise Architecture (EA) team, using the EA core
values as the lens.

## INPUT 1 — Email text
{{Paste the full email text here, or attach the .txt file and write "see attached file"}}

## INPUT 2 — EA core values and mission
Core values expected from the EA team by the CIO and new leadership:
Predictable; Cost efficient; Stability; Future proof; Frictionless
(people / technology); HIGH VELOCITY.
Mission: "EA is the business enabler delivering value quickly at the right time
in a secure and cost-efficient way."

## INPUT 3 — Our in-flight initiatives (optional)
{{e.g., AI pattern standardization; data integration rationalization — or "none"}}

## RULES
1. Quote the email exactly when citing evidence. Do not invent names, titles,
   dates, or numbers.
2. Clearly label anything inferred as interpretation ("our reading").
3. If the text looks truncated or incomplete, add a "Source gap" note at the top.
4. Note what the email does NOT say (e.g., no named leader, no metrics).
5. Tie every recommendation to at least one core value.
6. Name the tensions between the email's mandate for EA and the core values,
   and propose a resolution.
7. Use business-outcome language. Use plain, concise sentences and tables where helpful.

## TASK 1 — Analysis report (Markdown, ~1,500–2,500 words)
Produce these sections in order:
0. Header: source, audience, date, source-gap note if needed
1. Executive summary: email thesis; 3 numbered points on what it means for EA;
   underlying intent in 2–3 sentences
2. What the email says: table of Section | Key message | Named leader
3. Reading between the lines: 4–6 intent themes, plus "What is not said"
4. Mapping to EA core values: table of Core value | Evidence (quoted) |
   What EA must deliver. Cover all six values plus "Secure". Then name the
   main and secondary tensions, with resolutions
5. Implications for EA: 4–6 numbered points
6. Recommended actions: Now (0–30 days), Next (30–90 days), Later (90+ days),
   3–5 each
7. Proposed EA scorecard: table of Core value | Metric
8. Open questions for leadership: 4–6
9. Bottom line: 2–3 sentences ending with the EA mission statement

## TASK 2 — Summary deck ({{PowerPoint .pptx / other}}, 8–10 slides)
Build only from the report. Do not add new claims. One message per slide:
1 Title (headline insight) · 2 What the leader said (section cards, EA
highlighted) · 3 EA's explicit mandate (exact quote + focus areas) ·
4 Reading between the lines · 5 Core values mapping table · 6 The tension to
resolve (two sides + resolution) · 7 Now/Next/Later actions · 8 EA scorecard ·
9 Open questions · 10 Bottom line + mission statement.
Give every slide a visual element (icons, cards, table, or timeline). Put
caveats and source gaps in the speaker notes.

## FINAL CHECK
Before answering, confirm that every quote appears word for word in the email,
no facts were invented, and all six core values plus "Secure" are mapped.
```

---

## 9. Adapting the Spec

- **A different leadership email:** Replace Input 1. The rest of the spec still applies.
- **Updated core values:** Edit §3.1 and the prompt's Input 2 together so they stay in sync.
- **A different audience** (e.g., a brief for the CIO instead of the EA team): Change the audience in the header, and in the deck replace "Open questions for leadership" with "Asks / decisions needed".
