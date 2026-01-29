import { Button } from "@/components/ui";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui";
import { Ellipsis, LogOutIcon, Trash2, UsersIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { Profiles } from "./profiles";
import { DeleteConvo } from "./delete-convo";
import { LeaveConvo } from "./leave";

export const Options = () => {
	const [profiles, setProfiles] = useState(false);
	const [leave, setLeave] = useState(false);
	const [deleteConvo, setDeleteConvo] = useState(false);
	return (
		<Fragment>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost">
						<Ellipsis />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem
						onClick={() => {
							setProfiles(true);
						}}>
						<UsersIcon />
						Profiles
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							setLeave(true);
						}}>
						<LogOutIcon />
						Leave
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						variant="destructive"
						onClick={() => {
							setDeleteConvo(true);
						}}>
						<Trash2 />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Profiles open={profiles} sets={setProfiles} />
			<DeleteConvo open={deleteConvo} sets={setDeleteConvo} />
			<LeaveConvo open={leave} sets={setLeave} />
		</Fragment>
	);
};
