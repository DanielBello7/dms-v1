/* eslint-disable react-hooks/exhaustive-deps */
import { envs } from "@/config";
import { useAuth, useUser } from "@/stores";
import { Fragment, useEffect, type ReactNode } from "react";
import { Manager, Socket as SK } from "socket.io-client";
import { SOCKET_STATUS, useSocket } from "./use-socket";
import { ensure_error } from "@repo/helpers";
import { toaster } from "@/lib";

type Props = {
  children: ReactNode;
};
export const Socket = (props: Props) => {
  const socket = useSocket((state) => state);
  const user = useUser((state) => state);
  const auth = useAuth((state) => state);

  // create the manager
  const manager = new Manager(envs.API_ADDRESS, {
    autoConnect: false,
    reconnectionDelayMax: 10000,
  });

  // create the connection to the namespace
  const conn = manager.socket("/", {
    auth: {
      token: auth.data.jwt,
      email: user.data.user.email,
    },
  });

  conn.io.on("open", () => {
    console.log("opened");
    socket.set_data({
      status: SOCKET_STATUS.CONNECTED,
      active: conn,
    });
  });

  conn.io.on("error", (error: unknown) => {
    const err = ensure_error(error);
    toaster.error(err.message);
  });

  conn.on("connect_error", (error) => {
    if (conn.active) return;
    else {
      const err = ensure_error(error);
      toaster.error(`Server refused connection: ${err.message}`);
      socket.set_data({ status: SOCKET_STATUS.DISCONNECTED });
    }
  });

  conn.on("disconnect", (reason, details) => {
    console.log("disconnected");
    socket.set_data({ status: SOCKET_STATUS.DISCONNECTED });
    toaster.alert(`Disconnected from server: ${reason}, ${details}`);
  });

  conn.on("connect", () => {
    console.log("connected");
    socket.set_data({
      status: SOCKET_STATUS.CONNECTED,
      active: conn,
    });
  });

  conn.io.on("open", () => {
    socket.set_data({
      status: SOCKET_STATUS.CONNECTED,
      active: conn,
    });
  });

  conn.io.on("reconnect_attempt", () => {
    socket.set_data({ status: SOCKET_STATUS.PENDING });
  });

  conn.io.on("close", () => {
    socket.set_data({
      status: SOCKET_STATUS.DISCONNECTED,
      active: {} as SK,
    });
  });

  useEffect(() => {
    conn.open(); // connect
    return () => {
      conn.off(); // remove all listeners
      conn.disconnect(); // disconnect from server
    };
  }, [conn.open, conn.off]);

  return <Fragment>{props.children}</Fragment>;
};
