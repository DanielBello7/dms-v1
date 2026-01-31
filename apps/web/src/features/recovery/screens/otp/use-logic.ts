import { useAsyncHandler } from "@/hooks";
import {
  RECOVERY_SCREENS,
  useRecovery,
} from "@/features/recovery/use-recovery";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { api } from "@/lib";
import { wait } from "@repo/helpers";
import { envs } from "@/config";

const schema = z.object({
  value: z.string().min(6),
});

type FORM_SCHEMA = z.infer<typeof schema>;

export const useLogic = () => {
  const recovery = useRecovery((state) => state);
  const handler = useAsyncHandler();
  const form = useForm<FORM_SCHEMA>();

  const submit: SubmitHandler<FORM_SCHEMA> = async (data) => {
    return handler.run(async () => {
      const parsed = schema.parse(data);
      await wait(2000, envs.NODE_ENV);
      await api.auth.recovery_validate_otp({
        email: recovery.data.email,
        otp: parsed.value,
      });
      recovery.set_data({
        otp: parsed.value,
        screen: RECOVERY_SCREENS.PASSWORD,
      });
    });
  };
  return {
    recovery,
    handler,
    form,
    submit,
  };
};
