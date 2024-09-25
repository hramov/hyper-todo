import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  providers: [CronService],
})
export class CronModule {}
