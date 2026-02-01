import { useMultiscreen } from "@/hooks";
import { SIGN_IN_SCREEN, useSignin } from "./use-signin";
import { EmailForm, OtpForm, PasswordForm } from "./forms";
import { Verify } from "./forms/verify";
import { useEffect } from "react";

export const useLogic = () => {
  const signin = useSignin((state) => state);
  const resets = signin.reset;

  const response = useMultiscreen(
    [
      {
        index: 1,
        name: SIGN_IN_SCREEN.EMAIL,
        component: <EmailForm />,
      },
      {
        index: 2,
        name: SIGN_IN_SCREEN.OTP,
        component: <OtpForm />,
      },
      {
        index: 3,
        name: SIGN_IN_SCREEN.PASSWORD,
        component: <PasswordForm />,
      },
      {
        index: 4,
        name: SIGN_IN_SCREEN.VERIFY,
        component: <Verify />,
      },
    ],
    signin.data.screen,
  );

  useEffect(() => {
    return () => {
      resets();
    };
  }, [resets]);
  return {
    ...response,
  };
};
