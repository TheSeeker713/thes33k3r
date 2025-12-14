# DEVLOG INSTRUCTIONS FOR GITHUB COPILOT

## CRITICAL: Read This First When User Says "Update Devlog"

When the user requests a devlog update, **ALWAYS** follow this exact workflow:

---

## STEP 1: CHECK COMMIT HISTORY

**Before writing anything**, check recent git commits:

```bash
git log --oneline --since="[DATE OF LAST DEVLOG ENTRY]" --format="%h - %s - %ai"
```

**Extract:**
- Commit hashes
- Commit messages
- Commit timestamps (convert to Mountain Time 12-hour format)
- Author information

**If no commits exist since last entry:**
- Use current date/time
- Reference the active chat conversation
- Document real-time development decisions

---

## STEP 2: DETERMINE FILE TARGET

**Naming Convention:** `devlogXX.md` where XX is zero-padded (01, 02, 03... 99)

**File Size Rule:** Maximum **111 lines** per devlog file

**When to create new file:**
- Current devlog file exceeds 111 lines
- New major project phase begins
- Natural narrative break point reached

**Current devlog count check:**
```bash
ls documents/devlog/*.md | Measure-Object -Line
```

---

## STEP 3: WRITE IN MAGAZINE ARTICLE FORMAT

### Required Structure

Each devlog entry **MUST** include:

1. **Bracketed Date & Time Header:**
   ```markdown
   ### [December 14th, 2025] [11:45 AM MT]
   ```

2. **Entry Title (Optional but Recommended):**
   ```markdown
   **Building the Asset Pipeline**
   ```

3. **Narrative Body:**
   - First-person perspective ("I", "me", "my")
   - Conversational tone with personality
   - Technical details wrapped in story
   - Emotional context ("excited", "frustrated", "relieved")
   - Problem → Solution → Result flow

4. **Code Samples (When Relevant):**
   - Use markdown code blocks with language tags
   - Explain *why* not just *what*
   - Include before/after comparisons when helpful

### Writing Style Guidelines

**DO:**
- ✅ Write like a human developer blogging their journey
- ✅ Use contractions ("it's", "I'm", "wasn't")
- ✅ Show personality and emotion
- ✅ Explain the "why" behind decisions
- ✅ Include failures and pivots, not just successes
- ✅ Add time-of-day context ("Late night coding", "Morning coffee in hand")
- ✅ Use short paragraphs (2-4 sentences)
- ✅ Mix technical jargon with plain English

**DON'T:**
- ❌ Use bullet-point technical documentation format
- ❌ Write in third person or passive voice
- ❌ List features without narrative context
- ❌ Skip the emotional/decision-making process
- ❌ Use only technical jargon without explanation
- ❌ Write walls of text (break into paragraphs)

### Example Entry Format

```markdown
### [December 14th, 2025] [2:30 PM MT]
**The Animation Breakthrough**

I'd been staring at the same choppy transition for twenty minutes. The card expansion looked janky—too fast, too linear. No easing. It felt like a PowerPoint slide, not a magazine page.

Then it hit me: `ease-in-out` wasn't enough. I needed spring physics. Framer Motion's spring animations simulate real-world motion with mass and damping. Changed the transition config:

\`\`\`tsx
transition={{ type: 'spring', stiffness: 400, damping: 17 }}
\`\`\`

Instant improvement. The cards now *bounce* slightly on expansion. Satisfying. Tactile. Real.

Ran the build. Deployed. Tested on mobile. Perfect. Sometimes the smallest tweaks make the biggest difference.
```

---

## STEP 4: UPDATE CORRESPONDING JSON

**Location:** `src/app/devlog/data/devlogsXX.json`

**Required Fields:**
```json
{
  "id": "devlog07",
  "title": "Part 7: Reflection & Credits",
  "date": "[December 14th, 2025]",
  "time": "[11:11 AM]",
  "timezone": "MT",
  "author": "J.W.",
  "contentPath": "../../../documents/devlog/devlogXX.md",
  "excerpt": "2-3 sentences capturing the essence of this devlog. Engaging hook. Personal voice. No bullet points."
}
```

**Excerpt Writing Rules:**
- 2-3 sentences maximum
- First-person perspective
- Hook the reader's curiosity
- Match the narrative tone of the content
- NO bullet points, NO technical lists
- Focus on the *story* not the features

---

## STEP 5: VERIFY MAGAZINE PAGE INTEGRATION

**Check the magazine imports:**
```tsx
// src/app/devlog/page.tsx
import devlog07 from './data/devlogs07.json'
```

**If adding new devlog:**
1. Import the new JSON file
2. Add to `devlogs` array in reverse chronological order
3. Verify array order: `[newest, ..., oldest]`

**Test the magazine page:**
```bash
npm run dev
# Navigate to /devlog
# Expand the new entry
# Verify markdown renders correctly
# Check metadata displays properly
```

---

## STEP 6: BUILD AND COMMIT

**Always follow this sequence:**

1. **Build:**
   ```bash
   npm run build
   ```
   - Must succeed with zero errors
   - All routes must prerender successfully

2. **Verify Changed Files:**
   ```bash
   git status -sb
   ```
   - Confirm devlogXX.md modified/added
   - Confirm devlogsXX.json modified/added
   - Confirm no unexpected changes

3. **Stage Files:**
   ```bash
   git add documents/devlog/devlogXX.md src/app/devlog/data/devlogsXX.json
   ```

4. **Commit:**
   ```bash
   git commit -m "Update devlog: [brief description of entries added]"
   ```

5. **Push:**
   ```bash
   git push
   ```

---

## DATE & TIME FORMAT RULES

**CRITICAL: Always use this exact format:**

### Header Format
```markdown
### [December 14th, 2025] [11:45 AM MT]
```

**Date Rules:**
- Full month name (December, not Dec)
- Day with ordinal suffix (14th, not 14)
- Four-digit year (2025)
- Brackets around date: `[December 14th, 2025]`

**Time Rules:**
- 12-hour format ONLY (never 24-hour)
- Include AM/PM designation
- Include MT timezone abbreviation
- Brackets around time: `[11:45 AM MT]`
- No seconds unless specifically logging exact commit time

**Timezone:**
- ALWAYS Mountain Time (MT)
- Never use other timezones
- Convert UTC commit times to MT (UTC-7 or UTC-6 depending on DST)

---

## FILE SIZE MANAGEMENT

**Maximum:** 111 lines per devlog file

**When approaching limit:**
1. Count lines: `(Get-Content documents/devlog/devlogXX.md).Count`
2. If > 100 lines, consider splitting at next natural break
3. Create new file (increment number)
4. Update imports in magazine page
5. Create corresponding JSON file

**Natural break points:**
- Major feature completion
- New project phase
- Significant time gap (multiple days)
- Shift in development focus

---

## COMMIT MESSAGE CONVENTIONS

**Format:** `Update devlog: [specific change]`

**Examples:**
- `Update devlog: Add Bank Encounter development entries`
- `Update devlog: Document markdown rendering fix`
- `Update devlog: Split devlog06 and create devlog08`
- `Update devlog: December 14th afternoon session`

**Include in message:**
- Date range of entries added
- Major topics covered
- File numbers affected (if multiple)

---

## TROUBLESHOOTING

### Build Fails
- Check TypeScript errors in devlog page
- Verify JSON syntax (no trailing commas)
- Confirm all imports are correct
- Check for special characters in markdown

### Magazine Not Showing Entry
- Verify JSON file exists in correct location
- Check import statement in page.tsx
- Confirm entry added to devlogs array
- Verify contentPath is correct

### Markdown Not Rendering
- Check for HTML tags that need escaping
- Verify code blocks use proper fencing
- Ensure no malformed markdown syntax
- Test with simpler content first

### Wrong Timezone Displayed
- All times MUST be MT (Mountain Time)
- Check JSON file timezone field
- Verify markdown header includes MT
- Convert UTC timestamps before writing

---

## QUICK REFERENCE CHECKLIST

When user says "update devlog":

- [ ] Check git commits for recent changes
- [ ] Identify target devlog file (check line count)
- [ ] Write entries in magazine article format
- [ ] Each entry has bracketed date/time (12-hour MT)
- [ ] Narrative voice with personality
- [ ] Update corresponding JSON file
- [ ] Write engaging 2-3 sentence excerpt
- [ ] Verify magazine page imports
- [ ] Run npm run build (must succeed)
- [ ] Check git status
- [ ] Stage devlog files
- [ ] Commit with descriptive message
- [ ] Push to origin

---

**Last Updated:** December 14th, 2025  
**Version:** 1.0  
**Maintained By:** J.W.

**Note to Copilot:** These instructions are mandatory for all devlog operations. When the user says "update devlog", treat it as a command to follow this entire workflow. Do not skip steps. Do not deviate from the format. Consistency is critical for the magazine experience.
