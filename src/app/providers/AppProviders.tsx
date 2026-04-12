import type { FC, ReactNode } from "react";
import { I18nProvider } from "@/app/providers/i18n/I18nProvider";
import { ThemeProvider } from "@/app/providers/theme/ThemeProvider";

export const AppProviders: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<I18nProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</I18nProvider>
	);
};
