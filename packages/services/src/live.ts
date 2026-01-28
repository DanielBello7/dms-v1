import { AxiosInstance } from "axios";
import { ApiService } from "./utils/api";
import { AuthService } from "./auth/auth.service";
import { ConversationsService } from "./conversations/conversations.service";
import { SignupService } from "./signup/signup.service";
import { UsersService } from "./users/users.service";

const BASE_SERVER_URL = "http://localhost:3000";

export class LiveService extends ApiService {
	public readonly url: string = BASE_SERVER_URL;
	public readonly auth: AuthService;
	public readonly conversations: ConversationsService;
	public readonly signup: SignupService;
	public readonly users: UsersService;

	constructor(BASE_URL?: string | AxiosInstance) {
		const url = typeof BASE_URL === "string" ? BASE_URL : BASE_SERVER_URL;
		super(url);
		this.url = url;
		this.auth = new AuthService(this.axios_instance);
		this.conversations = new ConversationsService(this.axios_instance);
		this.signup = new SignupService(this.axios_instance);
		this.users = new UsersService(this.axios_instance);
	}
}
