import { useSignin } from "@/features/signin/use-signin";
import { useSignup } from "@/features/signup/use-signup";
import { useAuth, useConversations, useMessages, useUser } from "@/stores";

const auth = useAuth.getState();
const conversations = useConversations.getState();
const messages = useMessages.getState();
const user = useUser.getState();
const signup = useSignup.getState();
const signin = useSignin.getState();

export const signout = () => {
	conversations.reset();
	messages.reset();
	user.reset();
	auth.reset();
	signup.reset();
	signin.reset();
};
