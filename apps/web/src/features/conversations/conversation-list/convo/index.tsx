import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import type { IConversationPopulated } from "@repo/services";
import { useConversations, useUser } from "@/stores";
import { get_dp } from "@/lib";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

type Props = {
	data: IConversationPopulated;
};

export const Convo = ({ data }: Props) => {
	const conversation = useConversations((state) => state);
	const user = useUser((state) => state.data.user);
	const params = useParams<{ id: string }>();

	const navigate = useNavigate();

	const click = () => {
		conversation.set_data({ active: data });
		navigate(`/dashboard/conversations/${data.ref_id}`);
	};
	return (
		<div
			className={cn(
				"w-full border-b cursor-pointer hover:bg-gray-200/50 transition-all duration-300",
				{
					"bg-gray-200/50": params && params.id === data.ref_id,
				}
			)}
			onClick={click}>
			<Item variant="default">
				<ItemContent>
					<ItemTitle className="line-clamp-1 truncate font-bold">
						{data.Participants.filter((i) => i.ref_id !== user.ref_id)
							.map((i) => i.display_name)
							.join(", ")}
					</ItemTitle>
					<ItemDescription className="line-clamp-1">
						{data.LastMsg
							? data.LastMsg.text
							: "No messages in this conversation yet"}
					</ItemDescription>
					<ItemFooter className="text-xs italic">
						{data.LastMsg
							? formatDistanceToNow(data.LastMsg.created_at, {
									addSuffix: true,
								})
							: `Started on ${format(data.created_at, "PPP")}`}
					</ItemFooter>
				</ItemContent>
				<ItemMedia>
					<div className="*:data-[slot=avatar]:ring-background flex -space-x-5 *:data-[slot=avatar]:ring-2">
						{data.Participants.filter((i) => i.ref_id !== user.ref_id).map(
							(i) => (
								<Avatar className="hidden sm:flex border" key={i.ref_id}>
									<AvatarImage
										src={get_dp(i.avatar).val}
										alt={i.display_name}
									/>
									<AvatarFallback>
										{i.firstname[0]}
										{i.surname[0]}
									</AvatarFallback>
								</Avatar>
							)
						)}
					</div>
				</ItemMedia>
			</Item>
		</div>
	);
};
