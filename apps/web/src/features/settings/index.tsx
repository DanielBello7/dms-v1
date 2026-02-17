import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { useHeader } from "../dashboard/header/use-header-store";
import { useLogic } from "./use-logic";
import { Button, Spinner } from "@/components/ui";

export const Settings = () => {
  const { set_title } = useHeader((state) => state);
  const logic = useLogic();

  useEffect(() => {
    set_title("Settings");
  }, [set_title]);

  return (
    <div className="h-full p-10 overflow-scroll">
      <form
        className="w-1/2 m-auto"
        onSubmit={logic.form.handleSubmit(logic.submit)}
      >
        <FieldSet className="w-full">
          <FieldLegend className="font-bold">Appearance</FieldLegend>
          <FieldDescription>Customize how the app looks.</FieldDescription>
          <FieldGroup className="w-full max-w-sm">
            <FieldLabel htmlFor="switch-dark-mode">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Dark Mode</FieldTitle>
                  <FieldDescription>
                    Use a dark color scheme for the interface.
                  </FieldDescription>
                </FieldContent>
                <Switch
                  id="switch-dark-mode"
                  disabled={logic.handler.isLoading}
                  defaultChecked={logic.form.getValues().dark_mode}
                  onCheckedChange={(e) => logic.form.setValue("dark_mode", e)}
                />
              </Field>
            </FieldLabel>

            <Field className="border flex items-end justify-end">
              <Button
                type="submit"
                className="w-fit bg-blue-600"
                disabled={logic.handler.isLoading}
              >
                {logic.handler.isLoading ? <Spinner /> : "Save"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};
