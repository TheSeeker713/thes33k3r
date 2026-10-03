# Signal Teal website rebuild — October 2, 2026

Authorized scope: redesign and deploy the existing website, update copyright, relocate Bank, improve security. No contest multiplayer page or multiplayer services created.

## Design and content
- Light is the default; visitors can explicitly choose and retain dark mode.
- Signal Teal palette: warm ivory #F4F1E8, deep ink #182B2D, teal #287F80, amber #C48A35, fog #BBC8C4. Interactive teal is darkened for text contrast.
- Original background.webm loop retained in the cinematic section with a pause control and reduced-motion handling.
- Theater player retained as a cinematic presentation, with original teal theater artwork and click-to-load privacy-enhanced YouTube embed. No third-party video request before activation.
- Collective content follows the supplied eleven-fragment canon. The October 2 character update names the Twin Seekers Ethan James Walker and Emma Grace Walker: male and female alternate-reality versions of the same person, each a distinct fragment within S33k3r.
- Bank moves to /games/bank; Cloudflare redirect preserves /bank links. Existing Bank media retained. Missing reward background recovered from its existing reward video.
- All eight historical devlog source files preserved verbatim. Rendering is now readable and HTML is sanitized.
- Footer: creator role and company credit, © Mycelia Interactive 2026, protected intellectual-property wording.

## Stack research
Current stable package versions were queried from the official npm registry; lockfile records exact resolved versions. Next.js static export retained for the existing Cloudflare Pages deployment. Node 24 selected as supported LTS deployment runtime. Webpack used for a reliable build in the local sandbox.

Primary references:
- https://nextjs.org/docs/app/guides/static-exports
- https://nextjs.org/blog
- https://developers.cloudflare.com/pages/configuration/headers/
- https://developers.cloudflare.com/bots/get-started/bot-fight-mode/
- https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/

## Security implementation
Build generates route-specific SHA-256 CSP hashes for Next.js inline hydration scripts. No unsafe-inline script permission or unsafe-eval. Style inline permission is needed by existing animation components. CSP limits resource origins, denies embedding, plugins and external forms, and upgrades insecure requests. Headers include nosniff, referrer policy, HSTS (30 days) and Permissions-Policy denying unused device access. Microphone access is intentionally unavailable until gameplay endpoints are built and reviewed.

Security reporting contact uses the repository owner's configured company email. security.txt expiry: September 1, 2027; review before expiration.

CI runs install, vulnerability audit, scoped JavaScript lint, build/type checks and exported-page verification. No secrets, credentials or AI API keys shipped to browsers. No permissive CORS headers. Repository history contains the prior website for recovery.

## Multiplayer boundary
This static website does not implement or claim multiplayer security. Future services require authoritative state, identity/session management, per-room authorization, server-side API credentials, request validation, rate limits, WebSocket Origin checks, replay/stale-request protection and voice-data handling. Bot Fight Mode cannot be skipped by WAF custom rules; re-evaluate the gameplay service hostname before introducing non-browser/WebSocket endpoints. Global microphone-deny must be changed only for reviewed voice functionality.

## Artwork provenance
Generated with the built-in image-generation tool. No purchased assets. WebP derivatives shipped to the site; original PNGs retained locally.
- Park prompt: photoreal empty liminal amusement park, wet canal walkway, oxidized teal railings, ivory weathered facades, amber lamps, fog, distant original mine coaster, no text/characters/copyrighted rides, dark quiet left third for title.
- Theater prompt: front-on realistic small vintage theater, teal velvet curtains, brass proscenium and warm sconces, dark seats along bottom, blank centered screen for real iframe overlay, no text or people.

## Cloudflare account changes verified
- Domain Bot Fight Mode: enabled.
- AI Labyrinth: enabled.
- Always Use HTTPS: enabled.
- HSTS: enabled for one month, includeSubDomains and preload deliberately off until other hostnames are audited.
- Minimum TLS: 1.2; TLS 1.3 remains enabled.
- Existing Pages project thes33k3r is linked to TheSeeker713/thes33k3r; production main; auto deployments enabled; npm run build; out; build system v3.

## Validation before first push
Production build and TypeScript checks passed. Scoped lint passed. All 14 content routes, their referenced local resources, CSP inline hashes, footer, light default, redirect and security contact passed export verification. Dependency audit reports zero known vulnerabilities. Desktop and 390px phone previews checked; mobile menu, light/dark toggle and YouTube embed activation verified in browser. Actual physical iOS/Android testing remains a separate compatibility check.

## Bot-detection CSP compatibility
Production Pages middleware creates a fresh 192-bit random nonce for every HTML response, sets it on application scripts through HTMLRewriter, and provides the nonce CSP that Cloudflare JavaScript Detections reads for its injected scripts. HTML responses use no-store and no validators to prevent nonce reuse; static assets retain Pages caching. The generated hash headers remain a static-export fallback. Middleware implements the legacy Bank redirect because Pages Functions responses do not use static redirect rules. No authentication or multiplayer endpoints are introduced.
References: https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/ and https://developers.cloudflare.com/pages/functions/middleware/
Cloudflare Wrangler 4.147.0 runtime verification passed: independent responses have different nonces, every application script has its matching nonce, HTML is no-store, script policy excludes unsafe-inline, and /bank redirects successfully.

## Production verification and requested polish
GitHub checks passed after production pushes. Live website, archive routes, light/dark toggle, privacy-enhanced theater activation, video loop playback and /bank redirect were verified in browser. All content pages fit a 390px viewport without horizontal overflow. Homepage also checked at 320px, 375px and 768px; Bank card interface checked at 390px in the Cloudflare runtime. Physical-device testing remains unperformed. Cloudflare bot protection rejected automated Python requests while the browser site remained functional.
At user request, background video visibility increased from 6.5% to 12% in light mode and 14% to 20% in dark mode; text and theater controls remain foregrounded.

## Character portraits and collective cards
The eight approved environment portraits (Soul, Shadow, Radio, Lost, Ethan, Emma, Silent and modern-cloaked Unknown) replace their landing-page symbols. Sun, Star and Song retain their symbols until their existing approved portraits are supplied. Every landing-page profile links to its matching collective card. The same shared fragment list controls both pages, preserving all eleven identities and their order.

The collective page presents portrait cards with accessible image descriptions, fragment numbers, names and concise roles. The Walkers' descriptions establish their alternate-self relationship; the temporary naming notices are removed. Unknown retains his concealed face and bronze triangle pin.

Approved PNG originals are retained in the local character pack. The site ships WebP derivatives at 768 pixels wide for cards and 256 pixels wide for profile images, approximately 1.7 MB total. Images load lazily with reserved layout dimensions. Profile crops use CSS; the approved artwork is not regenerated or repainted. Cards use three columns on desktop, two on tablets and one below 650px. The landing roster wraps to six columns on tablets and four on phones. Light remains the default; dark-mode tokens and reduced-motion settings are preserved.
