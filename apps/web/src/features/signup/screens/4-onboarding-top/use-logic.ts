import { useSignup, SIGN_UP_SCREEN } from "@/features/signup/use-signup";

export const useLogic = () => {
	const { data, set_data } = useSignup((state) => state);

	const finish = () => {
		set_data({
			screen: SIGN_UP_SCREEN.ONBOARDING_END,
		});
	};

	return {
		finish,
		data,
	};
};
