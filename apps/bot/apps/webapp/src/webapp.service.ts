import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './entity/user.entity';
import { Category } from './entity/category.entity';
import { Task } from './entity/task.entity';

@Injectable()
export class WebappService {
  constructor(private readonly em: EntityManager) {}

  async createUser(dto: User): Promise<User> {
    const existedUser = await this.em.findOne(User, {
      where: { id: dto.id },
    });

    if (!existedUser) {
      const user = this.em.create(User, dto);
      return await this.em.save(user);
    }

    return existedUser;
  }

  async createTask(dto: Task): Promise<Task> {
    const task = this.em.create(Task, dto);
    return await this.em.save(task);
  }

  async categories(): Promise<Category[]> {
    return await this.em.find(Category);
  }

  getHello() {
    return {
      data: 'Hello World!',
    };
  }

  getItems() {
    return [
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: `Lorem`,
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ',
        subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle:
          '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle:
          '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        subtitle:
          '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ];
  }
}
