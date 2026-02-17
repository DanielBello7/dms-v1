import { useAsyncHandler } from "@/hooks";
import { api, get_user, get_user_settings, toaster } from "@/lib";
import { useUser } from "@/stores";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  dark_mode: z.boolean(),
});

type SCHEMA_FORM = z.infer<typeof schema>;

export const useLogic = () => {
  const handler = useAsyncHandler();
  const settings = get_user_settings();
  const user = get_user();
  const set_settings = useUser((state) => state.update_settings);
  const form = useForm<SCHEMA_FORM>({
    defaultValues: {
      dark_mode: settings.dark_mode,
    },
  });

  const submit: SubmitHandler<SCHEMA_FORM> = (data) => {
    return handler.run(async () => {
      const parsed = schema.parse(data);
      const response = await api.users.update_user_settings(user.ref_id, {
        ...parsed,
      });
      set_settings(response);
      toaster.success("User settings updated");
      document.documentElement.classList.toggle("dark", response.dark_mode);
    });
  };

  return {
    handler,
    submit,
    form,
  };
};
