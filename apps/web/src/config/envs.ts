export type CONSTANTS = {
	NODE_ENV: "development" | "production";
	APP_ADDRESS: string;
	API_ADDRESS: string;
	SECRET: string;
};

export const envs: CONSTANTS = {
	NODE_ENV: import.meta.env.VITE_NODE_ENV,
	APP_ADDRESS: import.meta.env.VITE_APP_ADDRESS,
	API_ADDRESS: import.meta.env.VITE_API_ADDRESS,
	SECRET: import.meta.env.VITE_SECRET,
};
