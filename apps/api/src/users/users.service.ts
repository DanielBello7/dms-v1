import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from './schemas/user.schema';
import { UserSettingsSchema } from './schemas/user-settings.schema';
import { EntityManager, In, Repository } from 'typeorm';
import { MutationsService } from '@app/mutations';
import { CreateUserDto } from './dto/create-user.dto';
import {
  create_helper,
  find_by_id_lock_helper,
  isValidDto,
  remove_helper,
} from '@app/util';
import { CreateUserSettingsDto } from './dto/user-settings/create-user-settings.dto';
import { InsertUserDto } from './dto/insert-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly mutation: MutationsService,
    @InjectRepository(UserSchema)
    private readonly users: Repository<UserSchema>,
    @InjectRepository(UserSettingsSchema)
    private readonly user_settings: Repository<UserSettingsSchema>,
  ) {}

  is_already_registered = async (email: string, session: EntityManager) => {
    const db = session.getRepository(this.users.target);
    const response = await db.findOne({ where: { email } });
    if (response) throw new BadRequestException('email already registered');
    return void 0;
  };

  insert_user = async (body: InsertUserDto, session?: EntityManager) => {
    const errors = isValidDto(body, InsertUserDto);
    if (errors.length > 0) throw new BadRequestException(errors);

    const action = async (s: EntityManager) => {
      const user_ref_id = uuid();
      await this.is_already_registered(body.email, s);
      const user = await this.create_user(
        {
          ...body,
          avatar: undefined,
          ref_id: user_ref_id,
        },
        s,
      );

      await this.create_settings(
        {
          dark_mode: false,
          last_login_date: undefined,
          refresh_token: undefined,
          user_id: user.id,
          is_onboarded: false,
          ref_id: uuid(),
        },
        s,
      );

      return user;
    };

    if (session) return action(session);
    return this.mutation.execute(action);
  };

  create_settings = async (
    body: CreateUserSettingsDto,
    session?: EntityManager,
  ) => {
    const errors = isValidDto(body, CreateUserSettingsDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    return create_helper<UserSettingsSchema>(this.user_settings, body, session);
  };

  create_user = async (body: CreateUserDto, session?: EntityManager) => {
    const errors = isValidDto(body, CreateUserDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    return create_helper<UserSchema>(this.users, body, session);
  };

  find_by_id_lock = async (id: string, session: EntityManager) => {
    return find_by_id_lock_helper(this.users, id, session);
  };

  find_by_ref_id_lock = async (ref: string, session: EntityManager) => {
    const db = session.getRepository(this.users.target);
    const response = await db.findOne({
      where: {
        ref_id: ref,
      },
      lock: { mode: 'pessimistic_write' },
    });
    if (response) return response;
    throw new NotFoundException('user not found');
  };

  find_by_ids_lock = async (ids: string[], session: EntityManager) => {
    const db = session.getRepository(this.users.target);
    return db.find({
      where: {
        id: In(ids),
      },
      lock: { mode: 'pessimistic_write' },
    });
  };

  find_by_ref_ids_lock = async (ref_ids: string[], session: EntityManager) => {
    const db = session.getRepository(this.users.target);
    return db.find({
      where: {
        ref_id: In(ref_ids),
      },
      lock: { mode: 'pessimistic_write' },
    });
  };

  delete_user = async (id: string) => {
    return this.mutation.execute(async (session) => {
      const db_user_settings = session.getRepository(this.user_settings.target);
      const response = await db_user_settings.findOne({
        where: { user_id: id },
        lock: { mode: 'pessimistic_write' },
      });
      if (!response) throw new NotFoundException('cannot find user');
      await remove_helper(this.user_settings, response.id, session);
      return remove_helper(this.users, id, session);
    });
  };
}
