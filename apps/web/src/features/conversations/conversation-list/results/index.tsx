import type { IConversationPopulated } from "@repo/services";
import { Separator } from "@/components/ui";
import { Convo } from "../convo";
import { NoResults } from "./no-results";

type Props = {
	data: IConversationPopulated[];
	clear: () => void;
};
export const Results = (props: Props) => {
	return (
		<div className="w-full">
			<div className="w-full space-y-3 py-4">
				<p className="px-3 text-muted-foreground text-sm">Results</p>
				<Separator />
			</div>
			{props.data.length > 0 &&
				props.data.map((i) => <Convo data={i} key={i.id} />)}
			{props.data.length < 1 && <NoResults reset={props.clear} />}
		</div>
	);
};
