import { useAsyncHandler } from "@/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSignin } from "@/features/signin/use-signin";
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

	const complete = async () => {
		if (!signin.data.auth) {
			return toaster.error("An error has occured, try again later");
		}
		const response = signin.data.auth;
		const result = await api.users.get_user_settings(response.user.ref_id);
		if (!result.is_onboarded) {
			return signup.set_data({
				auth: response,
				display_name: response.user.display_name,
				email: response.user.email,
				screen: SIGN_UP_SCREEN.ONBOARDING_TOP,
				user: response.user,
			});
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
	};

	const submit: SubmitHandler<FORM_SCHEMA> = async (data) => {
		return handler.run(async () => {
			const parsed = schema.parse(data);
			await api.signup.verify_user_email_safe({
				email: signin.data.email,
				otp: parsed.value,
			});
			await complete();
		});
	};

	return {
		handler,
		form,
		submit,
		data: signin.data,
		skip: complete,
	};
};
