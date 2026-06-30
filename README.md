# UCF Study Hub — Dhanesh's Course Research Project

A structured study workspace covering two UCF Summer 2026 courses:

- **HUM 2020** — Encountering the Humanities (Brooke Rudow)
- **ECO 2013** — Principles of Macroeconomics (Dr. Izenwasser / Dr. Underwood)

Everything here is for personal study. All submitted coursework must be written independently in your own words.

---

## What's in This Project

```
research_a_subject/
├── CLAUDE.md                          ← Claude's operating instructions for this project
├── CONFIG/                            ← Study persona and AI policy reference files
├── INPUTS/                            ← Syllabus PDFs for both courses
├── OUTPUTS/
│   ├── humanities/
│   │   ├── humanities_study_plan.md   ← Four-week HUM 2020 study plan
│   │   └── humanities_study_plan.pdf  ← Print-ready version
│   └── economics/
│       ├── macro_study_plan.md        ← Four-week ECO 2013 study plan
│       └── macro_study_plan.pdf       ← Print-ready version
└── RESEARCH/
    ├── humanities/
    │   └── bibliography.md            ← HUM 2020 resources by week
    └── economics/
        └── bibliography.md            ← ECO 2013 resources by chapter
```

---

## Getting Started — Cloning and Opening in Claude Cowork

Follow these steps once to get the project running on your laptop:

- **Clone the repository** to a folder on your computer:
  ```
  git clone <repo-url> ucf-study-hub
  ```
- **Open the Claude desktop app** and switch to Cowork mode.
- **Select the cloned folder** as your workspace — click the folder icon in Cowork, then navigate to and select the `ucf-study-hub` folder you just cloned.
- **Claude will automatically read `CLAUDE.md`** at the start of each session. This file tells Claude which courses you are studying, the AI policies for each, your study sequence, and how to behave as your study partner.
- **Start your first session** by telling Claude which course and week you want to work on — for example: *"Let's work on HUM 2020 Week 2, the Middle Passage."*

---

## Customising Your Study Plan

- **Update the week you're on** — open `OUTPUTS/humanities/humanities_study_plan.md` or `OUTPUTS/economics/macro_study_plan.md` and ask Claude to adjust the plan based on what you've already covered and what's coming up next on Webcourses.
- **Add actual weekly readings** — as Webcourses releases each week's materials, tell Claude the topic name and ask it to add a new week section to the relevant study plan with specific readings, videos, and annotation due dates.
- **Adjust the pace** — if you are ahead or behind, ask Claude to compress or expand the daily breakdown to fit your actual schedule that week.
- **Regenerate the PDFs after any update** — just say: *"Regenerate the PDF for the humanities study plan."* It will overwrite the existing file so the printed version stays current.
- **Add your own notes** — create files like `OUTPUTS/humanities/week1_notes.md` as you study. Keep these in your own words. Claude can quiz you from them or help you turn them into a revision summary (Step 4 of the study sequence).
- **Link to Webcourses readings** — paste the title and a short excerpt from each week's reading into a session note. Claude can then help you build annotation questions and key-point summaries without you uploading copyright-protected PDFs.

---

## Creating a Progress Tracker

- **Ask Claude to create a progress tracker** at the start of your first session:
  *"Create a progress tracker markdown file in OUTPUTS that covers all weeks of both courses with columns for completion status, scores, and notes."*
- **Update it after each session** — tell Claude what you completed and ask it to mark the tracker. Over time this gives you a live record of where you are across both courses.
- **Use it before exams** — ask: *"Look at my progress tracker and tell me which topics I haven't reviewed before Midterm 1."*
- **Suggested columns for HUM 2020:**
  - Week | Topic | Reading done | Annotation submitted | Activity submitted | Exam score | Notes
- **Suggested columns for ECO 2013:**
  - Week | Topic | Smartbook done | Homework done | Quiz score | Class activity done | Exam score | Notes

---

## Adding More Content as You Study

- **New weeks (Weeks 6–15 for HUM 2020)** — this project only captured the first five weeks from the syllabus PDF. As each new week opens on Webcourses, paste the topic name into your session and ask Claude to research resources and add a new section to the bibliography and study plan.
- **Exam revision summaries** — after completing your own notes for a topic (Step 3 of the sequence), ask Claude: *"Build a bullet-point revision summary from my Week 2 notes."* Save these to `OUTPUTS/<course>/revision_summaries/`.
- **Practice question logs** — after each quiz or Connect assignment, note which questions you got wrong. Ask Claude to explain the reasoning behind the correct answers, not just the answer itself.
- **Cross-course connections** — HUM 2020 and ECO 2013 overlap more than they seem (the Middle Passage has a direct economic dimension; Greek maritime trade is an early example of comparative advantage). Ask Claude to draw these connections when relevant.
- **Annotation prep for HUM 2020** — before writing your annotation, ask Claude to quiz you on the reading first. Once you can explain the key points out loud, write the annotation yourself. Claude checks your understanding; it does not write the text.
- **Flashcard generation** — ask Claude to generate a set of term-definition pairs from any week's notes. Copy these into Anki or Quizlet for spaced repetition practice before exams.
- **ECO 2013 formula sheet** — ask Claude to compile a running formula sheet from each chapter (GDP formula, CPI formula, Rule of 70, money multiplier, etc.) as you progress. Save it as `OUTPUTS/economics/formula_sheet.md` and keep it open during quiz prep.

---

## AI Policy Quick Reference

| Course | AI Permitted? | What Claude Can Do | What Claude Cannot Do |
|--------|--------------|-------------------|----------------------|
| HUM 2020 | **No** — GenAI is prohibited | Find resources, quiz you, explain concepts, build bibliographies | Write or draft any text you plan to submit |
| ECO 2013 | **Yes, as supplement** | Explain concepts, check your working, clarify readings | Complete Connect or Smartbook assignments for you |

When in doubt, re-read the AI policy section in `CLAUDE.md` before each session.

> **UCF Official AI Policy References** — read these before your first session:
>
> - [Academic Integrity and AI at UCF](https://guides.ucf.edu/ai/academic-integrity)
> - [Using AI Tools — UCF Guide](https://guides.ucf.edu/ai/using-tools)
> - [Responsible AI Use at UCF (AI for All)](https://aiforall.ucf.edu/about/responsible-ai-use-at-ucf/)
> - [UCF Information Security — AI Guidance](https://infosec.ucf.edu/document/ai-guidance/)
>
> **HUM 2020 note:** GenAI is fully prohibited in this course — these UCF-level links do not override the course syllabus. The strictest policy wins.  
> **ECO 2013 note:** AI is permitted as a supplement only. Review the UCF guidance on what responsible use looks like before using any AI tool for coursework.

---

## How to Start and End Each Claude Session

**At the start of every session, tell Claude:**

- Which course you are working on
- Which week and topic
- Which step in the sequence you are at (books / resources / notes / revision)
- Whether you have a deadline this week (annotation, quiz, exam)

**At the end of every session, ask Claude to confirm:**

- What was covered and where notes are saved
- What comes next in the study sequence
- Any reminders about upcoming submission deadlines

Claude starts fresh each session and does not remember previous conversations. The files in this folder are your shared memory — keep them updated and commit regularly.

---

## Keeping the Repo Current

- Commit after each study session:
  ```
  git add . && git commit -m "Week 2 HUM notes + progress tracker update"
  ```
- Push before exams so you have a clean backup:
  ```
  git push
  ```
- Regenerate and commit updated PDFs before sharing or printing so the latest version is always in the repo.
- Do not commit full copyrighted PDFs from Webcourses — your own notes and summaries are fine.

---

*Set up with Claude in Cowork mode, June 2026. All Webcourses materials remain subject to UCF copyright policy.*
