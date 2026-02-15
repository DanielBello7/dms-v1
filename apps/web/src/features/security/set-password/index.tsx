import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Spinner,
} from "@/components/ui";
import { useLogic } from "./use-logic";
import { PasswordInput } from "@/components/app";

export const SetPassword = () => {
  const logic = useLogic();
  return (
    <form
      className="w-1/2 m-auto"
      onSubmit={logic.form.handleSubmit(logic.submit)}
    >
      <div>
        <h2 className="font-bold">Set Password</h2>
        <p className="text-muted-foreground text-xs">
          Set a password for your account
        </p>
      </div>
      <br />
      <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">New Password</FieldLabel>
            <PasswordInput
              id="username"
              placeholder="******"
              disabled={logic.handler.isLoading}
              {...logic.form.register("new_password")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              disabled={logic.handler.isLoading}
              {...logic.form.register("confirm_password")}
            />
          </Field>
          <Field>
            <Button
              disabled={logic.handler.isLoading}
              type="submit"
              className="cursor-pointer bg-blue-400"
            >
              {logic.handler.isLoading ? <Spinner /> : "Submit"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
