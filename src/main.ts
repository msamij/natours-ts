import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('query parser', 'extended');

  const globalPrefix = 'api/v1';
  const port = process.env.PORT ?? 3000;

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  NestLogger.log(`🚀 Application running on http://127.0.0.1:${port}/${globalPrefix}`);
}
bootstrap();
