import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationSchema } from './schemas/conversation.schema';
import { MessageSchema } from './schemas/message.schema';
import { MutationsModule } from '@app/mutations';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConversationSchema, MessageSchema]),
    MutationsModule,
    UsersModule,
  ],
  providers: [ConversationsService],
  controllers: [ConversationsController],
  exports: [ConversationsService],
})
export class ConversationsModule {}
