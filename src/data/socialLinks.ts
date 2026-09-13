import type { BrandIconName } from "@/data/brandIcons";

export type SocialLink = {
	id: string;
	href: string;
	label: string;
	icon: BrandIconName;
};

export const socialLinks: readonly SocialLink[] = [
	{
		id: "x",
		label: "Twitter",
		href: "https://x.com/Th3rm1t3",
		icon: "x",
	},
	{
		id: "github",
		label: "GitHub",
		href: "https://github.com/Th3rm1t0",
		icon: "github",
	},
	{
		id: "zenn",
		label: "Zenn",
		href: "https://zenn.dev/th3rm1t3",
		icon: "zenn",
	},
	{
		id: "bluesky",
		label: "Bluesky",
		href: "https://bsky.app/profile/th3rm1t3.bsky.social",
		icon: "bluesky",
	},
];
