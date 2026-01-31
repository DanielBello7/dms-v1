import { AuthService } from '@/auth/auth.service';
import { InsertUserDto } from '@/users/dto/insert-user.dto';
import { UsersService } from '@/users/users.service';
import { MutationsService } from '@app/mutations';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SendVerifyOtpDto } from './dto/send-verify-otp.dto';
import { IMailModuleType, isValidDto } from '@app/util';
import { OTP_PURPOSE_ENUM } from '@repo/types';
import { OtpSchema } from '@/auth/schemas/otp.schema';
import { isPast } from 'date-fns';
import { VerifyUserEmailDto } from './dto/verify-user-email.dto';
import { SetAvatarDto } from './dto/set-avatar.dto';

@Injectable()
export class SignupService {
  constructor(
    private readonly mutations: MutationsService,
    private readonly users: UsersService,
    private readonly auth: AuthService,
    private readonly mail: IMailModuleType,
  ) {}

  signup_user = async (body: InsertUserDto) => {
    return this.users.insert_other_user(body);
  };

  send_verify_otp = async (body: SendVerifyOtpDto) => {
    const error = isValidDto(body, SendVerifyOtpDto);
    if (error.length > 0) throw new BadRequestException(error);
    return this.mutations.execute(async (session) => {
      const user = await this.users.find_user_by_email(body.email, session);
      if (user.is_email_verified) {
        throw new BadRequestException('email already verified');
      }

      const check = await this.auth.get_user_otps(user.email, session);
      const expired: OtpSchema[] = [];
      const usefuls: OtpSchema[] = [];

      for (const a of check) {
        if (isPast(a.expires_at)) {
          expired.push(a);
          continue;
        }
        if (a.purpose === OTP_PURPOSE_ENUM.VERIFY) {
          usefuls.push(a);
          continue;
        }
      }

      if (expired.length > 0) {
        for (const a of expired) {
          await this.auth.delete_otp_by_id(a.id, session);
        }
      }

      if (usefuls.length > 0) {
        const main = usefuls[0];
        if (usefuls.length > 1) {
          for (const o of usefuls.slice(1)) {
            await this.auth.delete_otp_by_id(o.id, session);
          }
        }
        await this.mail.sendotp(main.value, body.email, user.display_name);
        return true;
      }

      const response = await this.auth.insert_otp(
        { email: body.email, purpose: OTP_PURPOSE_ENUM.VERIFY },
        session,
      );

      await this.mail.sendotp(response.value, body.email, user.display_name);
      return true;
    });
  };

  verify_user_email = async (body: VerifyUserEmailDto) => {
    return this.mutations.execute(async (session) => {
      const user = await this.users.find_user_by_email(body.email, session);
      const otp = await this.auth.find_otp_by_otp(body.otp, session);

      if (isPast(otp.expires_at)) {
        await this.auth.delete_otp_by_id(otp.id, session);
        throw new BadRequestException('otp expired');
      }

      if (otp.value !== body.otp) {
        throw new BadRequestException('invalid credentials');
      }

      if (otp.purpose !== OTP_PURPOSE_ENUM.VERIFY) {
        throw new BadRequestException('invalid credentials');
      }

      await this.auth.delete_otp_by_id(otp.id, session);
      await this.users.update_user(
        user.id,
        {
          is_email_verified: true,
        },
        session,
      );
      return this.auth.sign_in_validated_account(
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

  verify_user_email_no_signin = async (body: VerifyUserEmailDto) => {
    return this.mutations.execute(async (session) => {
      const user = await this.users.find_user_by_email(body.email, session);
      const otp = await this.auth.find_otp_by_otp(body.otp, session);

      if (isPast(otp.expires_at)) {
        await this.auth.delete_otp_by_id(otp.id, session);
        throw new BadRequestException('otp expired');
      }

      if (otp.value !== body.otp) {
        throw new BadRequestException('invalid credentials');
      }

      if (otp.purpose !== OTP_PURPOSE_ENUM.VERIFY) {
        throw new BadRequestException('invalid credentials');
      }

      await this.auth.delete_otp_by_id(otp.id, session);
      return this.users.update_user(
        user.id,
        {
          is_email_verified: true,
        },
        session,
      );
    });
  };

  set_avatar = async (body: SetAvatarDto) => {
    const errors = isValidDto(body, SetAvatarDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    return this.users.update_user(body.user_id, { avatar: body.value });
  };
}
