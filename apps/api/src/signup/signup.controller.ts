import { InsertUserDto } from '@/users/dto/insert-user.dto';
import { SignupService } from './signup.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SendVerifyOtpDto } from './dto/send-verify-otp.dto';
import { VerifyUserEmailDto } from './dto/verify-user-email.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signup: SignupService) {}

  @Post()
  signup_user(@Body() body: InsertUserDto) {
    return this.signup.signup_user(body);
  }

  @Post('verify')
  verify_user_email(@Body() body: VerifyUserEmailDto) {
    return this.signup.verify_user_email(body);
  }

  @Post('verify/otp')
  send_verify_otp(@Body() body: SendVerifyOtpDto) {
    return this.signup.send_verify_otp(body);
  }
}
