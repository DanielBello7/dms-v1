import { AccountType, IUser } from '@repo/types';

export class UserEntity implements IUser {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | undefined;
  firstname: string;
  surname: string;
  email: string;
  password: string | undefined;
  avatar: string | undefined;
  timezone: string;
  ref_id: string;
  index: number;
  display_name: string;
  username: string;
  type: AccountType;
  is_email_verified: boolean;
  has_password: boolean;
}
