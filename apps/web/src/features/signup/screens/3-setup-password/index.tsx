import { PasswordInput } from "@/components/app";
import { Button, Spinner } from "@/components/ui";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useLogic } from "./use-logic";
import { Logo } from "@/components/logo";

export const SetupPassword = () => {
  const logic = useLogic();
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={logic.form.handleSubmit(logic.submit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <Logo />
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Set Password</h1>
          <p className="text-sm text-balance text-[#5c6b73]">
            Add a password for your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="password" className="text-[#1e3a5f]">
            Password
          </FieldLabel>
          <PasswordInput
            id="password"
            placeholder="************"
            disabled={logic.handler.isLoading}
            className="border-[#1e3a5f]/20 focus-visible:ring-[#1e3a5f]"
            {...logic.form.register("new_password")}
          />
          <FieldDescription className="text-[#5c6b73]">
            Should be at least 8 characters for a strong password
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm" className="text-[#1e3a5f]">
            Confirm Password
          </FieldLabel>
          <PasswordInput
            id="confirm"
            placeholder="*************"
            disabled={logic.handler.isLoading}
            className="border-[#1e3a5f]/20 focus-visible:ring-[#1e3a5f]"
            {...logic.form.register("confirm_pass")}
          />
          <FieldDescription className="text-[#5c6b73]">
            Confirm your password
          </FieldDescription>
        </Field>
        <Field>
          <Button
            type="submit"
            className="bg-[#1e3a5f] text-white hover:bg-[#2a4a75]"
            disabled={logic.handler.isLoading}
          >
            {logic.handler.isLoading ? <Spinner /> : "Submit"}
          </Button>
          <Button
            type="button"
            variant="link"
            className="text-[#1e3a5f] hover:underline"
            onClick={logic.skip}
            disabled={logic.handler.isLoading}
          >
            Skip
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
