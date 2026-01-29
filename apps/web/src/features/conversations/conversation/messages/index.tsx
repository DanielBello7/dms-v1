import type { IConversationPopulated } from "@repo/services";
import { Fragment } from "react";
import { Message } from "./message";
import { useLogic } from "./use-logic";
import { Render } from "@/components/render";

type Props = {
	data: IConversationPopulated;
};

export const Messages = (props: Props) => {
	const logic = useLogic(props.data);
	return (
		<div className="flex h-full flex-col overflow-scroll">
			<Render
				isLoading={logic.isLoading}
				data={logic.messages}
				error={logic.error}
				isError={logic.isError}
				empty={
					<div className="w-full h-full flex items-center justify-center">
						No messages
					</div>
				}
				render={(messages) => {
					return (
						<Fragment>
							{messages.map((m) => (
								<Message key={m.id} data={m} />
							))}
						</Fragment>
					);
				}}
			/>
		</div>
	);
};
