import { SORT_TYPE } from '@/conversations/dto/conversation-query.dto';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @IsString()
  value: string;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pick?: number;
  @IsOptional()
  @IsEnum(SORT_TYPE)
  sort?: SORT_TYPE;
}
