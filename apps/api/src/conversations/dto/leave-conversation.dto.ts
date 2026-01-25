import { PickType } from '@nestjs/mapped-types';
import { CreateConversationDto } from './create-conversation.dto';

export class ExitConversationDto extends PickType(CreateConversationDto, [
  'ref_id',
]) {
  user_ref: string;
}
