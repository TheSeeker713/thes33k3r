// <define:__ROUTES__>
var define_ROUTES_default = { version: 1, include: ["/*"], exclude: ["/_next/*", "/images/*", "/rooms/*", "/background.webm", "/favicon.ico", "/icon.svg", "/robots.txt", "/sitemap.xml", "/.well-known/*", "/*.txt"] };

// ../../../../../.npm/_npx/d77349f55c2be1c0/node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/Users/thes33k3r/Documents/Codex/2026-10-02/files-pasted-by-the-user-continue/website/.wrangler/tmp/pages-k0wIdh/functionsWorker-0.6532923949760557.mjs";
import { isRoutingRuleMatch } from "/Users/thes33k3r/.npm/_npx/d77349f55c2be1c0/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/Users/thes33k3r/Documents/Codex/2026-10-02/files-pasted-by-the-user-continue/website/.wrangler/tmp/pages-k0wIdh/functionsWorker-0.6532923949760557.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=4fzhg24vnpq.js.map
