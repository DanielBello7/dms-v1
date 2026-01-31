import { useAsyncHandler } from "@/hooks";
import { api, toaster } from "@/lib";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { SIGN_UP_SCREEN, useSignup } from "@/features/signup/use-signup";
import { wait } from "@repo/helpers";
import { envs } from "@/config";

const schema = z.object({
	new_password: z.string().nonempty(),
	confirm_pass: z.string().nonempty(),
});

type FORM_SCHEMA = z.infer<typeof schema>;

export const useLogic = () => {
	const handler = useAsyncHandler();
	const signup = useSignup();
	const form = useForm<FORM_SCHEMA>({
		defaultValues: {
			confirm_pass: "",
			new_password: "",
		},
	});

	const submit: SubmitHandler<FORM_SCHEMA> = async (data) => {
		return handler.run(async () => {
			const parsed = schema.parse(data);
			if (parsed.confirm_pass !== parsed.new_password) {
				throw new Error("Password's don't match");
			}
			await wait(2000, envs.NODE_ENV);
			await api.users.set_password({
				new_password: parsed.confirm_pass,
				user_ref: signup.data.user.ref_id,
			});
			toaster.success("Password set successfully");
			skip(); // continues instead
		});
	};

	const skip = () => {
		signup.set_data({ screen: SIGN_UP_SCREEN.ONBOARDING_TOP });
	};

	return {
		skip,
		submit,
		handler,
		form,
		signup,
	};
};
