import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  check_db = async () => {
    try {
      await this.dataSource.query('SELECT 1'); // simple DB ping
      return true;
    } catch {
      return false;
    }
  };

  check_email = async () => {
    try {
      return 200;
    } catch {
      return false;
    }
  };

  get_health = async () => {
    const db_status = await this.check_db();
    const email_status = await this.check_email();

    const allHealthy = db_status && email_status; // && apiStatus if used

    return {
      status: allHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE,
      is_active: true, // service itself is running
      timestamp: new Date().toISOString(),
      services: {
        allHealthy,
        email: email_status,
        database: db_status,
      },
      uptime: process.uptime(), // seconds since process start
      version: process.env.APP_VERSION || '1.0.0',
    };
  };
}
