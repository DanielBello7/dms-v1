import { assets } from "@/config";
import { Link } from "react-router";
import classnames from "classnames";

type Props = {
	type?: "1" | "2";
	size?: string;
	textsize?: string;
	showText?: boolean;
	className?: string;
	linkActive?: boolean;
};

export const Logo = (props: Props) => {
	const {
		size = "w-8",
		type = "1",
		textsize = "text-3xl",
		linkActive = false,
		showText = true,
		className,
	} = props;
	const container = classnames(
		"w-fit flex items-center gap-2",
		{
			"cursor-pointer": linkActive,
		},
		className
	);
	const sizing = classnames(size);
	const text = classnames("text-3xl font-bold", textsize, {
		"text-black": type === "1",
		"text-white": type === "2",
	});

	return (
		<Link className={container} to="/">
			<img src={assets.logo} alt="app-logo" className={sizing} />
			{showText && <h1 className={text}>BUS-T</h1>}
		</Link>
	);
};
