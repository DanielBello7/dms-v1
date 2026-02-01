import { type Socket } from "socket.io-client";
import { create } from "zustand";

export enum SOCKET_STATUS {
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  PENDING = "PENDING",
}

type Active = Socket;

type SocketData = {
  status: SOCKET_STATUS;
  active: Active;
};

type State = {
  data: SocketData;
  set_data: (params: Partial<SocketData>) => void;
  reset: () => void;
};

const initial: SocketData = {
  status: SOCKET_STATUS.DISCONNECTED,
  active: {} as Active,
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
