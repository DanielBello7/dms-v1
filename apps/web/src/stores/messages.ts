import { type IMessagePopulated } from "@repo/services";
import { combine, deduct } from "@repo/helpers";
import { create } from "zustand";

export type AppMessage = IMessagePopulated & { isSent: boolean };

type MessageData = {
  messages: AppMessage[];
  delivered: Set<string>;
};

type State = {
  data: MessageData;
  set_data: (params: Partial<MessageData>) => void;
  reset: () => void;
  insert_messages_head: (messages: AppMessage[]) => void;
  insert_messages_tail: (messages: AppMessage[]) => void;
  remove_messages: (ids: string[]) => void;
  update_messages: (ids: string[], updates: Partial<AppMessage>) => void;
};

const initial: MessageData = {
  messages: [],
  delivered: new Set<string>(),
};

export const useMessages = create<State>()((set, get) => ({
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
  insert_messages_head(messages) {
    const current = get().data;
    const updates = combine("ref_id", current.messages, messages, "INFRONT");
    set({
      data: {
        ...get().data,
        messages: updates,
      },
    });
  },
  insert_messages_tail(messages) {
    const current = get().data;
    const updates = combine("ref_id", current.messages, messages, "BEHIND");
    set({
      data: {
        ...get().data,
        messages: updates,
      },
    });
  },
  remove_messages(ids) {
    const current = get().data;
    const updates = deduct("ref_id", current.messages, ids);
    set({
      data: {
        ...get().data,
        messages: updates,
      },
    });
  },
  update_messages(ids, updates) {
    const current = get().data;
    const changes = current.messages.map((message) => {
      if (ids.includes(message.id)) {
        return { ...message, ...updates };
      }
      return message;
    });
    set({
      data: {
        ...get().data,
        messages: changes,
      },
    });
  },
}));
