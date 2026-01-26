import { useUser } from "@/stores";
// import { api } from "./api";

const user = useUser.getState();

export const set_account = async () => {
	console.log(user);
	// const session = await api.auth.whoami();
	// const organization = await api.company.find_using_account_id(session._id);
	// return account.set_data({
	// 	company: organization,
	// });
};
