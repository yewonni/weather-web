import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/weather/geo": {
        target: "https://api.openweathermap.org/geo",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weather\/geo/, ""),
      },
      "/api/weather": {
        target: "https://api.openweathermap.org/data/2.5",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weather/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
