import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly em: EntityManager) {}

  async getUserCategories(userId: number) {
    return this.em.find(Category, {
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
