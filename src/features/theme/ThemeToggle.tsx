import type { FC } from "react";
import { useI18n } from "@/app/providers/i18n/I18nProvider";
import { useTheme } from "@/app/providers/theme/ThemeProvider";

const SunIcon: FC = () => (
	<svg
		aria-hidden="true"
		viewBox="0 0 24 24"
		className="h-5 w-5"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2.5" />
		<path d="M12 19.5V22" />
		<path d="m4.93 4.93 1.77 1.77" />
		<path d="m17.3 17.3 1.77 1.77" />
		<path d="M2 12h2.5" />
		<path d="M19.5 12H22" />
		<path d="m4.93 19.07 1.77-1.77" />
		<path d="m17.3 6.7 1.77-1.77" />
	</svg>
);

const MoonIcon: FC = () => (
	<svg
		aria-hidden="true"
		viewBox="0 0 24 24"
		className="h-5 w-5"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 13.2A8.8 8.8 0 1 1 10.8 3a7.4 7.4 0 0 0 10.2 10.2Z" />
	</svg>
);

export const ThemeToggle: FC = () => {
	const { messages } = useI18n();
	const { resolvedTheme, toggleTheme } = useTheme();

	const isDark = resolvedTheme === "dark";
	const switchLabel = isDark
		? messages.theme.switchToLight
		: messages.theme.switchToDark;

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={switchLabel}
			title={switchLabel}
			className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-card bg-theme-toggle-bg text-text-primary shadow-sm backdrop-blur-md transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-toggle-ring"
		>
			{isDark ? <MoonIcon /> : <SunIcon />}
		</button>
	);
};
