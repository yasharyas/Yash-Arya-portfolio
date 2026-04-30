"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { links, profile } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ── CTA headline: line-by-line rise, slow dramatic timeline ──────────────
      // Created first — headline is highest in DOM, correct ST creation order.
      // ScrollTrigger sits on the top-level timeline (not a child tween).
      if (headlineRef.current) {
        const lines = Array.from(
          headlineRef.current.querySelectorAll<HTMLElement>(".cta-line")
        );
        // defaults: all child tweens inherit the slow dramatic ease + duration
        const ctaTl = gsap.timeline({
          defaults: { ease: "power4.out", duration: 1.35 },
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        // Label "rise" anchors the sequence; each line offset 0.18s later via
        // position parameter — gives a slow, weighted, dramatic stagger.
        ctaTl.addLabel("rise", 0);
        lines.forEach((line, i) =>
          ctaTl.from(line, { yPercent: 105 }, `rise+=${i * 0.18}`)
        );
      }

      // ── CTA button: scale from 0.8 with soft bounce on scroll entry ──────────
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scale: 0.8,
          autoAlpha: 0,
          duration: 0.85,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      // ── Email link: fade + upward drift ──────────────────────────────────────
      if (emailRef.current) {
        gsap.from(emailRef.current, {
          autoAlpha: 0,
          y: 20,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="contact"
      className="py-24 md:py-40 bg-ink text-paper relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/60">
          §06 — Get in touch
        </p>

        <h2
          ref={headlineRef}
          className="mt-8 display text-[14vw] md:text-[10vw] leading-[0.9] tracking-tightest"
        >
          {/* Each line wrapped in overflow-hidden clip + inner .cta-line span */}
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="cta-line block">Have a project</span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="cta-line block italic text-paper/80">that needs</span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="cta-line block text-ember">shipping?</span>
          </span>
        </h2>

        {/* CTA button — entry animation: scale 0.8 → 1, back.out(1.7) */}
        <div className="mt-12">
          <a
            ref={ctaRef}
            href={`mailto:${links.email}`}
            className="inline-flex items-center gap-3 border border-paper/30 text-paper font-mono text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-paper/10 transition-colors"
          >
            Start a project
          </a>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-6 border-t border-paper/15 pt-12">
          <div className="col-span-12 md:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/50 mb-3">
              Direct
            </p>
            <a
              ref={emailRef}
              href={`mailto:${links.email}`}
              className="display text-3xl md:text-5xl link-u"
            >
              {links.email}
            </a>
            <p className="mt-3 text-paper/60 text-sm">{links.phone}</p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/50 mb-3">
              Elsewhere
            </p>
            <ul className="space-y-2 text-base">
              <li><a href={links.github} className="link-u">GitHub</a></li>
              <li><a href={links.linkedin} className="link-u">LinkedIn</a></li>
              <li><a href={links.twitter} className="link-u">Twitter / X</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/50 mb-3">
              Located
            </p>
            <p className="text-base">{profile.location}</p>
            <p className="mt-1 text-paper/60 text-sm">IST · UTC+5:30</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper/50 border-t border-paper/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] uppercase">
        <p>© {new Date().getFullYear()} Yash Arya · All Rights Reserved</p>
        <p>Hand-built · Next.js · Tailwind · No Frameworks Were Harmed</p>
      </div>
    </footer>
  );
}
