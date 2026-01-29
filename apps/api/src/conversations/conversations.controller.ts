import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateMessageDto } from './dto/messages/create-message.dto';
import { InsertConversationDto } from './dto/insert-conversation.dto';
import { ExitConversationDto } from './dto/leave-conversation.dto';
import { JoinConversationDto } from './dto/join-conversation.dto';
import { ConversationQueryDto } from './dto/conversation-query.dto';
import { MessagesQueryDto } from './dto/messages/messages-query.dto';
import { InsertMessageDto } from './dto/messages/insert-message.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversations: ConversationsService) {}

  @Post('message')
  insert_message(@Body() body: InsertMessageDto) {
    return this.conversations.insert_message(body);
  }

  @Post()
  insert_converersation(@Body() body: InsertConversationDto) {
    return this.conversations.insert_conversation(body);
  }

  @Post('exit')
  exit_conversation(@Body() body: ExitConversationDto) {
    return this.conversations.exit_conversation_by_ref(body);
  }

  @Post('join')
  join_conversation(@Body() body: JoinConversationDto) {
    return this.conversations.join_conversation_by_ref_id(body);
  }

  @Get('users')
  get_user_conversations(@Query() query: ConversationQueryDto) {
    return this.conversations.get_user_conversations(query);
  }

  @Get(':ref')
  find_conversation_by_ref(@Param('ref', ParseUUIDPipe) ref: string) {
    return this.conversations.find_by_ref_id(ref);
  }

  @Get(':ref/messages')
  get_conversation_messages(
    @Query() query: MessagesQueryDto,
    @Param('ref', ParseUUIDPipe) ref: string,
  ) {
    return this.conversations.get_conversation_messages(ref, query);
  }

  @Delete(':ref')
  delete_conversation(@Param('ref') ref: string) {
    return this.conversations.delete_conversation(ref);
  }
}
