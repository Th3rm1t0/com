import type { ResolvedTheme } from "@/app/providers/theme/ThemeProvider";

export type BoxThemePalette = {
	ascii: string;
	background: string;
	faces: readonly string[];
	invert: boolean;
};

export const BOX_THEME_COLORS: Record<ResolvedTheme, BoxThemePalette> = {
	dark: {
		ascii: "#94a3b8",
		background: "#020617",
		faces: ["#f8fafc", "#e2e8f0", "#cbd5e1", "#b8c4d7", "#dce5f0", "#aebcd2"],
		invert: true,
	},
	light: {
		ascii: "#0f172a",
		background: "#f8fafc",
		faces: ["#0f172a", "#1e293b", "#334155", "#475569", "#111827", "#243244"],
		invert: false,
	},
};
