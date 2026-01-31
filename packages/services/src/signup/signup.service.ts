import { ApiService } from "@/utils";
import { AxiosInstance } from "axios";
import { IUser, IUserSerialized, BaseOmit } from "@repo/types";
import type { SigninResponse } from "../auth/auth.service";

export type InsertUserDto = Omit<
	BaseOmit<IUser>,
	| "avatar"
	| "ref_id"
	| "index"
	| "display_name"
	| "has_password"
	| "is_email_verified"
>;

export type SendVerifyOtpDto = {
	email: string;
};

export type VerifyUserEmailDto = {
	email: string;
	otp: string;
};

export type SetAvatarDto = {
	user_id: string;
	value: string;
};

export class SignupService extends ApiService {
	constructor(baseURL?: string | AxiosInstance) {
		super(baseURL ? baseURL : "");
	}

	/**
	 * Signs up a new user
	 * @param data - User registration data
	 * @returns Created user data
	 */
	signup_user = async (data: InsertUserDto): Promise<IUserSerialized> => {
		return (await this.post("signup", data)).data;
	};

	/**
	 * Sends a verification OTP to the user's email
	 * @param data - Email to send OTP to
	 * @returns Resolves when OTP is sent
	 */
	send_verify_otp = async (data: SendVerifyOtpDto): Promise<boolean> => {
		await this.post("signup/verify/otp", data);
		return true;
	};

	/**
	 * Verifies the user's email with the OTP they received and signs the user in
	 * @param data - Email and OTP code
	 * @returns Signin response (token, refresh, user, expires)
	 */
	verify_user_email = async (
		data: VerifyUserEmailDto
	): Promise<SigninResponse> => {
		return (await this.post("signup/verify", data)).data;
	};

	/**
	 * Verifies the user's email with the OTP without signing in (e.g. safe/headless flow)
	 * @param data - Email and OTP code
	 * @returns Updated user with is_email_verified set to true
	 */
	verify_user_email_safe = async (
		data: VerifyUserEmailDto
	): Promise<IUserSerialized> => {
		return (await this.post("signup/verify-safe", data)).data;
	};

	/**
	 * Sets the user's avatar (e.g. avatar key from config)
	 * @param data - user_id and avatar value
	 * @returns Updated user
	 */
	set_user_avatar = async (data: SetAvatarDto): Promise<IUserSerialized> => {
		return (await this.post("signup/set-avatar", data)).data;
	};
}
