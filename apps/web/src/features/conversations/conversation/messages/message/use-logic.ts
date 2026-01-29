import { api } from "@/lib";
import { useMessages, useUser, type AppMessage } from "@/stores";
import { ensure_error } from "@repo/helpers";
import { useCallback, useEffect, useState } from "react";

const delivered = new Set<string>();

export const useLogic = (data: AppMessage) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const user = useUser((state) => state);
	const { update_messages } = useMessages((state) => state);
	const isMe = data.created_by === user.data.user.id;

	const cleanup = () => {
		setIsLoading(false);
		setError(null);
	};

	const deliver = useCallback(async () => {
		cleanup();
		setIsLoading(true);

		try {
			const results = await api.conversations.insert_message({
				conversation_id: data.conversation_id,
				created_by: data.created_by,
				index: data.index,
				media: data.media,
				read_by: data.read_by,
				ref_id: data.ref_id,
				text: data.text,
			});
			delivered.add(results.id);
			delivered.delete(data.id);
			update_messages([data.id], { ...results, isSent: true });
		} catch (error) {
			setError(ensure_error(error));
		} finally {
			cleanup();
		}
	}, [update_messages, data]);

	useEffect(() => {
		if (data.isSent) return;
		if (delivered.has(data.id)) return;
		delivered.add(data.id);
		deliver();
	}, [deliver, data.id, data.isSent]);

	return {
		deliver,
		isLoading,
		error,
		isMe,
	};
};
