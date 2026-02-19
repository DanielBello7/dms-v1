import { useEffect, type ReactNode } from "react";
import { useOutlet } from "react-router";
import { EmptyConversation } from "./empty-selected";
import { ConversationList } from "../conversation-list";
import { useHeader } from "@/features/dashboard/header/use-header-store";
import { cn } from "@/lib";

type Props = {
  children?: ReactNode;
};

export const ConversationLayout = (props: Props) => {
  const set_title = useHeader((state) => state.set_title);
  const outlet = useOutlet();
  const hasOutlet = outlet !== null;

  useEffect(() => {
    set_title("Conversations");
  }, [set_title]);
  return (
    <div className="flex size-full overflow-hidden">
      <div
        className={cn("", {
          "hidden border-0": hasOutlet === true ? true : false,
          "w-full lg:w-5/12 lg:border-r-1 lg:block": true,
        })}
      >
        <ConversationList />
      </div>
      <div
        className={cn("", {
          "hidden border-0": hasOutlet === true ? false : true,
          "w-full lg:w-7/12": true,
        })}
      >
        {!hasOutlet ? <EmptyConversation /> : props.children}
      </div>
    </div>
  );
};

// w-5/12 border-r-1
// w-7/12
