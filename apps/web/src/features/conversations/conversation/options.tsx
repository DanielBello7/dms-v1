import { Button } from "@/components/ui";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui";
import {
	CreditCardIcon,
	Ellipsis,
	LogOutIcon,
	SettingsIcon,
	UserIcon,
} from "lucide-react";

export const Options = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>
					<UserIcon />
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem>
					<CreditCardIcon />
					Billing
				</DropdownMenuItem>
				<DropdownMenuItem>
					<SettingsIcon />
					Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<LogOutIcon />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
