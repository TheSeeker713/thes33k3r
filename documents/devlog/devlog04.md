# Building the cinematic room engine

### [December 10th, 2025] [10:08 AM MT]

On December 10, I added the cinematic engine. The basic sequence was straightforward: load a room, play its video, then offer choices that lead somewhere else. I wanted the movement through the world to come from the scene and the player's decision.

The room definitions held the video, the available choices and their destinations. Keeping that information separate from the player made the engine easier to reuse. A new room could be described through its data without rebuilding the video interface each time.

## What this version actually contained

The commit included five sample room configurations and choice cards. Those examples established the structure for an FMV experience; they weren't five finished chapters of a game. That difference matters when looking back at how quickly the code developed.

I also included a date gate for the planned December 12 reveal. It was a presentation rule based on the visitor's clock. Content that needed access protection would require a server-side decision.

## Keeping the build deployable

The next change enabled Next.js static export and disabled its server-dependent image optimization. Cloudflare Pages needed a set of files it could serve from the export directory. The room engine had to work within that delivery model.

This pass gave me the structure for videos, transitions and choices. The next problem was deciding how to introduce it without losing the CRT presentation that already gave the landing page its identity.

---

## Sources

Work dates follow the linked commit record in Mountain Time. This account was revised on October 3, 2026.

### GitHub commits

- [f9d5e38 — Introduce the FMV room engine and sample room configuration](https://github.com/TheSeeker713/thes33k3r/commit/f9d5e38185400cc0cdab97ecd55a99025dbe7e56)
- [a5efe72 — Enable static export and unoptimized images](https://github.com/TheSeeker713/thes33k3r/commit/a5efe72c195d91ee9837e9dc45dfd08280b0a20c)

### Site source at this stage

- [Cinematic-engine source](https://github.com/TheSeeker713/thes33k3r/blob/f9d5e38185400cc0cdab97ecd55a99025dbe7e56/src/components/CinematicEngine.tsx)
- [Room and choice definitions](https://github.com/TheSeeker713/thes33k3r/blob/f9d5e38185400cc0cdab97ecd55a99025dbe7e56/src/types/game.ts)
- [Static-export configuration](https://github.com/TheSeeker713/thes33k3r/blob/a5efe72c195d91ee9837e9dc45dfd08280b0a20c/next.config.mjs)
