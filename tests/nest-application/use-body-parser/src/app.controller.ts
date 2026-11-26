import { Controller, Post, Req } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { IncomingMessage } from 'http';

@Controller()
export class AppController {
  @Post()
  index(@Req() req: RawBodyRequest<IncomingMessage>) {
    return {
      raw: req.rawBody?.toString(),
    };
  }
}
