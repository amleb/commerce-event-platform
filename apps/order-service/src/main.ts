import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { orderServiceConfig } from './config/service.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(orderServiceConfig.port);

  console.log({
    message: 'order-service started',
    service: 'order-service',
    port: orderServiceConfig.port,
    nodeEnv: orderServiceConfig.nodeEnv,
    logLevel: orderServiceConfig.logLevel,
  });
}

void bootstrap();
