import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Task } from './entity/task.entity';
import { AccountService } from '../account/account.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly em: EntityManager,
    private readonly accountService: AccountService,
  ) {}

  private timeToNumber(time: string): number {
    const [hours, minutes] = time.split(':');
    return Number(hours) * 60 + Number(minutes);
  }

  async tasksByUserID(user_id: number): Promise<Task[]> {
    return await this.em.find(Task, {
      where: {
        user: {
          id: user_id,
        },
        date: new Date(),
      },
      relations: { category: true },
    });
  }

  async tasks(): Promise<Task[]> {
    return await this.em.find(Task);
  }

  async taskByID(id: number): Promise<Task> {
    return await this.em.findOne(Task, {
      where: { id: id },
      relations: { category: true },
    });
  }

  async createTask(dto: any): Promise<Task> {
    const user = await this.accountService.getByID(dto.user_id);

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
      if (dto.period === 'once') {
        tasks = generateTasks(
          1,
          new Date(dto.date_start),
          new Date(dto.date_start),
        );
      } else if (dto.period === 'ew') {
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
            new Date().toLocaleDateString('fr-CA') + 'T' + dto.deadline + ':00',
          ).toISOString(),
          user,
        });

        await this.em.save(task);
      }

      return tasks[0];
    }

    const task = this.em.create(Task, {
      ...dto,
      duration: this.timeToNumber(dto.duration),
      deadline: new Date(
        new Date().toLocaleDateString('fr-CA') + 'T' + dto.deadline + ':00',
      ).toISOString(),
      user,
    });
    return await this.em.save(task);
  }

  async updateTask(task_id: number, dto: any): Promise<number> {
    await this.em.update(Task, task_id, dto);
    return task_id;
  }

  async deleteTask(task_id: number): Promise<number> {
    await this.em.delete(Task, task_id);
    return task_id;
  }
}
