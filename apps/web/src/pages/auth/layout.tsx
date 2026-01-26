import { Outlet } from "react-router";

export const AuthLayoutPage = () => {
	return (
		<div className="w-full h-svh grid lg:grid-cols-2 overflow-hidden">
			<Outlet />
		</div>
	);
};
