import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    // Оптимізація bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Виділяємо vendor chunks для кращого кешування
          vendor: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
          form: ["react-hook-form", "@hookform/resolvers", "yup"],
          utils: ["axios", "react-hot-toast"],
        },
      },
    },
    // Оптимізація для production
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
      },
    },
    // Аналіз bundle size
    ...(mode === "analyze" && {
      rollupOptions: {
        output: {
          manualChunks: undefined, // Вимкнути manual chunks для аналізу
        },
      },
    }),
  },
}));
