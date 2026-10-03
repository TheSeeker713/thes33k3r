# Working through Cloudflare security

### [October 2nd, 2026] [11:03 PM MT]

Cloudflare security needed to be part of the rebuild, especially with multiplayer planned for a later stage. I started with the website we actually have: a static export with browser interactions and an embedded theater player.

I tightened the content security policy so the page only loads scripts and other resources from the origins it needs. The response headers also deny framing, restrict unused device permissions, reduce referrer disclosure and tell browsers to use HTTPS.

## Getting bot detection and the script policy to cooperate

Cloudflare's bot detection can inject its own script. A strict policy has to account for that without giving every inline script permission to run. The Pages middleware creates a fresh random nonce for each HTML response and adds it to the application scripts. The policy uses that nonce alongside the required Cloudflare origins.

Those HTML responses use no-store caching and omit validators so a nonce isn't reused through a cached document. Static assets can still use normal Pages caching. The generated hash-based policy remains available for the static export.

I also removed the default permissive CORS header from HTML responses. Separately, I cleaned generated Wrangler cache files out of version control and added ignore rules. Runtime cache files had no reason to be in the website's source history going forward.

## What was configured, and what remains future work

The rebuild record documents Bot Fight Mode, AI Labyrinth and Always Use HTTPS enabled on the domain, a minimum TLS version of 1.2 with TLS 1.3 enabled, and a one-month HSTS policy. The HSTS preload and subdomain options were left off pending a wider hostname review. I added a security-reporting contact to the site as well.

This release did not build multiplayer authentication, room authorization or server-validated gameplay. Those services will need their own session handling, request validation, rate limits and WebSocket checks. Voice features will also need a deliberate permissions and data-handling design.

The current protections are a foundation for the website. They aren't a substitute for that future service work, and I want the development record to make that clear.

---

## Sources

Work dates follow the linked commit record in Mountain Time. This account was revised on October 3, 2026.

### GitHub commits

- [4693531 — Add security headers, middleware and verification](https://github.com/TheSeeker713/thes33k3r/commit/4693531d5eb845cbd5072742b80db2a971e34308)
- [c8c07c4 — Remove generated Wrangler cache files from tracking](https://github.com/TheSeeker713/thes33k3r/commit/c8c07c4819b9b9f700639a9fb1836a5ec3505e1c)
- [aff6ee9 — Remove the default permissive CORS response header](https://github.com/TheSeeker713/thes33k3r/commit/aff6ee939971c9904e178e26940f469eeedfd099)

### Site source at this stage

- [Cloudflare response-security implementation](https://github.com/TheSeeker713/thes33k3r/blob/aff6ee939971c9904e178e26940f469eeedfd099/functions/_middleware.js)
- [Static-export security policy](https://github.com/TheSeeker713/thes33k3r/blob/4693531d5eb845cbd5072742b80db2a971e34308/scripts/security-headers.mjs)
- [Security-reporting contact](https://github.com/TheSeeker713/thes33k3r/blob/4693531d5eb845cbd5072742b80db2a971e34308/public/.well-known/security.txt)
- [Recorded Cloudflare settings and multiplayer boundary](https://github.com/TheSeeker713/thes33k3r/blob/aff6ee939971c9904e178e26940f469eeedfd099/documents/WEBSITE_REBUILD_2026.md)
