import { api } from "@/lib";
import { useConversations, useUser } from "@/stores";
import { SORT_TYPE } from "@repo/services";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export const useLogic = () => {
	const [search, setSearch] = useState("");
	const [params, setParams] = useState({
		page: 1,
		pick: 9,
		sort: SORT_TYPE.DESC,
	});
	const { insert_conversations, data } = useConversations((state) => state);
	const user = useUser((state) => state.data.user);

	const query = useQuery({
		queryKey: ["conversations", params],
		queryFn: async () => {
			return api.conversations.get_user_conversations({
				ref: user.ref_id,
				...params,
			});
		},
		retry: false,
		refetchOnWindowFocus: false,
	});

	const has_search = search.trim().length > 0;

	const results = useMemo(() => {
		const query = search.trim();
		if (query.length < 1) return [];
		return data.conversations.filter((c) =>
			c.Participants.some((p) => p.display_name.includes(query))
		);
	}, [search, data.conversations]);

	useEffect(() => {
		if (query.data) {
			insert_conversations(query.data.docs);
		}
	}, [query.data, insert_conversations]);

	return {
		has_search,
		results,
		query,
		setParams,
		params,
		setSearch,
		search,
		conversations: data.conversations,
	};
};
