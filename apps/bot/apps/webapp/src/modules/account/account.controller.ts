import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { User } from './entity/user.entity';

@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/')
  async createUser(@Body() user: User) {
    return await this.accountService.createUser(user);
  }
}
