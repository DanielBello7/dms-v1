import { type IConversation } from "@repo/types";
import { combine, deduct } from "@repo/helpers";
import { create } from "zustand";

type ConversationData = {
	conversations: IConversation[];
	active: IConversation | null;
};

// prettier-ignore
type State = {
	data: ConversationData;
	set_data: (params: Partial<ConversationData>) => void;
	reset: () => void;
	insert_conversations: (conversations: IConversation[]) => void;
	remove_conversations: (ids: string[]) => void;
	update_conversations: (ids: string[], updates: Partial<IConversation>) => void;
};

const initial: ConversationData = {
	conversations: [],
	active: null,
};

export const useConversations = create<State>()((set, get) => ({
	data: initial,
	reset() {
		set({
			data: initial,
		});
	},
	set_data(param) {
		const current = get().data;
		set({
			data: {
				...current,
				...param,
			},
		});
	},
	insert_conversations(conversations) {
		const current = get().data;
		const updates = combine("ref_id", current.conversations, conversations);
		set({
			data: {
				...get().data,
				conversations: updates,
			},
		});
	},
	remove_conversations(ids) {
		const current = get().data;
		const updates = deduct("ref_id", current.conversations, ids);
		set({
			data: {
				...get().data,
				conversations: updates,
			},
		});
	},
	update_conversations(ids, updates) {
		const current = get().data;
		const changes = current.conversations.map((conversation) => {
			if (ids.includes(conversation.id)) {
				return { ...conversation, ...updates };
			}
			return conversation;
		});
		set({
			data: {
				...get().data,
				conversations: changes,
			},
		});
	},
}));
