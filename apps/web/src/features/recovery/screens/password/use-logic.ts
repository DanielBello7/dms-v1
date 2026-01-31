import { z } from "zod";
import { useRecovery } from "@/features/recovery/use-recovery";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAsyncHandler } from "@/hooks";
import { wait } from "@repo/helpers";
import { envs } from "@/config";
import { api, toaster } from "@/lib";
import { useNavigate } from "react-router";

const schema = z.object({
  new_password: z.string().nonempty(),
  confirm_pass: z.string().nonempty(),
});

type FORM_SCHEMA = z.infer<typeof schema>;

export const useLogic = () => {
  const recovery = useRecovery((state) => state);
  const form = useForm<FORM_SCHEMA>({
    defaultValues: {
      confirm_pass: "",
      new_password: "",
    },
  });
  const handler = useAsyncHandler();
  const navigate = useNavigate();

  const submit: SubmitHandler<FORM_SCHEMA> = async (data) => {
    return handler.run(async () => {
      const parsed = schema.parse(data);

      if (parsed.confirm_pass !== parsed.new_password) {
        throw new Error("password's don't match");
      }

      await wait(2000, envs.NODE_ENV);
      await api.auth.recover({
        email: recovery.data.email,
        otp: recovery.data.otp,
        password: parsed.confirm_pass,
      });
      toaster.success("Password successfuly changed");
      recovery.reset();
      form.reset();
      navigate("/signin");
    });
  };

  return {
    submit,
    handler,
    form,
    recovery,
  };
};
