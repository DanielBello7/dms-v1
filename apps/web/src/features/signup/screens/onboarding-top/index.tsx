import {
	Avatar,
	AvatarFallback,
	AvatarGroup,
	AvatarImage,
	Button,
} from "@/components/ui";
import { COMMUNITY_AVATARS } from "./community-avatars";
import { useSignup } from "@/features/signup/use-signup";
import { SIGN_UP_SCREEN } from "@/features/signup/use-signup";
import { Send } from "lucide-react";

export const OnboardingTop = () => {
	const { data, set_data } = useSignup((state) => state);

	const finish = () => {
		set_data({
			screen: SIGN_UP_SCREEN.ONBOARDING_END,
		});
	};

	return (
		<div className="flex flex-col gap-8 py-4">
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
					Welcome, {data.display_name.trim() ?? "there"}
				</h1>
				<p className="text-muted-foreground max-w-sm text-sm text-balance">
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
				<p className="text-muted-foreground text-xs">
					Others are already getting started
				</p>
			</div>

			<div className="flex flex-col gap-6 items-center">
				<p className="text-muted-foreground text-center text-sm">
					Set up your profile and preferences in the next step.
				</p>
				<Button
					size="lg"
					className=" bg-red-700 w-fit rounded-full size-13 hover:scale-[1.3rem] transition-all duration-300 cursor-pointer hover:bg-none"
					onClick={finish}>
					<Send />
				</Button>
			</div>
		</div>
	);
};
