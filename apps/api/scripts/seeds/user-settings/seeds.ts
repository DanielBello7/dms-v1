import { IUserSettings } from '@repo/types';
import { v4 as uuid } from 'uuid';
import { data as users } from '../users/seeds';

const now = new Date();

export const data: IUserSettings[] = users.map((user, index) => ({
  id: uuid(),
  ref_id: uuid(),
  index: 0,
  created_at: now,
  updated_at: now,
  deleted_at: undefined,
  user_id: user.id,
  dark_mode: false,
  is_onboarded: false,
  refresh_token: undefined,
  last_login_date: undefined,
}));
