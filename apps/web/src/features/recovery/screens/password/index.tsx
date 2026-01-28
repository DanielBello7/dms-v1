import { GalleryVerticalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui";

export const PasswordScreen = () => {
	return (
		<div className="flex flex-col gap-6">
			<form>
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<a
							href="#"
							className="flex flex-col items-center gap-2 font-medium">
							<div className="flex size-8 items-center justify-center rounded-md">
								<GalleryVerticalEnd className="size-6" />
							</div>
							<span className="sr-only">Acme Inc.</span>
						</a>
						<h1 className="text-xl font-bold">Recover Account</h1>
						<FieldDescription>
							Don&apos;t have an account? <a href="#">Sign up</a>
						</FieldDescription>
					</div>
					<Field>
						<FieldLabel htmlFor="password">New Password</FieldLabel>
						<FieldDescription>
							Must be at least 8 characters long.
						</FieldDescription>
						<Input id="password" type="password" placeholder="••••••••" />
					</Field>
					<Field>
						<FieldLabel htmlFor="password">Confirm Password</FieldLabel>
						<FieldDescription>
							Must be the same as new password
						</FieldDescription>
						<Input id="password" type="password" placeholder="••••••••" />
					</Field>
					<Field>
						<Button type="submit">Login</Button>
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
