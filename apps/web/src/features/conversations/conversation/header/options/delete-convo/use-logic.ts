import { useAsyncHandler } from "@/hooks";
import { api, toaster } from "@/lib";
import { useUser, useConversations } from "@/stores";
import { useNavigate, useParams } from "react-router";

export const useLogic = (close: () => void) => {
  const user = useUser((state) => state);
  const handler = useAsyncHandler();
  const param = useParams<{ id: string }>();
  const conversations = useConversations((state) => state);
  const navigate = useNavigate();

  const action = () => {
    return handler.run(async () => {
      const search = conversations.data.conversations.find(
        (a) => a.ref_id === param.id,
      );
      if (!search) return toaster.error("Cannot find conversation");
      if (search.created_by !== user.data.user.id) {
        throw new Error("Cannot delete conversation");
      }
      await api.conversations.delete_conversation(search.ref_id);
      conversations.remove_conversations([search.ref_id]);
      conversations.set_data({ active: null });
      close();
      navigate("/dashboard/conversations");
    });
  };

  return {
    action,
    user,
    handler,
    id: param,
    conversations,
  };
};
