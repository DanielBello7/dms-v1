import { UsersModule } from '@/users/users.module';
import { MutationsModule } from '@app/mutations';
import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [MutationsModule, UsersModule, AuthModule],
  controllers: [SignupController],
  exports: [SignupService],
  providers: [SignupService],
})
export class SignupModule {}
