import { AccountType, BaseOmit } from '@repo/types';
import { UserEntity } from '../entities/user.entity';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsTimeZone,
  IsUUID,
} from 'class-validator';

export class CreateUserDto implements BaseOmit<UserEntity> {
  @IsOptional()
  @IsString()
  avatar: string | undefined;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsOptional()
  @IsString()
  password: string | undefined;
  @IsNotEmpty()
  @IsString()
  surname: string;
  @IsNotEmpty()
  @IsTimeZone()
  timezone: string;
  @IsNotEmpty()
  @IsUUID()
  ref_id: string;
  @IsNotEmpty()
  @IsNumber()
  index: number;
  @IsNotEmpty()
  @IsString()
  display_name: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsEnum(AccountType)
  type: AccountType;
  @IsNotEmpty()
  @IsBoolean()
  is_email_verified: boolean;
  @IsNotEmpty()
  @IsBoolean()
  has_password: boolean;
}
