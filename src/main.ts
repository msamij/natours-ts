import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as NestLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  const port = process.env.PORT ?? 3000;

  app.setGlobalPrefix(globalPrefix, { exclude: ['{/*splat}'] });
  await app.listen(port);
  NestLogger.log(`🚀 Application running on http://127.0.0.1:${port}/${globalPrefix}`);
}
bootstrap();
