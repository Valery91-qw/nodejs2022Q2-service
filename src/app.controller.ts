import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import jwtAuthMetadata from './guards/jwt/jwt-auth.metadata';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @jwtAuthMetadata.Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
