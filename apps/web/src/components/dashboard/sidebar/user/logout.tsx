import { Separator } from "@/components/ui";
import { useAsyncHandler } from "@/hooks";
import { signout } from "@/lib";
import { wait } from "@repo/helpers";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
} from "@/components/ui";
import { Loader2, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

export const Logout = () => {
	const handler = useAsyncHandler();
	const navigate = useNavigate();

	const logout = async () =>
		handler.run(async () => {
			await wait(3000);
			navigate("/signin");
			await wait(1000);
			signout();
		});

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<LogOut className="h-4 w-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="p-0 w-[350px]!">
				<div className="p-4">
					<AlertDialogHeader>
						<AlertDialogTitle>Logout?</AlertDialogTitle>
						<AlertDialogDescription>
							This will logout you from the application, any unsaved changes
							will be lost, are you sure you want to logout?
						</AlertDialogDescription>
					</AlertDialogHeader>
				</div>
				<AlertDialogFooter className="p-0 border-t gap-0">
					<AlertDialogCancel asChild>
						<Button
							className="w-1/2 cursor-pointer border-none rounded-none border-r rounded-l-md"
							variant="ghost">
							Cancel
						</Button>
					</AlertDialogCancel>
					<Separator orientation="vertical" className="h-full" />
					<Button
						className="w-1/2 cursor-pointer border-none rounded-none rounded-r-md bg-white text-destructive hover:bg-destructive/10 hover:text-destructive"
						variant="ghost"
						disabled={handler.isLoading}
						onClick={logout}>
						{handler.isLoading ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							"Logout"
						)}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
