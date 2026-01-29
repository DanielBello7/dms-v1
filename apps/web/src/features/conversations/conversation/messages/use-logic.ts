import { type IConversationPopulated, SORT_TYPE } from "@repo/services";
import { api } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useMessages } from "@/stores";

export const useLogic = (body: IConversationPopulated) => {
	const [pickDate, setPickDate] = useState<string | undefined>(undefined);
	const { data, insert_messages } = useMessages((state) => state);

	const query = useQuery({
		queryKey: ["messages", body.id, pickDate],
		queryFn: async () => {
			return api.conversations.get_conversation_messages(body.ref_id, {
				sort: SORT_TYPE.DESC,
				pick: 30,
				from_date: pickDate,
			});
		},
		retry: false,
		refetchInterval: 5000,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (query.data) {
			insert_messages(
				query.data.docs.map((i) => ({
					...i,
					isSent: true,
				}))
			);
		}
	}, [query.data, insert_messages]);

	return {
		...query,
		pickDate,
		setPickDate,
		messages: data.messages,
	};
};
