import { avatars, type AvatarType, assets } from "@/config";

export const get_dp = (id: string | undefined): AvatarType => {
	const checked = avatars.find((i) => i.key === id);
	if (checked) return checked;
	return { key: "default", val: assets.placeholder };
};
