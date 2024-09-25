import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { envConfig } from './config/env.config';
import { Category } from './modules/category/entity/category.entity';
import { Task } from './modules/task/entity/task.entity';
import { User } from './modules/account/entity/user.entity';
import { AccountModule } from './modules/account/account.module';
import { TaskModule } from './modules/task/task.module';
import { CategoryModule } from './modules/category/category.module';
import { CronModule } from './adapters/cron/cron.module';
import { TelegramModule } from './adapters/telegram/telegram.module';

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
    CronModule,

    // CRUD modulles
    AccountModule,
    CategoryModule,
    TaskModule,
  ],
})
export class WebappModule {}
