import { assets } from "@/config";
import { Link } from "react-router";

export const Footer = () => {
	return (
		<footer className="border-t border-[#1e3a5f]/10 bg-[#fef9f0] px-6 py-8">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
				<Link to="/" className="flex items-center gap-2">
					<img
						src={assets.logo_01}
						alt="DMs"
						className="h-6 w-6 rounded object-contain"
					/>
					<span className="font-semibold text-[#1e3a5f]">DMs</span>
				</Link>
				<p className="text-sm text-[#5c6b73]">
					Private Secure Direct Messaging
				</p>
				<div className="flex gap-6">
					<Link
						to="/signin"
						className="text-sm font-medium text-[#1e3a5f] hover:underline">
						Sign in
					</Link>
					<Link
						to="/signup"
						className="text-sm font-medium text-[#1e3a5f] hover:underline">
						Sign up
					</Link>
				</div>
			</div>
		</footer>
	);
};
