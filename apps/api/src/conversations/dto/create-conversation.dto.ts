import { BaseOmit } from '@repo/types';
import { ConversationEntity } from '@/conversations/entities/conversation.entity';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateConversationDto implements BaseOmit<ConversationEntity> {
  @IsNotEmpty()
  @IsArray()
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
}
