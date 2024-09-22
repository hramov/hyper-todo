import { Module } from '@nestjs/common';
import { WebappController } from './webapp.controller';
import { WebappService } from './webapp.service';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [WebappController],
  providers: [WebappService],
})
export class WebappModule {}
