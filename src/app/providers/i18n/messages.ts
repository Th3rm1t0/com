export type Locale = "ja" | "en";

export type AppMessages = {
	theme: {
		light: string;
		dark: string;
		switchToLight: string;
		switchToDark: string;
	};
};

export const messagesByLocale: Record<Locale, AppMessages> = {
	ja: {
		theme: {
			light: "ライト",
			dark: "ダーク",
			switchToLight: "ライトモードに切り替える",
			switchToDark: "ダークモードに切り替える",
		},
	},
	en: {
		theme: {
			light: "Light",
			dark: "Dark",
			switchToLight: "Switch to light mode",
			switchToDark: "Switch to dark mode",
		},
	},
};

export const resolvePreferredLocale = (languages: readonly string[]): Locale => {
	for (const language of languages) {
		if (language.toLowerCase().startsWith("ja")) {
			return "ja";
		}
	}
	return "en";
};
