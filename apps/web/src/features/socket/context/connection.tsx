import {
  CONVERSATION_SOCKET_EVENTS,
  type SEND_MESSAGE_TO_SERVER_PARAMS,
  type SEND_NEW_CONVERSATION_TO_SERVER_PARAMS,
} from "@repo/types";
import { type ReactNode } from "react";
import { ConnectionContext } from "./connection-context";
import { SOCKET_STATUS, useSocket } from "../use-socket";
import type {
  CreateMessageDto,
  IConversationPopulated,
  IMessagePopulated,
  InsertConversationDto,
} from "@repo/services";

type Props = {
  children: ReactNode;
};

// prettier-ignore
export type ConnectionType = {
  emit_msg: (params: CreateMessageDto,timeout: number) => Promise<IMessagePopulated>;
  emit_con: (params: InsertConversationDto,timeout: number) => Promise<IConversationPopulated>;
};

export const ConnectionContextProvider = (props: Props) => {
  const socket = useSocket((state) => state);

  const emit_msg = (params: CreateMessageDto, timeout: number = 5000) =>
    new Promise<IMessagePopulated>((resolve, reject) => {
      if (socket.data.status !== SOCKET_STATUS.CONNECTED) {
        return reject(new Error("Not connected"));
      }

      const timer = setTimeout(
        () => reject(new Error("Socket ACK timeout")),
        timeout,
      );

      socket.data.active.emit(
        CONVERSATION_SOCKET_EVENTS.SEND_MESSAGE_TO_SERVER,
        { msg: params } satisfies SEND_MESSAGE_TO_SERVER_PARAMS,
        (ack: IMessagePopulated) => {
          clearTimeout(timer);
          resolve(ack);
        },
      );
    });

  const emit_con = (params: InsertConversationDto, timeout: number = 5000) =>
    new Promise<IConversationPopulated>((resolve, reject) => {
      if (socket.data.status !== SOCKET_STATUS.CONNECTED) {
        return reject(new Error("Not connected"));
      }

      const timer = setTimeout(
        () => reject(new Error("Socket ACK timeout")),
        timeout,
      );

      socket.data.active.emit(
        CONVERSATION_SOCKET_EVENTS.SEND_NEW_CONVERSATION_ALERT_TO_SERVER,
        { convo: params } satisfies SEND_NEW_CONVERSATION_TO_SERVER_PARAMS,
        (ack: IConversationPopulated) => {
          clearTimeout(timer);
          resolve(ack);
        },
      );
    });

  return (
    <ConnectionContext.Provider
      value={{
        emit_msg,
        emit_con,
      }}
    >
      {props.children}
    </ConnectionContext.Provider>
  );
};
