import { AuthLayoutPage, RecoveryPage, SigninPage, SignupPage } from "@/pages";
import { Route } from "react-router";

export const AuthRoutes = () => {
	return (
		<Route element={<AuthLayoutPage />}>
			<Route path="/signin" element={<SigninPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/recovery" element={<RecoveryPage />} />
		</Route>
	);
};
