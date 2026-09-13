export type ThemeMode = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme-mode";
const SYSTEM_MODE_QUERY = "(prefers-color-scheme: dark)";

const isThemeMode = (value: string | null): value is ThemeMode =>
	value === "system" || value === "light" || value === "dark";

export const resolveTheme = (
	mode: ThemeMode,
	prefersDark: boolean,
): ResolvedTheme =>
	mode === "system" ? (prefersDark ? "dark" : "light") : mode;

export const getStoredMode = (): ThemeMode => {
	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	return isThemeMode(stored) ? stored : "system";
};

export const getCurrentResolvedTheme = (): ResolvedTheme =>
	document.documentElement.getAttribute("data-theme") === "dark"
		? "dark"
		: "light";

export const applyResolvedTheme = (resolvedTheme: ResolvedTheme): void => {
	document.documentElement.setAttribute("data-theme", resolvedTheme);
	document.documentElement.style.colorScheme = resolvedTheme;
};

export const watchSystemScheme = (
	onChange: (prefersDark: boolean) => void,
): (() => void) => {
	const media = window.matchMedia(SYSTEM_MODE_QUERY);
	const listener = (event: MediaQueryListEvent) => onChange(event.matches);
	media.addEventListener("change", listener);
	return () => media.removeEventListener("change", listener);
};
