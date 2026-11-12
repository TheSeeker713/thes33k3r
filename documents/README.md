# THE S33K3R TRANSMISSION

A cinematic alternate-reality experience with a transmission player, eleven character fragments, a development archive, and the single-player Bank encounter.

## Stack

- Next.js 16 App Router with static export
- React 19 and TypeScript/JavaScript
- Tailwind CSS v4 and Framer Motion
- Cloudflare Pages with Pages Functions for HTML security headers

## Development and checks

Use Node.js 24 (see .nvmrc), then run:

```sh
npm ci
npm run dev
```

Before publishing:

```sh
npm audit --audit-level=moderate
npm run lint
npm run build
npm run verify
npx playwright install chromium
npm test
```

The build writes the static site to `out/` and generates script hashes and security headers. After building, `npm start` previews that export at http://localhost:3000, including extensionless routes. This local static preview does not execute Cloudflare Pages Functions or apply Cloudflare header rules; use the Pages deployment to verify those protections.

## Transmission and game changes

- The current cinematic player is `src/components/MovieScreen.jsx`; update its privacy-enhanced YouTube embed and direct-watch link together.
- The background loop is `public/background.webm`, controlled by `src/components/VideoBackground.jsx`.
- Bank gameplay lives in `src/components/BankEncounter.tsx`; `BankVideo.tsx` provides playback recovery and always-available continue controls.
- Character ordering and portraits are shared through `src/lib/fragments.js`.
- Archive metadata is in `src/app/devlog/data/`, with reading copies in `public/devlog/` and `documents/devlog/`.
- `CRTOverlay.jsx` is a legacy component, not the current transmission player. Canonical video assets use WebM; do not add ignored MP4 sources.

## Deployment

The existing Cloudflare Pages project `thes33k3r` deploys the GitHub `main` branch using `npm run build` and output directory `out`. Verify both the GitHub Website checks workflow and Cloudflare Pages check after pushing. The site is published at https://www.thes33k3r.com.

The static header generator is `scripts/security-headers.mjs`. Production HTML nonces and the legacy Bank redirect are handled by `functions/_middleware.js`. Keep `public/_routes.json` aligned with that middleware.
