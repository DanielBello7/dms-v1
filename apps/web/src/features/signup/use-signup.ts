import type { IUserSerialized } from "@repo/types";
import { create } from "zustand";

export enum SIGN_UP_SCREEN {
	CREATE_ACCOUNT = "CREATE-ACCOUNT",
	VERIFY_ACCOUNT = "VERIFY-ACCOUNT",
	SETUP_PASSWORD = "SETUP-PASSWORD",
	ONBOARDING_TOP = "ONBOARDING-TOP",
	ONBOARDING_END = "ONBOARDING-END",
}

type SignupData = {
	screen: SIGN_UP_SCREEN;
	email: string;
	display_name: string;
	user: IUserSerialized;
};

type State = {
	data: SignupData;
	set_data: (params: Partial<SignupData>) => void;
	reset: () => void;
};

const initial: SignupData = {
	screen: SIGN_UP_SCREEN.ONBOARDING_TOP,
	email: "",
	display_name: "",
	user: {} as IUserSerialized,
};

export const useSignup = create<State>()((set, get) => ({
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
