import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const MODEL_ASSET_EXTENSIONS = [".glb", ".gltf"];

export default defineConfig({
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
		build: {
			// Keep model files cacheable instead of base64-inlined (Vite's small-file default).
			assetsInlineLimit: (filePath) =>
				MODEL_ASSET_EXTENSIONS.some((extension) => filePath.endsWith(extension))
					? false
					: undefined,
			// The Hero island (react-three-fiber + three.js) loads lazily on its own; its size is expected.
			chunkSizeWarningLimit: 1000,
		},
	},
});
