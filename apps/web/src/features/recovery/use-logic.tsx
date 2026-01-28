import { useMultiscreen } from "@/hooks";
import { useRecovery } from "./use-recovery";
import { EmailScreen, OtpScreen, PasswordScreen } from "./screens";
import { RECOVERY_SCREENS } from "./use-recovery";

export const useLogic = () => {
	const recovery = useRecovery((state) => state);
	const response = useMultiscreen(
		[
			{
				index: 1,
				name: RECOVERY_SCREENS.EMAIL,
				component: <EmailScreen />,
			},
			{
				index: 2,
				name: RECOVERY_SCREENS.OTP,
				component: <OtpScreen />,
			},
			{
				index: 3,
				name: RECOVERY_SCREENS.PASSWORD,
				component: <PasswordScreen />,
			},
		],
		recovery.data.screen
	);
	return {
		...response,
	};
};
