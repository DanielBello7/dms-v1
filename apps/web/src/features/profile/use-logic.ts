import { useAsyncHandler } from "@/hooks";
import { api, toaster } from "@/lib";
import { useUser } from "@/stores";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	firstname: z.string().nonempty(),
	surname: z.string().nonempty(),
	avatar: z.string().optional(),
});

type FORM_SCHEMA_TYPE = z.infer<typeof schema>;

export const useLogic = () => {
	const handler = useAsyncHandler();
	const user = useUser((state) => state);
	const prev = user.data.user;

	const form = useForm<FORM_SCHEMA_TYPE>({
		defaultValues: {
			avatar: prev.avatar,
			firstname: prev.firstname,
			surname: prev.surname,
		},
	});

	const values = useWatch({
		control: form.control,
	}) as FORM_SCHEMA_TYPE;

	const submit: SubmitHandler<FORM_SCHEMA_TYPE> = async (data) =>
		handler.run(async () => {
			const parsed = schema.parse(data);
			const response = await api.users.update_user(prev.ref_id, {
				...parsed,
			});
			user.update_user({
				avatar: response.avatar,
				surname: response.surname,
				firstname: response.firstname,
			});
			toaster.success("User profile updated successfully");
		});

	return {
		submit,
		values,
		form,
		handler,
		user: prev,
	};
};
