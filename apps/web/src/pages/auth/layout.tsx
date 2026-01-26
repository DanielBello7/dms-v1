import { Outlet } from "react-router";

export const AuthLayoutPage = () => {
	return (
		<div className="w-full h-svh overflow-hidden">
			<Outlet />
		</div>
	);
};
