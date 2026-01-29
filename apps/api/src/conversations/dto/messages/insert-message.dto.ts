import { OmitType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';

export class InsertMessageDto extends OmitType(CreateMessageDto, [
  'index',
  'ref_id',
]) {}
