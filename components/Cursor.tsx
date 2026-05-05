"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Fixed hex constants — these never change; the cursor picks one pair
// based on the current theme and which section the pointer is over.
const INK   = "#1a1814";  // near-black  — used on light backgrounds
const PAPER = "#ede4d0";  // warm cream  — used on dark backgrounds

export function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    gsap.set([dot, ring], { autoAlpha: 0, xPercent: -50, yPercent: -50 });

    // ── Theme helpers ────────────────────────────────────────────────────────
    const isThemeDark    = () => document.documentElement.classList.contains("dark");
    const getDefaultDot  = () => isThemeDark() ? PAPER : INK;
    const getDefaultRing = () => isThemeDark() ? `${PAPER}44` : `${INK}33`;

    // Set initial colours based on current theme
    gsap.set(dot,  { backgroundColor: getDefaultDot() });
    gsap.set(ring, { borderColor: getDefaultRing() });

    let visible       = false;
    let inDarkSection = false; // true when hovering #contact or footer

    // ── MutationObserver: re-colour cursor when theme toggle fires ───────────
    const onThemeChange = () => {
      if (inDarkSection) return; // dark section always uses PAPER
      gsap.to(dot,  { backgroundColor: getDefaultDot(),  duration: 0.3, ease: "power2.inOut", overwrite: "auto" });
      gsap.to(ring, { borderColor:     getDefaultRing(), duration: 0.3, ease: "power2.inOut", overwrite: "auto" });
    };
    const themeObserver = new MutationObserver(() => onThemeChange());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ── Move ────────────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
        visible = true;
      }
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.07, ease: "power2.out", overwrite: "auto" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.28, ease: "power2.out", overwrite: "auto" });
    };

    // ── Always-dark section colour swap ─────────────────────────────────────
    // #contact and footer are always rendered on dark bg regardless of theme,
    // so we always switch to PAPER palette when entering them.
    const setDarkPalette = () => {
      if (inDarkSection) return;
      inDarkSection = true;
      gsap.to(dot,  { backgroundColor: PAPER,           duration: 0.35, ease: "power2.inOut", overwrite: "auto" });
      gsap.to(ring, { borderColor: `${PAPER}55`,        duration: 0.35, ease: "power2.inOut", overwrite: "auto" });
    };
    const setDefaultPalette = () => {
      if (!inDarkSection) return;
      inDarkSection = false;
      gsap.to(dot,  { backgroundColor: getDefaultDot(),  duration: 0.35, ease: "power2.inOut", overwrite: "auto" });
      gsap.to(ring, { borderColor:     getDefaultRing(), duration: 0.35, ease: "power2.inOut", overwrite: "auto" });
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      // Colour context
      if (el.closest("#contact, footer")) setDarkPalette();
      else setDefaultPalette();

      // Scale on interactive elements
      if (el.closest("a, button, .project-card, .skill-tag")) {
        gsap.to(dot,  { scale: 3, duration: 0.18, ease: "back.out(2)",   overwrite: "auto" });
        gsap.to(ring, { scale: 1.3, duration: 0.2,  ease: "power2.out", overwrite: "auto" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      // Revert colour if leaving dark zone
      if (el.closest("#contact, footer") && !(e.relatedTarget as HTMLElement | null)?.closest?.("#contact, footer")) {
        setDefaultPalette();
      }

      // Revert scale
      if (el.closest("a, button, .project-card, .skill-tag")) {
        gsap.to(dot,  { scale: 1, duration: 0.22, ease: "power2.out", overwrite: "auto" });
        gsap.to(ring, { scale: 1, duration: 0.22, ease: "power2.out", overwrite: "auto" });
      }
    };

    const onLeave = () => {
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
      visible = false;
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      themeObserver.disconnect();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Filled dot — snaps to cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full"
      />
      {/* Soft ring — trails 280 ms behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border"
      />
    </>
  );
}

