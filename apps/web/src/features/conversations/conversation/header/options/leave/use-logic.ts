import { envs } from "@/config";
import { useAsyncHandler } from "@/hooks";
import { api } from "@/lib";
import { useUser, useConversations } from "@/stores";
import { wait } from "@repo/helpers";
import { useParams, useNavigate } from "react-router";

export const useLogic = (close: () => void) => {
	const user = useUser((state) => state);
	const handler = useAsyncHandler();
	const params = useParams<{ id: string }>();
	const conversations = useConversations((state) => state);
	const navigate = useNavigate();

	const action = () =>
		handler.run(async () => {
			const search = conversations.data.conversations.find(
				(a) => a.ref_id === params.id
			);
			if (!search) {
				throw new Error("Conversation error");
			}
			if (search.created_by !== user.data.user.id) {
				throw new Error("Cannot leave conversation");
			}
			await wait(2000, envs.NODE_ENV);
			await api.conversations.exit_conversation({
				ref_id: search.ref_id,
				user_ref: user.data.user.ref_id,
			});
			conversations.remove_conversations([search.ref_id]);
			conversations.set_data({ active: null });
			close();
			navigate("/dashboard/conversations");
		});

	return {
		action,
		user,
		handler,
		id: params,
		conversations,
	};
};
