import {
	type IUserSerialized,
	type IUserSettingsSerialized,
} from "@repo/types";
import { create } from "zustand";

type UserData = {
	user: IUserSerialized;
	settings: IUserSettingsSerialized;
};

type State = {
	data: UserData;
	set_data: (params: Partial<UserData>) => void;
	reset: () => void;
	update_user: (updates: Partial<IUserSerialized>) => void;
	update_settings: (updates: Partial<IUserSettingsSerialized>) => void;
};

const initial: UserData = {
	user: {} as IUserSerialized,
	settings: {} as IUserSettingsSerialized,
};

export const useUser = create<State>()((set, get) => ({
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
	update_user(updates) {
		const current = get().data;
		set({
			data: {
				...get().data,
				user: { ...current.user, ...updates },
			},
		});
	},
	update_settings(updates) {
		const current = get().data;
		set({
			data: {
				...get().data,
				settings: { ...current.settings, ...updates },
			},
		});
	},
}));
