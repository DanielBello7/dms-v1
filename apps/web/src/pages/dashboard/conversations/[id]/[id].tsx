import { Conversation } from "@/features/conversations";
import { Navigate, useParams } from "react-router";

export const ConversationDetailsPage = () => {
	const { id } = useParams();
	if (!id) return <Navigate to="*" />;
	return <Conversation id={id} />;
};
