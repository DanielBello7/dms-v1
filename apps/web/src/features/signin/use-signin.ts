import { create } from "zustand";

export enum SIGN_IN_SCREEN {
	EMAIL = "EMAIL",
	PASSWORD = "PASSWORD",
	OTP = "OTP",
	VERIFY = "VERIFY",
}

type SigninData = {
	screen: SIGN_IN_SCREEN;
	email: string;
	display_name: string;
};

type State = {
	data: SigninData;
	set_data: (params: Partial<SigninData>) => void;
	reset: () => void;
};

const initial: SigninData = {
	screen: SIGN_IN_SCREEN.EMAIL,
	email: "",
	display_name: "",
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
