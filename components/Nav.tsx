"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { links } from "@/lib/content";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const navLinks = navRef.current?.querySelectorAll("a");
      if (!navLinks?.length) return;

      gsap.from(navLinks, {
        autoAlpha: 0,
        y: -6,
        duration: 0.55,
        stagger: { each: 0.08, from: "start" },
        ease: "power2.out",
        delay: 0.25,
      });
    });

    return () => mm.revert();
  }, []);

  const items = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 backdrop-blur-md bg-paper/70 border-b border-rule"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-14 flex items-center justify-between">
        <Link
          href="#top"
          className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase"
        >
          <img src="/marks/monogram.svg" alt="" width={24} height={24} aria-hidden="true" className="sm:w-7 sm:h-7" />
          <span className="whitespace-nowrap">
            Yash Arya<span className="hidden sm:inline"><span className="text-ember"> · </span>Index 2026</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-[12px] tracking-wide text-ink2">
          {items.map((i) => (
            <a key={i.href} href={i.href} className="link-u">
              {i.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${links.email}`}
          className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase font-mono link-u whitespace-nowrap"
        >
          Available →
        </a>
      </div>
    </header>
  );
}
