import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Put('/tasks/complete/:id')
  async completeTask(@Param() id: number) {
    return await this.webappService.completeTask(id);
  }

  @Delete('/tasks/:id')
  async deleteTask(@Param() id: number) {
    return await this.webappService.deleteTask(id);
  }

  @Get('/tasks')
  async tasks(@Query() params: { user_id: number }) {
    return await this.webappService.tasks(params.user_id);
  }
}
