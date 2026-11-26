## 1.0.0

* **Breaking:** requires Node.js `>=26` (`engines` field and `.nvmrc` added).
* **Breaking:** NestJS peer dependencies bumped to `^12.0.0` (`@nestjs/common`, `@nestjs/core`).
* Updated hyper-express to 7.0.2 (uWebSockets.js v20.69.0), which brings Node 26 support.
* Updated runtime deps: body-parser 2.4.0, content-type 3.1.1 (ships own types), cors 2.8.6.
* Updated tooling: TypeScript 6, Jest 30, ESLint 10 (flat config `eslint.config.js`) with typescript-eslint 8 and @stylistic, Prettier 3.
* Adapter: added `getHeader()` (new abstract member in Nest 12) and switched to Nest 12 public/`internal` entry points.
* Fix: Server-Sent Events (`@Sse()`) now work. `req.raw` / `res.raw` point to the hyper-express Request/Response so NestJS can pipe into them. Previously SSE failed with `dest.on is not a function`; on Nest 12 the same bug crashed the whole process.
* See [UPGRADE-1.0.0.md](./UPGRADE-1.0.0.md) for the full list of changes and migration steps.

## 0.4.0

* 
1. Handling of useStaticAssets function to serve static files (e.g., images, CSS, JavaScript, or other assets) from a specified directory.
2. Fix multipart field toBuffer function

## 0.3.0

* Updated hyper-express to 6.17.3 which brings node 23 support

## 0.2.0

* Add parse for 'multipart/form-data' content-type to support Multipart Request


## 0.1.2

* Updated hyper-express to 6.17.2 which brings node 22 support