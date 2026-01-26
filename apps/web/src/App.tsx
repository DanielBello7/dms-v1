import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient();

export default function App() {
	return (
		<div className="w-full h-svh grotesque">
			<QueryClientProvider client={queryClient}>
				<AppRoutes />
			</QueryClientProvider>
			<Toaster key={"toaster"} />
		</div>
	);
}
