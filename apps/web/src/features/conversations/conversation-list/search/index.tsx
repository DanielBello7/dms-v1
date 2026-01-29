import { Button, Input } from "@/components/ui";
import { X } from "lucide-react";

type Props = {
	setSearch: (v: string) => void;
	value: string;
	hasSearch: boolean;
	reset: () => void;
};
export const Search = (props: Props) => {
	return (
		<div className="p-3">
			<div className="flex gap-1 border rounded-md">
				<Input
					className="border-0"
					value={props.value}
					placeholder="Search members"
					onChange={(e) => {
						const val = e.currentTarget.value;
						props.setSearch(val);
					}}
				/>
				{props.hasSearch && (
					<Button
						variant={"ghost"}
						className="cursor-pointer"
						onClick={props.reset}>
						<X />
					</Button>
				)}
			</div>
		</div>
	);
};
