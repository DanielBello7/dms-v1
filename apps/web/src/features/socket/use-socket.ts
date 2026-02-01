import { create } from "zustand";

export enum SOCKET_STATUS {
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
}

type SocketData = {
  status: SOCKET_STATUS;
};

type State = {
  data: SocketData;
  set_data: (params: Partial<SocketData>) => void;
  reset: () => void;
};

const initial: SocketData = {
  status: SOCKET_STATUS.DISCONNECTED,
};

export const useSocket = create<State>()((set, get) => ({
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
