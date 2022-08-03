import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const file = readFileSync(join('.', 'doc', 'api.yaml'), 'utf-8');
  const document = parse(file);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
