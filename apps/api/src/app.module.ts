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
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { BrevoModule } from '@app/brevo';

@Module({
  imports: [
    UsersModule,
    ConversationsModule,
    JwtModule.register({
      global: true,
      secret: CONSTANTS.JWT_SECRET,
      signOptions: {
        expiresIn: CONSTANTS.JWT_EXPIRES_IN as any,
      },
    }),
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
    BrevoModule.register({
      apiKy: CONSTANTS.EMAIL_API_KEY,
      email: CONSTANTS.APP_EMAIL,
      ename: CONSTANTS.APP_EMAIL_NAME,
    }),
    WinstonModule.register({ dir: CONSTANTS.LOG_PATH }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
