import type { ResolvedTheme } from "@/lib/theme";

export type HeroThemePalette = {
	ascii: string;
	background: string;
	accent: string;
	invert: boolean;
};

export const HERO_THEME_COLORS: Record<ResolvedTheme, HeroThemePalette> = {
	dark: {
		ascii: "#94a3b8",
		background: "#020617",
		accent: "#e2e8f0",
		invert: true,
	},
	light: {
		ascii: "#0f172a",
		background: "#f8fafc",
		accent: "#1e293b",
		invert: false,
	},
};
