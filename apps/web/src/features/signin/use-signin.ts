import { create } from "zustand";

export enum SIGN_IN_SCREEN {
	EMAIL = "EMAIL",
	PASSWORD = "PASSWORD",
	OTP = "OTP",
}

type SigninData = {
	screen: SIGN_IN_SCREEN;
};

type State = {
	data: SigninData;
	set_data: (params: Partial<SigninData>) => void;
	reset: () => void;
};

const initial: SigninData = {
	screen: SIGN_IN_SCREEN.OTP,
};

export const useSignin = create<State>()((set, get) => ({
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
