import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui";
import type { IUserSerialized } from "@repo/types";
import { get_dp } from "@/lib";
import { Trash2 } from "lucide-react";
import { useNewConvo } from "../new-convo.store";

type Props = {
  data: IUserSerialized;
  disabled: boolean;
};
export const Member = (props: Props) => {
  const new_convo = useNewConvo((state) => state);
  const remove_member = () => {
    new_convo.remove_members([props.data.ref_id]);
  };
  return (
    <Item key={props.data.email} variant="outline" className="flex-nowrap">
      <ItemMedia>
        <Avatar>
          <AvatarImage
            src={get_dp(props.data.avatar).val}
            className="grayscale"
          />
          <AvatarFallback>
            {props.data.firstname.charAt(0)} {props.data.surname.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>

      <ItemContent className="min-w-0 shrink gap-1 overflow-hidden">
        <ItemTitle className="break-words line-clamp-2">
          {props.data.display_name}
        </ItemTitle>
        <ItemDescription className="truncate text-xs">
          {props.data.email}
        </ItemDescription>
      </ItemContent>

      <ItemActions className="shrink-0">
        <Button
          onClick={remove_member}
          variant="ghost"
          size="icon"
          disabled={props.disabled}
          className="rounded-full cursor-pointer"
        >
          <Trash2 />
        </Button>
      </ItemActions>
    </Item>
  );
};
