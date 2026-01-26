import { Spinner } from "@/components/ui";
import type { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	isLoading: boolean;
};

export const Loader = (props: Props) => {
	if (!props.isLoading) return props.children;
	return (
		<div className="w-full min-h-svh flex items-center justify-center">
			<Spinner />
		</div>
	);
};
