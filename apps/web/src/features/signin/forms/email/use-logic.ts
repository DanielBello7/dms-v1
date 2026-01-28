import { useAsyncHandler } from "@/hooks";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { SIGN_IN_SCREEN, useSignin } from "@/features/signin/use-signin";
import { api, toaster } from "@/lib";

const email_schema = z.object({
	email: z.email().nonempty().trim(),
});

type EmailSchema = z.infer<typeof email_schema>;

export const useLogic = () => {
	const signin = useSignin((state) => state);
	const handler = useAsyncHandler();
	const form = useForm<EmailSchema>();

	const submit: SubmitHandler<EmailSchema> = async (data) =>
		handler.run(async () => {
			const parsed = email_schema.parse(data);
			const response = await api.auth.signin_verify(parsed);
			if (response.type === "OTP") {
				toaster.alert("An OTP has been sent to your email");
				return signin.set_data({
					display_name: response.display_name,
					email: parsed.email,
					screen: SIGN_IN_SCREEN.OTP,
				});
			}
			if (response.type === "PASSWORD") {
				return signin.set_data({
					display_name: response.display_name,
					email: parsed.email,
					screen: SIGN_IN_SCREEN.PASSWORD,
				});
			}
			throw new Error("Error with communications from the back");
		});

	return {
		handler,
		form,
		submit,
	};
};
