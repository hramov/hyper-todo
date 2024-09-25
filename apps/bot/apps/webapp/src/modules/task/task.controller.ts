import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';

@Controller('/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/user/:id')
  async taskByUserID(@Param('id') id: number) {
    return await this.taskService.tasksByUserID(id);
  }

  @Get('/:id')
  async taskByID(@Param('id') id: number) {
    return await this.taskService.taskByID(id);
  }

  @Get('/')
  async tasks() {
    return await this.taskService.tasks();
  }

  @Post('/')
  async createTask(@Body() task: Task) {
    return await this.taskService.createTask(task);
  }

  @Put('/:id')
  async updateTask(@Param('id') id: number, @Body() task: Task) {
    return await this.taskService.updateTask(id, task);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number) {
    return await this.taskService.deleteTask(id);
  }
}
