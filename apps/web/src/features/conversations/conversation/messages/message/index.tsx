import type { AppMessage } from "@/stores";
import { Spinner } from "@/components/ui";
import { format } from "date-fns";
import { cn } from "@/lib";
import { useLogic } from "./use-logic";

type Props = {
  data: AppMessage;
  isGroup: boolean;
};

export const Message = (props: Props) => {
  const logic = useLogic(props.data);
  return (
    <div
      className={cn("w-full p-2 flex", {
        "justify-end": logic.isMe,
        "justify-start": !logic.isMe,
      })}
    >
      <div
        className={cn("w-10/12 flex flex-col gap-1", {
          "items-end": logic.isMe,
          "items-start": !logic.isMe,
        })}
      >
        <div
          className={cn(
            "flex items-center gap-2 p-2 rounded-2xl w-fit text-sm px-3",
            {
              "bg-blue-100/90 dark:bg-blue-600 text-black dark:text-white":
                logic.isMe,
              border: !logic.isMe,
            },
          )}
        >
          {props.data.text}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground w-fit">
          {format(props.data.created_at, "PP hh:mm a")}
        </div>
        {props.isGroup && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground w-fit">
            <p className="text-orange-700">
              {logic.isMe ? "You" : props.data.CreatedBy.display_name}
            </p>
          </div>
        )}
        {logic.error && (
          <div className="w-fit flex items-center gap-2 text-red-500 text-xs">
            {logic.error.message}
          </div>
        )}
        {logic.isLoading && <Spinner className="size-4" />}
      </div>
    </div>
  );
};
