import { PasswordInput } from "@/components/app";
import { Button, Spinner } from "@/components/ui";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { useLogic } from "./use-logic";

export const SetupPassword = () => {
	const logic = useLogic();
	return (
		<form
			className="flex flex-col gap-6"
			onSubmit={logic.form.handleSubmit(logic.submit)}>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Set Password</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Add a password for your account
					</p>
				</div>
				<Field>
					<FieldLabel htmlFor="password">Password</FieldLabel>
					<PasswordInput
						id="password"
						placeholder="************"
						disabled={logic.handler.isLoading}
						{...logic.form.register("new_password")}
					/>
					<FieldDescription>
						Should be at least 8 characters for a strong password
					</FieldDescription>
				</Field>
				<Field>
					<FieldLabel htmlFor="confirm">Confirm Password</FieldLabel>
					<PasswordInput
						id="confirm"
						placeholder="*************"
						disabled={logic.handler.isLoading}
						{...logic.form.register("confirm_pass")}
					/>
					<FieldDescription>Confirm your password</FieldDescription>
				</Field>
				<Field>
					<Button type="submit" disabled={logic.handler.isLoading}>
						{logic.handler.isLoading ? <Spinner /> : "Submit"}
					</Button>
					<Button
						type="button"
						variant="link"
						onClick={logic.skip}
						disabled={logic.handler.isLoading}>
						Skip
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
};
