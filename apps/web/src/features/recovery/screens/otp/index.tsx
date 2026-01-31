import { useLogic } from "./use-logic";
import { Resend } from "./resend";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Link } from "react-router";
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

export const OtpScreen = () => {
  const logic = useLogic();
  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={logic.form.handleSubmit(logic.submit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Logo />
            <h1 className="text-xl font-bold text-[#1e3a5f]">
              Recover Account
            </h1>
            <FieldDescription className="text-[#5c6b73]">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-[#1e3a5f] hover:underline">
                Sign up
              </Link>
            </FieldDescription>
          </div>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification" className="text-[#1e3a5f]">
                Verification code
              </FieldLabel>
              <Resend />
            </div>
            <div className="flex w-full items-center justify-center">
              <InputOTP
                maxLength={6}
                id="otp-verification"
                required
                disabled={logic.handler.isLoading}
                onChange={(e) => {
                  logic.form.setValue("value", e);
                }}
              >
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
            <Button
              type="submit"
              className="bg-[#1e3a5f] text-white hover:bg-[#2a4a75]"
              disabled={logic.handler.isLoading}
            >
              {logic.handler.isLoading ? <Spinner /> : "Continue"}
            </Button>
          </Field>
          <FieldDescription className="text-center text-[#5c6b73]">
            <Link to="/signin" className="text-[#1e3a5f] hover:underline">
              I no longer have access to this email address.
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center text-[#5c6b73]">
        By clicking continue, you agree to our{" "}
        <Link to="/legal" className="text-[#1e3a5f] hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/legal" className="text-[#1e3a5f] hover:underline">
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
};
