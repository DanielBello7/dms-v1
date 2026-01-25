import { InsertUserDto } from '@/users/dto/insert-user.dto';
import { SignupService } from './signup.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('signup')
export class SignupController {
  constructor(private readonly signup: SignupService) {}

  @Post()
  signup_user(@Body() body: InsertUserDto) {
    return this.signup.signup_user(body);
  }
}
