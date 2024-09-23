import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EntityManager } from 'typeorm';
import { Task } from './entity/task.entity';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly em: EntityManager,
    @Inject('TelegramService') private readonly bot: any,
  ) {}

  private timeToNumber(time: string): number {
    const [hours, minutes] = time.split(':');
    return Number(hours) * 60 + Number(minutes);
  }

  private minutesToHoursAndMinutes(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}:${minutes}`;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const tasksForToday = await this.em.find(Task, {
      where: {
        status: 'pending',
        is_notified: false,
        date: new Date().toISOString().split('T')[0] as any,
      },
      relations: { user: true },
    });

    const now = new Date().toLocaleTimeString();

    const tasksToNotify = tasksForToday.filter((task: any) => {
      return (
        this.timeToNumber(now) >=
        this.timeToNumber(task.deadline) - this.timeToNumber(task.duration)
      );
    });

    for (let i = 0; i < tasksToNotify.length; i++) {
      await this.bot.sendMessage(
        tasksToNotify[i].user.id,
        `
Task ${tasksToNotify[i].title} is <strong>expiring</strong> for today (${new Date().toLocaleDateString()})!

Only ${this.minutesToHoursAndMinutes(
          this.timeToNumber(String(tasksToNotify[i].deadline)) -
            this.timeToNumber(now),
        )} left. 

Duration: ${tasksToNotify[i].duration}

<a href="https://t.me/hramovdev_bot/simple_app?task=${tasksToNotify[i].id}">Check in app</a>
`,
        {
          parse_mode: 'HTML',
        },
      );

      await this.em.update(Task, tasksToNotify[i].id, {
        is_notified: true,
      });
    }
  }
}
