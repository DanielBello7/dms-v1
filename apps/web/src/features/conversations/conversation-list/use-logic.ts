import { api } from "@/lib";
import { useConversations, useUser } from "@/stores";
import { SORT_TYPE } from "@repo/services";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useLogic = () => {
	const [params, setParams] = useState({
		page: 1,
		pick: 9,
		sort: SORT_TYPE.DESC,
	});
	const { insert_conversations, data } = useConversations((state) => state);
	const user = useUser((state) => state.data.user);

	const query = useQuery({
		queryKey: ["conversations"],
		queryFn: async () => {
			return api.conversations.get_user_conversations({
				ref: user.ref_id,
				...params,
			});
		},
	});

	useEffect(() => {
		if (query.data) {
			insert_conversations(query.data.docs);
		}
	}, [query.data, insert_conversations]);

	return {
		query,
		setParams,
		params,
		conversations: data.conversations,
	};
};
