import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './custom-logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new CustomLoggerService('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body, params } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      if (statusCode < 400) {
        this.logger.log(
          `Status: ${statusCode} ,URL: ${originalUrl}, Method: ${method}, Query: ${Object.values(
            params,
          )}, Body: ${JSON.stringify(body)}`,
        );
      }

      if (statusCode >= 400) {
        this.logger.error(
          `Status: ${statusCode} ,URL: ${originalUrl}, Method: ${method}, Query: ${Object.values(
            params,
          )}, Body: ${JSON.stringify(body)}`,
        );
      }
    });
    next();
  }
}
