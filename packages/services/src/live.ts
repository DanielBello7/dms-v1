import { AxiosInstance } from "axios";
import { ApiService } from "./utils/api";

export class LiveService extends ApiService {
	constructor(BASE_URL?: string | AxiosInstance) {
		super(BASE_URL ? BASE_URL : "http://localhost:3000");
	}
}
