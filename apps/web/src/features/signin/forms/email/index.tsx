import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogic } from "./use-logic";
import { Link } from "react-router";
import { Logo } from "@/components/logo";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	Spinner,
} from "@/components/ui";

export const EmailForm = () => {
	const logic = useLogic();
	return (
		<div className="flex flex-col gap-6 px-5">
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
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							{...logic.form.register("email")}
						/>
					</Field>
					<Field>
						<Button
							type="submit"
							className="cursor-pointer"
							disabled={logic.handler.isLoading}>
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
