import { useAuth, useConversations, useMessages, useUser } from "@/stores";

const auth = useAuth.getState();
const conversations = useConversations.getState();
const messages = useMessages.getState();
const user = useUser.getState();

export const signout = () => {
	conversations.reset();
	messages.reset();
	user.reset();
	auth.reset();
};
