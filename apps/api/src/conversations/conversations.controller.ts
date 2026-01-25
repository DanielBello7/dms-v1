import { Controller, Post, Body } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateMessageDto } from './dto/messages/create-message.dto';
import { InsertConversationDto } from './dto/insert-conversation.dto';
import { ExitConversationDto } from './dto/leave-conversation.dto';
import { JoinConversationDto } from './dto/join-conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversations: ConversationsService) {}

  @Post()
  insert_message(@Body() body: CreateMessageDto) {
    return this.conversations.insert_message(body);
  }

  @Post()
  insert_converersation(@Body() body: InsertConversationDto) {
    return this.conversations.insert_conversation(body);
  }

  @Post()
  exit_conversation(@Body() body: ExitConversationDto) {
    return this.conversations.exit_conversation_by_ref(body);
  }

  @Post()
  join_conversation(@Body() body: JoinConversationDto) {
    return this.conversations.join_conversation_by_ref_id(body);
  }
}
