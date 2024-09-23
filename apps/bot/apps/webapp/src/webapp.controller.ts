import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WebappService } from './webapp.service';
import { User } from './entity/user.entity';
import { Task } from './entity/task.entity';

@Controller('/')
export class WebappController {
  constructor(private readonly webappService: WebappService) {}

  @Post('/create-user')
  async createUser(@Body() user: User) {
    return await this.webappService.createUser(user);
  }

  @Get('/categories')
  async categories() {
    return await this.webappService.categories();
  }

  @Post('/create-task')
  async createTask(@Body() task: Task) {
    return await this.webappService.createTask(task);
  }

  @Get('/tasks')
  async tasks(@Query() params: { user_id: number }) {
    return await this.webappService.tasks(params.user_id);
  }
}
