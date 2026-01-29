import { PickType } from '@nestjs/mapped-types';
import { CreateConversationDto } from './create-conversation.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ExitConversationDto extends PickType(CreateConversationDto, [
  'ref_id',
]) {
  @IsNotEmpty()
  @IsUUID()
  user_ref: string;
}
