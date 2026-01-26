import { Navigate, useParams } from "react-router";

export const ConversationDetailsPage = () => {
	const { id } = useParams();
	if (!id) return <Navigate to="*" />;
	return <div>conversation {id}</div>;
};
