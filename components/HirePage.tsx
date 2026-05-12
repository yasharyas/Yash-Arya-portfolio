"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { profile, links, stats } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// ── Static data ──────────────────────────────────────────────────────────────

const services = [
  {
    num: "01",
    category: "Conversion",
    title: "Landing Pages",
    body: "The hero has 5 seconds to say what you do and why it matters. Most don't. I build Next.js landing pages that communicate value fast — clear structure, sharp copy layout, and motion that doesn't get in the way. Built for SaaS tools and AI platforms that need to convert visitors, not just impress them.",
    bestFor: "SaaS tools · AI platforms · Early-stage startups",
    deliverables: ["Hero + feature sections", "Pricing and FAQ blocks", "CTA flow + form integration"],
    proof: "",
  },
  {
    num: "02",
    category: "Brand Web",
    title: "Marketing Sites",
    body: "More than a landing page — a full web presence. Multi-page sites for brands that need to look serious before a prospect ever reaches the contact form. Built with Next.js, optimised for performance, and designed to hold up at scale.",
    bestFor: "Pharma · Healthcare · B2B brands · Professional services",
    deliverables: ["Full multi-page architecture", "Content management ready", "SEO structure + performance"],
    proof: "AGNIJ Pharmaceuticals: full brand site, product catalogue, quote flow — live at agnijpharma.com",
  },
  {
    num: "03",
    category: "Product",
    title: "SaaS Frontend",
    body: "Dashboards, admin panels, and data-heavy UIs that don't slow down under real load. TanStack Query, TanStack Table, Zod validation, sub-300ms renders on thousand-row tables. Built for founders who need the product to work as well as it looks.",
    bestFor: "Ops tools · Admin panels · Data-heavy products",
    deliverables: ["React + TypeScript dashboard", "Real-time data views", "Form-heavy workflow UI"],
    proof: "Pelocal: 8 modules · 1k-row tables at sub-300ms · ~2% backend rejection rate",
  },
  {
    num: "04",
    category: "Rescue",
    title: "Site Revamps",
    body: "Your product has outgrown your website. The design is dated, the copy doesn't land, and the mobile experience is an afterthought. I take existing sites and rebuild them — same brand, better everything. Faster load, cleaner layout, copy that actually sells.",
    bestFor: "Products that outgrew their first site",
    deliverables: ["Full frontend rebuild", "Copy restructure", "Performance audit + fixes"],
    proof: "",
  },
];

const steps = [
  {
    num: "01",
    title: "Discovery",
    timing: "15 min call or a few messages",
    body: "Tell me what you're building, what's blocked, and what timeline you need. I read the brief before I reply — no canned responses.",
  },
  {
    num: "02",
    title: "Proposal",
    timing: "Scope · timeline · price",
    body: "A written breakdown: exactly what gets built, in how long, at what cost. Fixed-scope or T&M — your call. You approve, we start.",
  },
  {
    num: "03",
    title: "Build + Ship",
    timing: "Weekly check-ins · async updates",
    body: "You see progress before it's done. No disappearing for three weeks. Delivery includes docs and a handoff call.",
  },
];

const trust = [
  { value: "4+", label: "Internships shipped", sub: "LG · Pelocal · ILBS · CEL" },
  { value: "7+", label: "Projects in production", sub: "active + shipped" },
  { value: "294", label: "GitHub contributions / yr", sub: "56 public repos" },
  { value: "27", label: "OSS components extracted", sub: "yash-ui-system" },
];

// ── Component ────────────────────────────────────────────────────────────────

export function HirePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const hScrollSectionRef = useRef<HTMLDivElement>(null);
  const hScrollTrackRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Hero entrance ──────────────────────────────────────────────────────
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTl
          .from(".hire-meta", { opacity: 0, y: 8, duration: 0.55, stagger: 0.1 })
          .from(".hire-h1 .h1-line", { yPercent: 115, duration: 1.15, stagger: 0.14 }, "-=0.3")
          .from(".hire-sub", { opacity: 0, y: 18, duration: 0.8 }, "-=0.65")
          .from(".hire-cta-btn", { opacity: 0, y: 12, duration: 0.55, stagger: 0.1 }, "-=0.5")
          .from(".hire-stat", { opacity: 0, y: 10, duration: 0.5, stagger: 0.07 }, "-=0.4");

        // ── Scroll-based reveals (all non-pinned sections) ───────────────────
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 22,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });

        // ── Featured project: stagger from left ───────────────────────────
        gsap.from(".proj-col-left > *", {
          opacity: 0,
          y: 28,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".proj-col-left",
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(".proj-col-right", {
          opacity: 0,
          x: 36,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".proj-col-right",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // ── Section 3: Horizontal scroll — desktop only ──────────────────
        mm.add("(min-width: 768px)", () => {
          const track = hScrollTrackRef.current;
          const section = hScrollSectionRef.current;
          if (!track || !section) return;

          const getDistance = () => track.scrollWidth - window.innerWidth;

          const hTween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
          });

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            pinSpacing: true,
            animation: hTween,
            scrub: 1,
            invalidateOnRefresh: true,
          });
        });

        // ── Section 4: How It Works — scrubbed step reveal ───────────────
        if (stepsRef.current) {
          const stepBlocks = stepsRef.current.querySelectorAll<HTMLElement>(".step-block");

          const stepsTl = gsap.timeline({
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 62%",
              end: "bottom 38%",
              scrub: 1.5,
            },
            defaults: { ease: "power2.out", duration: 0.45 },
          });

          // Progress line across top of steps
          if (progressLineRef.current) {
            stepsTl.from(progressLineRef.current, {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 1.4,
              ease: "none",
            });
          }

          // Each step reveals sequentially
          stepBlocks.forEach((block, i) => {
            const circle = block.querySelector(".step-circle");
            const content = block.querySelector(".step-content");
            const pos = i * 0.55;
            stepsTl.from(circle, { opacity: 0, scale: 0.5 }, pos);
            stepsTl.from(content, { opacity: 0, y: 20 }, pos + 0.2);
          });
        }

        // ── Trust section fade-in stagger ────────────────────────────────
        gsap.from(".trust-stat", {
          opacity: 0,
          y: 16,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".trust-grid",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        // ── Contact section: dramatic headline rise ───────────────────────
        gsap.from(".cta-headline .cta-line", {
          yPercent: 105,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".cta-headline",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(".cta-body-el", {
          opacity: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-body",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-x-hidden">
      {/* ── § 1 HERO ────────────────────────────────────────────────────────── */}
      <section
        id="top"
        className="relative min-h-[100svh] flex flex-col pt-0 pb-0 border-b border-rule"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 w-full flex flex-col flex-1 py-14 md:py-20">
          {/* Top meta row */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <p className="hire-meta font-mono text-[10px] tracking-[0.3em] uppercase text-muted">
              Index — Hire
            </p>
            <div className="hire-meta flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted">
                Available · New Delhi
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="hire-meta font-mono text-[10px] tracking-[0.3em] uppercase text-muted mb-8">
              Full Stack · Freelance · Contract
            </p>

            <h1 className="hire-h1 display text-[15vw] md:text-[10.5vw] lg:text-[9.5rem] leading-[0.86]">
              <span className="block overflow-hidden">
                <span className="h1-line block">Built,</span>
              </span>
              <span className="block overflow-hidden">
                <span className="h1-line block italic font-light pl-[7vw]">not</span>
              </span>
              <span className="block overflow-hidden">
                <span className="h1-line block">demoed.</span>
              </span>
            </h1>

            <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-7">
                <p className="hire-sub text-base md:text-lg text-ink2 leading-relaxed max-w-[54ch]">
                  React + TypeScript engineer with {stats[0].value} internships and 7 shipped
                  projects. I build admin dashboards, smart contracts, AI tools, and editor
                  extensions. Looking for startups and engineering teams who need things{" "}
                  <em className="not-italic font-medium text-ink">actually finished.</em>
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="mailto:yasharyas@proton.me"
                    className="hire-cta-btn inline-flex items-center gap-2 bg-ink text-paper px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-ember transition-colors duration-300"
                  >
                    Start a project <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href="#work"
                    className="hire-cta-btn inline-flex items-center gap-2 border border-rule text-ink px-7 py-3.5 text-sm font-medium tracking-wide hover:border-ink transition-colors duration-300"
                  >
                    See work <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>

              <div className="col-span-12 md:col-span-5 flex flex-col justify-end md:items-end gap-2 mt-6 md:mt-0">
                <div className="hire-sub mt-4 flex md:justify-end gap-5 text-[11px] font-mono tracking-[0.18em] uppercase">
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="link-u text-muted hover:text-ink transition-colors">GitHub</a>
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="link-u text-muted hover:text-ink transition-colors">LinkedIn</a>
                  <a href={`mailto:${links.email}`} className="link-u text-muted hover:text-ink transition-colors">Email</a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats band */}
          <div className="mt-14 md:mt-20 pt-6 border-t border-rule grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="hire-stat">
                <p className="display text-3xl md:text-4xl">{s.value}</p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.22em] uppercase text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── § 2 FEATURED WORK ─────────────────────────────────────────────── */}
      <section id="work" className="border-b border-rule">

        {/* ── 2a: AGNIJ — Marketing site, real client ── */}
        <div className="py-24 md:py-40 border-b border-rule">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <p data-reveal className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted mb-14">
              Marketing Site · Live Client · 2026
            </p>

            <div className="grid grid-cols-12 gap-8 md:gap-16 items-start">
              {/* Left */}
              <div className="proj-col-left col-span-12 md:col-span-5 space-y-7">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ember">
                    Client Work
                  </p>
                  <h2 className="display text-5xl md:text-7xl mt-2 leading-none">
                    AGNIJ<span className="text-ember">.</span>
                  </h2>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted mt-2">
                    Marketing Site
                  </p>
                </div>

                <p className="text-sm text-ink2 leading-relaxed max-w-[44ch]">
                  Full brand website for AGNIJ Pharmaceuticals — product catalogue, therapeutic
                  category navigation, quote flow, and a trust-first design built for
                  healthcare professionals and hospital procurement teams.
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 border-y border-rule">
                  {[
                    { v: "12", l: "Product SKUs catalogued" },
                    { v: "500+", l: "Hospitals served" },
                    { v: "Multi-page", l: "Architecture" },
                    { v: "Live", l: "agnijpharma.com" },
                  ].map((m) => (
                    <div key={m.l}>
                      <p className="display text-2xl leading-none">{m.v}</p>
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted mt-1">
                        {m.l}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Next.js", "Tailwind", "TypeScript", "SEO"].map((t) => (
                    <span key={t} className="font-mono text-[9px] tracking-[0.12em] uppercase border border-rule px-2.5 py-1 text-muted">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="https://agnijpharma.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink text-ink px-5 py-2.5 text-xs font-mono tracking-[0.15em] uppercase hover:bg-ink hover:text-paper transition-colors duration-300"
                >
                  agnijpharma.com <span aria-hidden="true">↗</span>
                </a>
              </div>

              {/* Right — 3 cropped screenshots stacked */}
              <div className="proj-col-right col-span-12 md:col-span-7 space-y-2">
                {/* Hero crop — full width */}
                <div className="w-full overflow-hidden border border-rule">
                  <img
                    src="/projects/agnij/hero.jpg"
                    alt="AGNIJ Pharmaceuticals — hero section with dark background and headline"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
                {/* Products + Quality — side by side */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="overflow-hidden border border-rule">
                    <img
                      src="/projects/agnij/products.jpg"
                      alt="AGNIJ — product catalogue with category filters"
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                  <div className="overflow-hidden border border-rule">
                    <img
                      src="/projects/agnij/quality.jpg"
                      alt="AGNIJ — quality standards and testimonial section"
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">2026</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">Faridabad, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2b: PELOCAL — SaaS admin panel ── */}
        <div className="py-24 md:py-32 bg-cream/40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <p data-reveal className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted mb-14">
              SaaS Admin Panel · Production · 2025 – Ongoing
            </p>

            <div className="grid grid-cols-12 gap-8 md:gap-16 items-start">
              {/* Left */}
              <div className="proj-col-left col-span-12 md:col-span-5 space-y-7">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ember">
                    Production
                  </p>
                  <h2 className="display text-5xl md:text-7xl mt-2 leading-none">
                    Pelocal<span className="text-ember">.</span>
                  </h2>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted mt-2">
                    MyAnthology Admin Operations Panel
                  </p>
                </div>

                <p className="text-sm text-ink2 leading-relaxed max-w-[44ch]">
                  Sole frontend on a production event-ops dashboard — React + TypeScript
                  managing 100+ events, 500+ menu items, and live customer bookings.
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 border-y border-rule">
                  {[
                    { v: "sub-300ms", l: "Table load on 1k rows" },
                    { v: "0", l: "Overbooking incidents" },
                    { v: "~2%", l: "Backend rejection rate" },
                    { v: "4h", l: "New page scaffold (was 2d)" },
                  ].map((m) => (
                    <div key={m.l}>
                      <p className="display text-2xl leading-none">{m.v}</p>
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted mt-1">
                        {m.l}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "TanStack Query", "TanStack Table", "Zod", "Tailwind"].map((t) => (
                    <span key={t} className="font-mono text-[9px] tracking-[0.12em] uppercase border border-rule px-2.5 py-1 text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — main screenshot + two secondary */}
              <div className="proj-col-right col-span-12 md:col-span-7 space-y-2">
                {/* Main: Payments dashboard */}
                <div className="w-full overflow-hidden border border-rule">
                  <img
                    src="/projects/myanthology/payments.jpg"
                    alt="MyAnthology — Payment Analytics dashboard with transaction table"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
                {/* Secondary: Event Menus + User Queries side by side */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="overflow-hidden border border-rule">
                    <img
                      src="/projects/myanthology/event-menus.jpg"
                      alt="MyAnthology — Event Menu Catalog with filters and item table"
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                  <div className="overflow-hidden border border-rule">
                    <img
                      src="/projects/myanthology/user-queries.jpg"
                      alt="MyAnthology — User Queries table with status tags"
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">Dec 2025 — Ongoing</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">Pelocal Fintech · Noida</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── § 3 SERVICES — Horizontal scroll ────────────────────────────────── */}
      {/* Header is the first card inside the track so no orphaned blank space */}
      <div
        id="services"
        ref={hScrollSectionRef}
        className="border-b border-rule md:h-[85vh] md:overflow-hidden"
      >
        <div
          ref={hScrollTrackRef}
          className="flex flex-col md:flex-row md:flex-nowrap md:h-full will-change-transform"
        >
          {/* Intro card */}
          <div className="w-full md:w-[380px] lg:w-[420px] md:flex-shrink-0 border-b md:border-b-0 md:border-r border-rule p-8 md:p-12 flex flex-col justify-between gap-8 md:h-full bg-cream/30">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted">
              Services · What I Build
            </p>
            <div>
              <h2 className="display text-4xl md:text-[5rem] lg:text-[5.5rem] leading-[0.9]">
                What I<br />build<span className="text-ember">.</span>
              </h2>
              <p className="mt-5 font-mono text-[10px] tracking-[0.25em] uppercase text-muted hidden md:block">
                Scroll right to explore →
              </p>
            </div>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted/50 hidden md:block">
              4 services
            </span>
          </div>

          {services.map((s) => (
            <div
              key={s.num}
              className="w-full md:w-[500px] lg:w-[540px] md:flex-shrink-0 border-b md:border-b-0 md:border-r border-rule p-8 md:p-12 flex flex-col gap-6 md:h-full"
            >
              <div className="flex items-start justify-between">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-ember">
                  {s.category}
                </p>
                <span className="display text-7xl leading-none text-rule/60 select-none">
                  {s.num}
                </span>
              </div>

              <h3 className="display text-2xl md:text-3xl leading-tight">{s.title}</h3>

              <p className="text-sm text-ink2 leading-relaxed">{s.body}</p>

              <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted">
                <span className="text-ember">Best for: </span>{s.bestFor}
              </p>

              {/* Deliverables */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.28em] uppercase text-muted mb-3">
                  Deliverables
                </p>
                <ul className="space-y-1.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-ember flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs text-ink2">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Proof */}
              {s.proof && (
                <div className="pt-5 border-t border-rule">
                  <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted mb-1.5">
                    Proof
                  </p>
                  <p className="font-mono text-[10px] text-ink2 leading-relaxed">{s.proof}</p>
                </div>
              )}
            </div>
          ))}

          {/* Trailing prompt card — 05 Something else? */}
          <div className="w-full md:w-[500px] lg:w-[540px] md:flex-shrink-0 p-8 md:p-12 flex flex-col justify-center gap-8 md:h-full bg-cream">
            <span className="display text-7xl leading-none text-rule/60 select-none">05</span>
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-ember mb-3">
                Open
              </p>
              <h3 className="display text-3xl md:text-4xl leading-tight">
                Something else<span className="text-ember">?</span>
              </h3>
            </div>
            <p className="text-sm text-ink2 leading-relaxed max-w-[32ch]">
              I have shipped inventory systems, healthcare platforms, and government portals.
              If it runs on the web, I can probably build it. Tell me what you need and I will
              tell you if I am the right person for it.
            </p>
            <a
              href="mailto:yasharyas@proton.me"
              className="inline-flex items-center gap-2 self-start bg-ink text-paper px-6 py-3.5 text-sm font-medium hover:bg-ember transition-colors duration-300"
            >
              Tell me what you need <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── § 4 HOW IT WORKS — Scrubbed step animation ──────────────────────── */}
      <section
        id="process"
        ref={stepsRef}
        className="py-24 md:py-40 border-b border-rule"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <p data-reveal className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted mb-4">
            Process · How It Works
          </p>
          <h2 data-reveal className="display text-4xl md:text-6xl lg:text-7xl mb-16 md:mb-24 leading-none">
            Three steps to shipped<span className="text-ember">.</span>
          </h2>

          {/* Animated progress line (desktop) */}
          <div className="hidden md:block relative mb-12">
            {/* Track */}
            <div className="h-px w-full bg-rule" />
            {/* Animated fill */}
            <div
              ref={progressLineRef}
              className="absolute inset-0 h-px bg-ember"
              style={{ transformOrigin: "left center" }}
            />
          </div>

          {/* Step grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step) => (
              <div key={step.num} className="step-block">
                <div className="step-circle w-12 h-12 rounded-full border border-rule bg-paper flex items-center justify-center mb-7">
                  <span className="font-mono text-xs tracking-widest text-ink2">
                    {step.num}
                  </span>
                </div>
                <div className="step-content">
                  <h3 className="display text-2xl md:text-3xl leading-none mb-2">{step.title}</h3>
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-ember mb-5">
                    {step.timing}
                  </p>
                  <p className="text-sm text-ink2 leading-relaxed max-w-[36ch]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p data-reveal className="mt-16 md:mt-20 font-mono text-[11px] tracking-[0.28em] uppercase text-muted text-center">
            Simple. No jargon. Low risk.
          </p>
        </div>
      </section>

      {/* ── § 5 TRUST SIGNALS ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-rule bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="trust-grid grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {trust.map((t) => (
              <div key={t.label} className="trust-stat">
                <p className="display text-4xl md:text-5xl">{t.value}</p>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-ember mt-1">
                  {t.label}
                </p>
                <p className="font-mono text-[9px] tracking-[0.15em] text-muted mt-0.5">
                  {t.sub}
                </p>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* ── § 6 CONTACT CTA ─────────────────────────────────────────────────── */}
      <section className="relative py-32 md:py-52 bg-ink text-paper overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="max-w-[860px]">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-paper/30 mb-8">
              Let's work together
            </p>

            {/* Headline with per-line clip animation */}
            <h2 className="cta-headline display text-[11vw] md:text-[8vw] lg:text-[7.5rem] leading-[0.88] mb-12">
              <span className="block overflow-hidden">
                <span className="cta-line block">Ready to build</span>
              </span>
              <span className="block overflow-hidden">
                <span className="cta-line block italic font-light pl-[6vw] text-ember">
                  something?
                </span>
              </span>
            </h2>

            <div className="cta-body space-y-8">
              <p className="cta-body-el text-base text-paper/50 max-w-[50ch] leading-relaxed">
                Available for landing page projects, full site builds, and SaaS frontend
                work. Based in New Delhi, works async with remote teams worldwide.
                Responds within 24 hours.
              </p>

              <div className="cta-body-el flex flex-wrap gap-5 items-center">
                <a
                  href={`mailto:${links.emailAlt}`}
                  className="inline-flex items-center gap-2 bg-ember text-paper px-8 py-4 text-sm font-medium tracking-wide hover:bg-paper hover:text-ink transition-colors duration-300"
                >
                  {links.emailAlt} <span aria-hidden="true">→</span>
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-body-el font-mono text-[10px] tracking-[0.22em] uppercase text-paper/40 hover:text-paper transition-colors link-u"
                >
                  LinkedIn
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-body-el font-mono text-[10px] tracking-[0.22em] uppercase text-paper/40 hover:text-paper transition-colors link-u"
                >
                  GitHub
                </a>
              </div>

              <p className="cta-body-el font-mono text-[9px] tracking-[0.2em] uppercase text-paper/25">
                {profile.location} · Responds within 24h
              </p>
            </div>
          </div>
        </div>

        {/* Decorative background glyph */}
        <p
          className="absolute right-[-2vw] bottom-[-1vw] display text-[22vw] leading-none text-paper/[0.025] select-none pointer-events-none"
          aria-hidden="true"
        >
          hire.
        </p>
      </section>
    </div>
  );
}
