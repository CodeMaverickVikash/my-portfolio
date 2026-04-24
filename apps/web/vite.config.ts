import { API_PREFIX, getDevApiBaseUrl } from "@repo/shared";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      [`/${API_PREFIX}`]: {
        target: getDevApiBaseUrl(),
        changeOrigin: true,
      },
    },
  },
});
