import type { IConversationPopulated } from "@repo/services";
import { useAsyncHandler } from "@/hooks";
import { useMessages, useUser, type AppMessage } from "@/stores";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	message: z.string().trim().min(1),
});

type MSG_SCHEMA = z.infer<typeof schema>;

export const useLogic = (body: IConversationPopulated) => {
	const handler = useAsyncHandler();
	const messages = useMessages((state) => state);
	const user = useUser((state) => state);
	const form = useForm<MSG_SCHEMA>({ defaultValues: { message: "" } });

	const submit: SubmitHandler<MSG_SCHEMA> = async (data) => {
		return handler.run(async () => {
			const parsed = schema.parse(data);
			const new_message: AppMessage = {
				id: "123",
				ref_id: "ABC",
				conversation_id: body.id,
				created_by: user.data.user.id,
				index: 0,
				isSent: false,
				media: [],
				text: parsed.message,
				read_by: [],
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: undefined,
				CreatedBy: user.data.user,
			};
			messages.insert_messages_tail([new_message]);
			form.reset();
		});
	};

	return {
		submit,
		messages,
		user,
		form,
		handler,
	};
};
