import { useUser } from "@/stores";
import { api } from "./api";

const user = useUser.getState();

export const set_account = async () => {
	const sessions = await api.auth.whoami();
	const response = await api.users.get_user_by_ref(sessions.ref_id);
	const settings = await api.users.get_user_settings(sessions.ref_id);
	return user.set_data({ user: response, settings: settings });
};
