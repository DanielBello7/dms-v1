import { Input, Spinner } from "@/components/ui";
import { Button } from "@/components/ui";
import { useLogic } from "./use-logic";
import { Link } from "react-router";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui";
import { Logo } from "@/components/logo";

export const CreateAccount = () => {
  const logic = useLogic();
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={logic.form.handleSubmit(logic.submit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <Logo />
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Sign Up</h1>
          <p className="text-sm text-balance text-[#5c6b73]">
            Fill in the form below to create your account
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="name" className="text-[#1e3a5f]">
              First Name
            </FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John"
              required
              className="border-[#1e3a5f]/20 focus-visible:ring-[#1e3a5f]"
              {...logic.form.register("firstname")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="name" className="text-[#1e3a5f]">
              Surname
            </FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Doe"
              required
              className="border-[#1e3a5f]/20 focus-visible:ring-[#1e3a5f]"
              {...logic.form.register("surname")}
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="email" className="text-[#1e3a5f]">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="border-[#1e3a5f]/20 focus-visible:ring-[#1e3a5f]"
            {...logic.form.register("email")}
          />
          <FieldDescription className="text-[#5c6b73]">
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <Button
            type="submit"
            className="bg-[#1e3a5f] text-white hover:bg-[#2a4a75]"
            disabled={logic.handler.isLoading}
          >
            {logic.handler.isLoading ? <Spinner /> : "Create Account"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center text-[#5c6b73]">
            Already have an account?{" "}
            <Link to="/signin" className="text-[#1e3a5f] hover:underline">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};
