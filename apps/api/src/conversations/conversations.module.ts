import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationSchema } from './schemas/conversation.schema';
import { MessageSchema } from './schemas/message.schema';
import { MutationsModule } from '@app/mutations';
import { UsersModule } from '@/users/users.module';
import { ConversationsGateway } from './conversations.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConversationSchema, MessageSchema]),
    MutationsModule,
    UsersModule,
  ],
  providers: [ConversationsService, ConversationsGateway],
  controllers: [ConversationsController],
  exports: [ConversationsService],
})
export class ConversationsModule {}
