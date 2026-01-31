import { useAsyncHandler } from "@/hooks";
import { api, toaster } from "@/lib";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  RECOVERY_SCREENS,
  useRecovery,
} from "@/features/recovery/use-recovery";
import { wait } from "@repo/helpers";
import { envs } from "@/config";

const schema = z.object({
  email: z.email().nonempty(),
});

type SCHEMA_FORM = z.infer<typeof schema>;

export const useLogic = () => {
  const recovery = useRecovery((state) => state);
  const handler = useAsyncHandler();
  const form = useForm<SCHEMA_FORM>({
    defaultValues: {
      email: "",
    },
  });

  const submit: SubmitHandler<SCHEMA_FORM> = async (data) => {
    return handler.run(async () => {
      const parsed = schema.parse(data);
      await wait(2000, envs.NODE_ENV);
      await api.auth.recovery_verify(parsed);
      toaster.alert("OTP sent to the email");
      recovery.set_data({
        screen: RECOVERY_SCREENS.OTP,
        email: parsed.email,
      });
    });
  };

  return {
    submit,
    form,
    handler,
    recovery,
  };
};
