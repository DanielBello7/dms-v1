import { Button } from "@/components/ui";
import { useAsyncHandler } from "@/hooks";
import { api, toaster } from "@/lib";
import { RefreshCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSignup } from "@/features/signup/use-signup";

const COOLDOWN_SECONDS = 30;

export const Resend = () => {
	const signup = useSignup((state) => state);
	const handler = useAsyncHandler();

	const [timeLeft, setTimeLeft] = useState(COOLDOWN_SECONDS);

	const resend = async () => {
		return handler.run(async () => {
			await api.signup.send_verify_otp({
				email: signup.data.email,
			});

			toaster.alert("An OTP has been sent to your email");
			setTimeLeft(COOLDOWN_SECONDS);
		});
	};

	useEffect(() => {
		if (timeLeft <= 0) return;

		const interval = setInterval(() => {
			setTimeLeft((t) => t - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timeLeft]);

	const isDisabled = handler.isLoading || timeLeft > 0;

	return (
		<Button
			variant="outline"
			size="xs"
			type="button"
			onClick={resend}
			disabled={isDisabled}>
			<RefreshCwIcon className={handler.isLoading ? "animate-spin" : ""} />
			{timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend Code"}
		</Button>
	);
};
