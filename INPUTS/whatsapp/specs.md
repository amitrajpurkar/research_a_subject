## intent of this project
 - the input files contain archive of messages from WhatsApp messenger application. 
 - This can be group conversations or individual conversations over a period of time
 - parse the archive and record the structure of how the conversation history is organized
 - messages can be textual exchange or images or videos or links to interesting and relevant youtube videos or facebook reels
 - if the conversation input is a text, then read entire text
 - if the conversation has image, then parse out the messages from that image which will have a meaningful context and exchange of thoughts between the participants
 - as an output, extract an elaborate storyline from the conversations 
 - this output can be later used to draft novel, or a novel-series or a memoir for the group of indiivduals.
 - output format of the storyline will be a markdown, saved under OUTPUTS folder, named by the conversation-grorup-name or a name supplied as an input parameter

## additional context
 - structure of archive: the structure is unknown while parsing the first; this can be used as input for subsequent runs
 - timeline or time-period: unknown for first run; we expect this to be from the begining of the conversation between the individuals; this can be an optional parameter for a workflow that can be repeated; default value will be from the start of conversation; or from the startign point captured in the archive
 - participants in the conversation: this will be an input parameter for a workflow that can be repeated
 - desired output: default layout of output is a storyline of entire conversation archived; alternates can be capture only the last topic of conversation from the archive; or the very first topic of conversation;  
 - summarization: produce a default summary on how many message-exchanges do you see between the participants; how many participants do you detect, how many textual messages and image or media messages do you detect, and if possible how many topics of conversation do you detect in the archive

 

---

## Updates — 6 Oct 2026 (requirements observed through Runs 1–2)

### Folder layout and working rules
 - Project root: `INPUTS/` (archives and exports), `OUTPUTS/` (all deliverables; `_work_in_progress/` holds scratch such as parsers and OCR caches), `specs.md` (this file)
 - Never read `OUTPUTS/` or `TEMPLATES/` unless the user points to a specific file there; read the named files only
 - Save every deliverable under `OUTPUTS/`; keep scratch work and backups outside the user's folders; do not leave temp files in `OUTPUTS/`
 - If the brief is unclear, ask with AskUserQuestion rather than filling gaps with filler; when running unattended, state the assumption and continue

### Input formats the parser must support
 - **iPhone-style export (zip):** `_chat.txt` with `[M/D/YY, h:mm:ss AM] Sender: text`, narrow no-break space before AM/PM, invisible LRM marks, CRLF, media markers `image omitted` / `<attached: file>`; media files named `NNNNNNNN-TYPE-YYYY-MM-DD-HH-MM-SS.ext`
 - **Android-style export (text only):** `M/D/YY, h:mm AM - Sender: text`, minute precision, `<Media omitted>` placeholders with no type or filename, multi-line messages continued on un-stamped lines, system lines without a sender colon
 - Sender names differ per export (contact names are phone-specific, e.g. "Mummy Viva" vs "Mummy", "Pappaji Viva" vs "Pappaji"); keep an explicit **name-mapping table** per run and record every inference as "to confirm"
 - Unsaved phone numbers can appear as senders; map them only as a flagged inference
 - Mixed English and Marathi/Hindi (Devanagari) text; long multi-line forwards are normal
 - Timestamps may be out of order (re-sync blocks, small swaps); always sort by timestamp, never by file order

### Multi-source runs: merge, don't replace
 - A conversation may arrive as several exports (different phones/numbers, with or without media). Treat the earlier output files as the base and **merge** the new source into them
 - De-duplicate against earlier material by sender (via the mapping table), timestamp (tolerance about ±2 minutes) and text; media by sender and timestamp. Only genuinely new entries are read in full and written up; report matched, unmatched-but-explained (formatting differences) and new counts
 - Detect and report coverage gaps in each source (silent windows, disappearing-messages periods, a number absent from the group, the start of the file versus the stated start date) and use one source to fill another where possible
 - A new source may extend the timeline in either direction; update titles, header/source lines, the opening overview and method notes accordingly
 - Preserve existing content: prior text may be edited only to correct a verified error, and every correction must be listed (in the method notes and the summary)

### Output files (all under `OUTPUTS/`)
 - `rjp_fmly_archive_storyline.md` — the elaborate storyline: header with sources and name consolidation; "shape of the story" overview; chronological sections (prologue/quarters/epilogue as needed) written as narrative with dates, quotes and the people involved; Appendix A (links, with per-source addenda); Appendix B (image OCR); "Notes on method and limits"
 - `rjp_fmly_archive_summary.md` — statistics per the "summarization" section; **append a new "Run N" section for each new input; never rewrite earlier runs**. Each run section covers: what the file is, headline numbers, per-person table, overlap with earlier sources, merged totals, statistics for the new material, caveats, and where the content went
 - `rjp_fmly_archive_structure.md` — the reusable description of each archive's structure (format, regexes, markers, quirks); add the second export's structure when it is next touched
 - Deck (`Rajpurkar_Family_Chat_Storyline_Deck.pdf`) is a derived deliverable and is regenerated only when asked

### Content and quality rules
 - Read every text message of the material being written up; media placeholders are collapsed (counts only) unless images are being OCR'd
 - Preserve voices: quote short phrases, keep Marathi where meaningful with a gloss, keep dates exact
 - Distinguish stated fact from interpretation; flag interpretive readings and unresolved questions explicitly so the user can confirm them with the family
 - Exclude sensitive identifiers that appear in chats or screenshots (passcodes, candidate IDs, plate/VIN numbers, similar); mention only that they were left out
 - Treat link contents as unretrieved when the network blocks them; inventory links by host, sharer and period instead
 - Statistics must be reproducible from the code, not estimated by eye; label approximations as such
 - Verify before delivering: confirm earlier content is intact (diff against a backup), check counts, and recheck cited facts against the raw text

### Reporting back
 - Say in a sentence or two what was added and where; list only the flags that need a decision (name mappings, coverage gaps, corrections made, open questions)

### Deck requirements (added 6 Oct 2026)
- The slide deck `OUTPUTS/Rajpurkar_Family_Chat_Storyline_Deck.pdf` is regenerated from the latest `rjp_fmly_archive_storyline.md` whenever the storyline is updated.
- Before replacing it, back up the previous deck as `OUTPUTS/deck_<period>.pdf` (e.g. `deck_jan2024_sep2026.pdf`); never overwrite a backup.
- Keep the same theme, stylesheet and organization: 16:9 (960x540 pt), cream background, teal title/closing slides, orange left bar, two-column bullets, KPI cards and bar charts; order = title, who/numbers/threads, chronological quarter slides, thematic slides (boys, grandparents on the road, running, stars, AI, festivals), questions, thank-you.
- New input material gets its own slides (new periods, new themes, new numbers); update title/stat slides with the merged totals and date range; add open questions for unconfirmed items.
- Use no emoji and no Devanagari in slides (fonts do not render them); bar charts must be proportional.
- Keep the deck build source (build_deck.py, old_slides.json, render.py, deck.html) in `OUTPUTS/_work_in_progress/deck/`.
