import { useLogic } from "./use-logic";

export const SignUp = () => {
	const logic = useLogic();
	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="w-full max-w-sm">{logic.screen.component}</div>
		</div>
	);
};
