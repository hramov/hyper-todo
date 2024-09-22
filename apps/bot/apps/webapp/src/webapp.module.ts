import { Module } from '@nestjs/common';
import { WebappController } from './webapp.controller';
import { WebappService } from './webapp.service';
import { TelegramModule } from './telegram/telegram.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'public'),
      serveRoot: '/public',
    }),
    TelegramModule,
  ],
  controllers: [WebappController],
  providers: [WebappService],
})
export class WebappModule {}
