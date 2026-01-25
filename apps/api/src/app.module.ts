import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ConfigModule } from '@nestjs/config';
import { CONSTANTS } from '@app/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationSchema } from './conversations/schemas/conversation.schema';
import { UserSchema } from './users/schemas/user.schema';
import { UserSettingsSchema } from './users/schemas/user-settings.schema';
import { MessageSchema } from './conversations/schemas/message.schema';
import * as fs from 'fs';
import { WinstonModule } from '@app/winston';

console.log(CONSTANTS);

@Module({
  imports: [
    UsersModule,
    ConversationsModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: CONSTANTS.SQL_DATABASE_HOST,
      port: CONSTANTS.SQL_DATABASE_PORT,
      username: CONSTANTS.SQL_DATABASE_USERNAME,
      password: CONSTANTS.SQL_DATABASE_PASSWORD,
      database: CONSTANTS.SQL_DATABASE_NAME,
      entities: [
        ConversationSchema,
        MessageSchema,
        UserSchema,
        UserSettingsSchema,
      ],
      migrations: [],
      synchronize: CONSTANTS.NODE_ENV === 'development' ? true : false,
      ssl: CONSTANTS.SQL_SSL_MODE,
      extra: CONSTANTS.SQL_SSL_MODE
        ? {
            ssl: {
              rejectUnauthorized: false,
              ...(CONSTANTS.SQL_SSL_TYPE === 'heavy'
                ? {
                    ca: fs.readFileSync(CONSTANTS.SQL_DATABASE_CA_CERT),
                  }
                : {}),
            },
          }
        : undefined,
    }),
    WinstonModule.register({ dir: CONSTANTS.LOG_PATH }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
