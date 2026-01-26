import { InsertUserDto } from '@/users/dto/insert-user.dto';
import { UsersService } from '@/users/users.service';
import { MutationsService } from '@app/mutations';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignupService {
  constructor(
    private readonly mutations: MutationsService,
    private readonly users: UsersService,
  ) {}

  signup_user = async (body: InsertUserDto) => {
    return this.users.insert_other_user(body);
  };
}
