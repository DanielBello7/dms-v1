import { CONSTANTS } from '@app/constants';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as datefns from 'date-fns';
import { SigninDto } from './dto/signin.dto';
import { UsersService } from '@/users/users.service';
import { EntityManager, Repository } from 'typeorm';
import { OtpSchema } from './schemas/otp.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { MutationsService } from '@app/mutations';
import { SigninResponse, ValidUser } from './types/auth.types';
import { CreateOtpDto } from './dto/otp/create-otp.dto';
import {
  create_helper,
  delete_helper,
  IMailModuleType,
  isValidDto,
} from '@app/util';
import { InsertOtp } from './dto/otp/insert-otp.dto';
import * as OTPs from 'otp-generator';
import { v4 as uuid } from 'uuid';
import { OTP_PURPOSE_ENUM } from '@repo/types';
import { SigninEmailDto } from './dto/signin-email.dto';
import { SigninOtpDto } from './dto/signin-otp.dto';
import { EmailDto } from './dto/email.dto';
import { RecoverDto } from './dto/recover.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OtpSchema)
    private readonly otp: Repository<OtpSchema>,
    private readonly jwt: JwtService,
    private readonly users: UsersService,
    private readonly mutation: MutationsService,
    private readonly mail: IMailModuleType,
  ) {}

  insert_otp = async (body: InsertOtp, session?: EntityManager) => {
    const otp = OTPs.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    return this.create_otp(
      {
        ...body,
        expires_at: datefns.addHours(new Date(), 2),
        index: 0,
        value: otp,
        ref_id: uuid(),
      },
      session,
    );
  };

  delete_otp_by_id = async (id: string, session?: EntityManager) => {
    return delete_helper(this.otp, id, session);
  };

  create_otp = async (body: CreateOtpDto, session?: EntityManager) => {
    const errors = isValidDto(body, CreateOtpDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    return create_helper<OtpSchema>(this.otp, body, session);
  };

  signin_email_verify = async (body: SigninEmailDto) => {
    return this.mutation.execute(async (session) => {
      const user = await this.users.find_user_by_email(body.email, session);
      if (user.password) {
        return {
          type: 'PASSWORD',
          display_name: user.display_name,
        };
      }

      const check = await this.get_user_otps(user.email, session);
      const expired: OtpSchema[] = [];
      const usefuls: OtpSchema[] = [];

      for (const a of check) {
        if (datefns.isPast(a.expires_at)) {
          expired.push(a);
          continue;
        }
        if (a.purpose === OTP_PURPOSE_ENUM.LOGIN) {
          usefuls.push(a);
          continue;
        }
      }

      if (expired.length > 0) {
        for (const a of expired) {
          await this.delete_otp_by_id(a.id, session);
        }
      }

      if (usefuls.length > 0) {
        const main = usefuls[0];
        if (usefuls.length > 1) {
          for (const o of usefuls.slice(1)) {
            await this.delete_otp_by_id(o.id, session);
          }
        }
        await this.mail.sendotp(main.value, body.email, user.display_name);
        return {
          type: 'OTP',
          display_name: user.display_name,
        };
      }

      const response = await this.insert_otp(
        { email: body.email, purpose: OTP_PURPOSE_ENUM.LOGIN },
        session,
      );

      await this.mail.sendotp(response.value, body.email, user.display_name);
      return {
        type: 'OTP',
        display_name: user.display_name,
      };
    });
  };

  get_user_otps = async (email: string, session?: EntityManager) => {
    const db = session ? session.getRepository(this.otp.target) : this.otp;
    return db.find({
      where: { email },
    });
  };

  find_otp_by_otp = async (otp: string, session?: EntityManager) => {
    const db = session ? session.getRepository(this.otp.target) : this.otp;
    const response = await db.findOne({
      where: { value: otp },
    });
    if (response) return response;
    throw new NotFoundException("otp doesn't exist");
  };

  signin_email_otp = async (body: SigninOtpDto) => {
    return this.mutation.execute(async (session) => {
      const user = await this.users.find_user_by_email(body.email, session);
      const otp = await this.find_otp_by_otp(body.otp, session);

      if (datefns.isPast(otp.expires_at)) {
        await this.delete_otp_by_id(otp.id, session);
        throw new BadRequestException('otp expired');
      }

      if (otp.value !== body.otp) {
        throw new BadRequestException('invalid credentials');
      }

      if (otp.purpose !== OTP_PURPOSE_ENUM.LOGIN) {
        throw new BadRequestException('invalid credentials');
      }

      await this.delete_otp_by_id(otp.id, session);
      return this.sign_in_validated_account(
        {
          email: user.email,
          id: user.id,
          name: user.display_name,
          ref: user.ref_id,
          type: user.type,
        },
        session,
      );
    });
  };

  compare = (input: string, hashed: string): boolean => {
    return bcrypt.compareSync(input, hashed);
  };

  validate = async (
    body: SigninDto,
    session?: EntityManager,
  ): Promise<ValidUser | null> => {
    const perform = async (em: EntityManager) => {
      const user = await this.users.find_user_by_email(body.username, em);
      if (user.password && user.has_password) {
        if (!this.compare(body.password, user.password)) return null;
        return {
          id: user.id,
          email: user.email,
          ref: user.ref_id,
          name: user.display_name,
          type: user.type,
        } satisfies ValidUser;
      }
      return {
        id: user.id,
        ref: user.ref_id,
        email: user.email,
        name: user.display_name,
        type: user.type,
      } satisfies ValidUser;
    };

    if (session) return perform(session);
    else return this.mutation.execute(perform);
  };

  sign_in_validated_account = async (
    body: ValidUser,
    session?: EntityManager,
  ): Promise<SigninResponse> => {
    const perform = async (em: EntityManager) => {
      const token = await this.jwt.signAsync(body);
      const refresh = await this.jwt.signAsync(body, {
        expiresIn: CONSTANTS.JWT_EXPIRES_IN as any,
      });

      const exp = datefns.addHours(
        new Date(),
        parseInt(CONSTANTS.JWT_EXPIRES_IN, 10),
      );
      await this.users.update_user_settings_by_user_id(
        body.id,
        {
          last_login_date: new Date(),
          refresh_token: refresh,
        },
        em,
      );

      const user = await this.users.find_by_id_lock(body.id, em);
      return {
        token,
        refresh,
        user: {
          id: user.id,
          avatar: user.avatar,
          created_at: user.created_at,
          display_name: user.display_name,
          email: user.email,
          type: user.type,
          is_email_verified: user.is_email_verified,
          ref: user.ref_id,
        },
        expires: exp,
      } satisfies SigninResponse;
    };

    if (session) return perform(session);
    return this.mutation.execute(perform);
  };

  authenticate = async (body: SigninDto) => {
    return this.mutation.execute(async (session) => {
      const response = await this.validate(body, session);
      if (!response) throw new UnauthorizedException('Invalid credentials');
      return this.sign_in_validated_account(response, session);
    });
  };

  whoami = async (id: string) => {
    return this.users.find_user_by_id(id);
  };

  sign_out = async (ref: string) => {
    return this.mutation.execute(async (session) => {
      const user = await this.users.find_by_ref_id_lock(ref, session);
      await this.users.update_user_settings_by_user_id(
        user.id,
        {
          refresh_token: undefined,
        },
        session,
      );
      return user;
    });
  };

  confirm_auth = async (token: string): Promise<ValidUser | null> => {
    try {
      const response: ValidUser = await this.jwt.verifyAsync(token);
      return response;
    } catch {
      return null;
    }
  };

  generate_refresh = async (useremail: string, refresh: string) => {
    return this.mutation.execute(async (session) => {
      const account = await this.users.find_user_by_email(useremail, session);
      const settings = await this.users.get_user_settings_by_user_ref(
        account.id,
        session,
      );

      if (!settings.refresh_token) {
        throw new NotFoundException('cannot find refresh');
      }
      if (refresh !== settings.refresh_token) {
        throw new NotFoundException('cannot find refresh');
      }
      await this.jwt.verify(settings.refresh_token);
      return this.sign_in_validated_account(
        {
          email: account.email,
          id: useremail,
          name: account.display_name,
          type: account.type,
          ref: account.ref_id,
        },
        session,
      );
    });
  };

  recovery_verify = async (body: EmailDto) => {
    const errors = isValidDto(body, RecoverDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    return this.mutation.execute(async (session) => {
      const user = await this.users.find_user_by_email(body.email, session);
      if (!user.password) {
        throw new BadRequestException('error recovering user password');
      }
      const token = await this.insert_otp(
        { email: body.email, purpose: OTP_PURPOSE_ENUM.RECOVERY },
        session,
      );
      await this.mail.sendotp(token.value, user.email, user.display_name);
      return true;
    });
  };

  recover = async (body: RecoverDto) => {
    const errors = isValidDto(body, RecoverDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    return this.mutation.execute(async (session) => {
      const user = await this.users.find_user_by_email(body.email, session);
      if (!user.password) {
        throw new BadRequestException(
          'password auth not avaialble for this user',
        );
      }
      const token = await this.find_otp_by_otp(body.otp, session);
      if (datefns.isPast(token.value)) {
        throw new BadRequestException('otp expired');
      }
      if (token.purpose !== OTP_PURPOSE_ENUM.RECOVERY) {
        throw new BadRequestException('invalid otp');
      }

      await this.delete_otp_by_id(token.id, session);
      if (bcrypt.compareSync(body.password, user.password)) {
        throw new BadRequestException(
          'new password cannot be the same as old password',
        );
      }
      const hashed = bcrypt.hashSync(body.password);
      return this.users.update_user(
        user.id,
        {
          password: hashed,
        },
        session,
      );
    });
  };
}
