# THE S33K3R TRANSMISSION - DEVLOG
## Part 1: The Signal & Early Days

*A development journey from concept to production. Written in real-time as milestones were achieved.*

---

## **INTRODUCTION: THE SIGNAL** 📡

What you're about to read isn't just a technical journal—it's the chronicle of building something that doesn't fit neatly into existing categories. This project is an **EARTIX** (Evolving Alternate Reality Trans-media Immersive & Interactive eXperience): a living, breathing digital world that blurs the line between storytelling, gameplay, and reality itself.

**THE SEEKER** isn't just a character—it's eleven consciousness fragments fused across collapsed timelines, transmitting warnings through the static. **THE BREACH** isn't merely a plot device—it's the threshold between what exists and what hungers to unmake it. **CHRONAEA** isn't just a location—it's a concept, a temporal wound, a place where the rules break down and possibilities multiply infinitely.

I'm building this experience to defy classification. It's not quite a game, not quite a film, not quite an ARG. It's something evolving—something that adapts as you interact with it, that rewards curiosity and punishes complacency. Every puzzle solved shifts the narrative. Every choice matters. Every timestamp is a potential portal.

This devlog captures the technical and creative decisions that shaped THE S33K3R TRANSMISSION from a single cryptic landing page into a multi-layered experience where players don't just observe a story—they *live* it.

Let's begin at the beginning.

---

## **PART I: THE GENESIS** 🎬

### [November 29th, 2025] [7:49 AM MT]
**Commit:** Initial commit: THE S33K3R TRANSMISSION landing page

The seed was planted. Coffee in hand, fingers on keyboard, and a vision in mind—I hit commit and THE S33K3R TRANSMISSION became real. A single commit brought it to life—a mysterious landing page built with React and Vite. The concept was simple but ambitious: create an immersive neo-western, alternate reality experience that draws users into this EARTIX puzzle game.

Initial tech stack:
- React with Vite
- Tailwind CSS for styling
- A cryptic transmission awaiting its first visitor

That first commit felt significant. This wasn't just another project. This was going to be *something*.

---

### [November 29th, 2025] [7:50 AM MT]
**Commit:** Add GitHub Pages deployment workflow

Within minutes, the infrastructure was ready. No time to waste—GitHub Actions workflow configured to automatically deploy to GitHub Pages. The transmission was going live to the world. Heart racing a bit. This was really happening.

*Status: Site operational*

---

### [November 29th, 2025] [7:53 AM MT]
**Commit:** Remove GitHub Actions - deploying to Cloudflare

Quick pivot. GitHub Pages was ditched in favor of Cloudflare Pages for better performance and reliability. The deployment pipeline was rebuilt around Cloudflare's infrastructure.

---

## **PART II: THE AESTHETIC** 🌵

### [November 29th, 2025] [8:00 AM MT]
**Commit:** Update theme: dark, gritty neo-western alternate reality vibes

The visual identity crystallized. The theme shifted to a dark, gritty neo-western aesthetic—think dust-covered transmissions, CRT static, and the kind of world where secrets are hidden in plain sight. Custom colors were crafted:
- Rust (#8B4513)
- Burnt orange (#CC5500)
- Dried blood (#4A0E0E)
- Bone dust (#E8DCC4)

The atmosphere was set. Users landing on this page would immediately feel the weight of something mysterious.

---

## **PART III: THE IMMERSION** 📺

### [November 29th, 2025] [10:33 AM MT]
**Commit:** Add background video and CRT TV with power knob toggle

This was the turning point. The moment it clicked. Dynamic video backgrounds were added—a looping transmission playing in the background. More importantly, the CRT TV component was born. A fully functional television interface with:
- Power toggle (knob animation)
- Working display with static and scanlines
- The visual centerpiece of the entire experience

I sat back and just watched it for a few minutes. The CRT overlay brought the western sci-fi aesthetic to life in a way static images never could. This was *exactly* the vibe I'd been chasing.

---

### [November 29th, 2025] [10:51 AM MT]
**Commit:** Compress videos to under 25MB for Cloudflare Pages

Reality check: the video files were massive. 4K quality was great, but it meant Cloudflare Pages would reject the deployment. Time to optimize. Video compression brought the payload down while maintaining acceptable quality for the artistic vision.

---

### [November 29th, 2025] [10:56 AM MT]
**Commit:** Add wrangler.toml for Cloudflare Pages build config

Deployment configuration locked in. Wrangler.toml created to tell Cloudflare exactly how to build and deploy the project.

---

### [November 29th, 2025] [11:00 AM MT]
**Commit:** Trigger Cloudflare rebuild

The rebuilding began. Site redployed with proper configuration.

---

### [November 29th, 2025] [11:01 AM MT]
**Commit:** Remove wrangler.toml - use Cloudflare dashboard settings

Configuration philosophy shifted. Instead of committing build config files, Cloudflare dashboard settings would be the source of truth. Cleaner approach.

*Continued in devlog02.md*
