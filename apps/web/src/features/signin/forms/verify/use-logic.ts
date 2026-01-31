import { useAsyncHandler } from "@/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSignin } from "@/features/signin/use-signin";
import { z } from "zod";
import { api, toaster } from "@/lib";
import { useAuth } from "@/stores";
import { useNavigate } from "react-router";

const schema = z.object({
	value: z.string().max(6).nonempty().trim(),
});

type FORM_SCHEMA = z.infer<typeof schema>;

export const useLogic = () => {
	const signin = useSignin((state) => state);
	const auth = useAuth((state) => state);
	const handler = useAsyncHandler();
	const navigate = useNavigate();
	const form = useForm<FORM_SCHEMA>();

	const skip = () => {};

	const submit: SubmitHandler<FORM_SCHEMA> = async (data) => {
		return handler.run(async () => {
			const parsed = schema.parse(data);
			const response = await api.signup.verify_user_email({
				email: signin.data.email,
				otp: parsed.value,
			});
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
		skip,
	};
};
