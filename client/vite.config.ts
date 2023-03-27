import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteTsconfigPaths(), svgrPlugin(), eslint()],
	server: {
		open: true,
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:9090/',
				headers: { 'Content-type': 'application/json; charset=UTF-8', },
			},
		},
	},
});