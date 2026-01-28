import { ApiService } from "@/utils";
import { AxiosInstance } from "axios";
import { IUser, IUserSettings, BaseOmit } from "@repo/types";

export type UpdateUserDto = Partial<BaseOmit<IUser>>;

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
	update_user = async (id: string, data: UpdateUserDto): Promise<IUser> => {
		return (await this.patch(`users/${id}`, data)).data;
	};

	/**
	 * Gets user settings by user reference ID
	 * @param id - User reference ID (UUID)
	 * @returns User settings data
	 */
	get_user_settings = async (ref: string): Promise<IUserSettings> => {
		return (await this.get(`users/${ref}/settings`)).data;
	};

	/**
	 * Gets a user by their email address
	 * @param email - User email address
	 * @returns User data
	 */
	get_user_by_email = async (email: string): Promise<IUser> => {
		return (await this.get(`users/email/${email}`)).data;
	};

	/**
	 * Gets a user by their reference ID
	 * @param ref - User reference ID (UUID)
	 * @returns User data
	 */
	get_user_by_ref = async (ref: string): Promise<IUser> => {
		return (await this.get(`users/${ref}`)).data;
	};
}
