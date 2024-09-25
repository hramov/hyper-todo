import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class AccountService {
  constructor(private readonly em: EntityManager) {}

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

  async getByID(id: number): Promise<User> {
    return await this.em.findOne(User, {
      where: { id: id },
    });
  }

  async getByTelegramID(id: number): Promise<User> {
    return await this.em.findOne(User, {
      where: { telegram_id: id },
    });
  }
}
