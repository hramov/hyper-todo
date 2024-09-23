import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Get('hello')
  getHello() {
    return this.webappService.getHello();
  }

  @Get('items')
  getItems() {
    return this.webappService.getItems();
  }
}
