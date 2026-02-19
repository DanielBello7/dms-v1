import type { IConversationPopulated } from "@repo/services";
import { Options } from "./options";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/stores";
import { Button } from "@/components/ui";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

type Props = {
  data: IConversationPopulated;
};

export const Header = (props: Props) => {
  const user = useUser((state) => state.data.user);

  return (
    <div className="w-full p-[11px] flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link to={"/dashboard/conversations"}>
          <Button variant="ghost" className="cursor-pointer border w-2">
            <ChevronLeft className="size-5" />
          </Button>
        </Link>
        <div>
          <p className="truncate font-bold">
            {props.data.ongoing_participants.length > 2
              ? (props.data.name ?? "Group")
              : props.data.Participants.filter((i) => i.ref_id !== user.ref_id)
                  .map((i) => i.display_name)
                  .join(", ")}
          </p>
          <p className="text-xs text-muted-foreground italic">
            Created{" "}
            {formatDistanceToNow(props.data.created_at, {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      <div>
        <Options />
      </div>
    </div>
  );
};
