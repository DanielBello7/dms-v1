import { envs } from "@/config";
import { useAsyncHandler } from "@/hooks";
import { api, toaster } from "@/lib";
import { useUser } from "@/stores";
import { wait } from "@repo/helpers";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	new_password: z.string().min(1),
	old_password: z.string().min(1),
	confirm_password: z.string().min(1),
});

type FORM_SCHEMA = z.infer<typeof schema>;

export const useLogic = () => {
	const handler = useAsyncHandler();
	const form = useForm<FORM_SCHEMA>({
		defaultValues: {
			new_password: "",
			old_password: "",
			confirm_password: "",
		},
	});
	const user = useUser((state) => state);

	const submit: SubmitHandler<FORM_SCHEMA> = async (data) =>
		handler.run(async () => {
			const parsed = schema.parse(data);
			if (parsed.new_password === parsed.confirm_password) {
				throw new Error("new password cannot be the same as old password");
			}
			if (parsed.new_password !== parsed.confirm_password) {
				throw new Error("Password's don't match");
			}
			await wait(2000, envs.NODE_ENV);
			await api.users.update_password(user.data.user.ref_id, {
				new_password: parsed.new_password,
				old_password: parsed.old_password,
			});
			toaster.success("Password changed");
			form.reset();
		});

	return {
		submit,
		form,
		schema,
		handler,
		user,
	};
};
