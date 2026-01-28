import { useEffect, type ReactNode } from "react";
import { useOutlet } from "react-router";
import { EmptyConversation } from "./empty-selected";
import { ConversationList } from "../conversation-list";
import { useHeader } from "@/components/dashboard/header/use-header-store";

type Props = {
	children?: ReactNode;
};

export const ConversationLayout = (props: Props) => {
	const set_title = useHeader((state) => state.set_title);
	const outlet = useOutlet();
	const hasOutlet = outlet !== null;

	useEffect(() => {
		set_title("Conversations");
	}, [set_title]);
	return (
		<div className="flex size-full overflow-hidden">
			<div className="w-5/12 border-r-1">
				<ConversationList />
			</div>
			<div className="w-7/12">
				{!hasOutlet ? <EmptyConversation /> : props.children}
			</div>
		</div>
	);
};
