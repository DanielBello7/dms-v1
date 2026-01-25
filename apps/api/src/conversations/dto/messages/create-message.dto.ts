import { MessageEntity } from '@/conversations/entities/message.entity';
import { BaseOmit, MESSAGE_TYPE_ENUM } from '@repo/types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class ReadByDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
  @IsNotEmpty()
  @IsDate()
  read_at: Date;
}

class MediaDto {
  @IsNotEmpty()
  @IsEnum(MESSAGE_TYPE_ENUM)
  type: MESSAGE_TYPE_ENUM;
  @IsNotEmpty()
  @IsUrl({ require_tld: false })
  url: string;
  @IsOptional()
  @IsString()
  text?: string;
}

export class CreateMessageDto implements BaseOmit<MessageEntity> {
  @IsNotEmpty()
  @IsUUID()
  conversation_id: string;
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNotEmpty()
  @IsUUID()
  created_by: string;
  @IsNotEmpty()
  @IsArray()
  @Type(() => ReadByDto)
  @ValidateNested({ each: true })
  read_by: ReadByDto[];
  @IsNotEmpty()
  @IsArray()
  @Type(() => MediaDto)
  @ValidateNested({ each: true })
  media: MediaDto[];
  @IsNotEmpty()
  @IsUUID()
  ref_id: string;
}
