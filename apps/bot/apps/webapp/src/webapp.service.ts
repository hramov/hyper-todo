import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './entity/user.entity';
import { Category } from './entity/category.entity';
import { Task } from './entity/task.entity';

@Injectable()
export class WebappService {
  constructor(private readonly em: EntityManager) {}

  private timeToNumber(time: string): number {
    const [hours, minutes] = time.split(':');
    return Number(hours) * 60 + Number(minutes);
  }

  async createUser(dto: User): Promise<User> {
    const existedUser = await this.em.findOne(User, {
      where: { telegram_id: dto.id },
    });

    if (!existedUser) {
      const user = this.em.create(User, {
        telegram_id: dto.id,
        first_name: dto.first_name,
        last_name: dto.last_name,
        username: dto.username,
        language_code: dto.language_code,
      });
      return await this.em.save(user);
    }

    return existedUser;
  }

  async createTask(dto: any): Promise<Task> {
    const user = await this.em.findOne(User, {
      where: { id: dto.user_id },
    });

    function generateTasks(
      period: number,
      date_start: Date,
      date_end: Date,
    ): Task[] {
      const tasks: Task[] = [];

      let dt: number = date_start.valueOf();

      while (dt <= date_end.valueOf()) {
        tasks.push({
          ...dto,
          status: 'pending',
          date: new Date(dt),
        });

        dt += period * 24 * 60 * 60 * 1000;
      }

      return tasks;
    }

    if (!dto.id) {
      let tasks: Task[] = [];

      if (dto.period === 'ew') {
        tasks = generateTasks(
          7,
          new Date(dto.date_start),
          new Date(dto.date_end),
        );
      } else if (dto.period === 'ed') {
        tasks = generateTasks(
          1,
          new Date(dto.date_start),
          new Date(dto.date_end),
        );
      } else {
        // TODO generate tasks from cron syntax
      }

      for (let i = 0; i < tasks.length; i++) {
        const task = this.em.create(Task, {
          ...tasks[i],
          duration: this.timeToNumber(dto.duration),
          deadline: new Date(
            new Date().toLocaleDateString('fr-CA') + 'T' + dto.deadline,
          ).toISOString(),
          user,
        });

        await this.em.save(task);
      }

      return tasks[0];
    }

    const task = this.em.create(Task, {
      ...dto,
      user,
    });
    return await this.em.save(task);
  }

  async categories(): Promise<Category[]> {
    return await this.em.find(Category);
  }

  async tasks(user_id: number): Promise<Task[]> {
    return await this.em.find(Task, {
      where: {
        user: {
          id: user_id,
        },
        date: new Date().toISOString().split('T')[0] as any,
      },
      relations: { category: true },
    });
  }

  async completeTask(task_id: number): Promise<number> {
    await this.em.update(Task, task_id, {
      status: 'completed',
    });

    return task_id;
  }

  async deleteTask(task_id: number): Promise<number> {
    await this.em.delete(Task, task_id);
    return task_id;
  }
}
