import { Dashboard } from "@/components/dashboard";
import { Outlet } from "react-router";

export const DashboardLayoutPage = () => {
	return (
		<Dashboard>
			<Outlet />
		</Dashboard>
	);
};
