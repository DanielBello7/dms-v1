import { BaseOmit } from '@repo/types';
import { ConversationEntity } from '@/conversations/entities/conversation.entity';
import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateConversationDto implements BaseOmit<ConversationEntity> {
  @IsNotEmpty()
  @IsNumber()
  index: number;
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUUID(undefined, { each: true })
  ongoing_participants: string[];
  @IsNotEmpty()
  @IsArray()
  @IsUUID(undefined, { each: true })
  members: string[];
  @IsNotEmpty()
  @IsUUID()
  ref_id: string;
  @IsNotEmpty()
  @IsUUID()
  created_by: string;
  @IsOptional()
  @IsUUID()
  last_message_id: string | undefined;
}
