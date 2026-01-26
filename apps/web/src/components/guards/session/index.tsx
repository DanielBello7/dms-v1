import { Navigate } from "react-router";
import { SessionLoader } from "./loader";

type Props = {
	children?: React.ReactNode;
	jwt?: string | null;
	location: string;
};

const routes = ["/", "/signin", "/signup", "/recovery"];

export const SessionGuard = ({ children, jwt, location }: Props) => {
	if (!jwt) {
		if (!routes.includes(location)) return <Navigate to="/" replace />;
		return <>{children}</>;
	}

	if (jwt) {
		if (routes.includes(location) && location !== "/dashboard") {
			return <Navigate to="/dashboard" replace />;
		}
		return <>{children}</>;
	}

	return <SessionLoader />;
};
