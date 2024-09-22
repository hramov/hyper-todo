import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { WebappModule } from './webapp.module';
import { envConfig } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(WebappModule);
  console.table(envConfig);

  if (!envConfig.BOT_TOKEN) {
    console.log('BOT_TOKEN is not set');
    process.exit(1);
  }
  await app.listen(envConfig.PORT);
}
bootstrap();
