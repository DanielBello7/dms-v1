import { useAsyncHandler } from "@/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { SIGN_UP_SCREEN, useSignup } from "@/features/signup/use-signup";
import { api, gen_username, toaster } from "@/lib";
import { AccountType } from "@repo/types";
import { wait } from "@repo/helpers";
import { envs } from "@/config";

const schema = z.object({
	firstname: z.string().min(1).nonempty(),
	surname: z.string().min(1).nonempty(),
	email: z.email().nonempty(),
});

type SCHEMA_FORM = z.infer<typeof schema>;

export const useLogic = () => {
	const signup = useSignup((state) => state);
	const handler = useAsyncHandler();
	const form = useForm<SCHEMA_FORM>({
		defaultValues: {
			email: "",
			firstname: "",
			surname: "",
		},
	});

	const submit: SubmitHandler<SCHEMA_FORM> = async (data) => {
		return handler.run(async () => {
			const parsed = schema.parse(data);
			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

			await wait(2000, envs.NODE_ENV);
			const response = await api.signup.signup_user({
				email: parsed.email,
				timezone,
				type: AccountType.Client,
				firstname: parsed.firstname,
				password: undefined,
				surname: parsed.surname,
				username: gen_username(parsed.firstname, parsed.surname),
			});
			await api.signup.send_verify_otp({ email: response.email });
			signup.set_data({
				email: response.email,
				display_name: response.display_name,
				user: response,
				screen: SIGN_UP_SCREEN.VERIFY_ACCOUNT,
			});
			toaster.success("An OTP has been sent to your email");
		});
	};

	return {
		submit,
		form,
		signup,
		handler,
	};
};
