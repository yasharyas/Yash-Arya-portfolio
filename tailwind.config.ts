import type { Config } from "tailwindcss";

/**
 * Color tokens reference CSS custom properties (RGB triplets) so the entire
 * palette can be themed at runtime by toggling `html.dark`. The triplet
 * pattern keeps Tailwind opacity utilities working — e.g. `bg-paper/70`.
 *
 * Variables are declared in app/globals.css under `:root` (light) and
 * `html.dark` (dark).
 */
function withOpacity(varName: string) {
  return `rgb(var(${varName}) / <alpha-value>)`;
}

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: withOpacity("--paper-rgb"),
        ink: withOpacity("--ink-rgb"),
        ink2: withOpacity("--ink2-rgb"),
        muted: withOpacity("--muted-rgb"),
        rule: withOpacity("--rule-rgb"),
        ember: withOpacity("--ember-rgb"),
        cream: withOpacity("--cream-rgb"),
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

