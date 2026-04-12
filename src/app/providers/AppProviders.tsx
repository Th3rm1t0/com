import type { FC, ReactNode } from "react";
import { ThemeProvider } from "@/app/providers/theme/ThemeProvider";

export const AppProviders: FC<{ children: ReactNode }> = ({ children }) => {
	return <ThemeProvider>{children}</ThemeProvider>;
};
