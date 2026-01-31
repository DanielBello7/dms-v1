import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup, Spinner } from "@/components/ui";
import { useLogic } from "./use-logic";
import { Resend } from "./resend";
import { Logo } from "@/components/logo";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui";

export const Verify = () => {
  const logic = useLogic();
  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={logic.form.handleSubmit(logic.submit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Logo />
            <h1 className="text-xl font-bold text-[#1e3a5f]">
              Hi {logic.data.display_name.trim() ?? "there"}
            </h1>
            <p className="text-sm text-[#5c6b73]">
              We sent a 6-digit code to your email{" "}
              <span className="text-[#1e3a5f]">({logic.data.email})</span>
            </p>
          </div>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification" className="text-[#1e3a5f]">
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
              {logic.handler.isLoading ? <Spinner /> : "Verify"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="text-[#1e3a5f] hover:underline"
              disabled={logic.handler.isLoading}
              onClick={logic.skip}
            >
              Skip
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};
