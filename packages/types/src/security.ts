import { ICommon } from "./common";

export enum OTP_PURPOSE_ENUM {
	LOGIN = "LOGIN",
}

export type IOTP = ICommon & {
	value: string;
	email: string; // email
	purpose: OTP_PURPOSE_ENUM;
	expires_at: Date;
};
