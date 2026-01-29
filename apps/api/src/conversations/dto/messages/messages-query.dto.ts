import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SORT_TYPE } from '../conversation-query.dto';

export class MessagesQueryDto {
  @IsOptional()
  @IsDate()
  from_date?: Date;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pick?: number;
  @IsOptional()
  @IsEnum(SORT_TYPE)
  sort?: SORT_TYPE;
}
