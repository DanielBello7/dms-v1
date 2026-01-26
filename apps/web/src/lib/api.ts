import { envs } from "@/config";
import { LiveService } from "@repo/services";
import { axios_interceptor } from "./interceptor";
const api = new LiveService(envs.API_ADDRESS);
axios_interceptor(api.axiosInstance);
export { api };
