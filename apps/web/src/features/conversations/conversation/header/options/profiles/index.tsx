import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui";
import { useLogic } from "./use-logic";
import { get_dp, get_user } from "@/lib";

type Props = {
  open: boolean;
  sets: (val: boolean) => void;
};
export const Profiles = (props: Props) => {
  const logic = useLogic();
  const user = get_user();
  return (
    <Dialog open={props.open} onOpenChange={props.sets}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profiles</DialogTitle>
          <DialogDescription>
            Current ongoing members of the conversation
          </DialogDescription>
        </DialogHeader>
        <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
          {logic.members.map((i) => (
            <Item variant="default" key={i.id} className="px-0">
              <ItemMedia>
                <Avatar className="size-10">
                  <AvatarImage src={get_dp(i.avatar).val} />
                  <AvatarFallback>
                    {i.firstname[0]} {i.surname[0]}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <div className="flex justify-between items-center">
                  <div>
                    <ItemTitle>{i.display_name}</ItemTitle>
                    <p className="text-xs text-slate-400 underline">
                      {i.email}
                    </p>
                  </div>
                  {user.email === i.email && (
                    <p className="text-blue-600">You</p>
                  )}
                </div>
                <ItemDescription className="text-xs text-blue-400">
                  {i.timezone.replaceAll("_", " ")}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
