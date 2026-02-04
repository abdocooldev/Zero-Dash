import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import tsChecker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsChecker({ typescript: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
