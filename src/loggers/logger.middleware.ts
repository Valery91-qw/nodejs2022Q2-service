import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

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
