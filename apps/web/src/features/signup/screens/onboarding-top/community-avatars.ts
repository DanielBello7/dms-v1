import { assets } from "@/config/assets";

export type CommunityAvatar = {
	src: string;
	fallback: string;
};

/** Avatars shown in the onboarding welcome screen (avatar group). Sourced from app assets. */
export const COMMUNITY_AVATARS: CommunityAvatar[] = [
	{ src: assets.avatar_00, fallback: "01" },
	{ src: assets.avatar_01, fallback: "02" },
	{ src: assets.avatar_02, fallback: "03" },
	{ src: assets.avatar_03, fallback: "04" },
	{ src: assets.avatar_04, fallback: "05" },
];
