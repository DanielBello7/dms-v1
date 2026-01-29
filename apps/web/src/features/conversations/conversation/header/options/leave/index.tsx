import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
	Spinner,
} from "@/components/ui";
import { useLogic } from "./use-logic";

type Props = {
	open: boolean;
	sets: (val: boolean) => void;
};
export const LeaveConvo = (props: Props) => {
	const logic = useLogic(() => props.sets(false));
	return (
		<AlertDialog open={props.open} onOpenChange={props.sets}>
			<AlertDialogContent size="sm" className="p-0">
				<AlertDialogHeader className="p-5">
					<AlertDialogTitle>Leave Chat?</AlertDialogTitle>
					<AlertDialogDescription>
						Do you want to leave this conversation? you would have to be
						manually invited if you choose to rejoin again?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="border-t gap-0">
					<AlertDialogCancel
						className="border-0 rounded-t-none rounded-e-none cursor-pointer"
						disabled={logic.handler.isLoading}>
						Cancel
					</AlertDialogCancel>
					<Button
						className="border-0 rounded-t-none rounded-l-none cursor-pointer"
						disabled={logic.handler.isLoading}
						onClick={logic.action}>
						{logic.handler.isLoading ? <Spinner /> : "Leave"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
