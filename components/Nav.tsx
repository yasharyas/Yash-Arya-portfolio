"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { links } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

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

    // Active-section tracking — independent of motion preference.
    // Each ScrollTrigger adds/removes .nav-active on the matching link
    // while the section straddles the 50% viewport mark.
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];
    const sectionIds = ["work", "about", "experience", "skills", "contact"];

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      const link = navRef.current?.querySelector<HTMLElement>(
        `a[data-section="${id}"]`
      );
      if (!section || !link) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 45%",
          toggleClass: { targets: link, className: "nav-active" },
        })
      );
    });

    return () => {
      mm.revert();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const items = [
    { label: "Work", href: "#work", section: "work" },
    { label: "About", href: "#about", section: "about" },
    { label: "Experience", href: "#experience", section: "experience" },
    { label: "Skills", href: "#skills", section: "skills" },
    { label: "Contact", href: "#contact", section: "contact" },
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
            <a
              key={i.href}
              href={i.href}
              data-section={i.section}
              className="link-u transition-colors duration-200"
            >
              {i.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`mailto:${links.email}`}
            className="status-pill font-mono text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-ink whitespace-nowrap"
          >
            <span className="status-indicator" aria-hidden="true">
              <span />
            </span>
            <span className="hidden sm:inline">Available</span>
            <span className="text-ember">→</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
