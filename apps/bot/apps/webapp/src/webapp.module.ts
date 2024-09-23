import { Module } from '@nestjs/common';
import { WebappController } from './webapp.controller';
import { WebappService } from './webapp.service';
import { TelegramModule } from './telegram/telegram.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './entity/user.entity';
import { Task } from './entity/task.entity';
import { Category } from './entity/category.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sqlite.db',
      entities: [User, Task, Category],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'public'),
      serveRoot: '/public',
    }),
    TelegramModule,
  ],
  controllers: [WebappController],
  providers: [WebappService, SchedulerService],
})
export class WebappModule {}
