import { Dashboard } from "@/features/dashboard";
import { Outlet } from "react-router";

export const DashboardLayoutPage = () => {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
};
