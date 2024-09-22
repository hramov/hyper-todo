import { Controller, Get } from '@nestjs/common';
import { WebappService } from './webapp.service';

@Controller('/')
export class WebappController {
  constructor(private readonly webappService: WebappService) {}

  @Get('hello')
  getHello() {
    return this.webappService.getHello();
  }

  @Get('items')
  getItems() {
    return this.webappService.getItems();
  }
}
