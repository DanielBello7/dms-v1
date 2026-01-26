import { ICommon } from "./common";

export enum AccountType {
	Client = "Client",
	Admins = "Admins",
}

export type IUser = ICommon & {
	firstname: string;
	surname: string;
	email: string;
	password: string | undefined;
	avatar: string | undefined;
	timezone: string;
	username: string;
	display_name: string;
	type: AccountType;
	is_email_verified: boolean;
};

export type IUserSettings = ICommon & {
	user_id: string;
	refresh_token: string | undefined;
	last_login_date: Date | undefined;
	dark_mode: boolean;
	is_onboarded: boolean;
};
