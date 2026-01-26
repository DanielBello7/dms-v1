import { Navigate, useParams } from "react-router";

export const UserDetailsPage = () => {
	const { id } = useParams();
	if (!id) return <Navigate to="*" />;
	return <div>{id}</div>;
};
