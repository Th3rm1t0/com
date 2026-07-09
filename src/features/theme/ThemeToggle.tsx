import type { FC } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/app/providers/theme/ThemeProvider";

export const ThemeToggle: FC = () => {
	const { resolvedTheme, toggleTheme } = useTheme();

	const isDark = resolvedTheme === "dark";
	const switchLabel = isDark
		? "ライトモードに切り替える"
		: "ダークモードに切り替える";

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={switchLabel}
			title={switchLabel}
			className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-card bg-theme-toggle-bg text-text-primary shadow-sm backdrop-blur-md transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-toggle-ring"
		>
			{isDark ? (
				<FiMoon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
			) : (
				<FiSun aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
			)}
		</button>
	);
};
