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
					You&apos;re all caught up. New notifications will appear here.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
};
