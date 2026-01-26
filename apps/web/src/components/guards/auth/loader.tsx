import { Spinner } from "@/components/ui";

export const Loader = () => {
	return (
		<div className="w-full min-h-full flex items-center justify-center">
			<Spinner />
		</div>
	);
};
