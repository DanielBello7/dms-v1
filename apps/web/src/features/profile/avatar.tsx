import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui";
import { cn } from "@/lib";
import { avatars } from "@/config";

type Props = {
	current: string | undefined;
	setCurrent: (val: string) => void;
};
export const ProfileAvatar = (props: Props) => {
	return (
		<div className="w-full grid grid-cols-5 gap-3">
			{avatars.map((i, idx) => (
				<Avatar
					className={cn("size-full cursor-pointer", {
						"border-8 border-red-500": i.key === props.current,
					})}
					key={idx}
					onClick={() => props.setCurrent(i.key)}>
					<AvatarImage src={i.val} alt={i.key} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			))}
		</div>
	);
};
