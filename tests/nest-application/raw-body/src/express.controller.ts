import { Controller, Post, Req } from "@nestjs/common";
import type { RawBodyRequest } from "@nestjs/common";
import type { Request } from "hyper-express";

@Controller()
export class ExpressController {
  @Post()
  getRawBody(@Req() req: RawBodyRequest<Request>) {
    return {
      parsed: req.body,
      raw: req.rawBody.toString(),
    };
  }
}
