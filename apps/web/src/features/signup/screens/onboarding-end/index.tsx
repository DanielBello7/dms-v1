import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { avatars } from "@/config";
import { cn } from "@/lib/utils";
import { useLogic } from "./use-logic";
import { Logo } from "@/components/logo";

export const OnboardingEnd = () => {
  const logic = useLogic();
  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <Logo />
        <h1 className="text-2xl font-semibold tracking-tight text-[#1e3a5f] sm:text-3xl">
          Choose an avatar
        </h1>
        <p className="max-w-sm text-balance text-sm text-[#5c6b73]">
          Pick an avatar for your profile. You can change it later in settings.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
        {avatars.map((item) => (
          <button
            type="button"
            key={item.key}
            onClick={() => logic.setSelected(item.key)}
            className={cn(
              "rounded-full outline-none transition-[transform,box-shadow] focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2",
              logic.selected === item.key
                ? "ring-2 ring-[#1e3a5f] ring-offset-2 ring-offset-[#fef9f0]"
                : "hover:scale-105",
            )}
          >
            <Avatar className="size-full aspect-square">
              <AvatarImage src={item.val} alt={item.key} />
              <AvatarFallback>{item.key.slice(-2)}</AvatarFallback>
            </Avatar>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Button
          size="lg"
          className="w-full bg-[#1e3a5f] text-white hover:bg-[#2a4a75]"
          onClick={logic.submit}
          disabled={!logic.selected}
        >
          {logic.selected ? "Finish setup" : "Pick an avatar to continue"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-full text-[#1e3a5f] hover:bg-[#1e3a5f]/10"
          onClick={logic.skip}
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
};
