import { ConversationLayout } from "@/features/conversations";
import { Outlet } from "react-router";

export const ConversationsPage = () => {
	return (
		<ConversationLayout>
			<Outlet />
		</ConversationLayout>
	);
};
