import { SiBluesky, SiGithub, SiX, SiZenn } from "react-icons/si";
import type { SocialLink } from "./SocialLinks";

export const socialLinks: SocialLink[] = [
	{
		id: "x",
		label: "Twitter",
		href: "https://x.com/Th3rm1t3",
		icon: SiX,
	},
	{
		id: "github",
		label: "GitHub",
		href: "https://github.com/Th3rm1t0",
		icon: SiGithub,
	},
	{
		id: "zenn",
		label: "Zenn",
		href: "https://zenn.dev/th3rm1t3",
		icon: SiZenn,
	},
	{
		id: "bluesky",
		label: "Bluesky",
		href: "https://bsky.app/profile/th3rm1t3.bsky.social",
		icon: SiBluesky,
	},
];
