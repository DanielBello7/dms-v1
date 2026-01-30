import { useHeader } from "@/components/dashboard/header/use-header-store";
import { useEffect } from "react";
import { useUser } from "@/stores";
import { UpdatePassword } from "./update-password";
import { SetPassword } from "./set-password";

export const Security = () => {
	const { set_title } = useHeader((state) => state);
	const { data } = useUser((state) => state);

	useEffect(() => {
		set_title("Security");
	}, [set_title]);

	return (
		<div className="h-full p-10 overflow-scroll">
			{data.user.has_password ? <UpdatePassword /> : <SetPassword />}
		</div>
	);
};
