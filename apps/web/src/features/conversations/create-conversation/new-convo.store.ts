import type { IUserSerialized } from "@repo/types";
import { combine, deduct } from "@repo/helpers";
import { create } from "zustand";

type NewConvoData = {
  members: IUserSerialized[];
};

type State = {
  data: NewConvoData;
  set_data: (params: Partial<NewConvoData>) => void;
  reset: () => void;
  insert_members: (members: IUserSerialized[]) => void;
  remove_members: (ids: string[]) => void;
  update_members: (ids: string[], updates: Partial<IUserSerialized>) => void;
};

const initial: NewConvoData = {
  members: [],
};

export const useNewConvo = create<State>()((set, get) => ({
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
  insert_members(members) {
    const current = get().data;
    const updates = combine("ref_id", current.members, members);
    set({
      data: {
        ...get().data,
        members: updates,
      },
    });
  },
  remove_members(ids) {
    const current = get().data;
    const updates = deduct("ref_id", current.members, ids);
    set({
      data: {
        ...get().data,
        members: updates,
      },
    });
  },
  update_members(ids, updates) {
    const current = get().data;
    const changes = current.members.map((member) => {
      if (ids.includes(member.id)) {
        return { ...member, ...updates };
      }
      return member;
    });
    set({
      data: {
        ...get().data,
        members: changes,
      },
    });
  },
}));
