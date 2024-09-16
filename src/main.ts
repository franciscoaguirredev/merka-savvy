import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger as logger} from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }

  ));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  logger.log(`App running on port 3000`);
}
bootstrap();
