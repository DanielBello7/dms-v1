import { envs } from "@/config";
import { api } from "@/lib";
import { useConversations, useMessages } from "@/stores";
import { wait } from "@repo/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useLogic = (id: string) => {
	const { data, set_data } = useConversations((state) => state);
	const { reset } = useMessages((state) => state);
	const query = useQuery({
		queryKey: ["conversation", id],
		queryFn: async () => {
			await wait(2000, envs.NODE_ENV);
			if (data.active && data.active.ref_id === id) return data.active;
			return api.conversations.find_conversation_by_ref(id);
		},
		retry: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (query.data) {
			set_data({
				active: query.data,
			});
			reset();
		}
	}, [query.data, set_data, reset]);

	return {
		...query,
	};
};
