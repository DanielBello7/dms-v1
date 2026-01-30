import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd } from "lucide-react";
import {
	Field,
	FieldDescription,
	FieldLabel,
	FieldGroup,
	Spinner,
} from "@/components/ui";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui";
import { useLogic } from "./use-logic";
import { Resend } from "./resend";

export const Verify = () => {
	const logic = useLogic();
	return (
		<div className="flex flex-col gap-6">
			<form onSubmit={logic.form.handleSubmit(logic.submit)}>
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
						<h1 className="text-xl font-bold">Hi {logic.data.display_name}</h1>
						<p className="text-sm">
							We sent a 6-digit code to your email{" "}
							<span className="text-blue-400">({logic.data.email})</span>
						</p>
						<FieldDescription>
							Don&apos;t have an account? <a href="#">Sign up</a>
						</FieldDescription>
					</div>
					<Field>
						<div className="flex items-center justify-between">
							<FieldLabel htmlFor="otp-verification">
								Verification code
							</FieldLabel>
							<Resend />
						</div>
						<div className="w-full items-center flex justify-center">
							<InputOTP
								maxLength={6}
								id="otp-verification"
								required
								onChange={(e) => {
									logic.form.setValue("value", e);
								}}>
								<InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
								</InputOTPGroup>
								<InputOTPSeparator className="mx-2" />
								<InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						</div>
					</Field>
					<Field>
						<Button type="submit" disabled={logic.handler.isLoading}>
							{logic.handler.isLoading ? <Spinner /> : "Login"}
						</Button>
					</Field>
					<FieldDescription className="text-center">
						<a href="#">I no longer have access to this email address.</a>
					</FieldDescription>
				</FieldGroup>
			</form>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
};
