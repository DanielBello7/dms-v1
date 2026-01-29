import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	Button,
	Spinner,
} from "@/components/ui";
import { Trash2Icon } from "lucide-react";
import { useLogic } from "./use-logic";

type Props = {
	open: boolean;
	sets: (val: boolean) => void;
};
export const DeleteConvo = (props: Props) => {
	const logic = useLogic(() => props.sets(false));
	return (
		<AlertDialog open={props.open} onOpenChange={props.sets}>
			<AlertDialogContent size="sm" className="p-0">
				<AlertDialogHeader className="p-5">
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						<Trash2Icon />
					</AlertDialogMedia>
					<AlertDialogTitle>Delete chat?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete this chat conversation. View{" "}
						<a href="#">Settings</a> delete any memories saved during this chat.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="border-t gap-0">
					<AlertDialogCancel
						disabled={logic.handler.isLoading}
						variant="ghost"
						className="cursor-pointer rounded-e-none rounded-t-none">
						Cancel
					</AlertDialogCancel>
					<Button
						variant="destructive"
						disabled={logic.handler.isLoading}
						className="border-0 rounded-l-none rounded-t-none cursor-pointer"
						onClick={logic.action}>
						{logic.handler.isLoading ? <Spinner /> : "Delete"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
