"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Theme toggle button with circular-reveal (ripple) transition.
 *
 * The ripple is rendered into <body> as a fixed full-screen overlay painted
 * with the OLD theme background colour, then animated via the Web Animations
 * API to collapse to a 0-radius circle at the click origin — revealing the
 * already-applied new theme beneath.
 *
 * Anti-flash on initial paint is handled in app/layout.tsx via an inline
 * <head> script that runs before any stylesheet.
 */
export function ThemeToggle() {
  // CSS triplet values for the paper background in both themes.
  // Must match the values declared in app/globals.css :root / html.dark.
  const LIGHT_BG = "rgb(246 241 233)";
  const DARK_BG  = "rgb(20 17 13)";

  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const isDarkNow = root.classList.contains("dark");
    const nextDark = !isDarkNow;

    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Apply theme + persist
    root.classList.toggle("dark", nextDark);
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch {
      /* localStorage may be blocked in some contexts */
    }

    // Build overlay painted with the OLD theme so the new theme is masked.
    const oldBg = nextDark ? LIGHT_BG : DARK_BG;
    const overlay = document.createElement("div");
    overlay.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:2147483647",
      `background:${oldBg}`,
      "pointer-events:none",
      "will-change:clip-path",
    ].join(";");
    document.body.appendChild(overlay);

    if (typeof overlay.animate === "function") {
      const anim = overlay.animate(
        [
          { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
          { clipPath: `circle(0px at ${x}px ${y}px)` },
        ],
        {
          duration: 650,
          easing: "cubic-bezier(.2,.7,.2,1)",
        }
      );
      anim.onfinish = () => overlay.remove();
    } else {
      // No Web Animations API — switch instantly.
      overlay.remove();
    }
  };

  // Render a placeholder pre-mount to avoid hydration mismatch on the
  // dark-class hint coming from the inline script.
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="theme-icon-btn"
      />
    );
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="theme-icon-btn"
    >
      <svg
        className="icon-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <svg
        className="icon-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
