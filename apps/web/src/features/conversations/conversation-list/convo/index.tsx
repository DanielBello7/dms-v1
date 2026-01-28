import type { IConversation } from "@repo/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";

type Props = {
	data: IConversation;
	idx: number;
};

export const Convo = (props: Props) => {
	console.log(props.data.id);

	return (
		<div className="w-full border-b cursor-pointer hover:bg-gray-200/50 transition-all duration-300">
			<Item variant="default">
				<ItemContent>
					<ItemTitle>No Team Members</ItemTitle>
					<ItemDescription className="line-clamp-1">
						Invite your team to collaborate on this project.
					</ItemDescription>
					<ItemFooter className="text-xs">Yesterday</ItemFooter>
				</ItemContent>
				<ItemMedia>
					<div className="*:data-[slot=avatar]:ring-background flex -space-x-5 *:data-[slot=avatar]:ring-2">
						<Avatar className="hidden sm:flex">
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						{props.idx > 0 && (
							<>
								(
								<Avatar className="hidden sm:flex">
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
								)
							</>
						)}
					</div>
				</ItemMedia>
			</Item>
		</div>
	);
};
