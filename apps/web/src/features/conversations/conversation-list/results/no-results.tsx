import { Button } from "@/components/ui";
import { Trash } from "lucide-react";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui";

type Props = {
	reset: () => void;
};
export const NoResults = (props: Props) => {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Trash />
				</EmptyMedia>
				<EmptyTitle>No Results</EmptyTitle>
				<EmptyDescription>
					Upload files to your cloud storage to access them anywhere.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button variant="outline" size="sm" type="button" onClick={props.reset}>
					Clear
				</Button>
			</EmptyContent>
		</Empty>
	);
};
