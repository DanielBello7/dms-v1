import { SidebarProvider } from "@/components/ui";
import { Header } from "./header";
import { AppSidebar } from "./sidebar";

type Props = {
	children: React.ReactNode;
};

export const Dashboard = (props: Props) => {
	const { children } = props;

	return (
		<div className="w-full h-svh overflow-hidden p-2 flex">
			<div className="flex grow font-grotesque overflow-hidden rounded-sm">
				<div className="relative size-full overflow-hidden">
					<SidebarProvider className="w-full h-full! overflow-hidden bg-white">
						<AppSidebar />
						<main className="size-full overflow-hidden flex flex-col">
							<Header />
							<div className="w-full grow-1 overflow-hidden">{children}</div>
						</main>
					</SidebarProvider>
				</div>
			</div>
		</div>
	);
};
