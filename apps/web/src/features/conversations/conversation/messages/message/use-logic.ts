/** USING WEB-SOCKETS */
import { envs } from "@/config";
import { useUser, type AppMessage } from "@/stores";
import { ensure_error, wait } from "@repo/helpers";
import { useCallback, useEffect, useState } from "react";
import { useMessages } from "@/stores";
import { useConnection } from "@/features/socket/context/use-connection";

export const useLogic = (data: AppMessage) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { update_messages, data: msg } = useMessages((state) => state);
  const { emit_msg } = useConnection();
  const user = useUser((state) => state);
  const isMe = data.created_by === user.data.user.id;

  const cleanup = () => {
    setIsLoading(false);
    setError(null);
  };

  const scroll_to_end = () => {
    const element = document.getElementById("msgs-box");
    if (element) element.scrollTo({ top: element.scrollHeight + 300 });
  };

  const deliver = useCallback(async () => {
    cleanup();
    setIsLoading(true);

    try {
      await wait(3000, envs.NODE_ENV);
      const results = await emit_msg(
        {
          conversation_id: data.conversation_id,
          created_by: data.created_by,
          media: data.media,
          read_by: data.read_by,
          text: data.text,
        },
        5000,
      );
      msg.delivered.add(results.id);
      msg.delivered.delete(data.id);
      update_messages([data.id], { ...results, isSent: true });
      scroll_to_end();
    } catch (error) {
      setError(ensure_error(error));
    } finally {
      setIsLoading(false);
    }
  }, [data, update_messages, msg.delivered, emit_msg]);

  useEffect(() => {
    if (data.isSent) return;
    if (msg.delivered.has(data.id)) return;
    msg.delivered.add(data.id);
    deliver();
  }, [deliver, data.id, data.isSent, msg.delivered]);

  return {
    deliver,
    isLoading,
    error,
    isMe,
  };
};

/** USING HTTP-API */
// import { envs } from "@/config";
// import { useUser, type AppMessage } from "@/stores";
// import { ensure_error, wait } from "@repo/helpers";
// import { useCallback, useEffect, useState } from "react";
// import { useMessages } from "@/stores";
// import { api } from "@/lib";

// export const useLogic = (data: AppMessage) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const { update_messages, data: msg } = useMessages((state) => state);
//   const user = useUser((state) => state);
//   const isMe = data.created_by === user.data.user.id;

//   const cleanup = () => {
//     setIsLoading(false);
//     setError(null);
//   };

//   const scroll_to_end = () => {
//     const element = document.getElementById("msgs-box");
//     if (element) element.scrollTo({ top: element.scrollHeight + 300 });
//   };

//   const deliver = useCallback(async () => {
//     cleanup();
//     setIsLoading(true);

//     try {
//       await wait(3000, envs.NODE_ENV);
//       const results = await api.conversations.insert_message({
//         conversation_id: data.conversation_id,
//         created_by: data.created_by,
//         media: data.media,
//         read_by: data.read_by,
//         text: data.text,
//       });
//       msg.delivered.add(results.id);
//       msg.delivered.delete(data.id);
//       update_messages([data.id], { ...results, isSent: true });
//       scroll_to_end();
//     } catch (error) {
//       setError(ensure_error(error));
//     } finally {
//       setIsLoading(false);
//     }
//   }, [data, update_messages, msg.delivered]);

//   useEffect(() => {
//     if (data.isSent) return;
//     if (msg.delivered.has(data.id)) return;
//     msg.delivered.add(data.id);
//     deliver();
//   }, [deliver, data.id, data.isSent, msg.delivered]);

//   return {
//     deliver,
//     isLoading,
//     error,
//     isMe,
//   };
// };
