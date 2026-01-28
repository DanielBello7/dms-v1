import { Button, ItemGroup, Separator } from "@/components/ui";
import { Member } from "./member";
import { EmptyMembers } from "./empty";

const people = [
	{
		username: "shadcn",
		avatar: "https://github.com/shadcn.png",
		email: "shadcn@vercel.com",
	},
	{
		username: "maxleiter",
		avatar: "https://github.com/maxleiter.png",
		email: "maxleiter@vercel.com",
	},
	{
		username: "evilrabbit",
		avatar: "https://github.com/evilrabbit.png",
		email: "evilrabbit@vercel.com",
	},
];

export const Members = () => {
	return (
		<div className="w-full h-full p-10 overflow-hidden flex flex-col pb-0">
			<div className="w-9/12 m-auto space-y-4">
				<p className="text-sm font-bold">New Conversation</p>
				<p className="text-sm text-muted-foreground">
					Get notified when ChatGPT responds to requests that take time, like
					research or image generation.
				</p>
				<Button size={"sm"}>Save</Button>
				<Separator />
			</div>
			<div className="grow w-9/12 m-auto space-y-4 overflow-y-scroll py-5">
				<EmptyMembers />
				{/* <ItemGroup className="max-w-sm space-y-3">
					{people.map((p) => (
						<Member data={p} />
					))}
				</ItemGroup> */}
			</div>
		</div>
	);
};
