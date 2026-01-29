import { type IConversationPopulated, SORT_TYPE } from "@repo/services";
import { api } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useMessages } from "@/stores";
import { useParams } from "react-router";
import { useAsyncHandler } from "@/hooks";
import { wait } from "@repo/helpers";
import { envs } from "@/config";

export const useLogic = (body: IConversationPopulated) => {
	const [hasMore, setHasMore] = useState<boolean | undefined>(true);
	const { data, insert_messages_tail, insert_messages_head } = useMessages(
		(state) => state
	);
	const { id } = useParams<{ id: string }>();
	const handler = useAsyncHandler();

	const query = useQuery({
		queryKey: ["messages", body.ref_id],
		queryFn: async () => {
			return api.conversations.get_conversation_messages(body.ref_id, {
				sort: SORT_TYPE.DESC,
				pick: 3,
				from_date: undefined,
			});
		},
		retry: false,
		enabled: Boolean(id && id === body.ref_id),
		refetchInterval: 5000,
		refetchOnWindowFocus: false,
	});

	const get_earlier = () => {
		return handler.run(async () => {
			const top_most_msg = data.messages[data.messages.length - 1];
			if (!top_most_msg) return;
			if (!hasMore) return;
			await wait(2000, envs.NODE_ENV);
			const response = await api.conversations.get_conversation_messages(
				body.ref_id,
				{
					sort: SORT_TYPE.DESC,
					pick: 30,
					from_date: new Date(top_most_msg.created_at),
				}
			);
			setHasMore(response.has_next_page);
			insert_messages_head(
				[...response.docs].reverse().map((i) => ({
					...i,
					isSent: true,
				}))
			);
		});
	};

	const scroll_to_end = () => {
		const element = document.getElementById("msgs-box");
		if (element) element.scrollTo({ top: element.scrollHeight + 300 });
	};

	useEffect(() => {
		if (query.data) {
			if (data.messages.length === 0) {
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setHasMore(query.data.has_next_page);
			}

			const reversed = [...query.data.docs].reverse();
			insert_messages_tail(
				reversed.map((i) => ({
					...i,
					isSent: true,
				}))
			);
			scroll_to_end();
		}
	}, [query.data, insert_messages_tail, setHasMore, data.messages.length]);

	return {
		...query,
		hasMore,
		handler,
		get_earlier,
		messages: data.messages,
	};
};
