import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FAFAF8",
        "surface-alt": "#F3F2EF",
        "surface-raised": "#FFFFFF",
        "surface-dark": "#0F1B2D",
        "surface-dark-alt": "#162337",
        border: "#E2E0DB",
        "border-strong": "#CBC8C1",
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#4A4A48",
          light: "#8A8A87",
          inverse: "#F5F5F3",
        },
        brand: {
          DEFAULT: "#1B4D8F",
          dark: "#0F2E5C",
          light: "#2D6BC4",
          glow: "rgba(27, 77, 143, 0.15)",
        },
        accent: {
          DEFAULT: "#E8622A",
          dark: "#C9501F",
          light: "#F08050",
          glow: "rgba(232, 98, 42, 0.20)",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)",
        "card-hover":
          "0 8px 30px -4px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.03)",
        "card-glow":
          "0 8px 30px -4px rgba(27, 77, 143, 0.18), 0 0 0 1px rgba(27, 77, 143, 0.08)",
        "btn-accent":
          "0 4px 14px -3px rgba(232,98,42,0.45), 0 1px 3px -1px rgba(232,98,42,0.2)",
        "btn-brand":
          "0 4px 14px -3px rgba(27,77,143,0.40), 0 1px 3px -1px rgba(27,77,143,0.2)",
        "glass":
          "0 8px 32px 0 rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.08)",
        "glow-brand": "0 0 40px -8px rgba(27, 77, 143, 0.35)",
        "glow-accent": "0 0 40px -8px rgba(232, 98, 42, 0.35)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.1)",
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        "bounce-sm": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-scale": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
        "border-glow": {
          "0%, 100%": {
            borderColor: "rgba(27, 77, 143, 0.15)",
          },
          "50%": {
            borderColor: "rgba(27, 77, 143, 0.4)",
          },
        },
        "scroll-progress": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "fade-in-left": "fade-in-left 0.6s ease-out both",
        "fade-in-right": "fade-in-right 0.6s ease-out both",
        "fade-in-scale": "fade-in-scale 0.5s ease-out both",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "slide-in-right": "slide-in-right 0.4s ease-out both",
        "slide-in-left": "slide-in-left 0.4s ease-out both",
        shimmer: "shimmer 2s ease-in-out infinite",
        "draw-line": "draw-line 1.5s ease-out both",
        "border-glow": "border-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;