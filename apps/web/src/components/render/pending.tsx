import classnames from "classnames";
import * as Lucide from "lucide-react";

type Props = {
	type?: "1" | "2";
	size?: number;
	occupy?: boolean;
	space?: boolean;
};

export const Pending = (props: Props) => {
	const { size = 20, occupy = false, type = "2", space = true } = props;
	const Icon = Lucide[type === "1" ? "Loader" : "Loader2"];
	return (
		<div
			className={classnames("w-full flex items-center justify-center", {
				"h-full": occupy,
				"py-20": space,
			})}>
			<Icon className="animate-spin" size={size} />
		</div>
	);
};
