import { envs } from "@/config";
import { useAuth, useUser } from "@/stores";
import { Fragment, useEffect, type ReactNode } from "react";
import { io } from "socket.io-client";

type Props = {
  children: ReactNode;
};
export const Socket = (props: Props) => {
  const user = useUser((state) => state);
  const auth = useAuth((state) => state);
  const socket = io(envs.API_ADDRESS, {
    reconnectionDelayMax: 10000,
    auth: { token: auth.data.jwt, email: user.data.user.email },
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("message", (args) => {
      console.log("listened", args);
    });

    return () => {
      socket.off();
    };
  }, [socket]);
  return <Fragment>{props.children}</Fragment>;
};
