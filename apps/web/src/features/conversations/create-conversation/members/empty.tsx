import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Bell } from "lucide-react";

export const EmptyMembers = () => {
  return (
    <Empty className="bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Bell />
        </EmptyMedia>
        <EmptyTitle>No Members</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          No one has been added to this chat yet. Search for people in the panel
          on the right
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
