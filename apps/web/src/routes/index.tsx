import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router";
import { NotFoundPage } from "../pages/others/not-found";
import { AuthRoutes } from "./auth";
import { DashboardRoutes } from "./dashboard";
import { HomePage } from "@/pages";
import { Session } from "@/components/security";

export const AppRoutes = () => {
	const location = useLocation();
	const topLevelKey = location.pathname.split("/")[1] || "root";
	return (
		<AnimatePresence mode="wait" key={topLevelKey}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFoundPage />} />
				<Route element={<Session />}>
					<Route>
						{AuthRoutes()}
						{DashboardRoutes()}
					</Route>
				</Route>
			</Routes>
		</AnimatePresence>
	);
};
