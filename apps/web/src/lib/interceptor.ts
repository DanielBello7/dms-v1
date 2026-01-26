import { useAuth } from "@/stores";
import type { AxiosInstance } from "axios";

export const axios_interceptor = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		async (config) => {
			const token = useAuth.getState().data.jwt;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => Promise.reject(error)
	);
};
