import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all source files
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-section-title":
          "linear-gradient(91deg, #FFF 32.88%, rgba(255, 255, 255, 0.40) 99.12%)",
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
