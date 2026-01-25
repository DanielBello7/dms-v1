import { IUserSettings } from '@repo/types';

export class UserSettingsEntity implements IUserSettings {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | undefined;
  user_id: string;
  refresh_token: string | undefined;
  last_login_date: Date | undefined;
  dark_mode: boolean;
  is_onboarded: boolean;
  ref_id: string;
  index: number;
}
