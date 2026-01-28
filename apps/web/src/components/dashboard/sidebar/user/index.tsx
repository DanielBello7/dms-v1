import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Logout } from "./logout";
import { useUser } from "@/stores";
import { get_dp } from "@/lib";

export const NavUser = () => {
	const user = useUser((state) => state.data.user);
	return (
		<div className="flex items-center gap-2 justify-between">
			<div className="flex items-center gap-2">
				<Avatar className="h-8 w-8 border border-gray-200">
					<AvatarImage src={get_dp(user.avatar).val} alt={user.display_name} />
					<AvatarFallback className="rounded-lg">
						{user.firstname.charAt(0)}
					</AvatarFallback>
				</Avatar>
				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-medium">{user.display_name}</span>
					<span className="text-muted-foreground truncate text-xs">
						{user.timezone.replaceAll("_", " ")}
					</span>
				</div>
			</div>
			<div>
				<Logout />
			</div>
		</div>
	);
};
