import {
	createContext,
	type FC,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export type ThemeMode = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
	mode: ThemeMode;
	resolvedTheme: ResolvedTheme;
	setMode: (mode: ThemeMode) => void;
	toggleTheme: () => void;
};

const THEME_STORAGE_KEY = "theme-mode";
const SYSTEM_MODE_QUERY = "(prefers-color-scheme: dark)";

const isThemeMode = (value: string | null): value is ThemeMode =>
	value === "system" || value === "light" || value === "dark";

const resolveTheme = (
	mode: ThemeMode,
	prefersDark: boolean,
): ResolvedTheme => {
	if (mode === "system") {
		return prefersDark ? "dark" : "light";
	}
	return mode;
};

const getInitialThemeMode = (): ThemeMode => {
	if (typeof window === "undefined") {
		return "system";
	}
	const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
	return isThemeMode(stored) ? stored : "system";
};

const getInitialPrefersDark = (): boolean => {
	if (typeof window === "undefined") {
		return false;
	}
	return window.matchMedia(SYSTEM_MODE_QUERY).matches;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [mode, setMode] = useState<ThemeMode>(getInitialThemeMode);
	const [prefersDark, setPrefersDark] = useState<boolean>(getInitialPrefersDark);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		const mediaQuery = window.matchMedia(SYSTEM_MODE_QUERY);
		const onMediaChange = (event: MediaQueryListEvent) => {
			setPrefersDark(event.matches);
		};

		setPrefersDark(mediaQuery.matches);
		mediaQuery.addEventListener("change", onMediaChange);
		return () => mediaQuery.removeEventListener("change", onMediaChange);
	}, []);

	const resolvedTheme = useMemo<ResolvedTheme>(() => {
		return resolveTheme(mode, prefersDark);
	}, [mode, prefersDark]);

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}
		document.documentElement.setAttribute("data-theme", resolvedTheme);
		document.documentElement.style.colorScheme = resolvedTheme;
	}, [resolvedTheme]);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		window.localStorage.setItem(THEME_STORAGE_KEY, mode);
	}, [mode]);

	const contextValue = useMemo<ThemeContextValue>(
		() => ({
			mode,
			resolvedTheme,
			setMode,
			toggleTheme: () => {
				setMode((currentMode) => {
					const currentTheme = resolveTheme(currentMode, prefersDark);
					return currentTheme === "dark" ? "light" : "dark";
				});
			},
		}),
		[mode, resolvedTheme, prefersDark],
	);

	return (
		<ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextValue => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return context;
};
