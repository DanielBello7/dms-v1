import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class InsertUserDto extends OmitType(CreateUserDto, [
  'avatar',
  'ref_id',
]) {}
