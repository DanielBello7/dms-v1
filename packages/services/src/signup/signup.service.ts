import { ApiService } from "@/utils";
import { AxiosInstance } from "axios";
import { IUser, IUserSerialized, BaseOmit } from "@repo/types";

export type InsertUserDto = Omit<
	BaseOmit<IUser>,
	"avatar" | "ref_id" | "index" | "display_name"
>;

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
}
