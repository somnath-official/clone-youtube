import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfiguration } from './config/app.config';
import * as cookieParser from 'cookie-parser';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

declare module 'express' {
  export interface Request {
    user?: {
      name: string;
      email: string;
      sub: string
    };
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Registering validation pipe globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Setting endpoint prefix to /api
  app.setGlobalPrefix(appConfiguration.apiPrefix, {exclude: [{ path: 'health', method: RequestMethod.GET }]});
  
  // Setting Express cookie parser.
  app.use(cookieParser());
  
  await app.listen(appConfiguration.port);
  console.log(`Application started http://localhost:${appConfiguration.port}`)
}
bootstrap();
