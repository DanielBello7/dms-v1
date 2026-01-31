import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	Spinner,
} from "@/components/ui";
import { useLogic } from "./use-logic";
import { Logo } from "@/components/logo";
import { PasswordInput } from "@/components/app";
import { Link } from "react-router";

export const PasswordForm = () => {
	const logic = useLogic();
	return (
		<div className="flex flex-col gap-6">
			<form onSubmit={logic.form.handleSubmit(logic.submit)}>
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<Logo />
						<h1 className="text-xl font-bold">Welcome to DMs</h1>
						<FieldDescription>
							Don&apos;t have an account? <Link to="/signup">Sign up</Link>
						</FieldDescription>
					</div>
					<Field>
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<FieldDescription>
							Must be at least 8 characters long.
						</FieldDescription>
						<PasswordInput
							id="password"
							placeholder="••••••••"
							disabled={logic.handler.isLoading}
							{...logic.form.register("password")}
						/>
					</Field>
					<Field>
						<Button type="submit" disabled={logic.handler.isLoading}>
							{logic.handler.isLoading ? <Spinner /> : "Continue"}
						</Button>
					</Field>
				</FieldGroup>
			</form>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
};
