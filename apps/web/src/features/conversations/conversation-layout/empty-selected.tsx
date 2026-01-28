import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui";

export const EmptyConversation = () => {
	return (
		<div className="size-full flex items-center justify-center pb-32">
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="default">
						<Avatar className="size-12">
							<AvatarImage
								src="https://github.com/shadcn.png"
								className="grayscale"
							/>
							<AvatarFallback>LR</AvatarFallback>
						</Avatar>
					</EmptyMedia>
					<EmptyTitle>No Conversation Selected</EmptyTitle>
					<EmptyDescription>
						This user is currently offline. You can leave a message to notify
						them or try again later.
					</EmptyDescription>
				</EmptyHeader>
			</Empty>
		</div>
	);
};
