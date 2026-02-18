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

export const UpdatePassword = () => {
  const logic = useLogic();

  return (
    <form
      className="w-full lg:w-1/2 m-auto"
      onSubmit={logic.form.handleSubmit(logic.submit)}
    >
      <div>
        <h2 className="font-bold">Update Password</h2>
        <p className="text-muted-foreground text-xs">
          Change the password to your account
        </p>
      </div>
      <br />
      <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="old-password">Current Password</FieldLabel>
            <PasswordInput
              id="old-password"
              placeholder="******"
              disabled={logic.handler.isLoading}
              {...logic.form.register("old_password")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="new-password">New Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <PasswordInput
              id="new-password"
              placeholder="••••••••"
              disabled={logic.handler.isLoading}
              {...logic.form.register("new_password")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <PasswordInput
              id="confirm-password"
              placeholder="••••••••"
              disabled={logic.handler.isLoading}
              {...logic.form.register("confirm_password")}
            />
          </Field>
          <Field>
            <Button
              disabled={logic.handler.isLoading}
              type="submit"
              className="cursor-pointer bg-blue-600 dark:text-white"
            >
              {logic.handler.isLoading ? <Spinner /> : "Submit"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
