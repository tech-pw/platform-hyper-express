# Upgrade notes: 0.4.x → 1.0.0

`1.0.0` moves the adapter to **Node.js 26**, **NestJS 12** and **hyper-express 7**, with every dependency on its latest Node 26-compatible version.

## What consumers must do

1. Run on **Node.js >= 26** (`.nvmrc` included).
2. Upgrade `@nestjs/common` and `@nestjs/core` to **`^12.0.0`**.
3. Use a **glibc** image (Debian/Ubuntu). Alpine/musl is not supported by uWebSockets.js.
4. CommonJS apps need no changes. NestJS 12 is ESM-only, but Node 26 loads it via `require(esm)`.
5. Jest users: run Jest with `node --experimental-vm-modules` (see [Testing](#testing)).

## Dependency changes

| Package | 0.4.0 | 1.0.0 |
| --- | --- | --- |
| `hyper-express` | `^6.17.3` | `^7.0.2` (uWebSockets.js v20.69.0) |
| `content-type` | `1.0.5` | `3.1.1` (ESM, own types) |
| `body-parser` | `1.20.2` | `2.4.0` |
| `cors` | `2.8.5` | `2.8.6` |
| `@nestjs/*` (peer) | `^10.0.0` | `^12.0.0` |
| `typescript` | `^5.4.5` | `^6.0.3` (TS 7 not supported by ts-jest) |
| `jest` / `@types/jest` | `29` | `30` |
| `eslint` | `8` | `10` + `typescript-eslint` 8, `@stylistic` |
| `prettier` | `2` | `3` |
| `eventsource` | `2` | `5` |
| `@types/node` | `20` | `26` |

Removed: `@types/content-type`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`. Added: `typescript-eslint`, `@stylistic/eslint-plugin`, `@eslint/js`, `globals`, `@types/body-parser`, `reflect-metadata`. Minor bumps: `class-validator`, `pactum`, `rxjs`, `ts-jest`, `@types/cors`.

## Code changes

- **NestJS 12 imports:** deep paths like `@nestjs/common/interfaces` no longer resolve, so the adapter imports from `@nestjs/common`, `@nestjs/core` and their `/internal` entry points (same as `@nestjs/platform-express` 12).
- **`getHeader()`:** implemented; it's a new abstract method on `AbstractHttpAdapter`.
- **SSE fix:** `@Sse()` never worked, and on NestJS 12 it crashed the process (`dest.on is not a function`). NestJS pipes into `res.raw`, which in hyper-express is the native uWS object. A global middleware now points `req.raw`/`res.raw` at the hyper-express Request/Response.
  - **Behavior change:** `req.raw`/`res.raw` no longer return the native uWS objects.

## Config changes

- `package.json`: `engines.node >=26`, Jest scripts use `--experimental-vm-modules`, new `lint` script.
- `tsconfig`: `module: node20` (CommonJS output that understands ESM packages), `target: ES2025`, `isolatedModules`, explicit `types`. Removed deprecated `baseUrl`. `strict: false` is now explicit, because TS 6 enables it by default.
- ESLint: new flat config `eslint.config.js`. The legacy `.eslintrc.js` is ignored by ESLint 10 and can be deleted.

## Testing

```bash
npm run test:integrations                     # all suites
npm run test:integrations -- --forceExit <spec>  # one suite (suites share port 9999)
```

Compared with 0.4.0 (suites run one at a time):
- Every suite that passed before still passes.
- `sse` went from 0/2 to 2/2, and `cors` from 0/6 to 1/6.
- The remaining failures are unchanged from 0.4.0.

## Known limitations (also in 0.4.0)

These fail at startup with hyper-express's `duplicate routes are not allowed`:
- **Route-scoped middleware**, such as `consumer.apply(Mw).forRoutes(Controller)` or `forRoutes("*")`. Use `app.use(...)` instead.
- **Header, media-type or custom versioning** on the same path. Use `VersioningType.URI` instead.

## Caveats

- **AWS Lambda:** set `NODE_OPTIONS=--experimental-require-module`, since Lambda disables `require(esm)`.
- **Top-level `await`** in an ESM dependency can't be loaded via `require(esm)`.
- **hyper-express 7 middleware:**
  - Synchronous middleware must call `next()`, and each middleware advances only once.
  - `Response.header()` appends; pass `true` as the third argument to overwrite.
