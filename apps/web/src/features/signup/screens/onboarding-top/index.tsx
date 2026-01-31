import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Button,
} from "@/components/ui";
import { COMMUNITY_AVATARS } from "./community-avatars";
import { Send } from "lucide-react";
import { useLogic } from "./use-logic";
import { Logo } from "@/components/logo";

export const OnboardingTop = () => {
  const logic = useLogic();

  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <Logo />
        <h1 className="text-2xl font-semibold tracking-tight text-[#1e3a5f] sm:text-3xl">
          Welcome, {logic.data.display_name.trim() ?? "there"}
        </h1>
        <p className="max-w-sm text-balance text-sm text-[#5c6b73]">
          Your account is ready. You’re in good company—here’s what’s next.
        </p>
      </div>

      <div className="flex flex-col items-center gap-5">
        <AvatarGroup className="justify-center" data-size="lg">
          {COMMUNITY_AVATARS.map((item, i) => (
            <Avatar key={i} className="size-16">
              <AvatarImage src={item.src} alt="" />
              <AvatarFallback>{item.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <p className="text-xs text-[#5c6b73]">
          Others are already getting started
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <p className="text-center text-sm text-[#5c6b73]">
          Set up your profile and preferences in the next step.
        </p>
        <Button
          size="lg"
          className="w-fit rounded-full bg-red-500 transition-all duration-300 hover:scale-110 hover:bg-red-500 cursor-pointer size-12"
          onClick={logic.finish}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
};
