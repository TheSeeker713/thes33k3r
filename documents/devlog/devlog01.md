# Starting with a screen

### [November 29th, 2025] [7:49 AM MT]

The first version of thes33k3r.com had a narrow job: give The S33k3r Transmission somewhere to begin. I built a React and Vite landing page around a CRT display, then pushed the initial site to GitHub on November 29, 2025.

I wanted the screen to feel like an object inside the world. The neo-western direction gave me a starting point: dark surfaces, worn colors and a transmission that looked as though it had traveled some distance before reaching you. At this stage, the site was a small experience built around that arrival.

## Getting it online

The deployment setup changed almost immediately. An initial GitHub Pages workflow gave way to Cloudflare Pages. I also tried a Wrangler configuration, then removed it and left the Pages build configuration in the Cloudflare dashboard. The repository needed to describe the site clearly without keeping two competing deployment setups.

The background video brought a practical limit into the work. The first file was too large for the intended Pages delivery, so I compressed it to fit the per-file upload limit. A loop can be an important part of the atmosphere, but it still has to download before anyone can see it.

## Giving the CRT something to do

I added a power interaction and the looping background. The power control gave visitors a small action before they read the message. That was an early decision about how this project should feel: the website could ask you to participate, even before there was a larger game to enter.

There was no Bank encounter yet, and no multiplayer service. This was the first screen, the first deployment and the beginning of the visual language I would keep revising.

---

## Sources

Work dates follow the linked commit record in Mountain Time. This account was revised on October 3, 2026.

### GitHub commits

- [2def37d — First React and Vite landing page](https://github.com/TheSeeker713/thes33k3r/commit/2def37d35e3a3585a5490db8a802f915c6a1ef14)
- [ca709c7 — Switch deployment to Cloudflare Pages](https://github.com/TheSeeker713/thes33k3r/commit/ca709c74c59cdeb6294941479d23449a1004c6a3)
- [2e93523 — Establish the neo-western visual direction](https://github.com/TheSeeker713/thes33k3r/commit/2e93523e504f526ecd39be20cefc71a152e1c018)
- [71d3e39 — Add the background loop and CRT power interaction](https://github.com/TheSeeker713/thes33k3r/commit/71d3e39404e4811b23d146649021e6adacb7c2c4)
- [defc1e7 — Compress the background video](https://github.com/TheSeeker713/thes33k3r/commit/defc1e75990010b2ded5d3a3ff9757fd21cc19cf)
- [fb58aa1 — Use the Cloudflare dashboard configuration](https://github.com/TheSeeker713/thes33k3r/commit/fb58aa17de39d3ca7412e602f248162e008b056a)

### Site source at this stage

- [Landing-page source](https://github.com/TheSeeker713/thes33k3r/blob/71d3e39404e4811b23d146649021e6adacb7c2c4/src/App.jsx)
- [Background-video source](https://github.com/TheSeeker713/thes33k3r/blob/fb58aa17de39d3ca7412e602f248162e008b056a/src/components/VideoBackground.jsx)
