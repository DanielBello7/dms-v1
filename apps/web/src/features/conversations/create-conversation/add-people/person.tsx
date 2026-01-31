import { ItemDescription, ItemMedia } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { get_dp } from "@/lib";
import type { IUserSerialized } from "@repo/types";
import { useNewConvo } from "../new-convo.store";

type Props = {
  data: IUserSerialized;
};
export const Person = (props: Props) => {
  const new_convo = useNewConvo((state) => state);
  const click = () => {
    new_convo.insert_members([props.data]);
  };
  return (
    <div
      onClick={click}
      className="h-full border rounded-sm p-5 space-y-3 flex flex-col items-center justify-start hover:bg-muted cursor-pointer transition-all duration-300"
    >
      <ItemMedia>
        <Avatar className="size-13">
          <AvatarImage src={get_dp(props.data.avatar).val} />
          <AvatarFallback>
            {props.data.firstname.charAt(0)} {props.data.surname.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <div className="flex flex-col items-center justify-center text-center">
        <p className="w-full min-w-0 break-words text-wrap text-center">
          {props.data.display_name}
        </p>
        <ItemDescription className="text-xs break-all text-wrap">
          {props.data.email}
        </ItemDescription>
      </div>
    </div>
  );
};
