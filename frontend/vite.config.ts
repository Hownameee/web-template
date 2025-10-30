import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:4000",
			},
			"/api/login": {
				target: "http://localhost:4000",
			},
			"/api/signup": {
				target: "http://localhost:4000",
			},
			"/api/logout": {
				target: "http://localhost:4000",
			},
		},
	},
	build: {
		outDir: '../backend/src/views/gen',
		emptyOutDir: true,
	}
});
