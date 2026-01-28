import { AddPeople } from "./add-people";
import { Members } from "./members";

export const CreateConversation = () => {
	return (
		<div className="w-full flex h-full flex-row">
			<div className="border w-6/12">
				<Members />
			</div>
			<div className="border w-6/12">
				<AddPeople />
			</div>
		</div>
	);
};
