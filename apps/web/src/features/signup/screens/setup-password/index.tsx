import { PasswordInput } from "@/components/app";
import { Button } from "@/components/ui";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";

export const SetupPassword = () => {
	return (
		<form className="flex flex-col gap-6">
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Set Password</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Fill in the form below to create your account
					</p>
				</div>
				<Field>
					<FieldLabel htmlFor="fieldgroup-name">Password</FieldLabel>
					<PasswordInput id="fieldgroup-name" placeholder="Jordan Lee" />
					<FieldDescription>
						Should be at least 8 characters for a strong password
					</FieldDescription>
				</Field>
				<Field>
					<FieldLabel htmlFor="fieldgroup-email">Confirm Password</FieldLabel>
					<PasswordInput id="fieldgroup-email" placeholder="name@example.com" />
					<FieldDescription>
						We&apos;ll send updates to this address.
					</FieldDescription>
				</Field>
				<Field>
					<Button type="submit">Submit</Button>
					<Button type="reset" variant="link">
						Skip
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
};
