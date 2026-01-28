import {
  Param,
  Body,
  Controller,
  Patch,
  ParseUUIDPipe,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Patch(':id')
  update_user(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.users.modify_user_by_ref(id, body);
  }

  @Get('email/:email')
  get_user_by_email(@Param('email') email: string) {
    return this.users.find_user_by_email(email);
  }

  @Get(':ref')
  get_user_by_ref(@Param('ref') ref: string) {
    return this.users.find_by_ref(ref);
  }

  @Get(':ref/settings')
  get_user_settings(@Param('ref', ParseUUIDPipe) ref: string) {
    return this.users.get_user_settings_by_user_ref(ref);
  }
}
