import { set_account, signout } from "@/lib";
import { wait } from "@repo/helpers";
import { useAuth } from "@/stores";
import { AuthGuard } from "@/components/guards/auth";
import { Outlet } from "react-router";
import { envs } from "@/config";

/**
 * It primarily validates the session by making an API call and sets the account data in the store.
 * This component is used to protect the routes and redirect the user to the login page if they are not logged in.
 * It also sets the account data in the store.
 * It also signs out the user if they are not logged in.
 * @returns
 */

export const Protect = () => {
	const auth = useAuth((state) => state);
	return (
		<AuthGuard
			validation={async () => {
				await wait(2000, envs.NODE_ENV);
				await set_account();
			}}
			onlogout={signout}
			jwt={auth.data.jwt}>
			<Outlet />
		</AuthGuard>
	);
};
