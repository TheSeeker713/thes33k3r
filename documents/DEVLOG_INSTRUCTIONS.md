# Development Archive workflow

## Author and voice

Write the devlogs as Jeremy Robards, CTO of Mycelia Interactive LLC. Use first-person project ownership, direct language and concrete decisions. The public article header carries this byline. Research and the rationale for the October 2026 rewrite are recorded in [ARCHIVE_EDITORIAL_RESEARCH_2026.md](ARCHIVE_EDITORIAL_RESEARCH_2026.md).

Do not invent personal scenes, conversations, emotions, audience feedback or benchmarks to make a log sound human. Explain what changed and why; distinguish recorded plans from completed work. Technical details should help readers understand the experience.

## Sources and dates

Inspect the Git history and relevant source files before writing. Every article must end with a Sources section containing GitHub commit links and site-source links pinned to the commit discussed. Verify that each cited file exists at that commit. When one commit spans two topics, disclose that relationship rather than inventing separate releases.

Use actual commit timestamps for the recorded work. Convert them with the America/Denver timezone, including daylight-saving adjustments. Display bracketed dates with a full month, ordinal day and year, followed by a 12-hour time with MT. The work date and editorial revision date are separate.

Example: `### [October 2nd, 2026] [11:03 PM MT]`.

## Files and metadata

Use `devlogXX.md` filenames with zero-padded numbers and no more than 111 lines. Keep the public reading copy in `public/devlog/` synchronized with its mirror in `documents/devlog/`. The combined `documents/devlog.md` is an index of the individual articles.

Each article has `src/app/devlog/data/devlogsXX.json` metadata containing id, slug, number, title, subtitle, date, time, timezone, author, authorRole, startDate, endDate, dateRange, phase, revisedDate, contentPath, excerpt and status. ISO startDate/endDate include the actual timezone offset. Excerpts summarize the article in first person. Public contentPath points to `/devlog/devlogXX.md`.

## Order and publishing

The Archive reads from oldest to newest: first entry at the top, last at the bottom. `src/lib/devlogs.ts` loads the metadata automatically and orders it by startDate, then entry number. The homepage count, sitemap and exported-route verification use the same catalog; do not add hardcoded imports or totals.

The article renderer sanitizes markdown HTML. Preserve that protection. Previous/next links follow the same chronological order as the index.

Run scoped lint, the production build and export verification. Check the rendered index and article pages at desktop and mobile widths, including source sections and navigation. Confirm all reading copies, metadata and intended UI changes are staged. Commit and push when publishing is authorized, then verify GitHub and Cloudflare checks plus the live pages.

Historical versions remain available through Git history. Date and source corrections should improve the reading record without presenting a retrospective rewrite as an untouched original.

Updated October 3, 2026 to reflect the approved Archive revision.
