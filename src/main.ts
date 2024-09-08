import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log(`App running on port 3000`);
}
bootstrap();
