import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';

const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_API_TOKEN,
    environment: 'stage',
    reportLevel: 'warning',
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(logger)
  app.use(rollbar.errorHandler())
  await app.listen(3000);
}
bootstrap();

function logger(req: Request, res: Response, next: NextFunction) {
  console.log("executing Nest Middleware")
  next();
};