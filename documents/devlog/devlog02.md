# THE S33K3R TRANSMISSION - DEVLOG
## Part 2: Mechanics & Secrets

*Continued from devlog01.md*

---

## **PART IV: THE MECHANICS** ⚙️

### [November 29th, 2025] [11:16 AM MT]
**Commit:** Fix video playback - keep video mounted and use useEffect

Video playback was buggy. Videos weren't playing consistently. The solution: keep the video component mounted and use useEffect hooks to manage playback state properly. A subtle but crucial fix that made the experience feel polished.

---

### [November 29th, 2025] [11:39 AM MT]
**Commit:** Update crtvideo with new version

The CRT TV video received an update. New footage, more mysterious, more atmospheric.

---

### [November 29th, 2025] [11:58 AM MT]
**Commit:** Set secret date to December 12th 2025

The countdown begins. A hidden date was embedded in the puzzle game. Users solving the puzzle would discover: **December 12th, 2025**. The EARTIX now had a temporal dimension.

---

### [November 29th, 2025] [12:03 PM MT]
**Commit:** Make puzzle easier - only 10-15 shuffle moves

User testing feedback: the puzzle was brutally difficult. Like, *really* brutally difficult. I watched someone try for 10 minutes and give up. That's not fun—that's just mean. The 8-puzzle (sliding tile game) shuffle algorithm was adjusted from 50+ moves to 10-15. Still challenging, but actually solvable. The goal was engagement, not frustration. Balance is everything.

---

## **PART V: THE SECRETS** 🎪

### [November 29th, 2025] [11:55 PM MT]
**Commit:** Add hidden easter eggs - fart bubble and special menu

Late night creative burst. You know that feeling when you're exhausted but your brain won't stop generating ideas? That was this moment. Two hidden easter eggs were added:
1. **Fart Bubble** - A Web Audio API-powered Easter egg triggered by... (spoiler-free)
2. **Special Menu** - A hidden navigation element waiting to be discovered

These weren't meant to be obvious. They were rewards for curious users who inspect element or interact with unexpected areas. The kind of secrets that make people feel clever when they find them.

---

### [November 30th, 2025] [12:25 AM MT]
**Commit:** Make hidden easter eggs more visible

The easter eggs were *too* hidden. Visibility adjusted to 10-20% opacity so sharp-eyed users could spot them without making them obvious to casual visitors.

---

### [November 30th, 2025] [12:27 AM MT]
**Commit:** Increase easter egg visibility to 50%/100%

Turns out the problem wasn't the visibility of the elements—it was the discoverability. Opacity bumped up so they were actually noticeable.

---

### [November 30th, 2025] [12:31 AM MT]
**Commit:** Make easter eggs visible - bunny menu, magenta fart circle, 80% opacity

Final tuning. The easter eggs were now visible but not intrusive. 80% opacity meant they coexisted with the main experience rather than dominating it.

---

## **PART VI: THE CONTROL PANEL** 🎛️

### [November 30th, 2025] [12:50 AM MT]
**Commit:** Add TV controls (channel, volume, brightness, contrast) and README files

The CRT TV interface received a full control panel:
- **Channel selector** - Switch between 5 channels (most showing the same video for now)
- **Volume dial** - Adjust audio from 0-100%
- **Brightness slider** - Dim or brighten the display
- **Contrast control** - Fine-tune the image quality

Documentation was added: comprehensive README files explaining the project, the EARTIX, and how to solve the puzzle.

*Continued in devlog03.md*
