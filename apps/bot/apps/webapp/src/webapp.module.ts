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
import { envConfig } from './config/env.config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envConfig.PG_HOST,
      port: envConfig.PG_PORT,
      username: envConfig.PG_USERNAME,
      password: envConfig.PG_PASSWORD,
      database: envConfig.PG_DATABASE,
      entities: [User, Task, Category],
      synchronize: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveRoot: '/',
    }),
    TelegramModule,
  ],
  controllers: [WebappController],
  providers: [WebappService, SchedulerService],
})
export class WebappModule {}
