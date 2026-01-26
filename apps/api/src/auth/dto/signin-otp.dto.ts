import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class SigninOtpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Min(6)
  @Max(6)
  otp: string;
}
