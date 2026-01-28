import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export function EmptyConversations() {
	return (
		<Empty className="border h-full items-center justify-center">
			<EmptyHeader>
				<EmptyMedia>
					<div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage
								src="https://github.com/maxleiter.png"
								alt="@maxleiter"
							/>
							<AvatarFallback>LR</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage
								src="https://github.com/evilrabbit.png"
								alt="@evilrabbit"
							/>
							<AvatarFallback>ER</AvatarFallback>
						</Avatar>
					</div>
				</EmptyMedia>
				<EmptyTitle>No Conversations</EmptyTitle>
				<EmptyDescription>
					Invite your friends to collaborate on this project.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Link to={"/dashboard/conversations/create"}>
					<Button size="sm" type="button" className="cursor-pointer">
						<PlusIcon />
						New Conversation
					</Button>
				</Link>
			</EmptyContent>
		</Empty>
	);
}
