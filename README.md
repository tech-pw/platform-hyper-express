# Hyper-Express Adapter for NestJS

**`@pw-tech/platform-hyper-express`** is a [NestJS HTTP adapter](https://docs.nestjs.com/faq/http-adapter) built on [hyper-express](https://github.com/kartikk221/hyper-express), which runs on [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js) (C++). It gives NestJS apps higher throughput on the same hardware.

Inspired by [m8a-io/hyper-express-adapter](https://github.com/m8a-io/hyper-express-adapter).

## Requirements

| Package | Version |
| --- | --- |
| Node.js | `>=26` |
| `@nestjs/common`, `@nestjs/core` | `^12.0.0` |
| `hyper-express` | `^7.0.2` (bundled) |

Use a glibc-based image (Debian/Ubuntu). Alpine/musl is not supported. Upgrading from `0.4.x`? See [UPGRADE-1.0.0.md](./UPGRADE-1.0.0.md).

## Installation

```sh
npm i @pw-tech/platform-hyper-express
```

`@nestjs/platform-express` is **not** required.

## Usage

```ts
import { NestFactory } from '@nestjs/core';
import { HyperExpressAdapter, NestHyperExpressApplication } from '@pw-tech/platform-hyper-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestHyperExpressApplication>(
    AppModule,
    new HyperExpressAdapter({ max_body_length: 5 * 1024 * 1024 }),
  );
  await app.listen(3000);
}
bootstrap();
```

Supported: controllers, guards, pipes, interceptors, exception filters, global middleware (`app.use`), CORS, URI versioning, static assets (`app.useStaticAssets`), JSON/form/text/multipart bodies, `StreamableFile` and SSE.

## Known limitations

- Express middlewares are not 100% compatible; some may need a polyfill.
- Route-scoped middleware (`consumer.apply(Mw).forRoutes(...)`) fails with "duplicate routes". Use `app.use(...)` instead.
- Several API versions on the same path (header/media-type/custom versioning) fail the same way. Use `VersioningType.URI` instead.
- The uWebSockets.js version header is hidden by default. Set `KEEP_UWS_HEADER=1` to keep it.

## APM

Works with dd-trace and OpenTelemetry via [opentelemetry-instrumentation-hyper-express](https://github.com/tech-pw/opentelemetry-instrumentation-hyper-express).

## Development

```sh
nvm use                      # Node 26
npm install
npm run compile              # build dist/
npm run lint
npm run test:integrations    # e2e tests
```

Found a bug? [Open an issue](https://github.com/tech-pw/platform-hyper-express/issues) with the error trace and route details.

## License

MIT
