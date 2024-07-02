# Hyper-Express Adapter for NestJS


## Motivation
**`platform-hyper-express`** is [**`NestJS HTTP Adapter`**](https://docs.nestjs.com/faq/http-adapter) that implement hyper-express into NestJS.

[**`hyper-express`**](https://github.com/kartikk221/hyper-express) aims to be a simple yet performant HTTP & Websocket Server.

Combined with the power of [**`uWebsockets.js`**](https://github.com/uNetworking/uWebSockets.js) - a Node.js binding of uSockets written in C++, **`platform-hyper-express`** allows NestJS Developers to unlock higher throughput for their web applications with their existing hardware.



## Installation
```sh
npm i @pw-tech/platform-hyper-express
```



## Usage
Use **HyperExpressAdapter** for NestJS HTTP Adapter. Must require **`@nestjs/platform-express`** in dependencies.
```js
import { NestFactory } from '@nestjs/core';
import { HyperExpressAdapter, NestHyperExpressApplication } from '@pw-tech/platform-hyper-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestHyperExpressApplication>(AppModule, new HyperExpressAdapter({ max_body_length: 5 * 1024 * 1024 }), { bufferLogs: true });
  await app.listen(3000);
}
bootstrap();
```



## Examples
TBA

## Supported Versions

- Node `>=16`
Node 22 is also supported.

## APM Support

**@pw-tech/platform-hyper-express** is fully compatabile with dd-trace and opentelememetry APM using our [opentelemetry-instrumentaion-hyper-express](https://github.com/tech-pw/opentelemetry-instrumentation-hyper-express) package.
Checkout the above package for more info on usage.


## Encountering Problems?
- **`@pw-tech/platform-hyper-express`** is mostly compatible with **`@pw-tech/platform-hyper-express`** but not **100%** therefore you may encounter some middlewares not working out of the box. In this scenario, you must either write your own polyfill or omit the middleware to continue.
- Currently uWebsockets.js supports only Node.js LTS versions 16, 18, 20 and 22 on (glibc) Linux, macOS and Windows, on [**`Tier 1`**](https://github.com/nodejs/node/blob/master/BUILDING.md#platform-list) platforms.
- The uWebsockets.js version header is disabled by default. You may opt-out of this behavior by setting an environment variable called **`KEEP_UWS_HEADER`** to a truthy value such as **`1`** or **`true`**.



## Still Having Problems?
- Open an [**`Issue`**](https://github.com/tech-pw/opentelemetry-instrumentation-hyper-express/issues) with details about what led up to the problem including error traces, route information, etc.



## Testing Changes
To run platform-hyper-express functionality tests locally on your machine, you must follow the steps below.
1. Clone the [**`platform-hyper-express`**](https://github.com/tech-pw/opentelemetry-instrumentation-hyper-express/issues) repository to your machine.
2. Initialize and pull any submodule(s) which are used throughout the tests.
3. Run **`npm install`** in the root directory.
4. Run **`npm install`** in the **`/tests`** directory.
5. Run **`npm test`** to run all tests with your local changes.



## License
[**MIT**](./LICENSE)