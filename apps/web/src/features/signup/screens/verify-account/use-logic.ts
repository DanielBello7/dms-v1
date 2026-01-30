import { useAsyncHandler } from "@/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { api, toaster } from "@/lib";
import { useSignup } from "@/features/signup/use-signup";

const schema = z.object({
	value: z.string().max(6).nonempty().trim(),
});

type FORM_SCHEMA = z.infer<typeof schema>;

export const useLogic = () => {
	const signup = useSignup((state) => state);
	const handler = useAsyncHandler();
	const form = useForm<FORM_SCHEMA>();

	const submit: SubmitHandler<FORM_SCHEMA> = async (data) => {
		return handler.run(async () => {
			const parsed = schema.parse(data);
			await api.signup.verify_user_email({
				email: signup.data.email,
				otp: parsed.value,
			});
			signup.reset();
			toaster.success("Email Verified Successfully");
		});
	};

	return {
		handler,
		form,
		submit,
		data: signup.data,
	};
};
