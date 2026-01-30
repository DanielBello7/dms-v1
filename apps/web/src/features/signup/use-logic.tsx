import { useMultiscreen } from "@/hooks";
import { SIGN_UP_SCREEN } from "./use-signup";
import { useSignup } from "./use-signup";
import {
	CreateAccount,
	OnboardingEnd,
	OnboardingTop,
	SetupPassword,
	VerifyAccount,
} from "./screens";

export const useLogic = () => {
	const signup = useSignup((state) => state);
	const response = useMultiscreen(
		[
			{
				index: 1,
				name: SIGN_UP_SCREEN.CREATE_ACCOUNT,
				component: <CreateAccount />,
			},
			{
				index: 2,
				name: SIGN_UP_SCREEN.VERIFY_ACCOUNT,
				component: <VerifyAccount />,
			},
			{
				index: 3,
				name: SIGN_UP_SCREEN.SETUP_PASSWORD,
				component: <SetupPassword />,
			},
			{
				index: 4,
				name: SIGN_UP_SCREEN.ONBOARDING_TOP,
				component: <OnboardingTop />,
			},
			{
				index: 5,
				name: SIGN_UP_SCREEN.ONBOARDING_END,
				component: <OnboardingEnd />,
			},
		],
		signup.data.screen
	);
	return {
		...response,
	};
};
