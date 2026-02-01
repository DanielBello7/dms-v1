import { create } from "zustand";

type HeaderData = {
	title: string;
};

type State = {
	data: HeaderData;
	set_data: (params: Partial<HeaderData>) => void;
	reset: () => void;
	set_title: (title: string) => void;
};

const initial: HeaderData = {
	title: "Dashboard",
};

export const useHeader = create<State>()((set, get) => ({
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
	set_title(title) {
		set({
			data: {
				...get().data,
				title,
			},
		});
	},
}));
