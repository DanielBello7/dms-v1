import { Fragment, useCallback, useEffect, type ReactNode } from "react";
import { SOCKET_STATUS, useSocket } from "./use-socket";
import { useConversations, useMessages } from "@/stores";
import {
  CONVERSATION_SOCKET_EVENTS,
  type RECEIVE_NEW_CONVERSATION_FROM_SERVER_PARAMS,
  type RECEIVE_NEW_MESSAGE_FROM_SERVER_PARAMS,
} from "@repo/types";
import { api, toaster } from "@/lib";
import { ensure_error, truncate } from "@repo/helpers";

type Props = {
  children: ReactNode;
};

export const Listeners = (props: Props) => {
  const socket = useSocket((state) => state);
  const {
    insert_conversations,
    data: convo,
    update_conversations,
  } = useConversations((state) => state);
  const { insert_messages_tail } = useMessages((state) => state);
  const status = socket.data.status;
  const conn = socket.data.active;

  const onMsg = useCallback(
    async (data: RECEIVE_NEW_MESSAGE_FROM_SERVER_PARAMS) => {
      try {
        const response = await api.conversations.find_message_by_id(
          data.msg.id,
        );
        toaster.alert(
          `New Message: ${truncate(response.text, 10, "...")} - ${response.CreatedBy.display_name}`,
        );
        if (convo.active && convo.active.id === response.conversation_id) {
          insert_messages_tail([{ ...response, isSent: true }]);
        }
        const check = convo.conversations.find(
          (i) => i.id === data.msg.conversation_id,
        );
        if (check) {
          update_conversations([data.msg.conversation_id], {
            LastMsg: data.msg,
          });
        }
        if (check === undefined) {
          const conversation = await api.conversations.find_conversation_by_id(
            data.msg.conversation_id,
          );
          insert_conversations([conversation]);
        }
      } catch (e) {
        console.log("error", ensure_error(e));
      }
    },
    [insert_messages_tail, convo, update_conversations, insert_conversations],
  );

  const onCnv = useCallback(
    async (data: RECEIVE_NEW_CONVERSATION_FROM_SERVER_PARAMS) => {
      try {
        toaster.alert(
          `Added to Conversation: ${truncate(data.convo.name ? data.convo.name : "New Group", 10, "...")}`,
        );
        const response = await api.conversations.find_conversation_by_ref(
          data.convo.ref_id,
        );
        insert_conversations([response]);
        console.log("hi", data);
      } catch (e) {
        console.log("error", ensure_error(e));
      }
    },
    [insert_conversations],
  );

  useEffect(() => {
    if (status !== SOCKET_STATUS.CONNECTED) return;
    conn.on(CONVERSATION_SOCKET_EVENTS.RECEIVE_MESSAGE_FROM_SERVER, onMsg);
    conn.on(
      CONVERSATION_SOCKET_EVENTS.RECEIVE_NEW_CONVERSATION_ALERT_FROM_SERVER,
      onCnv,
    );

    return () => {
      conn.off(CONVERSATION_SOCKET_EVENTS.RECEIVE_MESSAGE_FROM_SERVER, onMsg);
      conn.off(
        CONVERSATION_SOCKET_EVENTS.RECEIVE_NEW_CONVERSATION_ALERT_FROM_SERVER,
        onCnv,
      );
    };
  }, [conn, status, onMsg, onCnv]);

  return <Fragment>{props.children}</Fragment>;
};
