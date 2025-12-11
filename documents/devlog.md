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

### December 9, 2025 - 12:04 AM (00:04:53)
**Commit:** Add InteractiveRoom component and TypeScript support

The game engine is operational. Players can now click, explore, and solve puzzles in immersive neo-western environments. The foundation for a full point-and-click adventure is complete.

---

### December 9, 2025 - 2:16 PM (14:16:51)
**Commit:** Make header/footer sticky and wire room links

Navigation got the polish pass it deserved:
- Sticky header/footer on the home page to keep controls always visible
- Hash-link targets added (`#transmissions`, `#puzzle`) for smooth jumps
- Navbar switched to Next.js `Link` with active-state highlighting
- Added room link to `/brothel` so players can enter the first playable space

Result: the main transmission page now feels like a proper hub—users can jump between sections and enter rooms without losing orientation.

---

## **PART VII: THE CINEMATIC PIVOT** 🎬

### December 10, 2025 - 10:08 AM (10:08:50)
**Major Refactor:** Pivot from Point-and-Click to Cinematic Narrative Engine

A fundamental architectural shift. The game moved from a traditional point-and-click adventure to an **FMV (Full Motion Video) style choose-your-own-adventure system**. This wasn't just a feature add—it was a complete reimagining of how players would experience THE S33K3R universe.

**New Architecture:**
- **Type System** (`src/types/game.ts`): Strict TypeScript definitions for `RoomNode`, `ChoiceCard`, and `WorldConfig`
- **CinematicEngine Component** (`src/components/CinematicEngine.tsx`): Three-layer rendering system (background image → transition video → interactive cards)
- **Seamless Transitions**: Videos with `preload="auto"` ensure instant playback when cards are clicked
- **Frame-Perfect Magic**: Last frame of transition video matches destination room's static image (no visible cuts)

**Sample World Created:**
- 5 rooms configured: Bank, Bank Vault, Saloon, Sheriff's Office, Hotel
- Each room has 3 choice cards with narrative descriptions
- Nested navigation supported (Bank → Vault demonstrates sub-room access)
- Header navigation for main rooms (hard-cut, no video)
- Card choices trigger cinematic POV transitions

**Visual Design:**
- Weathered tarot/data-pad style cards with dark backgrounds
- Amber borders with glow effects on hover
- Corner decorations for retro-futuristic aesthetic
- Smooth fade animations and scale transforms

**Asset Pipeline Established:**
- `/public/rooms/` directory structured with naming conventions
- Comprehensive guide created (`ASSETS_README.md`) for video/image requirements
- Critical alignment documented: first frame = source room, last frame = destination room

The experience transformed from clicking hotspots to making narrative choices that trigger immersive first-person transitions. This is now a true **Cinematic Decision Engine**.

---

### December 10, 2025 - 10:08 AM (10:08:50)
**Feature Lock:** Implement "Coming Soon December 12th" Restriction

With the Cinematic Engine built, the strategic decision was made to lock it behind a launch date. Players would see the system but couldn't interact until December 12th, 2025.

**Implementation:**
- **Header Replacement**: Room navigation buttons replaced with animated "COMING SOON: DECEMBER 12TH" message
- **Error Indicator**: Red pulsing alert icon pointing to disabled "ROOMS [LOCKED]" button
- **Full Lock Overlay**: Semi-transparent backdrop with centered lock icon, "ACCESS RESTRICTED" message, and unlock date
- **Engine Preview**: Background visible at 30% opacity with blur effect—players can see what's coming but can't interact
- **Disabled Prop**: `CinematicEngine` now accepts `disabled={true}` to prevent all card clicks and transitions

**Visual Polish:**
- Animated pulse effects on "Coming Soon" text and error icon
- Red theme for locked state (vs amber for active state)
- Large lock icon with amber accents maintaining S33K3R aesthetic
- Clear unlock date display: "DECEMBER 12TH, 2025"

**Purpose**: Build anticipation. Let players see the sophistication of what's coming, but hold back the full experience until the reveal date. The ARG continues—December 12th becomes a key date in the narrative.

---

### December 10, 2025 - 10:28 AM (10:28:56)
**Deployment Config:** Enable Static Export for Cloudflare Pages

With the Cinematic Engine locked and ready, deployment infrastructure needed optimization. Next.js configuration was updated to support static export for Cloudflare Pages deployment.

**Configuration Changes** (`next.config.mjs`):
- **Static Export Mode**: Set `output: 'export'` to generate fully static HTML/CSS/JS
- **Image Optimization**: Set `images: { unoptimized: true }` to prevent Image component build errors in static mode
- **Cloudflare Compatibility**: Static export ensures seamless deployment to Cloudflare Pages without serverless requirements

**Why Static Export?**
- No server-side rendering needed for this ARG experience
- Faster page loads (pre-rendered at build time)
- CDN-friendly (Cloudflare's edge network delivers static assets globally)
- Perfect for the locked Cinematic Engine (no dynamic server logic until December 12th unlock)

The transmission is now optimized for global distribution. December 12th will arrive at the same instant across all time zones.

---

## **REFLECTION**

From a mysterious transmission on November 29th to a fully-featured ARG experience with hidden puzzles, easter eggs, immersive audiovisual effects, and now a **locked Cinematic Narrative Engine** awaiting its December 12th debut—this project has been a journey of creative iteration, problem-solving, and user experience refinement.

Each commit represented a decision, a fix, or a new feature. Some commits were moments of inspiration (the CRT TV, the easter eggs, the Cinematic Engine pivot). Others were technical pragmatism (video compression, autoplay fixes, TypeScript migration, feature locks, deployment optimization). Together, they built something that feels alive—a transmission from an alternate reality, waiting to be deciphered.

The S33K3R TRANSMISSION is live. The puzzle is solvable. The secrets are hidden but discoverable. The Cinematic Narrative Engine is visible but locked. And the countdown to December 12th has begun.

**What happens on December 12th, 2025?**

The rooms unlock. The choices become real. The narrative branches.

That's for the players to find out.

---

### December 10, 2025 - 10:48 AM (10:48:40)
**Layout Restoration:** Return to Original Landing Page Experience

After building the Cinematic Engine infrastructure, the strategic decision was made to restore the original landing page layout while preserving the new engine code for the December 12th unlock.

**Changes Made:**
- **Removed Cinematic Engine** from main page view (code preserved for later activation)
- **Restored Original Puzzle Game**: 3x3 sliding tile puzzle now back below the CRT TV section
- **Restored Message Component**: The cryptic "THEY SAY THE S33K3R TRANSMISSION..." section with puzzle instructions
- **Fixed Navbar**:
  - Removed "BROTHEL ROOM" link (deprecated point-and-click system)
  - Added animated "COMING SOON: DEC 12" label (non-clickable)
  - Added "ROOM [LOCKED]" disabled button with red styling
  - Retained HOME, TRANSMISSIONS, THE PUZZLE navigation links
- **Minimized Footer**: Reduced padding (`py-8` → `py-4`) and text sizes for cleaner bottom bar
- **Layout Flow**: Removed sticky positioning from CRT/video background elements to restore natural scrolling

**User Experience:**
Players now land on the familiar puzzle-focused ARG experience. The Cinematic Engine is hidden but ready. December 12th will trigger the reveal—when the "ROOM [LOCKED]" button activates and players can enter the FMV narrative system.

**Build Status:** Static export successful. All routes optimized for Cloudflare Pages.

---

### December 10, 2025 - 10:50 AM (10:50:00)
**UI Polish & Cleanup:** Layout Refinements and Easter Egg Removal

Final polish pass before the December 12th reveal, focusing on visual clarity and removing distracting elements.

**Layout Improvements:**
- **Header Transparency**: Made "THE S33K3R TRANSMISSION" header more transparent (`bg-opacity: 95% → 60%`) to better blend with background
- **CRT TV Size Increase**: 
  - Mobile: `w-64 h-48` → `w-80 h-60` (+25%)
  - Tablet: `w-96 h-72` → `w-[480px] h-[360px]` (+25%)
  - Desktop: `w-[500px] h-[375px]` → `w-[600px] h-[450px]` (+20%)
  - TV now fills more screen real estate without overwhelming the layout
- **Footer Message Visibility**: Changed hidden message from `text-stone-900` to `text-stone-600` and increased size from `text-[8px]` to `text-[10px]`—"THE TRUTH IS HIDDEN IN PLAIN SIGHT" is now actually readable

**Easter Egg Removal:**
- Removed FartBubble component entirely (kept the mystery menu, removed the juvenile distraction)
- Cleaner, more focused landing experience

**Rationale**: With December 12th approaching, the landing page needed to be refined and professional. The fart bubble was a fun experiment but detracted from the ARG's serious tone. The layout adjustments ensure the CRT TV is the focal point and the footer secret is discoverable.

---

### December 10, 2025 - 11:00 AM (11:00:00)
**Live Event System:** Time-Triggered Cinema Screen Transformation
Implemented a real-time event system that transforms the experience precisely at **December 12, 2025, 10:00 AM PST**. This is the core mechanism for the ARG's climactic reveal.

---

### December 11, 2025 - 10:45 AM (10:45:00)
**Transmission Compression & Room Asset Policy**

**Video Compression:**
- Original master: `public/rooms/THE S33K3R TRANSMISSION .mp4` (505 MB) — left locally, now gitignored to keep repo lean.
- New MP4 delivery copy: `public/rooms/the-s33k3r-transmission-100mb.mp4` (~94.7 MB, H.264, AAC) capped under 100 MB for web delivery.
- New WEBM delivery copy: `public/rooms/the-s33k3r-transmission-100mb.webm` (~99.1 MB, VP9, Opus) capped under 100 MB.
- Target: keep all distributable media in `/public/rooms/` under 100 MB to avoid repo bloat and hosting friction.

**Room Asset Naming Rule:**
- Only track room art named with `_room`, `_room1`, `_room2`, etc. (e.g., `saloon_room.png`, `cave_room2.png`).
- Ignore or gitignore any `/public/rooms/` assets that do not follow the `_room` naming convention or exceed 100 MB.
- Reason: keeps git clean, prevents accidental commits of exploratory renders/screenshots.

**Status:**
- Added gitignore entry for the 505 MB master (`THE S33K3R TRANSMISSION .mp4`).
- Delivery MP4 + WEBM ready for app consumption (both <100 MB).

**Time-Based State Management:**
- **Target Timestamp**: `2025-12-12T10:00:00-08:00` (December 12, 2025, 10:00 AM PST)
- **Client-Side Polling**: `useEffect` checks current time every second
- **State Tracking**: Maintains `isAfterTargetTime` boolean and initialization flag
- **Cross-Session Persistence**: Time check happens on every page load and continuously while page is open

**Visual Transformation:**
- **Before Target Time**: CRT TV (4:3 aspect ratio) displays retro transmission
- **Live Transition**: If user is on the page when time crosses threshold:
  - 3-second **glitch effect** overlay activates
  - Red/cyan color shifting
  - Static noise animation
  - "SIGNAL SHIFT" message appears
  - Screen transforms seamlessly from CRT to Movie Screen
- **After Target Time**: Movie Screen (16:9 widescreen) replaces CRT permanently

**MovieScreen Component** (`src/components/MovieScreen.jsx`):
- **16:9 Cinematic Aspect Ratio**: Full widescreen theater experience
- **Theater Curtains**: Dark red gradient curtains framing the screen (top, bottom, sides)
- **Video Playback Ready**: Configured for `/video/transmission.mp4` and `.webm`
- **Popcorn Button**: 🍿 Large animated button with play/pause functionality
- **Placeholder State**: Shows "TRANSMISSION READY" message until video is uploaded
- **Film Grain Effect**: Subtle texture overlay for cinematic feel
- **Scanline Effect**: Maintains retro aesthetic even in movie mode

**Video Directory Setup:**
- Created `/public/video/` directory for transmission video files
- Added comprehensive `README.md` with video specs:
  - Recommended format: 1920x1080, H.264/VP9 codecs
  - File naming: `transmission.mp4` and `transmission.webm`
  - Bitrate/quality guidelines for web delivery
- Video playback with sound enabled (unlike CRT which can be muted)

**User Experience Flow:**
1. **Before Dec 12**: Users solve puzzle, watch CRT TV, explore ARG
2. **At 10:00 AM PST**: If users are online, they see the **live transformation** with glitch effect
3. **After Dec 12**: New visitors see Movie Screen immediately, no CRT
4. **Video Interaction**: Click 🍿 popcorn button to play transmission video

**Technical Implementation:**
- No server-side logic required (static export compatible)
- Time checks use browser's local time converted to PST
- Glitch animation uses existing CSS keyframes
- Conditional rendering: `{isAfterTargetTime ? <MovieScreen /> : <CRTOverlay />}`

**Why This Matters:**
This creates a **live ARG event**. Players who are online at the exact moment witness the transformation happen in real-time. Those who visit later see the new state. The countdown in the Navbar now has tangible meaning—December 12th isn't just a date, it's when the transmission fundamentally changes.

---

### December 11, 2025 - 10:45 AM (10:45:00)
**Transmission Compression & Room Asset Policy**

**Video Compression:**
- Original master: `public/rooms/THE S33K3R TRANSMISSION .mp4` (505 MB) — left locally, now gitignored to keep repo lean.
- New MP4 delivery copy: `public/rooms/the-s33k3r-transmission-100mb.mp4` (~94.7 MB, H.264, AAC) capped under 100 MB for web delivery.
- New WEBM delivery copy: `public/rooms/the-s33k3r-transmission-100mb.webm` (~99.1 MB, VP9, Opus) capped under 100 MB.
- Target: keep all distributable media in `/public/rooms/` under 100 MB to avoid repo bloat and hosting friction.

**Room Asset Naming Rule:**
- Only track room art named with `_room`, `_room1`, `_room2`, etc. (e.g., `saloon_room.png`, `cave_room2.png`).
- Ignore or gitignore any `/public/rooms/` assets that do not follow the `_room` naming convention or exceed 100 MB.
- Reason: keeps git clean, prevents accidental commits of exploratory renders/screenshots.

**Status:**
- Added gitignore entry for the 505 MB master (`THE S33K3R TRANSMISSION .mp4`).
- Delivery MP4 + WEBM ready for app consumption (both <100 MB).

---

## **REFLECTION**

From a mysterious transmission on November 29th to a fully-featured ARG experience with hidden puzzles, easter eggs, immersive audiovisual effects, a **staged reveal strategy** for the Cinematic Narrative Engine, and now a **live time-triggered event system**—this project has been a journey of creative iteration, problem-solving, and user experience refinement.

Each commit represented a decision, a fix, or a new feature. Some commits were moments of inspiration (the CRT TV, the easter eggs, the Cinematic Engine pivot, the live transformation). Others were technical pragmatism (video compression, autoplay fixes, TypeScript migration, feature locks, deployment optimization, layout restoration, UI polish, time-based state management). Together, they built something that feels alive—a transmission from an alternate reality, waiting to be deciphered.

The S33K3R TRANSMISSION is live. The puzzle is solvable. The secrets are hidden but discoverable. The Cinematic Narrative Engine is built and waiting in the shadows. The live event timer is counting down. And December 12th at 10:00 AM PST will mark the moment everything changes.

**What happens on December 12th, 2025 at 10:00 AM PST?**

The CRT glitches. The screen transforms. The movie begins. The rooms unlock. The choices become real. The narrative branches. The transmission evolves into something new.

That's for the players to discover—in real time.

---

**END TRANSMISSION**

*Devlog written December 8-10, 2025*  
*Author: @theseeker713*
