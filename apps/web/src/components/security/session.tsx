import { useAuth } from "@/stores";
import { SessionGuard } from "@/components/guards/session";
import { Outlet, useLocation } from "react-router";

/**
 * This doesn't make any API calls, it only just looks for the JWT token in the store
 * and redirects the user to the login page if they are not logged in.
 * This component is used to protect the routes and redirect the user to the login page if they are not logged in.
 * @returns
 */
export const Session = () => {
	const auth = useAuth((state) => state);
	const location = useLocation();
	return (
		<SessionGuard jwt={auth.data.jwt} location={location.pathname}>
			<Outlet />
		</SessionGuard>
	);
};
