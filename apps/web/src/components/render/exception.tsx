import { ensure_error } from "@repo/helpers";
import { AlertCircle } from "lucide-react";

type Props = {
	occupy?: boolean;
	error: unknown;
	retry?: () => void;
};

export const Exception = (props: Props) => {
	const error = ensure_error(props.error ?? new Error("unknown error"));

	const click = () => {
		if (props.retry) {
			props.retry();
		}
	};

	return (
		<div className="w-full flex flex-col items-center justify-center py-20">
			<p className="flex items-center space-x-1 font-extrabold">
				<AlertCircle size={15} />
				<span className="tracking-tighter text-3xl">error occured</span>
			</p>
			<p className="mb-2 text-center">
				{error.name}, {error.message}
			</p>
			{props.retry && (
				<p onClick={click} className="text-sm text-blue-500">
					Retry
				</p>
			)}
		</div>
	);
};
