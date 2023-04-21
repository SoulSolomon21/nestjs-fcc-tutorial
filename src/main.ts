import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // this tells nestjs to use the validation pipe for all the routes
  app.useGlobalPipes(
    new ValidationPipe({
      // this removes fields that are not specified in our dto from the request
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
