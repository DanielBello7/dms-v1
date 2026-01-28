import { create } from "zustand";

export enum RECOVERY_SCREENS {
	EMAIL = "EMAIL",
	PASSWORD = "PASSWORD",
	OTP = "OTP",
}

type RecoveryData = {
	screen: RECOVERY_SCREENS;
};

type State = {
	data: RecoveryData;
	set_data: (params: Partial<RecoveryData>) => void;
	reset: () => void;
};

const initial: RecoveryData = {
	screen: RECOVERY_SCREENS.EMAIL,
};

export const useRecovery = create<State>()((set, get) => ({
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
}));
