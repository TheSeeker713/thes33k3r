# Rebuilding the site behind the design

### [October 2nd, 2026] [11:03 PM MT]

The Signal Teal commit included the underlying rebuild as well as the new design. I'm recording that work separately because a finished-looking homepage doesn't tell you whether the routes, media and deployment are in good shape.

I kept Next.js static export for the existing Cloudflare Pages project. That matched the site being built: content pages, a cinematic player and the browser-based Bank encounter. It also meant the deployment could continue serving the exported files from the repository's main branch.

## Updating the tools without changing the job

The package update used the current registry versions researched during the rebuild: Next.js 16.3.8, React 19.3, Tailwind 4.3 and Motion 14. The deployment runtime was set to Node 24. The lockfile records the resolved dependencies so the build isn't left to guess which versions were used.

I used the Webpack build path because it produced a reliable export in the working environment. The goal was a build I could verify and deploy, not an extra tool change that the site didn't need.

## Checking the files that would actually be served

I added GitHub checks for installation, the dependency audit, scoped linting, the production build and export verification. The export checks covered the content routes, local resources, footer, light-mode default, security policy and legacy Bank redirect.

The missing Bank reward background also needed attention. I recovered it from the existing reward video and shipped a WebP version. Rebuilding the main website shouldn't leave the earlier game pointing at an unavailable image.

The pages now share a common shell. That keeps the header, footer and overall presentation consistent as visitors move between the landing page, the collective, the games and the Archive.

This is the implementation side of the same release described in entry 09. It doesn't represent a second deployment or a separate day of development.

---

## Sources

Work dates follow the linked commit record in Mountain Time. This account was revised on October 3, 2026.

### GitHub commits

- [4693531 — Rebuild the site and add deployment checks](https://github.com/TheSeeker713/thes33k3r/commit/4693531d5eb845cbd5072742b80db2a971e34308)

### Site source at this stage

- [Package versions and build commands](https://github.com/TheSeeker713/thes33k3r/blob/4693531d5eb845cbd5072742b80db2a971e34308/package.json)
- [Deployment runtime selection](https://github.com/TheSeeker713/thes33k3r/blob/4693531d5eb845cbd5072742b80db2a971e34308/.node-version)
- [GitHub verification workflow](https://github.com/TheSeeker713/thes33k3r/blob/4693531d5eb845cbd5072742b80db2a971e34308/.github/workflows/website-checks.yml)
- [Exported-page checks](https://github.com/TheSeeker713/thes33k3r/blob/4693531d5eb845cbd5072742b80db2a971e34308/scripts/verify-export.mjs)
- [Shared page structure](https://github.com/TheSeeker713/thes33k3r/blob/4693531d5eb845cbd5072742b80db2a971e34308/src/components/SiteShell.jsx)
