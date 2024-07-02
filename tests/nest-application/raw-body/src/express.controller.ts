import { Controller, Post, RawBodyRequest, Req } from "@nestjs/common";
import { Request } from "hyper-express";

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
