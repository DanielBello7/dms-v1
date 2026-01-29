import { Render } from "@/components/render";
import { Header } from "./header";
import { useLogic } from "./use-logic";
import { Chatbox } from "./chatbox";
import { Messages } from "./messages";

type Props = {
	id: string;
};
export const Conversation = (props: Props) => {
	const logic = useLogic(props.id);
	return (
		<Render
			data={logic.data}
			isError={logic.isError}
			error={logic.error}
			isLoading={logic.isFetching}
			render={(doc) => {
				return (
					<div className="overflow-hidden flex flex-col size-full">
						<div>
							<Header data={doc} />
						</div>
						<div className="h-full border-t border-b overflow-hidden px-1">
							<Messages data={doc} />
						</div>
						<div className="h-[120px] overflow-hidden">
							<Chatbox data={doc} />
						</div>
					</div>
				);
			}}
		/>
	);
};
