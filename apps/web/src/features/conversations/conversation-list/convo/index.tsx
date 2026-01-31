import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IConversationPopulated } from "@repo/services";
import { useConversations, useUser } from "@/stores";
import { get_dp } from "@/lib";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

type Props = {
  data: IConversationPopulated;
};

export const Convo = ({ data }: Props) => {
  const conversation = useConversations((state) => state);
  const user = useUser((state) => state.data.user);
  const params = useParams<{ id: string }>();

  const navigate = useNavigate();

  const click = () => {
    conversation.set_data({ active: data });
    navigate(`/dashboard/conversations/${data.ref_id}`);
  };
  return (
    <div
      className={cn(
        "w-full border-b cursor-pointer hover:bg-gray-200/50 transition-all duration-300",
        {
          "bg-gray-200/50": params && params.id === data.ref_id,
        },
      )}
      onClick={click}
    >
      <div className="border-b flex items-start justify-between p-4.5">
        <div className="w-9/12">
          <div className="line-clamp-1 truncate font-bold text-sm">
            {data.Participants.filter((i) => i.ref_id !== user.ref_id)
              .map((i) => i.display_name)
              .join(", ")}
          </div>
          <div className="line-clamp-1 text-muted-foreground text-sm">
            {data.LastMsg
              ? data.LastMsg.text
              : "No messages in this conversation yet"}
          </div>
          <div className="text-xs italic text-muted-foreground">
            {data.LastMsg
              ? formatDistanceToNow(data.LastMsg.created_at, {
                  addSuffix: true,
                })
              : `Started on ${format(data.created_at, "PPP")}`}
          </div>
        </div>

        <div className="w-2/12 flex justify-end">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-5 *:data-[slot=avatar]:ring-2">
            {data.Participants.filter((i) => i.ref_id !== user.ref_id)
              .slice(0, 3)
              .map((i) => (
                <Avatar className="hidden sm:flex border" key={i.ref_id}>
                  <AvatarImage
                    src={get_dp(i.avatar).val}
                    alt={i.display_name}
                  />
                  <AvatarFallback>
                    {i.firstname[0]}
                    {i.surname[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
