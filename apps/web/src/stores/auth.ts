import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthData = {
	jwt: string | null;
	refresh: string | null;
	expires: Date | null;
	user: unknown | null;
};

type State = {
	data: AuthData;
	set_data: (params: Partial<AuthData>) => void;
	reset: () => void;
};

const initial: AuthData = {
	expires: new Date(),
	jwt: null,
	refresh: null,
	user: null,
};

export const useAuth = create<State>()(
	persist(
		(set, get) => ({
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
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
