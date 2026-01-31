import { useAsyncHandler } from "@/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { SIGN_IN_SCREEN, useSignin } from "@/features/signin/use-signin";
import { z } from "zod";
import { api, toaster } from "@/lib";
import { useAuth } from "@/stores";
import { useNavigate } from "react-router";
import { SIGN_UP_SCREEN, useSignup } from "@/features/signup/use-signup";

const schema = z.object({
	value: z.string().max(6).nonempty().trim(),
});

type FORM_SCHEMA = z.infer<typeof schema>;

export const useLogic = () => {
	const signin = useSignin((state) => state);
	const signup = useSignup((state) => state);
	const auth = useAuth((state) => state);
	const handler = useAsyncHandler();
	const navigate = useNavigate();
	const form = useForm<FORM_SCHEMA>();

	const submit: SubmitHandler<FORM_SCHEMA> = async (data) => {
		return handler.run(async () => {
			const parsed = schema.parse(data);
			const response = await api.auth.signin_otp({
				email: signin.data.email,
				otp: parsed.value,
			});
			if (!response.user.is_email_verified) {
				await api.signup.send_verify_otp({ email: signin.data.email });
				return signin.set_data({
					auth: response,
					screen: SIGN_IN_SCREEN.VERIFY,
				});
			}

			const settings = await api.users.get_user_settings(response.user.ref_id);
			if (!settings.is_onboarded) {
				signup.set_data({
					auth: response,
					display_name: response.user.display_name,
					email: response.user.email,
					screen: SIGN_UP_SCREEN.ONBOARDING_TOP,
					user: response.user,
				});
				return navigate("/signup");
			}

			auth.set_data({
				expires: response.expires,
				jwt: response.token,
				refresh: response.refresh,
				user: response.user,
			});
			signin.reset();
			toaster.success("Login Successful");
			navigate("/dashboard");
		});
	};

	return {
		handler,
		form,
		submit,
		data: signin.data,
	};
};
