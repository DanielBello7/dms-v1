import { Textarea, Button } from "@/components/ui";
import type { IConversationPopulated } from "@repo/services";
import { Send } from "lucide-react";
import { useLogic } from "./use-logic";

type Props = {
	data: IConversationPopulated;
};
export const Chatbox = (props: Props) => {
	const logic = useLogic(props.data);
	return (
		<div className="size-full overflow-hidden">
			<form
				className="size-full flex gap-2 items-center p-2"
				onSubmit={logic.form.handleSubmit(logic.submit)}>
				<Textarea
					id="feedback"
					placeholder="Type in something..."
					className="size-full resize-none border-0 shadow-none"
					disabled={logic.handler.isLoading}
					{...logic.form.register("message")}
				/>
				<Button className="cursor-pointer" variant={"ghost"}>
					<Send />
				</Button>
			</form>
		</div>
	);
};
