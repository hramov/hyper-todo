import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/user/:user_id')
  async getUserCategories(@Param('user_id') user_id: number) {
    return await this.categoryService.getUserCategories(user_id);
  }
}
