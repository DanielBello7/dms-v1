import { PickType } from '@nestjs/mapped-types';
import { CreateConversationDto } from './create-conversation.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class JoinConversationDto extends PickType(CreateConversationDto, [
  'members',
  'ref_id',
]) {}
