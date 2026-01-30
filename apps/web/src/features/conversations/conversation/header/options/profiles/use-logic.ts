import type { IUserSerialized } from "@repo/types";
import { useConversations } from "@/stores";
import { useParams } from "react-router";

export const useLogic = () => {
	const params = useParams<{ id: string }>();
	const conversations = useConversations((state) => state);

	const current = conversations.data.conversations.find(
		(i) => i.ref_id === params.id
	);
	const members: IUserSerialized[] =
		current === undefined ? [] : current.Participants;

	return {
		members,
	};
};
