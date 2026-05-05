"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile, links } from "@/lib/content";

export function Hero() {
  const yashRef   = useRef<HTMLSpanElement>(null);
  const aryaRef   = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const avatarRef  = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Clip-mask reveal: each word slides up from below its overflow-hidden wrapper
      tl.from([yashRef.current, aryaRef.current], {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.18,
      });

      // Typewriter character stagger on tagline — starts before name fully settles
      const chars = taglineRef.current?.querySelectorAll(".tl-char");
      if (chars?.length) {
        tl.from(
          chars,
          {
            autoAlpha: 0,
            duration: 0.001,
            stagger: { each: 0.022 },
            ease: "none",
          },
          "-=0.55"
        );
      }

      // ── PFP hover pulsating ring ────────────────────────────────────────────
      // A single ring element (`.pfp-ring`) sits absolutely inside the avatar
      // wrapper. On mouseenter it loops: scale 1→1.45, opacity 0.75→0.
      // On mouseleave the loop is killed and the ring is instantly reset.
      const avatarEl = avatarRef.current;
      const ringEl   = ringRef.current;
      if (avatarEl && ringEl) {
        gsap.set(ringEl, { scale: 1, opacity: 0 });
        let ringAnim: gsap.core.Tween | null = null;

        const onAvatarEnter = () => {
          ringAnim?.kill();
          ringAnim = gsap.fromTo(
            ringEl,
            { scale: 1, opacity: 0.75 },
            { scale: 1.45, opacity: 0, duration: 1.1, ease: "power2.out", repeat: -1 }
          );
        };
        const onAvatarLeave = () => {
          ringAnim?.kill();
          ringAnim = null;
          gsap.set(ringEl, { scale: 1, opacity: 0 });
        };
        avatarEl.addEventListener("mouseenter", onAvatarEnter);
        avatarEl.addEventListener("mouseleave", onAvatarLeave);

        return () => {
          avatarEl.removeEventListener("mouseenter", onAvatarEnter);
          avatarEl.removeEventListener("mouseleave", onAvatarLeave);
          ringAnim?.kill();
        };
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="top" className="relative pt-16 md:pt-28 pb-24 md:pb-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Top meta row */}
        <div className="grid grid-cols-12 gap-6 mb-6 md:mb-12 items-start">
          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              Index — N° 001
            </p>
            <p className="mt-2 text-sm text-ink2">{profile.location}</p>
          </div>
          <div className="hidden md:flex col-span-6 justify-center">
            <div ref={avatarRef} className="relative">
              <img
                src="/avatar.jpg"
                alt="Yash Arya"
                width={108}
                height={108}
                className="rounded-full grayscale"
                style={{ filter: "grayscale(1) contrast(1.05)" }}
                fetchPriority="high"
                loading="eager"
              />
              {/* Pulsating ring — GSAP loops it on hover */}
              <span ref={ringRef} className="pfp-ring absolute inset-0" aria-hidden="true" />
              <span className="absolute -right-1 -bottom-1 w-3.5 h-3.5 rounded-full bg-ember ring-2 ring-paper" />
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 md:text-right">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              Edition
            </p>
            <p className="mt-2 text-sm text-ink2">May 2026 — Spring</p>
          </div>
        </div>

        {/* Display name — overflow-hidden wrappers create the clip mask */}
        <h1 className="display text-[18vw] md:text-[14vw] lg:text-[12rem] xl:text-[14rem] leading-[0.85]">
          <span className="block overflow-hidden">
            <span ref={yashRef} className="block">
              Yash<span className="text-ember">.</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <span ref={aryaRef} className="block italic font-light pl-[8vw]">
              Arya
            </span>
          </span>
        </h1>

        {/* Tagline + role band */}
        <div className="mt-12 md:mt-20 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <p
              ref={taglineRef}
              className="text-sm md:text-base leading-relaxed max-w-[52ch] tracking-normal text-ink2"
            >
              {/* Screen-reader reads the sr-only span; animated chars are hidden from AT */}
              <span className="sr-only">{profile.tagline}</span>
              {profile.tagline.split("").map((char, i) => (
                <span
                  key={i}
                  className="tl-char"
                  style={{ display: "inline" }}
                  aria-hidden="true"
                >
                  {char === " " ? "\u00a0" : char}
                </span>
              ))}
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-2">
              Currently
            </p>
            <p className="text-sm text-ink2 max-w-[36ch] md:ml-auto">
              {profile.status}
            </p>
            <div className="mt-6 flex md:justify-end gap-4 text-[11px] font-mono tracking-[0.18em] uppercase">
              <a href={links.github} className="link-u">GitHub</a>
              <a href={links.linkedin} className="link-u">LinkedIn</a>
              <a href={links.twitter} className="link-u">X</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee — disciplines */}
      <div className="mt-24 md:mt-32 border-y border-rule overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap py-4 will-change-transform">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center shrink-0">
              {[
                "Frontend Systems",
                "Web3 / Solidity",
                "AI & ML",
                "Editor Tools",
                "Production React",
                "Design Engineering",
                "PostgreSQL",
                "Smart Contracts",
                "PyTorch",
                "Turborepo",
              ].map((w, i) => (
                <span key={`${k}-${i}`} className="display text-[6vw] md:text-[3.6vw] px-8 italic">
                  {w}
                  <span className="text-ember not-italic"> · </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
