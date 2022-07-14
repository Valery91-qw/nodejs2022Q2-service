import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { parse } from 'yaml';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const file = readFileSync('./doc/api.yaml', 'utf-8');
  const document = parse(file);
  SwaggerModule.setup('doc', app, document);

  await app.listen(4000);
}
bootstrap();
