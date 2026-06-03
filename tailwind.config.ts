import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FFFFFF",
        "surface-alt": "#F8F9FB",
        "surface-raised": "#FFFFFF",
        border: "#E5E7EB",
        "border-strong": "#D1D5DB",
        ink: {
          DEFAULT: "#1E293B",
          soft: "#475569",
          light: "#94A3B8",
        },
        brand: {
          DEFAULT: "#1D4ED8",
          dark: "#1E3A8A",
          light: "#3B82F6",
        },
        accent: {
          DEFAULT: "#E8622A",
          dark: "#C9501F",
          light: "#F08050",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 4px 0 rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 16px 0 rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)",
        "btn-accent": "0 2px 8px -3px rgba(232,98,42,0.45)",
        "btn-brand": "0 2px 8px -3px rgba(29,78,216,0.35)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
} satisfies Config;