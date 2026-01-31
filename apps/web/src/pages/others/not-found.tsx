import { Button } from "@/components/ui";
import { Link } from "react-router";

export const NotFoundPage = () => {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-[#fef9f0] px-6">
			<h1 className="text-6xl font-bold tracking-tight text-[#1e3a5f]">404</h1>
			<h2 className="mt-2 text-xl font-semibold text-[#1e3a5f]">
				This page could not be found.
			</h2>
			<p className="mt-2 text-[#5c6b73]">
				The page you are looking for might have been removed or does not exist.
			</p>
			<Link to="/" className="mt-8">
				<Button className="rounded-full bg-[#1e3a5f] text-white hover:bg-[#2a4a75]">
					Back to home
				</Button>
			</Link>
		</div>
	);
};
