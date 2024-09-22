import { Module } from '@nestjs/common';
import { initTelegramService } from './telegram.service';

@Module({
  providers: [
    {
      provide: 'TelegramService',
      useFactory: () => {
        return initTelegramService();
      },
    },
  ],
})
export class TelegramModule {}
