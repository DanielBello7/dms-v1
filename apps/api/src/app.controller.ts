import { Res, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly app: AppService) {}

  @Get()
  async health(@Res() res: Response) {
    const health = await this.app.get_health();
    return res.status(health.status).json(health);
  }
}
