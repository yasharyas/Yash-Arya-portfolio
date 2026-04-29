import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Restrained palette in OKLCH-equivalent hex (warm, hue-tinted neutrals + ember accent)
        paper: "#f6f1e9",       // warm off-white background
        ink: "#1a1814",          // near-black, warm tint
        ink2: "#3a352d",         // secondary text
        muted: "#8a8275",        // tertiary
        rule: "#d9d2c4",         // hairlines
        ember: "#d24e1d",        // single accent (used <10%)
        cream: "#ece4d3",        // panel
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
} satisfies Config;
