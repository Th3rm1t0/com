import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const MODEL_ASSET_EXTENSIONS = [".glb", ".gltf"];

export default defineConfig({
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
		build: {
			// Always emit 3D model files as separate, cacheable assets instead of
			// inlining them as base64 into JS chunks (Vite's default for small files).
			assetsInlineLimit: (filePath) =>
				MODEL_ASSET_EXTENSIONS.some((extension) => filePath.endsWith(extension))
					? false
					: undefined,
		},
	},
});
