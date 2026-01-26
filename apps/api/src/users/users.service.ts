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
  update_by_id_helper,
} from '@app/util';
import { CreateUserSettingsDto } from './dto/user-settings/create-user-settings.dto';
import { InsertUserDto } from './dto/insert-user.dto';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { InsertAdminDto } from './dto/insert-admin.dto';
import { AccountType } from '@repo/types';
import { UpdateUserSettingsDto } from './dto/user-settings/update-user-settings.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly mutation: MutationsService,
    @InjectRepository(UserSchema)
    private readonly users: Repository<UserSchema>,
    @InjectRepository(UserSettingsSchema)
    private readonly user_settings: Repository<UserSettingsSchema>,
  ) {}

  get_user_settings_by_user_ref = async (
    ref: string,
    session?: EntityManager,
  ) => {
    const perform = async (em: EntityManager) => {
      const db = em.getRepository(this.user_settings.target);
      const user = await this.find_by_ref_id_lock(ref, em);
      const response = await db.findOne({
        where: {
          user_id: user.id,
        },
      });
      if (response) return response;
      throw new NotFoundException('cannot find user');
    };

    if (session) return perform(session);
    return this.mutation.execute(perform);
  };

  modify_user_by_ref = async (ref: string, body: UpdateUserDto) => {
    return this.mutation.execute(async (session) => {
      const user = await this.find_by_ref_id_lock(ref, session);
      const { password, email, timezone, ref_id, ...rest } = body;
      if (rest.firstname || rest.surname) {
        rest.display_name = `${rest.firstname ?? user.firstname} ${rest.surname ?? user.surname}`;
      }
      return this.update_user(user.id, rest, session);
    });
  };

  update_user = async (
    id: string,
    body: UpdateUserDto,
    session?: EntityManager,
  ) => {
    const errors = isValidDto(body, UpdateUserDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    return update_by_id_helper(this.users, id, body, session);
  };

  is_already_registered = async (
    email: string,
    username: string,
    session: EntityManager,
  ) => {
    const db = session.getRepository(this.users.target);
    const response = await db
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .orWhere('user.username ILIKE :username', { username })
      .getOne();
    if (response) {
      if (response.email === email) {
        throw new BadRequestException('email already registered');
      }
      throw new BadRequestException('username already registered');
    }
    return void 0;
  };

  insert_admin = async (body: InsertAdminDto, session?: EntityManager) => {
    return this.insert_user(
      {
        ...body,
        type: AccountType.Admins,
      },
      session,
    );
  };

  insert_other_user = async (body: InsertUserDto, session?: EntityManager) => {
    if (body.type === AccountType.Admins) {
      throw new BadRequestException('type cannot be admin');
    }
    return this.insert_user(body, session);
  };

  find_user_by_email = async (email: string, session?: EntityManager) => {
    const db = session ? session.getRepository(this.users.target) : this.users;
    const response = await db.findOne({
      where: { email },
    });
    if (response) return response;
    throw new NotFoundException('email not registered');
  };

  private insert_user = async (
    body: InsertUserDto,
    session?: EntityManager,
  ) => {
    const errors = isValidDto(body, InsertUserDto);
    if (errors.length > 0) throw new BadRequestException(errors);

    const action = async (s: EntityManager) => {
      const user_ref_id = uuid();
      await this.is_already_registered(body.email, body.username, s);
      const user = await this.create_user(
        {
          ...body,
          avatar: undefined,
          ref_id: user_ref_id,
          index: 0,
          display_name: body.firstname + body.surname,
          is_email_verified: false,
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
          index: 0,
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

  /**
   * find user by user id
   * @param id user id
   * @param session
   * @returns
   */
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

  find_by_ref = async (ref: string) => {
    const response = await this.users.findOne({
      where: { ref_id: ref },
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

  update_user_settings_by_user_id = async (
    id: string,
    body: UpdateUserSettingsDto,
    session?: EntityManager,
  ) => {
    const errors = isValidDto(body, UpdateUserSettingsDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    const user_settings = await this.user_settings.findOne({
      where: {
        user_id: id,
      },
    });
    if (!user_settings) throw new NotFoundException('user not registerd');
    return update_by_id_helper(
      this.user_settings,
      user_settings.id,
      body,
      session,
    );
  };
}
