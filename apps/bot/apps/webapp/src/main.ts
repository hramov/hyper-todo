import { NestFactory } from '@nestjs/core';
import { WebappModule } from './webapp.module';
import { envConfig } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(WebappModule);
  console.table(envConfig);

  app.enableCors({
    origin: true,
  });

  if (!envConfig.BOT_TOKEN) {
    console.log('BOT_TOKEN is not set');
    process.exit(1);
  }

  app.setGlobalPrefix('api');
  await app.listen(envConfig.PORT);
}
bootstrap();
