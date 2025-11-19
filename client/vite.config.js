import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const { PORT = 10000 } = process.env;

export default defineConfig({
  base: "./", // importante para que las rutas sean relativas
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      "/auth": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    emptyOutDir: true,
    outDir: "dist", // dentro de client/dist
  },
});
