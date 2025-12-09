# GitHub Copilot Instructions

## Project Technology Standards

### Framework & Library Versions
- **Next.js:** Always use Next.js 16 or latest stable version (never downgrade below v16)
- **React:** Always use React 19 or latest stable version (maintain bleeding-edge)
- **Tailwind CSS:** Always use Tailwind CSS v4 or latest stable version

### When Creating or Upgrading Projects

1. **Next.js Projects:**
   - Use `npx create-next-app@latest` for new projects
   - For existing projects, upgrade to Next.js 16: `npm install next@latest`
   - Always enable App Router (not Pages Router)
   - Use TypeScript by default unless explicitly asked for JavaScript
   - Configure for Turbopack (Next.js 16's default bundler)

2. **React Version:**
   - Install React 19: `npm install react@latest react-dom@latest`
   - Use `'use client'` directive for all components with:
     - React Hooks (useState, useEffect, useRef, etc.)
     - Event handlers (onClick, onChange, etc.)
     - Browser APIs (Web Audio, localStorage, etc.)
   - Keep Server Components by default unless client interactivity is needed

3. **Tailwind CSS v4:**
   - Install: `npm install -D tailwindcss@latest @tailwindcss/postcss@latest postcss@latest`
   - Use CSS-first configuration (no `tailwind.config.js`)
   - Configure via `@theme` directive in CSS files
   - Create `postcss.config.mjs` with `@tailwindcss/postcss` plugin
   - Import with `@import "tailwindcss"` in global CSS

### Configuration Files

**package.json scripts:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**next.config.mjs (minimal):**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is default in Next.js 16
  // Add custom config only when needed
};
export default nextConfig;
```

**postcss.config.mjs:**
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

**Tailwind CSS v4 in globals.css:**
```css
@import "tailwindcss";

@theme {
  /* Custom design tokens here */
  --color-primary: #...;
}

@layer base {
  /* Base styles */
}
```

### Dependency Management

**Always check and upgrade:**
```bash
npm install next@latest react@latest react-dom@latest
npm install -D tailwindcss@latest @tailwindcss/postcss@latest
npm install -D eslint-config-next@latest
```

**Remove outdated dependencies:**
- Remove Vite if migrating from Vite
- Remove `@tailwindcss/vite` (v4 uses PostCSS)
- Remove old Tailwind config files (v4 is CSS-first)
- Remove Pages Router files if using App Router

### Project Structure

**Next.js 16 App Router:**
```
src/
├── app/
│   ├── layout.jsx (or .tsx)
│   ├── page.jsx
│   └── globals.css
├── components/
│   └── [components with 'use client' as needed]
└── lib/
    └── [utilities, helpers]
```

### Verification Commands

After setup or upgrade, always verify:
```bash
npm list next react react-dom tailwindcss
npm run dev
npm run build
```

### Never Do:
- ❌ Don't downgrade to Next.js 15 or lower
- ❌ Don't use React 18 or lower (unless explicitly required for legacy support)
- ❌ Don't use Tailwind CSS v3 config format with v4
- ❌ Don't mix Pages Router with App Router
- ❌ Don't use webpack config for Next.js 16 (use Turbopack)

### Migration Priority:
When working with existing projects:
1. Check current versions: `npm list next react tailwindcss`
2. If outdated, propose upgrade to latest versions
3. Update configuration files for new versions
4. Test build and dev server after upgrade
5. Document breaking changes and required code updates

---

**Remember:** Always maintain bleeding-edge versions (Next.js 16+, React 19+, Tailwind v4+) unless there's a specific technical constraint preventing the upgrade.
