import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useHeader } from "@/components/dashboard/header/use-header-store";
import { useEffect } from "react";
import { Button, Spinner } from "@/components/ui";
import { ProfileAvatar } from "./avatar";
import { useLogic } from "./use-logic";

export const Profile = () => {
	const { set_title } = useHeader((state) => state);
	const logic = useLogic();

	useEffect(() => {
		set_title("Profile");
	}, [set_title]);

	return (
		<div className="h-full p-10 overflow-scroll">
			<form
				className="w-1/2 m-auto"
				onSubmit={logic.form.handleSubmit(logic.submit)}>
				<FieldSet className="w-full">
					<FieldLegend className="font-bold">Profile Information</FieldLegend>
					<FieldDescription>
						We need your address to deliver your order.
					</FieldDescription>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="street">Email</FieldLabel>
							<Input
								id="street"
								type="text"
								placeholder="123 Main St"
								disabled={true}
								value={logic.user.email}
							/>
						</Field>
						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="city">Firstname</FieldLabel>
								<Input
									id="city"
									type="text"
									placeholder="Joe"
									{...logic.form.register("firstname")}
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="zip">Lastname</FieldLabel>
								<Input
									id="zip"
									type="text"
									placeholder="Surname"
									{...logic.form.register("surname")}
								/>
							</Field>
						</div>
						<div className="w-full space-y-3">
							<FieldLabel>Avatar</FieldLabel>
							<FieldDescription>
								We need your address to deliver your order.
							</FieldDescription>
							<ProfileAvatar
								current={logic.values.avatar}
								setCurrent={(e) => logic.form.setValue("avatar", e)}
							/>
						</div>
						<Field className="border flex items-end justify-end">
							<Button
								type="submit"
								className="w-fit bg-blue-600"
								disabled={logic.handler.isLoading}>
								{logic.handler.isLoading ? <Spinner /> : "Save"}
							</Button>
						</Field>
					</FieldGroup>
				</FieldSet>
			</form>
		</div>
	);
};
