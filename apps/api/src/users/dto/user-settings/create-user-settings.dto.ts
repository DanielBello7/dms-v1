import { UserSettingsEntity } from '@/users/entities/user-settings.entity';
import { BaseOmit } from '@repo/types';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUserSettingsDto implements BaseOmit<UserSettingsEntity> {
  @IsNotEmpty()
  @IsBoolean()
  is_onboarded: boolean;
  @IsNotEmpty()
  @IsUUID()
  user_id: string;
  @IsOptional()
  @IsString()
  refresh_token: string | undefined;
  @IsOptional()
  @IsDate()
  last_login_date: Date | undefined;
  @IsNotEmpty()
  @IsBoolean()
  dark_mode: boolean;
  @IsNotEmpty()
  @IsUUID()
  ref_id: string;
}
