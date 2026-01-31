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
				<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
					Choose an avatar
				</h1>
				<p className="text-muted-foreground max-w-sm text-sm text-balance">
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
							"rounded-full outline-none transition-[transform,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
							logic.selected === item.key
								? "ring-2 ring-primary ring-offset-2 ring-offset-background"
								: "hover:scale-105"
						)}>
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
					className="w-full"
					onClick={logic.submit}
					disabled={!logic.selected}>
					{logic.selected ? "Finish setup" : "Pick an avatar to continue"}
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="w-full"
					onClick={logic.skip}>
					Skip for now
				</Button>
			</div>
		</div>
	);
};
