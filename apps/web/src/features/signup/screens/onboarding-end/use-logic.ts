import { useAsyncHandler } from "@/hooks";
import { useNavigate } from "react-router";
import { useSignup } from "@/features/signup/use-signup";
import { useState } from "react";
import { api, toaster } from "@/lib";
import { useAuth } from "@/stores";

export const useLogic = () => {
	const [selected, setSelected] = useState<string | null>(null);
	const { reset, data } = useSignup((state) => state);
	const auth = useAuth((state) => state);
	const handler = useAsyncHandler();
	const navigate = useNavigate();

	const complete = async () => {
		await api.users.update_user_settings(data.user.ref_id, {
			is_onboarded: true,
		});
		if (data.auth) {
			auth.set_data({
				expires: data.auth.expires,
				jwt: data.auth.token,
				refresh: data.auth.refresh,
				user: data.auth.user,
			});
			navigate("/dashboard", {
				replace: true,
			});
			reset(); // reset signup
		} else {
			navigate("/signin", {
				replace: true,
			});
			reset();
		}
	};

	const submit = () =>
		handler.run(async () => {
			if (!selected) throw new Error("Avatar required");
			await api.signup.set_user_avatar({
				user_id: data.user.id,
				value: selected,
			});
			toaster.success("Avatar set successfully");
			complete();
		});

	const skip = () => {
		return handler.run(async () => {
			await complete();
			toaster.success("User logged in successfully");
		});
	};

	return {
		handler,
		submit,
		selected,
		setSelected,
		skip,
	};
};
