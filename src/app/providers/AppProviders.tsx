import type { FC, ReactNode } from "react";
import { ThemeProvider } from "@/app/providers/theme/ThemeProvider";

type AppProvidersProps = {
	children: ReactNode;
};

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
	return <ThemeProvider>{children}</ThemeProvider>;
};
