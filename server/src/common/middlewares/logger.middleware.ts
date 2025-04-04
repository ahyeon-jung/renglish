import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, body } = req;
    this.logger.log(`📡 ${method} ${url} 요청 | Body: ${JSON.stringify(body)}`);

    const originalSend = res.send;
    res.send = function (data) {
      (res as any).__responseBody = data;
      return originalSend.call(this, data);
    };

    res.on('finish', () => {
      this.logger.log(
        `✅ ${method} ${url} 응답 완료 | Status: ${res.statusCode} | Response: ${(res as any).__responseBody}`,
      );
    });

    next();
  }
}
