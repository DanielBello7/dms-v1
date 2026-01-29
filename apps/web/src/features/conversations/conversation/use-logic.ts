import { api } from "@/lib";
import { useConversations } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useLogic = (id: string) => {
	const { data, set_data } = useConversations((state) => state);
	const query = useQuery({
		queryKey: ["conversation", id],
		queryFn: async () => {
			if (data.active && data.active.ref_id === id) return data.active;
			return api.conversations.find_conversation_by_ref(id);
		},
		retry: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (query.data) set_data({ active: query.data });
	}, [query.data, set_data]);

	return {
		...query,
	};
};
