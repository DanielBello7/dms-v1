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

  @Patch('id')
  update_user(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.users.modify_user_by_ref(id, body);
  }

  @Get('id/settings')
  get_user_settings(@Param('id', ParseUUIDPipe) id: string) {
    return this.users.get_user_settings_by_user_ref(id);
  }
}
