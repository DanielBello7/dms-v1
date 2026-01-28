import { useAsyncHandler } from "@/hooks";
import { useAuth } from "@/stores";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSignin } from "@/features/signin/use-signin";
import { z } from "zod";
import { api, toaster } from "@/lib";

const schema = z.object({
	password: z.string().min(1).nonempty(),
});

type FORM_SCHEMA = z.infer<typeof schema>;

export const useLogic = () => {
	const signin = useSignin((state) => state);
	const auth = useAuth((state) => state);
	const handler = useAsyncHandler();
	const navigate = useNavigate();
	const form = useForm<FORM_SCHEMA>();

	const submit: SubmitHandler<FORM_SCHEMA> = async (data) =>
		handler.run(async () => {
			const parsed = schema.parse(data);
			const response = await api.auth.sign_in_password({
				password: parsed.password,
				username: signin.data.email,
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

	return {
		form,
		submit,
		handler,
	};
};
