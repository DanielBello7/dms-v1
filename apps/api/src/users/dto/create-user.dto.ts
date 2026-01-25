import { BaseOmit } from '@repo/types';
import { UserEntity } from '../entities/user.entity';
import {
  IsEmail,
  IsNotEmpty,
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
}
