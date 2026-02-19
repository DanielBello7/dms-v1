import { useUser } from "@/stores";

export const get_user = () => {
  return useUser.getState().data.user;
};
