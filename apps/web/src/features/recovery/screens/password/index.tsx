import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Spinner,
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Link } from "react-router";
import { PasswordInput } from "@/components/app";
import { useLogic } from "./use-logic";

export const PasswordScreen = () => {
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
            <FieldLabel htmlFor="password" className="text-[#1e3a5f]">
              New Password
            </FieldLabel>
            <FieldDescription className="text-[#5c6b73]">
              Must be at least 8 characters long.
            </FieldDescription>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              className="border-[#1e3a5f]/20 focus-visible:ring-[#1e3a5f]"
              disabled={logic.handler.isLoading}
              {...logic.form.register("new_password")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm" className="text-[#1e3a5f]">
              Confirm Password
            </FieldLabel>
            <FieldDescription className="text-[#5c6b73]">
              Must be the same as new password.
            </FieldDescription>
            <PasswordInput
              id="confirm"
              placeholder="••••••••"
              className="border-[#1e3a5f]/20 focus-visible:ring-[#1e3a5f]"
              disabled={logic.handler.isLoading}
              {...logic.form.register("confirm_pass")}
            />
          </Field>
          <Field>
            <Button
              type="submit"
              className="bg-[#1e3a5f] text-white hover:bg-[#2a4a75]"
              disabled={logic.handler.isLoading}
            >
              {logic.handler.isLoading ? <Spinner /> : "Reset password"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};
