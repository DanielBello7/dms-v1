import { Input, Spinner } from "@/components/ui";
import { Button } from "@/components/ui";
import { useLogic } from "./use-logic";
import { Link } from "react-router";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui";

export const CreateAccount = () => {
	const logic = useLogic();
	return (
		<form
			className="flex flex-col gap-6"
			onSubmit={logic.form.handleSubmit(logic.submit)}>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Sign Up</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Fill in the form below to create your account
					</p>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<Field>
						<FieldLabel htmlFor="name">First Name</FieldLabel>
						<Input
							id="name"
							type="text"
							placeholder="John"
							required
							{...logic.form.register("firstname")}
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="name">Surname</FieldLabel>
						<Input
							id="name"
							type="text"
							placeholder="Doe"
							required
							{...logic.form.register("surname")}
						/>
					</Field>
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
					<FieldDescription>
						We&apos;ll use this to contact you. We will not share your email
						with anyone else.
					</FieldDescription>
				</Field>
				<Field>
					<Button type="submit" disabled={logic.handler.isLoading}>
						{logic.handler.isLoading ? <Spinner /> : "Create Account"}
					</Button>
				</Field>
				<Field>
					<FieldDescription className="px-6 text-center">
						Already have an account? <Link to={"/signin"}>Sign in</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
};
