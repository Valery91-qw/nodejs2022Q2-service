import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { CustomLoggerService } from './loggers/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  app.useLogger(new CustomLoggerService());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const file = readFileSync(join('.', 'doc', 'api.yaml'), 'utf-8');
  const document = parse(file);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
