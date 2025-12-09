# THE S33K3R TRANSMISSION - DEVLOG

*A development journey from concept to production. Written in real-time as milestones were achieved.*

---

## **PART I: THE GENESIS** 🎬

### November 29, 2025 - 07:49 AM
**Commit:** Initial commit: THE S33K3R TRANSMISSION landing page

The seed was planted. A single commit brought THE S33K3R TRANSMISSION to life—a mysterious landing page built with React and Vite. The concept was simple but ambitious: create an immersive neo-western, alternate reality experience that draws users into an ARG-like puzzle game.

Initial tech stack:
- React with Vite
- Tailwind CSS for styling
- A cryptic transmission awaiting its first visitor

---

### November 29, 2025 - 07:50 AM
**Commit:** Add GitHub Pages deployment workflow

Within minutes, the infrastructure was ready. GitHub Actions workflow configured to automatically deploy to GitHub Pages. The transmission was going live to the world.

*Status: Site operational*

---

### November 29, 2025 - 07:53 AM
**Commit:** Remove GitHub Actions - deploying to Cloudflare

Quick pivot. GitHub Pages was ditched in favor of Cloudflare Pages for better performance and reliability. The deployment pipeline was rebuilt around Cloudflare's infrastructure.

---

## **PART II: THE AESTHETIC** 🌵

### November 29, 2025 - 08:00 AM
**Commit:** Update theme: dark, gritty neo-western alternate reality vibes

The visual identity crystallized. The theme shifted to a dark, gritty neo-western aesthetic—think dust-covered transmissions, CRT static, and the kind of world where secrets are hidden in plain sight. Custom colors were crafted:
- Rust (#8B4513)
- Burnt orange (#CC5500)
- Dried blood (#4A0E0E)
- Bone dust (#E8DCC4)

The atmosphere was set. Users landing on this page would immediately feel the weight of something mysterious.

---

## **PART III: THE IMMERSION** 📺

### November 29, 2025 - 10:33 AM
**Commit:** Add background video and CRT TV with power knob toggle

This was the turning point. Dynamic video backgrounds were added—a looping transmission playing in the background. More importantly, the CRT TV component was born. A fully functional television interface with:
- Power toggle (knob animation)
- Working display with static and scanlines
- The visual centerpiece of the entire experience

The CRT overlay brought the western sci-fi aesthetic to life in a way static images never could.

---

### November 29, 2025 - 10:51 AM
**Commit:** Compress videos to under 25MB for Cloudflare Pages

Reality check: the video files were massive. 4K quality was great, but it meant Cloudflare Pages would reject the deployment. Time to optimize. Video compression brought the payload down while maintaining acceptable quality for the artistic vision.

---

### November 29, 2025 - 10:56 AM
**Commit:** Add wrangler.toml for Cloudflare Pages build config

Deployment configuration locked in. Wrangler.toml created to tell Cloudflare exactly how to build and deploy the project.

---

### November 29, 2025 - 11:00 AM
**Commit:** Trigger Cloudflare rebuild

The rebuilding began. Site redployed with proper configuration.

---

### November 29, 2025 - 11:01 AM
**Commit:** Remove wrangler.toml - use Cloudflare dashboard settings

Configuration philosophy shifted. Instead of committing build config files, Cloudflare dashboard settings would be the source of truth. Cleaner approach.

---

## **PART IV: THE MECHANICS** ⚙️

### November 29, 2025 - 11:16 AM
**Commit:** Fix video playback - keep video mounted and use useEffect

Video playback was buggy. Videos weren't playing consistently. The solution: keep the video component mounted and use useEffect hooks to manage playback state properly. A subtle but crucial fix that made the experience feel polished.

---

### November 29, 2025 - 11:39 AM
**Commit:** Update crtvideo with new version

The CRT TV video received an update. New footage, more mysterious, more atmospheric.

---

### November 29, 2025 - 11:58 AM
**Commit:** Set secret date to December 12th 2025

The countdown begins. A hidden date was embedded in the puzzle game. Users solving the puzzle would discover: **December 12th, 2025**. The ARG now had a temporal dimension.

---

### November 29, 2025 - 12:03 PM
**Commit:** Make puzzle easier - only 10-15 shuffle moves

User testing feedback: the puzzle was brutally difficult. The 8-puzzle (sliding tile game) shuffle algorithm was adjusted from 50+ moves to 10-15. Still challenging, but actually solvable. The goal was engagement, not frustration.

---

## **PART V: THE SECRETS** 🎪

### November 29, 2025 - 23:55 PM
**Commit:** Add hidden easter eggs - fart bubble and special menu

Late night creative burst. Two hidden easter eggs were added:
1. **Fart Bubble** - A Web Audio API-powered Easter egg triggered by... (spoiler-free)
2. **Special Menu** - A hidden navigation element waiting to be discovered

These weren't meant to be obvious. They were rewards for curious users who inspect element or interact with unexpected areas.

---

### November 30, 2025 - 00:25 AM
**Commit:** Make hidden easter eggs more visible

The easter eggs were *too* hidden. Visibility adjusted to 10-20% opacity so sharp-eyed users could spot them without making them obvious to casual visitors.

---

### November 30, 2025 - 00:27 AM
**Commit:** Increase easter egg visibility to 50%/100%

Turns out the problem wasn't the visibility of the elements—it was the discoverability. Opacity bumped up so they were actually noticeable.

---

### November 30, 2025 - 00:31 AM
**Commit:** Make easter eggs visible - bunny menu, magenta fart circle, 80% opacity

Final tuning. The easter eggs were now visible but not intrusive. 80% opacity meant they coexisted with the main experience rather than dominating it.

---

## **PART VI: THE CONTROL PANEL** 🎛️

### November 30, 2025 - 00:50 AM
**Commit:** Add TV controls (channel, volume, brightness, contrast) and README files

The CRT TV interface received a full control panel:
- **Channel selector** - Switch between 5 channels (most showing the same video for now)
- **Volume dial** - Adjust audio from 0-100%
- **Brightness slider** - Dim or brighten the display
- **Contrast control** - Fine-tune the image quality

Documentation was added: comprehensive README files explaining the project, the ARG, and how to solve the puzzle.

---

## **PART VII: THE NAVIGATION** 🧭

### December 1, 2025 - 15:56 PM
**Commit:** Add navbar, remove special menu, compress video assets

The project matured. A proper navigation bar was added with menu items for different sections:
- HOME
- TRANSMISSIONS
- THE PUZZLE
- ABOUT
- CONTACT

The special hidden menu was removed in favor of this cleaner, more user-friendly approach. Video assets were further compressed to optimize load times.

---

## **PART VIII: THE AUTOPLAY SAGA** 🎥

### December 7, 2025 - 19:31 PM
**Commit:** Fix: Add muted attribute to CRT video element for autoplay support

Browser autoplay policies are strict: videos must be muted to autoplay without user interaction. The CRT video was added with the `muted` attribute to comply with modern browser restrictions while still providing the immersive background experience.

---

### December 8, 2025 - 11:41 AM
**Commit:** Fix: Unmute video on playback to enable audio while maintaining autoplay support

But wait—we wanted audio! The solution was elegant: start muted for autoplay compliance, then unmute when the user actually plays the video. Users get the full sensory experience, browsers are happy, and the transmission plays with all its mysterious audio intact.

---

## **EPILOGUE: THE MIGRATION** ⚡

### December 8, 2025 - 14:00 PM
**Status:** Migration to Next.js 16 Complete

The project has been upgraded to the latest and greatest:
- **Next.js 16** with Turbopack (replacing Vite)
- **React 19** for cutting-edge component features
- **Tailwind CSS v4** with CSS-first configuration
- Cleaned up ~27 MB of build artifacts

The infrastructure is now future-proof and optimized for performance.

---

## **PART IX: THE GAME ENGINE** 🎮

### December 8, 2025 - 20:00 PM
**Feature:** Interactive Room Component System

The project evolved beyond a single landing page. A complete point-and-click adventure game framework was built:

**New Architecture:**
- `InteractiveRoom.tsx` - Reusable game room component with TypeScript support
- Percentage-based coordinate system (0-100) for responsive hitboxes
- State management for inventory and puzzle tracking
- Visual effects: CRT scanlines, vignette, film grain

**Technical Implementation:**
- Full TypeScript migration (tsconfig.json added)
- Next.js Image optimization with priority loading
- Custom cursor (eye icon) on interactive elements
- Smooth animations: pulsing indicators, hover states, click feedback

**First Playable Room:**
- `/brothel` route created as proof-of-concept
- 5 interactive elements (mirror, bottle, painting, safe, window)
- Working inventory system
- Puzzle mechanic (safe with combination lock)

The S33K3R TRANSMISSION is no longer just a mystery to observe—it's a world to explore.

---

### December 9, 2025 - 00:00 AM
**Commit:** Add InteractiveRoom component and TypeScript support

The game engine is operational. Players can now click, explore, and solve puzzles in immersive neo-western environments. The foundation for a full point-and-click adventure is complete.

---

## **REFLECTION**

From a mysterious transmission on November 29th to a fully-featured ARG experience with hidden puzzles, easter eggs, and immersive audiovisual effects—this project has been a journey of creative iteration, problem-solving, and user experience refinement.

Each commit represented a decision, a fix, or a new feature. Some commits were moments of inspiration (the CRT TV, the easter eggs, the interactive room system). Others were technical pragmatism (video compression, autoplay fixes, TypeScript migration). Together, they built something that feels alive—a transmission from an alternate reality, waiting to be deciphered.

The S33K3R TRANSMISSION is live. The puzzle is solvable. The secrets are hidden but discoverable. And now, the world is explorable.

**What happens on December 12th, 2025?**

That's for the players to find out.

---

**END TRANSMISSION**

*Devlog written December 8-9, 2025*  
*Author: @theseeker713*
