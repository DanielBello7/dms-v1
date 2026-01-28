import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

export const Person = () => {
	return (
		<Item
			variant="outline"
			className="bg-red-100/50 flex items-center justify-center hover:bg-gray-200 hover:scale-[1.03] cursor-pointer transition-all duration-300">
			<ItemMedia>
				<Avatar className="size-13">
					<AvatarImage src="https://github.com/evilrabbit.png" />
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
			</ItemMedia>
			<ItemContent className="text-center flex items-center justify-center">
				<ItemTitle className="text-center">Evil Rabbit</ItemTitle>
				<ItemDescription className="text-xs">
					Last seen 5 months ago
				</ItemDescription>
			</ItemContent>
		</Item>
	);
};
