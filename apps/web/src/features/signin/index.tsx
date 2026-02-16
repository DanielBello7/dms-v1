import { useLogic } from "./use-logic";

export const SignIn = () => {
  const logic = useLogic();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#fef9f0] p-6 md:p-10">
      <div className="w-full max-w-sm">{logic.screen.component}</div>
    </div>
  );
};
