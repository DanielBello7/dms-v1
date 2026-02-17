import { useUser } from "@/stores";

export const get_user_settings = () => {
  return useUser.getState().data.settings;
};
