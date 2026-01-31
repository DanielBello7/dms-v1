import { ApiService } from "@/utils";
import { AxiosInstance } from "axios";
import {
	IUserSerialized,
	IUserSettingsSerialized,
	IPagePaginated,
	BaseOmit,
} from "@repo/types";

export type UpdateUserDto = Partial<
	Omit<
		BaseOmit<IUserSerialized>,
		| "ref_id"
		| "timezone"
		| "has_password"
		| "is_email_verified"
		| "type"
		| "index"
		| "display_name"
	>
>;

export type SetPasswordDto = {
	user_ref: string;
	new_password: string;
};

export type UpdatePasswordDto = {
	old_password: string;
	new_password: string;
};

export type UpdateUserSettingsDto = Partial<
	Pick<IUserSettingsSerialized, "dark_mode" | "is_onboarded">
>;

export type SearchUsersDto = {
	value: string;
	page?: number;
	pick?: number;
	sort?: "ASC" | "DESC";
};

export class UsersService extends ApiService {
	constructor(baseURL?: string | AxiosInstance) {
		super(baseURL ? baseURL : "");
	}

	/**
	 * Updates a user by their reference ID
	 * @param id - User reference ID (UUID)
	 * @param data - User data to update
	 * @returns Updated user data
	 */
	update_user = async (
		id: string,
		data: UpdateUserDto
	): Promise<IUserSerialized> => {
		return (await this.patch(`users/${id}`, data)).data;
	};

	/**
	 * Gets user settings by user reference ID
	 * @param id - User reference ID (UUID)
	 * @returns User settings data
	 */
	get_user_settings = async (ref: string): Promise<IUserSettingsSerialized> => {
		return (await this.get(`users/${ref}/settings`)).data;
	};

	/**
	 * Search users by email (paginated)
	 * @param query - value (search string), optional page, pick, sort
	 * @returns Paginated list of users
	 */
	search_users = async (
		query: SearchUsersDto
	): Promise<IPagePaginated<IUserSerialized>> => {
		return (await this.get("users/search", { params: query })).data;
	};

	/**
	 * Gets a user by their email address
	 * @param email - User email address
	 * @returns User data
	 */
	get_user_by_email = async (email: string): Promise<IUserSerialized> => {
		return (await this.get(`users/email/${email}`)).data;
	};

	/**
	 * Gets a user by their reference ID
	 * @param ref - User reference ID (UUID)
	 * @returns User data
	 */
	get_user_by_ref = async (ref: string): Promise<IUserSerialized> => {
		return (await this.get(`users/${ref}`)).data;
	};

	/**
	 * Sets password for a user who does not have one (e.g. after OTP signin)
	 * @param data - user_ref (UUID) and new_password
	 * @returns Updated user data
	 */
	set_password = async (data: SetPasswordDto): Promise<IUserSerialized> => {
		return (await this.post("users/password", data)).data;
	};

	/**
	 * Updates password for a user who already has one
	 * @param ref - User reference ID (UUID)
	 * @param data - old_password and new_password
	 * @returns Updated user data
	 */
	update_password = async (
		ref: string,
		data: UpdatePasswordDto
	): Promise<IUserSerialized> => {
		return (await this.patch(`users/${ref}/password`, data)).data;
	};

	/**
	 * Updates user settings by user reference ID (e.g. dark_mode, is_onboarded)
	 * @param ref - User reference ID (UUID)
	 * @param data - Settings fields to update
	 * @returns Updated user settings
	 */
	update_user_settings = async (
		ref: string,
		data: UpdateUserSettingsDto
	): Promise<IUserSettingsSerialized> => {
		return (await this.patch(`users/${ref}/settings`, data)).data;
	};
}
