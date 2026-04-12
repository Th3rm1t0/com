export const supportedLocales = ["ja", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

export type AppMessages = {
	themeToggleToLight: string;
	themeToggleToDark: string;
};

export const messagesByLocale: Record<Locale, AppMessages> = {
	ja: {
		themeToggleToLight: "ライトモードに切り替える",
		themeToggleToDark: "ダークモードに切り替える",
	},
	en: {
		themeToggleToLight: "Switch to light mode",
		themeToggleToDark: "Switch to dark mode",
	},
};

const fallbackLocale: Locale = "ja";

export const resolvePreferredLocale = (
	languages: ReadonlyArray<string>,
): Locale => {
	for (const language of languages) {
		const normalized = language.toLowerCase();
		if (normalized.startsWith("ja")) {
			return "ja";
		}
		if (normalized.startsWith("en")) {
			return "en";
		}
	}
	return fallbackLocale;
};
