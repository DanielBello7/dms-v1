import { Button } from "@/components/ui";
import { Link } from "react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { assets } from "@/config";
import { cn } from "@/lib/utils";

function useParallax(
	value: ReturnType<typeof useScroll>["scrollYProgress"],
	distance: number
) {
	return useTransform(value, [0, 1], [-distance, distance]);
}

export const Home = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const y1 = useParallax(scrollYProgress, 80);
	const y2 = useParallax(scrollYProgress, 120);
	const y3 = useParallax(scrollYProgress, 60);
	const y4 = useParallax(scrollYProgress, 100);
	const y5 = useParallax(scrollYProgress, 50);

	return (
		<div
			ref={containerRef}
			className="min-h-svh overflow-x-hidden bg-[#fef9f0]">
			{/* Top nav */}
			<header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4">
				<Link to="/" className="flex items-center gap-2">
					<img
						src={assets.logo_01}
						alt="DMs"
						className="h-8 w-8 rounded-lg object-contain"
					/>
					<span className="text-xl font-bold text-[#1e3a5f]">DMs</span>
				</Link>
				<nav className="flex items-center gap-4">
					<Link to="/signin">
						<Button variant="ghost" size="sm" className="text-[#1e3a5f]">
							Sign in
						</Button>
					</Link>
					<Link to="/signup">
						<Button
							size="sm"
							className="bg-[#1e3a5f] text-white hover:bg-[#2a4a75]">
							Get started
						</Button>
					</Link>
				</nav>
			</header>

			{/* Hero */}
			<section className="relative flex min-h-svh flex-col items-center justify-center px-6 pt-20 pb-24">
				{/* Parallax decorative blobs */}
				<motion.div
					style={{ y: y1 }}
					className="pointer-events-none absolute left-[10%] top-[20%] h-24 w-24 rounded-full bg-[#ffd6a5]/80 blur-sm"
					aria-hidden
				/>
				<motion.div
					style={{ y: y2 }}
					className="pointer-events-none absolute right-[15%] top-[30%] h-32 w-32 rounded-full bg-[#b8e0d2]/70 blur-sm"
					aria-hidden
				/>
				<motion.div
					style={{ y: y3 }}
					className="pointer-events-none absolute left-[20%] bottom-[25%] h-20 w-20 rounded-full bg-[#e8d5f2]/80 blur-sm"
					aria-hidden
				/>
				<motion.div
					style={{ y: y4 }}
					className="pointer-events-none absolute right-[8%] bottom-[15%] h-28 w-28 rounded-full bg-[#ffecd2]/90 blur-sm"
					aria-hidden
				/>

				{/* Parallax illustration floats */}
				<motion.div
					style={{ y: y1 }}
					className="pointer-events-none absolute left-[8%] top-[18%] opacity-30"
					aria-hidden>
					<img
						src={assets.illu_float_chat}
						alt=""
						className="h-20 w-20 object-contain"
					/>
				</motion.div>
				<motion.div
					style={{ y: y5 }}
					className="pointer-events-none absolute right-[12%] top-[32%] opacity-25"
					aria-hidden>
					<img
						src={assets.illu_float_lock}
						alt=""
						className="h-16 w-16 object-contain"
					/>
				</motion.div>
				<motion.div
					style={{ y: y3 }}
					className="pointer-events-none absolute left-[22%] bottom-[26%] opacity-25"
					aria-hidden>
					<img
						src={assets.illu_float_chat}
						alt=""
						className="h-14 w-14 object-contain"
					/>
				</motion.div>

				<div className="relative z-10 flex max-w-4xl flex-col items-center text-center md:flex-row md:gap-12 md:text-left">
					<div className="flex-1">
						<motion.h1
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
							className="text-4xl font-bold tracking-tight text-[#1e3a5f] sm:text-5xl md:text-6xl">
							Private. Secure. <span className="text-[#e07a5f]">Direct.</span>
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
							className="mt-4 text-lg text-[#5c6b73] sm:text-xl">
							Messaging that stays between you and the people you trust. No ads,
							no noise—just real conversations.
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
							className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
							<Link to="/signup">
								<Button
									size="lg"
									className="rounded-full bg-[#1e3a5f] px-8 text-white shadow-lg hover:bg-[#2a4a75]">
									Get started free
								</Button>
							</Link>
							<Link to="/signin">
								<Button
									size="lg"
									variant="outline"
									className="rounded-full border-[#1e3a5f]/40 text-[#1e3a5f] hover:bg-[#1e3a5f]/10">
									Sign in
								</Button>
							</Link>
						</motion.div>
					</div>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="mt-10 flex-1 md:mt-0">
						<img
							src={assets.illu_hero}
							alt=""
							className="mx-auto max-h-64 w-full max-w-sm object-contain md:max-h-80"
						/>
					</motion.div>
				</div>
			</section>

			{/* Features - illustration cards */}
			<section className="relative px-6 py-20">
				<div className="mx-auto max-w-5xl">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center text-3xl font-bold text-[#1e3a5f] sm:text-4xl">
						Why DMs?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mx-auto mt-2 max-w-xl text-center text-[#5c6b73]">
						Built for people who care about privacy and simplicity.
					</motion.p>
					<div className="mt-14 grid gap-8 sm:grid-cols-3">
						{[
							{
								title: "Private",
								desc: "Your chats stay between you and your contacts. No public feeds or discovery.",
								img: assets.illu_private,
								bg: "bg-[#ffd6a5]/40",
								border: "border-[#ffd6a5]",
							},
							{
								title: "Secure",
								desc: "Verification, encryption, and controls so your account stays yours.",
								img: assets.illu_secure,
								bg: "bg-[#b8e0d2]/40",
								border: "border-[#b8e0d2]",
							},
							{
								title: "Direct",
								desc: "One-on-one and small groups. Real conversations, not algorithms.",
								img: assets.illu_direct,
								bg: "bg-[#e8d5f2]/40",
								border: "border-[#e8d5f2]",
							},
						].map((card, i) => (
							<motion.div
								key={card.title}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className={cn(
									"rounded-3xl border-2 p-6 shadow-sm",
									card.bg,
									card.border
								)}>
								<img
									src={card.img}
									alt=""
									className="mb-4 h-20 w-20 object-contain object-left"
								/>
								<h3 className="text-xl font-bold text-[#1e3a5f]">
									{card.title}
								</h3>
								<p className="mt-2 text-[#5c6b73]">{card.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA strip */}
			<section className="relative px-6 py-20">
				<motion.div
					initial={{ opacity: 0, scale: 0.98 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					className="mx-auto max-w-2xl rounded-3xl bg-[#1e3a5f] p-10 text-center text-white shadow-xl">
					<h2 className="text-2xl font-bold sm:text-3xl">
						Ready to message without the mess?
					</h2>
					<p className="mt-2 text-white/90">
						Create your account and start chatting in minutes.
					</p>
					<Link to="/signup" className="mt-6 inline-block">
						<Button
							size="lg"
							className="rounded-full bg-white text-[#1e3a5f] hover:bg-white/90">
							Get started free
						</Button>
					</Link>
				</motion.div>
			</section>

			{/* Footer */}
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
		</div>
	);
};
