import { SidebarProvider } from "@/components/ui";
import { Header } from "./header";
import { AppSidebar } from "./sidebar";

type Props = {
	children: React.ReactNode;
};

export const Dashboard = (props: Props) => {
	const { children } = props;

	return (
		<div className="w-full h-svh overflow-hidden flex">
			<div className="flex grow font-grotesque overflow-hidden rounded-sm items-center justify-center bg-black/5">
				<div className="relative flex border border-gray-400/60 w-300 h-200 overflow-hidden">
					<SidebarProvider className="flex grow overflow-hidden bg-white">
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
