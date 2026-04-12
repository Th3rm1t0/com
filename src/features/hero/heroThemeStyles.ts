import type { ResolvedTheme } from "@/app/providers/theme/ThemeProvider";

type HeroGlowState = "active" | "idle";

type HeroThemeStyles = {
	active: string;
	idle: string;
};

const HERO_THEME_STYLES: Record<ResolvedTheme, HeroThemeStyles> = {
	dark: {
		active:
			"radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 60%)",
		idle: "radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 60%)",
	},
	light: {
		active:
			"radial-gradient(circle at center, rgba(15,23,42,0.16), transparent 64%)",
		idle: "radial-gradient(circle at center, rgba(15,23,42,0.1), transparent 64%)",
	},
};

export const getHeroGlow = (
	resolvedTheme: ResolvedTheme,
	state: HeroGlowState,
): string => {
	return HERO_THEME_STYLES[resolvedTheme][state];
};
