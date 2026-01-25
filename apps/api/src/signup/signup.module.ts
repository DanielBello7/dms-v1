import { UsersModule } from '@/users/users.module';
import { MutationsModule } from '@app/mutations';
import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';

@Module({
  imports: [MutationsModule, UsersModule],
  controllers: [SignupController],
  exports: [SignupService],
  providers: [SignupService],
})
export class SignupModule {}
