import { OmitType } from '@nestjs/mapped-types';
import { CreateConversationDto } from './create-conversation.dto';

export class InsertConversationDto extends OmitType(CreateConversationDto, [
  'ref_id',
  'ongoing_participants',
  'index',
  'last_message_id',
]) {}
