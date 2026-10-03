# Moving from the landing page into a world

### [December 1st, 2025] [3:56 PM MT]

A single landing page was no longer enough for the direction I wanted to take. I moved the project from Vite to Next.js, with React 19, TypeScript and Tailwind 4 in the December build. The change let me organize the experience into routes instead of putting every new idea into the same page.

Before that migration, I revised the navigation and removed the hidden menu. Those changes made the main paths easier to find. I wanted visitors to be able to explore the world without having to discover the website's basic controls first.

## Letting the visitor start the sound

The video loop also needed a more sensible relationship with browser playback rules. I made it start muted and added unmuting after a user gesture. A visitor clicking a control is a useful boundary: it tells the browser that the sound is wanted, and it gives the person using the site a say in when it begins.

## A room that could be reused

The new InteractiveRoom component placed clickable areas over a room image. Each area had a position, a label and an action. That was the useful part of the migration for me. I could begin describing a place through its objects and interactions, then reuse the same structure for another room.

I followed with changes to the sticky navigation, room links, shared header and footer, and anchor behavior. These fixes weren't separate from the experience. If a player followed a link and lost their way back, the room system hadn't done its job.

The room component gave me a way to build locations without starting over. The cinematic engine and the Bank would come next.

---

## Sources

Work dates follow the linked commit record in Mountain Time. This account was revised on October 3, 2026.

### GitHub commits

- [7e3f4ca — Revise navigation and remove the hidden menu](https://github.com/TheSeeker713/thes33k3r/commit/7e3f4cab749e80bdd7cbf05a885bc180e438f992)
- [24a03d8 — Start background playback muted](https://github.com/TheSeeker713/thes33k3r/commit/24a03d8ca28cf0dd1235e3ba41bdb67a84604222)
- [16156a3 — Unmute following a user gesture](https://github.com/TheSeeker713/thes33k3r/commit/16156a3beaace684a87dc21229adb64d76a90c7e)
- [052206b — Migrate to Next.js and introduce interactive rooms](https://github.com/TheSeeker713/thes33k3r/commit/052206bb5c205104a7d8d194209b055335d00a2d)
- [d7eae7c — Keep navigation available across room pages](https://github.com/TheSeeker713/thes33k3r/commit/d7eae7cae9278abbcf3e60e3a8a0af1eb625919c)
- [1b0ae9b — Correct shared layout and anchor behavior](https://github.com/TheSeeker713/thes33k3r/commit/1b0ae9b672bcf172f824c665017897352149b291)

### Site source at this stage

- [Reusable interactive-room source](https://github.com/TheSeeker713/thes33k3r/blob/052206bb5c205104a7d8d194209b055335d00a2d/src/components/InteractiveRoom.tsx)
- [Migration record](https://github.com/TheSeeker713/thes33k3r/blob/052206bb5c205104a7d8d194209b055335d00a2d/documents/MIGRATION_SUMMARY.md)
- [Navigation source](https://github.com/TheSeeker713/thes33k3r/blob/1b0ae9b672bcf172f824c665017897352149b291/src/components/Navbar.jsx)
