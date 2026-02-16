import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('health')
export class AppController {
  constructor(private readonly app: AppService) {}

  @Get()
  async health() {
    return this.app.get_health();
  }
}
