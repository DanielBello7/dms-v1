import { IsNotEmpty, IsUUID } from 'class-validator';

export class SetPasswordDto {
  @IsNotEmpty()
  @IsUUID()
  user_ref: string;
  @IsNotEmpty()
  new_password: string;
}
