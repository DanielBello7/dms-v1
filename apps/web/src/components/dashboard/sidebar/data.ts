import { Home, User, Lock } from "lucide-react";

export const dashbaord_items = [
	{
		title: "Conversations",
		url: "/dashboard/conversations",
		icon: Home,
		active: ["conversations", ""],
	},
	{
		title: "Profile",
		url: "/dashboard/profile",
		icon: User,
		active: ["profile"],
	},
	{
		title: "Security",
		url: "/dashboard/security",
		icon: Lock,
		active: ["security"],
	},
];
