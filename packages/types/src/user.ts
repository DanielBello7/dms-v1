import { ICommon } from "./common";

export type IUser = ICommon & {
	firstname: string;
	surname: string;
	email: string;
	password: string | undefined;
	avatar: string | undefined;
	timezone: string;
};

export type IUserSettings = ICommon & {
	user_id: string;
	refresh_token: string | undefined;
	last_login_date: Date | undefined;
	dark_mode: boolean;
	is_onboarded: boolean;
};
