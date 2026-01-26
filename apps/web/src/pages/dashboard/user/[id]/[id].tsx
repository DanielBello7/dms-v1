import { User } from "@/features/user";
import { Navigate, useParams } from "react-router";

export const UserDetailsPage = () => {
	const { id } = useParams();
	if (!id) return <Navigate to="*" />;
	return <User id={id} />;
};
