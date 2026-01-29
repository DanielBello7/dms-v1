import { useAsyncHandler } from "@/hooks";
import { api } from "@/lib";
import { useUser, useConversations } from "@/stores";
import { useNavigate, useParams } from "react-router";

export const useLogic = (close: () => void) => {
	const user = useUser((state) => state);
	const handler = useAsyncHandler();
	const id = useParams<{ id: string }>();
	const conversations = useConversations((state) => state);
	const navigate = useNavigate();

	const action = () =>
		handler.run(async () => {
			const search = conversations.data.conversations.find(
				(a) => a.ref_id === id
			);
			if (!search) return;
			if (search.created_by !== user.data.user.id) {
				throw new Error("Cannot delete conversation");
			}
			await api.conversations.delete_conversation(search.ref_id);
			conversations.remove_conversations([search.id]);
			conversations.set_data({ active: null });
			close();
			navigate("/dashboard/conversations");
		});

	return {
		action,
		user,
		handler,
		id,
		conversations,
	};
};
