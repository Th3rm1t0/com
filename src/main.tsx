import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "@/app/App";
import { AppProviders } from "@/app/providers/AppProviders";
import "@/styles/main.css";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<AppProviders>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AppProviders>
		</StrictMode>,
	);
}
