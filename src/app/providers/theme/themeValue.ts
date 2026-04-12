import type { ResolvedTheme } from "@/app/providers/theme/ThemeProvider";

type ThemeValues<T> = {
	dark: T;
	light: T;
};

export const pickByTheme = <T>(
	resolvedTheme: ResolvedTheme,
	values: ThemeValues<T>,
): T => {
	return resolvedTheme === "dark" ? values.dark : values.light;
};
