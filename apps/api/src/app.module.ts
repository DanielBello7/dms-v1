import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
  imports: [UsersModule, ConversationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
