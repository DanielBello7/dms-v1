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
            <h1 className="text-xl font-bold text-[#1e3a5f]">Welcome to DMs</h1>
            <FieldDescription className="text-[#5c6b73]">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-[#1e3a5f] hover:underline">
                Sign up
              </Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="password" className="text-[#1e3a5f]">
              Password
            </FieldLabel>
            <PasswordInput
              id="password"
              autoComplete="off"
              placeholder="••••••••"
              disabled={logic.handler.isLoading}
              className="border-[#1e3a5f]/20 focus-visible:ring-[#1e3a5f]"
              {...logic.form.register("password")}
            />
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
