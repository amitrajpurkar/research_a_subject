# Archive Structure — `rjp_fmly_archive.zip`

*Run 1 · generated 2026-10-04 · reusable reference for future runs (per `specs.md`: "record the structure of how the conversation history is organized")*

## 1. The zip at a glance

| Property | Value |
|---|---|
| File | `INPUTS/rjp_fmly_archive.zip` (≈2.1 GB, last modified 27 Sep 2026) |
| Entries | **5,280**, all in a **flat root** (no sub-folders) |
| Chat transcript | exactly one file: **`_chat.txt`** (2.1 MB, 22,145 lines, UTF-8) |
| Media files | 5,279, named `NNNNNNNN-TYPE-YYYY-MM-DD-HH-MM-SS.ext` |
| Export type | WhatsApp "Export chat – include media" from an iPhone-style export (bracketed timestamps, `<attached: …>` markers) |
| Chat kind | One **group** chat (group named "Rajpurkar family") |

### Contents by file type

| Extension | Files | Size | What it is |
|---|---|---|---|
| `.jpg` | 5,189 | 2.03 GB | Photos (5,188 `PHOTO` + 1 document-named JPG) |
| `.opus` | 53 | 13.4 MB | Voice messages (`AUDIO`) |
| `.pdf` | 22 | 49.7 MB | Shared documents |
| `.m4a` | 4 | 7.4 MB | Audio files |
| `.webp` | 4 | 0.45 MB | Stickers |
| `.html` | 4 | 0.67 MB | Saved web pages |
| `.docx` | 2 | 31 KB | Word documents |
| `.pptx` | 1 | 336 KB | A presentation |
| `.txt` | 1 | 2.1 MB | `_chat.txt` |

**There are no video files** in the archive, only placeholders. File-name prefixes are a running counter (first file `00000088`), and the date in the name matches the message timestamp, which gives a reliable key to join a file to its line in `_chat.txt`. Photos are filed as `PHOTO`, voice as `AUDIO`; documents keep their original names (e.g. `…-macro_study_….pdf`, `…-dhaneshs_wor….pdf`, `…-project_pres….pptx`).

## 2. How `_chat.txt` is organized

- **One message per entry**, ordered *mostly* chronologically (see §4 for the exception).
- **Line pattern:**
  `[M/D/YY, h:mm:ss AM|PM] Sender Name: message text`
  - Date is **US order, month/day/2-digit year** (e.g. `9/27/26`). 12-hour clock; a narrow no-break space (U+202F) sits before AM/PM.
  - Lines end with CRLF; lines for media and system events start with an invisible left-to-right mark (U+200E).
  - Regex that parses 100% of entry starts (15,008): `^‎?\[(\d{1,2})/(\d{1,2})/(\d{2}), (\d{1,2}):(\d{2}):(\d{2})\s?([AP]M)\] ([^:]+?): (.*)$`
- **Multi-line messages:** a message that contains line breaks continues on following lines *without* a timestamp (7,137 such continuation lines; used by long forwards, lists, poems).
- **Media markers (two forms, depending on date):**
  - Before 19 Jan 2025 (placeholder, no file): `‎image omitted`, `‎video omitted`, `‎audio omitted`, `‎document omitted`, `‎sticker omitted`, `‎GIF omitted`
  - From 19 Jan 2025 (file included): `‎<attached: 00000090-PHOTO-2025-01-20-00-51-35.jpg>` — the name resolves to a file in the zip root.
  - A caption can be on the same line as the marker (e.g. a Marathi caption followed by `<attached: …>`), and `video omitted` stays a placeholder for the whole archive.
- **System lines** use the same bracket format with the sender as the actor: *added/turned on disappearing messages/turned off disappearing messages/view-once notices/Meta AI privacy notice*; deleted messages appear as `This message was deleted`.
- **Links** are inline text (Facebook, YouTube, Google Photos albums, etc.); no link previews or titles are stored.
- **Reactions, read receipts, replies-to and edit history are not recorded**; only 5 "edited" notices and 76 deletions appear.

### Sender names found (6 + system)
`Amit Rajpurkar`, `Amit 305`, `Pappaji Viva`, `Mummy Viva`, `Prita Rajpurkar`, `Yuvan Rajpurkar`; non-people: `Meta AI`, `Amit Rajpurkar 2` (system), `Rajpurkar family` (system). See the summary file for the person mapping.

## 3. Multimedia inventory

| Category | In transcript | Actual files |
|---|---|---|
| Photos | 8,979 | 5,188 (all dated 19 Jan 2025 – 25 Sep 2026) |
| Videos | 1,766 | **0** |
| Voice / audio | 121 | 57 |
| Documents | 42 | 30 |
| Stickers + GIFs | 14 | 4 |
| **Total media entries** | **10,922** | **5,279** |

- Files exist for **48%** of media entries. Media before **19 Jan 2025** (≈3,700 entries) are placeholders only.
- **Photos are the main non-text content** — likely screenshots of forwards/news, family photos, and event pictures; none were opened or described in this run. Under `specs.md`, a later run will have to read the images for message text/context.
- **Video/reel content:** only links remain. ≈459 messages with Facebook links (reels/shares), ≈220 with YouTube links, 10 Instagram.
- **Voice messages** (`.opus`/`.m4a`) would need transcription; most likely in Marathi/English.
- **Documents** (PDFs, DOCX, PPTX, HTML) include robotics/competition material (e.g. a project presentation, a team-work PDF) and study notes — candidates for context enrichment.

## 4. Beginning, end and timeline quirks

| Item | Detail |
|---|---|
| **Beginning of conversation** | **6 Jan 2024, 8:12:50 PM** — Amit posts a FIRST competition-manual Q&A link, then a run of messages about Dhanesh's robotics team getting its season challenge ("art with STEM") |
| First reply | Aaji (Mummy Viva) 6 Jan 2024, 11:14 PM (a forwarded video); Aajoba 11:58 PM (encouragement) |
| Last message | 27 Sep 2026, 2:38:32 PM, Yuvan (video) |
| Time zone | Not stated; local to the exporting phone |
| Silent period | 19 Dec 2024 06:07 AM → 19 Jan 2025 07:42 AM. Explained by **disappearing messages (90 days)** being switched on by Aajoba on 19 Dec 2024 and switched off by Amit on 19 Jan 2025 |
| Out-of-order block | File line ≈3,139 to ≈14,744: 878 backward timestamp jumps. A block of ~975 entries stamped 28 Jul – 16 Sep 2024 (mostly media, from Aajoba and Aaji) is woven among entries stamped 8 Oct – 19 Dec 2024. A few trivial seconds-level swaps also occur in Sep 2026 |
| New identity joins | 16 Aug 2024: "Pappaji Viva added Prita Rajpurkar" (Aaji's second profile) |
| New participant voice | Yuvan first posts 1 Jun 2026 |

**Parsing rule for later runs:** treat `_chat.txt` as an *unordered* set of entries, sort by parsed timestamp (stable sort), and never infer the date of a message from its position in the file.

## 5. Recommended parse pipeline (for the next runs)

1. Extract only `_chat.txt` (don't unzip the 2 GB of media unless needed).
2. Parse with the regex above; join continuation lines; strip U+200E.
3. Normalize senders → people (Amit, Aaji, Aajoba, Yuvan) via a small mapping table kept as a parameter (`specs.md`: participants are an input parameter).
4. Classify each entry: text / photo / video / audio / document / sticker / GIF / system / deleted; flag Facebook/YouTube/Instagram/Google-Photos links.
5. Sort by timestamp; segment into sessions (>6 h gap) and arcs (>24 h gap).
6. For media with files, join via the `<attached: …>` filename; read images and transcribe audio in later runs.
7. Build the storyline in chronological order with an optional start/end date parameter, writing to `OUTPUTS/<group-name>.md` (e.g. `OUTPUTS/rjp_fmly_archive.md`) as `specs.md` requires.

## 6. Open questions for you
- Do you want "Mummy Viva" and "Prita Rajpurkar" merged into one person (Aaji) in the storyline? (assumed yes)
- Should the storyline use the pseudonymous handles ("Pappaji") or the family terms (Aajoba/Aaji)?
- Should the lost Dec 2024–Jan 2025 window be called out in the narrative?


---

# Second export — Android text-only chat (`INPUTS/rjp_from305.txt`)

*Run 2 · added 2026-10-06 · same group ("Rajpurkar family"), exported from the "Amit 305" phone · reusable reference for parsing Android-style WhatsApp exports*

## 1. The file at a glance

| Property | Value |
|---|---|
| File | `INPUTS/rjp_from305.txt` (≈2.0 MB, **single plain-text file — no zip, no media files**) |
| Export type | WhatsApp "Export chat – without media" from an Android phone |
| Encoding / line endings | UTF-8, no BOM; **LF** line endings (no CRLF); 25,652 lines |
| Entries | **16,207** timestamped entries + **9,445** continuation lines + 1 trailing empty line |
| Span | 13 Jul 2021 (group creation line) → 5 Oct 2026; real conversation 27 Dec 2022 → 5 Oct 2026 |
| Chat kind | The same group chat; own messages are labelled with a sender name, there is no "You:" prefix |

## 2. How the file is organized

- **One message per entry**, ordered mostly chronologically (five backward steps in total — see §4).
- **Line pattern:** `M/D/YY, h:mm AM|PM - Sender Name: message text`
  - Date is US order, month/day/**2-digit year** (`7/13/21`); 12-hour clock; **minute precision, no seconds**; a **narrow no-break space (U+202F)** sits before AM/PM (all 16,207 entries); the separator between time and sender is ` - ` (space, hyphen, space).
  - No invisible LRM (U+200E) marks as in the iPhone export; a few U+00A0 characters and five U+2068/U+2069 isolate marks (around @-mentions such as `@⁨Mummy⁩`) occur inside text.
  - Regex that matches 100% of entry starts (16,207): `^(\d{1,2})/(\d{1,2})/(\d{2}),\s(\d{1,2}):(\d{2}) ?([AP]M)\s-\s(.*)$`
  - The remainder after ` - ` is split into sender and text at the first `: ` (or a trailing `:` for an empty message). If there is no sender colon, the line is a **system line**.
- **Multi-line messages:** continuation lines carry **no timestamp** and are appended to the previous entry. Long forwards (up to ≈ 9,900 characters) are common; continuation lines are often indented by seven spaces.
- **Markers (all placeholders, never filenames):**
  - `<Media omitted>` — 11,419 entries; **photo, video, audio, document and sticker are not distinguished**, and no file name exists
  - `<View once voice message omitted>` — 3 entries
  - `<This message was edited>` — 1; `This message was deleted` — 48 (no "You deleted…" variant; deleted stubs keep their sender and time)
  - **Blank text** after the sender colon — 278 entries (caption-less media or empty stubs)
  - A caption can share a line with `<Media omitted>`
- **System lines (9 in the file; no sender colon):**
  - `Pappaji created group "Rajpurkar family"` and `You were added` (13 Jul 2021)
  - `Mummy started a call` (28 Oct 2023)
  - the Meta AI privacy notice (14 Dec 2023, two sentences, no sender)
  - `Pappaji added Prita Rajpurkar` (16 Aug 2024)
  - `Pappaji updated the message timer… 90 days` (19 Dec 2024) and `Amit Rajpurkar turned off disappearing messages` (19 Jan 2025)
  - `Amit Rajpurkar changed this group's icon` (25 Jul 2025)
  - `You were added` (5 Sep 2026) — the exporting phone re-joins the group
- **Not recorded:** reactions, read receipts, reply-to links, edit history, link previews, file names, seconds.
- **Links** are inline text (Facebook, YouTube, Google Photos, IMDb, WhatsApp invites).

## 3. Sender names (differ from the iPhone export)

| Name in this file | Same person as in the first archive |
|---|---|
| `Amit Rajpurkar` (7,301) | Amit — "Amit Rajpurkar" |
| `Amit on Motorola` (112; note a double space in the raw name) | Amit's second number — "Amit 305" (49 of its messages match "Amit 305" entries) |
| `Mummy` (4,374) | Aaji — "Mummy Viva" |
| `Prita Rajpurkar` (610) | Aaji's second profile — same name in both |
| `Pappaji` (3,792) | Aajoba — "Pappaji Viva" |
| `+1 (904) 510-4104` (6) | unsaved number; probably Yuvan (to confirm); Yuvan is "Yuvan Rajpurkar" in the first archive |
| `Meta AI` (3) | same |

Because names are phone-specific, always map names through the per-run mapping table before comparing or merging.

## 4. Quirks and coverage

| Item | Detail |
|---|---|
| Start | Group creation line is 13 Jul 2021, but the first message is **27 Dec 2022 4:19 PM** (Amit: the 305 number is now a Motorola One 5G Ace); nothing exists for 2021 – 26 Dec 2022 |
| Disappearing-messages window | 19 Dec 2024 → 19 Jan 2025 is silent (31 days), the same window as in the first archive |
| Long silence | **23 Feb → 4 Sep 2026 (194 days)**, ended by `You were added` on 5 Sep 2026; the first archive has ≈ 3,900 entries in that window |
| Out-of-order stamps | 5 backward steps: 23–25 May 2025, 5 Sep 2026 and 2–4 Oct 2026 (an entry stamped 2 Oct appears after 4 Oct entries) → sort by timestamp |
| Same-minute bursts | Photo bursts share one minute; with no seconds, order inside a minute is file order only |
| Truncated end | The last entry (5 Oct 2026 9:58 PM, Aaji, Marathi) ends mid-message |
| Languages | English and Marathi/Hindi (Devanagari) mixed; 255 entries contain Devanagari |
| Volume by year | 2021: 2 · 2022: 86 · 2023: 4,294 · 2024: 5,090 · 2025: 5,311 · 2026: 1,424 |

## 5. Differences from the iPhone-style export (first archive)

| Aspect | iPhone zip (`_chat.txt`) | Android text file |
|---|---|---|
| Container | zip with 5,279 media files | single `.txt`, no media |
| Entry start | `[M/D/YY, h:mm:ss AM] Sender: text` | `M/D/YY, h:mm AM - Sender: text` |
| Seconds | yes | no |
| Line ending / marks | CRLF, LRM (U+200E) on media and system lines | LF, no LRM |
| Media marker | `image/video/audio/document/sticker/GIF omitted`, or `<attached: NNNNNNNN-TYPE-date.ext>` | `<Media omitted>` only |
| System lines | bracketed, sender is the actor | `date - text`, no sender colon |
| Deleted message | `This message was deleted` | same |
| Own messages | profile name | profile/contact name (no "You") |

## 6. Parsing recipe

1. Read as UTF-8; split on `\n`.
2. A line starting a new entry matches the regex in §2; anything else is a continuation of the previous entry (join with `\n`).
3. Split sender from text at the first `: ` (or a trailing `:`); no colon → system line.
4. Classify: `<Media omitted>` / `<View once…>` → media; `This message was deleted` → deleted; blank → blank/caption-less media; otherwise text.
5. Map sender names to people with the run's mapping table; sort by timestamp (stable).
6. To merge with the iPhone archive, convert both to (person, timestamp to the minute, normalised text) and match within ±2 minutes; match media by person and timestamp only.
