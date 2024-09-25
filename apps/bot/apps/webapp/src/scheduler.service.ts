import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EntityManager } from 'typeorm';
import { Task } from './entity/task.entity';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly em: EntityManager,
    @Inject('TelegramService') private readonly bot: any,
  ) {}

  private minutesToHoursAndMinutes(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${this.loadZeros(hours)}:${this.loadZeros(minutes)}`;
  }

  private loadZeros(duration: number) {
    return String(duration).length === 1 ? '0' + duration : duration;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async expiring() {
    const tasks = await this.em.query(`
      select t.*, u.telegram_id, to_char((deadline - now()), 'HH24:MI') as left
      from task t 
      join "user" u on t.user_id = u.id
      where t.is_notified is false
        and "date"::date = now()::date
        and now() > deadline - (duration || 'minutes')::interval
        and deadline - now() > '00:00'::interval
    `);

    for (let i = 0; i < tasks.length; i++) {
      await this.bot.sendMessage(
        tasks[i].telegram_id,
        `
Время на задачу ${tasks[i].title} <strong>заканчивается</strong>!
Осталось всего ${tasks[i].left}. 
Длительность: ${this.minutesToHoursAndMinutes(tasks[i].duration)}

<a href="https://t.me/hramovdev_bot/simple_app?task=${tasks[i].id}">Открыть в приложении</a>
`,
        {
          parse_mode: 'HTML',
        },
      );

      await this.em.update(Task, tasks[i].id, {
        is_notified: true,
      });
    }
  }
}
