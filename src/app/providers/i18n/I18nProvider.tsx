import {
	createContext,
	type FC,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";
import {
	type AppMessages,
	type Locale,
	messagesByLocale,
	resolvePreferredLocale,
} from "./messages";

type I18nContextValue = {
	locale: Locale;
	messages: AppMessages;
	setLocale: (locale: Locale) => void;
};

const LOCALE_STORAGE_KEY = "locale";

const isLocale = (value: string | null): value is Locale =>
	value === "ja" || value === "en";

const getInitialLocale = (): Locale => {
	if (typeof window === "undefined") {
		return "ja";
	}

	const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
	if (isLocale(storedLocale)) {
		return storedLocale;
	}

	return resolvePreferredLocale(window.navigator.languages);
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [locale, setLocale] = useState<Locale>(getInitialLocale);

	const contextValue = useMemo<I18nContextValue>(
		() => ({
			locale,
			messages: messagesByLocale[locale],
			setLocale: (nextLocale: Locale) => {
				setLocale(nextLocale);
				if (typeof window !== "undefined") {
					window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
				}
			},
		}),
		[locale],
	);

	return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
	const context = useContext(I18nContext);
	if (!context) {
		throw new Error("useI18n must be used within I18nProvider");
	}
	return context;
};
