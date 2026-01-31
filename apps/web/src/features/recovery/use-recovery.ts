import { create } from "zustand";

export enum RECOVERY_SCREENS {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  OTP = "OTP",
}

type RecoveryData = {
  screen: RECOVERY_SCREENS;
  email: string;
  otp: string;
};

type State = {
  data: RecoveryData;
  set_data: (params: Partial<RecoveryData>) => void;
  reset: () => void;
};

const initial: RecoveryData = {
  screen: RECOVERY_SCREENS.EMAIL,
  email: "",
  otp: "",
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
