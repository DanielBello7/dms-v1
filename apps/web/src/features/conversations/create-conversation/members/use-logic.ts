import { useAsyncHandler } from "@/hooks";
import { useNewConvo } from "../new-convo.store";
import { api } from "@/lib";
import { useConversations, useUser } from "@/stores";
import { useNavigate } from "react-router";
import { wait } from "@repo/helpers";
import { envs } from "@/config";

export const useLogic = () => {
  const new_convo = useNewConvo((state) => state);
  const handler = useAsyncHandler();
  const members = new_convo.data.members;
  const user = useUser((state) => state);
  const convo = useConversations((state) => state);
  const navigate = useNavigate();

  const submit = () => {
    return handler.run(async () => {
      if (members.length < 1) {
        throw new Error("Add at least one member to start a chat");
      }
      await wait(2000, envs.NODE_ENV);
      const response = await api.conversations.insert_conversation({
        created_by: user.data.user.ref_id,
        last_message_id: undefined,
        members: members.map((m) => m.ref_id),
      });
      const get_convo = await api.conversations.find_conversation_by_ref(
        response.ref_id,
      );
      convo.insert_conversations([get_convo]);
      new_convo.reset();
      navigate(`/dashboard/conversations/${get_convo.ref_id}`);
    });
  };

  return {
    submit,
    handler,
    new_convo,
    members,
  };
};
