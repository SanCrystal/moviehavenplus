import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "node:url";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), tsconfigPaths()],
	resolve: {
		alias: {
			"@/": fileURLToPath(new URL("./src", import.meta.url)),
			"@/components": fileURLToPath(
				new URL("./src/components", import.meta.url)
			),
			"@/assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
			"@/utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
		},
	},
});
