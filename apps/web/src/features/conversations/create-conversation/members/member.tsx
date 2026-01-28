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
import { Trash2 } from "lucide-react";

type Props = {
	data: {
		username: string;
		avatar: string;
		email: string;
	};
};
export const Member = (props: Props) => {
	return (
		<Item key={props.data.email} variant="outline" className="bg-blue-50">
			<ItemMedia>
				<Avatar>
					<AvatarImage src={props.data.avatar} className="grayscale" />
					<AvatarFallback>{props.data.username.charAt(0)}</AvatarFallback>
				</Avatar>
			</ItemMedia>
			<ItemContent className="gap-1">
				<ItemTitle>{props.data.username}</ItemTitle>
				<ItemDescription>{props.data.email}</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button
					variant="ghost"
					size="icon"
					className="rounded-full cursor-pointer">
					<Trash2 />
				</Button>
			</ItemActions>
		</Item>
	);
};
