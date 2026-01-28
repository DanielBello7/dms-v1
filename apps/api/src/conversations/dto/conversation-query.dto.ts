import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export enum SORT_TYPE {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class ConversationQueryDto {
  @IsNotEmpty()
  @IsUUID()
  ref: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pick?: number;
  @IsOptional()
  @IsEnum(SORT_TYPE)
  sort?: SORT_TYPE;
}
