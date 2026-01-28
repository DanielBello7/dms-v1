import { PickType } from '@nestjs/mapped-types';
import { CreateConversationDto } from './create-conversation.dto';

export class JoinConversationDto extends PickType(CreateConversationDto, [
  'members',
  'ref_id',
]) {}
